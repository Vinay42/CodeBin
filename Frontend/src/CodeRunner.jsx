// import React, { useEffect, useRef, useState } from "react";
// import { Terminal } from "@xterm/xterm";
// import { FitAddon } from "@xterm/addon-fit";
// import "@xterm/xterm/css/xterm.css";

// export default function CodeRunner() {
//   const terminalRef = useRef(null);
//   const fitAddon = useRef(null);
//   const ws = useRef(null);

//   const [code, setCode] = useState(`# Write Python code\nprint("Hello from xterm!")`);
//   const [language, setLanguage] = useState("python");
//   const [running, setRunning] = useState(false);

//   useEffect(() => {
//     if (!terminalRef.current) return;
//     fitAddon.current = new FitAddon();
//     const term = new Terminal({
//       cursorBlink: true,
//       cols: 80,
//       rows: 24,
//       scrollback: 1000,
//       fontFamily: "monospace",
//       fontSize: 14,
//     });
//     term.loadAddon(fitAddon.current);
//     term.open(terminalRef.current);
//     fitAddon.current.fit();

//     ws.current = new WebSocket("ws://localhost:8080");
//     ws.current.onopen = () => {
//       term.writeln("Connected to backend WebSocket server");
//     };

//     ws.current.onmessage = (ev) => {
//       try {
//         const msg = JSON.parse(ev.data);
//         if (msg.type === "stdout" || msg.type === "stderr") {
//           term.write(msg.data);
//         } else if (msg.type === "exit") {
//           term.writeln(`\n\nProcess exited with code ${msg.code}`);
//           setRunning(false);
//         } else if (msg.type === "error") {
//           term.writeln(`\nError: ${msg.message}`);
//           setRunning(false);
//         } else if (msg.type === "started") {
//           term.writeln("\nExecution started...\n");
//           setRunning(true);
//         }
//       } catch {
//         term.writeln(ev.data);
//       }
//     };

//     // Send terminal input to backend stdin
//     term.onData((data) => {
//       term.write(data);
//       if (ws.current && ws.current.readyState === WebSocket.OPEN && running) {
//         ws.current.send(JSON.stringify({ type: "stdin", data }));
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       ws.current.close();
//       term.dispose();
//     };
//   }, []);

//   const runCode = () => {
//     if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
//       alert("WebSocket not connected");
//       return;
//     }
//     ws.current.send(
//       JSON.stringify({
//         type: "start",
//         language,
//         filename: language === "python" ? "main.py" : language === "javascript" ? "main.js" : "main.c",
//         code,
//       })
//     );
//   };

//   return (
//     <div style={{ display: "flex", height: "90vh", gap: "10px" }}>
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <h2>Code Editor</h2>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           disabled={running}
//           style={{ marginBottom: 8, width: 120 }}
//         >
//           <option value="python">Python</option>
//           <option value="javascript">JavaScript</option>
//           <option value="c">C</option>
//           <option value="cpp">C++</option>
//         </select>
//         <textarea
//           style={{ flex: 1, fontFamily: "monospace", fontSize: 14, padding: 10 }}
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           disabled={running}
//         />
//         <button onClick={runCode} disabled={running} style={{ marginTop: 10 }}>
//           Run Code
//         </button>
//       </div>
//       <div
//         ref={terminalRef}
//         style={{
//           flex: 1,
//           backgroundColor: "black",
//           color: "white",
//           borderRadius: 4,
//           padding: 10,
//           fontSize: 14,
//           overflow: "hidden",
//         }}
//       />
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { Play, Square, RefreshCw } from "lucide-react";

export default function CodeRunner() {
  const terminalRef = useRef(null);
  const ws = useRef(null);
  const [code, setCode] = useState(`# Write Python code here
print("Hello, World!")
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")
age = input("How old are you? ")
print(f"You are {age} years old.")`);
  
  const [language, setLanguage] = useState("python");
  const [running, setRunning] = useState(false);
  const [connected, setConnected] = useState(false);
  const [terminal, setTerminal] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const [waitingForInput, setWaitingForInput] = useState(false);

  // Initialize terminal
  useEffect(() => {
    const initTerminal = () => {
      const terminalElement = terminalRef.current;
      if (!terminalElement) return;

      // Create a simple terminal interface
      const term = {
        element: terminalElement,
        write: (text) => {
          const span = document.createElement('span');
          span.textContent = text;
          terminalElement.appendChild(span);
          terminalElement.scrollTop = terminalElement.scrollHeight;
        },
        writeln: (text) => {
          const div = document.createElement('div');
          div.textContent = text;
          terminalElement.appendChild(div);
          terminalElement.scrollTop = terminalElement.scrollHeight;
        },
        clear: () => {
          terminalElement.innerHTML = '';
        }
      };

      setTerminal(term);

      // Initialize WebSocket
      const socket = new WebSocket("ws://localhost:8080");
      
      socket.onopen = () => {
        setConnected(true);
        term.writeln("🟢 Connected to code execution server");
        term.writeln("Ready to run your code!");
        term.writeln("");
      };

      socket.onclose = () => {
        setConnected(false);
        setRunning(false);
        term.writeln("🔴 Disconnected from server");
      };

      socket.onerror = (error) => {
        setConnected(false);
        term.writeln("❌ Connection error - make sure the backend server is running on port 8080");
      };

      socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          
          switch (msg.type) {
            case "stdout":
              term.write(msg.data);
              // Check if this looks like an input prompt
              if (msg.data.includes("?") || msg.data.includes(":") || msg.data.endsWith("> ")) {
                setWaitingForInput(true);
              }
              break;
              
            case "stderr":
              term.write(`🔴 ${msg.data}`);
              break;
              
            case "exit":
              term.writeln(`\n📋 Process finished (exit code: ${msg.code})`);
              term.writeln("─".repeat(50));
              setRunning(false);
              setWaitingForInput(false);
              break;
              
            case "error":
              term.writeln(`❌ Error: ${msg.message}`);
              setRunning(false);
              setWaitingForInput(false);
              break;
              
            case "started":
              term.writeln("🚀 Starting execution...");
              term.writeln("─".repeat(50));
              setRunning(true);
              break;
              
            case "killed":
              term.writeln("\n🛑 Process terminated");
              term.writeln("─".repeat(50));
              setRunning(false);
              setWaitingForInput(false);
              break;
          }
        } catch (err) {
          term.write(event.data);
        }
      };

      ws.current = socket;
    };

    initTerminal();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const runCode = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      alert("Not connected to server. Please ensure the backend is running.");
      return;
    }

    if (terminal) {
      terminal.writeln(`\n▶️  Running ${language} code...`);
    }

    const filename = {
      python: "main.py",
      javascript: "main.js", 
      c: "main.c",
      cpp: "main.cpp"
    }[language];

    ws.current.send(JSON.stringify({
      type: "start",
      language,
      filename,
      code
    }));
  };

  const stopExecution = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "kill" }));
    }
  };

  const sendInput = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && currentInput.trim()) {
      // Display the input in terminal
      if (terminal) {
        terminal.write(currentInput + "\n");
      }
      
      // Send to backend
      ws.current.send(JSON.stringify({ 
        type: "stdin", 
        data: currentInput + "\n" 
      }));
      
      setCurrentInput("");
      setWaitingForInput(false);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendInput();
    }
  };

  const clearTerminal = () => {
    if (terminal) {
      terminal.clear();
    }
  };

  const getLanguageExample = (lang) => {
    const examples = {
      python: `# Python Example
print("Hello, World!")
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")

# Try some calculations
x = int(input("Enter a number: "))
print(f"The square of {x} is {x**2}")`,

      javascript: `// JavaScript Example  
console.log("Hello, World!");

// Note: JavaScript input requires readline setup
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (name) => {
  console.log(\`Hello, \${name}!\`);
  rl.close();
});`,

      c: `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    char name[100];
    printf("What's your name? ");
    scanf("%s", name);
    printf("Hello, %s!\\n", name);
    
    int x;
    printf("Enter a number: ");
    scanf("%d", &x);
    printf("The square of %d is %d\\n", x, x*x);
    
    return 0;
}`,

      cpp: `// C++ Example
#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    std::string name;
    std::cout << "What's your name? ";
    std::cin >> name;
    std::cout << "Hello, " << name << "!" << std::endl;
    
    int x;
    std::cout << "Enter a number: ";
    std::cin >> x;
    std::cout << "The square of " << x << " is " << x*x << std::endl;
    
    return 0;
}`
    };
    return examples[lang] || examples.python;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Code Editor Panel */}
      <div className="flex-1 flex flex-col bg-white border-r border-gray-300">
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Code Editor</h2>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(getLanguageExample(e.target.value));
              }}
              disabled={running}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
            </select>
            
            <button
              onClick={runCode}
              disabled={running || !connected}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Play size={16} />
              Run Code
            </button>
            
            <button
              onClick={stopExecution}
              disabled={!running}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Square size={16} />
              Stop
            </button>
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={running}
          className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none border-none"
          placeholder="Write your code here..."
          style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
        />
      </div>

      {/* Terminal Panel */}
      <div className="flex-1 flex flex-col bg-black">
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Terminal</h2>
          <button
            onClick={clearTerminal}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            <RefreshCw size={14} />
            Clear
          </button>
        </div>
        
        <div
          ref={terminalRef}
          className="flex-1 p-4 text-green-400 font-mono text-sm overflow-y-auto"
          style={{ 
            backgroundColor: '#1a1a1a',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            lineHeight: '1.4'
          }}
        />
        
        {/* Input Panel */}
        {waitingForInput && (
          <div className="bg-gray-900 p-3 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-sm">Program waiting for input:</span>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleInputKeyPress}
                placeholder="Type input and press Enter..."
                className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={sendInput}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}