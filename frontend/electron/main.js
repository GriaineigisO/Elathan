import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerDictionaryHandlers } from "./ipc/dictionary.js";
import { registerLanguageHandlers } from "./ipc/language.js";
import { registerDatabaseHandlers } from "./ipc/database.js";
import { registerDerivationHandlers } from "./ipc/derivation.js";
import { registerEtymologyHandlers } from "./ipc/etymology.js";
import { registerEncyclopediaHandlers } from "./ipc/encyclopedia.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const preloadPath = path.join(__dirname, "preload.cjs");
  console.log("Preload path:", preloadPath);

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
   icon: path.join(__dirname, "..", "src", "assets", "icon.png"),
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");
}


app.whenReady().then(() => {
  registerDictionaryHandlers();
  registerLanguageHandlers();
  registerDerivationHandlers();
  registerDatabaseHandlers();
  registerEtymologyHandlers();
  registerEncyclopediaHandlers();

  createWindow();
});
