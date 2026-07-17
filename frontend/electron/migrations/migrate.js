import { createSchema } from "./createSchema.js";
import { importData } from "./importData.js";
import dbPath from "../databasePath.js";


const db = new Database(dbPath);

createSchema();
importData();

console.log("Migration complete.");