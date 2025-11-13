// import { runInDocker } from "./dockerManager.js";

// export const handleRunCode = async (socket, { roomId, language, code, input }) => {
//   socket.emit("terminal-output", { roomId, output: "$ Compiling..." });

//   try {
//     const output = await runInDocker(language, code, input);
//     socket.emit("terminal-output", { roomId, output });
//   } catch (err) {
//     socket.emit("terminal-output", { roomId, output: `❌ Error: ${err.message}` });
//   }
// };
import { runInDocker, handleTerminalInput } from "./dockerManager.js";

// ✅ Export this function for server.js
export const handleRunCode = async (socket, { roomId, language, code }) => {
  // Start the Docker process for this code
  runInDocker(socket, roomId, language, code);

  // Listen for user terminal input from frontend
  socket.on("terminal-input", ({ roomId, input }) => {
    handleTerminalInput(roomId, input);
  });
};

