import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import { v4 as uuid } from "uuid"
import { exec } from "child_process"
import path from "path"
import fs from "fs"
import { getDockerCommand } from "./dockerCommand.js"
import { spawn } from "child_process"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"
dotenv.config()

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

async function reviewCodeWithGemini(code, language) {
  try {
    const prompt = `You are an expert code reviewer. Please review the following ${language} code and provide:

1. **Code Quality**: Rate the overall code quality (Excellent/Good/Fair/Poor)
2. **Issues Found**: List any bugs, errors, or potential problems
3. **Suggestions**: Provide specific improvements for:
   - Performance optimizations
   - Code readability
   - Best practices
   - Security concerns (if any)
4. **Corrected Code**: If there are issues, provide the corrected version
Keep the review concise but helpful. Format your response in markdown.

\`\`\`${language}
${code}
\`\`\`

`
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    })
    return {
      success: true,
      review: response.text
    }
  } catch (error) {
    console.error("Gemini API Error:", error.message)
    return {
      success: false,
      error: error.message || "Failed to review code"
    }
  }
}

const runningProcesses = new Map()
const app = express()

app.use(cors(
  {
  origin: process.env.FRONTEND_ORIGIN,
  methods: ["GET", "POST"],
  credentials: true
}
))

app.get("/", (req, res) => {
  res.status(200).send("🚀 CodeBridge Server is running")
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN, // for dev
  },
})

const rooms = {}

function getDefaultCode(language) {
  if (language === "java") return `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`
  if (language === "python") return `print("Hello, World!")`
  if (language === "cpp") return `#include <iostream>
int main() {
  std::cout << "Hello, World!";
}`
}

function cleanupJob(jobDir) {
  try {
    fs.rmSync(jobDir, { recursive: true, force: true })
    // console.log(" Cleaned job directory:", jobDir)
  } catch (err) {
    // console.error(" Failed to cleanup job:", err.message)
  }
}


io.on("connection", (socket) => {
  // console.log("Connected:", socket.id)


  socket.on("check-username", ({ roomId, username }) => {
    const room = rooms[roomId]
    const users = room ? room.users : []

    const exists = users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    )
    socket.emit("username-status", {
      available: !exists,
    })
 })

  socket.on("join-room", ({ roomId, username }) => {

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [],
        code: getDefaultCode("java"),
        language: "java"
      }
    }

    // final safety check
    const exists = rooms[roomId].users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    )

    if (exists) {
      socket.emit("join-error", {
        message: "Username already taken",
      })
      return
    }

    rooms[roomId].users.push({
      socketId: socket.id,
      username,
    })

    // console.log(rooms)

    socket.join(roomId)
    socket.emit("join-success", {
      roomId,
      username
    })

    io.to(roomId).emit("members-update", rooms[roomId].users)
    socket.emit("sync-code", {
      code: rooms[roomId].code,
      language: rooms[roomId].language
    })

  })

  socket.on("code-change", ({ roomId, code }) => {
    const room = rooms[roomId]
    if (!room) return

    room.code = code
    socket.to(roomId).emit("code-change", { code })
  })


  socket.on("run-code", ({ roomId, code, language }) => {
    const room = rooms[roomId]
    if (!room) return

    // Someone already running
    if (room.isRunning) {
      socket.emit("run-denied", {
        message: "Code is already running"
      })
      return
    }

    // Lock the room
    room.isRunning = true
    room.runningBy = {
      socketId: socket.id,
      username: room.users.find(u => u.socketId === socket.id)?.username
    }

    // Notify everyone
    io.to(roomId).emit("execution-started", {
      username: room.runningBy.username
    })

    const jobId = uuid()
    const jobDir = path.join("jobs", jobId)
    fs.mkdirSync(jobDir, { recursive: true })

    let fileName = "Main"
    let ext = language === "java" ? "java" : language === "python" ? "py" : "cpp"

    const filePath = path.join(jobDir, `${fileName}.${ext}`)
    fs.writeFileSync(filePath, code)

    const dockerCmd = getDockerCommand(language, filePath)

    const child = spawn(dockerCmd, {
      shell: true,
      stdio: ["pipe", "pipe", "pipe"]
    })

    runningProcesses.set(socket.id, {
      roomId,
      process: child,
      jobDir
    })

    const EXECUTION_TIMEOUT = 5000 // 5 seconds

  const killTimer = setTimeout(() => {
    if (!child.killed) {
      child.kill("SIGKILL")
      io.to(roomId).emit("program-output", {
        output: "\n⏱ Execution timed out (5s limit)\n"
      })
    }
  }, EXECUTION_TIMEOUT)

    child.stdout.on("data", (data) => {
      // console.log("Sending output:", data.toString())
      io.to(roomId).emit("program-output", { output: data.toString() })
    })

    child.stderr.on("data", (data) => {
      io.to(roomId).emit("program-output", { output: data.toString() })
    })

    child.on("close", () => {
      clearTimeout(killTimer)
      const room = rooms[roomId]
      if (!room) return

      room.isRunning = false
      room.runningBy = null

      io.to(roomId).emit("execution-ended")
      const entry = runningProcesses.get(socket.id)
      cleanupJob(entry.jobDir)
      if (!entry) return
    })
  })


  socket.on("program-input", ({ roomId, input }) => {
    // write input to stdin
    const entry = runningProcesses.get(socket.id)
    if (!entry.process) return


    entry.process.stdin.write(input + "\n")

    io.to(roomId).emit("program-input", { input })

  })

  socket.on("change-language", ({ roomId, language }) => {
    if (!rooms[roomId]) return

    rooms[roomId].language = language
    rooms[roomId].code = getDefaultCode(language)

    io.to(roomId).emit("language-changed", {
      language,
      code: rooms[roomId].code,
    })
  })

  // Gemini Code Review Handler

  socket.on("review-code", async ({ roomId, code, language }) => {
    const room = rooms[roomId]
    if (!room) return
    const username = room.users.find(u => u.socketId === socket.id)?.username

    // Notify everyone that review is starting
    io.to(roomId).emit("review-started", { username })
    try {
      const result = await reviewCodeWithGemini(code, language)
      io.to(roomId).emit("review-result", {
        success: result.success,
        review: result.review,
        error: result.error,
        reviewedBy: username
      })
    } catch (error) {
      io.to(roomId).emit("review-result", {
        success: false,
        error: "Failed to get code review",
        reviewedBy: username
      })
    }
  })

  socket.on("disconnect", () => {
    const entry = runningProcesses.get(socket.id)
    if (entry?.process) {
      entry.process.kill()
      cleanupJob(entry.jobDir)
      runningProcesses.delete(socket.id)
    }
    for (const roomId in rooms) {

      const room = rooms[roomId]
      room.users = room.users.filter(
        (u) => u.socketId !== socket.id
      )

      io.to(roomId).emit("members-update", room.users)

      if (room.users.length === 0) {
        delete rooms[roomId]
      }
    }
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on ${process.env.BACKEND_URL}:${PORT}`)
})