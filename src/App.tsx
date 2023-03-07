import React, { useState } from "react";
import { Command } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { exists } from "@tauri-apps/api/fs";
import "./App.css";

function App() {
  const [fileName, setFileName] = useState("Choose Directory");
  const [iconName, setIconName] = useState("Choose File");
  const [status, setStatus] = useState("");
  const selectFileOrDirectory = async (
    setName: React.Dispatch<React.SetStateAction<string>>,
    isDir: boolean
  ) => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: isDir,
      });
      if (!selectedPath) return;
      setName(selectedPath as string);
    } catch (error) {
      console.error(error);
    }
  };

  const runScript = async (programDirPath: string, iconFilePath: string) => {
    let validProgram = await exists(programDirPath);
    let validIcon = await exists(iconFilePath);
    if (!validProgram || !validIcon) {
      setStatus("Not a valid program directory or icon file.");
      return;
    }

    setStatus("Running...");
    const command = Command.sidecar("../bin/mai", [programDirPath, iconFilePath]);

    await command.execute().then((result) => {
      setStatus(result.stdout);
      console.log(result);
    }).catch((error) => {
      setStatus("Failed to run script.");
      console.error(error);
    });

    setFileName("Choose Directory");
    setIconName("Choose File");
  };

  return (
    <div className="container">
      <h1>Move and Install</h1>

      <div className="row">
        <h3>Choose Program Directory: </h3>
        <button
          type="submit"
          onClick={() => selectFileOrDirectory(setFileName, true)}
        >
          {fileName}
        </button>
      </div>

      <div className="row">
        <h3>Choose Program Icon File: </h3>
        <button
          type="submit"
          onClick={() => selectFileOrDirectory(setIconName, false)}
        >
          {iconName}
        </button>
      </div>

      <div className="row">
        <button type="submit" onClick={() => runScript(fileName, iconName)}>
          Run
        </button>
      </div>

      <p>{status}</p>
    </div>
  );
}

export default App;
