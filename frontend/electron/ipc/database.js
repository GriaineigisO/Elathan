import { ipcMain } from "electron";
import { createSchema } from "../migrations/createSchema.js";
import { importData } from "../migrations/importData.js";

export function registerDatabaseHandlers() {
    ipcMain.handle("database:rebuild", () => {
        createSchema();
        importData();
    });
}