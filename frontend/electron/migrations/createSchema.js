import db from "../database.js";

export function createSchema() {

    db.exec(`
        CREATE TABLE IF NOT EXISTS dictionary (
            word_id INTEGER PRIMARY KEY,
            language_id INTEGER,
            word TEXT DEFAULT NULL,
            ipa TEXT DEFAULT NULL,
            word_type TEXT DEFAULT NULL,
            word_note TEXT DEFAULT NULL,
            variant_of TEXT DEFAULT NULL,
            noun_meaning TEXT DEFAULT NULL,
            verb_meaning TEXT DEFAULT NULL,
            adj_meaning TEXT DEFAULT NULL,
            adv_meaning TEXT DEFAULT NULL,
            adp_meaning TEXT DEFAULT NULL,
            conj_meaning TEXT DEFAULT NULL,
            part_meaning TEXT DEFAULT NULL,
            pron_meaning TEXT DEFAULT NULL,
            interj_meaning TEXT DEFAULT NULL,
            affix_meaning TEXT DEFAULT NULL,
            clitic_meaning TEXT DEFAULT NULL,
            num_meaning TEXT DEFAULT NULL,
            
            num_word_forms TEXT DEFAULT NULL,
            noun_word_forms TEXT DEFAULT NULL,
            verb_word_forms TEXT DEFAULT NULL,
            adj_word_forms TEXT DEFAULT NULL,
            adv_word_forms TEXT DEFAULT NULL,
            adp_word_forms TEXT DEFAULT NULL,
            conj_word_forms TEXT DEFAULT NULL,
            part_word_forms TEXT DEFAULT NULL,
            pron_word_forms TEXT DEFAULT NULL,
            interj_word_forms TEXT DEFAULT NULL,
            affix_word_forms TEXT DEFAULT NULL,
            clitic_word_forms TEXT DEFAULT NULL,

            num_word_categories TEXT DEFAULT NULL,
            noun_word_categories TEXT DEFAULT NULL,
            verb_word_categories TEXT DEFAULT NULL,
            adj_word_categories TEXT DEFAULT NULL,
            adv_word_categories TEXT DEFAULT NULL,
            adp_word_categories TEXT DEFAULT NULL,
            conj_word_categories TEXT DEFAULT NULL,
            part_word_categories TEXT DEFAULT NULL,
            pron_word_categories TEXT DEFAULT NULL,
            interj_word_categories TEXT DEFAULT NULL,
            affix_word_categories TEXT DEFAULT NULL,
            clitic_word_categories TEXT DEFAULT NULL,

            date_added INTEGER DEFAULT NULL,
            date_edited INTEGER DEFAULT NULL,

            inflection TEXT DEFAULT NULL,
            thesaurus TEXT DEFAULT NULL,
            tags TEXT DEFAULT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS languages (
            language_id INTEGER PRIMARY KEY,
            language_name TEXT DEFAULT NULL,
            spelling TEXT DEFAULT NULL,
            themes TEXT DEFAULT NULL,
            mother_language_id INTEGER,
            word_forms TEXT DEFAULT NULL,
            word_categories TEXT DEFAULT NULL,
            frequency_list TEXT DEFAULT NULL,
            grammar TEXT DEFAULT NULL,
            is_proto BOOLEAN DEFAULT FALSE,
            corpus TEXT DEFAULT NULL,
            sources TEXT DEFAULT NULL,
            sound_changes TEXT DEFAULT NULL,
            category_values TEXT DEFAULT NULL,
            tags TEXT DEFAULT NULL
            
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS etymology (
            etymology_id INTEGER PRIMARY KEY,
            first_element_id INTEGER DEFAULT NULL,
            second_element_id INTEGER DEFAULT NULL,
            third_element_id INTEGER DEFAULT NULL,
            mother_word_id INTEGER DEFAULT NULL,
            loanword_id INTEGER DEFAULT NULL,
            note TEXT DEFAULT NULL,
            uncertain BOOLEAN DEFAULT FALSE,
            word_id INTEGER,
            etymology_type TEXT
        );
    `);

     db.exec(`
        CREATE TABLE IF NOT EXISTS interfaceLanguages (
            id INTEGER PRIMARY KEY,
            language_name TEXT DEFAULT NULL,
            is_chosen BOOLEAN DEFAULT FALSE,
            translations TEXT DEFAULT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS phonologyTemplates (
            id INTEGER PRIMARY KEY,
            template_name TEXT DEFAULT NULL,
            phonology TEXT DEFAULT NULL
        );
    `);

     db.exec(`
        CREATE TABLE IF NOT EXISTS encyclopedias (
            encyclopedia_id INTEGER PRIMARY KEY,
            encyclopedia_name TEXT DEFAULT NULL,
            topics TEXT DEFAULT NULL
        );
    `);

     db.exec(`
        CREATE TABLE IF NOT EXISTS encyclopedia_entries (
            entry_id INTEGER PRIMARY KEY,
            encyclopedia_id INTEGER,
            headword TEXT DEFAULT NULL,
            entry_text TEXT DEFAULT NULL,
            topic TEXT DEFAULT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS tags (
            tag_id INTEGER PRIMARY KEY,
            tags TEXT DEFAULT NULL,
            tag_name TEXT DEFAULT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS groups (
            group_id INTEGER PRIMARY KEY,
            group_name TEXT DEFAULT NULL,
            word_forms TEXT DEFAULT NULL,
            languages TEXT DEFAULT NULL,
            word_categories TEXT DEFAULT NULL,
            tags TEXT DEFAULT NULL
        );
    `);

}