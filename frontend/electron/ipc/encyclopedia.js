import { ipcMain } from "electron";
import { getEncyclopedias, getEncyclopedia } from "../repositories/encyclopediaRepository.js";

export function registerEncyclopediaHandlers() {
  ipcMain.handle("encyclopedia:getEncyclopedias", (_, id) => getEncyclopedias());

  ipcMain.handle("encyclopedia:getEncyclopedia", (_, id) => getEncyclopedia(id));
}


