import { parseJson } from "./jsonParser.js";

const jsonColumns = [
    "author_name"
];

export function parseAuthor(row) {

    for (const column of jsonColumns) {
        row[column] = parseJson(row[column]);
    }

    return row;

}