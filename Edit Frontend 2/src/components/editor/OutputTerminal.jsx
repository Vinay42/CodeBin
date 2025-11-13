

// import { ScrollArea } from '@/components/ui';
// import { Terminal, Trash2 } from 'lucide-react'; // Icons should come from lucide-react
// import { Button } from '@/components/ui/button'; // Button should come from correct path

// export const OutputTerminal = ({ output, isRunning, onClear }) => {
//   const formatOutput = (text) => {
//     if (!text) return null;

//     const lines = text.split('\n');
//     return lines.map((line, index) => {
//       let className = "text-terminal-foreground";

//       // Color coding for different output types
//       if (line.includes('Error') || line.includes('error') || line.includes('ERROR')) {
//         className = "text-terminal-red";
//       } else if (line.includes('Warning') || line.includes('warning') || line.includes('WARN')) {
//         className = "text-terminal-yellow";
//       } else if (line.includes('Success') || line.includes('✓') || line.includes('OK')) {
//         className = "text-terminal-green";
//       }

//       return (
//         <div key={index} className={`font-mono text-xs sm:text-sm leading-relaxed ${className}`}>
//           {line || '\u00A0'}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="h-full flex flex-col bg-terminal-background border border-panel-border rounded-lg">
//       <div className="flex items-center justify-between p-3 border-b border-panel-border">
//         <div className="flex items-center gap-2">
//           <Terminal className="w-4 h-4 text-terminal-foreground" />
//           <span className="text-xs sm:text-sm font-medium text-terminal-foreground">Output</span>
//           {isRunning && (
//             <div className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
//               <span className="text-[10px] sm:text-xs text-terminal-green">Running...</span>
//             </div>
//           )}
//         </div>

//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={onClear}
//           className="h-6 w-6 p-0 text-terminal-foreground hover:text-terminal-red hover:bg-terminal-background/50"
//         >
//           <Trash2 className="w-3 h-3" />
//         </Button>
//       </div>

//       <ScrollArea className="flex-1 p-3">
//         <div className="space-y-1">
//           {output ? (
//             formatOutput(output)
//           ) : (
//             <div className="text-terminal-foreground/60 font-mono text-xs sm:text-sm italic">
//               Output will appear here...
//             </div>
//           )}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };



import React, { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";
import { Trash2 } from "lucide-react";

const Terminal = ({ socketUrl = "ws://localhost:3000" }) => {
  const terminalRef = useRef(null);
  const termInstance = useRef(null);
  const socketRef = useRef(null);

  // ✅ Initialize terminal once
  useEffect(() => {
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "monospace",
      fontSize: 14,
      theme: {
        background: "#0f172a",
        foreground: "#ffffff",
      },
    });

    term.open(terminalRef.current);
    term.writeln("🔵 Connecting to backend...\r\n");
    termInstance.current = term;

    // ✅ Connect to backend WebSocket
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      term.writeln("✅ Connected to backend!\r\n");
    };

    socket.onmessage = (e) => {
      term.write(e.data);
    };

    socket.onclose = () => {
      term.writeln("\r\n🔴 Disconnected from server");
    };

    socket.onerror = (err) => {
      term.writeln("\r\n❌ WebSocket error: " + err.message);
    };

    // ✅ Handle user input (send to backend)
    term.onData((data) => {
      // handle backspace manually
      if (data === "\u007F") {
        if (term._core.buffer.x > 0) {
          term.write("\b \b");
        }
        socket.send("\b");
      } else {
        term.write(data);
        socket.send(data);
      }
    });

    // cleanup on unmount
    return () => {
      socket.close();
      term.dispose();
    };
  }, [socketUrl]);

  // ✅ Clear terminal manually (trash icon)
  const clearOutput = () => {
    if (termInstance.current) {
      termInstance.current.clear();
      termInstance.current.writeln("🧹 Terminal cleared.\r\n");
    }
  };

  return (
    <div className="h-64 border-t border-gray-800 bg-[#0f172a] flex flex-col">
      <div className="h-10 border-b border-gray-800 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-green-400">$ Terminal</span>
        <button
          onClick={clearOutput}
          className="p-1 hover:bg-[#1e293b] rounded"
          title="Clear terminal"
        >
          <Trash2 className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <div
          ref={terminalRef}
          className="w-full h-full text-sm font-mono text-gray-200"
        ></div>
      </div>
    </div>
  );
};

export default Terminal;
