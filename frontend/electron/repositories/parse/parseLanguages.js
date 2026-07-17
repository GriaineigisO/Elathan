import { parseJson } from "./jsonParser.js";

const jsonColumns = [
    "language_id",
    "language_name",
    "spelling",
    "themes",
    "mother_language_id",
    "word_forms",
    "word_categories",
    "frequency_list",
    "grammar",
    "is_proto",
    "corpus",
    "sources",
    "sound_changes",
    "category_values",
    "tags"
];

export function parseLanguage(row) {

    for (const column of jsonColumns) {
        row[column] = parseJson(row[column]);
    }

    return row;

}