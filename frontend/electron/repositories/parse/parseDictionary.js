import { parseJson } from "./jsonParser.js";

const jsonColumns = [
    // Meanings
    "noun_meaning",
    "verb_meaning",
    "adj_meaning",
    "adv_meaning",
    "adp_meaning",
    "conj_meaning",
    "part_meaning",
    "pron_meaning",
    "interj_meaning",
    "affix_meaning",
    "clitic_meaning",
    "num_meaning",

    // Word forms
    "num_word_forms",
    "noun_word_forms",
    "verb_word_forms",
    "adj_word_forms",
    "adv_word_forms",
    "adp_word_forms",
    "conj_word_forms",
    "part_word_forms",
    "pron_word_forms",
    "interj_word_forms",
    "affix_word_forms",
    "clitic_word_forms",

    // Categories
    "num_word_categories",
    "noun_word_categories",
    "verb_word_categories",
    "adj_word_categories",
    "adv_word_categories",
    "adp_word_categories",
    "conj_word_categories",
    "part_word_categories",
    "pron_word_categories",
    "interj_word_categories",
    "affix_word_categories",
    "clitic_word_categories",

    // Misc
    "inflection",
    "theaurus",
    "tags"
];

export function parseDictionary(row) {

    for (const column of jsonColumns) {
        row[column] = parseJson(row[column]);
    }

    return row;

}