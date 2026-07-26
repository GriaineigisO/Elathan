import { ipcMain } from "electron";
import {
  getEncyclopedias,
  getEncyclopedia,
  addEncyclopedia,
  deleteEncyclopedia,
  editEncyclopedia,
  addEntry,
  editEntry,
  getEntry,
  deleteEntry
} from "../repositories/encyclopediaRepository.js";

export function registerEncyclopediaHandlers() {
  ipcMain.handle("encyclopedia:getEncyclopedias", (_, id) =>
    getEncyclopedias(),
  );

  ipcMain.handle("encyclopedia:getEncyclopedia", (_, id) =>
    getEncyclopedia(id),
  );

  ipcMain.handle(
    "encyclopedia:addEncyclopedia",
    (_, id, encyclopediaName, topics) =>
      addEncyclopedia(id, encyclopediaName, topics),
  );

  ipcMain.handle("encyclopedia:deleteEncyclopedia", (_, id) =>
    deleteEncyclopedia(id),
  );

  ipcMain.handle("encyclopedia:deleteEntry", (_, id) =>
    deleteEntry(id),
  );

  ipcMain.handle(
    "encyclopedia:editEncyclopedia",
    (_, id, encyclopediaName, topics) =>
      editEncyclopedia(id, encyclopediaName, topics),
  );

   ipcMain.handle(
    "encyclopedia:addEntry",
    (_, encyclopediaId, headword, entryText, entryTopic) =>
      addEntry(encyclopediaId, headword, entryText, entryTopic),
  );
  ipcMain.handle(
    "encyclopedia:editEntry",
    (_, headword, entryText, entryTopic, id) =>
      editEntry(headword, entryText, entryTopic, id),
  );
  ipcMain.handle(
    "encyclopedia:getEntry",
    (_, id) =>
      getEntry(id),
  );
}
