// import path from "path"

// export function getDockerCommand(language, filePath) {
//   const absDir = path.resolve(path.dirname(filePath))

//   if (language === "java") {
//     return `docker run --rm -i -v "${absDir}:/app" eclipse-temurin:17 sh -c "javac /app/Main.java && java -cp /app Main"`
//   }

//   if (language === "python") {
//     return `docker run --rm -i -v "${absDir}:/app" python:3 python /app/Main.py`
//   }

//   if (language === "cpp") {
//     return `docker run --rm -i -v "${absDir}:/app" gcc bash -c "g++ /app/Main.cpp -o /app/a.out && /app/a.out"`
//   }

//   throw new Error("Unsupported language")
// }



import path from "path"

export function getDockerCommand(language, filePath) {
  const absDir = path.resolve(path.dirname(filePath))

  const base = `
    docker run --rm -i
    --network none
    --memory=256m
    --cpus=1
    --pids-limit=64
    --security-opt no-new-privileges
    -v "${absDir}:/app"
    -w /app
  `.replace(/\s+/g, " ").trim()

  if (language === "java") {
    return `${base} eclipse-temurin:17 sh -c "javac Main.java && java Main"`
  }

  if (language === "python") {
    return `${base} python:3 python Main.py`
  }

  if (language === "cpp") {
    return `${base} gcc bash -c "g++ Main.cpp -o a.out && ./a.out"`
  }

  throw new Error("Unsupported language")
}
