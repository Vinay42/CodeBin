// import { exec } from "child_process";
// import fs from "fs";
// import path from "path";
// import { v4 as uuid } from "uuid";

// const WORK_DIR = path.join(process.cwd(), "temp");

// if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR);

// export const runInDocker = async (language, code, input = "") => {
//   const id = uuid();
//   const folder = path.join(WORK_DIR, id);
//   fs.mkdirSync(folder);

//   const fileMap = {
//     javascript: "main.js",
//     python: "main.py",
//     cpp: "main.cpp",
//   };

//   const filename = fileMap[language];
//   const filePath = path.join(folder, filename);
//   fs.writeFileSync(filePath, code);

//   const inputPath = path.join(folder, "input.txt");
//   fs.writeFileSync(inputPath, input);

//   let dockerCommand = "";

//   if (language === "javascript") {
//     dockerCommand = `docker run --rm -i -v ${folder}:/usr/src/app -w /usr/src/app node:18-alpine sh -c "node ${filename} < input.txt"`;
//   } else if (language === "python") {
//     dockerCommand = `docker run --rm -i -v ${folder}:/usr/src/app -w /usr/src/app python:3.11-alpine sh -c "python ${filename} < input.txt"`;
//   } else if (language === "cpp") {
//     dockerCommand = `docker run --rm -i -v ${folder}:/usr/src/app -w /usr/src/app gcc:12 sh -c "g++ ${filename} -o main && ./main < input.txt"`;
//   }

//   return new Promise((resolve) => {
//     exec(dockerCommand, { timeout: 10000 }, (err, stdout, stderr) => {
//       let result = "";
//       if (err) {
//         result = stderr || err.message;
//       } else {
//         result = stdout || stderr;
//       }

//       // cleanup temp folder
//       fs.rmSync(folder, { recursive: true, force: true });
//       resolve(result);
//     });
//   });
// };



// import { exec } from "child_process";
// import fs from "fs";
// import path from "path";
// import { v4 as uuid } from "uuid";

// const WORK_DIR = path.join(process.cwd(), "temp");

// if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR);

// export const runInDocker = async (language, code, input = "") => {
//   const id = uuid();
//   const folder = path.join(WORK_DIR, id);
//   fs.mkdirSync(folder);

//   const fileMap = {
//     javascript: "main.js",
//     python: "main.py",
//     cpp: "main.cpp",
//   };

//   const filename = fileMap[language];
//   const filePath = path.join(folder, filename);
//   fs.writeFileSync(filePath, code);


//   let dockerCommand = "";

//   console.log('path: ',folder)

//   if (language === "javascript") {
//     dockerCommand = `docker run --rm -i -v "${folder}:/usr/src/app" -w /usr/src/app node:18-alpine sh -c "node ${filename} "`;
//   } else if (language === "python") {
//     dockerCommand = `docker run --rm -i -v "${folder}:/usr/src/app" -w /usr/src/app python:3.11-alpine sh -c "python ${filename} "`;
//   } else if (language === "cpp") {
//     dockerCommand = `docker run --rm -i -v "${folder}:/usr/src/app" -w /usr/src/app gcc:12 sh -c "g++ ${filename} -o main && ./main "`;
//   }
// console.log(dockerCommand)
//   return new Promise((resolve) => {
//     exec(dockerCommand, { timeout: 10000 }, (err, stdout, stderr) => {
//       let result = "";
//       if (err) {
//         result = stderr || err.message;
//       } else {
//         result = stdout || stderr;
//       }

//       // Cleanup temp folder
//       fs.rmSync(folder, { recursive: true, force: true });
//       resolve(result.trim());
//     });
//   });
// };












// import { spawn } from "child_process";
// import fs from "fs";
// import path from "path";
// import { v4 as uuid } from "uuid";

// const WORK_DIR = path.join(process.cwd(), "temp");
// if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR);

// export const runInDocker = async (language, code) => {
//   const id = uuid();
//   const folder = path.join(WORK_DIR, id);
//   fs.mkdirSync(folder);

//   const fileMap = {
//     javascript: "main.js",
//     python: "main.py",
//     cpp: "main.cpp",
//   };

//   const filename = fileMap[language];
//   const filePath = path.join(folder, filename);
//   fs.writeFileSync(filePath, code);

//   let dockerArgs = [];

//   // Select Docker image and command for each language
//   if (language === "javascript") {
//     dockerArgs = [
//       "run", "--rm","-i",
//       "-v", `${folder.replace(/\\/g, "/")}:/usr/src/app`,
//       "-w", "/usr/src/app",
//       "node:18-alpine",
//       "sh", "-c", `node ${filename}`
//     ];
//   } else if (language === "python") {
//     dockerArgs = [
//       "run", "--rm", "-i",
//       "-v", `${folder.replace(/\\/g, "/")}:/usr/src/app`,
//       "-w", "/usr/src/app",
//       "python:3.11-alpine",
//       "sh", "-c", `python ${filename}`
//     ];
//   } else if (language === "cpp") {
//     dockerArgs = [
//       "run", "--rm", "-i",
//       "-v", `${folder.replace(/\\/g, "/")}:/usr/src/app`,
//       "-w", "/usr/src/app",
//       "gcc:12",
//       "sh", "-c", `g++ ${filename} -o main && ./main`
//     ];
//   } else {
//     throw new Error("Unsupported language");
//   }

//   console.log("🚀 Docker Command:", "docker", dockerArgs.join(" "));

//   return new Promise((resolve) => {
//     const child = spawn("docker", dockerArgs,{ shell: true });
//     // console.log(child)

//     let stdout = "";
//     let stderr = "";

//     child.stdout.on("data", (data) => {
//       stdout += data.toString();
//     });

//     child.stderr.on("data", (data) => {
//       stderr += data.toString();
//     });

//     child.on("error", (error) => {
//       stderr += error.message;
//     });

//     child.on("close", (code) => {
//       let result = "";
//       if (code !== 0) {
//         result = stderr || `Process exited with code ${code}`;
//       } else {
//         result = stdout;
//       }

//       // Cleanup temp folder safely
//       fs.rmSync(folder, { recursive: true, force: true });

//       resolve(result.trim());
//     });
//   });
// };















import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const WORK_DIR = path.join(process.cwd(), "temp");
if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR);
const activeDockerContainers = new Map();

export const runInDocker = async (socket, roomId, language, code) => {
  const id = uuid();
  const folder = path.join(WORK_DIR, id);
  fs.mkdirSync(folder);

  const fileMap = {
    javascript: "main.js",
    python: "main.py",
    cpp: "main.cpp",
  };

  const filename = fileMap[language];
  const filePath = path.join(folder, filename);
  fs.writeFileSync(filePath, code);

  let dockerCommand = "";

  // Use quotes around paths to handle spaces correctly
  const containerPath = "/usr/src/app";
  const hostFolderPath = folder.replace(/\\/g, "/");

  if (language === "javascript") {
    dockerCommand = `docker run --rm -i -v "${hostFolderPath}:${containerPath}" -w ${containerPath} node:18-alpine sh -c "node ${filename}"`;
  } else if (language === "python") {
    dockerCommand = `docker run --rm -i -v "${hostFolderPath}:${containerPath}" -w ${containerPath} python:3.11-alpine sh -c "python ${filename}"`;
  } else if (language === "cpp") {
    dockerCommand = `docker run --rm -i -v "${hostFolderPath}:${containerPath}" -w ${containerPath} gcc:12 sh -c "g++ ${filename} -o main && ./main"`;
  } else {
    socket.emit("terminal-output", { output: "Unsupported language.\r\n" });
    return;
  }

  console.log("🚀 Docker Command:", dockerCommand);

  const docker = spawn(dockerCommand, { shell: true });

  //   return new Promise((resolve) => {
  //     // Using shell:true so the command string works as is
  //     const child = spawn(dockerCommand, { shell: true });

  //     let stdout = "";
  //     let stderr = "";

  //     child.stdout.on("data", (data) => {
  //       stdout += data.toString();
  //     });

  //     child.stderr.on("data", (data) => {
  //       stderr += data.toString();
  //     });

  //     child.on("error", (error) => {
  //       stderr += error.message;
  //     });

  //     child.on("close", (code) => {
  //       let result = "";
  //       if (code !== 0) {
  //         result = stderr || `Process exited with code ${code}`;
  //       } else {
  //         result = stdout;
  //       }

  //       // Cleanup temp folder safely
  //       fs.rmSync(folder, { recursive: true, force: true });

  //       resolve(result.trim());
  //     });
  //   });
  // };

  // Store process for later stdin writes
  activeDockerContainers.set(roomId, docker);

  // 🟢 Stream output to frontend terminal
  docker.stdout.on("data", (data) => {
    socket.emit("terminal-output", { output: data.toString() });
  });

  docker.stderr.on("data", (data) => {
    socket.emit("terminal-output", { output: data.toString() });
  });

  // 🟢 Handle process close
  docker.on("close", (code) => {
    socket.emit("terminal-output", { output: `\r\n[Process exited with code ${code}]\r\n` });
    socket.emit("code-finished");
    activeDockerContainers.delete(roomId);

    // Cleanup temporary folder
    fs.rmSync(folder, { recursive: true, force: true });
  });

  docker.on("error", (err) => {
    socket.emit("terminal-output", { output: `Docker error: ${err.message}\r\n` });
  });
};

// 🧠 Handle interactive user input
export const handleTerminalInput = (roomId, input) => {
  const docker = activeDockerContainers.get(roomId);
  if (docker) {
    try {
      docker.stdin.write(input);
    } catch (err) {
      console.error("Failed to write input:", err);
    }
  }
};