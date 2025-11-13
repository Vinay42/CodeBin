import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

export const InterectiveTerminal = ({ socket, roomId }) => {
  const terminalRef = useRef(null);
  const termInstance = useRef(null);

  useEffect(() => {
    // 1️⃣ Initialize terminal only once
    termInstance.current = new Terminal({
      cursorBlink: true,
      fontFamily: "monospace",
      fontSize: 14,
      theme: {
        background: "#0f172a",
        foreground: "#e5e5e5",
      },
    });

    termInstance.current.open(terminalRef.current);
    termInstance.current.writeln("🔵 Connecting to server...\r\n");

    // 2️⃣ Listen for output from backend
    socket.on("terminal-output", ({ output }) => {
      termInstance.current.write(output);
    });

    socket.on("code-finished", () => {
      termInstance.current.writeln("\r\n✅ Process finished\r\n");
    });

    // 3️⃣ Handle user input (send to backend)
    termInstance.current.onData((data) => {
      socket.emit("terminal-input", { roomId, input: data });
    });

    // 4️⃣ Cleanup on unmount
    return () => {
      socket.off("terminal-output");
      socket.off("code-finished");
      termInstance.current.dispose();
    };
  }, [socket, roomId]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0f172a",
        borderRadius: "0.5rem",
      }}
    />
  );
};
