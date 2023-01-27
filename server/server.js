import express from "express";
import { spawn } from "child_process";
import cors from "cors";
import { uploadFileToBucket } from "./services/aws.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());

app.post("/api/processAudio", (req, res) => {
  console.log("Reached server.");
  req.on("data", (data) => {
    let chunk = data;
    if (chunk !== null) {
      fs.appendFileSync(path.resolve(__dirname, "test.wav"), chunk);
    }
  });
  req.on("end", () => {
    console.log("Reached end of stream.");
  });

  // let audio;
  // fs.readFileSync(path.resolve(__dirname, "test.wav"), (err, data) => {
  //   if (err) throw err;
  //   audio = data;
  //   console.log("Audio file read.");
  // });

  // uploadFileToBucket(audio, "test.wav");
  const python = spawn("python", [path.resolve(__dirname, "test.py")]);
  let result;
  python.stdout.on("data", (output) => {
    result = output.toString();
    res.json({
      data: result,
    });
    fs.unlinkSync(path.resolve(__dirname, "test.wav"));
  });
});

app.post("/api/retrieveTest", (req, res) => {
  res.json({
    data: {
      message: req.body,
    },
  });
});

app.listen(5000, () => {
  console.log(`  App running in port 5000`);
});
