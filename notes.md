
CURRENT 
in makeDaughter, allow user to add new word forms, for new affixes that arose. Also allow user to remove word forms from the mother language entirely 




BUGS
* phonotactics does not apply to word forms
* when selecting parent language in makeDaughter, textfield does nothing
* affix syllable structure
*  "lair, burrow, spout, entrance, muzzle of a weapon, opening, den, mouth" < this polysemy happens too much

---------------------------------------------------------------------------------------------------------------------


IDEAS


automatically create sound changes? Have a list of all possible sound change categories (assimilation, dissimilation etc). Also map all qualities of a sound in an object, some values being bools, eithers being numbers:
in the case of assmilation, the changed sound can either completely become the sound it is assimilating to, or move some of its qualities closer to the value. Say there are these two vowels
"a": {
    height: 0
    frontness: 3
    rounded: false
    nasal: false,
    sonority: 
}
"u": {
    height: 7
    frontness: 0
    rounded: true
    nasal: false,
    sonority
}

assimilation might occur where the height of sound 2 pulls the height of sound 1 closer: 0 being risen to 3 by 7, thus making 
"ɛ": {
    height: 3
    frontness: 3
    rounded: false
    nasal: false
}

in cases like assimilation/dissimilation, just which quality is being assimilated will have to be selected to (heigh, roundess, frontness etc). INstead of having plosive and fricative as seperate categories, rely on sonority only for those


when deriving a language from another, exclude words that have no IPA listed

add child friendly filter - no words relating to sex are included

produce grammar note for sound changes for makeDaughter

in coreEnglishWords, add key "requireAllThemes" for words which require multiple themes to be added
    in makeDaughter, make derivations - overall, can use createDerivations with minimal tweaks
        * compounding can occur as normal
        * derivations work by checking if an affix's meaning matches one in affixArray or potentialAffixArray - then derivation can work as normal.
    add reduplication as affix creation
        * stressed/accented syllable
        * first syllable
        * last syllable

        let user directly enter regex into sound change applier

        automate thesaurus creation - list every word in every category, iterate through a language's dictionary and match based on the meanings.
        


    stative verb polysemy, make sure to account for this in thesaurus e.g "be red" > "be angry", "bleed"

    numbers agree to noun's gender
    number system detailed in language's grammar. Same with phonology, gender etc
    create specific pronominal, familial and colour system
    word for zero - wait til pronominal system is done so word for "nothing" exists
    save sound changes like phonemic templates
    allow a null word form affix - word form is bare root
    sound change exeptions

    allow reduplication, user can chose accented syllable, how to choose other syllables?
    allow for distal sound changes, using the "..." notation
    use language generator to make Jaronic languages, simply replace already existing words
    store words in latin dictionary that are not in my dictionary in an array, then sift through and delete non-fitting words before adding to dictionary

Themes to add:
* fields of study
* trades
* crafts
* warlike/violent
* diplomatic
* for "has knowledge of these time periods" includes now extinct animals, e.g dinosaurs of various periods, ice age animals and such.
* go through wildlife books for habitat specific wildlife terms


save sound changes in languages able, so user can individually derive a given word into a daughter language by going o the dictionary of he mother language, opening a word, then clicking "create descendant" which opens a modal. User can select one of the daughter languages, then the word is automatically shown ith the sound changes applied and user can also change meaning before saving
- pitch accent systems
 - free (pie)



- make symbol to stand for stressed syllable: !
thus V>0/!_ (vowel, in syllable, is lost after stressed syllable)
word position markers not actually being used in word generation, fix that
allow for more indetailed spelling, use logic from the sound changer to allow conditional spellings < don't rely on notation

automatic vowels consonants syllables etc

ensure that all sound change descriptions are saved to language's grammar text block - also save basic phonology description too

make templates based off these languages:
Old Sumre
Proto-Germanic
Polish
Greek
Old English
Old Irish
Middle Scots
Old Norse
Mandarin
Estonian
North Saami
Pite Saami






OLD IRISH PHONOLOGY TEMPLATE
a9 e9 u9 i9 o9 (aː=á)3 (eː=é)3 (uː=ú)3 (iː=í)3 (oː=ó)3 (ai̯ː=aé) (oi̯ː=oí) (iːa̯=ía) (ui̯ː=uí) (au̯=au) (aːu̯=áu) (eu̯=eu) (eːu̯=éu) (iːu̯=íu) (ou̯=ou) (oːu̯=óu) (uːa̯=úa)

p b4 t4 d4 (k=c)4 g4 s4 r4 l4 (lː=ll)4 (rː=rr)4 m4 n4 (nː=nn) (x=ch)4 (ɣ=g)4 (ð=d)4 (θ=th)4 (β=b)4 (β̃=m)4 f4

B =β β̃ ð ɣ
D = b d g p t k
L = r l
X = β β̃ ð ɣ s r l lː rː m n nː x ɣ ð θ β β̃ f

#DV #DLV #V #DVX #DLVX #VX 
&XV &XVX 


̯















{word_type:"word",noun_meaning:["prefixation"], themes["linguistics"]},



{word_type:"word",noun_meaning:["lexical verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nominalized adjective"], themes["linguistics"]},
{word_type:"word",noun_meaning:["postpositive adjective"], themes["linguistics"]},
{word_type:"word",noun_meaning:["prepositive adjective"], themes["linguistics"]},
{word_type:"word",noun_meaning:["phrasal prepositional verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["prepositional verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["intransitive preposition"], themes["linguistics"]},
{word_type:"word",noun_meaning:["phrasal preposition"], themes["linguistics"]},
{word_type:"word",noun_meaning:["preposition of place"], themes["linguistics"]},
{word_type:"word",noun_meaning:["prepositional phrase"], themes["linguistics"]},
{word_type:"word",noun_meaning:["prepositional case"], themes["linguistics"]},

{word_type:"word",noun_meaning:["phrasal verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["phrasal adjective"], themes["linguistics"]},
{word_type:"word",noun_meaning:["phrasal adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["phrasal noun"], themes["linguistics"]},
{word_type:"word",noun_meaning:["phrasal typology"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntactics"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntactic expletive"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexical middle voice"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntactic middle voice"], themes["linguistics"]},
{word_type:"word",noun_meaning:["morphosyntactician"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntacticization"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntacticist"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntacticism"], themes["linguistics"]},
{word_type:"word",verb_meaning:["syntacticize"], themes["linguistics"]},
{word_type:"word",verb_meaning:["syntacticizing"], themes["linguistics"]},
{word_type:"word",verb_meaning:["syntacticized"], themes["linguistics"]},
{word_type:"word",verb_meaning:["syntacticise"], themes["linguistics"]},
{word_type:"word",verb_meaning:["syntacticising"], themes["linguistics"]},
{word_type:"word",verb_meaning:["syntacticised"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntactocentrism"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicosyntactic pattern"], themes["linguistics"]},
{word_type:"word",noun_meaning:["syntactician"], themes["linguistics"]},

{word_type:"word",noun_meaning:["adverbialisation"], themes["linguistics"]},
{word_type:"word",noun_meaning:["relative adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["time frequency adverbial"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbials of time"], themes["linguistics"]},
{word_type:"word",noun_meaning:["flat adverb"], themes["linguistics"]},
{word_type:"word",verb_meaning:["adverbify"], themes["linguistics"]},
{word_type:"word",noun_meaning:["locative adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["manner adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial particle"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial accusative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["predicative adverbial"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbializer"], themes["linguistics"]},
{word_type:"word",noun_meaning:["modal adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial genitive"], themes["linguistics"]},
{word_type:"word",noun_meaning:["sentence adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["proadverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["conjunctive adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial number"], themes["linguistics"]},

{word_type:"word",noun_meaning:["adjective phrase"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverb phrase"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial participle"], themes["linguistics"]},
{word_type:"word",noun_meaning:["pronominal adverb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["active voice"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adverbial clause"], themes["linguistics"]},
{word_type:"word",noun_meaning:["affirmative sentence"], themes["linguistics"]},
{word_type:"word",noun_meaning:["attributive adjective"], themes["linguistics"]},
{word_type:"word",noun_meaning:["conditional mood"], themes["linguistics"]},

{word_type:"word",adj_meaning:["ditransitive"], themes["linguistics"]},
{word_type:"word",noun_meaning:["ditransitive verb"], themes["linguistics"]},


{word_type:"word",noun_meaning:["antecedent"], themes["linguistics"]},
{word_type:"word",noun_meaning:["definite article"], themes["linguistics"]},
{word_type:"word",noun_meaning:["adjunct"], themes["linguistics"]},
{word_type:"word",verb_meaning:["adjunct"], themes["linguistics"]},
{word_type:"word",noun_meaning:["relative pronoun"], themes["linguistics"]},
{word_type:"word",noun_meaning:["affirmative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["possessive pronoun"], themes["linguistics"]},
{word_type:"word",noun_meaning:["indicative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["subjunctive"], themes["linguistics"]},
{word_type:"word",noun_meaning:["demonstrative pronoun"], themes["linguistics"]},
{word_type:"word",noun_meaning:["prosody"], themes["linguistics"]},
{word_type:"word",verb_meaning:["infix"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicography"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicosemantics"], themes["linguistics"]},
{word_type:"word",noun_meaning:["infix"], themes["linguistics"]},
{word_type:"word",noun_meaning:["subordinate clause"], themes["linguistics"]},
{word_type:"word",noun_meaning:["genitive"], themes["linguistics"]},
{word_type:"word",noun_meaning:["action"], themes["linguistics"]},
{word_type:"word",verb_meaning:["action"], themes["linguistics"]},
{word_type:"word",noun_meaning:["cardinal number"], themes["linguistics"]},
{word_type:"word",noun_meaning:["concrete"], themes["linguistics"]},
{word_type:"word",noun_meaning:["morpheme"], themes["linguistics"]},


{word_type:"word",noun_meaning:["dative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["main clause"], themes["linguistics"]},
{word_type:"word",noun_meaning:["imperative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["main verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["auxiliary verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["infinitive"], themes["linguistics"]},

{word_type:"word",noun_meaning:["copula"], themes["linguistics"]},
{word_type:"word",noun_meaning:["loan word"], themes["linguistics"]},
{word_type:"word",noun_meaning:["article"], themes["linguistics"]},
{word_type:"word",verb_meaning:["article"], themes["linguistics"]},
{word_type:"word",noun_meaning:["direct object"], themes["linguistics"]},
{word_type:"word",noun_meaning:["passive voice"], themes["linguistics"]},
{word_type:"word",noun_meaning:["impersonal subject"], themes["linguistics"]},
{word_type:"word",noun_meaning:["masculine"], themes["linguistics"]},
{word_type:"word",noun_meaning:["consonant"], themes["linguistics"]},
{word_type:"word",noun_meaning:["indirect object"], themes["linguistics"]},
{word_type:"word",noun_meaning:["case"], themes["linguistics"]},
{word_type:"word",verb_meaning:["case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nominative case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["genitive case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dative case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["accusative case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["noun phrase"], themes["linguistics"]},
{word_type:"word",noun_meaning:["coordinating conjunction"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nominative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["indefinite article"], themes["linguistics"]},
{word_type:"word",noun_meaning:["indefinite pronoun"], themes["linguistics"]},
{word_type:"word",noun_meaning:["subordinating conjunction"], themes["linguistics"]},
{word_type:"word",noun_meaning:["subject"], themes["linguistics"]},
{word_type:"word",verb_meaning:["subject"], themes["linguistics"]},
{word_type:"word",noun_meaning:["subject clause"], themes["linguistics"]},

{word_type:"word",noun_meaning:["irregular"], themes["linguistics"]},
{word_type:"word",noun_meaning:["negative clause"], themes["linguistics"]},
{word_type:"word",noun_meaning:["simple present"], themes["linguistics"]},
{word_type:"word",noun_meaning:["future"], themes["linguistics"]},
{word_type:"word",noun_meaning:["conditional"], themes["linguistics"]},
{word_type:"word",noun_meaning:["superlative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["neuter"], themes["linguistics"]},
{word_type:"word",verb_meaning:["neuter"], themes["linguistics"]},
{word_type:"word",noun_meaning:["personal pronoun"], themes["linguistics"]},
{word_type:"word",noun_meaning:["direct verb"], themes["linguistics"]},
{word_type:"word",noun_meaning:["ordinal number"], themes["linguistics"]},
{word_type:"word",noun_meaning:["regular"], themes["linguistics"]},
{word_type:"word",noun_meaning:["compound sentence"], themes["linguistics"]},
{word_type:"word",noun_meaning:["stem"], themes["linguistics"]},
{word_type:"word",verb_meaning:["stem"], themes["linguistics"]},
{word_type:"word",noun_meaning:["tense"], themes["linguistics"]},
{word_type:"word",verb_meaning:["tense"], themes["linguistics"]},
{word_type:"word",noun_meaning:["degrees of comparison"], themes["linguistics"]},
{word_type:"word",noun_meaning:["interjection"], themes["linguistics"]},
{word_type:"word",noun_meaning:["ending"], themes["linguistics"]},
{word_type:"word",verb_meaning:["ending"], themes["linguistics"]},
{word_type:"word",noun_meaning:["declension"], themes["linguistics"]},
{word_type:"word",noun_meaning:["comparative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["comparative linguistics"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicostatistics"], themes["linguistics"]},
{word_type:"word",noun_meaning:["minilexicon"], themes["linguistics"]},
{word_type:"word",noun_meaning:["generative lexicon"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammar induction"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammarization"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["transformational generative grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["construction grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["context-sensitive grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["context-free language"], themes["linguistics"]},
{word_type:"word",noun_meaning:["cryptogrammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["ethnogrammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dependence grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["generative grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["case grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dependency grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicalism"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicase"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicalist"], themes["linguistics"]},
{word_type:"word",noun_meaning:["universal grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["categorical proposition"], themes["linguistics"]},
{word_type:"word",noun_meaning:["categorial grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexicogrammar"], themes["linguistics"]},
{word_type:"word",verb_meaning:["delexicalize"], themes["linguistics"]},
{word_type:"word",noun_meaning:["transformational grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["protogrammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["subgrammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["metagrammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexical analyzer"], themes["linguistics"]},
{word_type:"word",noun_meaning:["formal grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["neogrammarian"], themes["linguistics"]},
{word_type:"word",noun_meaning:["context-free grammar"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammarian"], themes["linguistics"]},
{word_type:"word",noun_meaning:["denominative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nominative type system"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nominative absolute"], themes["linguistics"]},
{word_type:"word",noun_meaning:["accusative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["accusatives absolute"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dative absolute"], themes["linguistics"]},
{word_type:"word",noun_meaning:["genitive absolute"], themes["linguistics"]},
{word_type:"word",noun_meaning:["accusative absolute"], themes["linguistics"]},
{word_type:"word",noun_meaning:["locative absolute"], themes["linguistics"]},
{word_type:"word",noun_meaning:["accusatives cognate"], themes["linguistics"]},
{word_type:"word",noun_meaning:["cognate accusative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["accusative cognate"], themes["linguistics"]},
{word_type:"word",noun_meaning:["genitive-accusative"], themes["linguistics"]},

{word_type:"word",noun_meaning:["unergative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["unaccusative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dative shift"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dative alternation"], themes["linguistics"]},
{word_type:"word",noun_meaning:["double dative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["personal dative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dative of purpose"], themes["linguistics"]},
{word_type:"word",noun_meaning:["ethic dative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical category"], themes["linguistics"]},
{word_type:"word",noun_meaning:["degrammaticalisation"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical number"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical word"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lexical word"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical aspect"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical alternation"], themes["linguistics"]},
{word_type:"word",noun_meaning:["univerbation"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical case"], themes["linguistics"]},
{word_type:"word",noun_meaning:["synonymification"], themes["linguistics"]},
{word_type:"word",noun_meaning:["ungrammaticality"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical mood"], themes["linguistics"]},
{word_type:"word",noun_meaning:["imperative mood"], themes["linguistics"]},
{word_type:"word",noun_meaning:["full word"], themes["linguistics"]},
{word_type:"word",noun_meaning:["empty word"], themes["linguistics"]},
{word_type:"word",noun_meaning:["grammatical gender"], themes["linguistics"]},
{word_type:"word",noun_meaning:["imperative language"], themes["linguistics"]},
{word_type:"word",noun_meaning:["hypothetical imperative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["categorical imperative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel quantity"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowelization"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nasal vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["front vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel harmony"], themes["linguistics"]},
{word_type:"word",noun_meaning:["first imperative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["second imperative"], themes["linguistics"]},
{word_type:"word",noun_meaning:["back vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["rounded vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["echo vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["long vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["semivowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["harmony of vowels"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowellessness"], themes["linguistics"]},
{word_type:"word",noun_meaning:["R-colored vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["rhotacized vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vocalic R"], themes["linguistics"]},
{word_type:"word",noun_meaning:["linking vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel sign"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel rhyme"], themes["linguistics"]},
{word_type:"word",noun_meaning:["consonant rhyme"], themes["linguistics"]},
{word_type:"word",noun_meaning:["gliding vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel killer"], themes["linguistics"]},
{word_type:"word",noun_meaning:["reduced vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["full vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel mutation"], themes["linguistics"]},
{word_type:"word",noun_meaning:["unrounded vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["cardinal vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["long-haired dictionary"], themes["linguistics"]},
{word_type:"word",noun_meaning:["pillow dictionary"], themes["linguistics"]},
{word_type:"word",noun_meaning:["prop vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nonvowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["nonconsonant"], themes["linguistics"]},
{word_type:"word",noun_meaning:["oral vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["schwa deletion"], themes["linguistics"]},
{word_type:"word",noun_meaning:["inherent vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["dark vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["thematic vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel reduction"], themes["linguistics"]},
{word_type:"word",noun_meaning:["lax vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["tense vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vocal tract"], themes["linguistics"]},
{word_type:"word",noun_meaning:["vowel point"], themes["linguistics"]},
{word_type:"word",noun_meaning:["happy vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["natural vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["neutral vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["R-coloured vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["short vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["overlong vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["half-long vowel"], themes["linguistics"]},
{word_type:"word",noun_meaning:["long-vowel mark"], themes["linguistics"]},
{word_type:"word",noun_meaning:["haček"], themes["linguistics"]},