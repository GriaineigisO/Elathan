import db from "../database.js";
import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

function importTable(tableName) {

    const csvPath = path.join(
        process.cwd(),
        "exports",
        `${tableName}_rows.csv`
    );

    const csv = fs.readFileSync(csvPath, "utf8");

    const rows = parse(csv, {
        columns: true,
        skip_empty_lines: true
    });

    if (rows.length === 0) {
        console.log(`${tableName}: no rows`);
        return;
    }

    // Get the columns that actually exist in the SQLite table
const tableInfo = db.prepare(`
    PRAGMA table_info(${tableName})
`).all();

const validColumns = tableInfo.map(col => col.name);

// Get the columns from the CSV
const csvColumns = Object.keys(rows[0]);

// Only keep columns that exist in SQLite
const columns = csvColumns.filter(col =>
    validColumns.includes(col)
);

const placeholders = columns.map(() => "?").join(",");
    const sql = `
        INSERT INTO ${tableName}
        (${columns.join(",")})
        VALUES (${placeholders})
    `;

    const insert = db.prepare(sql);

    const transaction = db.transaction((records) => {

        for (const record of records) {

            insert.run(
    columns.map(col => {
        const value = record[col];

        return value === "" ? null : value;
    })
);

        }

    });

    transaction(rows);

    console.log(`${tableName}: ${rows.length} rows imported`);

}

export function importData() {

    importTable("languages");
    importTable("dictionary");
    importTable("etymology");
    importTable("encyclopedia_entries");
    importTable("encyclopedias");
    importTable("groups");
    importTable("interfaceLanguages");
    importTable("phonologyTemplates");


}