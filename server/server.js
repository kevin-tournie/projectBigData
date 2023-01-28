import express from "express";
import { spawn } from "child_process";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());

app.post("/api/processAudio", (req, res) => {
  req.on("data", (data) => {
    let chunk = data;
    if (chunk !== null) {
      fs.appendFileSync(path.resolve(__dirname, "test.wav"), chunk);
    }
  });

  const python = spawn("python", [
    path.resolve(__dirname, "speechWAVOverfit.py"),
  ]);
  let result;
  python.stdout.on("data", (output) => {
    result = output.toString();
    console.log(result);
    res.json({
      data: result,
    });
    fs.unlinkSync(path.resolve(__dirname, "test.wav"));
  });
});

app.listen(5000, () => {
  console.log(`  App running in port 5000`);
});
