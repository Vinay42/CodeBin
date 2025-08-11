// import express from "express";
// import axios from "axios";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

// // Run code route
// app.post("/run", async (req, res) => {
//   const { language, version, code } = req.body;

//   try {
//     const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
//       language,
//       version,
//       files: [{ name: "main", content: code }]
//     });

//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/run", async (req, res) => {
  const { language, version, code, stdin } = req.body;

  try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version,
      files: [{ name: "main", content: code }],
      stdin // pass stdin here
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
