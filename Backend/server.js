// import { spawn } from "child_process";
// import http from "http";
// import WebSocket, { WebSocketServer } from "ws";
// import { v4 as uuidv4 } from "uuid";

// const server = http.createServer();
// const wss = new WebSocketServer({ server });

// /**
//  * language -> docker image & run command builder
//  */
// const languageMap = {
//   python: {
//     image: "python:3.10-slim",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) => `python -u ${filename}`,
//   },
//   javascript: {
//     image: "node:18-slim",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) => `node ${filename}`,
//   },
//   c: {
//     image: "gcc:12",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) => `bash -lc "gcc ${filename} -o /tmp/a.out && /tmp/a.out"`,
//   },
//   cpp: {
//     image: "gcc:12",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) => `bash -lc "g++ ${filename} -o /tmp/a.out && /tmp/a.out"`,
//   }
// };

// wss.on("connection", (ws) => {
//   let sessionContainerName = null;
//   let runningProc = null;

//   ws.on("message", async (msg) => {
//     // Expect JSON frames: { type: 'start', language, filename, code } or { type: 'stdin', data }
//     try {
//       const frame = JSON.parse(msg.toString());
//       if (frame.type === "start") {
//         const { language, filename = "main.py", code } = frame;
//         if (!languageMap[language]) {
//           ws.send(JSON.stringify({ type: "error", message: "Unsupported language" }));
//           return;
//         }

//         const sessionId = uuidv4().slice(0, 8);
//         sessionContainerName = `session_${sessionId}`;
//         const { image, writeCmd, runCmd } = languageMap[language];

//         // 1) create container (stopped) with tight options
//         // - run detached, but we create & start separately to be explicit
//         // Use --network none, --memory, --cpus for basic limits
//         const createArgs = ["run", "-d",
//           "--name", sessionContainerName,
//           "--network", "none",
//           "--memory", "256m",
//           "--cpus", "0.5",
//           image, "sleep", "3600" // keep it alive for a while
//         ];
//         await execCommand("docker", createArgs);

//         // 2) write the code into container via docker exec + stdin (cat > filename)
//         // spawn `docker exec -i <container> bash -lc "cat > filename"`
//         await execWithInput(
//           "docker",
//           ["exec", "-i", sessionContainerName, "bash", "-lc", writeCmd(filename)],
//           code
//         );

//         // 3) start the interactive run and attach stdio
//         // We'll spawn `docker exec -i container bash -lc '<runCmd>'`
//         runningProc = spawn("docker", ["exec", "-it", sessionContainerName, "bash", "-lc", runCmd(filename)], {
//           stdio: ["pipe", "pipe", "pipe"]
//         });

//         // Forward stdout/stderr to websocket
//         runningProc.stdout.on("data", (chunk) => {
//           ws.send(JSON.stringify({ type: "stdout", data: chunk.toString() }));
//         });
//         runningProc.stderr.on("data", (chunk) => {
//           ws.send(JSON.stringify({ type: "stderr", data: chunk.toString() }));
//         });

//         runningProc.on("exit", async (code, signal) => {
//           ws.send(JSON.stringify({ type: "exit", code, signal }));
//           // cleanup container
//           await execCommand("docker", ["rm", "-f", sessionContainerName]);
//           sessionContainerName = null;
//         });

//         ws.send(JSON.stringify({ type: "started" }));
//       }

//       // Send stdin into running process
//       if (frame.type === "stdin") {
//         const data = frame.data;
//         if (runningProc && runningProc.stdin.writable) {
//           runningProc.stdin.write(data);
//         } else {
//           ws.send(JSON.stringify({ type: "error", message: "No running process to write to" }));
//         }
//       }

//       if (frame.type === "kill") {
//         if (sessionContainerName) {
//           await execCommand("docker", ["rm", "-f", sessionContainerName]);
//           sessionContainerName = null;
//         }
//         ws.send(JSON.stringify({ type: "killed" }));
//       }
//     } catch (err) {
//       ws.send(JSON.stringify({ type: "error", message: err.message || String(err) }));
//     }
//   });

//   ws.on("close", async () => {
//     // cleanup if client disconnects
//     if (sessionContainerName) {
//       await execCommand("docker", ["rm", "-f", sessionContainerName]).catch(() => {});
//     }
//   });
// });

// function execCommand(cmd, args) {
//   return new Promise((resolve, reject) => {
//     const p = spawn(cmd, args, { stdio: "inherit" });
//     p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} exit ${c}`))));
//     p.on("error", reject);
//   });
// }

// function execWithInput(cmd, args, input) {
//   return new Promise((resolve, reject) => {
//     const p = spawn(cmd, args, { stdio: ["pipe", "inherit", "inherit"] });
//     p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`exit ${c}`))));
//     p.on("error", reject);
//     p.stdin.write(input);
//     p.stdin.end();
//   });
// }

// server.listen(8080, () => console.log("ws server on ws://localhost:8080"));
















// import { spawn } from "child_process";
// import http from "http";
// import WebSocket, { WebSocketServer } from "ws";
// import { v4 as uuidv4 } from "uuid";

// const server = http.createServer();
// const wss = new WebSocketServer({ server });

// const languageMap = {
//   python: {
//     image: "python:3.10-slim",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) => `python -u ${filename}`,
//   },
//   javascript: {
//     image: "node:18-slim",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) => `node ${filename}`,
//   },
//   c: {
//     image: "gcc:12",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) =>
//       `bash -lc "gcc ${filename} -o /tmp/a.out && /tmp/a.out"`,
//   },
//   cpp: {
//     image: "gcc:12",
//     writeCmd: (filename) => `cat > ${filename}`,
//     runCmd: (filename) =>
//       `bash -lc "g++ ${filename} -o /tmp/a.out && /tmp/a.out"`,
//   },
// };

// wss.on("connection", (ws) => {
//   let sessionContainerName = null;
//   let runningProc = null;

//   ws.on("message", async (msg) => {
//     try {
//       const frame = JSON.parse(msg.toString());

//       if (frame.type === "start") {
//         const { language, filename, code } = frame;
//         if (!languageMap[language]) {
//           ws.send(JSON.stringify({ type: "error", message: "Unsupported language" }));
//           return;
//         }

//         const sessionId = uuidv4().slice(0, 8);
//         sessionContainerName = `session_${sessionId}`;
//         const { image, writeCmd, runCmd } = languageMap[language];

//         // 1) Create container
//         await execCommand("docker", [
//           "run", "-d", "--name", sessionContainerName,
//           "--network", "none", "--memory", "256m", "--cpus", "0.5",
//           image, "sleep", "3600"
//         ]);

//         // 2) Write code into container
//         await execWithInput(
//           "docker",
//           ["exec", "-i", sessionContainerName, "bash", "-lc", writeCmd(filename)],
//           code
//         );

//         // 3) Run code with interactive TTY
//         runningProc = spawn(
//           "docker",
//           ["exec", "-i", sessionContainerName, "bash", "-lc", runCmd(filename)],
//           { stdio: ["pipe", "pipe", "pipe"] }
//         );

//         // Forward output to client
//         runningProc.stdout.on("data", (chunk) => {
//           ws.send(JSON.stringify({ type: "stdout", data: chunk.toString() }));
//         });
//         runningProc.stderr.on("data", (chunk) => {
//           ws.send(JSON.stringify({ type: "stderr", data: chunk.toString() }));
//         });

//         runningProc.on("exit", async (code) => {
//           ws.send(JSON.stringify({ type: "exit", code }));
//           await execCommand("docker", ["rm", "-f", sessionContainerName]);
//           sessionContainerName = null;
//         });

//         ws.send(JSON.stringify({ type: "started" }));
//       }

//       // Send input to running process
//       if (frame.type === "stdin") {
//         if (runningProc && runningProc.stdin.writable) {
//           runningProc.stdin.write(frame.data);
//         }
//       }

//     } catch (err) {
//       ws.send(JSON.stringify({ type: "error", message: err.message }));
//     }
//   });

//   ws.on("close", async () => {
//     if (sessionContainerName) {
//       await execCommand("docker", ["rm", "-f", sessionContainerName]).catch(() => {});
//     }
//   });
// });

// function execCommand(cmd, args) {
//   return new Promise((resolve, reject) => {
//     const p = spawn(cmd, args, { stdio: "inherit" });
//     p.on("exit", (c) => (c === 0 ? resolve() : reject()));
//   });
// }

// function execWithInput(cmd, args, input) {
//   return new Promise((resolve, reject) => {
//     const p = spawn(cmd, args, { stdio: ["pipe", "inherit", "inherit"] });
//     p.stdin.write(input);
//     p.stdin.end();
//     p.on("exit", (c) => (c === 0 ? resolve() : reject()));
//   });
// }

// server.listen(8080, () => console.log("ws server on ws://localhost:8080"));


import { spawn } from "child_process";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const server = http.createServer();
const wss = new WebSocketServer({ server });

console.log("🚀 Starting Code Execution Server...");

const languageMap = {
  python: {
    image: "python:3.10-slim",
    writeCmd: (filename) => `cat > ${filename}`,
    runCmd: (filename) => `python -u ${filename}`,
    extension: ".py"
  },
  javascript: {
    image: "node:18-slim",
    writeCmd: (filename) => `cat > ${filename}`,
    runCmd: (filename) => `node ${filename}`,
    extension: ".js"
  },
  c: {
    image: "gcc:12",
    writeCmd: (filename) => `cat > ${filename}`,
    runCmd: (filename) => `bash -c "gcc ${filename} -o /home/program && chmod +x /home/program && stdbuf -oL -eL /home/program"`,
    extension: ".c"
  },
  cpp: {
    image: "gcc:12",
    writeCmd: (filename) => `cat > ${filename}`,
    runCmd: (filename) => `bash -c "g++ ${filename} -o /home/program && chmod +x /home/program && stdbuf -oL -eL /home/program"`,
    extension: ".cpp"
  },
};

// Track active sessions for cleanup
const activeSessions = new Set();

// Cleanup function for graceful shutdown
function cleanup() {
  console.log("\n🧹 Cleaning up containers...");
  activeSessions.forEach(async (sessionName) => {
    try {
      await execCommand("docker", ["rm", "-f", sessionName]);
      console.log(`✅ Cleaned up container: ${sessionName}`);
    } catch (err) {
      console.log(`⚠️  Failed to cleanup ${sessionName}: ${err.message}`);
    }
  });
  activeSessions.clear();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});

wss.on("connection", (ws) => {
  console.log("🔗 New WebSocket connection established");
  
  let sessionContainerName = null;
  let runningProc = null;

  ws.on("message", async (msg) => {
    try {
      const frame = JSON.parse(msg.toString());
      console.log(`📨 Received message: ${frame.type}`);

      if (frame.type === "start") {
        const { language, filename, code } = frame;
        
        if (!languageMap[language]) {
          ws.send(JSON.stringify({ 
            type: "error", 
            message: `Unsupported language: ${language}` 
          }));
          return;
        }

        // Clean up any existing session
        if (sessionContainerName) {
          console.log(`🧹 Cleaning up existing session: ${sessionContainerName}`);
          await execCommand("docker", ["rm", "-f", sessionContainerName]).catch(() => {});
          activeSessions.delete(sessionContainerName);
        }

        const sessionId = uuidv4().slice(0, 8);
        sessionContainerName = `coderunner_${sessionId}`;
        activeSessions.add(sessionContainerName);
        
        const { image, writeCmd, runCmd } = languageMap[language];
        const actualFilename = filename || `main${languageMap[language].extension}`;

        console.log(`🐳 Creating container: ${sessionContainerName} with ${image}`);

        try {
          // 1) Create and start container with resource limits
          await execCommand("docker", [
            "run", "-d",
            "--name", sessionContainerName,
            "--network", "none", // No network access for security
            "--memory", "512m",   // Memory limit
            "--cpus", "1.0",      // CPU limit
            "--pids-limit", "50", // Process limit
            "--ulimit", "fsize=10000000:10000000", // File size limit (10MB)
            "--tmpfs", "/tmp:rw,nosuid,size=100m", // Writable tmp for source files
            "--workdir", "/home", // Set working directory
            image, 
            "sleep", "300" // Keep alive for 5 minutes max
          ]);

          console.log(`✅ Container created: ${sessionContainerName}`);

          // 2) Write the code into the container
          console.log(`📝 Writing code to container...`);
          await execWithInput(
            "docker",
            ["exec", "-i", sessionContainerName, "bash", "-c", writeCmd(`/tmp/${actualFilename}`)],
            code
          );

          console.log(`🏃 Starting code execution...`);
          ws.send(JSON.stringify({ type: "started" }));

          // 3) Run the code with interactive support
          runningProc = spawn(
            "docker",
            ["exec", "-i", sessionContainerName, "bash", "-c", runCmd(`/tmp/${actualFilename}`)],
            { 
              stdio: ["pipe", "pipe", "pipe"],
              env: { 
                ...process.env, 
                PYTHONUNBUFFERED: "1", // For Python unbuffered output
                STDBUF: "-oL -eL" // For C/C++ line buffering
              }
            }
          );

          // Handle process output
          runningProc.stdout.on("data", (chunk) => {
            const data = chunk.toString();
            console.log(`📤 STDOUT: ${data.trim()}`);
            ws.send(JSON.stringify({ type: "stdout", data }));
          });

          runningProc.stderr.on("data", (chunk) => {
            const data = chunk.toString();
            console.log(`📤 STDERR: ${data.trim()}`);
            ws.send(JSON.stringify({ type: "stderr", data }));
          });

          runningProc.on("exit", async (code, signal) => {
            console.log(`🏁 Process exited with code: ${code}, signal: ${signal}`);
            ws.send(JSON.stringify({ type: "exit", code, signal }));
            
            // Cleanup container
            if (sessionContainerName) {
              try {
                await execCommand("docker", ["rm", "-f", sessionContainerName]);
                activeSessions.delete(sessionContainerName);
                console.log(`🧹 Container cleaned up: ${sessionContainerName}`);
              } catch (err) {
                console.log(`⚠️  Cleanup failed: ${err.message}`);
              }
              sessionContainerName = null;
            }
            runningProc = null;
          });

          runningProc.on("error", (err) => {
            console.log(`❌ Process error: ${err.message}`);
            ws.send(JSON.stringify({ type: "error", message: err.message }));
          });

        } catch (err) {
          console.log(`❌ Container setup failed: ${err.message}`);
          ws.send(JSON.stringify({ 
            type: "error", 
            message: `Failed to setup execution environment: ${err.message}` 
          }));
          
          // Cleanup on failure
          if (sessionContainerName) {
            await execCommand("docker", ["rm", "-f", sessionContainerName]).catch(() => {});
            activeSessions.delete(sessionContainerName);
            sessionContainerName = null;
          }
        }
      }

      // Handle stdin input
      if (frame.type === "stdin") {
        const data = frame.data;
        console.log(`📥 STDIN: ${data.trim()}`);
        
        if (runningProc && runningProc.stdin && runningProc.stdin.writable) {
          runningProc.stdin.write(data);
        } else {
          ws.send(JSON.stringify({ 
            type: "error", 
            message: "No running process to send input to" 
          }));
        }
      }

      // Handle kill request
      if (frame.type === "kill") {
        console.log(`🛑 Kill request received`);
        
        if (runningProc) {
          runningProc.kill('SIGTERM');
          setTimeout(() => {
            if (runningProc && !runningProc.killed) {
              runningProc.kill('SIGKILL');
            }
          }, 2000);
        }
        
        if (sessionContainerName) {
          try {
            await execCommand("docker", ["rm", "-f", sessionContainerName]);
            activeSessions.delete(sessionContainerName);
            console.log(`🧹 Killed and cleaned up: ${sessionContainerName}`);
          } catch (err) {
            console.log(`⚠️  Kill cleanup failed: ${err.message}`);
          }
          sessionContainerName = null;
        }
        
        ws.send(JSON.stringify({ type: "killed" }));
      }

    } catch (err) {
      console.log(`❌ Message handling error: ${err.message}`);
      ws.send(JSON.stringify({ 
        type: "error", 
        message: `Server error: ${err.message}` 
      }));
    }
  });

  ws.on("close", async () => {
    console.log("🔌 WebSocket connection closed");
    
    // Cleanup on disconnect
    if (runningProc) {
      runningProc.kill('SIGTERM');
    }
    
    if (sessionContainerName) {
      try {
        await execCommand("docker", ["rm", "-f", sessionContainerName]);
        activeSessions.delete(sessionContainerName);
        console.log(`🧹 Cleaned up on disconnect: ${sessionContainerName}`);
      } catch (err) {
        console.log(`⚠️  Disconnect cleanup failed: ${err.message}`);
      }
    }
  });

  ws.on("error", (err) => {
    console.log(`❌ WebSocket error: ${err.message}`);
  });
});

// Utility functions
function execCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Executing: ${cmd} ${args.join(' ')}`);
    const p = spawn(cmd, args, { stdio: "pipe" });
    
    let stdout = '';
    let stderr = '';
    
    p.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    p.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    p.on("exit", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const error = new Error(`Command failed with exit code ${code}: ${stderr || stdout}`);
        error.code = code;
        reject(error);
      }
    });
    
    p.on("error", reject);
  });
}

function execWithInput(cmd, args, input) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Executing with input: ${cmd} ${args.join(' ')}`);
    const p = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
    
    let stdout = '';
    let stderr = '';
    
    p.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    p.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    p.on("exit", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const error = new Error(`Command failed with exit code ${code}: ${stderr || stdout}`);
        error.code = code;
        reject(error);
      }
    });
    
    p.on("error", reject);
    
    // Send input and close stdin
    if (input) {
      p.stdin.write(input);
    }
    p.stdin.end();
  });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🌐 WebSocket server running on ws://localhost:${PORT}`);
  console.log("📋 Supported languages: Python, JavaScript, C, C++");
  console.log("🛡️  Security features enabled: resource limits, network isolation");
  console.log("Ready to execute code! 🎉");
});

// Periodic cleanup of old containers (safety measure)
setInterval(async () => {
  try {
    const { stdout } = await execCommand("docker", ["ps", "-a", "--filter", "name=coderunner_", "--format", "{{.Names}}"]);
    const containers = stdout.trim().split('\n').filter(name => name);
    
    for (const container of containers) {
      if (container && !activeSessions.has(container)) {
        console.log(`🧹 Cleaning up orphaned container: ${container}`);
        await execCommand("docker", ["rm", "-f", container]).catch(() => {});
      }
    }
  } catch (err) {
    // Ignore cleanup errors
  }
}, 60000); // Every minute