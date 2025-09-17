import { execFile } from "node:child_process";
import data from "./questions.json" with { type: "json" }
import open from 'open';

const envs = function validateEnvs() {
  const notesPath = process.env.NOTES;
  if (!notesPath) {
    return null;
  }
  return notesPath;
};

const openNotes = function openNotesHandler(notesPath) {
  if (!notesPath) {
    console.log("No environment variable in .env");
  } else {
    console.log("opening notes..");
    execFile("cmd.exe", ["/c", notesPath], (error) => {
      if (error) throw error;
      console.log("✅ Notes opened!");
    });
  }
};

const patternArray = function pickRandomPatternArray() {
  const key = Object.keys(data)
  return data[key[key.length * Math.random() << 0]]
};

const question = async function pickRandomLeetcodeQuestion(array) {
    const index = Math.floor(Math.random() * array.length) 
    await open(array[index])
    return
}

const start = function getShitStarted() {
  const notesPath = envs();
  openNotes(notesPath);
  const array = patternArray()
  question(array)
};

start();
