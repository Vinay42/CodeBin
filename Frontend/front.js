import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected");

  // Send Python code that asks for input
  ws.send(JSON.stringify({
    type: "start",
    language: "python",
    filename: "main.py",
    code: "x = input('Enter: ')\nprint('You entered:', x)"
  }));

  setTimeout(() => {
    ws.send(JSON.stringify({ type: "stdin", data: "Hello from client\n" }));
  }, 2000);
});

ws.on("message", (msg) => {
  console.log("Server:", msg.toString());
});
