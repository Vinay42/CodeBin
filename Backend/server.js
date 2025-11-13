// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow all (for dev). Change to frontend URL later.
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.get("/", (req, res) => res.send("✅ Realtime Room Server Running"));

// const rooms = {}; // { roomId: [ {id, username}, ... ] }

// io.on("connection", (socket) => {
//   console.log("🟢 New client connected:", socket.id);

//   socket.on("join-room", ({ roomId, username }) => {
//     if (!rooms[roomId]) rooms[roomId] = [];
//     const user = { id: socket.id, username };

//     rooms[roomId].push(user);
//     socket.join(roomId);
//     console.log(`${username} joined ${roomId}`);

//     io.to(roomId).emit("room-users", rooms[roomId]);
//   });

//   socket.on("disconnect", () => {
//     for (const roomId in rooms) {
//       rooms[roomId] = rooms[roomId].filter(u => u.id !== socket.id);
//       io.to(roomId).emit("room-users", rooms[roomId]);
//     }
//     console.log("🔴 Client disconnected:", socket.id);
//   });
// });

// const PORT = 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));













// ---------------------------------------------------------------------------------------------------------------------

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { handleRunCode } from "./runner/runCode.js"; // ⬅️ add this

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req, res) => res.send("✅ Real-time Room Server Running"));

const rooms = {}; // { roomId: [ {id, username}, ... ] }

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  // When user joins room
  socket.on("join-room", ({ roomId, username }) => {
    if (!rooms[roomId]) rooms[roomId] = [];

    // prevent duplicate user names in same room
    const existingUser = rooms[roomId].find((u) => u.username === username);
    if (!existingUser) {
      const user = { id: socket.id, username };
      rooms[roomId].push(user);
      socket.join(roomId);
      console.log(`${username} joined ${roomId}`);
    }

    io.to(roomId).emit("room-users", rooms[roomId]);
  });

  // Handle code sync
  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  // 🚀 Handle code execution request
  socket.on("run-code", async (data) => {
    try {
      await handleRunCode(socket, data);
    } catch (err) {
      console.error("Run code error:", err);
      socket.emit("terminal-output", { output: `Error: ${err.message}` });
    }
  });





  // Handle disconnect
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((u) => u.id !== socket.id);
      io.to(roomId).emit("room-users", rooms[roomId]);
    }
   
    console.log("🔴 Disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
