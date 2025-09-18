import { execFile } from "node:child_process";
import data from "./questions.json" with { type: "json" }
import os from "os"
import open from 'open';
import { resolve } from "node:path";

const envs = function validateEnvs() {
  const notesPath = process.env.NOTES;
  if (!notesPath) {
    return null;
  }
  return notesPath;
};

const platform = function detectPlatform(notesPath) {
  const machine = os.platform()
  let args = []
  let command = ""
  switch (machine) {
    case "win32":
      console.log("🪟")
      command = "cmd.exe"
      args = ["/c", notesPath]
      break
    case "darwin":
      console.log("🍎")
      command = "open"
      args = [notesPath]
      break
    case "linux":
      if (os.release().includes("microsoft")) {
        console.log("🐧 WSL")
        command = "cmd.exe"
        args = ["/c", notesPath]
        break
      } else {
        console.log("🐧")
        command = "xdg-open"
        args = [notesPath]
      }
      break
  }
  return { command, args };
}

const openNotes = async function openNotesHandler(notesPath) {
  if (!notesPath) {
    console.log("No environment variable in .env == no notes 😥");
  } else {
    const { command, args } = platform(notesPath)
    execFile(command, args, (error) => {
      if (error) throw error;
      console.log("✅ Notes opened!");
      resolve()
    });
  }
};

const patternArray = function pickRandomPatternArray() {
  const key = Object.keys(data)
  const randomIndex = key.length * Math.random() << 0
  console.log(`🧩Leetcode Pattern🧩 ${key[randomIndex]}`)
  return data[key[randomIndex]]
};

const question = async function pickRandomLeetcodeQuestion(array) {
  const index = Math.floor(Math.random() * array.length)
  await open(array[index])
}

const start = async function getShitStarted() {
  const notesPath = envs();
  await openNotes(notesPath);
  const array = patternArray()
  await question(array)
};

start();
