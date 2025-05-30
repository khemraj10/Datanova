const express = require("express");
const cors = require("cors");
const path = require("path");
const { encode, decode } = require("./cipher");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/encode", (req, res) => {
  try {
    const result = encode(req.body.text || "");
    res.json({ encoded: result });
  } catch (e) {
    console.error("Encode Error:", e.message);
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/decode", (req, res) => {
  try {
    const result = decode(req.body.text || "");
    res.json({ text: result });
  } catch (e) {
    console.error("Decode Error:", e.message);
    res.status(400).json({ error: e.message });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
