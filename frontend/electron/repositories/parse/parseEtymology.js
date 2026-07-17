import { parseJson } from "./jsonParser.js";

const jsonColumns = [
    "etymology_id",
    "first_element_id",
    "second_element_id",
    "third_element_id",
    "mother_word_id",
    "loanword_id",
    "note",
    "uncertain",
    "word_id"
];

export function parseEtymology(row) {

    for (const column of jsonColumns) {
        row[column] = parseJson(row[column]);
    }

    return row;

}