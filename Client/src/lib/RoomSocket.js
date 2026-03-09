import { io } from "socket.io-client"


let socket = null
let roomId1 = null

export function connectSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    })

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })
  }

  return socket
}


function ensureSocket() {
  if (!socket) {
    throw new Error("Socket not initialized. Call connectSocket() first.")
  }
}

export function checkUsername(roomId, username) {
  ensureSocket()
  return new Promise((resolve) => {
    socket.emit("check-username", { roomId, username })
    socket.once("username-status", ({ available }) => resolve(available))
  })
}

export function joinRoom(roomId, username) {
  roomId1 = roomId
  socket.emit("join-room", { roomId, username })
}

export function onJoinError(callback) {
  socket.on("join-error", callback)
}

export function offJoinError() {
  socket.off("join-error")
}

export function onJoinSuccess(cb) {
  socket.once("join-success", cb)
}


export function onMembersUpdate(cb) {
  socket.off("members-update")
  socket.on("members-update", cb)
}

export function runCode(roomId, code, language) {
  // const s = connectSocket()

  // if (!s.connected) {
  //   console.warn("Socket not connected yet, waiting...")
  //   s.once("connect", () => {
  //     console.log("Socket connected, emitting run-code")
  //     s.emit("run-code", { code, language })
  //   })
  //   return
  // }

  if (!socket || !socket.connected) {
    console.warn("Socket not connected")
    return
  }

  console.log("Emitting run-code event", code, "  ::", language);
  console.log("Socket in runCode:", socket)
  socket.emit("run-code", { roomId, code, language })
}

export function executionStarted(cb) {
  socket.off("execution-started")
  socket.on("execution-started", cb)
}

export function executionEnded(cb) {
  socket.off("execution-ended")
  socket.on("execution-ended", cb)
}

export function onSyncCode(cb) {
  socket.off("sync-code")
  socket.on("sync-code", cb)
}

export function onProgramOutput(callback) {
  socket.on("program-output", callback)
}

export function onCodeChange(cb) {
  socket.off("code-change")
  socket.on("code-change", cb)
}

export function emitCodeChange(roomId, code) {
  socket.emit("code-change", { roomId, code })
}

export function onLanguageChanged(cb) {
  socket.off("language-changed")
  socket.on("language-changed", cb)
}

export function sendProgramInput(roomId, input) {
  socket.emit("program-input", { roomId, input })
}

export function changeLanguage(roomId, language) {
  socket.emit("change-language", { roomId, language })
}

export function disconnectSocket() {
  if (socket) {
    socket.off("sync-code")
    socket.off("code-change")
    socket.off("language-changed")
    socket.off("program-output")
    socket.off("execution-started")
    socket.off("execution-ended")
    socket.disconnect()
    socket = null
  }
}
