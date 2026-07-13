import englishWords from "../englishWords.js";
import fs from "fs";
import fetch from "node-fetch";

const wordsNotInDictionaryArr = [];
const wordsToAddManually = [];
const wordsToAddToDictionaryArr = [];
const meaningKeys = [
  "noun_meaning",
  "verb_meaning",
  "adj_meaning",
  "adv_meaning",
  "adp_meaning",
  "pron_meaning",
  "part_meaning",
  "interj_meaning",
  "affix_meaning",
  "clitic_meaning",
];

// Cache so the same API call is never repeated
const posCache = new Map();

// Rate limiting state
let lastRequestTime = 0;

// Generic sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Ensure we never exceed X requests per second
async function rateLimit(minInterval = 1100) {
  const now = Date.now();
  const wait = lastRequestTime + minInterval - now;
  if (wait > 0) await sleep(wait);
  lastRequestTime = Date.now();
}

// Maps dictionaryapi.dev POS to your POS tags
function mapPOS(part) {
  switch (part) {
    case "noun": return "noun_meaning";
    case "exclamation": return "interj_meaning";
    case "interjection": return "interj_meaning";
    case "conjunction": return "conj_meaning";
    case "pronoun": return "pron_meaning";
    case "adjective": return "adj_meaning";
    case "adverb": return "adv_meaning";
    default: return "verb_meaning";
  }
}

// Fully resilient POS lookup
async function getPOS(word, attempt = 1) {
  // Cached?
  if (posCache.has(word)) return posCache.get(word);

  // Normalize word
  const clean = word.trim().toLowerCase().replace(/[^a-z]/gi, "");
  if (!clean) return null;

  // Respect rate limit
  await rateLimit(1100);

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${clean}`;

  let res;
  try {
    res = await fetch(url, { timeout: 7000 });
  } catch (err) {
    // Network error → retry with backoff
    if (attempt < 5) {
      console.warn(`Network error for "${word}", retrying (attempt ${attempt})...`);
      await sleep(attempt * 2000);
      return getPOS(word, attempt + 1);
    }
    console.warn(`Failed after retries: ${word}`);
    return null;
  }

  // Check content type
  const type = res.headers.get("content-type") || "";

  // Cloudflare block or HTML page
  if (!type.includes("application/json")) {
    const retryAfter = res.headers.get("retry-after");

    if (retryAfter) {
      // Respect Cloudflare retry-after header
      const wait = Number(retryAfter) * 1000;
      console.warn(`Rate limited for "${word}", waiting ${wait}ms...`);
      await sleep(wait);
      return getPOS(word, attempt);
    }

    // Fallback exponential backoff
    if (attempt < 5) {
      console.warn(`Non-JSON for "${word}", backoff retry ${attempt}...`);
      await sleep(attempt * 3000);
      return getPOS(word, attempt + 1);
    }

    console.warn(`Permanent Non-JSON failure for "${word}"`);
    return null;
  }

  // Parse JSON safely
  let data;
  try {
    data = await res.json();
  } catch {
    if (attempt < 5) {
      console.warn(`JSON parse error for "${word}", retrying...`);
      await sleep(attempt * 2000);
      return getPOS(word, attempt + 1);
    }
    console.warn(`Failed JSON for ${word}`);
    return null;
  }

  // Extract POS list
  const posList = data[0]?.meanings?.map(m => m.partOfSpeech) || [];
  const part = posList[0];

  if (!part) {
    posCache.set(word, null);
    return null;
  }

  const POS = mapPOS(part);

  // Cache result
  posCache.set(word, POS);
  console.log("returning")

  return POS;
}

function formatName(word) {
  // remove "to "
  word = word.replace(/^\s*to\s+/, "");

  word = word.replace("smth", "something");

  word = word.replace(/\([^)]*\)/g, "");

  const match = word.match(/\(([^)]*)\)/);
  const textInBrackets = match ? match[1] : null;

  // remove brackets
  word = word.replace(/[()<>]/g, "");

  // remove "intr." and "tr."
  word = word.replace(/\bintr\./g, "");
  word = word.replace(/\btr\./g, "");

  // collapse spaces → underscores
  word = word.trim().replace(/\s+/g, "_");

  if (textInBrackets) {
    word = `${textInBrackets}_${word}`;
  }

  return word;
}

function findPartOfSpeech(meaning) {
  meaning = meaning.trim().replace(/_+/g, " ");

  let found = null;

  outer: for (const word of englishWords) {
    for (const key of meaningKeys) {
      if (Object.hasOwn(word, key) && word[key].includes(meaning)) {
        found = key;
        break outer;
      }
    }
  }

  if (!found && !wordsNotInDictionaryArr.includes(meaning)) {
    wordsNotInDictionaryArr.push(meaning);

  }

  return found;
}

function format(textBlock) {
  const obj = {};

  //first, seperate block into indiviual lines, then store each line as a string in an array
  const lines = textBlock.trim().split("\n");

  //now format each line into key:value to put into an object
  lines.forEach((line) => {
    //splt each line into five seperate sections
    const splitByWhiteSpace = line.trim().split(" 	");

    const originalMeanings = splitByWhiteSpace[1];
    const direction = splitByWhiteSpace[2];
    let newMeanings = splitByWhiteSpace[3];
    let meaningType = "";

    const originalMeaningsArr = originalMeanings.trim().split(/[,/,+]/);
    const newMeaningsArr = newMeanings.trim().split(/[,/]/);

    let prevWasVerb = false;
    originalMeaningsArr.forEach((originalMeaning) => {
      newMeaningsArr.forEach((newMeaning) => {
        const beginsWithTo =
          newMeaning.charAt(0) === "t" && newMeaning.charAt(1) === "o";
        newMeaning = formatName(newMeaning);
        originalMeaning = formatName(originalMeaning);

        //detects if new meaning is a verb
        if (beginsWithTo || prevWasVerb) {
          meaningType = "verb_meaning";
          prevWasVerb = true;
        } else {
          //if not a verb, then we'll now have to lookup up the word in englishWords object and find what part of speech has been associated with the word

          meaningType = findPartOfSpeech(newMeaning);
        }

        if (meaningType) {
          //if object already has a key of the same name, simply add the key:value pairs to that key, else add the new key
          if (Object.hasOwn(obj, originalMeaning)) {
            obj[originalMeaning].push({
              pos: meaningType,
              meaning: [newMeaning],
            });
          } else {
            obj[originalMeaning] = [
              { pos: meaningType, meaning: [newMeaning] },
            ];
          }

          //if a semantic shift if bidirectional, make another shift with the meanings flipped
          if (direction === "↔") {
            if (Object.hasOwn(obj, newMeaning)) {
              obj[newMeaning].push({
                pos: meaningType,
                meaning: [originalMeaning],
              });
            } else {
              obj[newMeaning] = [
                { pos: meaningType, meaning: [originalMeaning] },
              ];
            }
          }
        }
      });
    });
  });

  fs.writeFileSync(
    "formatedSemanticShifts.txt",
    JSON.stringify(obj, null, 2),
    "utf8"
  );
}

(async () => {



format(`
0001 	to calculate, count 	→ 	to take into account 	17
0002 	to calculate, count 	→ 	to respect 	12
0003 	to find 	→ 	to have opinion 	15
0004 	to taste (tr.) 	↔ 	to try, to attempt 	28
0005 	to go, walk 	→ 	to find 	10
0006 	to think, consider 	→ 	to recall, recollect 	11
0007 	to turn, rotate (intr.) 	→ 	to become 	24
0008 	to know 	↔ 	to know how 	23
0009 	to search, look for 	→ 	to try, to attempt 	21
0010 	to call 	→ 	to read 	7
0011 	to calculate, count 	→ 	to tell 	16
0012 	to calculate, count 	→ 	to read 	45
0013 	to calculate, count 	→ 	to have opinion 	56
0014 	to grasp, seize 	— 	to get, obtain 	10
0015 	<hat> 	→ 	fool 	2
0016 	sweet (taste) 	→ 	dear, darling 	15
0017 	salty 	→ 	funny 	2
0018 	to hear / to listen 	→ 	to understand 	65
0019 	to remind 	→ 	to resemble, be alike 	8
0020 	to hold (in hands) 	— 	to last 	2
0021 	to catch fire 	— 	to fight, scuffle 	2
0022 	to come, arrive 	→ 	to get, obtain 	9
0023 	to get, obtain 	→ 	can, to be able 	3
0024 	to get, obtain 	→ 	to manage to do smth 	2
0025 	to reach 	→ 	to get, obtain 	5
0026 	to find 	→ 	to get, obtain 	12
0027 	to get, obtain 	→ 	to contain 	4
0028 	to get, obtain 	→ 	to receive visitors 	5
0029 	to get, obtain 	→ 	to become infected 	18
0030 	to get, obtain 	→ 	must 	3
0031 	free 	→ 	can, to be able 	8
0032 	to get, obtain 	↔ 	to wait 	3
0033 	to get, obtain 	→ 	to hear 	1
0034 	to hear / to listen 	→ 	to obey 	241
0035 	to see/to look at 	→ 	to have opinion 	40
0036 	to see/to look at 	→ 	to try, to attempt 	9
0037 	to see/to look at 	→ 	to wait 	25
0038 	to fall down 	→ 	to meet accidentally 	3
0039 	to meet 	→ 	to like 	1
0040 	to find 	→ 	to meet 	9
0041 	to taste (tr.) 	→ 	to like 	6
0042 	to smile 	→ 	to please 	5
0043 	to want 	↔ 	to love 	14
0044 	to know how 	→ 	can, to be able 	10
0045 	to see/to look at 	→ 	to seem 	7
0046 	dog 	→ 	seal (animal) 	9
0047 	abdomen / belly 	→ 	seat of emotions 	36
0048 	air 	→ 	weather 	58
0049 	to walk, wander 	→ 	to loaf, do nothing 	3
0050 	genuine, true 	— 	honest 	1
0051 	memory 	— 	respect (n.) 	2
0052 	memory 	— 	health 	1
0053 	time 	→ 	weather 	33
0054 	wind 	→ 	window 	8
0055 	sharp 	→ 	spicy 	15
0056 	to sting 	→ 	spicy 	4
0057 	boy 	↔ 	servant 	46
0058 	right (vs. left) 	→ 	competent 	2
0059 	correct, right 	→ 	right (vs. left) 	35
0060 	straight 	↔ 	right (vs. left) 	26
0061 	straight 	→ 	correct, right 	124
0062 	summer 	→ 	year 	41
0063 	storm 	→ 	winter 	4
0064 	to burst 	→ 	to die 	2
0065 	noon, midday 	→ 	South 	18
0066 	to make noise 	→ 	to speak 	6
0067 	light, bright, clear 	→ 	comprehensible 	24
0068 	morning 	↔ 	tomorrow 	139
0069 	hot 	→ 	recent 	5
0070 	when 	→ 	if 	16
0071 	part 	→ 	destiny 	25
0072 	flower 	→ 	colour 	5
0073 	sweet (taste) 	→ 	fresh (of water) 	24
0074 	spruce (Picea) 	→ 	abies (Abies) 	9
0075 	morning 	→ 	spring (season) 	1
0076 	branch, twig 	— 	willow 	4
0077 	to listen 	→ 	to keep silent 	2
0078 	to burst 	→ 	to get angry 	3
0079 	to turn, rotate (tr.) 	→ 	to distort 	3
0080 	to turn, rotate (tr.) 	→ 	to translate 	8
0081 	to pull, to draw 	→ 	inclination to smth 	3
0082 	to pull, to draw 	→ 	to endure 	3
0083 	to pull, to draw 	→ 	to row (with oars) 	2
0084 	to dig 	— 	to row (with oars) 	2
0085 	to sweep 	→ 	to distract 	1
0086 	to call 	→ 	to cause 	4
0087 	wet 	→ 	raw 	7
0088 	Turk 	→ 	dandelion 	1
0089 	wet 	→ 	weak 	4
0090 	lightning 	↔ 	quick 	5
0091 	poor, needy 	— 	desert (n.) 	1
0092 	to go out 	— 	to cost 	1
0093 	to go out 	→ 	to lose colour 	2
0094 	to go out 	→ 	to dislocate (of a joint) 	2
0095 	to go out 	→ 	to become infected 	1
0096 	inflated 	→ 	proud 	10
0097 	to freeze, be cold 	→ 	to fear, be afraid 	2
0098 	hard, solid 	→ 	obstinate, persistent 	19
0099 	to search, look for 	→ 	to ask for, request 	22
0100 	top, upper part 	— 	beginning 	2
0101 	wet 	→ 	dew 	2
0102 	white 	→ 	silver 	25
0103 	white 	— 	iron 	1
0104 	middle, centre 	— 	surface 	1
0105 	false, wrong 	— 	insolent 	1
0106 	to mix, stir 	→ 	worry, anxiety 	10
0107 	thief 	→ 	enemy 	1
0108 	lean, thin (of a person) 	— 	greedy 	1
0109 	time 	↔ 	opportunity 	5
0110 	dry 	→ 	emotionless 	10
0111 	to shake 	→ 	to distort 	1
0112 	oar 	→ 	shoulder-blade, scapula 	3
0113 	to throw 	→ 	to leave, abandon 	20
0114 	to give birth 	→ 	to cause 	5
0115 	quick 	→ 	skilful, dexterous 	4
0116 	to carry 	→ 	to move, change residence 	2
0117 	to turn, rotate (intr.) 	— 	shoulder-blade, scapula 	1
0118 	corner 	→ 	gulf 	2
0119 	cheerful 	— 	adulterer 	1
0120 	to shrink 	→ 	to understand 	1
0121 	to turn, rotate (intr.) 	— 	to reincarnate 	1
0122 	mud 	— 	false, wrong 	1
0123 	Turk 	→ 	swearword 	3
0124 	flower 	→ 	fire 	2
0125 	woman 	— 	eunuch 	2
0126 	heavenly body 	→ 	week 	2
0127 	sun 	→ 	Sunday 	21
0128 	Venus 	→ 	Friday 	23
0129 	Saturn 	→ 	Saturday 	12
0130 	Jupiter 	→ 	Thursday 	22
0131 	Mars 	→ 	Tuesday 	24
0132 	moon 	→ 	Monday 	32
0133 	Mercury 	→ 	Wednesday 	20
0134 	shine (n.) 	→ 	fame, reputation 	6
0135 	clever, wise 	— 	cautious 	2
0136 	to grasp, seize 	→ 	inclination to smth 	1
0137 	to suffer 	— 	to endure 	10
0138 	to endure 	— 	to forgive 	2
0139 	opposite (space) 	→ 	false, wrong 	4
0140 	to take prisoner 	→ 	to charm, to delight 	7
0141 	to drag 	→ 	to charm, to delight 	11
0142 	to close one's eyes 	→ 	to die 	3
0143 	to close one's eyes 	→ 	to ignore, disregard 	2
0144 	to be tied 	→ 	to feel affection 	4
0145 	opening, hole 	→ 	genitalia 	2
0146 	shame 	→ 	genitalia 	10
0147 	egg 	→ 	testicle 	28
0148 	nut, hazel 	→ 	testicle 	3
0149 	potato 	→ 	testicle 	2
0150 	to clean 	→ 	to cure, treat (medically) 	2
0151 	horn 	↔ 	branch, twig 	11
0152 	lizard 	↔ 	crocodile 	10
0153 	crocodile 	→ 	submarine 	1
0154 	crocodile 	→ 	seahorse (Hippocampus) 	10
0155 	radish 	→ 	carrot 	5
0156 	hot 	→ 	spicy 	2
0157 	tasteless 	→ 	boring 	2
0158 	rib 	→ 	bone 	8
0159 	young 	→ 	husband 	1
0160 	salad 	→ 	lettuce 	19
0161 	near 	→ 	cheap 	1
0162 	to drive, force to move on 	→ 	to tell lies 	2
0163 	to return (tr.) 	→ 	to answer 	11
0164 	to turn, rotate (intr.) 	→ 	to return (intr.) 	8
0165 	skirt 	→ 	whore 	1
0166 	skirt 	→ 	woman 	6
0167 	foam 	→ 	chatter, idle talk 	1
0168 	to shoot 	→ 	to tell lies 	1
0169 	court of law 	→ 	territorial entity 	3
0170 	to strike, hit 	↔ 	to eat 	5
0171 	to strike, hit 	→ 	to tell lies 	3
0172 	puppy (of a dog) 	→ 	inexperienced 	9
0173 	to hunt 	→ 	to flirt 	2
0174 	to braid, plait, weave 	→ 	to copulate 	1
0175 	to put into 	→ 	to eat 	1
0176 	to press 	→ 	to visit 	1
0177 	to press 	→ 	to approach, come near 	2
0178 	to correct 	→ 	to cure, treat (medically) 	2
0179 	heavy (of weight) 	→ 	stupid 	3
0180 	to break (tr.) 	→ 	to confess 	3
0181 	naked, bare 	→ 	raw 	1
0182 	footprint, track 	→ 	behind 	1
0183 	last 	→ 	next 	2
0184 	to sleep 	→ 	to copulate 	13
0185 	tired 	— 	sick, ill 	7
0186 	neck 	— 	back of the head, occupit 	4
0187 	neck 	→ 	pride 	2
0188 	flexible 	→ 	compliant, pliable 	10
0189 	to get tired 	— 	to forget 	1
0190 	heart 	→ 	essence, core 	3
0191 	Turk 	→ 	moslem 	2
0192 	sign, designation 	→ 	genitalia 	6
0193 	heel (of a foot) 	→ 	edge, border 	3
0194 	edge, border 	→ 	last 	2
0195 	heel (of a foot) 	→ 	behind 	2
0196 	brave 	↔ 	tiger 	2
0197 	to fly away 	→ 	to evaporate, exhale 	2
0198 	to vomit 	→ 	to swear, curse 	2
0199 	dry 	→ 	vain, in vain 	1
0200 	to bind 	→ 	astringent, tart 	1
0201 	easy 	— 	quick 	2
0202 	cold 	— 	tart (taste) 	1
0203 	jealous 	— 	envious, envy 	11
0204 	white 	→ 	beautiful 	1
0205 	interest 	— 	respect (n.) 	1
0206 	to soil, make dirty 	→ 	to waste 	1
0207 	tree 	→ 	coffin 	3
0208 	horn 	— 	bone 	1
0209 	bridge 	→ 	floor (vs. ceiling) 	3
0210 	arrow 	→ 	rainbow 	1
0211 	shadow 	→ 	reflection (in the mirror, water) 	24
0212 	to walk, wander 	→ 	to visit 	1
0213 	clean (adj.) 	→ 	totally, absolutely 	5
0214 	short (size) 	→ 	poor, needy 	2
0215 	to dye 	→ 	to boast 	2
0216 	falcon 	→ 	bully 	1
0217 	to shear 	→ 	to destroy, annihilate 	2
0218 	to press 	→ 	to compel, coerce 	4
0219 	to itch 	→ 	to get angry 	1
0220 	strong 	→ 	strong (of liquid or smell) 	8
0221 	wind 	→ 	anger 	1
0222 	brain (cerebrum) 	↔ 	head 	8
0223 	power, authority 	→ 	state (sovereign polity) 	6
0224 	strength 	→ 	army 	15
0225 	nimble, deft 	→ 	comfortable 	1
0226 	wide, broad 	— 	flat (adj) 	6
0227 	to present, gift 	→ 	to deceive 	1
0228 	to spring, jump 	→ 	to rise (of Moon, Sun) 	1
0229 	to sit 	→ 	to give birth 	1
0230 	bowels, intestine 	→ 	pregnant 	1
0231 	to die 	→ 	very, of high degree 	5
0232 	to die 	→ 	eclipse 	4
0233 	long (time) 	— 	long ago 	2
0234 	to cover 	→ 	to copulate 	3
0235 	thick (of a growth, hair) 	→ 	bass, low-pitched voice 	2
0236 	inner side of hide 	— 	bast, the layer under the bark 	1
0237 	to tear off, peel off 	→ 	to carp, criticize 	2
0238 	footprint, track 	→ 	matter, affair 	1
0239 	to make scratches 	→ 	to write 	5
0240 	to wash 	→ 	to celebrate 	2
0241 	to present, gift 	→ 	to forgive 	4
0242 	to grasp, seize 	→ 	to understand 	55
0243 	opposite (space) 	— 	enemy 	5
0244 	lower part 	— 	behind 	1
0245 	to suffer 	— 	to fear, be afraid 	1
0246 	amazing 	— 	fearful, dreadful 	15
0247 	good 	— 	new 	5
0248 	top, upper part 	→ 	good 	5
0249 	to diminish 	— 	tasteless 	1
0250 	mind (n.) 	— 	seat of emotions 	1
0251 	to understand 	— 	to recall, recollect 	1
0252 	curved 	— 	incantation, spell 	1
0253 	right (vs. left) 	— 	thief 	1
0254 	light, bright, clear 	→ 	clever, wise 	5
0255 	wave 	— 	sail (n.) 	1
0256 	flat (adj) 	— 	equal, identical 	13
0257 	pot 	→ 	womb, uterus 	2
0258 	to throw 	— 	to think, consider 	1
0259 	to crawl 	→ 	snake 	9
0260 	to float 	→ 	to soar 	11
0261 	thief 	→ 	adulterer 	1
0262 	sad 	— 	fool 	1
0263 	people, nation 	— 	servant 	2
0264 	to try, to attempt 	— 	to care for, look after 	2
0265 	to fall down 	→ 	to happen 	8
0266 	to go down 	→ 	to appoint (to a position) 	1
0267 	many, much 	— 	cheap 	1
0268 	to sink into 	→ 	gloomy, depressed 	3
0269 	to dig 	→ 	to investigate 	13
0270 	to dig 	— 	angry 	1
0271 	narrow, close 	— 	boring 	1
0272 	servant 	→ 	I 	11
0273 	lord, master 	→ 	you (pronoun 2 sg., polite) 	5
0274 	bitter 	→ 	beautiful 	2
0275 	poisonous 	→ 	sarcastic 	9
0276 	expensive 	↔ 	important 	9
0277 	to bend, bow (intr.) 	→ 	tender (adj.) 	1
0278 	stone (material) 	→ 	glass (material) 	5
0279 	straight 	— 	sober 	1
0280 	to pull, to draw 	→ 	to get a cramp, spasm 	1
0281 	to pull, to draw 	→ 	to thresh (grain) 	1
0282 	to pull, to draw 	→ 	to hinder 	1
0283 	to sting 	— 	to sew 	1
0284 	to sweep 	→ 	to refuse 	2
0285 	dust 	— 	hail 	1
0286 	to bend, bow (intr.) 	→ 	to die 	4
0287 	to strew 	→ 	to hinder 	1
0288 	to open (intr.) 	→ 	to spend (money) 	1
0289 	cattle 	→ 	cattle egret 	8
0290 	to open (tr.) 	→ 	to rest 	1
0291 	custom, habit 	→ 	menstruation 	2
0292 	shoulder 	→ 	support (n.) 	1
0293 	<insect> 	→ 	talkative person 	2
0294 	to flow 	→ 	to crawl 	2
0295 	to flow 	→ 	to fall (of stars) 	2
0296 	forehead 	→ 	front part 	14
0297 	god 	→ 	very, of high degree 	2
0298 	mother 	→ 	main 	6
0299 	naked, bare 	→ 	lacking in smth 	5
0300 	pear 	→ 	fool 	2
0301 	to throw 	→ 	to begin (intr.) 	1
0302 	to throw 	→ 	to tell lies 	1
0303 	foot/leg 	→ 	step (of a staircase, step-ladder) 	1
0304 	foot/leg 	→ 	step, pace 	4
0305 	<fruit> 	→ 	bullet 	6
0306 	to bind 	→ 	to depend 	1
0307 	to look 	→ 	to depend 	1
0308 	to step on 	→ 	to attack 	3
0309 	to run out (of smth) 	→ 	to charm, to delight 	1
0310 	horned 	→ 	cuckold, deceived husband 	20
0311 	low (location) 	→ 	bad 	3
0312 	foot/leg 	→ 	jack (playing card) 	1
0313 	belly 	→ 	generation 	1
0314 	faeces 	→ 	bad 	14
0315 	to spoil (tr.) 	→ 	to deflorate 	3
0316 	to find 	→ 	to find out 	1
0317 	to find 	→ 	to reach 	1
0318 	to rotate (tr.) 	→ 	to dislocate (of a joint) 	1
0319 	to go up 	→ 	to rise (of Moon, Sun) 	9
0320 	to go up 	→ 	to stop (intr.) 	1
0321 	light, bright, clear 	→ 	honest 	1
0322 	to raise, lift (tr.) 	→ 	to present, gift 	3
0323 	to raise, lift (tr.) 	→ 	to praise 	4
0324 	to raise, lift (tr.) 	→ 	pregnant 	1
0325 	to raise, lift (tr.) 	→ 	to grasp, seize 	1
0326 	to raise, lift (tr.) 	→ 	to vomit 	3
0327 	shallow 	→ 	light, bright, clear 	1
0328 	flower 	→ 	bastard 	1
0329 	footprint, track 	→ 	sign, designation 	1
0330 	footprint, track 	→ 	scar 	6
0331 	oil (food) 	→ 	petroleum, oil 	11
0332 	sweet (taste) 	→ 	indulgent 	1
0333 	to float 	→ 	to recall, recollect 	1
0334 	to float 	→ 	cheerful mood 	1
0335 	to float 	→ 	to sway 	1
0336 	thin (of an object) 	→ 	light, bright, clear 	1
0337 	to strike, hit 	→ 	to astonish 	13
0338 	vessel 	→ 	ability 	1
0339 	hand/arm 	→ 	skilful, dexterous 	4
0340 	to raise, lift (tr.) 	→ 	to plough 	2
0341 	to stand up 	→ 	to happen 	2
0342 	to fall down 	→ 	to decrease drastically 	18
0343 	to go down 	→ 	to grow old, decay 	2
0344 	to wound (tr.) 	→ 	to offend (tr.) 	15
0345 	to strike, hit 	→ 	to steal 	4
0346 	dream (during sleep) 	↔ 	daydream (n.) 	37
0347 	to drive, force to move on 	→ 	to search, look for 	1
0348 	to go down 	→ 	to lack 	1
0349 	strong 	↔ 	thick 	5
0350 	to fence 	→ 	to defend 	3
0351 	strong 	→ 	many, much 	1
0352 	strong 	→ 	good 	5
0353 	grey 	→ 	heavy (of weight) 	1
0354 	to strew 	— 	to pour 	25
0355 	soon 	— 	recently 	9
0356 	soon 	→ 	almost 	6
0357 	weak 	→ 	bad 	10
0358 	weak 	→ 	rare 	2
0359 	to touch 	→ 	to offend (tr.) 	5
0360 	to touch 	→ 	to touch (about feelings) 	12
0361 	to touch 	→ 	to become infected 	2
0362 	to suffice, be enough 	↔ 	can, to be able 	3
0363 	to pursue 	→ 	to care for, look after 	1
0364 	back (body part) 	→ 	support (n.) 	8
0365 	joint, articulation 	— 	sapling 	1
0366 	heavy (of weight) 	→ 	difficult 	81
0367 	heavy (of weight) 	→ 	insulting, offensive 	5
0368 	to bury, place in the ground 	→ 	to bury, inter 	14
0369 	to get dry 	→ 	to feel thirsty 	7
0370 	to read 	→ 	to learn, study 	72
0371 	branch, twig 	— 	sleeve 	1
0372 	sleeve 	→ 	branch (of a river) 	3
0373 	moss 	— 	gum, gingiva 	1
0374 	to hide (tr.) 	→ 	to steal 	5
0375 	frozen 	— 	beautiful 	1
0376 	sweet (taste) 	— 	tasty 	10
0377 	necessary 	→ 	suitable 	1
0378 	to stop (tr.) 	— 	to appoint (to a position) 	1
0379 	to make sit 	→ 	to marry off (a daughter) 	1
0380 	to throw 	→ 	to stop doing smth. 	11
0381 	to pull, to draw 	→ 	to smoke (tobacco) 	11
0382 	to strike, hit 	→ 	to play (a musical instrument) 	14
0383 	to see/to look at 	→ 	to foresee 	10
0384 	to see/to look at 	→ 	to care for, look after 	45
0385 	thigh / hip 	→ 	back (body part) 	5
0386 	mud 	— 	swamp 	23
0387 	mud 	→ 	faeces 	17
0388 	shine (n.) 	→ 	lightning 	7
0389 	beard 	↔ 	chin 	78
0390 	eyebrow 	↔ 	eyelash 	71
0391 	good 	→ 	kind, good-hearted 	15
0392 	beautiful 	↔ 	good 	33
0393 	arc 	→ 	rainbow 	6
0394 	miserable, unhappy 	↔ 	poor, needy 	15
0395 	time 	↔ 	hour 	9
0396 	inflated 	→ 	empty 	1
0397 	empty 	→ 	idle 	4
0398 	inflated 	→ 	false, wrong 	2
0399 	ford 	→ 	watering place (for animals) 	1
0400 	to press 	— 	to choke, strangle 	1
0401 	to choke, strangle 	→ 	to sink (tr.) 	5
0402 	to choke, strangle 	→ 	to vomit 	1
0403 	goal frame (sport) 	↔ 	goal (sport result) 	4
0404 	coast, shore 	→ 	hill 	1
0405 	period of time 	→ 	age 	8
0406 	time / period of time 	— 	24 hours 	6
0407 	period of time 	— 	year 	1
0408 	to feel pain, ache 	→ 	it's a pity 	3
0409 	hump (of a person or camel) 	— 	back (body part) 	3
0410 	shoulder-blade, scapula 	— 	hump (of a person or camel) 	1
0411 	wheel 	→ 	vehicle 	8
0412 	to emit smoke 	→ 	to smoke (tobacco) 	18
0413 	red 	→ 	beautiful 	6
0414 	to love 	→ 	to kiss 	5
0415 	to catch 	→ 	to hunt 	4
0416 	place 	→ 	town, city 	3
0417 	box, container 	→ 	chest (body part) 	2
0418 	dark (adj.) 	↔ 	black cloud 	2
0419 	quick 	→ 	insolent 	3
0420 	quick 	→ 	unexpected 	4
0421 	<vessel> 	→ 	pelvis 	11
0422 	trunk (of a tree) 	— 	stump (of tree) 	7
0423 	little, small 	→ 	slow (adj.) 	1
0424 	shoulder 	→ 	branch (of a river) 	4
0425 	shoulder 	→ 	mountain slope 	5
0426 	early 	→ 	morning 	8
0427 	turnip 	→ 	beet (Beta vulgaris) 	2
0428 	melon (Cucumis melo) 	— 	pumpkin 	6
0429 	water-melon (Cucurbita citrullus) 	↔ 	pumpkin 	4
0430 	water-melon (Cucurbita citrullus) 	↔ 	melon (Cucumis melo) 	9
0431 	torso 	→ 	corpse 	5
0432 	tendon 	→ 	back of the head, occupit 	1
0433 	cover, lid 	→ 	eyelid 	4
0434 	shoulder 	→ 	back (body part) 	8
0435 	to dream while sleeping 	— 	to seem 	1
0436 	lip 	→ 	mouth 	112
0437 	horn 	— 	corner 	15
0438 	word 	— 	letter (character) 	7
0439 	life 	→ 	belly 	5
0440 	enemy 	— 	murderer 	1
0441 	enemy 	→ 	cunning person 	1
0442 	straight 	→ 	easy / simple 	3
0443 	mother 	→ 	womb, uterus 	7
0444 	to think, consider 	↔ 	to speak 	6
0445 	face 	— 	eye 	71
0446 	eyelid 	— 	eyebrow 	4
0447 	eye 	↔ 	eyelid 	4
0448 	eye 	→ 	front part 	5
0449 	eye 	→ 	before (temporal) 	3
0450 	eye 	→ 	opening, hole 	37
0451 	eye 	→ 	window 	19
0452 	eye 	→ 	cavity, hollow 	4
0453 	eye 	→ 	jewel, precious stone 	9
0454 	eye 	→ 	small object 	1
0455 	eye 	→ 	headlight (of a car) 	2
0456 	eye 	→ 	wheel 	2
0457 	eye 	→ 	spot, stain 	5
0458 	eye 	→ 	oil particle 	3
0459 	eye 	→ 	spot, pip (on playing cards or dice) 	10
0460 	eye 	→ 	spectacles 	19
0461 	eye 	→ 	fried eggs 	8
0462 	eye 	→ 	loop, mesh 	38
0463 	eye 	→ 	bud (on a twig) 	18
0464 	eye 	→ 	peephole 	5
0465 	eye 	→ 	spring, fountain 	9
0466 	eye 	→ 	whirlpool 	1
0467 	eye 	→ 	middle, centre 	3
0468 	eye 	→ 	eye of typhoon 	6
0469 	eye 	→ 	burner 	3
0470 	eye 	→ 	vision 	12
0471 	eye 	→ 	look (n.) 	4
0472 	eye 	→ 	opinion 	1
0473 	eye 	→ 	supervision 	9
0474 	to look 	→ 	evil eye 	37
0475 	eye 	→ 	observer 	4
0476 	mouth 	→ 	ravine 	5
0477 	mouth 	→ 	mouth (of a river) 	19
0478 	mouth 	→ 	face 	35
0479 	mouth 	→ 	beak 	12
0480 	mouth 	→ 	grimace 	1
0481 	mouth 	→ 	impudence 	1
0482 	mouth 	→ 	opening, hole 	42
0483 	mouth 	→ 	edge, border 	9
0484 	mouth 	→ 	front part 	1
0485 	mouth 	→ 	instrument, tool 	1
0486 	mouth 	→ 	fast (n.) 	2
0487 	mouth 	↔ 	eater 	14
0488 	mouth 	→ 	herald, messenger 	2
0489 	mouth 	→ 	speech 	14
0490 	nose 	→ 	cape 	19
0491 	nose 	→ 	nostril 	22
0492 	nose 	→ 	face 	11
0493 	nose 	→ 	beak 	26
0494 	nose 	→ 	muzzle 	6
0495 	nose 	→ 	front part 	14
0496 	nose 	→ 	corner 	1
0497 	nose 	↔ 	mountain 	3
0498 	nose 	→ 	sense of smell 	7
0499 	nose 	→ 	informer 	1
0500 	nose 	→ 	beginning 	2
0501 	nose 	→ 	snot 	3
0502 	ear 	→ 	opening, hole 	9
0503 	ear 	→ 	hearing 	10
0504 	ear 	↔ 	listener 	3
0505 	throat 	→ 	ravine 	6
0506 	throat 	→ 	branch (of a river) 	4
0507 	throat 	→ 	passageway 	2
0508 	throat 	→ 	mouth (of a river) 	4
0509 	comb 	↔ 	comb (of a bird) 	5
0510 	comb (of a bird) 	— 	mane 	1
0511 	comb (of a bird) 	→ 	mountain ridge 	3
0512 	comb (of a bird) 	→ 	cap peak 	1
0513 	mane 	→ 	mountain ridge 	8
0514 	head 	→ 	headstream 	9
0515 	head 	↔ 	peak of mountain 	24
0516 	forelock 	→ 	hill 	1
0517 	foot/leg 	→ 	mouth (of a river) 	2
0518 	back of the head, occupit 	→ 	hill 	1
0519 	top of the head 	— 	peak of mountain 	8
0520 	neck 	→ 	mountain pass 	6
0521 	eyebrow 	→ 	hill 	2
0522 	arm 	→ 	branch (of a river) 	11
0523 	lip 	→ 	edge, border 	14
0524 	chest (body part) 	→ 	mountain slope 	5
0525 	tongue (body part) 	→ 	elongated object 	5
0526 	tongue (body part) 	→ 	mat, bedding 	2
0527 	forehead 	→ 	mountain slope 	2
0528 	forehead 	→ 	elongated object 	1
0529 	brain (cerebrum) 	→ 	swamp 	1
0530 	rib 	→ 	mountain ridge 	3
0531 	rib 	→ 	mountain slope 	1
0532 	flank (body part) 	→ 	mountain slope 	7
0533 	back (body part) 	→ 	plateau 	1
0534 	tooth 	→ 	elongated object 	12
0535 	elbow 	→ 	bend (of a river) 	6
0536 	horn 	→ 	peak of mountain 	5
0537 	horn 	→ 	cape 	2
0538 	horn 	→ 	ravine 	1
0539 	hair 	→ 	head 	17
0540 	head 	→ 	forehead 	8
0541 	nail (body part) 	→ 	finger / toe 	6
0542 	hand/arm 	→ 	finger / toe 	40
0543 	belly 	→ 	body 	4
0544 	skin (of a person) 	→ 	torso 	2
0545 	to pay 	→ 	to revenge 	22
0546 	heat (n.) 	→ 	thirst 	2
0547 	heel (of a foot) 	→ 	heel (of a shoe) 	18
0548 	narrow, close 	→ 	difficult 	23
0549 	pocket 	→ 	wealth 	5
0550 	heavy (of weight) 	→ 	stuffy, close 	8
0551 	to go, walk 	→ 	toilet 	3
0552 	granule 	→ 	small quantity of something 	5
0553 	garbage 	→ 	many, much 	1
0554 	cunning, sly 	↔ 	devil, satan 	6
0555 	snake 	→ 	perfidious, crafty person 	7
0556 	herald, messenger 	— 	matchmaker 	1
0557 	history 	→ 	event, occurrence 	8
0558 	hot 	→ 	hoarse 	1
0559 	to heat up, warm up 	→ 	to strike, hit 	4
0560 	to mix, stir 	→ 	to confuse (with) 	13
0561 	hand 	→ 	handful 	15
0562 	worm 	→ 	penis 	2
0563 	man (male) 	↔ 	human, person 	182
0564 	body 	→ 	human, person 	3
0565 	to come, arrive 	→ 	to have experience 	1
0566 	to come, arrive 	→ 	to reach a state 	2
0567 	to come, arrive 	→ 	must 	2
0568 	to enter 	→ 	to begin (tr., intr.) 	7
0569 	to go out 	→ 	to result in 	5
0570 	to go up 	→ 	to begin (tr.) 	2
0571 	to cross, traverse 	→ 	to have experience 	1
0572 	to cross, traverse 	→ 	to become 	4
0573 	to come, arrive 	→ 	to come (of an event) 	14
0574 	boy 	↔ 	son 	52
0575 	girl 	↔ 	daughter 	203
0576 	young 	↔ 	new 	9
0577 	old (vs. young) 	— 	old (vs. new) 	6
0578 	to disappear 	→ 	to spoil (intr.) 	1
0579 	sky 	— 	year 	3
0580 	<crockery> 	→ 	face 	3
0581 	cold 	→ 	unpleasant 	5
0582 	to inhabit, live 	↔ 	to be situated 	4
0583 	hyena 	— 	old (vs. young) 	2
0584 	to grasp, seize 	→ 	to conceive, become pregnant 	2
0585 	missing, failing 	→ 	stupid 	2
0586 	dog 	→ 	<curse: bad person> 	10
0587 	dog 	→ 	Arctic fox 	4
0588 	pleasure 	— 	benefit 	1
0589 	<wooden object> 	→ 	fool 	20
0590 	bone 	→ 	yellow 	1
0591 	house 	→ 	family 	15
0592 	to fall down 	→ 	to fail 	7
0593 	foot/leg 	→ 	cock (of a gun) 	1
0594 	sharp point 	→ 	chief, boss 	1
0595 	hook 	↔ 	fang 	3
0596 	hook 	— 	claw 	2
0597 	wood, timber 	→ 	substance, material 	3
0598 	tree 	— 	firewood 	18
0599 	tree 	→ 	wood, timber 	20
0600 	tree 	— 	forest 	16
0601 	wood, timber 	↔ 	forest 	6
0602 	firewood 	— 	wood, timber 	10
0603 	road 	→ 	sea 	1
0604 	to kill 	— 	to sow 	1
0605 	to heat up, warm up 	— 	to weaken, loosen 	1
0606 	beak 	→ 	cock (of a gun) 	2
0607 	ray 	— 	chain (n.) 	1
0608 	to lose (an object) 	→ 	to extinguish 	1
0609 	news 	— 	bribe 	1
0610 	fang 	— 	maple 	1
0611 	soft (adj.) 	↔ 	weak 	10
0612 	throat 	— 	cock (of a gun) 	1
0613 	human, person 	→ 	other's 	3
0614 	to pull, to draw 	→ 	to weigh (intr.) 	7
0615 	ashes 	→ 	puffball 	1
0616 	to dawn 	— 	to want 	1
0617 	sky 	→ 	palate 	13
0618 	to throw 	— 	to shear 	1
0619 	ashes 	— 	sawdust 	1
0620 	dandruff 	— 	bran 	6
0621 	loins 	→ 	middle, centre 	4
0622 	new 	→ 	bride 	3
0623 	shame 	— 	defect 	1
0624 	to see/to look at 	→ 	appearance, look 	11
0625 	noise 	→ 	rumour 	14
0626 	snake 	→ 	caterpillar 	7
0627 	worm 	— 	intestinal worm 	8
0628 	cattle 	→ 	<curse: bad person> 	10
0629 	bitter 	— 	poison 	4
0630 	glass (material) 	↔ 	window 	14
0631 	sky 	— 	frost 	2
0632 	to stand up 	→ 	to wake up (intr.) 	21
0633 	copper 	→ 	brass 	17
0634 	to become visible 	→ 	to come, arrive 	1
0635 	greedy 	→ 	thief 	2
0636 	top, upper part 	→ 	North 	11
0637 	lower part 	→ 	South 	5
0638 	empty 	→ 	vain, in vain 	17
0639 	to ripen 	↔ 	to become ready (of food) 	10
0640 	to burn (intr.) 	→ 	to ripen 	2
0641 	to ripen 	→ 	to mature 	6
0642 	distance 	— 	time distance 	3
0643 	lion (Panthera leo) 	→ 	monarch 	2
0644 	to load 	→ 	to strike, hit 	2
0645 	to castrate 	↔ 	to take out 	3
0646 	to play (intr.) 	→ 	dance (n.) 	16
0647 	to play (intr.) 	→ 	joke 	8
0648 	to tear off, peel off 	→ 	to make empty 	1
0649 	hand/arm 	→ 	side (n.) 	7
0650 	hand/arm 	→ 	kind (n.) 	2
0651 	liquid (adj.) 	→ 	sparse 	5
0652 	liquid (adj.) 	→ 	weak 	1
0653 	to eat 	→ 	to be fed up with 	4
0654 	to shout 	→ 	to cry, weep 	7
0655 	to tin 	→ 	to disgrace, dishonor 	2
0656 	brave 	→ 	lavish, generous 	2
0657 	arrow 	— 	comb 	1
0658 	to walk, to go 	— 	to search, look for 	3
0659 	to scratch (when itches) 	— 	to shave 	1
0660 	navel 	→ 	stone (of a fruit) 	1
0661 	to slaughter (cattle) 	— 	to sweep 	1
0662 	sign, designation 	→ 	betrothal, engagement 	2
0663 	bad 	— 	vain, in vain 	2
0664 	to pull, to draw 	→ 	to compete 	3
0665 	to go away 	→ 	to end, finish 	1
0666 	soul, spirit 	→ 	human, person 	12
0667 	breathing 	→ 	human, person 	2
0668 	girl 	→ 	pupil (of an eye) 	12
0669 	doll 	→ 	pupil (of an eye) 	9
0670 	boy 	→ 	pupil (of an eye) 	2
0671 	pumpkin 	→ 	head 	18
0672 	old (vs. new) 	— 	firm, durable 	1
0673 	green 	→ 	plant (biol.) 	10
0674 	<artiodactyl (even-toed animal)> 	→ 	woman 	14
0675 	price 	→ 	mark, grade (at school) 	4
0676 	tailor's thimble 	— 	cupola, dome 	1
0677 	tailor's thimble 	→ 	foxglove (Digitalis) 	15
0678 	strength 	→ 	power, authority 	13
0679 	strength 	→ 	violence 	2
0680 	to swell up 	→ 	angry 	5
0681 	hoar-frost 	— 	dew 	3
0682 	weather 	→ 	mood 	2
0683 	air 	→ 	melody, tune 	6
0684 	rolling-pin 	— 	arrow 	1
0685 	to fly 	→ 	to run 	7
0686 	early 	— 	shortly 	7
0687 	frequent 	— 	quick 	2
0688 	to get on well, be on good terms 	— 	to suit (of clothes etc.) 	2
0689 	big 	— 	brave 	1
0690 	to whet 	— 	to scratch (when itches) 	1
0691 	to strike, hit 	→ 	to shoot 	19
0692 	to strike, hit 	→ 	to kill 	40
0693 	to strike, hit 	→ 	to break (tr.) 	5
0694 	to strike, hit 	→ 	to gush out 	2
0695 	to strike, hit 	→ 	to defeat, win 	18
0696 	to shoot 	→ 	to ask for, request 	1
0697 	smoke 	→ 	dust 	3
0698 	board, plank 	— 	cover, lid 	3
0699 	paper 	↔ 	letter (text) 	21
0700 	paper 	→ 	playing cards 	4
0701 	paper 	→ 	document (n.) 	15
0702 	entirely 	— 	separately 	1
0703 	juice 	→ 	benefit 	3
0704 	iron 	— 	ice-crusted ground 	2
0705 	grain, seed 	→ 	tribe 	4
0706 	bow (weapon) 	→ 	clavicle 	1
0707 	strong (of liquid or smell) 	→ 	hot-tempered 	5
0708 	stick (n.) 	→ 	habit 	2
0709 	to burn (intr.) 	→ 	to itch 	1
0710 	in front of 	→ 	before (temporal) 	18
0711 	to stick, adhere 	— 	to fight, scuffle 	6
0712 	behind 	→ 	afterwards, later 	15
0713 	line 	— 	handwriting 	1
0714 	wing 	— 	spoke of wheel 	2
0715 	big 	↔ 	elder 	16
0716 	big 	→ 	chief, boss 	7
0717 	firm, durable 	→ 	greedy 	3
0718 	firm, durable 	→ 	strong (of liquid or smell) 	8
0719 	hard, solid 	→ 	loud 	2
0720 	firm, durable 	→ 	closed 	1
0721 	nap, shag (of a carpet) 	— 	swelling (on skin) 	1
0722 	glass (material) 	↔ 	bottle 	20
0723 	evil (adj.) 	→ 	very, of high degree 	2
0724 	cavity, hollow 	→ 	armpit 	2
0725 	shoulder 	→ 	hill 	2
0726 	to turn round 	— 	to heal (of a wound) 	1
0727 	to fall down 	— 	to harness 	1
0728 	bottom 	↔ 	buttock 	11
0729 	to measure 	— 	to imitate 	1
0730 	chopped billet 	→ 	base for beheading 	8
0731 	bead 	— 	spider 	1
0732 	circle 	→ 	knee 	2
0733 	curved 	→ 	false, wrong 	23
0734 	torso 	— 	wall 	1
0735 	to rotate (tr.) 	— 	to castrate 	3
0736 	heavy (of weight) 	→ 	expensive 	7
0737 	to strike, hit 	— 	to milk 	1
0738 	to lead 	→ 	to behave 	6
0739 	to lead 	→ 	to govern, control, rule 	13
0740 	to lead 	→ 	to cause 	11
0741 	branch, twig 	→ 	tribe 	9
0742 	above 	→ 	additional 	2
0743 	to weigh (tr.) 	→ 	to think, consider 	14
0744 	tongue (body part) 	→ 	language 	66
0745 	to disappear 	→ 	to die 	8
0746 	to see/to look at 	→ 	to understand 	25
0747 	to see/to look at 	→ 	to meet 	24
0748 	road 	→ 	manner, way, method 	32
0749 	to blow 	— 	to breathe 	9
0750 	to search, look for 	↔ 	to want 	9
0751 	leaf 	→ 	sheet of paper 	26
0752 	to carry 	→ 	to endure 	14
0753 	to raise, lift (tr.) 	→ 	to end, finish 	2
0754 	to bend, bow (intr.) 	→ 	to be disposed towards 	7
0755 	spot, stain 	→ 	place 	3
0756 	to sit 	→ 	to inhabit, live 	32
0757 	to lose one's way 	→ 	to make a mistake, be wrong 	19
0758 	to fill (tr.) 	→ 	to fulfill, accomplish 	17
0759 	to turn, rotate (intr.) 	→ 	to feel dizzy 	7
0760 	paint, dye (n.) 	→ 	colour 	10
0761 	to braid, plait, weave 	→ 	to tell lies 	11
0762 	to taste (tr.) 	→ 	to have experience 	14
0763 	sour 	→ 	angry 	5
0764 	bitter 	→ 	sad 	34
0765 	bitter 	→ 	angry 	4
0766 	brilliant, glaring 	↔ 	white 	5
0767 	dark (adj.) 	→ 	incomprehensible 	14
0768 	white 	→ 	clean (adj.) 	7
0769 	brilliant, glaring 	↔ 	glad 	7
0770 	to wet, moisten 	→ 	to dye 	3
0771 	to throw 	→ 	to accuse, blame 	4
0772 	to shine, glitter 	→ 	to become visible 	2
0773 	to shine, glitter 	↔ 	to see/to look at 	6
0774 	to know 	→ 	to copulate 	4
0775 	to cut 	→ 	to decide 	20
0776 	womb, uterus 	→ 	to feel pity 	5
0777 	nose 	→ 	tip 	2
0778 	bone 	— 	great 	2
0779 	<body part> 	→ 	tribe 	7
0780 	to judge 	→ 	to govern, control, rule 	3
0781 	to burn (intr.) 	→ 	angry 	13
0782 	brilliant, glaring 	→ 	clever, wise 	5
0783 	to fall asleep 	→ 	to die 	29
0784 	honey 	→ 	sweet (taste) 	8
0785 	to press 	→ 	to oppress 	18
0786 	to breathe 	→ 	wind 	5
0787 	soft (adj.) 	— 	smooth (surface) 	6
0788 	wet 	→ 	good 	3
0789 	hard, solid 	↔ 	strong 	12
0790 	flat (adj) 	→ 	easy / simple 	5
0791 	dry 	→ 	obstinate, persistent 	2
0792 	deaf 	→ 	stupid 	22
0793 	firm, durable 	→ 	loud 	2
0794 	dry 	→ 	lean, thin (of a person) 	19
0795 	time 	→ 	time (instance) 	2
0796 	to carry 	→ 	pregnant 	11
0797 	healthy 	— 	correct, right 	9
0798 	taste (n.) 	→ 	intellect 	3
0799 	ant 	→ 	to grow numb 	3
0800 	soot 	↔ 	black 	2
0801 	blood 	↔ 	red 	54
0802 	owl 	— 	ugly 	1
0803 	leaf 	↔ 	green 	7
0804 	grass, herb 	→ 	green 	3
0805 	dry 	— 	hard, solid 	4
0806 	dry 	→ 	having no milk 	4
0807 	rough, uneven 	→ 	rude, impolite 	11
0808 	rough, uneven 	→ 	difficult 	2
0809 	wine 	→ 	purple 	2
0810 	earth, soil 	→ 	red 	2
0811 	earth, soil 	→ 	dark (adj.) 	2
0812 	wax 	→ 	yellow 	5
0813 	white 	→ 	dairy product 	10
0814 	egg 	— 	white 	1
0815 	white 	→ 	poplar (Populus alba) 	2
0816 	brilliant, glaring 	→ 	moon 	3
0817 	taste (n.) 	→ 	taste (aesthetic) 	10
0818 	to taste (tr.) 	→ 	to check, test 	2
0819 	to tread 	→ 	to oppress 	2
0820 	to tread 	→ 	to destroy, annihilate 	1
0821 	yellow 	↔ 	gold 	18
0822 	worm 	→ 	red 	4
0823 	to mill, grind 	— 	little, small 	2
0824 	saffron 	↔ 	yellow 	4
0825 	to tan (hides) 	— 	red 	1
0826 	to tan (hides) 	→ 	suntanned 	2
0827 	brilliant, glaring 	→ 	spot, stain 	5
0828 	to hold (in hands) 	→ 	to contain 	9
0829 	to take 	→ 	to marry, take a wife 	8
0830 	to eat 	→ 	to destroy, annihilate 	3
0831 	<weapon> 	→ 	war 	6
0832 	to grow (plants) 	— 	to shine, glitter 	2
0833 	to shine, glitter 	— 	to shout 	2
0834 	light, bright, clear 	→ 	morning 	2
0835 	dark (adj.) 	→ 	to hide (tr.) 	2
0836 	white 	→ 	leprosy 	2
0837 	guest 	→ 	merchant 	1
0838 	hump (of a person or camel) 	→ 	hill 	12
0839 	head 	→ 	hill 	4
0840 	mountain 	↔ 	forest 	24
0841 	sheep 	→ 	snipe (Gallinago) 	4
0842 	to take 	— 	to carry 	13
0843 	to speak 	→ 	to practice witchcraft 	7
0844 	to fall down 	→ 	to lose colour 	3
0845 	war 	→ 	quarrel 	13
0846 	to fall down 	→ 	strike of lightning 	5
0847 	wizard, magician 	↔ 	doctor, physician 	4
0848 	evening 	→ 	yesterday 	4
0849 	heavy (of weight) 	→ 	important 	22
0850 	revenge 	→ 	passion (in game) 	1
0851 	heavy (of weight) 	→ 	pregnant 	30
0852 	hungry 	→ 	greedy 	4
0853 	to cross, traverse 	→ 	to defeat, win 	2
0854 	to turn sour 	→ 	grief, sorrow 	4
0855 	to feed 	→ 	to bring up (children) 	12
0856 	moon 	→ 	month 	452
0857 	to show, indicate 	→ 	to teach 	7
0858 	bee 	— 	wasp 	23
0859 	face 	→ 	conscience, scruples 	3
0860 	old man 	→ 	husband 	55
0861 	West 	— 	right side 	3
0862 	head 	→ 	beginning 	14
0863 	loins 	→ 	mountain slope 	1
0864 	good 	→ 	bad 	1
0865 	blunt 	→ 	stupid 	23
0866 	to salt 	→ 	to quarrel 	1
0867 	quick 	→ 	hot-tempered 	1
0868 	belly 	↔ 	inside 	5
0869 	hot 	→ 	fever 	11
0870 	hot 	→ 	passionate, zealous 	26
0871 	to put 	→ 	to leave, abandon 	5
0872 	old woman 	→ 	wife 	18
0873 	hard, solid 	→ 	severe, harsh 	26
0874 	black 	→ 	dear, darling 	1
0875 	black 	→ 	plebeian 	5
0876 	black 	→ 	very, of high degree 	3
0877 	cheek-bone 	→ 	doorpost 	2
0878 	cattle 	↔ 	property, possessions 	32
0879 	to nomadize 	→ 	to make a move (in a game) 	2
0880 	to fall down 	→ 	to like 	2
0881 	South 	→ 	front part 	2
0882 	back (body part) 	— 	basis 	3
0883 	sharpshooter 	→ 	clever, wise 	2
0884 	sad 	— 	very, of high degree 	1
0885 	to burn (intr.) 	→ 	to incur losses 	4
0886 	bile, gall 	→ 	anger 	16
0887 	sharp 	→ 	acute (of sound) 	9
0888 	back (body part) 	→ 	mountain ridge 	26
0889 	behind 	→ 	North 	4
0890 	bone 	→ 	kinship 	4
0891 	liquid (adj.) 	→ 	smooth (movement) 	2
0892 	high (size), tall 	→ 	deep 	4
0893 	to hold (in hands) 	→ 	to build 	3
0894 	to stand 	→ 	to get tired 	3
0895 	trunk (of a tree) 	→ 	river-bed 	2
0896 	to blow 	→ 	to deceive 	2
0897 	forehead 	→ 	hill 	3
0898 	cheek 	→ 	jaw 	34
0899 	wing 	→ 	sail (n.) 	4
0900 	light (vs. heavy) 	→ 	cheap 	3
0901 	light (vs. heavy) 	→ 	easy / simple 	21
0902 	short (size) 	→ 	low (size) 	12
0903 	to smear, anoint 	→ 	to adorn, decorate 	2
0904 	wind 	↔ 	air 	29
0905 	left 	↔ 	clumsy 	6
0906 	left 	→ 	stupid 	2
0907 	right (vs. left) 	→ 	polite 	1
0908 	right (vs. left) 	→ 	South 	11
0909 	needle (sewing) 	→ 	pencil 	3
0910 	rice 	↔ 	food 	18
0911 	mole (Talpa) 	↔ 	mouse 	4
0912 	to perceive smell 	→ 	to kiss 	11
0913 	to make scratches 	→ 	to draw, paint 	5
0914 	to draw, paint 	— 	to write 	11
0915 	here 	→ 	now 	2
0916 	there 	→ 	then 	5
0917 	high (size), tall 	→ 	loud 	15
0918 	left 	→ 	North 	6
0919 	to raise, lift (tr.) 	→ 	to build 	23
0920 	to be born 	→ 	to happen 	10
0921 	to hide (tr.) 	→ 	to hug, embrace 	1
0922 	to find 	→ 	to know 	7
0923 	naked, bare 	→ 	bald 	16
0924 	left 	→ 	East 	2
0925 	face 	↔ 	cheek 	15
0926 	barley 	→ 	sty (on the eye) 	16
0927 	doll 	→ 	chrysalis 	5
0928 	beetle 	→ 	crazy thought, whim 	3
0929 	sweet (taste) 	→ 	biological (of a relative) 	1
0930 	to fall down 	→ 	case (grammar) 	8
0931 	heart 	→ 	mountain 	2
0932 	heart 	↔ 	middle, centre 	14
0933 	man (male) 	↔ 	husband 	161
0934 	to fall down 	→ 	to happen 	9
0935 	healthy 	→ 	big 	2
0936 	low (size) 	→ 	quiet (vs. loud) 	10
0937 	left 	→ 	false, wrong 	5
0938 	fearful, dreadful 	→ 	very, of high degree 	26
0939 	fearful, dreadful 	→ 	big 	3
0940 	raw 	→ 	severe, harsh 	5
0941 	to burn (intr.) 	→ 	grief, sorrow 	8
0942 	meaningless 	→ 	left 	1
0943 	to take 	→ 	to buy 	19
0944 	button (on a dress) 	→ 	push button 	11
0945 	sharp point 	↔ 	mountain 	2
0946 	deep 	→ 	rich 	1
0947 	acorn 	— 	date (Phoenix dactylifera) 	2
0948 	horse 	→ 	big 	2
0949 	to bite 	→ 	to vex, annoy 	1
0950 	to tame 	→ 	to kill 	1
0951 	evening 	→ 	West 	6
0952 	neck 	→ 	mountain ridge 	2
0953 	to see/to look at 	→ 	to hear / to listen 	9
0954 	sharp 	→ 	angry 	6
0955 	country, land 	→ 	people, nation 	6
0956 	to sink into 	→ 	to set (of Moon, Sun) 	12
0957 	matter, affair 	→ 	battle 	6
0958 	mouse 	→ 	muscle 	15
0959 	fish 	→ 	muscle 	6
0960 	to ask for, request 	↔ 	to ask, inquire 	72
0961 	other 	→ 	hostile 	1
0962 	other 	→ 	left 	1
0963 	good 	→ 	very, of high degree 	13
0964 	to have, possess 	→ 	to be, exist 	9
0965 	other 	→ 	friend 	7
0966 	woman 	↔ 	wife 	172
0967 	to stand, be in vertical position 	→ 	to cost 	10
0968 	bad 	↔ 	evil (adj.) 	27
0969 	to strain 	→ 	to intend 	1
0970 	to strain 	→ 	to understand 	1
0971 	tail 	→ 	queue 	11
0972 	snake 	→ 	queue 	1
0973 	to stand up 	→ 	to revolt, rebel 	16
0974 	to mix, stir 	→ 	to revolt, rebel 	6
0975 	to fall down 	→ 	to die 	35
0976 	thread 	→ 	wire (n.) 	8
0977 	<vessel> 	→ 	head 	13
0978 	to hit the target 	→ 	to guess 	6
0979 	bad 	↔ 	lean, thin (of a person) 	6
0980 	to move quickly 	↔ 	to flow 	7
0981 	to hope 	— 	to wait 	5
0982 	to speak 	— 	to show, indicate 	4
0983 	to slow, linger 	— 	to inhabit, live 	4
0984 	to see/to look at 	→ 	to search, look for 	16
0985 	wet 	→ 	warm 	1
0986 	sack, bag 	→ 	scrotum 	11
0987 	to see/to look at 	→ 	to like 	4
0988 	to thrust (into) 	→ 	to practice witchcraft 	1
0989 	to push 	— 	to hint 	1
0990 	to see/to look at 	→ 	to intend 	5
0991 	to want 	→ 	to intend 	55
0992 	to see/to look at 	→ 	to have experience 	9
0993 	to know 	→ 	to understand 	20
0994 	to wave (of water) 	→ 	worry, anxiety 	9
0995 	to bloom, blossom 	↔ 	to flourish, prosper 	15
0996 	to heat up, warm up 	→ 	to deceive 	5
0997 	to throw 	→ 	to run 	6
0998 	to throw 	→ 	to spring, jump 	2
0999 	key (of a door) 	→ 	clavicle 	20
1000 	trunk (of a tree) 	→ 	barrel (of a gun) 	5
1001 	to turn, rotate (intr.) 	→ 	neck 	1
1002 	blue 	→ 	pigeon (Columba) 	5
1003 	light (vs. heavy) 	→ 	lung 	22
1004 	skin (of an animal) 	→ 	whore 	5
1005 	head 	→ 	chief, boss 	116
1006 	stork (Ciconia) 	— 	heron 	3
1007 	sun 	↔ 	day 	404
1008 	saddle 	→ 	saddleback 	3
1009 	pimple 	— 	bud (of a flower) 	3
1010 	vessel 	→ 	blood vessel 	11
1011 	to press 	→ 	to print 	8
1012 	to weaken (intr.) 	→ 	to get drunk 	1
1013 	to walk, wander 	→ 	to fornicate 	3
1014 	to come, arrive 	→ 	to have opinion 	3
1015 	backwards 	→ 	again 	8
1016 	to think, consider 	→ 	grief, sorrow 	2
1017 	straight 	→ 	honest 	20
1018 	chest (body part) 	→ 	memory 	1
1019 	puppy (of a dog) 	→ 	catkin 	5
1020 	root (of a plant) 	→ 	blood vessel 	29
1021 	spleen (anat.) 	↔ 	honeycomb 	3
1022 	price 	→ 	honour 	3
1023 	squirrel (Sciurus) 	→ 	<money> 	13
1024 	tongue (body part) 	→ 	captive 	10
1025 	brain (cerebrum) 	— 	bone marrow 	14
1026 	mushroom 	— 	pig's snout 	1
1027 	mushroom 	— 	false, wrong 	2
1028 	face 	→ 	complexion 	1
1029 	insect 	→ 	wolf 	3
1030 	corner 	→ 	jaw 	1
1031 	hammer 	→ 	molar (tooth) 	2
1032 	cotton 	— 	paper 	1
1033 	to stink 	→ 	to scold 	3
1034 	instrument, tool 	→ 	weapon 	6
1035 	healthy 	— 	intact 	21
1036 	healthy 	→ 	sober 	3
1037 	attentive 	→ 	sober 	2
1038 	mute, dumb 	→ 	stupid 	8
1039 	stingy 	→ 	deaf 	1
1040 	to spring, jump 	→ 	to dance 	17
1041 	to defecate 	→ 	to spawn 	1
1042 	to drive, force to move on 	→ 	to drive (the car) 	9
1043 	to drag 	→ 	to steal 	9
1044 	side (n.) 	→ 	country, land 	3
1045 	side (n.) 	↔ 	cheek 	4
1046 	side (n.) 	→ 	page 	12
1047 	side (n.) 	→ 	political party 	5
1048 	midnight 	→ 	North 	6
1049 	berry 	↔ 	<berry> 	9
1050 	seagull 	— 	lapwing (Vanellus) 	3
1051 	mind (n.) 	→ 	memory 	11
1052 	sky 	→ 	by heart 	1
1053 	black cloud 	— 	hail 	1
1054 	black cloud 	— 	rainbow 	1
1055 	lead, plumbum 	→ 	tin (n.) 	90
1056 	to emit smell 	→ 	to stink 	14
1057 	box, container 	→ 	coffin 	14
1058 	berry 	→ 	cheek 	1
1059 	cheek 	→ 	buttock 	4
1060 	berry 	→ 	buttock 	1
1061 	hen 	→ 	whore 	4
1062 	bitch, female dog 	→ 	whore 	7
1063 	dark (adj.) 	→ 	ignorant 	17
1064 	rooster 	→ 	cock (of a gun) 	23
1065 	to bind 	→ 	to oblige 	4
1066 	to reach 	→ 	to suffice, be enough 	9
1067 	to feel 	↔ 	to hear / to listen 	20
1068 	to feel 	→ 	to perceive smell 	3
1069 	to see/to look at 	→ 	to know 	11
1070 	cat 	→ 	catkin 	15
1071 	to walk, wander 	→ 	to ferment, yeast 	3
1072 	light (n.) 	↔ 	world 	17
1073 	direction 	→ 	sense, perception 	2
1074 	to be born 	→ 	people, nation 	4
1075 	to shine, glitter 	→ 	to seem 	2
1076 	to check, test 	→ 	to feel (an emotion) 	2
1077 	greasy 	→ 	fat (adj., of a person) 	17
1078 	lean, thin (of a person) 	→ 	fatless 	14
1079 	nail (body part) 	↔ 	nail (metal spike) 	13
1080 	pelican (Pelecanus) 	→ 	heron 	2
1081 	ram 	→ 	brave person 	2
1082 	servant 	→ 	jack (playing card) 	8
1083 	ear 	→ 	cock (of a gun) 	2
1084 	beaver (Castor fiber) 	↔ 	otter (Lutra lutra) 	5
1085 	bride 	→ 	doll 	4
1086 	girl 	→ 	doll 	3
1087 	to untie, unbind 	→ 	to solve (a problem) 	18
1088 	bride 	↔ 	daughter-in-law 	19
1089 	to want 	↔ 	to ask, inquire 	4
1090 	guilt, guilty 	→ 	to owe, be in debt 	3
1091 	to die 	→ 	to want 	10
1092 	to fly away 	→ 	to feel pleasure 	1
1093 	mouse 	→ 	bat 	10
1094 	to speak 	→ 	rumour 	3
1095 	sea 	→ 	lake 	5
1096 	heavy (of weight) 	→ 	bad 	5
1097 	heavy (of weight) 	→ 	very, of high degree 	8
1098 	guilt, guilty 	→ 	duty, responsibility 	8
1099 	to grasp, seize 	→ 	to suffice, be enough 	3
1100 	funny 	→ 	strange 	6
1101 	to change (tr.) 	→ 	strange 	2
1102 	soft (adj.) 	→ 	tender (adj.) 	22
1103 	thin (of an object) 	→ 	high-pitched 	12
1104 	to end, finish 	→ 	to kill 	13
1105 	to smear, anoint 	→ 	to strike, hit 	6
1106 	to smear, anoint 	→ 	to spit 	1
1107 	to smear, anoint 	→ 	to bribe 	20
1108 	light, bright, clear 	→ 	glad 	5
1109 	to neigh 	→ 	to laugh 	10
1110 	proud 	— 	insolent 	1
1111 	smooth (surface) 	→ 	bald 	3
1112 	taste (n.) 	→ 	smell (n.) 	5
1113 	taste (n.) 	→ 	inclination to smth 	12
1114 	to put into 	→ 	to bribe 	5
1115 	to knock 	→ 	to inform, let know 	4
1116 	to bark 	→ 	to quarrel 	26
1117 	root (of a plant) 	→ 	basis 	21
1118 	nail (body part) 	↔ 	claw 	56
1119 	coal 	→ 	anthrax 	5
1120 	mask 	→ 	larva 	3
1121 	paw 	→ 	five-finger (Potentilla) 	2
1122 	near 	→ 	close (of relations) 	12
1123 	to soil, make dirty 	→ 	to disgrace, dishonor 	20
1124 	spot, stain 	→ 	disgrace 	10
1125 	to shave 	→ 	to draft (for the army) 	2
1126 	milk 	→ 	milk-tooth, deciduous tooth 	7
1127 	milk 	→ 	spurge (Euphorbia) 	5
1128 	to flow 	— 	to cry, weep 	1
1129 	coal 	→ 	smut (plant disease) 	8
1130 	black 	→ 	smut (plant disease) 	2
1131 	to open (tr.) 	→ 	to find out 	7
1132 	to fall down 	→ 	to flow into 	8
1133 	quiet (vs. loud) 	→ 	slow (adj.) 	26
1134 	to sow 	→ 	to drop (of liquid) 	3
1135 	to go in various directions 	— 	to spread (intr.) 	2
1136 	earring 	→ 	catkin 	6
1137 	green 	→ 	young 	12
1138 	to bridle 	→ 	to subjugate 	13
1139 	copper 	— 	gold 	3
1140 	square (in a town) 	→ 	vulgar 	2
1141 	nettle (Urtica) 	→ 	medusa, jellyfish 	3
1142 	to hear 	→ 	rumour 	5
1143 	round (adj.) 	→ 	entire 	8
1144 	calm 	→ 	dead (adj.) 	6
1145 	cold 	→ 	indifferent 	14
1146 	brushwood 	— 	garbage 	2
1147 	fox (Vulpes vulpes) 	↔ 	cunning person 	29
1148 	to cool down (intr.) 	→ 	to calm down 	12
1149 	red 	→ 	<disease> 	6
1150 	low (location) 	→ 	bad (ethically) 	21
1151 	to mix, stir 	→ 	to hinder 	6
1152 	mortal 	→ 	human, person 	9
1153 	to want 	→ 	to hunt 	4
1154 	salt 	→ 	sea 	12
1155 	mute, dumb 	→ 	quiet (vs. loud) 	4
1156 	army 	→ 	people, nation 	6
1157 	horse 	→ 	<orthopteran> 	6
1158 	head 	→ 	tadpole 	2
1159 	spoon 	→ 	tadpole 	3
1160 	<foreigner> 	→ 	cockroach 	47
1161 	to ripen 	— 	to become inevitable 	3
1162 	to spring, jump 	→ 	frog 	2
1163 	to work 	↔ 	to plough 	20
1164 	to suffer 	↔ 	to work 	25
1165 	to work 	→ 	to give birth 	8
1166 	to chew 	→ 	bit (part of horse harness) 	9
1167 	to tremble 	→ 	to fear, be afraid 	25
1168 	to speak 	→ 	to order, command 	17
1169 	to give 	→ 	to let, allow 	21
1170 	bearded man 	→ 	man (male) 	2
1171 	heart 	↔ 	seat of emotions 	161
1172 	to feel pain, ache 	→ 	very, of high degree 	4
1173 	height (of a person) 	→ 	age 	4
1174 	to be surprised 	↔ 	to see/to look at 	2
1175 	to cut 	→ 	to calculate, count 	3
1176 	to see/to look at 	→ 	envious, envy 	4
1177 	to flow 	→ 	island 	3
1178 	crane (Grus) 	→ 	cranberry (Oxycoccus) 	19
1179 	to burn (intr.) 	→ 	distilled alcohol 	5
1180 	to hold (in hands) 	→ 	to have opinion 	10
1181 	sediment 	→ 	something bad 	1
1182 	sediment 	→ 	lumpen 	4
1183 	to dissolve in liquid (tr.) 	→ 	to solve (a problem) 	7
1184 	wing 	→ 	flank (military) 	17
1185 	wind 	→ 	disease 	9
1186 	long (size) 	↔ 	long (time) 	37
1187 	mute, dumb 	→ 	<foreigner> 	4
1188 	<foreigner> 	→ 	slave 	7
1189 	<horned animal> 	→ 	<insect> 	3
1190 	goat 	→ 	<clothes> 	2
1191 	circle 	→ 	finger-ring 	5
1192 	finger / toe 	→ 	finger-ring 	2
1193 	young 	↔ 	stupid 	3
1194 	<fruit> 	→ 	tonsil 	5
1195 	wind 	→ 	sail (n.) 	8
1196 	sky 	→ 	destiny 	3
1197 	tick (Acarina) 	→ 	castor bean (Ricinus communis) 	4
1198 	to water, to give water 	→ 	to water (plants) 	4
1199 	to boil (intr.) 	→ 	spring, fountain 	5
1200 	to stink 	→ 	polecat, ferret (Mustela putorius) 	4
1201 	eagle 	→ 	jackdaw 	1
1202 	hoof 	→ 	foot/leg 	6
1203 	nail (body part) 	→ 	hoof 	28
1204 	bone 	→ 	foot/leg 	7
1205 	hand/arm 	→ 	wing 	18
1206 	hand/arm 	↔ 	branch, twig 	12
1207 	knee 	→ 	corner 	3
1208 	cheek 	— 	nose 	1
1209 	to approach, come near 	→ 	to begin (tr.) 	4
1210 	frog 	→ 	girl 	1
1211 	to feel thirsty 	→ 	to want 	5
1212 	to feel pity 	→ 	to regret 	5
1213 	swelling (on skin) 	— 	tortoise, turtle 	1
1214 	green 	→ 	bile, gall 	2
1215 	active, agile 	→ 	mercury 	9
1216 	liquid (adj.) 	— 	flexible 	4
1217 	to freeze, be cold 	→ 	worry, anxiety 	1
1218 	room 	↔ 	house 	4
1219 	skin (of an animal) 	→ 	skin (of a person) 	15
1220 	to kick 	→ 	to dig 	1
1221 	to dig 	→ 	to find 	6
1222 	firm, durable 	→ 	quick 	5
1223 	weak 	→ 	slow (adj.) 	3
1224 	hill 	→ 	grave, tomb 	8
1225 	ceiling 	→ 	palate 	2
1226 	to strike, hit 	↔ 	wound (n.) 	6
1227 	to thrust (into) 	→ 	to butt 	3
1228 	to strike, hit 	→ 	to boast 	1
1229 	ready 	→ 	enough 	5
1230 	to strike, hit 	→ 	to speak 	2
1231 	to bark 	→ 	to shout 	1
1232 	to run 	→ 	diarrhea 	9
1233 	rich 	→ 	many, much 	4
1234 	to defend 	↔ 	to prohibit 	4
1235 	maize 	→ 	cone (fruit) 	2
1236 	to bark 	— 	to cough 	4
1237 	sharp 	→ 	bitter 	3
1238 	sharp 	→ 	unpleasant 	2
1239 	to bite 	→ 	bitter 	1
1240 	to strike, hit 	→ 	to cough 	2
1241 	to cough 	→ 	to grumble 	1
1242 	to shake 	→ 	to speak 	1
1243 	turbid 	→ 	nausea 	2
1244 	moustache 	— 	feather 	1
1245 	quick 	→ 	clever, wise 	9
1246 	quick 	→ 	transparent 	1
1247 	to become 	→ 	can, to be able 	4
1248 	to be, exist 	→ 	possible 	4
1249 	to tear, rend 	→ 	to vomit 	3
1250 	pit 	→ 	grave, tomb 	21
1251 	drop (n.) 	→ 	spring, fountain 	1
1252 	to pinch 	→ 	to steal 	2
1253 	feather 	→ 	eyelash 	3
1254 	chin 	— 	beak 	1
1255 	to regret 	→ 	to revenge 	1
1256 	to touch 	→ 	to run 	1
1257 	to intend 	— 	to doubt 	1
1258 	to drop (of liquid) 	→ 	to die 	2
1259 	to intend 	→ 	to invite 	1
1260 	to throw 	— 	to tear, rend 	3
1261 	to shake 	→ 	to strike, hit 	4
1262 	rusty 	→ 	bad 	2
1263 	stove 	→ 	cave 	10
1264 	to grasp, seize 	→ 	to do, act 	1
1265 	to strike, hit 	→ 	bedbug (Cimex lectularius) 	1
1266 	to kiss 	→ 	to sting 	1
1267 	curved 	→ 	unpleasant 	1
1268 	curved 	→ 	guilt, guilty 	4
1269 	curved 	↔ 	lame 	2
1270 	part 	→ 	bread 	3
1271 	rooster 	→ 	penis 	5
1272 	to drop (of liquid) 	— 	to be in a hurry 	1
1273 	to wet, moisten 	→ 	to strike, hit 	3
1274 	to wet, moisten 	→ 	to drink 	2
1275 	to break (tr.) 	→ 	to scold 	1
1276 	to break (tr.) 	→ 	to want 	1
1277 	to turn sour 	→ 	to be late 	1
1278 	bride 	→ 	whore 	1
1279 	to adorn, decorate 	→ 	proud 	1
1280 	to get wet 	→ 	to turn sour 	4
1281 	stomach 	→ 	sack, bag 	2
1282 	to turn sour 	→ 	bowels, intestine 	1
1283 	cold 	→ 	wind 	23
1284 	hard, solid 	→ 	very, of high degree 	3
1285 	lip 	— 	muzzle 	2
1286 	light (vs. heavy) 	— 	slow (adj.) 	2
1287 	to pour 	→ 	to strike, hit 	1
1288 	bast, the layer under the bark 	→ 	skull 	2
1289 	to touch 	→ 	to soil, make dirty 	1
1290 	to get wet 	→ 	to bother, pester 	1
1291 	navel 	→ 	bud (on a twig) 	2
1292 	navel 	↔ 	belly 	7
1293 	elbow 	↔ 	corner 	5
1294 	many, much 	→ 	very, of high degree 	16
1295 	flat (adj) 	— 	straight 	7
1296 	pus 	— 	petroleum, oil 	1
1297 	dew 	→ 	rain 	3
1298 	pus 	— 	dung 	2
1299 	to love 	→ 	any 	5
1300 	to touch 	→ 	to concern, be related to 	8
1301 	open (adj.) 	→ 	light, bright, clear 	6
1302 	closed 	→ 	dark (adj.) 	2
1303 	to pull, to draw 	→ 	to slow, linger 	14
1304 	bride 	→ 	weasel (Mustella nivalis) 	3
1305 	ear 	→ 	hare (Lepus) 	2
1306 	to run 	→ 	hare (Lepus) 	3
1307 	blind 	→ 	mole (Talpa) 	4
1308 	to dig 	→ 	mole (Talpa) 	1
1309 	monarch 	→ 	queen (bee) 	12
1310 	to press 	→ 	to restrain, control one’s feelings 	7
1311 	magpie (Pica pica) 	→ 	talkative person 	8
1312 	pig (Sus scrofa) 	→ 	slattern 	17
1313 	pig (Sus scrofa) 	→ 	<curse: bad person> 	16
1314 	<animal> 	→ 	glutton 	8
1315 	head 	→ 	mind (n.) 	25
1316 	to go out 	→ 	to run out (of smth) 	4
1317 	to sit down 	→ 	to set (of Moon, Sun) 	8
1318 	to lie down 	→ 	to set (of Moon, Sun) 	3
1319 	to fall down 	→ 	to set (of Moon, Sun) 	8
1320 	storm 	→ 	scandal 	4
1321 	<fruit> 	→ 	swelling (on skin) 	4
1322 	dark (adj.) 	→ 	bad 	4
1323 	dark (adj.) 	→ 	gloomy, depressed 	16
1324 	to scratch (when itches) 	→ 	to scold 	2
1325 	to shoot 	→ 	to shock (of electric current) 	1
1326 	to hide (tr.) 	↔ 	to bury, inter 	12
1327 	to flow 	↔ 	to shed hair or feathers 	2
1328 	to end, finish 	→ 	to die 	12
1329 	old man/grandfather 	→ 	bear (Ursus) 	18
1330 	to burn (tr.) 	→ 	nettle (Urtica) 	4
1331 	to milk 	→ 	to spawn 	2
1332 	bald 	→ 	bald-coot (Fulica atra) 	3
1333 	hare (Lepus) 	↔ 	coward 	9
1334 	<animal> 	→ 	bastard 	5
1335 	powerless 	→ 	furious 	3
1336 	to plough 	→ 	draught animal 	3
1337 	attack (n.) 	→ 	attack of disease 	7
1338 	red 	→ 	<salmon> 	1
1339 	fur, hair (of animals) 	— 	feathering 	6
1340 	hair 	→ 	fur, hair (of animals) 	26
1341 	naked, bare 	→ 	poor, needy 	8
1342 	feather 	→ 	fin 	6
1343 	wing 	→ 	fin 	40
1344 	to squeak 	→ 	murine rodent 	2
1345 	to dive 	→ 	<swimming bird> 	4
1346 	thorn 	→ 	<sturgeon> 	2
1347 	to fall asleep 	→ 	to grow numb 	12
1348 	to fall asleep 	→ 	to ice over 	3
1349 	to become mute 	→ 	to grow numb 	3
1350 	to go away 	→ 	to die 	31
1351 	to fly away 	→ 	to die 	1
1352 	skin (of a person) 	→ 	bat 	5
1353 	leaf 	→ 	oar 	2
1354 	spade, shovel 	→ 	oar 	8
1355 	to find 	→ 	to give birth 	8
1356 	to shoot 	— 	to shine, glitter 	8
1357 	to get dirty, soiled 	→ 	to become infected 	6
1358 	joint, articulation 	→ 	generation 	6
1359 	firm, durable 	↔ 	healthy 	6
1360 	to stick, adhere 	→ 	to flirt 	3
1361 	to change (tr.) 	↔ 	to change clothes 	7
1362 	to change (tr.) 	→ 	to shed hair or feathers 	1
1363 	to look asquint 	→ 	to disapprove 	4
1364 	wrist 	— 	ankle 	1
1365 	strong 	→ 	very, of high degree 	13
1366 	back of the head, occupit 	→ 	back of the axe head 	3
1367 	weak 	→ 	stupid 	6
1368 	foot 	→ 	unit of length 	12
1369 	step, pace 	→ 	unit of length 	10
1370 	forearm 	→ 	unit of length 	18
1371 	to throw 	→ 	unit of length 	3
1372 	stick (n.) 	→ 	unit of length 	12
1373 	bull 	→ 	bittern (Botaurus) 	6
1374 	<thorny plant> 	→ 	goldfinch (Carduelis) 	8
1375 	<name of person> 	→ 	doll 	3
1376 	stairs, ladder 	→ 	stirrup 	4
1377 	quick 	→ 	very, of high degree 	4
1378 	quick 	→ 	hare (Lepus) 	1
1379 	quick 	→ 	carabus (Carabus) 	1
1380 	to untie, unbind 	→ 	to set free 	9
1381 	coast, shore 	↔ 	edge, border 	16
1382 	edge, border 	→ 	country, land 	13
1383 	market 	→ 	noise 	2
1384 	to break (tr.) 	→ 	buckthorn (Frangula) 	3
1385 	to go, walk 	→ 	to fall (of rain, snow) 	9
1386 	rush (plant) 	→ 	millerbird (Acrocephalus etc.) 	2
1387 	nettle (Urtica) 	→ 	small tortoise-shell (Aglais urticae) 	28
1388 	nettle (Urtica) 	→ 	nettle-rash 	4
1389 	to boil (intr.) 	→ 	angry 	11
1390 	to boil (intr.) 	→ 	to ferment, yeast 	10
1391 	to sing 	→ 	to glorify 	23
1392 	face 	→ 	page 	9
1393 	to sway 	→ 	to doubt 	17
1394 	donkey 	→ 	fool 	19
1395 	cross (n.) 	→ 	crossbill (Loxia) 	11
1396 	flower 	→ 	smallpox 	15
1397 	to tie 	→ 	to stop doing smth. 	3
1398 	cat 	→ 	catnip (Nepeta cataria) 	7
1399 	dirty 	→ 	bad (ethically) 	26
1400 	to break (tr.) 	→ 	to feel pain, ache 	5
1401 	to lose (an object) 	→ 	to be defeated 	12
1402 	blind 	→ 	blunt 	7
1403 	to follow, go after smb. 	→ 	to watch, stare 	10
1404 	pregnant 	→ 	fraught with consequences 	4
1405 	to practice witchcraft 	→ 	to charm, to delight 	24
1406 	wind 	→ 	anemone (Anemone) 	3
1407 	hawk (Accipiter) 	→ 	hawkweed (Hieracium) 	11
1408 	foam 	— 	cream (of milk) 	3
1409 	wolf 	→ 	poisonous 	1
1410 	dog 	→ 	poisonous 	2
1411 	low (location) 	→ 	humble 	5
1412 	to smear, anoint 	→ 	to disgrace, dishonor 	1
1413 	sharp 	→ 	keen (of senses) 	17
1414 	thin (of an object) 	→ 	keen (of senses) 	2
1415 	long (size) 	→ 	long-fibred flax (Linum usitatissimum) 	2
1416 	abundance 	↔ 	harvest 	2
1417 	guest 	→ 	disease 	2
1418 	expensive 	↔ 	dear, darling 	15
1419 	circle 	→ 	<money> 	13
1420 	frequent 	↔ 	thick (of a growth, hair) 	7
1421 	root (of a plant) 	→ 	origin 	9
1422 	crime 	— 	punishment 	1
1423 	to strike, hit 	→ 	woodpecker 	7
1424 	house 	→ 	to marry, take a wife 	5
1425 	witness 	→ 	martyr 	4
1426 	bitter 	— 	salty 	2
1427 	to flow 	— 	to float 	3
1428 	criminal 	— 	whore 	3
1429 	to feel pity 	→ 	to grudge 	5
1430 	to turn, rotate (intr.) 	→ 	to pass (of time) 	3
1431 	white 	→ 	honest 	6
1432 	trough 	→ 	river-bed 	9
1433 	back (body part) 	→ 	behind 	22
1434 	frog 	→ 	snail 	2
1435 	fat (adj., of a person) 	→ 	rude, impolite 	5
1436 	thick 	→ 	bass, low-pitched voice 	13
1437 	to see/to look at 	→ 	to act according to 	9
1438 	louse 	→ 	bad 	3
1439 	to make empty 	→ 	to forgive 	1
1440 	black cloud 	→ 	sponge (animal) 	4
1441 	to turn, rotate (intr.) 	→ 	to coagulate, curdle 	1
1442 	pea 	→ 	hail 	2
1443 	branch, twig 	— 	root (of a plant) 	3
1444 	to disdain 	— 	to despair 	1
1445 	to know 	→ 	noble 	2
1446 	time 	→ 	journal, magazine 	4
1447 	antelope 	↔ 	rhinoceros 	3
1448 	world 	→ 	people (pl.) 	4
1449 	camel 	→ 	ostrich 	14
1450 	drug, medicine 	↔ 	help, aid (n.) 	3
1451 	river 	→ 	ravine 	5
1452 	greedy 	→ 	very, of high degree 	1
1453 	footprint, track 	→ 	road 	9
1454 	to search, look for 	→ 	to choose 	2
1455 	to call 	→ 	to name 	22
1456 	to drink 	→ 	to smoke (tobacco) 	15
1457 	bow (weapon) 	→ 	rainbow 	11
1458 	to strike, hit 	→ 	to forge 	8
1459 	leaf 	→ 	<plant (biol.)> 	2
1460 	to lie (posture) 	→ 	to be situated 	14
1461 	young 	→ 	brave 	2
1462 	to harness 	— 	to begin (tr.) 	1
1463 	to walk, to go 	↔ 	to inhabit, live 	4
1464 	to drive, force to move on 	→ 	to copulate 	3
1465 	face 	→ 	surface 	17
1466 	face 	→ 	manner, way, method 	3
1467 	heart 	→ 	brave 	19
1468 	ravine 	→ 	steppe, plain 	1
1469 	wind 	→ 	light-headed 	2
1470 	light (vs. heavy) 	→ 	unimportant, slight 	12
1471 	light (vs. heavy) 	→ 	quick 	11
1472 	earth, soil 	→ 	country, land 	56
1473 	to grasp, seize 	→ 	to begin (tr.) 	7
1474 	to grasp, seize 	→ 	to catch fire 	3
1475 	to turn, rotate (intr.) 	→ 	to stop doing smth. 	2
1476 	to remain, stay 	→ 	corpse 	5
1477 	to remain, stay 	→ 	to stop doing smth. 	4
1478 	black 	→ 	bad 	8
1479 	<foreigner> 	↔ 	soldier 	3
1480 	sky 	→ 	blue 	20
1481 	circle 	— 	wheel 	16
1482 	to put 	→ 	to have opinion 	2
1483 	empty 	→ 	<vessel> 	1
1484 	owl 	— 	raven 	1
1485 	tail 	↔ 	end (space) 	17
1486 	tail 	→ 	handle, gripe 	5
1487 	tail 	— 	buttock 	5
1488 	dry 	→ 	land (vs. sea) 	5
1489 	to give birth 	— 	to cry, weep 	1
1490 	to pasture, shepherd 	→ 	to defend 	9
1491 	gate 	→ 	town, city 	1
1492 	to understand 	→ 	to obey 	1
1493 	donkey 	→ 	stubborn person 	5
1494 	to perceive smell 	↔ 	to emit smell 	12
1495 	insect 	— 	<insect> 	1
1496 	bowels, intestine 	↔ 	sausage 	11
1497 	sword 	→ 	plough, ard 	1
1498 	winter 	→ 	North 	4
1499 	to name 	→ 	to scold 	2
1500 	happy 	→ 	strong 	1
1501 	to wake up (intr.) 	→ 	angry 	1
1502 	to play (intr.) 	— 	music 	1
1503 	front part 	→ 	beginning 	4
1504 	empty 	→ 	desert (n.) 	4
1505 	calm 	— 	healthy 	2
1506 	hour 	→ 	watch, clock 	15
1507 	vessel 	— 	weapon 	2
1508 	barrel 	→ 	fat (adj., of a person) 	1
1509 	yellow 	→ 	hepatitis 	10
1510 	to sing 	— 	to cry, weep 	1
1511 	to love 	→ 	friend 	4
1512 	to pull, to draw 	→ 	to plough 	1
1513 	to respect 	→ 	to treat, regale 	4
1514 	to be in a hurry 	— 	to fear, be afraid 	2
1515 	to sway 	→ 	to avoid 	1
1516 	work (n.) 	— 	service, good turn 	4
1517 	dock-tailed, tailless 	→ 	old (vs. young) 	1
1518 	salt 	→ 	meaning, sense 	2
1519 	sparse 	— 	shallow 	1
1520 	rare 	— 	sparse 	5
1521 	head 	→ 	one piece (at counting) 	8
1522 	head 	→ 	heading, title 	4
1523 	elbow 	→ 	crossroads 	1
1524 	melody, tune 	→ 	behaviour 	2
1525 	fairy tale 	→ 	false, wrong 	6
1526 	ferment, leaven 	— 	sperm 	2
1527 	cold 	→ 	cold (disease) 	8
1528 	stop, stand (n.) 	→ 	distance 	2
1529 	nest (n.) 	→ 	bed 	11
1530 	<plant (biol.)> 	→ 	brown 	5
1531 	stingy 	→ 	scanty, scarce 	3
1532 	disgusting 	→ 	snake 	2
1533 	woman 	— 	mother 	14
1534 	mold 	— 	rust (n.) 	3
1535 	rust (n.) 	→ 	defect 	1
1536 	grief, sorrow 	→ 	to regret 	2
1537 	rag, duster 	→ 	clothes 	5
1538 	crow 	→ 	spades (in cards) 	3
1539 	cross (n.) 	→ 	clubs (in cards) 	11
1540 	muddy, turbid, opaque 	— 	grey 	2
1541 	grey 	— 	piebald, black and white 	3
1542 	iron 	→ 	trap, snare (n.) 	3
1543 	key (of a door) 	→ 	lock (n.) 	27
1544 	to correct 	→ 	to make, create 	3
1545 	to speak 	→ 	to scold 	1
1546 	comb 	→ 	honeycomb 	3
1547 	comb 	→ 	charger, cartridge clip 	2
1548 	sieve (n.) 	→ 	pure 	1
1549 	drop (n.) 	→ 	full stop 	1
1550 	trunk (of a tree) 	↔ 	torso 	23
1551 	one, single 	→ 	ace (playing card) 	3
1552 	grain, seed 	— 	ferment, leaven 	2
1553 	tail 	→ 	accomplice 	3
1554 	sphere; ball 	↔ 	cannon (weapon) 	4
1555 	to let, leave 	— 	to compel, coerce 	1
1556 	to take away, carry away 	↔ 	to defeat, win 	4
1557 	bitter 	↔ 	bile, gall 	5
1558 	tight, taut 	— 	beautiful 	1
1559 	to feel pain, ache 	— 	sick, ill 	5
1560 	nature 	→ 	human temper, character 	7
1561 	muzzle 	→ 	mouth (of a river) 	1
1562 	muzzle 	→ 	face 	3
1563 	trick, hocus-pocus 	— 	trump (in cards) 	2
1564 	to go away 	→ 	to disappear 	3
1565 	to suck 	→ 	to drink 	8
1566 	to sow 	→ 	to lose (an object) 	3
1567 	to pull, to draw 	→ 	to strike, hit 	3
1568 	to pull, to draw 	→ 	to draw, paint 	4
1569 	wild, untamed 	→ 	barren (of animals) 	3
1570 	wild, untamed 	→ 	bad 	4
1571 	birthmark 	— 	mold 	1
1572 	to give 	→ 	to teach 	1
1573 	neck 	— 	collar 	3
1574 	neck 	→ 	crossroads 	1
1575 	grandchild 	→ 	nephew 	5
1576 	sheet of paper 	— 	layer 	2
1577 	separate (adj.) 	— 	other's 	2
1578 	fresh (of water) 	→ 	vulgar 	1
1579 	beginning 	— 	before (temporal) 	2
1580 	to bark 	— 	to fight, scuffle 	1
1581 	hem (of a skirt) 	→ 	mountain slope 	3
1582 	to put 	→ 	to build 	6
1583 	to see/to look at 	→ 	because of 	6
1584 	to speak 	→ 	because of 	1
1585 	<trademark> 	→ 	<ware, goods> 	12
1586 	to find 	→ 	to be situated 	9
1587 	scorpion 	→ 	pointer (on a dial) 	7
1588 	smell (n.) 	→ 	perfume, scent 	10
1589 	end (space) 	→ 	ending (in grammar) 	5
1590 	to fall down 	— 	to get (to), find oneself (in) 	8
1591 	to strew 	→ 	rash, eruption 	2
1592 	market 	↔ 	Sunday 	8
1593 	to adorn, decorate 	— 	to be appropriate (for) 	1
1594 	gunpowder 	→ 	small quantity of something 	1
1595 	key (of a door) 	— 	screw, screw-bolt 	1
1596 	threshold 	— 	doorpost 	1
1597 	under age 	— 	rude, impolite 	1
1598 	to lead 	→ 	to marry, take a wife 	1
1599 	angry 	→ 	to revolt, rebel 	2
1600 	owre, buffalo (Bubalus bubalis) 	→ 	old man 	1
1601 	shadow 	→ 	phantom, ghost 	20
1602 	soul, spirit 	→ 	phantom, ghost 	11
1603 	Romani 	→ 	to ask for, request 	4
1604 	Romani 	→ 	to mock 	1
1605 	Romani 	→ 	to deceive 	2
1606 	Romani 	→ 	to nomadize 	5
1607 	spot, stain 	↔ 	bald spot 	8
1608 	doomsday 	→ 	tumult, turmoil 	2
1609 	guest 	— 	friend 	1
1610 	craw (of bird) 	→ 	Adam's apple 	1
1611 	to go out 	→ 	to disappear 	1
1612 	easy 	→ 	comfortable 	2
1613 	to put 	→ 	to defecate 	2
1614 	to put 	→ 	to castrate 	2
1615 	truth 	— 	payment 	1
1616 	taste (n.) 	→ 	profit, gain (n.) 	1
1617 	moisture 	→ 	profit, gain (n.) 	1
1618 	book (n.) 	→ 	note book 	1
1619 	mad, insane 	↔ 	rabid 	9
1620 	to sit 	→ 	to be imprisoned 	5
1621 	to reach 	→ 	can, to be able 	2
1622 	to reach 	→ 	must 	1
1623 	to feel pain, ache 	→ 	to run 	1
1624 	little, small 	— 	thick (of a growth, hair) 	1
1625 	bull 	→ 	strong man 	6
1626 	short (size) 	→ 	brief 	19
1627 	quick 	— 	loud 	3
1628 	acute (of sound) 	→ 	spicy 	1
1629 	long (size) 	→ 	high (size), tall 	16
1630 	pole (long stick) 	→ 	tall person 	5
1631 	to sprinkle 	→ 	to run 	5
1632 	to flow 	↔ 	to run 	19
1633 	warp 	→ 	basis 	4
1634 	threshold 	→ 	rapids 	4
1635 	belly 	→ 	pregnant 	20
1636 	tooth 	→ 	clove (of a garlic) 	7
1637 	sheath 	→ 	pod 	14
1638 	joy 	— 	game 	1
1639 	to go, walk 	→ 	to resemble, be alike 	2
1640 	alive 	→ 	quick 	6
1641 	to throw 	→ 	to shoot 	15
1642 	to bring 	→ 	to give birth 	7
1643 	soul, spirit 	→ 	butterfly 	8
1644 	to milk 	→ 	to extort (money from smb.) 	8
1645 	tail 	↔ 	rudder (of a boat) 	2
1646 	bone 	→ 	stone (of a fruit) 	10
1647 	breathing 	→ 	soul, spirit 	16
1648 	to cut 	→ 	to pass by 	4
1649 	wind 	— 	smell (n.) 	1
1650 	to turn over 	— 	to pour 	1
1651 	top, upper part 	→ 	to defeat, win 	2
1652 	top, upper part 	— 	sky 	4
1653 	to smooth 	— 	to correct 	1
1654 	to turn back to look at smth. 	— 	to sympathize 	1
1655 	to touch 	→ 	to reach 	4
1656 	day 	— 	weather 	9
1657 	wooden object 	→ 	corpse 	4
1658 	to kill 	→ 	to hunt 	4
1659 	Russian 	→ 	bedbug (Cimex lectularius) 	1
1660 	to die 	— 	to ripen 	1
1661 	long ago 	— 	already 	1
1662 	to dive 	— 	to appear for a moment 	1
1663 	below, down, bottom part 	→ 	East 	1
1664 	blue 	— 	green 	17
1665 	food 	→ 	meat 	11
1666 	to find 	→ 	bastard 	4
1667 	rooster 	→ 	chanterelle 	10
1668 	pig (Sus scrofa) 	→ 	barbel 	2
1669 	beard 	→ 	barbel 	2
1670 	moustache 	→ 	barbel 	2
1671 	alder (tree) 	→ 	common minnow 	4
1672 	mirror 	→ 	mirror carp 	2
1673 	bitter 	→ 	bitterling 	4
1674 	deep 	→ 	barbel 	2
1675 	troop (of animals) 	→ 	common minnow 	2
1676 	to blink 	→ 	instant, moment 	5
1677 	deep 	→ 	saturated (of colour) 	9
1678 	bull 	→ 	bullhead 	2
1679 	<fish> 	→ 	cigarette butt 	5
1680 	full 	→ 	fat (adj., of a person) 	5
1681 	greasy 	→ 	talc 	3
1682 	monarch 	→ 	european kingfisher (Alcedo atthis) 	3
1683 	monarch 	→ 	goldcrest 	5
1684 	wet 	↔ 	drunk 	2
1685 	skill 	— 	memory 	1
1686 	to add 	↔ 	to help, aid 	2
1687 	to write 	→ 	to learn, study 	1
1688 	to have, possess 	— 	to carry 	1
1689 	to calculate, count 	— 	to repeat 	1
1690 	to grasp, seize 	→ 	to light, kindle (the fire) 	3
1691 	snow 	→ 	winter 	2
1692 	to fall down 	→ 	to fall (of rain, snow) 	31
1693 	to fall down 	→ 	to come, arrive 	1
1694 	shadow 	→ 	picture 	16
1695 	to push 	→ 	to induce 	6
1696 	to live, be alive 	→ 	food 	7
1697 	to defend 	→ 	food 	1
1698 	quince 	↔ 	pear 	2
1699 	black 	→ 	illegal 	12
1700 	to live, be alive 	→ 	animal 	10
1701 	breathing 	→ 	animal 	6
1702 	to get, obtain 	→ 	cattle 	2
1703 	goat 	→ 	sabrefish 	2
1704 	to run 	→ 	ram 	2
1705 	to push 	→ 	ram 	1
1706 	pig (Sus scrofa) 	→ 	wood-louse 	18
1707 	to prohibit 	→ 	pig (Sus scrofa) 	1
1708 	blue 	→ 	bruise 	12
1709 	black 	→ 	bruise 	1
1710 	to spoil (tr.) 	→ 	harmful sorcery 	2
1711 	to fill (tr.) 	→ 	pregnant 	1
1712 	snake 	→ 	lamprey (Petromyzontidae) 	4
1713 	snake 	→ 	eel (Anguilla anguilla) 	7
1714 	to spring, jump 	→ 	quick 	1
1715 	to cut 	→ 	quick 	3
1716 	big 	— 	quick 	1
1717 	wind 	→ 	quick 	2
1718 	to turn, rotate (intr.) 	→ 	quick 	1
1719 	flexible 	→ 	quick 	3
1720 	hot 	→ 	quick 	8
1721 	hot 	→ 	active, agile 	8
1722 	alive 	→ 	active, agile 	5
1723 	to fly 	→ 	quick 	1
1724 	sharp 	→ 	quick 	7
1725 	to drive, force to move on 	→ 	quick 	2
1726 	eye 	→ 	eyebright (Euphrasia officinalis) 	4
1727 	cucumber 	→ 	bourrache (Borago) 	4
1728 	cucumber 	→ 	vegetable marrow 	3
1729 	cucumber 	→ 	pumpkin 	5
1730 	to bark 	→ 	to tell lies 	4
1731 	stone (piece of rock) 	→ 	turnstone (Arenaria) 	3
1732 	<tree> 	→ 	<mushroom, fungus> 	17
1733 	blind 	→ 	horse-fly (Tabanidae) 	2
1734 	<rural foot-wear> 	→ 	fool 	3
1735 	to press 	— 	to hinder 	1
1736 	to stink 	→ 	bad 	2
1737 	thin (of an object) 	→ 	coward 	1
1738 	head 	→ 	edge, border 	3
1739 	head 	→ 	kind (n.) 	2
1740 	womb, uterus 	→ 	origin 	3
1741 	to hold (in hands) 	→ 	to defend 	2
1742 	to grasp, seize 	→ 	to learn, study 	1
1743 	to strain 	→ 	to distress 	2
1744 	to burn (intr.) 	→ 	spot, stain 	2
1745 	root (of a plant) 	→ 	mountain foot 	3
1746 	to pull, to draw 	→ 	to drink 	4
1747 	lip 	→ 	word 	4
1748 	sharp 	→ 	strong 	5
1749 	to follow, go after smb. 	→ 	to resemble, be alike 	14
1750 	to follow, go after smb. 	↔ 	to pasture, shepherd 	3
1751 	to follow, go after smb. 	→ 	friend 	1
1752 	to play (intr.) 	→ 	friend 	1
1753 	calf of a leg 	→ 	butt of the rifle 	1
1754 	<container> 	→ 	<measure of volume> 	7
1755 	to refuse 	→ 	to hate, dislike 	8
1756 	to hate, dislike 	→ 	enemy 	5
1757 	can, to be able 	→ 	to endure 	3
1758 	can, to be able 	→ 	to defeat, win 	7
1759 	belly 	→ 	fat (adj., of a person) 	2
1760 	part 	→ 	body part 	2
1761 	part 	→ 	relative (n.) 	1
1762 	to throw 	→ 	to winnow 	3
1763 	to know 	→ 	sign, designation 	4
1764 	to reach 	→ 	to mature 	6
1765 	to reach 	→ 	to ripen 	7
1766 	to catch up with 	→ 	to understand 	4
1767 	to reach 	→ 	to become ready (of food) 	4
1768 	man (male) 	↔ 	penis 	9
1769 	tail 	→ 	behind 	2
1770 	tail 	→ 	scarf 	2
1771 	to tread 	→ 	to copulate 	7
1772 	to tread 	→ 	to thresh (grain) 	4
1773 	can, to be able 	→ 	strong 	4
1774 	wing 	— 	edge, border 	1
1775 	to repeat 	→ 	to tell 	2
1776 	female calf 	→ 	girl 	5
1777 	rock, crag, cliff 	— 	knee-cap 	1
1778 	forehead 	— 	stone (piece of rock) 	1
1779 	vessel 	→ 	property, possessions 	2
1780 	to sit down 	→ 	to stop doing smth. 	1
1781 	wet 	→ 	lavish, generous 	1
1782 	raw 	→ 	false, wrong 	2
1783 	to contain 	→ 	to remember 	1
1784 	hair 	→ 	happiness, luck 	1
1785 	to squeeze 	→ 	to suck 	2
1786 	narrow, close 	→ 	to oppress 	3
1787 	to grasp, seize 	→ 	servant 	1
1788 	to grasp, seize 	→ 	to care for, look after 	1
1789 	strong 	→ 	noble 	1
1790 	sated with food 	→ 	rich 	3
1791 	to separate 	→ 	to decide 	3
1792 	weak 	— 	blunt 	2
1793 	man (male) 	→ 	courage 	17
1794 	to eat 	→ 	to feel pain, ache 	2
1795 	to cut 	→ 	spicy 	1
1796 	to cut 	→ 	to know 	2
1797 	<young animal> 	→ 	young person 	3
1798 	to ride (e.g., a horse) 	→ 	to copulate 	5
1799 	to call 	→ 	to make a telephone call 	7
1800 	tail 	→ 	penis 	32
1801 	eyelash 	→ 	edge, border 	2
1802 	to care for, look after 	→ 	worry, anxiety 	6
1803 	to turn, rotate (intr.) 	→ 	to address (someone) 	3
1804 	awake 	→ 	to guard 	3
1805 	tail 	— 	lower part 	1
1806 	tail 	→ 	to follow logically, consequently 	2
1807 	to see/to look at 	→ 	to guard 	7
1808 	moon 	→ 	mad, insane 	9
1809 	tail 	→ 	to follow, go after smb. 	1
1810 	to follow, go after smb. 	→ 	to prosecute at law 	3
1811 	heel (of a foot) 	→ 	to result in 	1
1812 	to follow, go after smb. 	→ 	to result in 	3
1813 	toy 	→ 	flower 	2
1814 	to result in 	→ 	child (son or daughter) 	1
1815 	heel (of a foot) 	→ 	end (space) 	1
1816 	to hang (intr.) 	→ 	to depend 	15
1817 	to make black 	→ 	to slander 	3
1818 	raw 	→ 	rude, impolite 	6
1819 	to harness 	→ 	to force to work 	4
1820 	to make hard 	→ 	to learn, study 	2
1821 	thick (of a growth, hair) 	→ 	intensive 	1
1822 	slow (adj.) 	→ 	stupid 	3
1823 	young 	→ 	positive evaluation 	2
1824 	to dig 	→ 	hoof 	2
1825 	to fall down 	→ 	to attack 	11
1826 	to sleep 	→ 	to come to end, cease 	1
1827 	to mill, grind 	→ 	to oppress 	1
1828 	hand/arm 	→ 	part 	3
1829 	wing 	→ 	side (n.) 	6
1830 	wing 	→ 	to defend 	1
1831 	to bind 	→ 	dense, thick (of liquid) 	2
1832 	to tie 	→ 	to form the fruit (of plant) 	2
1833 	to move quickly 	→ 	to be busy, active 	1
1834 	to want 	→ 	to fornicate 	1
1835 	to be glad, happy 	— 	to trust 	2
1836 	friend 	→ 	beloved 	8
1837 	to sleep 	↔ 	to lie (posture) 	26
1838 	free of charge 	→ 	vain, in vain 	20
1839 	to be born 	— 	to inhabit, live 	1
1840 	sky 	→ 	weather 	25
1841 	cartilage 	— 	branch, twig 	1
1842 	conversation 	— 	feast, holiday 	1
1843 	fun, gaiety 	→ 	wedding 	7
1844 	to pull, to draw 	→ 	to last 	3
1845 	tongue (body part) 	→ 	gulf 	2
1846 	genuine, true 	→ 	biological (of a relative) 	1
1847 	to become full 	→ 	to end, finish 	3
1848 	to stand 	→ 	servant 	1
1849 	to stand 	→ 	to inhabit, live 	3
1850 	to hold (in hands) 	→ 	to promise 	1
1851 	to hold (in hands) 	→ 	to become solid 	3
1852 	to grasp, seize 	→ 	to fight, scuffle 	2
1853 	to breathe 	→ 	to rest 	34
1854 	to sway 	→ 	excitement, agitation 	7
1855 	to want 	→ 	although 	5
1856 	to go out 	→ 	to rise (of Moon, Sun) 	9
1857 	to be surprised 	— 	to lose one's way 	1
1858 	to go down 	→ 	to set (of Moon, Sun) 	10
1859 	liquid (adj.) 	→ 	high-pitched 	1
1860 	to meet (each other) 	→ 	to quarrel 	1
1861 	heavy (of weight) 	→ 	bass, low-pitched voice 	3
1862 	to present, gift 	→ 	to promise 	2
1863 	colour 	→ 	timbre 	3
1864 	heavy (of weight) 	→ 	slow (adj.) 	3
1865 	to bypass 	→ 	to deceive 	3
1866 	moon 	→ 	menstruation 	27
1867 	to take 	→ 	bribe 	2
1868 	road 	→ 	Milky Way 	19
1869 	to burn (intr.) 	→ 	passionate, zealous 	5
1870 	to open (tr.) 	→ 	to switch on 	6
1871 	soft (adj.) 	→ 	tasteless 	1
1872 	to step on 	→ 	to begin (intr.) 	2
1873 	to dislocate (of a joint) 	→ 	to go mad 	2
1874 	to spoil (intr.) 	→ 	to go mad 	1
1875 	to prop up 	→ 	to help, aid 	16
1876 	to lean on/against 	→ 	to endure 	2
1877 	blood vessel 	→ 	tendon 	20
1878 	foot/leg 	→ 	branch, twig 	3
1879 	mad, insane 	→ 	angry 	6
1880 	to change (tr.) 	→ 	to cheat on, be unfaithful to 	2
1881 	steep 	→ 	severe, harsh 	6
1882 	atheist 	→ 	cruel 	5
1883 	to pierce 	→ 	woman 	2
1884 	to leave, abandon 	→ 	to let, allow 	8
1885 	to pull, to draw 	→ 	bow-string 	1
1886 	to fill (tr.) 	→ 	to become infected 	1
1887 	to stand, be in vertical position 	→ 	to be situated 	11
1888 	to be born 	↔ 	to rise (of Moon, Sun) 	3
1889 	straight 	→ 	healthy 	2
1890 	correct, right 	→ 	fat (adj., of a person) 	2
1891 	yesterday 	→ 	recently 	2
1892 	to sting 	→ 	to induce 	4
1893 	weak 	— 	bad (ethically) 	2
1894 	weakness 	→ 	inclination to smth 	14
1895 	to fall down 	→ 	to concern, be related to 	1
1896 	to suffice, be enough 	→ 	to cost 	1
1897 	wolf 	→ 	cruel 	3
1898 	lung 	↔ 	liver 	40
1899 	good 	→ 	OK 	8
1900 	work (n.) 	→ 	thing 	5
1901 	slow (adj.) 	→ 	humble 	1
1902 	to pull, to draw 	→ 	bow (weapon) 	1
1903 	to do, act 	→ 	verb 	16
1904 	flat (adj) 	→ 	unfunny 	2
1905 	bed 	→ 	river-bed 	11
1906 	to crackle 	→ 	cartilage 	5
1907 	black 	→ 	sad 	8
1908 	to mix, stir 	→ 	to involve 	3
1909 	to set (of Moon, Sun) 	→ 	to die 	2
1910 	to gnaw 	→ 	to carp, criticize 	2
1911 	sharp 	→ 	sharpshooter 	3
1912 	armpit 	→ 	corner 	1
1913 	armpit 	→ 	gulf 	3
1914 	empty 	→ 	stupid 	3
1915 	bridge 	→ 	clavicle 	3
1916 	ear 	→ 	gills 	5
1917 	belt 	→ 	rainbow 	7
1918 	spade, shovel 	→ 	shoulder-blade, scapula 	8
1919 	to shear 	→ 	to rob 	2
1920 	monkey 	→ 	ugly 	8
1921 	to intend 	— 	to hope 	1
1922 	clean (adj.) 	→ 	honest 	7
1923 	to clean 	→ 	to deceive 	1
1924 	to clean 	→ 	to steal 	3
1925 	simple 	→ 	stupid 	4
1926 	stupid 	↔ 	bad 	3
1927 	spirit (supernatural being) 	→ 	smell (n.) 	2
1928 	tribe 	→ 	kind (n.) 	6
1929 	to cool down (intr.) 	→ 	to die 	1
1930 	spring, fountain 	→ 	origin 	12
1931 	narrow, close 	→ 	greedy 	3
1932 	to defecate 	→ 	to waste 	2
1933 	hard, solid 	→ 	firm, durable 	7
1934 	mangy, scabby 	→ 	bad 	4
1935 	brick (n.) 	→ 	diamonds (in cards) 	6
1936 	to mill, grind 	→ 	to talk nonsense 	10
1937 	to mill, grind 	→ 	to eat 	1
1938 	to touch 	→ 	to hit the target 	2
1939 	to enter 	→ 	to be ill, sick 	2
1940 	plait, braid 	— 	mane 	1
1941 	branch, twig 	→ 	trouser-leg 	1
1942 	to cackle, cluck 	→ 	to speak 	2
1943 	to bite 	→ 	part 	4
1944 	knot 	→ 	bud (on a twig) 	1
1945 	bud (on a twig) 	→ 	kidney 	1
1946 	middle, centre 	→ 	back (body part) 	2
1947 	curved 	→ 	squint-eyed 	4
1948 	squint-eyed 	→ 	hare (Lepus) 	2
1949 	face 	→ 	mountain slope 	3
1950 	brain (cerebrum) 	→ 	mind (n.) 	29
1951 	mosquito, gnat 	↔ 	fly (n.) 	6
1952 	corpse 	→ 	bad (ethically) 	2
1953 	acorn 	↔ 	oak 	25
1954 	oak 	→ 	to tan (hides) 	3
1955 	nostril 	— 	finger-ring 	1
1956 	awl 	→ 	dinner fork 	1
1957 	earth, soil 	— 	dust 	13
1958 	otter (Lutra lutra) 	— 	seal (animal) 	1
1959 	soldier 	→ 	jack (playing card) 	6
1960 	soldier 	→ 	pawn (in chess) 	40
1961 	turnip 	— 	black radish 	3
1962 	brand, stamp 	— 	spot, stain 	1
1963 	boredom 	→ 	laziness 	1
1964 	to spring, jump 	→ 	grasshopper (Tettigonioidea) 	3
1965 	to get dry 	→ 	to disappear 	2
1966 	to go out 	→ 	to vesicate 	2
1967 	to pass by 	→ 	to pass (of time) 	17
1968 	to flow 	→ 	to pass (of time) 	6
1969 	step (of a staircase, step-ladder) 	→ 	stairs, ladder 	2
1970 	crown (n.) 	→ 	top/crown (of a tree) 	6
1971 	top/crown (of a tree) 	— 	umbrella 	2
1972 	overcoat 	→ 	fool 	1
1973 	to stick, adhere 	→ 	to bother, pester 	4
1974 	friend 	→ 	husband / wife 	10
1975 	to think, consider 	→ 	to care for, look after 	5
1976 	to make, create 	→ 	to give birth 	6
1977 	oar 	→ 	to row (with oars) 	3
1978 	to row (with oars) 	→ 	to fly 	2
1979 	sail (n.) 	→ 	to sail 	8
1980 	ship, vessel 	→ 	to sail 	5
1981 	sea 	→ 	to sail 	3
1982 	hunt (n.), hunting 	↔ 	wild beast 	7
1983 	to get tired 	→ 	to grow numb 	1
1984 	quick 	→ 	urgent 	5
1985 	silver 	↔ 	money 	121
1986 	greasy 	→ 	fertile (soil) 	11
1987 	miracle 	→ 	strange 	3
1988 	locked 	→ 	strong (of liquid or smell) 	1
1989 	closed 	→ 	cloudy 	2
1990 	patch 	→ 	spot, stain 	3
1991 	word 	— 	matter, affair 	4
1992 	field 	→ 	battle 	3
1993 	face 	→ 	direction 	2
1994 	face 	→ 	front part 	42
1995 	dry 	→ 	cruel 	1
1996 	dry 	→ 	bad 	2
1997 	dry 	→ 	paralyzed 	1
1998 	smooth (surface) 	— 	beautiful 	2
1999 	smooth (surface) 	→ 	to escape, flee 	5
2000 	smooth (surface) 	— 	to move quickly 	1
2001 	smooth (surface) 	— 	to flatter 	1
2002 	rough, uneven 	→ 	approximately 	3
2003 	sharp 	→ 	clever, wise 	13
2004 	sharp 	→ 	pungent (odour) 	8
2005 	edge, border 	→ 	blade, edge (of an instrument) 	4
2006 	cover, canopy 	→ 	to defend 	3
2007 	nose 	→ 	angry 	3
2008 	nose 	→ 	chief, boss 	1
2009 	egg 	— 	bribe 	1
2010 	awake 	→ 	attentive 	6
2011 	to rest 	→ 	to die 	4
2012 	light (vs. heavy) 	→ 	frivolous 	6
2013 	willow 	→ 	young people 	1
2014 	heavy (of weight) 	→ 	rich 	2
2015 	hot 	→ 	angry 	16
2016 	to work 	→ 	to get tired 	2
2017 	to see/to look at 	→ 	to find 	9
2018 	to see/to look at 	→ 	to check, test 	4
2019 	to fall down 	↔ 	to make a mistake, be wrong 	3
2020 	to drop (of liquid) 	→ 	spot, stain 	3
2021 	awake 	→ 	active, agile 	3
2022 	to awaken, wake up 	→ 	to cause 	12
2023 	to slaughter (cattle) 	→ 	to deceive 	1
2024 	sated with food 	→ 	insolent 	4
2025 	sated with food 	→ 	saturated (with something) 	3
2026 	muddy, turbid, opaque 	→ 	to be confused 	2
2027 	equal, identical 	— 	correct, right 	1
2028 	equal, identical 	— 	straight 	4
2029 	to stand up 	→ 	to be resurrected 	6
2030 	cold 	→ 	pleasant 	2
2031 	cold 	→ 	slow (adj.) 	2
2032 	cold 	→ 	motionless 	3
2033 	powder-like 	→ 	thin (of an object) 	4
2034 	thin (of an object) 	→ 	quiet (vs. loud) 	2
2035 	thin (of an object) 	→ 	not strong (of liquid or smell) 	9
2036 	thin (of an object) 	→ 	lean, thin (of a person) 	11
2037 	weak 	→ 	poor, needy 	4
2038 	lean, thin (of a person) 	→ 	weak 	6
2039 	straight 	→ 	ordinary 	2
2040 	thin (of an object) 	→ 	delicate, subtle (person, question etc.) 	6
2041 	thin (of an object) 	→ 	narrow 	5
2042 	lean, thin (of a person) 	→ 	infertile (soil) 	11
2043 	thick 	↔ 	fat (adj., of a person) 	21
2044 	thick 	→ 	dense, thick (of liquid) 	16
2045 	messenger 	→ 	angel 	4
2046 	bone 	→ 	strong 	4
2047 	big 	→ 	thumb 	7
2048 	to go up 	→ 	difficult 	1
2049 	to open (tr.) 	→ 	to judge 	3
2050 	to open (tr.) 	→ 	to occupy, conquest (territory) 	1
2051 	to open (tr.) 	→ 	to explain 	2
2052 	ear 	→ 	mind (n.) 	3
2053 	to light, kindle (the fire) 	→ 	to provoke 	11
2054 	to cover 	→ 	to forgive 	1
2055 	knot 	→ 	contract, treaty 	2
2056 	door 	→ 	chapter (of a book) 	6
2057 	door 	→ 	manner, way, method 	2
2058 	door 	→ 	kind (n.) 	1
2059 	heel (of a foot) 	→ 	hoof 	1
2060 	foot 	→ 	footprint, track 	7
2061 	aim, goal 	→ 	goal (sport result) 	4
2062 	end (space) 	→ 	aim, goal 	6
2063 	to think, consider 	→ 	to intend 	16
2064 	top, upper part 	→ 	eminent man 	1
2065 	branch, twig 	→ 	part 	11
2066 	to go away 	— 	to set (of Moon, Sun) 	3
2067 	to set (of Moon, Sun) 	→ 	West 	5
2068 	to rise (of Moon, Sun) 	→ 	East 	5
2069 	to rise (of Moon, Sun) 	↔ 	red 	2
2070 	eye 	→ 	eminent man 	1
2071 	eye 	↔ 	sun 	9
2072 	fruit 	→ 	fetus 	4
2073 	root (of a plant) 	→ 	lower part 	2
2074 	to plant 	→ 	plant (biol.) 	22
2075 	to get accustomed 	— 	to learn, study 	3
2076 	to shut, close 	→ 	to end, finish 	10
2077 	to shut, close 	→ 	to ignore, disregard 	1
2078 	to cut 	→ 	to cut off relationships 	3
2079 	colour 	→ 	kind (n.) 	7
2080 	meat 	→ 	fruit pulp 	15
2081 	bread 	→ 	food 	15
2082 	thick 	→ 	strong (of liquid or smell) 	1
2083 	high (location) 	→ 	proud 	7
2084 	big 	→ 	loud 	7
2085 	little, small 	→ 	young 	7
2086 	owner 	→ 	husband 	55
2087 	star 	→ 	North 	2
2088 	garlic (Allium sativum) 	→ 	mushroom Marasmius scorodonius 	7
2089 	dust 	→ 	pollen 	9
2090 	to strike, hit 	→ 	to move quickly 	2
2091 	to strike, hit 	→ 	to walk, wander 	2
2092 	<insect> 	→ 	many, much 	3
2093 	sharp 	→ 	dangerous 	5
2094 	sharp 	→ 	of high degree (about pain) 	3
2095 	sharp 	→ 	water soldier (plant) 	1
2096 	soldier 	→ 	water soldier (plant) 	2
2097 	to cut 	— 	to blunt 	3
2098 	to hew 	→ 	to object 	2
2099 	to calculate, count 	— 	to prepare 	1
2100 	to build 	→ 	to pretend 	2
2101 	flat (adj) 	→ 	stupid 	2
2102 	street 	→ 	whore 	5
2103 	warm 	→ 	friendly, amicable 	11
2104 	cold 	→ 	hostile 	5
2105 	cold 	→ 	friendly, amicable 	2
2106 	cold 	— 	fresh (of water) 	1
2107 	lightning 	→ 	electricity 	16
2108 	amber 	→ 	electricity 	5
2109 	to flow 	→ 	electricity 	14
2110 	drunk 	→ 	great bilberry (Vaccinium uliginosum) 	2
2111 	rooster 	→ 	bully 	6
2112 	drone 	→ 	idler, loafer 	8
2113 	sand 	→ 	many, much 	3
2114 	sand 	→ 	coast, shore 	24
2115 	sharp 	→ 	brave 	2
2116 	stopper, plug 	→ 	baby 	3
2117 	to sway 	→ 	to walk, wander 	7
2118 	to love 	— 	to let, allow 	1
2119 	monkey 	→ 	to imitate 	13
2120 	to come, arrive 	→ 	to happen 	4
2121 	to carry 	→ 	to steal 	5
2122 	pumpkin 	→ 	vegetable marrow 	14
2123 	to strike, hit 	→ 	to mow grass 	5
2124 	to stand 	→ 	to befit 	1
2125 	to stand 	→ 	to take place 	3
2126 	stone (piece of rock) 	→ 	stone (of a fruit) 	11
2127 	cheek 	→ 	mountain slope 	3
2128 	cold 	→ 	cold weapon 	7
2129 	white 	→ 	cold weapon 	8
2130 	to burn (intr.) 	→ 	sword 	2
2131 	to shine, glitter 	→ 	<cold weapon> 	2
2132 	coward 	— 	cat 	1
2133 	flower 	— 	yolk 	3
2134 	to break (tr.) 	→ 	to infringe 	14
2135 	to break (tr.) 	→ 	to exchange money 	7
2136 	to speak 	→ 	to foresee 	4
2137 	sad 	↔ 	weak 	5
2138 	to fall down 	→ 	to end, finish 	1
2139 	dry 	→ 	boring 	4
2140 	tired 	→ 	lazy 	16
2141 	to quarrel 	— 	to bargain 	1
2142 	to bark 	— 	to joke 	1
2143 	foot/leg 	→ 	basis 	3
2144 	hump (of a person or camel) 	— 	shoal 	1
2145 	lame 	→ 	drunk 	1
2146 	rhinoceros 	→ 	tank (armour) 	1
2147 	bird Nectarinia gutturalis 	→ 	drunkard 	1
2148 	to go up 	→ 	to flourish, prosper 	2
2149 	nose 	— 	mouth 	2
2150 	to sail 	→ 	to fly 	7
2151 	deep 	→ 	profound 	8
2152 	tail 	→ 	horsetail, equisetum 	11
2153 	spruce (Picea) 	→ 	horsetail, equisetum 	2
2154 	apple 	→ 	potato 	23
2155 	<foreigner> 	→ 	mythical giant 	14
2156 	<foreigner> 	↔ 	monster (supernatural) 	11
2157 	<fruit> 	→ 	pupil (of an eye) 	3
2158 	dew 	→ 	sundew (Drosera) 	5
2159 	to crawl 	→ 	to be torn 	2
2160 	human, person 	→ 	servant 	6
2161 	to strike, hit 	→ 	to attack 	7
2162 	white 	→ 	blank 	7
2163 	to cut 	→ 	to stop doing smth. 	9
2164 	to cut 	→ 	to hinder 	2
2165 	lion (Panthera leo) 	→ 	brave person 	9
2166 	to sit down 	→ 	to shrink (of textile) 	4
2167 	to spring, jump 	→ 	to shrink (of textile) 	2
2168 	pot 	— 	furnace 	2
2169 	to raise, lift (tr.) 	→ 	to awaken, wake up 	13
2170 	to spoil (tr.) 	→ 	to deprave 	5
2171 	to spoil (tr.) 	→ 	to defeat, win 	1
2172 	empty 	— 	extinct 	1
2173 	lung 	→ 	medusa, jellyfish 	2
2174 	to fear, be afraid 	→ 	to respect 	20
2175 	door 	→ 	strait 	1
2176 	door 	→ 	ravine 	1
2177 	door 	→ 	mouth (of a river) 	1
2178 	to see/to look at 	— 	to feel 	2
2179 	pearl 	→ 	tears 	4
2180 	pilot sucker 	→ 	creditor 	1
2181 	leech 	→ 	creditor 	1
2182 	leech 	→ 	extortioner 	1
2183 	to follow, go after smb. 	→ 	to act according to 	38
2184 	stranger, foreign 	→ 	strange 	12
2185 	to cut 	→ 	to feel pain, ache 	12
2186 	to see/to look at 	→ 	to beware, be careful 	14
2187 	to strike, hit 	→ 	to hit the target 	1
2188 	to be separated 	→ 	to die 	4
2189 	to wait 	→ 	to care for, look after 	10
2190 	to search, look for 	→ 	to investigate 	22
2191 	calm 	→ 	cheerful 	1
2192 	to stick, adhere 	→ 	to become infected 	1
2193 	to die 	→ 	to grow numb 	9
2194 	sharp 	→ 	severe, harsh 	7
2195 	sharp 	→ 	steep 	2
2196 	to braid, plait, weave 	→ 	wall 	3
2197 	table, desk 	→ 	joiner, cabinetmaker 	6
2198 	box, container 	→ 	joiner, cabinetmaker 	2
2199 	lock (n.) 	→ 	metalworker 	2
2200 	<beverage, drink> 	→ 	gratuity 	5
2201 	to drink 	→ 	gratuity 	4
2202 	cauldron 	→ 	cannon (weapon) 	3
2203 	camp 	→ 	army 	4
2204 	young person 	→ 	soldier 	4
2205 	child (son or daughter) 	↔ 	sprout 	27
2206 	to touch 	→ 	to be friends 	1
2207 	to mix, stir 	→ 	to waste 	1
2208 	to change (tr.) 	→ 	to distract 	1
2209 	behind 	→ 	West 	5
2210 	open (adj.) 	→ 	frank 	8
2211 	to go, walk 	→ 	to suit (of clothes etc.) 	5
2212 	foot 	→ 	mountain foot 	9
2213 	to burst 	→ 	to give birth 	1
2214 	healthy 	↔ 	fat (adj., of a person) 	3
2215 	finger-ring 	→ 	clavicle 	1
2216 	bastard 	→ 	<curse: bad person> 	7
2217 	friend 	— 	enemy 	2
2218 	moss 	— 	mold 	2
2219 	dry 	→ 	severe, harsh 	2
2220 	to choke, strangle 	— 	to offend (tr.) 	1
2221 	door 	— 	cover, lid 	1
2222 	nose 	— 	brain (cerebrum) 	1
2223 	nose 	— 	palate 	1
2224 	to blow 	— 	to rise (of Moon, Sun) 	1
2225 	to blow 	— 	to grow (plants) 	1
2226 	circle 	— 	destiny 	1
2227 	opening, hole 	— 	mouth (of a river) 	1
2228 	late 	— 	long ago 	2
2229 	head 	→ 	cape 	6
2230 	colour 	— 	false, wrong 	1
2231 	yellow 	— 	bile, gall 	3
2232 	ugly 	— 	bad 	5
2233 	spicy 	— 	stupid 	1
2234 	poison 	— 	sad 	2
2235 	common bullfinch 	→ 	fool 	3
2236 	dew 	— 	hail 	1
2237 	green 	→ 	dark-skinned 	3
2238 	hard, solid 	→ 	difficult 	16
2239 	full 	↔ 	drunk 	8
2240 	horned 	— 	evident 	2
2241 	monarch 	→ 	bridegroom 	4
2242 	cheerful 	→ 	drunk 	4
2243 	to follow, go after smb. 	→ 	to follow logically, consequently 	11
2244 	to follow, go after smb. 	→ 	next 	14
2245 	head 	→ 	side (n.) 	3
2246 	to press 	→ 	to hatch out, brood 	1
2247 	free 	→ 	free of charge 	5
2248 	sated with food 	→ 	sure, confident 	1
2249 	far away 	→ 	long ago 	4
2250 	near 	→ 	stupid 	2
2251 	to speak 	→ 	to have opinion 	6
2252 	to crackle 	→ 	to eat 	3
2253 	shallow 	→ 	poor, needy 	2
2254 	to become dense 	— 	to keep silent 	1
2255 	front part 	— 	East 	3
2256 	navel 	→ 	middle, centre 	21
2257 	pumpkin 	→ 	Boletus edulis 	1
2258 	humble 	— 	clever, wise 	1
2259 	to fall down 	→ 	to be born 	1
2260 	to fall down 	→ 	to coincide 	12
2261 	to remember 	→ 	to feel 	3
2262 	metal 	→ 	money 	8
2263 	stump (of tree) 	→ 	share, stock 	2
2264 	to chew 	→ 	to explain 	3
2265 	spicy 	→ 	sad 	1
2266 	wound (n.) 	— 	defect 	1
2267 	mad, insane 	→ 	passionate, zealous 	7
2268 	clean (adj.) 	→ 	beautiful 	2
2269 	to eat 	→ 	to consume 	4
2270 	to eat 	→ 	to copulate 	1
2271 	atmosphere 	→ 	ambience, vibe 	10
2272 	to spoil (intr.) 	→ 	grief, sorrow 	1
2273 	garbage 	→ 	lumpen 	1
2274 	mouth 	→ 	vacancy 	1
2275 	to lower, put down 	→ 	to disgrace, dishonor 	4
2276 	to mix, stir 	→ 	to swim 	1
2277 	to float 	→ 	to move smoothly, gently 	2
2278 	to float 	→ 	to pass (of time) 	1
2279 	to put 	→ 	to bury, inter 	3
2280 	to put 	→ 	to decide 	1
2281 	to bite 	→ 	to quarrel 	7
2282 	to grasp, seize 	→ 	to eat 	2
2283 	to lower, put down 	→ 	to strike, hit 	1
2284 	to clean 	→ 	to destroy, annihilate 	1
2285 	dark (adj.) 	→ 	strong (of liquid or smell) 	1
2286 	breathing 	→ 	skill 	1
2287 	to row (with oars) 	→ 	to be sleepy 	1
2288 	to grow numb 	→ 	passionate, zealous 	1
2289 	to make noise 	→ 	worry, anxiety 	1
2290 	threshold 	→ 	limit 	2
2291 	to be friends 	→ 	to like 	1
2292 	tart (taste) 	→ 	gloomy, depressed 	2
2293 	pure 	→ 	genuine, true 	4
2294 	pure 	→ 	innocent 	3
2295 	buttock 	→ 	end (space) 	2
2296 	white 	→ 	innocent 	4
2297 	to believe in 	→ 	to trust 	13
2298 	heart 	→ 	impudence 	1
2299 	opening, hole 	→ 	defect 	2
2300 	to do, act 	→ 	to cost 	2
2301 	back (body part) 	→ 	height (of a person) 	2
2302 	to cut 	→ 	to weaken, loosen 	1
2303 	poor, needy 	→ 	rude, impolite 	1
2304 	heart 	→ 	by heart 	3
2305 	chest (body part) 	→ 	by heart 	1
2306 	high (size), tall 	→ 	expensive 	1
2307 	to cough 	→ 	to fear, be afraid 	1
2308 	to hang (tr.) 	→ 	to weigh (intr.) 	4
2309 	to take away, carry away 	→ 	to arrange, put in order 	2
2310 	to take 	→ 	to ferment, yeast 	1
2311 	clean (adj.) 	→ 	empty 	3
2312 	error, defect 	→ 	danger 	1
2313 	to answer 	→ 	to be responsible for 	17
2314 	to rotate (tr.) 	→ 	to torture 	2
2315 	black 	→ 	guilt, guilty 	2
2316 	black 	→ 	married 	1
2317 	black 	→ 	Saturn 	1
2318 	black 	→ 	woman 	1
2319 	sick, ill 	→ 	moon 	1
2320 	healthy 	→ 	sun 	1
2321 	jewelry, precious thing 	→ 	penis 	1
2322 	to press 	→ 	brave 	1
2323 	to endure 	— 	to remember 	1
2324 	meat 	→ 	kinship 	5
2325 	anger 	— 	disease 	1
2326 	skin (of a person) 	→ 	bark (of a tree) 	28
2327 	insolent 	— 	stupid 	1
2328 	healthy 	→ 	competent 	2
2329 	<foreigner> 	→ 	cunning person 	1
2330 	spark 	→ 	firefly 	1
2331 	forehead 	→ 	front (military) 	2
2332 	forehead 	→ 	side (n.) 	1
2333 	big 	→ 	important 	12
2334 	jewelry, precious thing 	→ 	talent 	1
2335 	cavity, hollow 	— 	sinus (math.) 	3
2336 	to strike, hit 	→ 	to understand 	1
2337 	to strike, hit 	→ 	to drink 	10
2338 	curved 	→ 	mad, insane 	2
2339 	to strike, hit 	→ 	to resemble, be alike 	3
2340 	to strike, hit 	→ 	to sound 	4
2341 	to bend, bow (intr.) 	→ 	angry 	1
2342 	broken 	↔ 	mad, insane 	3
2343 	to pull, to draw 	→ 	to resemble, be alike 	2
2344 	jaw 	→ 	talkative person 	1
2345 	stone (of a fruit) 	→ 	cause, reason 	1
2346 	stone (of a fruit) 	→ 	secret (n) 	1
2347 	step (of a staircase, step-ladder) 	→ 	stage, phase 	3
2348 	blood 	→ 	kinship 	12
2349 	strong 	→ 	clever, wise 	2
2350 	mist, fog 	→ 	dark (adj.) 	3
2351 	to fish 	→ 	to flirt 	1
2352 	hand/arm 	→ 	manner, way, method 	1
2353 	to live, be alive 	→ 	bread 	2
2354 	to rub 	→ 	to wash (clothes) 	5
2355 	enemy 	→ 	evil spirit 	7
2356 	sky 	↔ 	god 	19
2357 	father 	→ 	parents 	17
2358 	old (vs. young) 	→ 	parents 	10
2359 	to give birth 	→ 	parents 	11
2360 	to shine, glitter 	→ 	star 	3
2361 	white 	→ 	albugo, wall-eye 	6
2362 	to catch up with 	→ 	to revenge 	1
2363 	owner 	→ 	tiger 	2
2364 	owner 	→ 	bear (Ursus) 	4
2365 	to smear, anoint 	→ 	to cure, treat (medically) 	1
2366 	fire 	→ 	inflammation 	15
2367 	<animal> 	→ 	spot of reflected light 	16
2368 	to bite 	→ 	to hew 	1
2369 	wooden object 	→ 	bastard 	1
2370 	to make noise 	→ 	to quarrel 	6
2371 	night 	→ 	24 hours 	7
2372 	day 	→ 	24 hours 	105
2373 	winter 	→ 	year 	11
2374 	autumn 	→ 	year 	4
2375 	to spring, jump 	→ 	to copulate 	2
2376 	red 	→ 	gold 	13
2377 	sphere; ball 	→ 	bullet 	11
2378 	stone (piece of rock) 	→ 	bullet 	2
2379 	arrow 	→ 	bullet 	13
2380 	lead, plumbum 	↔ 	bullet 	12
2381 	thunder 	→ 	firearm 	3
2382 	bow (weapon) 	→ 	firearm 	5
2383 	summer 	→ 	South 	2
2384 	morning 	→ 	East 	4
2385 	to croak 	→ 	to predict misfortune 	4
2386 	heart 	→ 	angry 	3
2387 	hand/arm 	→ 	ray 	3
2388 	hand/arm 	→ 	trunk, proboscis (of elephant) 	8
2389 	arrow 	→ 	lightning 	2
2390 	spear 	→ 	lightning 	1
2391 	thorn 	— 	arrow 	4
2392 	cheerful 	→ 	rainbow 	4
2393 	to strike, hit 	→ 	to fight (war) 	10
2394 	to kill 	— 	to fight (war) 	1
2395 	to pull hair 	→ 	to fight (war) 	1
2396 	noise 	→ 	war 	3
2397 	to greet 	→ 	to kiss 	5
2398 	miserable, unhappy 	→ 	dear, darling 	2
2399 	<plant (biol.)> 	→ 	bastard 	4
2400 	earth, soil 	→ 	human, person 	3
2401 	beard 	→ 	axe 	3
2402 	<place name> 	→ 	<fish> 	21
2403 	summer 	— 	harvest 	3
2404 	autumn 	→ 	harvest 	4
2405 	August 	↔ 	harvest 	9
2406 	<foreigner> 	→ 	maize 	14
2407 	pigeon (Columba) 	→ 	maize 	3
2408 	goat 	→ 	oat 	2
2409 	tooth 	→ 	sword 	1
2410 	to let, leave 	→ 	to stop doing smth. 	2
2411 	arc 	→ 	bow (weapon) 	11
2412 	rope, cord 	→ 	snake 	3
2413 	black 	→ 	many, much 	4
2414 	black 	→ 	pupil (of an eye) 	3
2415 	wide, broad 	→ 	lavish, generous 	5
2416 	<foreigner> 	→ 	buckwheat 	4
2417 	heathen, pagan 	→ 	buckwheat 	2
2418 	beech 	— 	oak 	2
2419 	elm 	→ 	beech 	1
2420 	tree 	→ 	oak 	8
2421 	oak 	→ 	pine-tree 	3
2422 	pole (long stick) 	→ 	oak 	3
2423 	beech 	— 	ash (tree) 	1
2424 	pine-tree 	→ 	spruce (Picea) 	7
2425 	willow 	→ 	poplar (Populus alba) 	4
2426 	aspen 	— 	poplar (Populus alba) 	4
2427 	to tremble 	→ 	aspen 	3
2428 	pine-tree 	→ 	abies (Abies) 	1
2429 	pine-tree 	— 	larch 	1
2430 	pine-tree 	— 	Siberian cedar (kedar) 	1
2431 	poplar (Populus alba) 	→ 	abies (Abies) 	1
2432 	poplar (Populus alba) 	→ 	tree 	1
2433 	aspen 	— 	elm 	1
2434 	yew 	— 	willow 	1
2435 	poplar (Populus alba) 	— 	platan 	1
2436 	tree 	→ 	hard, solid 	1
2437 	mountain 	— 	oak 	1
2438 	birch 	→ 	ash (tree) 	1
2439 	willow 	— 	alder (tree) 	1
2440 	spruce (Picea) 	→ 	alder (tree) 	1
2441 	birch 	→ 	beech 	1
2442 	birch 	→ 	bird cherry tree 	1
2443 	ash (tree) 	→ 	maple 	1
2444 	rowan 	— 	henbane 	1
2445 	hawthorn 	— 	dog-rose 	3
2446 	hawthorn 	→ 	cornel 	1
2447 	hawthorn 	→ 	blackthorn 	1
2448 	shadberry 	— 	honeysuckle 	1
2449 	meadow-sweet 	— 	tamarisk 	1
2450 	bird cherry tree 	— 	medlar 	1
2451 	currant-bush 	— 	wild rosemary 	1
2452 	currant-bush 	→ 	buckthorn (Frangula) 	1
2453 	currant-bush 	↔ 	gooseberry 	1
2454 	snowball tree, guelder-rose, viburnum 	— 	tamarisk 	1
2455 	light, bright, clear 	→ 	birch 	1
2456 	birch 	— 	elm 	1
2457 	hornbeam 	— 	beech 	1
2458 	elder (Sambucus) 	— 	dog-rose 	1
2459 	barley 	→ 	oat 	1
2460 	juniper 	→ 	wild rosemary 	1
2461 	maple 	— 	rowan 	1
2462 	<foreigner> 	→ 	child before baptism 	4
2463 	<blood-sucking insect> 	→ 	summer 	1
2464 	tree 	→ 	club (a weapon) 	3
2465 	tree 	→ 	spear 	3
2466 	leek 	→ 	club (a weapon) 	2
2467 	<tree> 	→ 	spear 	11
2468 	dark (adj.) 	→ 	prison 	10
2469 	tower 	→ 	prison 	2
2470 	stone (piece of rock) 	→ 	prison 	2
2471 	to wait 	→ 	ambush 	2
2472 	to sit 	→ 	ambush 	5
2473 	forest 	→ 	ambush 	2
2474 	to see/to look at 	→ 	ambush 	2
2475 	to lie (posture) 	→ 	ambush 	3
2476 	to hide (tr.) 	→ 	ambush 	2
2477 	country, land 	→ 	peasant, farmer 	9
2478 	cheek 	→ 	shield 	1
2479 	board, plank 	→ 	shield 	4
2480 	firm, durable 	→ 	fortress 	7
2481 	strong 	→ 	fortress 	4
2482 	to shear 	→ 	to move ears (of animal) 	3
2483 	<musician> 	→ 	<orthopteran> 	1
2484 	unit of length 	→ 	geometrid 	9
2485 	foot/leg 	→ 	elongated object 	1
2486 	foot/leg 	→ 	spur of mountain 	1
2487 	foot/leg 	→ 	branch (of a river) 	4
2488 	<profession> 	→ 	longhorn beetle 	7
2489 	man with a big moustache 	→ 	longhorn beetle 	2
2490 	brothel 	→ 	disorder, mess 	3
2491 	psychiatric hospital 	→ 	disorder, mess 	3
2492 	<name of person> 	→ 	monarch 	6
2493 	intact 	→ 	normal 	2
2494 	to bloom, blossom 	→ 	to get mouldy (musty) 	3
2495 	duckweed 	→ 	to walk, wander 	1
2496 	to put shoes on 	→ 	to deceive 	2
2497 	firm, durable 	↔ 	strong 	9
2498 	bitter 	→ 	to feel pain, ache 	6
2499 	to drill 	→ 	to feel pain, ache 	2
2500 	to swear, vow 	→ 	to swear, curse 	12
2501 	to burn (tr.) 	→ 	frost 	5
2502 	milk 	→ 	milt (of fish) 	18
2503 	to clean 	→ 	to baptize 	3
2504 	guilt, guilty 	→ 	cause, reason 	5
2505 	to suffice, be enough 	— 	to end, finish 	1
2506 	light (n.) 	— 	sky 	1
2507 	<bird> 	↔ 	talkative person 	21
2508 	early 	— 	long ago 	1
2509 	end (space) 	→ 	end (temporal) 	6
2510 	apple 	→ 	knee-cap 	1
2511 	friend 	→ 	musk-deer (Moschus moschiferus) 	3
2512 	<clothes> 	→ 	caul, amniotic sac 	9
2513 	<hat> 	→ 	caul, amniotic sac 	9
2514 	princess 	→ 	bride 	3
2515 	white 	→ 	squirrel (Sciurus) 	3
2516 	empty 	→ 	hungry 	1
2517 	empty 	→ 	poor, needy 	1
2518 	empty 	→ 	unmarried, single, bachelor 	1
2519 	house 	→ 	grave, tomb 	7
2520 	house 	→ 	coffin 	2
2521 	<clothes> 	→ 	menstruation 	5
2522 	tar 	→ 	hell 	3
2523 	to give birth 	→ 	stork (Ciconia) 	2
2524 	to inhabit, live 	↔ 	to plough 	2
2525 	to dig 	→ 	to bury, inter 	8
2526 	white 	→ 	wheat 	22
2527 	feather 	→ 	leaf 	25
2528 	to get, obtain 	→ 	to defeat, win 	5
2529 	sea 	→ 	coast, shore 	3
2530 	to break (tr.) 	→ 	to defeat, win 	7
2531 	to break (tr.) 	→ 	to fold (cloth) 	3
2532 	to break (tr.) 	→ 	to divide into several parts 	4
2533 	to break (tr.) 	→ 	to subjugate 	2
2534 	to go around 	→ 	to defend 	2
2535 	to weaken, loosen 	→ 	to fold (cloth) 	1
2536 	two 	→ 	to fold (cloth) 	1
2537 	thunder 	→ 	lightning 	7
2538 	hot 	→ 	inflammation 	1
2539 	yellow 	↔ 	green 	34
2540 	common, shared 	→ 	vulgar 	2
2541 	big 	→ 	great 	26
2542 	little, small 	→ 	detailed, thorough 	2
2543 	wide, broad 	→ 	big 	2
2544 	high (location) 	→ 	of high rank 	9
2545 	low (location) 	→ 	low (social) 	8
2546 	low (location) 	→ 	miserable, unhappy 	2
2547 	fat (adj., of a person) 	→ 	rich 	5
2548 	healthy 	→ 	brave 	1
2549 	brave 	— 	clever, wise 	2
2550 	low (location) 	→ 	of low rank 	8
2551 	to do, act 	→ 	to copulate 	8
2552 	to blow 	— 	to emit smell 	1
2553 	chest (body part) 	→ 	front part 	5
2554 	snake 	→ 	lizard 	1
2555 	dog 	→ 	wolf 	5
2556 	hedgehog (Еrinaceus) 	→ 	rat 	2
2557 	frog 	→ 	toad 	3
2558 	worm 	— 	snail 	3
2559 	to dig 	— 	worm 	1
2560 	<bird> 	→ 	bastard 	1
2561 	horse 	→ 	girl 	1
2562 	snake 	— 	dragon 	7
2563 	worm 	→ 	caterpillar 	22
2564 	bird 	→ 	to tell a person's fortune 	2
2565 	bull 	→ 	chief, boss 	1
2566 	to reach 	— 	to come to end, cease 	1
2567 	rare 	↔ 	expensive 	3
2568 	knee 	→ 	genitalia 	4
2569 	correct, right 	→ 	rich 	1
2570 	to make a mistake, be wrong 	→ 	to dare 	1
2571 	merchant 	→ 	rich 	1
2572 	salt 	↔ 	good 	3
2573 	clever, wise 	→ 	old (vs. young) 	1
2574 	stranger, foreign 	→ 	guest 	4
2575 	to fly 	— 	to spring, jump 	7
2576 	cold 	→ 	calm 	2
2577 	urine 	→ 	descendant 	1
2578 	to feel pity 	→ 	to love 	2
2579 	line 	→ 	line (in poetry) 	3
2580 	to strew 	→ 	prose 	1
2581 	to stand 	→ 	to depend 	2
2582 	can, to be able 	→ 	to know 	4
2583 	look (n.) 	→ 	instant, moment 	2
2584 	middle, centre 	→ 	mediator 	2
2585 	to hope 	— 	to ask for, request 	1
2586 	textile, cloth 	→ 	headscarf 	2
2587 	difficult 	— 	amazing 	1
2588 	to chew 	→ 	to think, consider 	1
2589 	pure 	→ 	frank 	3
2590 	to untie, unbind 	→ 	to stop doing smth. 	1
2591 	to untie, unbind 	↔ 	to open (tr.) 	2
2592 	army 	↔ 	war 	4
2593 	excitement, agitation 	→ 	music 	2
2594 	to sleep 	→ 	motionless 	2
2595 	to tread 	→ 	to infringe 	1
2596 	to cross, traverse 	→ 	to infringe 	1
2597 	scanty, not numerous 	→ 	low (social) 	1
2598 	scanty, not numerous 	→ 	stupid 	1
2599 	scanty, not numerous 	→ 	tasteless 	1
2600 	to destroy, annihilate 	→ 	to forgive 	1
2601 	to go out (of light) 	→ 	to disappear 	2
2602 	to extinguish 	→ 	to destroy, annihilate 	9
2603 	to stand 	→ 	to stop (intr.) 	8
2604 	to set upright 	→ 	to stop doing smth. 	4
2605 	to stand 	→ 	to help, aid 	2
2606 	to put 	→ 	to establish, found 	3
2607 	to go out 	→ 	to manage to do smth 	1
2608 	to play (intr.) 	→ 	to speak 	4
2609 	to eat 	→ 	to think, consider 	1
2610 	bad 	→ 	brave 	2
2611 	mute, dumb 	→ 	animal 	2
2612 	to cut 	→ 	to copulate 	2
2613 	common, shared 	→ 	to inform, let know 	4
2614 	common, shared 	→ 	bad (ethically) 	3
2615 	brilliant, glaring 	→ 	transparent 	3
2616 	hot 	→ 	fresh 	2
2617 	to light, kindle (the fire) 	→ 	to shoot 	3
2618 	to want 	→ 	thing 	2
2619 	milk 	→ 	sap (of a plant) 	6
2620 	milk 	→ 	tree resin, gum 	1
2621 	poison 	→ 	anger 	5
2622 	stone (piece of rock) 	→ 	to calculate, count 	2
2623 	stone (piece of rock) 	→ 	hail 	4
2624 	stone (piece of rock) 	→ 	balance weight on scale 	6
2625 	to mix, stir 	→ 	to spoil (tr.) 	2
2626 	to mix, stir 	→ 	to make disordered 	4
2627 	door 	→ 	on the outside 	5
2628 	door 	→ 	foreign 	2
2629 	field 	→ 	on the outside 	5
2630 	field 	→ 	wild, untamed 	4
2631 	to thrust (into) 	→ 	to feel pain, ache 	14
2632 	to thrust (into) 	— 	to sting 	9
2633 	to promise 	→ 	to answer 	2
2634 	grain, seed 	→ 	rash, eruption 	3
2635 	grain, seed 	→ 	pip (disease of birds) 	1
2636 	grain, seed 	→ 	sty (on the eye) 	2
2637 	smoke 	→ 	house 	4
2638 	smoke 	→ 	arrogance 	3
2639 	smoke 	→ 	aberration of mind 	1
2640 	bottom 	→ 	<swimming bird> 	1
2641 	finger / toe 	→ 	unit of length 	11
2642 	finger / toe 	→ 	spoke of wheel 	3
2643 	<animal> 	→ 	coward 	17
2644 	leaf 	→ 	blade, edge (of an instrument) 	4
2645 	to unfold, unwind 	→ 	to follow, go after smb. 	1
2646 	to unfold, unwind 	→ 	to develop 	8
2647 	<vessel> 	↔ 	ship, vessel 	16
2648 	chaff 	→ 	useless thing 	5
2649 	copper 	→ 	metal 	2
2650 	to enjoy 	↔ 	to eat 	3
2651 	to feel hunger 	↔ 	to want 	5
2652 	heat (n.) 	→ 	to feel hunger 	1
2653 	to feel pain, ache 	— 	to feel hunger 	1
2654 	to die 	→ 	to feel hunger 	1
2655 	to grasp, seize 	→ 	quick 	4
2656 	to hang (intr.) 	→ 	sword 	1
2657 	to hew 	→ 	to lose consciousness 	2
2658 	bad weather 	→ 	mushroom 	4
2659 	forest 	→ 	to hunt 	7
2660 	below, down, bottom part 	→ 	West 	5
2661 	top, upper part 	→ 	East 	5
2662 	hand/arm 	↔ 	five 	39
2663 	hedgehog (Еrinaceus) 	— 	badger (Meles) 	3
2664 	pig (Sus scrofa) 	→ 	hedgehog (Еrinaceus) 	13
2665 	pig (Sus scrofa) 	↔ 	badger (Meles) 	5
2666 	star 	→ 	destiny 	9
2667 	blacksmith 	→ 	wizard, magician 	7
2668 	to know 	→ 	to practice witchcraft 	11
2669 	<animal> 	→ 	cloud 	10
2670 	<animal> 	→ 	white caps (on sea waves) 	12
2671 	plant (biol.) 	→ 	drug, medicine 	7
2672 	plant (biol.) 	→ 	gunpowder 	7
2673 	head 	→ 	money 	5
2674 	to strain 	→ 	to prepare 	1
2675 	to shout 	→ 	to call 	4
2676 	worm 	→ 	insect 	44
2677 	to call 	→ 	to ask / to ask for, request 	5
2678 	little, small 	→ 	quiet (vs. loud) 	2
2679 	<animal> 	→ 	fool 	30
2680 	to strike, hit 	→ 	to spoil (tr.) 	1
2681 	to sweat 	→ 	worry, anxiety 	1
2682 	sky 	→ 	dead (adj.) 	1
2683 	light, bright, clear 	↔ 	loud 	4
2684 	<weapon> 	→ 	army 	3
2685 	companion, partner 	→ 	husband / wife 	14
2686 	to listen 	→ 	to learn, study 	1
2687 	angry 	→ 	brave 	1
2688 	noise 	→ 	pig (Sus scrofa) 	1
2689 	ermine; stoat (Mustela erminea) 	— 	Siberian weasel (Mustela sibirica) 	1
2690 	black grouse 	— 	hazel grouse (Tetrastes bonasia) 	1
2691 	mouse 	↔ 	rat 	127
2692 	one's own 	→ 	german (brother or sister) 	1
2693 	mouse 	↔ 	little, small 	3
2694 	loud sound 	→ 	fame, reputation 	6
2695 	to open (tr.) 	→ 	to begin (tr.) 	5
2696 	shapeless 	→ 	ugly 	6
2697 	to blow 	→ 	to speak 	3
2698 	net (n.) 	↔ 	spider 	3
2699 	dark (adj.) 	→ 	blind 	9
2700 	rope, cord 	→ 	unit of length 	7
2701 	ram 	→ 	battering-ram 	10
2702 	shell (of mollusc) 	→ 	spoon 	4
2703 	to lick 	→ 	spoon 	3
2704 	chip, splinter 	→ 	spoon 	2
2705 	to mix, stir 	→ 	dough 	3
2706 	to go up 	→ 	dough 	1
2707 	table, desk 	→ 	meal (process) 	4
2708 	<furniture> 	→ 	<office> 	8
2709 	barley 	→ 	bread 	3
2710 	yellow 	— 	honey 	1
2711 	to blow (about wind) 	→ 	to winnow 	7
2712 	bald 	— 	hummel, hornless 	4
2713 	to swim 	— 	to strike, hit 	2
2714 	liver 	→ 	seat of emotions 	90
2715 	back (body part) 	→ 	surface 	5
2716 	monarch 	→ 	husband 	3
2717 	to flow 	→ 	to grow numb 	2
2718 	storehouse; depo 	→ 	shop 	5
2719 	to bury, inter 	→ 	to destroy, annihilate 	1
2720 	herder, shepherd 	→ 	fool 	2
2721 	shadow 	→ 	protection, patronage 	4
2722 	to hear / to listen 	→ 	to perceive smell 	4
2723 	to shine, glitter 	→ 	to boast 	7
2724 	to cut 	→ 	to dilute 	4
2725 	to lengthen 	→ 	to dilute 	1
2726 	to baptize 	→ 	to dilute 	6
2727 	<fruit> 	→ 	head 	15
2728 	to burn (tr.) 	→ 	to cure, treat (medically) 	1
2729 	green 	→ 	glaucoma 	2
2730 	to cut 	→ 	to mow grass 	8
2731 	board, plank 	→ 	table, desk 	11
2732 	to throw 	→ 	to speak 	3
2733 	to sprinkle 	→ 	to cut 	1
2734 	busy 	→ 	commerce, business 	3
2735 	bee 	→ 	industrious, diligent person 	2
2736 	firearm 	→ 	penis 	2
2737 	to strike, hit 	↔ 	to wash (clothes) 	3
2738 	stone (material) 	→ 	sky 	1
2739 	mountain 	→ 	cloud 	2
2740 	to ask, inquire 	→ 	to teach 	1
2741 	sky 	→ 	day 	13
2742 	bad 	→ 	difficult 	4
2743 	to milk 	→ 	to derive profit 	1
2744 	to burn (intr.) 	→ 	to suffer 	4
2745 	to give 	→ 	to throw 	1
2746 	to tie 	→ 	to begin (tr.) 	6
2747 	to see/to look at 	→ 	to investigate/examine 	7
2748 	stick (n.) 	→ 	punishment 	1
2749 	leaf 	— 	textile, cloth 	2
2750 	sharp 	→ 	hot 	2
2751 	quiet (vs. loud) 	→ 	calm 	23
2752 	quiet (vs. loud) 	→ 	secret; covert 	3
2753 	head 	→ 	capital city 	19
2754 	to peck (of a bird) 	→ 	to vaccinate, inoculate 	2
2755 	strong 	— 	brave 	3
2756 	cold 	→ 	stupid 	3
2757 	heavy (of weight) 	— 	big 	1
2758 	heavy (of weight) 	→ 	strong 	2
2759 	horseman, rider 	→ 	<noble rank, title> 	4
2760 	stove 	→ 	house 	1
2761 	to enter 	→ 	to flow into 	2
2762 	rooster 	→ 	brave person 	3
2763 	to tear, rend 	→ 	to move quickly 	4
2764 	red 	→ 	angry 	2
2765 	red 	→ 	rich 	1
2766 	to answer 	— 	to agree 	1
2767 	to pull up (a plant) 	→ 	to destroy, annihilate 	5
2768 	fat (adj., of a person) 	→ 	stupid 	2
2769 	pure 	→ 	good 	2
2770 	sizing tool 	→ 	rule, regulations 	8
2771 	to be born 	→ 	birthmark 	3
2772 	ship, vessel 	↔ 	shuttle (weaving instrument) 	7
2773 	to shoot 	→ 	shuttle (weaving instrument) 	2
2774 	to roast 	→ 	to scold 	2
2775 	bow-string 	— 	belt 	1
2776 	bird 	→ 	omen 	2
2777 	to shave 	→ 	to deceive 	3
2778 	hand/arm 	→ 	power, authority 	13
2779 	short / brief 	→ 	bad 	1
2780 	clever, wise 	— 	healthy 	1
2781 	brave 	— 	skilful, dexterous 	2
2782 	sea 	— 	middle, centre 	1
2783 	to move, to shift, to transfer 	→ 	to translate 	6
2784 	to trade 	→ 	to deceive 	4
2785 	leaf 	↔ 	ear 	6
2786 	hand/arm 	→ 	flank (military) 	3
2787 	to go down 	→ 	to die 	2
2788 	to be glad, happy 	— 	to copulate 	1
2789 	<animal> 	→ 	fat (adj., of a person) 	6
2790 	low (location) 	→ 	secret; covert 	1
2791 	chameleon 	→ 	person who changes opinions 	22
2792 	heap, pile 	→ 	many, much 	3
2793 	to fall down 	→ 	autumn 	3
2794 	palm (body part) 	→ 	destiny 	1
2795 	navel 	→ 	bottom 	1
2796 	light (n.) 	→ 	vision 	3
2797 	to shed leaves 	— 	crested lark 	1
2798 	<profession> 	↔ 	talkative person 	13
2799 	eel (Anguilla anguilla) 	— 	worm 	2
2800 	belly 	↔ 	womb, uterus 	11
2801 	top, upper part 	— 	beak 	3
2802 	to steal 	— 	greedy 	1
2803 	to make sit 	— 	to bury, inter 	1
2804 	gold 	↔ 	money 	15
2805 	skin (of a person) 	— 	leprosy 	1
2806 	sour 	→ 	sad 	8
2807 	blue 	→ 	sad 	2
2808 	wide, broad 	→ 	slow (adj.) 	1
2809 	awake 	→ 	clever, wise 	3
2810 	to do, act 	— 	to flow 	1
2811 	to melt, thaw 	→ 	to die 	4
2812 	bird 	— 	crow 	1
2813 	to execute, to put to death 	→ 	hooligan 	6
2814 	black cloud 	→ 	many, much 	4
2815 	forehead 	— 	skull 	2
2816 	bald 	→ 	skull 	1
2817 	skull 	— 	helmet 	1
2818 	abdomen / belly 	→ 	middle, centre 	4
2819 	ear, spike (of a grain plant) 	→ 	<weapon> 	3
2820 	head 	→ 	ear, spike (of a grain plant) 	7
2821 	sour 	→ 	proud 	1
2822 	European blueberry 	→ 	great bilberry (Vaccinium uliginosum) 	4
2823 	high (size), tall 	→ 	dangerous 	1
2824 	to enter 	→ 	to set (of Moon, Sun) 	5
2825 	to enter 	→ 	to copulate 	1
2826 	hard, solid 	→ 	good 	1
2827 	to thrust (into) 	→ 	to scold 	2
2828 	lotus 	→ 	beautiful 	3
2829 	bone marrow 	→ 	core (of plant) 	10
2830 	to give birth 	→ 	to deceive 	1
2831 	to lose (an object) 	→ 	to forget 	1
2832 	quick 	→ 	falcon 	1
2833 	quick 	→ 	good 	1
2834 	to whet 	→ 	to improve 	6
2835 	iron 	→ 	weapon 	5
2836 	iron 	→ 	hard, solid 	2
2837 	iron 	→ 	iron (for pressing clothes) 	7
2838 	iron 	↔ 	black 	2
2839 	ant 	— 	foam 	1
2840 	cheap 	→ 	plebeian 	1
2841 	weed 	— 	garbage 	1
2842 	camel 	→ 	humpbacked 	1
2843 	whale 	→ 	big 	1
2844 	hair 	→ 	grass, herb 	2
2845 	hair 	→ 	thread 	3
2846 	to fly 	↔ 	bird 	12
2847 	left 	→ 	bad 	1
2848 	big 	→ 	high (size), tall 	6
2849 	to seem 	→ 	to boast 	1
2850 	to become visible 	→ 	to seem 	3
2851 	big 	→ 	numerous 	4
2852 	hero 	→ 	character (literature) 	24
2853 	big 	→ 	main 	3
2854 	to make big, large 	→ 	to bring up (children) 	2
2855 	to grow up (intr.) 	→ 	young person 	3
2856 	to go up 	— 	to grow up (intr.) 	3
2857 	to raise, lift (tr.) 	→ 	to bring up (children) 	7
2858 	to tie 	→ 	strong 	2
2859 	thick 	→ 	loud 	1
2860 	wide, broad 	— 	far away 	1
2861 	thick 	→ 	stupid 	2
2862 	old man 	→ 	lion (Panthera leo) 	1
2863 	thin (of an object) 	→ 	young 	1
2864 	powder-like 	→ 	little, small 	1
2865 	powder-like 	→ 	child (son or daughter) 	3
2866 	left 	→ 	bad luck 	4
2867 	hot 	→ 	difficult 	5
2868 	to blow 	→ 	to strike, hit 	6
2869 	short (size) 	→ 	missing, failing 	2
2870 	long (size) 	→ 	far away 	9
2871 	thick 	→ 	thick (of a growth, hair) 	6
2872 	high (location) 	→ 	high (size), tall 	7
2873 	low (location) 	— 	low (size) 	19
2874 	low (location) 	→ 	deep 	2
2875 	torso 	→ 	fat (adj., of a person) 	2
2876 	old (vs. young) 	→ 	chief, boss 	4
2877 	to return (intr.) 	→ 	to become 	3
2878 	to turn, rotate (tr.) 	→ 	to change (tr.) 	3
2879 	narrow 	→ 	little, small 	1
2880 	thin (of an object) 	→ 	little, small 	6
2881 	thick 	↔ 	big 	8
2882 	little, small 	→ 	minute 	4
2883 	wet 	→ 	whore 	1
2884 	to smear, anoint 	→ 	to deceive 	3
2885 	thick 	→ 	rough, uneven 	1
2886 	thick 	→ 	difficult 	1
2887 	back (body part) 	→ 	hard, solid 	2
2888 	to feed 	→ 	to govern, control, rule 	3
2889 	to smooth 	→ 	to lick 	1
2890 	to smear, anoint 	→ 	to clean 	2
2891 	to taste (tr.) 	— 	to touch 	2
2892 	touched 	→ 	mad, insane 	4
2893 	to knead 	→ 	to strike, hit 	2
2894 	tasteless 	↔ 	lazy 	2
2895 	yoke 	→ 	unit of area 	4
2896 	shine (n.) 	→ 	flower 	1
2897 	light, bright, clear 	→ 	sober 	1
2898 	clean (adj.) 	→ 	sober 	2
2899 	period of time 	→ 	destiny 	2
2900 	to make a mistake, be wrong 	→ 	to sin 	12
2901 	to miss the target 	— 	to make a mistake, be wrong 	6
2902 	to return (intr.) 	→ 	to visit 	2
2903 	pig (Sus scrofa) 	→ 	meat 	8
2904 	clean (adj.) 	— 	healthy 	1
2905 	face 	→ 	side (n.) 	3
2906 	to bend, bow (intr.) 	→ 	to lose one's way 	1
2907 	to lose one's way 	→ 	to tell lies 	1
2908 	cat 	→ 	vagina 	4
2909 	hen 	→ 	vagina 	2
2910 	thin (of an object) 	→ 	sparse 	3
2911 	to blow 	→ 	to spread (intr.) 	1
2912 	weak 	→ 	lazy 	18
2913 	weak 	→ 	tired 	18
2914 	thin (of an object) 	→ 	giraffe 	1
2915 	thin (of an object) 	→ 	back (body part) 	1
2916 	worm 	↔ 	snake 	40
2917 	lion (Panthera leo) 	→ 	snake 	2
2918 	lion (Panthera leo) 	— 	animal 	2
2919 	weasel (Mustella nivalis) 	— 	mouse 	1
2920 	mouse 	→ 	jerboa 	2
2921 	donkey 	→ 	siege engine 	3
2922 	lion (Panthera leo) 	— 	cat 	1
2923 	bird 	→ 	happiness, luck 	2
2924 	to run 	→ 	to happen 	1
2925 	to run 	→ 	servant 	1
2926 	girl 	↔ 	female servant, maid 	9
2927 	dog 	→ 	shark 	3
2928 	dog 	→ 	beaver (Castor fiber) 	1
2929 	dog 	→ 	rabid 	2
2930 	to put 	→ 	to give birth 	2
2931 	to strike, hit 	↔ 	to copulate 	9
2932 	wolf 	→ 	hyena 	2
2933 	wolf 	→ 	jackal 	3
2934 	raven 	↔ 	crow 	26
2935 	sweet-smelling, fragrant 	→ 	good 	3
2936 	to stink 	— 	to rot, putrefy 	5
2937 	sweet-smelling, fragrant 	↔ 	tasty 	4
2938 	hand/arm 	→ 	to help, aid 	2
2939 	hand/arm 	→ 	chief, boss 	1
2940 	little, small 	→ 	low (social) 	3
2941 	big 	→ 	of high rank 	1
2942 	empty 	→ 	to stop doing smth. 	1
2943 	sick, ill 	→ 	false, wrong 	1
2944 	white 	→ 	pure 	4
2945 	pure 	→ 	honest 	3
2946 	to go out 	→ 	to fall (of rain, snow) 	1
2947 	to enter 	→ 	to fall (of rain, snow) 	5
2948 	sharp 	→ 	passionate, zealous 	2
2949 	mouth 	— 	cape 	2
2950 	mouth 	— 	hill 	1
2951 	lip 	→ 	hill 	1
2952 	to put 	→ 	to bake 	1
2953 	heat (n.) 	— 	sweat 	3
2954 	sweat 	→ 	blood 	2
2955 	sweat 	→ 	forehead 	1
2956 	sweat 	— 	tree resin, gum 	1
2957 	expensive 	— 	greedy 	1
2958 	strength 	— 	clean (adj.) 	1
2959 	strength 	— 	body 	2
2960 	to strike, hit 	→ 	to castrate 	2
2961 	bow-string 	— 	tendon 	4
2962 	pumpkin 	→ 	diamonds (in cards) 	1
2963 	to extinguish 	→ 	dark (adj.) 	1
2964 	dense, thick (of liquid) 	— 	dark (adj.) 	2
2965 	deep 	→ 	dark (adj.) 	3
2966 	knot 	→ 	rope, cord 	2
2967 	knot 	— 	log 	1
2968 	egg 	— 	clew 	1
2969 	quick 	— 	cunning, sly 	3
2970 	intact 	→ 	pure 	1
2971 	thorn 	→ 	dog-rose 	10
2972 	empty 	→ 	nausea 	1
2973 	mouse 	→ 	birthmark 	1
2974 	to speak 	— 	to tell a person's fortune 	1
2975 	to pour 	→ 	faeces 	2
2976 	to pour 	→ 	rain 	1
2977 	poppy (Papaver somniferum) 	→ 	top, upper part 	3
2978 	poppy (Papaver somniferum) 	→ 	red 	1
2979 	little, small 	→ 	girl 	3
2980 	little, small 	→ 	devil, satan 	1
2981 	little, small 	→ 	little finger 	32
2982 	raspberry 	→ 	blackberry 	2
2983 	raspberry 	→ 	wild strawberry 	1
2984 	little, small 	→ 	boy 	3
2985 	oil (food) 	→ 	slippery jack (Suillus luteus) 	1
2986 	to smear, anoint 	→ 	oil (food) 	1
2987 	mother 	→ 	continent 	3
2988 	owner 	→ 	woman 	1
2989 	owner (female) 	→ 	wife 	1
2990 	many, much 	→ 	long (size) 	1
2991 	many, much 	→ 	wide, broad 	3
2992 	slow (adj.) 	— 	dense, thick (of liquid) 	1
2993 	little, small 	→ 	stupid 	1
2994 	tree 	→ 	beam 	6
2995 	stick (n.) 	→ 	trunk (of a tree) 	1
2996 	work (n.) 	→ 	grain, seed 	1
2997 	throat 	→ 	mouth 	2
2998 	handle, gripe 	→ 	wing 	1
2999 	apple 	→ 	city block 	1
3000 	penis 	— 	vagina 	2
3001 	mouth 	— 	vagina 	1
3002 	nest (n.) 	— 	womb, uterus 	4
3003 	mouth 	— 	womb, uterus 	1
3004 	house 	— 	womb, uterus 	1
3005 	nose 	→ 	penis 	1
3006 	broom 	— 	penis 	1
3007 	mud 	→ 	penis 	1
3008 	vagina 	→ 	womb, uterus 	2
3009 	vagina 	→ 	girl 	1
3010 	snake 	→ 	penis 	3
3011 	nest (n.) 	— 	cradle 	1
3012 	to kiss 	— 	to suck 	36
3013 	to take 	→ 	to drink 	3
3014 	to chew 	→ 	to eat 	5
3015 	to taste (tr.) 	→ 	to know 	5
3016 	egg 	— 	berry 	1
3017 	to bite 	↔ 	to eat 	31
3018 	wing 	— 	armpit 	2
3019 	knee 	— 	foot/leg 	1
3020 	knee 	— 	elbow 	37
3021 	apple 	→ 	knee 	1
3022 	apple 	→ 	cheek 	2
3023 	knee 	— 	ankle 	4
3024 	mud 	→ 	sweat 	1
3025 	tail 	→ 	plait, braid 	1
3026 	tail 	→ 	navel 	1
3027 	ear 	→ 	handle, gripe 	4
3028 	ear 	— 	awl 	1
3029 	beard 	↔ 	moustache 	16
3030 	beard 	→ 	plait, braid 	1
3031 	country, land 	— 	world 	16
3032 	sky 	— 	world 	1
3033 	blind 	→ 	mute, dumb 	1
3034 	wolf 	→ 	hare (Lepus) 	1
3035 	feather 	→ 	moss 	1
3036 	snake 	→ 	otter (Lutra lutra) 	1
3037 	worm 	→ 	ant 	1
3038 	monkey 	↔ 	bear (Ursus) 	2
3039 	bear (Ursus) 	→ 	hedgehog (Еrinaceus) 	1
3040 	mouse 	— 	wolf 	1
3041 	country, land 	→ 	village 	6
3042 	to kill 	→ 	to extinguish 	19
3043 	dark (adj.) 	→ 	fearful, dreadful 	1
3044 	to burn (intr.) 	— 	black 	1
3045 	cloud 	↔ 	sky 	83
3046 	smooth (surface) 	— 	glad 	1
3047 	green 	→ 	fresh 	1
3048 	rotten 	→ 	lazy 	2
3049 	rotten 	→ 	unpleasant 	1
3050 	blunt 	— 	slow (adj.) 	1
3051 	stone (material) 	→ 	dog-rose 	2
3052 	to grow numb 	→ 	stupid 	1
3053 	deaf 	→ 	to grow numb 	1
3054 	blind 	— 	deaf 	4
3055 	slow (adj.) 	— 	lazy 	6
3056 	slow (adj.) 	→ 	late 	7
3057 	wet 	— 	soft (adj.) 	1
3058 	to be glad, happy 	— 	to forget 	1
3059 	to let, allow 	— 	to praise 	1
3060 	to mill, grind 	→ 	to purr 	1
3061 	to divide into several parts 	— 	to distinguish 	3
3062 	to blink 	— 	to tremble 	1
3063 	to pour 	→ 	to vomit 	2
3064 	to kiss 	→ 	to copulate 	2
3065 	to marry, take a wife 	→ 	to copulate 	6
3066 	difficult 	→ 	pregnant 	3
3067 	to bend (tr.) 	→ 	to present, gift 	2
3068 	red 	→ 	naked, bare 	1
3069 	poet 	— 	mad, insane 	1
3070 	<orthopteran> 	→ 	dragonfly 	6
3071 	<orthopteran> 	→ 	<bird> 	5
3072 	dog 	→ 	mole cricket (Gryllotalpa) 	4
3073 	bile, gall 	→ 	poison 	4
3074 	bowel 	→ 	string (of a musical instrument) 	4
3075 	light (n.) 	→ 	sun 	8
3076 	lip 	→ 	beak 	19
3077 	grain, seed 	→ 	freckle 	4
3078 	grass, herb 	→ 	spring (season) 	1
3079 	sadness, melancholy 	↔ 	love 	5
3080 	<animal> 	→ 	cunning person 	19
3081 	single-eyed 	→ 	squint-eyed 	4
3082 	fireplace 	↔ 	fire 	7
3083 	enemy 	→ 	war 	4
3084 	weather 	→ 	bad weather 	2
3085 	weather 	↔ 	good weather 	2
3086 	to calm down 	→ 	to pay 	2
3087 	to exchange money 	→ 	to change (tr.) 	1
3088 	to kill 	→ 	to sink (tr.) 	5
3089 	spring (season) 	→ 	summer 	5
3090 	swamp 	→ 	forest 	1
3091 	look (n.) 	→ 	face 	1
3092 	beak 	→ 	face 	3
3093 	miserable, unhappy 	→ 	leper 	2
3094 	saw 	→ 	mountain ridge 	4
3095 	hot 	→ 	necessary 	1
3096 	wet 	→ 	wood-louse 	4
3097 	other 	→ 	false, wrong 	3
3098 	to equalize 	— 	to compare 	4
3099 	to breathe 	— 	air 	8
3100 	leaf 	— 	flower 	2
3101 	calm 	— 	motionless 	1
3102 	to prove, to argue 	— 	to find 	1
3103 	bitter 	↔ 	sour 	9
3104 	to go out 	— 	to flow into 	1
3105 	throat 	→ 	barrel (of a gun) 	2
3106 	monster (supernatural) 	→ 	waterspout 	4
3107 	horse 	→ 	wave 	2
3108 	fire 	→ 	very, of high degree 	2
3109 	woman 	→ 	sheaf 	9
3110 	shirt 	→ 	pillowcase 	1
3111 	face 	→ 	sharp point 	1
3112 	fruit 	→ 	result, outcome 	15
3113 	to feed 	→ 	to gas (a car), refuel 	1
3114 	mouth 	→ 	blade, edge (of an instrument) 	2
3115 	half 	→ 	enemy 	1
3116 	blade, edge (of an instrument) 	→ 	wave 	1
3117 	ice 	→ 	glass (material) 	3
3118 	to defend 	→ 	to cure, treat (medically) 	1
3119 	<profession> 	→ 	grasshopper (Tettigonioidea) 	1
3120 	basket 	→ 	chest (body part) 	2
3121 	to clean 	→ 	to castrate 	2
3122 	to leave behind 	→ 	to defeat, win 	1
3123 	to tickle 	→ 	to make noise 	2
3124 	oat 	→ 	yellow-hammer 	5
3125 	rural 	→ 	vulgar 	9
3126 	urban 	→ 	cultivated (of person) 	2
3127 	<animal> 	→ 	greedy 	5
3128 	to undress (intr.) 	→ 	to challenge 	1
3129 	sad 	— 	lazy 	2
3130 	<animal> 	→ 	bully 	2
3131 	miracle 	→ 	mirror 	1
3132 	witch, sorceress 	→ 	butterfly 	5
3133 	to saw 	→ 	to bite 	1
3134 	to saw 	→ 	to vex, annoy 	1
3135 	wing 	↔ 	feather 	64
3136 	feather 	→ 	arrow 	1
3137 	wing 	→ 	oar 	1
3138 	thick 	— 	hard, solid 	1
3139 	to throw 	→ 	to expel, banish 	3
3140 	bitter 	→ 	yellow 	1
3141 	stone (piece of rock) 	→ 	colour 	1
3142 	price 	— 	award 	2
3143 	clasp, buckle 	→ 	fibula (anat.) 	3
3144 	to throw 	→ 	to kick 	2
3145 	shoal 	→ 	troop (of fishes) 	7
3146 	nestling, baby bird 	— 	bud (of a flower) 	1
3147 	bull 	→ 	frog 	4
3148 	bull 	→ 	water beetle 	2
3149 	wooden object 	→ 	pack of cards 	2
3150 	to fall down 	→ 	to suit (of clothes etc.) 	6
3151 	<vessel> 	→ 	columbine (Aquilegia) 	1
3152 	grey 	→ 	hare (Lepus) 	2
3153 	to spring, jump 	→ 	hare (Lepus) 	3
3154 	<foreigner> 	→ 	rooster 	3
3155 	air 	→ 	appearance, look 	2
3156 	active, agile 	→ 	clever, wise 	1
3157 	active, agile 	→ 	keen (of senses) 	1
3158 	white 	→ 	underwear 	10
3159 	to bend, bow (intr.) 	→ 	to obey 	3
3160 	rough, uneven 	→ 	sour 	1
3161 	dirty 	→ 	evil spirit 	5
3162 	to tickle 	→ 	water nymph 	3
3163 	<bird> 	→ 	freckle 	7
3164 	foot/leg 	→ 	hare (Lepus) 	1
3165 	puppy (of a dog) 	→ 	clove (of a garlic) 	1
3166 	to sing 	→ 	rooster 	7
3167 	to push 	→ 	to bribe 	1
3168 	earring 	→ 	spindle (Euonymus) 	2
3169 	to die 	↔ 	to go out (of fire) 	11
3170 	to die 	→ 	to abate (about wind) 	1
3171 	to die 	→ 	paralyzed 	9
3172 	wet 	— 	fresh 	2
3173 	peach 	→ 	plum 	14
3174 	broom 	→ 	comet 	8
3175 	right (vs. left) 	→ 	liver 	1
3176 	dog 	→ 	witch, sorceress 	2
3177 	to clench one's fist 	→ 	to roll up a trunk (of elephant) 	1
3178 	to hinder 	— 	to object 	1
3179 	earth oven 	→ 	prison 	1
3180 	head 	→ 	plot of land 	1
3181 	head 	→ 	nail-head 	13
3182 	to doubt 	→ 	to be surprised 	2
3183 	cat 	→ 	owl 	1
3184 	to peck (of a bird) 	— 	to bite (of fish) 	3
3185 	low (location) 	→ 	weak 	1
3186 	to dig 	→ 	to thrust (into) 	2
3187 	to dig 	→ 	to kick 	9
3188 	dry 	— 	dirty 	1
3189 	dry 	→ 	sad 	1
3190 	low (location) 	→ 	old (vs. new) 	1
3191 	cuckoo 	→ 	cuckold, deceived husband 	3
3192 	<hat> 	→ 	aconite 	9
3193 	<foot-wear> 	→ 	aconite 	4
3194 	monk 	→ 	macereed (Typha) 	2
3195 	<foot-wear> 	→ 	lady's slipper (Cypripedium) 	14
3196 	tongue (body part) 	→ 	rumour 	2
3197 	blue 	→ 	cornflower (Centaurea) 	10
3198 	rye 	→ 	cornflower (Centaurea) 	2
3199 	cereal 	→ 	cornflower (Centaurea) 	2
3200 	bald 	→ 	dandelion 	2
3201 	milk 	→ 	dandelion 	4
3202 	bitter 	→ 	dandelion 	3
3203 	priest (Christianity) 	→ 	dandelion 	3
3204 	loach (fish, Misgurnus) 	— 	eel (Anguilla anguilla) 	2
3205 	evil spirit 	→ 	mad, insane 	8
3206 	strength 	→ 	<weapon> 	1
3207 	to fall asleep 	→ 	to go out (of light) 	2
3208 	prison 	→ 	hell 	2
3209 	sun 	→ 	happiness, luck 	2
3210 	black 	→ 	priest (Christianity) 	5
3211 	foot/leg 	→ 	plantain (Plantago) 	2
3212 	to sing 	→ 	to read 	23
3213 	to sit 	— 	to wait 	2
3214 	when 	— 	long ago 	1
3215 	ahead 	→ 	elder 	1
3216 	to extinguish 	→ 	to close one's eyes 	1
3217 	smell (n.) 	→ 	fame, reputation 	4
3218 	snake 	→ 	hose 	8
3219 	brave 	→ 	good 	3
3220 	to answer 	— 	to help, aid 	1
3221 	lord, master 	→ 	god 	18
3222 	old man 	→ 	king (a playing card) 	2
3223 	drunk 	— 	insolent 	1
3224 	hot 	— 	bitter 	1
3225 	to dig 	→ 	to go, walk 	1
3226 	to strike, hit 	→ 	to thunder 	1
3227 	bell 	→ 	watch, clock 	2
3228 	near 	→ 	twin 	1
3229 	runner 	→ 	shuttle (weaving instrument) 	1
3230 	runner 	→ 	millstone 	2
3231 	spindle 	→ 	spindle (Euonymus) 	3
3232 	to strike, hit 	→ 	to spawn 	1
3233 	white 	→ 	sober 	1
3234 	lavish, generous 	→ 	influential person 	1
3235 	poor, needy 	— 	greedy 	2
3236 	whisper 	→ 	intrigue 	1
3237 	comb (of a bird) 	— 	fin 	1
3238 	weak 	→ 	coward 	2
3239 	to grow (plants) 	→ 	to rise (of Moon, Sun) 	4
3240 	to pass by 	→ 	to happen 	2
3241 	<foreigner> 	→ 	syphilis 	8
3242 	neck 	→ 	neck (of bottle etc.) 	12
3243 	to shut, close 	→ 	to extinguish 	1
3244 	to turn, rotate (tr.) 	→ 	to strike, hit 	1
3245 	to wait 	— 	to intend 	1
3246 	to go up 	→ 	to get on a vehicle 	5
3247 	to go down 	→ 	to get off a vehicle 	8
3248 	shout, scream 	→ 	unit of length 	1
3249 	sole, unique 	→ 	best 	1
3250 	warm 	→ 	calm 	2
3251 	Sunday 	↔ 	week 	31
3252 	shadow theatre 	→ 	cinema 	3
3253 	navel 	→ 	whirlpool 	1
3254 	<swimming bird> 	→ 	ship, vessel 	1
3255 	to measure 	→ 	to try on (clothes) 	5
3256 	winter 	↔ 	cold 	14
3257 	to adorn, decorate 	→ 	to marry off (a daughter) 	1
3258 	cowrie 	→ 	money 	10
3259 	red 	→ 	newborn baby 	30
3260 	red 	→ 	arterial (blood) 	2
3261 	black 	→ 	venous (blood) 	1
3262 	star 	→ 	celebrity 	25
3263 	tail 	→ 	plantain (Plantago) 	1
3264 	mango 	→ 	syphilis 	1
3265 	tamarind 	↔ 	sour 	5
3266 	fire 	→ 	electricity 	11
3267 	strength 	— 	courage 	1
3268 	to shout 	→ 	puffball 	1
3269 	round (adj.) 	→ 	dear, darling 	1
3270 	palace 	→ 	transport station 	2
3271 	hand/arm 	→ 	strait 	1
3272 	shrimp, prawn 	→ 	clove (of a garlic) 	1
3273 	<vessel> 	→ 	fool 	2
3274 	stammerer 	→ 	fool 	1
3275 	underground, subterranean 	→ 	illegal 	9
3276 	underground, subterranean 	→ 	secret 	1
3277 	zebra 	→ 	pedestrian crossing 	12
3278 	person of small stature 	→ 	Japanese 	1
3279 	to give 	→ 	to marry off (a daughter) 	6
3280 	algae 	→ 	many, much 	1
3281 	in the standing position 	→ 	not long 	1
3282 	<measure of weight> 	→ 	<money> 	13
3283 	pair of compasses 	→ 	navigational compass 	11
3284 	to teach 	→ 	to punish 	3
3285 	chief, boss 	→ 	Englishman 	1
3286 	ashes 	→ 	grey 	13
3287 	yoke 	→ 	yoke (figuratively) 	15
3288 	cat 	→ 	seal (animal) 	1
3289 	storm 	→ 	epidemic 	1
3290 	yolk 	→ 	middle, centre 	1
3291 	pomegranate 	— 	ruby (stone) 	1
3292 	<numeral> 	→ 	<military rank> 	10
3293 	drunk 	— 	to grow numb 	1
3294 	star 	→ 	fried eggs 	4
3295 	mouse 	→ 	child (son or daughter) 	1
3296 	cloud 	→ 	freckle 	1
3297 	flower 	→ 	girl 	1
3298 	chameleon 	→ 	to counterfeit 	1
3299 	belly 	→ 	angry 	2
3300 	heart 	↔ 	bowels, intestine 	6
3301 	cotton 	→ 	sheep 	4
3302 	opossum 	→ 	pig (Sus scrofa) 	4
3303 	lead, plumbum 	→ 	pencil 	16
3304 	bell 	→ 	bellflower (Campanula) 	12
3305 	road 	→ 	plantain (Plantago) 	6
3306 	to grasp, seize 	↔ 	to steal 	13
3307 	snake 	→ 	loach (fish, Misgurnus) 	2
3308 	spring (season) 	→ 	freckle 	2
3309 	to light, kindle (the fire) 	→ 	to be resurrected 	3
3310 	<to treat with a sharp instrument> 	→ 	to scold 	9
3311 	to strike, hit 	→ 	to sleep 	2
3312 	to fly 	→ 	cloud 	1
3313 	ten thousand 	→ 	many, much 	6
3314 	lower part 	→ 	udder 	2
3315 	to break (tr.) 	→ 	to slake (hunger, thirst) 	1
3316 	to break (tr.) 	→ 	to plough 	1
3317 	<dish> 	↔ 	disorder, mess 	9
3318 	hand/arm 	→ 	handwriting 	9
3319 	brilliant, glaring 	↔ 	loud 	2
3320 	to speak 	→ 	to promise 	12
3321 	quiet (vs. loud) 	— 	kind, good-hearted 	1
3322 	oil (food) 	— 	tree resin, gum 	1
3323 	cloudy 	→ 	sad 	7
3324 	to tell a person's fortune 	→ 	to loaf, do nothing 	1
3325 	to swallow 	→ 	quinsy 	1
3326 	beak 	— 	muzzle 	1
3327 	beak 	→ 	sharp point 	2
3328 	to see/to look at 	→ 	to acquire 	1
3329 	to rub 	→ 	to row (with oars) 	1
3330 	brave 	→ 	active, agile 	1
3331 	to bend (tr.) 	→ 	to deceive 	3
3332 	to get mouldy (musty) 	→ 	angry 	1
3333 	to boil (intr.) 	→ 	excitement, agitation 	16
3334 	cold 	→ 	vain, in vain 	1
3335 	hand/arm 	→ 	group of soldiers 	1
3336 	hand/arm 	→ 	strength 	3
3337 	greasy 	→ 	cream (of milk) 	2
3338 	sharp 	→ 	sad 	1
3339 	shuttle (weaving instrument) 	→ 	geometrid 	1
3340 	left 	→ 	West 	1
3341 	omen 	→ 	monster (abnormal creature) 	2
3342 	exchange 	→ 	talks, negotiation 	1
3343 	loud 	→ 	of high degree (about pain) 	1
3344 	leaf 	→ 	money 	1
3345 	to break (tr.) 	— 	to know how 	1
3346 	palate 	— 	gum, gingiva 	1
3347 	husband's father 	— 	evil spirit 	1
3348 	sun 	→ 	East 	1
3349 	morning 	→ 	day 	1
3350 	dark (adj.) 	→ 	West 	1
3351 	muscle 	→ 	strength 	1
3352 	to bend (tr.) 	→ 	to subjugate 	2
3353 	to adorn, decorate 	— 	to clean 	1
3354 	to adorn, decorate 	→ 	to boast 	1
3355 	head 	→ 	face 	2
3356 	to go down 	→ 	to stop doing smth. 	1
3357 	to go down 	→ 	to abase oneself 	3
3358 	to sing 	→ 	to practice witchcraft 	3
3359 	to strike, hit 	→ 	to bite 	3
3360 	horn 	→ 	branch (of a river) 	1
3361 	horn 	→ 	flank (military) 	1
3362 	to hear / to listen 	→ 	to know 	45
3363 	to go away 	→ 	to fall down 	1
3364 	shield 	→ 	left 	1
3365 	spear 	→ 	sword 	8
3366 	spear 	→ 	arrow 	2
3367 	brave 	→ 	insolent 	7
3368 	neck 	— 	ravine 	1
3369 	neck 	→ 	strait 	2
3370 	to gamble 	→ 	to risk 	2
3371 	to pull, to draw 	→ 	to govern, control, rule 	1
3372 	soft (adj.) 	→ 	quiet (vs. loud) 	2
3373 	soft (adj.) 	→ 	not strong (of liquid or smell) 	6
3374 	soft (adj.) 	→ 	lenient 	5
3375 	soft (adj.) 	→ 	coward 	1
3376 	big 	↔ 	strong 	3
3377 	big 	→ 	proud 	1
3378 	mother 	→ 	queen (bee) 	8
3379 	black cloud 	→ 	sad 	1
3380 	night 	→ 	bat 	4
3381 	hand/arm 	→ 	domestic (animal) 	2
3382 	sweat 	→ 	work (n.) 	4
3383 	new 	→ 	strange 	2
3384 	cold 	→ 	fearful, dreadful 	2
3385 	circle 	→ 	eye 	1
3386 	circle 	→ 	year 	1
3387 	to play (a musical instrument) 	→ 	to practice witchcraft 	1
3388 	to pull, to draw 	→ 	to torture 	2
3389 	to ask, inquire 	→ 	to torture 	2
3390 	weak 	→ 	not strong (of liquid or smell) 	4
3391 	light (vs. heavy) 	→ 	not strong (of liquid or smell) 	3
3392 	mouth 	↔ 	precipice, abyss 	4
3393 	precipice, abyss 	→ 	hell 	3
3394 	to eat 	→ 	hell 	1
3395 	hell 	→ 	mouth 	1
3396 	hell 	→ 	glutton 	3
3397 	flat object 	→ 	plate armour 	6
3398 	wind 	→ 	soul, spirit 	3
3399 	to run 	→ 	to result in 	1
3400 	island 	→ 	city block 	2
3401 	frog 	→ 	tortoise, turtle 	27
3402 	freedom 	→ 	territorial entity 	2
3403 	sharp 	→ 	strong (of liquid or smell) 	3
3404 	sharp 	→ 	valid 	1
3405 	clay 	→ 	human temper, character 	1
3406 	mind (n.) 	→ 	joke 	3
3407 	neck 	↔ 	throat 	20
3408 	throat 	→ 	neck (of bottle etc.) 	7
3409 	sharp 	→ 	strong (wind, frost) 	5
3410 	<coniferous tree> 	→ 	horsetail, equisetum 	3
3411 	to spit 	→ 	to bless 	2
3412 	road 	— 	quick 	2
3413 	to drop (of liquid) 	→ 	to accuse, blame 	2
3414 	naked, bare 	→ 	genitalia 	1
3415 	to shine, glitter 	→ 	to palpitate 	1
3416 	to defend 	→ 	to act according to 	7
3417 	to mill, grind 	→ 	to destroy, annihilate 	2
3418 	to break (tr.) 	→ 	to make a pause 	2
3419 	blood 	→ 	revenge 	1
3420 	donkey 	→ 	pelican (Pelecanus) 	1
3421 	second (num.) 	→ 	second (measure of time) 	3
3422 	human temper, character 	→ 	obstinate, persistent 	3
3423 	white 	→ 	good 	3
3424 	empty 	→ 	free of charge 	2
3425 	naked, bare 	→ 	empty 	12
3426 	unripe (fruit) 	— 	to spoil (intr.) 	1
3427 	pear 	→ 	electric lamp 	1
3428 	left 	→ 	difficult 	1
3429 	to tie 	→ 	to conceive, become pregnant 	2
3430 	rye 	— 	wheat 	3
3431 	to insert 	→ 	to meet 	2
3432 	to meet 	→ 	to happen 	4
3433 	to join together (tr.) 	→ 	poetry 	3
3434 	chin 	— 	jaw 	31
3435 	to mill, grind 	→ 	to learn, study 	1
3436 	to feed 	→ 	to bribe 	2
3437 	to fly 	→ 	to escape, flee 	1
3438 	straight 	→ 	strong 	2
3439 	tasty 	→ 	very, of high degree 	1
3440 	fire 	→ 	war 	1
3441 	gunpowder 	→ 	quick 	1
3442 	to cut 	→ 	poor, needy 	1
3443 	sheep 	→ 	kind, good-hearted 	1
3444 	empty 	— 	only 	3
3445 	by oneself, alone 	→ 	only 	12
3446 	to dilute 	→ 	to deceive 	1
3447 	to throw 	→ 	to copulate 	1
3448 	to follow, go after smb. 	→ 	to copulate 	1
3449 	stone (piece of rock) 	→ 	fool 	1
3450 	only 	↔ 	but, however 	4
3451 	naked, bare 	→ 	only 	4
3452 	naked, bare 	→ 	insolent 	1
3453 	to break (tr.) 	→ 	to dilute 	1
3454 	muddy, turbid, opaque 	→ 	to fornicate 	1
3455 	conversation 	→ 	custom, habit 	1
3456 	body 	→ 	to copulate 	1
3457 	corpse 	→ 	to stink 	1
3458 	clever, wise 	→ 	doctor, physician 	6
3459 	exact 	→ 	to resemble, be alike 	4
3460 	to measure 	→ 	moderate 	3
3461 	to end, finish 	→ 	totally, absolutely 	3
3462 	flea 	→ 	bad 	1
3463 	flower 	→ 	menstruation 	2
3464 	long (time) 	→ 	to endure 	1
3465 	corpse 	→ 	to grow numb 	1
3466 	tasty 	↔ 	good 	3
3467 	clever, wise 	→ 	grown-up, adult 	2
3468 	to clean 	→ 	to investigate 	1
3469 	heavy (of weight) 	→ 	earnest, serious 	1
3470 	to rein in 	→ 	to restrain, control one’s feelings 	2
3471 	to hear / to listen 	→ 	to find out 	2
3472 	tooth 	→ 	rock, crag, cliff 	1
3473 	to untie, unbind 	→ 	to let, allow 	1
3474 	to untie, unbind 	→ 	to forgive 	1
3475 	to untie, unbind 	→ 	to begin (tr.) 	2
3476 	to break (tr.) 	→ 	to refute 	1
3477 	dog 	— 	auger, gimlet 	1
3478 	to return (intr.) 	→ 	again 	1
3479 	shirt 	→ 	coffin 	1
3480 	body part 	→ 	cell (of a political party, organization) 	2
3481 	to castrate 	→ 	fat (adj., of a person) 	1
3482 	to boil (intr.) 	→ 	to grow (plants) 	1
3483 	face 	→ 	chief, boss 	3
3484 	to divide into several parts 	→ 	to analyse 	3
3485 	to hang (intr.) 	→ 	to be suspended 	3
3486 	to repeat 	→ 	to learn, study 	1
3487 	to raise, lift (tr.) 	→ 	to bring up (a subject) 	3
3488 	to raise, lift (tr.) 	→ 	to begin (tr.) 	4
3489 	to find 	→ 	to be, exist 	2
3490 	to walk, wander 	→ 	to trade 	2
3491 	to die 	→ 	to stop doing smth. 	1
3492 	can, to be able 	→ 	grown-up, adult 	1
3493 	sign, designation 	→ 	miracle 	3
3494 	<young animal> 	→ 	child (son or daughter) 	9
3495 	to hear 	→ 	witness 	2
3496 	to revive 	→ 	to repaire, mend 	2
3497 	to revive 	→ 	to cure, treat (medically) 	2
3498 	to rest 	→ 	to stop doing smth. 	4
3499 	to nomadize 	→ 	<ethnic group> 	1
3500 	seat, chair 	→ 	chief, boss 	2
3501 	word 	→ 	thing 	6
3502 	trunk (of a tree) 	→ 	tribe 	1
3503 	to see/to look at 	→ 	to visit 	7
3504 	to get accustomed 	→ 	to love 	2
3505 	to fall down 	→ 	cheap 	3
3506 	to say 	→ 	to name 	4
3507 	to attack 	— 	to dance 	1
3508 	to want 	↔ 	to need 	14
3509 	to harness 	→ 	two 	1
3510 	to harness 	→ 	trap, snare (n.) 	1
3511 	day 	→ 	to guard 	3
3512 	to wait 	— 	to remain, stay 	4
3513 	to disappear 	→ 	to decide 	1
3514 	mountain 	→ 	monastery 	1
3515 	uninhabited (place) 	→ 	monastery 	1
3516 	foot 	→ 	lower part 	3
3517 	red 	→ 	yolk 	2
3518 	thin (of an object) 	→ 	detailed, thorough 	1
3519 	man (male) 	→ 	main 	1
3520 	stranger, foreign 	→ 	other 	3
3521 	one, single 	→ 	only 	8
3522 	to move quickly 	→ 	to become ready (of food) 	1
3523 	to tear, rend 	→ 	to rise (of Moon, Sun) 	3
3524 	to make a hole 	→ 	to grow (plants) 	1
3525 	sharp 	↔ 	iron 	2
3526 	to let go 	— 	to leave, abandon 	1
3527 	head 	→ 	top, upper part 	17
3528 	to enter 	→ 	to shrink (of textile) 	1
3529 	knee 	→ 	strong 	1
3530 	to fall down 	→ 	to begin (tr.) 	1
3531 	land	→ 	floor 	5
3532 	land 	→ 	bottom 	4
3533 	body 	→ 	penis 	3
3534 	fresh 	→ 	cold 	4
3535 	fresh 	— 	wet 	1
3536 	belly 	→ 	glutton 	4
3537 	to hang (tr.) 	→ 	to put up as a prize 	1
3538 	to begin (tr.) 	→ 	to check, test 	1
3539 	tooth 	→ 	blade, edge (of an instrument) 	2
3540 	to draw water 	→ 	to imitate 	4
3541 	to know 	→ 	poetry 	1
3542 	poetry 	→ 	false, wrong 	1
3543 	hair 	→ 	respect (n.) 	1
3544 	eyelash 	→ 	ear, spike (of a grain plant) 	2
3545 	cheek 	→ 	chin 	8
3546 	country, land 	→ 	chapter (of a book) 	1
3547 	to spring, jump 	→ 	to skip over, overlook 	1
3548 	to rest 	→ 	unit of length 	1
3549 	to rest 	→ 	chapter (of a book) 	1
3550 	finger / toe 	→ 	elongated object 	1
3551 	to leave, abandon 	→ 	to forgive 	1
3552 	finger / toe 	→ 	branch, twig 	4
3553 	liver 	→ 	belly 	3
3554 	to go, walk 	→ 	to copulate 	3
3555 	to eat 	→ 	to get money 	1
3556 	heart 	→ 	mind (n.) 	8
3557 	heart 	→ 	inside 	6
3558 	heart 	→ 	belly 	1
3559 	womb, uterus 	→ 	relative (n.) 	1
3560 	to see/to look at 	→ 	opposite (space) 	3
3561 	animal 	→ 	elephant 	1
3562 	bowels, intestine 	→ 	seat of emotions 	3
3563 	bowels, intestine 	→ 	brave 	2
3564 	bowels, intestine 	→ 	close (of relations) 	1
3565 	nose 	→ 	sharp point 	1
3566 	lung 	→ 	red 	1
3567 	hot 	→ 	to flourish, prosper 	1
3568 	shoulder 	→ 	help, aid (n.) 	1
3569 	jaw 	→ 	blade, edge (of an instrument) 	3
3570 	back (body part) 	→ 	loins 	2
3571 	forehead 	→ 	happiness, luck 	1
3572 	navel 	→ 	lower part 	1
3573 	loins 	— 	thigh / hip 	2
3574 	lap 	→ 	vagina 	2
3575 	lap 	→ 	womb, uterus 	2
3576 	chest (body part) 	— 	loins 	1
3577 	egg 	→ 	larva 	1
3578 	thing 	→ 	genitalia 	1
3579 	heart 	— 	chest (body part) 	7
3580 	foot/leg 	— 	stem (of a plant) 	5
3581 	to bring 	→ 	to sacrifice (relig.) 	1
3582 	buttock 	→ 	lower part 	1
3583 	buttock 	→ 	genitalia 	1
3584 	to choose 	→ 	good 	3
3585 	to throw 	→ 	to draw, paint 	2
3586 	young animal 	— 	bastard 	1
3587 	new 	→ 	moon 	1
3588 	present, gift 	→ 	talent 	27
3589 	present, gift 	→ 	beautiful 	1
3590 	father 	→ 	chief, boss 	11
3591 	to precede 	→ 	first 	2
3592 	to begin (tr.) 	→ 	first 	1
3593 	to precede 	→ 	to go forward, advance 	3
3594 	Monday 	→ 	misfortune 	1
3595 	to follow, go after smb. 	→ 	near 	1
3596 	tongue (body part) 	→ 	cape 	9
3597 	to be ashamed 	→ 	to respect 	2
3598 	straight 	→ 	succesful 	1
3599 	to cross, traverse 	→ 	to surpass, exceed 	2
3600 	meat 	— 	body 	12
3601 	awake 	→ 	ambush 	1
3602 	day 	→ 	today 	14
3603 	to strengthen 	→ 	to shut, close 	2
3604 	stepson 	→ 	sucker (botany) 	1
3605 	descendant 	↔ 	sprout 	11
3606 	womb, uterus 	→ 	inside 	1
3607 	skull 	↔ 	pottery fragment 	4
3608 	to raise, lift (tr.) 	→ 	to abolish 	16
3609 	to move (intr.) 	→ 	to go mad 	2
3610 	to forget 	→ 	forget-me-not (flower) 	21
3611 	brave 	→ 	to temper (iron) 	1
3612 	hand 	— 	fascicle (cluster of flowers or berries) 	1
3613 	paw 	— 	branch, twig 	1
3614 	to give 	→ 	to sell 	4
3615 	to search, look for 	→ 	to recall, recollect 	1
3616 	to fight, scuffle 	— 	to awaken, wake up 	1
3617 	to fight, scuffle 	→ 	to copulate 	1
3618 	to throw 	→ 	to sow 	24
3619 	strong 	→ 	healthy 	9
3620 	to see/to look at 	— 	to begin (tr.) 	1
3621 	to choose 	— 	to read 	1
3622 	to begin (tr.) 	— 	to teach 	1
3623 	to ask for, request 	— 	to buy 	1
3624 	fool 	→ 	jester 	12
3625 	grandfather 	→ 	uncle 	4
3626 	to sit 	— 	to remain, stay 	31
3627 	to sit 	→ 	to be situated 	5
3628 	hand/arm 	→ 	handle, gripe 	10
3629 	foot/leg 	— 	handle, gripe 	1
3630 	sharp point 	— 	tooth 	1
3631 	to ripen 	— 	to ferment, yeast 	3
3632 	evil (adj.) 	→ 	spicy 	5
3633 	root (of a plant) 	→ 	courage 	1
3634 	root (of a plant) 	→ 	tendon 	10
3635 	to pass by 	— 	false, wrong 	1
3636 	middle, centre 	— 	loins 	1
3637 	chin 	— 	gills 	4
3638 	old (vs. young) 	→ 	rotten 	3
3639 	sun 	— 	lightning 	1
3640 	sun 	→ 	watch, clock 	12
3641 	to sing 	— 	to dance 	3
3642 	to work 	— 	to copulate 	1
3643 	feather 	→ 	bird 	6
3644 	inhabitant 	— 	beetle 	1
3645 	tongue (body part) 	— 	cheek 	1
3646 	to ask for, request 	↔ 	to tell 	2
3647 	<fish> 	→ 	lean, thin (of a person) 	2
3648 	to pinch 	→ 	to offend (tr.) 	1
3649 	to chew 	→ 	to oppress 	1
3650 	to chew 	→ 	to ignore, disregard 	1
3651 	flower 	→ 	cunning person 	1
3652 	to strike, hit 	→ 	to cut 	2
3653 	to go out 	→ 	to go up 	6
3654 	to go out 	→ 	to come into existence 	4
3655 	to turn, rotate (tr.) 	→ 	to govern, control, rule 	1
3656 	to pull, to draw 	→ 	to draw (an official paper) 	2
3657 	to pull, to draw 	→ 	to shrink (of textile) 	1
3658 	to pull, to draw 	→ 	to distort 	1
3659 	to pull, to draw 	→ 	to distill, retort 	1
3660 	to pull, to draw 	→ 	to smear, anoint 	1
3661 	to pull, to draw 	→ 	to build 	1
3662 	jerboa 	→ 	weak 	1
3663 	acrobat, equilibrist 	→ 	cunning person 	3
3664 	to put 	→ 	to sprout (of moustaches, beard) 	1
3665 	hunter 	→ 	wolf 	1
3666 	human, person 	→ 	body 	14
3667 	human, person 	→ 	<ethnic group> 	8
3668 	mountain 	— 	island 	7
3669 	North 	— 	West 	1
3670 	to be born 	— 	to grow (plants) 	4
3671 	guest 	→ 	menstruation 	4
3672 	warm 	→ 	drunk 	5
3673 	fearful, dreadful 	→ 	ugly 	4
3674 	ugly 	↔ 	bad (ethically) 	7
3675 	word 	→ 	speech 	31
3676 	transparent 	→ 	comprehensible 	12
3677 	good 	→ 	property, possessions 	5
3678 	to eat 	→ 	to corrode 	9
3679 	to break (tr.) 	→ 	to be reluctant 	1
3680 	to do, act 	↔ 	to speak 	12
3681 	to guess 	→ 	to understand 	1
3682 	to press 	→ 	greedy 	2
3683 	to stick, adhere 	→ 	greedy 	1
3684 	hot 	→ 	friendly, amicable 	3
3685 	to untie, unbind 	→ 	to explain 	9
3686 	head 	→ 	main 	6
3687 	head 	→ 	classifier for spherical objects 	9
3688 	fox (Vulpes vulpes) 	→ 	chanterelle 	16
3689 	leaf 	→ 	chanterelle 	1
3690 	sun 	— 	sail (n.) 	2
3691 	child (vs. adult) 	→ 	little finger 	6
3692 	chain (n.) 	— 	warp 	2
3693 	yellow 	→ 	chanterelle 	6
3694 	friend 	→ 	chanterelle 	1
3695 	hare (Lepus) 	→ 	chanterelle 	2
3696 	beautiful 	→ 	chanterelle 	1
3697 	ear 	→ 	chanterelle 	1
3698 	bell 	→ 	talkative person 	1
3699 	to glorify 	→ 	to disgrace, dishonor 	3
3700 	water 	→ 	river 	17
3701 	white 	→ 	Boletus edulis 	14
3702 	elder brother 	— 	uncle (mother's brother) 	2
3703 	uncle (mother's brother) 	— 	father-in-law 	11
3704 	father 	→ 	uncle (father's brother) 	34
3705 	monk 	→ 	puffin 	3
3706 	mother 	→ 	exclamation of surprise, pain or sorrow 	10
3707 	goat 	→ 	hare (Lepus) 	2
3708 	cat 	→ 	hare (Lepus) 	3
3709 	hare (Lepus) 	→ 	cunning person 	6
3710 	fly (n.) 	→ 	fly agaric (Amanita muscaria) 	23
3711 	to raise, lift (tr.) 	— 	to discover game animals or birds (hunting) 	4
3712 	to raise, lift (tr.) 	→ 	to instigate 	8
3713 	to raise, lift (tr.) 	→ 	to move, set in motion 	2
3714 	to raise, lift (tr.) 	→ 	to increase (tr.) 	5
3715 	to raise, lift (tr.) 	→ 	to improve 	2
3716 	to go up 	→ 	to become better 	4
3717 	to go up 	→ 	to go upstream 	8
3718 	to go up 	— 	to be excited 	1
3719 	to go up 	→ 	to revolt, rebel 	4
3720 	to raise, lift (tr.) 	→ 	to endure 	4
3721 	to raise, lift (tr.) 	→ 	to endure a load 	3
3722 	to raise, lift (tr.) 	— 	to promote 	2
3723 	to raise, lift (tr.) 	— 	to draft (for the army) 	1
3724 	to raise, lift (tr.) 	— 	to earth up (plants) 	1
3725 	to raise, lift (tr.) 	— 	to ladle out (soup) 	1
3726 	to raise, lift (tr.) 	→ 	to move away 	4
3727 	to raise, lift (tr.) 	→ 	to remove, eliminate 	2
3728 	fire 	→ 	hell 	6
3729 	naked, bare 	→ 	pure 	5
3730 	wave 	— 	wind 	1
3731 	crane (Grus) 	→ 	pickaxe 	2
3732 	fox (Vulpes vulpes) 	— 	cat 	1
3733 	to hear / to listen 	→ 	to think, consider 	28
3734 	to hear / to listen 	→ 	to remember 	9
3735 	to hear / to listen 	— 	to decide 	1
3736 	monster (supernatural) 	→ 	crocodile 	7
3737 	bell 	→ 	eye socket 	1
3738 	to hear / to listen 	— 	to recognize 	1
3739 	to perceive smell 	→ 	to detect 	7
3740 	to see/to look at 	→ 	to read 	2
3741 	plane tree 	→ 	banana 	2
3742 	to grasp, seize 	— 	to touch 	1
3743 	to bite 	— 	to taste (tr.) 	3
3744 	to grasp, seize 	— 	to find out 	2
3745 	eyelash 	→ 	eyelid 	30
3746 	to sit 	→ 	buttock 	4
3747 	rib 	— 	back (body part) 	2
3748 	eyeball 	— 	eyelid 	1
3749 	elder sister 	— 	aunt (father's sister) 	5
3750 	straight 	— 	immediately 	2
3751 	to creak 	— 	to scream 	1
3752 	to blow 	→ 	to whisper 	1
3753 	breathing 	— 	smell (n.) 	8
3754 	breathing 	— 	mind (n.) 	2
3755 	breathing 	↔ 	life 	8
3756 	breathing 	— 	sigh 	1
3757 	breathing 	— 	voice 	2
3758 	to breathe 	— 	to perceive smell 	1
3759 	silent 	— 	to rest 	1
3760 	to perceive smell 	— 	to taste (tr.) 	8
3761 	mouth 	— 	ahead 	1
3762 	head 	→ 	ahead 	3
3763 	shoulder 	→ 	to carry 	2
3764 	straight 	— 	heterosexual 	2
3765 	straight 	— 	undiluted 	1
3766 	to call 	— 	to mention 	1
3767 	to cry (of animals) 	→ 	to cry, weep 	10
3768 	dead (adj.) 	— 	phantom, ghost 	1
3769 	to resemble, be alike 	→ 	probably 	3
3770 	gloomy, depressed 	— 	boring 	1
3771 	to hear / to listen 	— 	fame, reputation 	4
3772 	to emit smell 	— 	to emit smoke 	1
3773 	to touch 	— 	to try, to attempt 	1
3774 	monk 	— 	osprey (Pandion haliaёtus) 	1
3775 	crown (n.) 	→ 	tonsure (of monk) 	2
3776 	<name of person> 	→ 	woman 	2
3777 	to touch 	→ 	to happen 	1
3778 	to touch 	→ 	to think, consider 	1
3779 	to touch 	— 	relative (n.) 	1
3780 	expensive 	→ 	Boletus edulis 	3
3781 	fat (adj., of a person) 	→ 	Boletus edulis 	4
3782 	Russian 	→ 	Boletus edulis 	2
3783 	beautiful 	— 	Boletus edulis 	1
3784 	bread 	→ 	Boletus edulis 	2
3785 	needle-leaved forest 	→ 	Boletus edulis 	2
3786 	pine-tree 	— 	Boletus edulis 	1
3787 	ear 	→ 	<mushroom, fungus> 	4
3788 	soldier 	→ 	Boletus edulis 	1
3789 	forest 	— 	Boletus edulis 	1
3790 	deaf 	→ 	Boletus edulis 	1
3791 	yellow 	→ 	Boletus edulis 	1
3792 	cow 	→ 	Boletus edulis 	2
3793 	bear (Ursus) 	→ 	Boletus edulis 	1
3794 	noble 	→ 	Boletus edulis 	3
3795 	ear, spike (of a grain plant) 	→ 	Boletus edulis 	1
3796 	nut, hazel 	→ 	Boletus edulis 	1
3797 	priest (Christianity) 	→ 	Boletus edulis 	1
3798 	fishing float (bobber) 	— 	Boletus edulis 	1
3799 	mushroom 	→ 	Boletus edulis 	3
3800 	barrel 	→ 	Boletus edulis 	1
3801 	hermit 	→ 	Boletus edulis 	1
3802 	root vegetable 	→ 	Boletus edulis 	2
3803 	bull 	→ 	Boletus edulis 	1
3804 	good 	— 	Boletus edulis 	1
3805 	monarch 	→ 	Boletus edulis 	2
3806 	grey-haired 	→ 	Boletus edulis 	1
3807 	old man 	→ 	Boletus edulis 	1
3808 	dry 	→ 	Boletus edulis 	1
3809 	elephant 	→ 	bishop (chess) 	18
3810 	horse 	→ 	knight (chess) 	77
3811 	spear 	→ 	bishop (chess) 	1
3812 	<military rank> 	→ 	bishop (chess) 	6
3813 	shooter 	→ 	bishop (chess) 	4
3814 	hunter 	→ 	bishop (chess) 	4
3815 	runner 	→ 	bishop (chess) 	11
3816 	bishop 	→ 	bishop (chess) 	9
3817 	horseman, rider 	→ 	knight (chess) 	19
3818 	camel 	→ 	bishop (chess) 	5
3819 	jester 	→ 	bishop (chess) 	6
3820 	jumper 	→ 	knight (chess) 	11
3821 	crane (Grus) 	→ 	well sweep 	5
3822 	beautiful 	→ 	fly agaric (Amanita muscaria) 	2
3823 	to dance 	→ 	fly agaric (Amanita muscaria) 	1
3824 	poison 	→ 	fly agaric (Amanita muscaria) 	5
3825 	to sing 	— 	fly agaric (Amanita muscaria) 	1
3826 	moose 	— 	fly agaric (Amanita muscaria) 	1
3827 	red 	→ 	fly agaric (Amanita muscaria) 	1
3828 	dead (adj.) 	→ 	fly agaric (Amanita muscaria) 	1
3829 	wolf 	— 	fly agaric (Amanita muscaria) 	1
3830 	mouse 	→ 	fly agaric (Amanita muscaria) 	1
3831 	mad, insane 	→ 	fly agaric (Amanita muscaria) 	2
3832 	doll 	→ 	fly agaric (Amanita muscaria) 	1
3833 	spotted 	→ 	fly agaric (Amanita muscaria) 	4
3834 	grey-haired 	→ 	to lose colour 	1
3835 	stump (of tree) 	→ 	honey mushroom (Armillaria mellea) 	8
3836 	fence 	→ 	honey mushroom (Armillaria mellea) 	1
3837 	nettle (Urtica) 	→ 	honey mushroom (Armillaria mellea) 	2
3838 	honey 	→ 	honey mushroom (Armillaria mellea) 	1
3839 	rooster 	→ 	honey mushroom (Armillaria mellea) 	1
3840 	autumn 	→ 	honey mushroom (Armillaria mellea) 	1
3841 	winter 	→ 	honey mushroom (Armillaria mellea) 	1
3842 	funnel 	→ 	chanterelle 	2
3843 	curly-headed 	→ 	chanterelle 	1
3844 	Jewish 	→ 	chanterelle 	2
3845 	literally 	→ 	figuratively 	3
3846 	genuine, true 	→ 	very, of high degree 	3
3847 	age 	— 	weather 	2
3848 	weather 	→ 	god 	1
3849 	mouth 	→ 	talkative person 	1
3850 	talkative person 	→ 	egg without embryo 	4
3851 	sty (on the eye) 	— 	hedgehog (Еrinaceus) 	1
3852 	tree 	→ 	fire 	47
3853 	free 	→ 	cheap 	1
3854 	to deprive 	→ 	to steal 	1
3855 	stranger, foreign 	→ 	to deprive 	3
3856 	to hunt down 	→ 	deer 	1
3857 	sudden 	→ 	vain, in vain 	1
3858 	to come, arrive 	→ 	to understand 	2
3859 	fire 	→ 	to shoot 	17
3860 	knowledge 	— 	destiny 	1
3861 	to be surprised 	— 	to wait 	1
3862 	power, authority 	— 	sentence (by a court) 	1
3863 	father 	→ 	exclamation of surprise, pain or sorrow 	12
3864 	mother 	→ 	original (of a document) 	6
3865 	mother 	→ 	mother tongue 	3
3866 	earth, soil 	→ 	mother 	2
3867 	mother 	→ 	term of address to a woman 	10
3868 	father 	→ 	term of address to a man 	40
3869 	father 	→ 	god 	8
3870 	uncle (mother's brother) 	→ 	term of address to a man 	10
3871 	father 	→ 	grandfather 	12
3872 	father 	→ 	<priest> 	20
3873 	branch, twig 	— 	relative (n.) 	1
3874 	god 	→ 	exclamation of surprise, pain or sorrow 	6
3875 	fast (n.) 	→ 	Friday 	2
3876 	world 	— 	weather 	2
3877 	big 	— 	pregnant 	1
3878 	salty 	→ 	sour 	3
3879 	dog 	→ 	flea 	1
3880 	to end, finish 	— 	to marry, take a wife 	1
3881 	spicy 	— 	to feel pain, ache 	1
3882 	to break (intr.) 	→ 	to be satisfied (sexually) 	1
3883 	earth, soil 	→ 	year 	30
3884 	earth, soil 	— 	weather 	1
3885 	country, land 	→ 	year 	3
3886 	lot 	→ 	plot of land 	4
3887 	mountain 	— 	year 	1
3888 	earth, soil 	— 	god 	2
3889 	to defeat, win 	↔ 	to gain, earn 	2
3890 	head 	→ 	roof 	7
3891 	head 	→ 	to think, consider 	1
3892 	snake 	— 	rainbow 	1
3893 	throat 	— 	flute 	1
3894 	mule 	→ 	sterile 	1
3895 	drunk 	— 	rabid 	2
3896 	to separate 	— 	to unravel 	1
3897 	to separate 	— 	to spread (intr.) 	1
3898 	earth, soil 	— 	clay 	6
3899 	to get angry 	— 	to growl 	1
3900 	bone 	— 	stem (of a plant) 	1
3901 	difficult 	— 	lazy 	1
3902 	tree 	— 	bush, shrub 	1
3903 	complex, complicated 	→ 	difficult 	3
3904 	pigeon (Columba) 	→ 	moth 	2
3905 	to pick, gather 	— 	to choose 	2
3906 	child (vs. adult) 	→ 	pupil (of an eye) 	7
3907 	to fly away 	→ 	to go overripe 	1
3908 	boring 	— 	sad 	5
3909 	hummingbird 	— 	lively person 	1
3910 	green 	→ 	pale 	4
3911 	green 	— 	raw 	3
3912 	harm, damage 	— 	witchcraft, sorcery 	2
3913 	to kill 	— 	to fish 	1
3914 	east 	— 	upriver 	1
3915 	heat (n.) 	— 	summer 	1
3916 	good 	— 	comprehensible 	2
3917 	West 	— 	downriver 	1
3918 	to deceive 	— 	to cost 	1
3919 	to spoil (intr.) 	— 	to become infected 	1
3920 	foot-wear 	— 	tyre (of a car) 	1
3921 	push button 	→ 	bulb (of plant) 	1
3922 	nose 	→ 	hood (of car) 	1
3923 	hot 	— 	respected, venerable 	1
3924 	market 	↔ 	square (in a town) 	8
3925 	stone (piece of rock) 	→ 	testicle 	9
3926 	word 	→ 	verb 	7
3927 	to seem 	→ 	to like 	2
3928 	lemon 	→ 	hand grenade 	1
3929 	glass (material) 	↔ 	mirror 	85
3930 	pure 	→ 	correct, right 	2
3931 	necessary 	→ 	toilet 	3
3932 	vehicle 	→ 	shaman hand drum 	1
3933 	<horned animal> 	→ 	beautiful girl 	7
3934 	clean (adj.) 	— 	pure 	15
3935 	grandmother 	→ 	witch, sorceress 	1
3936 	weather 	→ 	rheumatism 	1
3937 	to raise, lift (tr.) 	→ 	to discharge, dismiss 	1
3938 	to shoot 	→ 	to discharge, dismiss 	3
3939 	middle, centre 	→ 	waist 	9
3940 	necessary 	— 	middle, centre 	1
3941 	slow (adj.) 	— 	calm 	6
3942 	end (space) 	— 	udder 	1
3943 	standart-bearer 	— 	idler, loafer 	1
3944 	to meet 	→ 	to be appropriate (for) 	2
3945 	to strike, hit 	→ 	to swingle, scutch, felt 	7
3946 	standart-bearer 	→ 	<military rank> 	7
3947 	dog 	→ 	horse 	2
3948 	deer 	→ 	horse 	3
3949 	deer 	→ 	sheep 	2
3950 	stump (of tree) 	— 	cigarette butt 	2
3951 	to hiss 	— 	to blow (about wind) 	2
3952 	to charm, to delight 	→ 	sad 	1
3953 	animal 	→ 	fool 	5
3954 	word 	— 	language 	129
3955 	mute, dumb 	→ 	talkative person 	1
3956 	to care for, look after 	— 	to spare, to economize 	3
3957 	to care for, look after 	— 	to have mercy 	2
3958 	blood 	→ 	ethnic group 	1
3959 	eye 	— 	ray 	1
3960 	life 	— 	age 	4
3961 	to spell 	→ 	to practice witchcraft 	1
3962 	old woman 	↔ 	witch, sorceress 	3
3963 	owl 	↔ 	witch, sorceress 	4
3964 	Saturday 	→ 	week 	3
3965 	Friday 	→ 	week 	4
3966 	shape, form 	— 	colour 	2
3967 	frozen 	→ 	unripe (fruit) 	1
3968 	green 	→ 	unripe (fruit) 	15
3969 	transversal, crosscut 	— 	stranger, foreign 	1
3970 	root (of a plant) 	→ 	breed 	2
3971 	root (of a plant) 	→ 	family 	3
3972 	strong 	— 	loud 	1
3973 	blood vessel 	→ 	spring, fountain 	1
3974 	fisherman 	→ 	osprey (Pandion haliaёtus) 	18
3975 	to divide into several parts 	→ 	to share 	12
3976 	strong 	— 	obstinate, persistent 	2
3977 	envious, envy 	— 	passionate, zealous 	1
3978 	water 	→ 	sap (of a plant) 	9
3979 	to stand up 	→ 	to disappear 	2
3980 	water 	→ 	broth 	8
3981 	mirror 	→ 	spectacles 	25
3982 	head 	→ 	table of contents 	2
3983 	blunt 	→ 	toothless 	1
3984 	to shed leaves 	— 	to lose weight 	1
3985 	to kill 	→ 	to exhaust, make tired 	4
3986 	sun 	→ 	time 	24
3987 	black 	→ 	dirty 	4
3988 	friend 	— 	peer 	1
3989 	steam, vapour 	— 	smell (n.) 	13
3990 	blind 	→ 	ignorant 	5
3991 	body 	— 	waist 	3
3992 	heart 	→ 	stone (of a fruit) 	2
3993 	unripe (fruit) 	↔ 	young 	9
3994 	weak 	→ 	pregnant 	2
3995 	root (of a plant) 	— 	ancestor 	1
3996 	buttock 	— 	pelvis 	1
3997 	honest 	— 	healthy 	1
3998 	soul, spirit 	— 	dead (adj.) 	1
3999 	basket 	→ 	beehive 	10
4000 	blue 	— 	black 	3
4001 	blue 	→ 	novice 	1
4002 	blue 	— 	beautiful 	1
4003 	blue 	→ 	drunk 	3
4004 	red 	— 	order 	1
4005 	bee swarm 	→ 	crowd (of people) 	6
4006 	to wait 	→ 	to need 	1
4007 	father 	→ 	male animal 	14
4008 	black 	→ 	rye bread 	5
4009 	father 	→ 	father-in-law 	13
4010 	father 	→ 	ancestor 	38
4011 	father 	— 	mother 	2
4012 	glass (material) 	→ 	drinking vessel 	11
4013 	child (son or daughter) 	→ 	interest (finance) 	19
4014 	father 	→ 	founder 	24
4015 	man (male) 	↔ 	father 	8
4016 	to bark 	— 	to stink 	1
4017 	white 	→ 	bare (feet) 	1
4018 	stump (of tree) 	→ 	beehive 	1
4019 	stump (of tree) 	→ 	fool 	2
4020 	child (son or daughter) 	→ 	bee swarm 	2
4021 	crossroads 	— 	mouth (of a river) 	1
4022 	father 	→ 	defender 	7
4023 	father 	→ 	pillar 	1
4024 	father 	— 	perfect person 	1
4025 	father 	→ 	owner 	5
4026 	father 	— 	son 	2
4027 	elder brother 	→ 	father 	3
4028 	father 	— 	elder sister 	2
4029 	father 	→ 	husband 	4
4030 	father 	→ 	elder 	7
4031 	bone 	→ 	needle (sewing) 	3
4032 	father 	→ 	influential person 	1
4033 	father 	→ 	beginning 	2
4034 	father 	→ 	big 	6
4035 	father 	→ 	amazing 	1
4036 	father 	→ 	cause, reason 	1
4037 	father 	↔ 	teacher 	6
4038 	eternal 	— 	usual 	1
4039 	wine 	→ 	brown 	1
4040 	devil, satan 	→ 	snail 	3
4041 	to strike, hit 	— 	to pump 	1
4042 	owner 	→ 	spirit (supernatural being) 	9
4043 	table, desk 	↔ 	flat (adj) 	2
4044 	to pursue 	— 	to recover a debt 	1
4045 	inclined 	— 	lame 	1
4046 	half 	— 	inclined 	1
4047 	flank (body part) 	— 	doorpost 	1
4048 	to play (intr.) 	— 	spawning 	1
4049 	noise 	↔ 	quarrel 	8
4050 	atheist 	→ 	scoundrel 	3
4051 	necessary 	— 	inevitable 	1
4052 	autumn 	→ 	sad 	1
4053 	to make sit 	→ 	to plant 	11
4054 	to make sit 	→ 	to imprison 	6
4055 	friend 	— 	pair 	1
4056 	to heat up, warm up 	→ 	to hatch eggs 	2
4057 	warm 	→ 	effeminate 	1
4058 	to compare 	— 	to imitate 	1
4059 	to carry 	→ 	to endure a load 	1
4060 	grown-up, adult 	→ 	chief, boss 	1
4061 	brain (cerebrum) 	— 	nut, hazel 	1
4062 	disease 	→ 	laziness 	1
4063 	period of time 	— 	harvest 	3
4064 	year 	↔ 	harvest 	6
4065 	bad 	→ 	sick, ill 	11
4066 	bird 	— 	eagle 	6
4067 	to accompany (music) 	→ 	to express agreement 	1
4068 	albumen, white of an egg 	→ 	protein 	14
4069 	albumen, white of an egg 	— 	white of an eye, sclera 	15
4070 	to sit 	→ 	to hatch eggs 	2
4071 	strong 	→ 	influential person 	1
4072 	inside 	→ 	deep 	1
4073 	to lie (posture) 	→ 	to copulate 	11
4074 	next 	→ 	second (num.) 	2
4075 	other 	— 	second (num.) 	33
4076 	part 	→ 	beloved 	1
4077 	smell (n.) 	— 	news 	1
4078 	to go around 	→ 	to care for, look after 	1
4079 	lazy 	— 	to deceive 	2
4080 	lazy 	— 	stupid 	4
4081 	goat 	— 	sty (on the eye) 	1
4082 	<mushroom, fungus> 	→ 	sty (on the eye) 	1
4083 	stamen 	— 	eyelash 	1
4084 	butterfly 	— 	chaff 	1
4085 	eyebrow 	→ 	edge, border 	2
4086 	aunt 	→ 	term of address to a woman 	18
4087 	bush, shrub 	— 	spleen (anat.) 	3
4088 	to have no more 	→ 	to die 	1
4089 	end (space) 	→ 	territorial entity 	1
4090 	spindle 	→ 	neck 	1
4091 	foot 	↔ 	beginning 	3
4092 	before (temporal) 	→ 	ancestor 	6
4093 	sun 	— 	fire 	3
4094 	kidney 	— 	testicle 	2
4095 	stone (of a fruit) 	— 	kidney 	2
4096 	kidney 	— 	heart 	1
4097 	to move (tr.) 	→ 	animal 	2
4098 	dark (adj.) 	→ 	animal 	1
4099 	fur, hair (of animals) 	→ 	animal 	2
4100 	fish 	→ 	animal 	2
4101 	meat 	→ 	animal 	45
4102 	mirror 	→ 	mirror (website) 	9
4103 	page 	→ 	website 	4
4104 	soaked in sauce 	→ 	expert, experienced 	1
4105 	red 	→ 	heading, title 	1
4106 	hare (Lepus) 	→ 	pacemaker (running) 	12
4107 	health 	— 	prosperity 	3
4108 	green 	→ 	healthy 	2
4109 	wind 	→ 	autumn 	2
4110 	to make sausage 	→ 	to kill 	1
4111 	to sing 	→ 	shaman 	1
4112 	uncle (father's brother) 	— 	stepfather 	3
4113 	happy 	— 	rich 	2
4114 	sick, ill 	→ 	poor, needy 	2
4115 	middle, centre 	→ 	belt 	1
4116 	armpit 	— 	to tickle 	1
4117 	aunt (father's sister) 	— 	niece 	1
4118 	aunt (father's sister) 	— 	mother-in-law 	4
4119 	ochre 	→ 	yellow 	5
4120 	turmeric (Curcuma) 	→ 	yellow 	6
4121 	cuttlefish 	→ 	black 	1
4122 	citron 	→ 	yellow 	1
4123 	hammer 	— 	balance weight on scale 	1
4124 	blue 	— 	red 	3
4125 	to stand up 	→ 	to stop doing smth. 	8
4126 	to be in time 	→ 	to ripen 	2
4127 	to walk, to go 	— 	to lose (an object) 	1
4128 	happy 	→ 	healthy 	4
4129 	animal 	↔ 	insect 	8
4130 	mute, dumb 	→ 	mad, insane 	4
4131 	stupid 	↔ 	mad, insane 	39
4132 	to go through 	→ 	to be in use 	1
4133 	insect 	— 	fly (n.) 	3
4134 	insect 	— 	wasp 	3
4135 	insect 	— 	mosquito, gnat 	3
4136 	hedgehog (Еrinaceus) 	→ 	chestnut 	2
4137 	hail 	— 	stone (of a fruit) 	2
4138 	nest (n.) 	— 	family 	3
4139 	nest (n.) 	— 	quiver 	1
4140 	nest (n.) 	— 	beehive 	5
4141 	nest (n.) 	→ 	spider web 	6
4142 	nest (n.) 	— 	basket 	5
4143 	crown (n.) 	— 	best 	1
4144 	crown (n.) 	— 	peak of mountain 	1
4145 	hump (of a person or camel) 	→ 	peak of mountain 	1
4146 	red 	→ 	copper 	3
4147 	to load 	→ 	to insult 	1
4148 	heavy (of weight) 	→ 	disgusting 	1
4149 	heavy (of weight) 	→ 	bothering 	1
4150 	elder 	→ 	chief, boss 	8
4151 	book (n.) 	— 	letter (text) 	10
4152 	acorn 	— 	bean 	1
4153 	cellar 	→ 	clandestine activity 	1
4154 	worm 	— 	beetle 	1
4155 	apple 	→ 	globus cruciger 	5
4156 	to move away 	— 	to abolish 	3
4157 	to move away 	→ 	to kill 	2
4158 	to move away 	→ 	to destroy, annihilate 	6
4159 	to raise, lift (tr.) 	↔ 	to take off (tr.) 	5
4160 	to take off (tr.) 	→ 	to abolish 	4
4161 	to take off (tr.) 	→ 	to move away 	2
4162 	to relieve 	— 	to take off (tr.) 	1
4163 	glass (material) 	→ 	spectacles 	18
4164 	glass (material) 	→ 	eye 	1
4165 	to go out 	→ 	to come up (of plants) 	2
4166 	to miss somebogy, long for 	— 	to invite 	1
4167 	to sow 	→ 	to invest 	2
4168 	to sow 	→ 	to vaccinate, inoculate 	2
4169 	to know 	→ 	to feel 	3
4170 	dog 	— 	moon 	4
4171 	atheist 	→ 	<curse: bad person> 	2
4172 	comb 	— 	fin 	1
4173 	comb (of a bird) 	— 	fascicle (cluster of flowers or berries) 	3
4174 	comb 	— 	fascicle (cluster of flowers or berries) 	8
4175 	comb 	— 	harrow 	10
4176 	comb 	— 	mane 	1
4177 	to go down 	→ 	to fall (of rain, snow) 	8
4178 	to shoot 	↔ 	strike of lightning 	3
4179 	to strike, hit 	↔ 	strike of lightning 	9
4180 	button (on a dress) 	— 	knot 	4
4181 	many, much 	— 	difficult 	3
4182 	expensive 	— 	difficult 	9
4183 	to be born 	→ 	to become 	7
4184 	monarch 	→ 	mesentery 	1
4185 	branch, twig 	→ 	branch (of a river) 	12
4186 	little finger 	→ 	branch (of a river) 	1
4187 	white 	→ 	American 	1
4188 	to go upstream 	— 	to go against the wind 	2
4189 	to go upstream 	→ 	to struggle 	1
4190 	inland 	— 	upriver 	1
4191 	to go upstream 	→ 	to repatriate 	1
4192 	now 	→ 	soon 	4
4193 	now 	→ 	recently 	3
4194 	to hit the target 	— 	to meet 	5
4195 	straight 	→ 	exactly 	8
4196 	hajji 	→ 	father 	1
4197 	turnip 	→ 	tail 	1
4198 	copper 	— 	bronze 	9
4199 	rag, duster 	→ 	whore 	2
4200 	lord, master 	→ 	father 	2
4201 	to drop (tr.) 	→ 	to lose (an object) 	1
4202 	to encircle, surround 	→ 	to understand 	1
4203 	to follow, go after smb. 	→ 	to read 	1
4204 	lap 	→ 	protection, patronage 	2
4205 	rope, cord 	→ 	cause, reason 	1
4206 	to go up 	→ 	to stand up 	5
4207 	yard, courtyard 	→ 	palace 	3
4208 	yard, courtyard 	→ 	court (of a sovereign) 	5
4209 	court (of a sovereign) 	→ 	court of law 	2
4210 	to go out 	→ 	to follow logically, consequently 	4
4211 	duck 	→ 	to imitate 	1
4212 	tail 	→ 	to imitate 	1
4213 	road 	→ 	meaning, sense 	1
4214 	grass, herb 	→ 	to pasture, shepherd 	2
4215 	to watch, stare 	— 	to search, look for 	2
4216 	to follow, go after smb. 	→ 	to adhere, support 	8
4217 	to follow, go after smb. 	→ 	to help, aid 	1
4218 	to follow, go after smb. 	→ 	to agree 	1
4219 	to follow, go after smb. 	→ 	to care for, look after 	4
4220 	to follow, go after smb. 	→ 	should, ought to 	1
4221 	to turn over 	— 	to turn back to look at smth. 	2
4222 	funnel 	— 	whirlpool 	1
4223 	frog 	→ 	pondweed 	1
4224 	<woman> 	→ 	implement for ramming 	5
4225 	whirlpool 	— 	whirlwind 	4
4226 	beak 	→ 	well sweep 	1
4227 	vehicle 	→ 	many, much 	3
4228 	winter 	→ 	mist, fog 	5
4229 	winter 	→ 	hoar-frost 	1
4230 	to sow 	→ 	to cause 	8
4231 	marten 	→ 	money 	2
4232 	sated with food 	→ 	drunk 	2
4233 	glass (material) 	— 	bracelet 	1
4234 	brother 	→ 	term of address among equals 	4
4235 	son 	↔ 	child 	19
4236 	green 	— 	stupid 	1
4237 	younger brother 	— 	friend 	2
4238 	younger brother 	→ 	term of address to a man 	7
4239 	younger sister 	→ 	term of address to a woman 	2
4240 	to slide 	→ 	to move away 	3
4241 	together 	— 	to suite, match 	1
4242 	to move (tr.) 	→ 	to perform (a speech act) 	3
4243 	quick 	— 	to beware, be careful 	1
4244 	to intoxicate 	— 	to charm, to delight 	1
4245 	sweet potato (Ipomoea batatas) 	→ 	potato 	9
4246 	truffle 	→ 	potato 	3
4247 	pear 	→ 	potato 	4
4248 	earth, soil 	→ 	potato 	2
4249 	yam 	→ 	potato 	3
4250 	cone (fruit) 	→ 	potato 	1
4251 	egg 	→ 	potato 	4
4252 	onion 	→ 	potato 	2
4253 	nut, hazel 	→ 	potato 	1
4254 	chestnut 	→ 	potato 	1
4255 	Amorphophallus paeoniifolius 	→ 	potato 	1
4256 	sphere; ball 	→ 	potato 	1
4257 	yam 	→ 	sweet potato (Ipomoea batatas) 	3
4258 	taro 	→ 	potato 	1
4259 	ocean 	→ 	foreign 	1
4260 	tuber 	→ 	potato 	6
4261 	egg 	→ 	puffball 	4
4262 	swelling (on skin) 	→ 	potato 	1
4263 	nameless 	→ 	ring finger 	73
4264 	belly 	→ 	river-bed 	1
4265 	belly 	→ 	beehive 	1
4266 	foundation, basement 	→ 	main 	1
4267 	black 	→ 	beautiful 	2
4268 	bottom of a dress 	→ 	mountain foot 	2
4269 	colour 	→ 	caste 	9
4270 	to see/to look at 	— 	to imitate 	2
4271 	black 	— 	season (of the year) 	1
4272 	needle (sewing) 	→ 	sting (n.) 	6
4273 	reed 	→ 	penis 	1
4274 	to see/to look at 	→ 	to spy 	3
4275 	to grasp, seize 	— 	friend 	1
4276 	younger sister 	— 	friend 	1
4277 	snow 	— 	frost 	2
4278 	to sweep 	→ 	blizzard 	3
4279 	deer 	— 	lion (Panthera leo) 	1
4280 	eye 	→ 	spy 	3
4281 	house 	→ 	wife 	17
4282 	life 	→ 	death 	2
4283 	frost 	— 	hell 	1
4284 	poison 	— 	scorpion 	1
4285 	jackal 	— 	warrior 	1
4286 	snow 	— 	ice 	6
4287 	sin 	— 	false, wrong 	1
4288 	to throw 	— 	quick 	1
4289 	to crawl 	— 	to climb 	6
4290 	to stand 	→ 	to consist of 	4
4291 	space 	— 	square (in a town) 	1
4292 	leaf 	→ 	letter (text) 	3
4293 	flank (body part) 	— 	side (n.) 	2
4294 	fresh 	→ 	active, agile 	1
4295 	story 	↔ 	history 	14
4296 	brown 	→ 	suntanned 	1
4297 	heel (of a foot) 	— 	corner 	1
4298 	finger / toe 	→ 	sleeve 	1
4299 	to cook 	↔ 	to boil (food) (tr.) 	2
4300 	to carry 	— 	to lead 	1
4301 	to search, look for 	— 	to gain, earn 	2
4302 	eye 	— 	grain, seed 	3
4303 	to see/to look at 	→ 	according to 	3
4304 	queen 	↔ 	wife 	3
4305 	second (num.) 	→ 	wife 	1
4306 	<God> 	→ 	husband 	1
4307 	tail 	→ 	rear end 	3
4308 	to taste (tr.) 	→ 	to try on (clothes) 	1
4309 	to check, test 	→ 	to try on (clothes) 	3
4310 	to try, to attempt 	→ 	to try on (clothes) 	6
4311 	cauldron 	→ 	hell 	1
4312 	<vessel> 	→ 	volcanic crater 	3
4313 	milk 	→ 	caraway (meridian fennel) 	1
4314 	low (location) 	→ 	secret 	1
4315 	fireplace 	→ 	home 	4
4316 	fortress 	→ 	prison 	5
4317 	pit 	→ 	prison 	2
4318 	stable 	→ 	prison 	6
4319 	child (son or daughter) 	— 	offspring 	2
4320 	road 	— 	bridge 	1
4321 	direction 	— 	meaning, sense 	1
4322 	curved 	→ 	dishonest 	3
4323 	to take 	→ 	to copulate 	1
4324 	to copulate 	→ 	to deceive 	2
4325 	to walk, wander 	→ 	to be delirious 	1
4326 	shield 	→ 	plaice (fish) 	2
4327 	house 	→ 	verse 	5
4328 	to fly 	→ 	to break down 	1
4329 	underwear 	— 	bed-clothes 	8
4330 	white 	→ 	bed-clothes 	8
4331 	mouse 	→ 	computer mouse 	31
4332 	apple 	→ 	Jerusalem artichoke 	2
4333 	to forgive 	→ 	to bid farewell, say goodbye 	10
4334 	to surf 	— 	to browse (Internet) 	2
4335 	erysipelas 	→ 	glasswort 	1
4336 	offspring 	— 	crowd (of people) 	1
4337 	to approach suddenly 	→ 	to attack 	2
4338 	glass (material) 	→ 	glasswort 	2
4339 	salt 	→ 	glasswort 	4
4340 	rose 	→ 	erysipelas 	5
4341 	reflection (in the mirror, water) 	— 	mirror (website) 	1
4342 	water 	→ 	kind (n.) 	1
4343 	water 	→ 	Mercury 	6
4344 	Mercury 	→ 	mercury 	15
4345 	fire 	→ 	Mars 	9
4346 	metal 	→ 	Venus 	8
4347 	metal 	→ 	gold 	4
4348 	wood, timber 	→ 	Jupiter 	5
4349 	tiger 	↔ 	cruel 	3
4350 	foot 	→ 	sediment 	1
4351 	stomach 	→ 	appetite, hunger 	3
4352 	to feel pity 	→ 	to spare, to economize 	3
4353 	to burn (intr.) 	→ 	bitter 	1
4354 	to itch 	→ 	to want 	4
4355 	to burn (intr.) 	→ 	hot 	2
4356 	sun 	— 	weather 	4
4357 	resurrection 	→ 	Sunday 	1
4358 	stopper, plug 	→ 	traffic jam 	12
4359 	to say 	→ 	to like 	1
4360 	cholera 	→ 	swearword 	6
4361 	voice 	— 	word 	16
4362 	voice 	→ 	sound 	26
4363 	voice 	— 	language 	16
4364 	snow 	— 	hoar-frost 	6
4365 	to fall down 	→ 	to fall to one's lot 	1
4366 	to raise, lift (tr.) 	→ 	to steal 	4
4367 	to untie, unbind 	→ 	to divorce 	4
4368 	cat 	→ 	anchor 	9
4369 	healthy 	→ 	positive evaluation 	1
4370 	to want 	→ 	sperm 	2
4371 	to sink into 	→ 	anchor 	1
4372 	iron 	→ 	anchor 	5
4373 	letter (character) 	— 	letter (text) 	16
4374 	to fall down 	— 	suitable 	2
4375 	to ask for, request 	→ 	to pray 	46
4376 	to give birth 	— 	to spawn 	1
4377 	to read 	→ 	to scold 	2
4378 	to go out 	→ 	to be born 	9
4379 	to ask, inquire 	— 	ear 	1
4380 	body 	→ 	self 	8
4381 	fruit 	— 	egg 	17
4382 	mountain 	— 	bank, shore 	1
4383 	flute 	→ 	shinbone 	4
4384 	bellows 	— 	pot 	1
4385 	uncle 	→ 	term of address to a man 	11
4386 	uncle (father's brother) 	→ 	term of address to a man 	5
4387 	to dig 	— 	to cut 	6
4388 	to dig 	→ 	to tear, rend 	1
4389 	to tear, rend 	— 	to investigate/examine 	1
4390 	spawn, roe 	→ 	calf of a leg 	18
4391 	crane (Grus) 	→ 	lifting machine 	12
4392 	younger sibling 	→ 	term of address to a wife 	5
4393 	younger brother 	→ 	husband 	1
4394 	craw (of bird) 	→ 	stomach 	6
4395 	squirrel (Sciurus) 	→ 	weasel (Mustella nivalis) 	1
4396 	squirrel (Sciurus) 	→ 	ladybird 	1
4397 	metal spike 	→ 	pike (fish) 	4
4398 	wolf 	→ 	pike (fish) 	3
4399 	crane (Grus) 	→ 	pike (fish) 	2
4400 	knife 	→ 	pike (fish) 	4
4401 	mouth 	→ 	by heart 	4
4402 	branch, twig 	→ 	spur of mountain 	1
4403 	big 	→ 	grown-up, adult 	16
4404 	wild, untamed 	→ 	uninhabited (place) 	4
4405 	wild, untamed 	→ 	shy 	20
4406 	big 	→ 	difficult 	1
4407 	thick 	— 	raw 	1
4408 	to go, walk 	→ 	to do, act 	1
4409 	lotus 	→ 	beloved 	1
4410 	lotus 	→ 	shower head 	3
4411 	jewel, precious stone 	→ 	lotus 	2
4412 	to know 	→ 	to remember 	12
4413 	wild, untamed 	→ 	predator 	1
4414 	to threaten 	— 	thunderstorm 	3
4415 	scales, weighing machine 	→ 	testicle 	1
4416 	grain, seed 	→ 	testicle 	4
4417 	fruit 	→ 	testicle 	2
4418 	flower 	→ 	beautiful 	2
4419 	flower 	→ 	best part of something 	6
4420 	duck 	→ 	newspaper hoax 	11
4421 	almond 	→ 	tonsil 	25
4422 	plum 	→ 	tonsil 	2
4423 	fruit 	→ 	tonsil 	1
4424 	quick 	→ 	soon 	11
4425 	hare (Lepus) 	→ 	moon 	2
4426 	toad 	→ 	moon 	1
4427 	moon 	→ 	coin 	1
4428 	moon 	→ 	white 	1
4429 	moon 	→ 	sky 	5
4430 	umbrella 	→ 	circular halo 	1
4431 	umbrella 	→ 	parachute 	10
4432 	gold 	— 	moon 	1
4433 	moon 	→ 	sunflower 	1
4434 	fan palm (Pritchardia pacifica) 	→ 	umbrella 	1
4435 	bone 	→ 	lean, thin (of a person) 	11
4436 	bone 	→ 	skeleton 	2
4437 	sun 	→ 	sunflower 	14
4438 	top of the head 	— 	hill 	3
4439 	front part 	→ 	future 	6
4440 	green 	— 	wet 	2
4441 	arrow 	→ 	shuttle (weaving instrument) 	1
4442 	to throw 	→ 	shuttle (weaving instrument) 	3
4443 	spool 	→ 	shuttle (weaving instrument) 	2
4444 	swallow (bird) 	→ 	shuttle (weaving instrument) 	1
4445 	beak 	→ 	shuttle (weaving instrument) 	1
4446 	needle (sewing) 	→ 	shuttle (weaving instrument) 	2
4447 	air 	— 	gas 	4
4448 	air 	— 	smell (n.) 	2
4449 	monarch 	→ 	king (a playing card) 	9
4450 	peasant, farmer 	→ 	pawn (in chess) 	12
4451 	boy 	→ 	pawn (in chess) 	4
4452 	green 	→ 	inexperienced 	7
4453 	grain, seed 	→ 	novice 	1
4454 	raw 	→ 	inexperienced 	3
4455 	immature fish 	→ 	inexperienced 	1
4456 	unbroken horse 	— 	inexperienced 	1
4457 	inscription 	→ 	side of a coin 	5
4458 	star 	→ 	letter (character) 	1
4459 	letter (character) 	— 	body part 	1
4460 	to pass by 	— 	to surpass 	3
4461 	to pass by 	→ 	to make a mistake, be wrong 	1
4462 	fat (adj., of a person) 	→ 	pregnant 	2
4463 	to encircle, surround 	→ 	pregnant 	1
4464 	blue 	→ 	gay 	1
4465 	cheerful 	→ 	gay 	1
4466 	pink 	→ 	happy 	4
4467 	navy 	→ 	dark blue 	8
4468 	rowan 	→ 	elder (Sambucus) 	1
4469 	<foreigner> 	→ 	elder (Sambucus) 	1
4470 	faeces 	→ 	elder (Sambucus) 	1
4471 	spruce (Picea) 	→ 	larch 	1
4472 	wolf 	→ 	buckthorn (Frangula) 	1
4473 	dog 	→ 	sty (on the eye) 	1
4474 	raspberry 	→ 	split (gymnastics) 	1
4475 	cloudberry (Rubus chamaemorus) 	→ 	split (gymnastics) 	1
4476 	honey 	→ 	split (gymnastics) 	1
4477 	hair 	→ 	gooseberry 	1
4478 	spear 	→ 	sting (n.) 	5
4479 	to die 	→ 	to spoil (intr.) 	1
4480 	<animal> 	— 	property, possessions 	1
4481 	tail 	→ 	stem (of a plant) 	2
4482 	sunflower 	→ 	influential person 	1
4483 	bull 	→ 	positive evaluation 	1
4484 	garbage 	→ 	unimportant, slight 	4
4485 	to spring, jump 	→ 	to attack 	5
4486 	blind alley 	→ 	deadlock 	2
4487 	crane (Grus) 	→ 	scatterbrain 	1
4488 	tuberculosis 	— 	hepatitis 	1
4489 	spear 	→ 	bullet 	1
4490 	bug (Heteroptera) 	→ 	pepperwort 	2
4491 	bug (Heteroptera) 	→ 	sweet clover 	1
4492 	spear 	→ 	bug (Heteroptera) 	1
4493 	root (of a plant) 	→ 	root of tooth 	11
4494 	burdock 	→ 	importunate 	1
4495 	smell (n.) 	→ 	wild chamomile 	2
4496 	smell (n.) 	→ 	mint (Mentha) 	1
4497 	cat 	→ 	cat's-foot (Antennaria) 	1
4498 	cat + grass 	→ 	valerian 	4
4499 	tea 	→ 	oregano 	1
4500 	night-blindness 	→ 	scarlet pimpernel (Anagallis arvensis) 	1
4501 	night-blindness 	→ 	common buttercup (Ranunculus acris) 	1
4502 	finger / toe 	→ 	belemnite 	9
4503 	arrow 	→ 	belemnite 	15
4504 	candle 	→ 	belemnite 	3
4505 	pig (Sus scrofa) 	→ 	animal 	3
4506 	together 	— 	immediately 	1
4507 	still (adv.) 	— 	again 	4
4508 	suddenly 	— 	immediately 	2
4509 	to give 	→ 	dowry 	3
4510 	blood 	→ 	sap (of a plant) 	3
4511 	yolk 	— 	spawn, roe 	1
4512 	candle 	→ 	spark plug 	4
4513 	frankincense 	→ 	oregano 	1
4514 	head 	→ 	thumb 	3
4515 	elephant 	→ 	thumb 	1
4516 	monarch 	→ 	thumb 	1
4517 	to poke, thrust 	→ 	index finger 	1
4518 	to point 	→ 	index finger 	8
4519 	shahada 	→ 	index finger 	1
4520 	faith (Islam) 	→ 	index finger 	4
4521 	second (num.) 	→ 	index finger 	1
4522 	sharp 	→ 	index finger 	1
4523 	unit of length 	→ 	index finger 	1
4524 	almond 	→ 	index finger 	1
4525 	flank (body part) 	→ 	index finger 	1
4526 	thief 	→ 	index finger 	1
4527 	to insert 	→ 	vagina 	1
4528 	bud (of a flower) 	↔ 	nipple (part of the breast) 	4
4529 	button (on a dress) 	→ 	nipple (part of the breast) 	2
4530 	pimple 	→ 	nipple (part of the breast) 	2
4531 	to stumble 	→ 	to make a mistake, be wrong 	2
4532 	sign, designation 	→ 	index finger 	1
4533 	head 	→ 	index finger 	1
4534 	big 	→ 	index finger 	1
4535 	to sew 	→ 	index finger 	1
4536 	first 	→ 	index finger 	1
4537 	middle, centre 	→ 	middle finger 	108
4538 	long (size) 	→ 	middle finger 	10
4539 	big 	→ 	middle finger 	4
4540 	sharp 	→ 	middle finger 	1
4541 	third 	→ 	middle finger 	5
4542 	finger-ring 	→ 	ring finger 	26
4543 	babble-tube 	→ 	ring finger 	3
4544 	fourth 	→ 	ring finger 	2
4545 	edge, border 	→ 	ring finger 	1
4546 	edge, border 	→ 	little finger 	2
4547 	child (son or daughter) 	→ 	ring finger 	1
4548 	son 	→ 	ring finger 	1
4549 	gold 	→ 	ring finger 	1
4550 	orphan 	→ 	ring finger 	1
4551 	sparrow 	→ 	little finger 	1
4552 	side (n.) 	→ 	little finger 	1
4553 	cuckoo 	→ 	Eurasian hoopoe 	1
4554 	bird 	→ 	bat 	7
4555 	frog 	→ 	bat 	2
4556 	to touch 	→ 	to start moving 	3
4557 	footprint, track 	→ 	descendant 	1
4558 	Ranunculus 	— 	cornflower (Centaurea) 	1
4559 	blind 	→ 	solid, entire, continuous 	2
4560 	throat 	→ 	eater 	1
4561 	throat 	— 	food 	1
4562 	suffocation 	— 	boring 	1
4563 	faeces 	— 	slag, scoria 	2
4564 	bronze 	→ 	shine (n.) 	1
4565 	tube, pipe 	→ 	wind musical instrument 	7
4566 	tube, pipe 	→ 	negative evaluation 	2
4567 	fool 	→ 	fanatic 	1
4568 	to rotate (tr.) 	→ 	to feel pain, ache 	2
4569 	to peck (of a bird) 	→ 	to offend (tr.) 	2
4570 	jaw 	→ 	sleigh 	1
4571 	god 	→ 	smallpox 	3
4572 	grass, herb 	→ 	April 	4
4573 	clean (adj.) 	→ 	saint 	1
4574 	wire (n.) 	→ 	telegram 	1
4575 	hoar-frost 	→ 	grey hair 	2
4576 	to spoil (tr.) 	— 	to untie, unbind 	1
4577 	elder 	→ 	thumb 	1
4578 	<animal> 	→ 	haystack 	14
4579 	to fall asleep 	→ 	to go out (of fire) 	2
4580 	to wake up (intr.) 	→ 	to erupt 	1
4581 	grandmother 	→ 	mandrel (technology) 	1
4582 	stomach 	— 	waist 	3
4583 	doll 	→ 	larva 	1
4584 	doll 	→ 	mandrel (technology) 	1
4585 	to nail 	→ 	to stare 	1
4586 	<foreigner> 	→ 	guava 	2
4587 	Thai crape myrtle 	→ 	guava 	1
4588 	olive (Olea europaea) 	→ 	guava 	1
4589 	pomegranate 	→ 	guava 	2
4590 	egg 	→ 	eggplant (Solanum melongena) 	3
4591 	eggplant (Solanum melongena) 	→ 	tomato (Solanum lycopersicum) 	11
4592 	monk 	→ 	donut 	2
4593 	voice 	→ 	vote 	8
4594 	syllable 	→ 	byte 	1
4595 	navel 	→ 	pole (geographical) 	2
4596 	lentil 	→ 	lens 	26
4597 	to love 	→ 	forget-me-not (flower) 	1
4598 	tongue (body part) 	→ 	string (of a musical instrument) 	3
4599 	cover, lid 	→ 	deck (of a ship) 	1
4600 	cover, lid 	→ 	cover (of a book) 	2
4601 	part 	→ 	byte 	1
4602 	to turn, rotate (intr.) 	— 	about 	1
4603 	neck / throat 	— 	voice 	18
4604 	sticky 	→ 	annoying 	1
4605 	battle 	→ 	dispute, discussion 	1
4606 	earnest, serious 	— 	important 	4
4607 	to be tied 	→ 	to stammer, stutter 	1
4608 	skin (of an animal) 	→ 	volume (of books) 	1
4609 	Jesuit 	→ 	cunning person 	4
4610 	lavish, generous 	→ 	fertile (soil) 	1
4611 	hoe 	— 	anchor 	1
4612 	wheel 	— 	sky 	1
4613 	stone (of a fruit) 	→ 	nucleus (in physics) 	4
4614 	mad, insane 	→ 	very, of high degree 	6
4615 	stranger, foreign 	— 	lier 	1
4616 	any 	→ 	bad 	2
4617 	to put on 	→ 	to hope 	1
4618 	sooner 	→ 	rather (preference) 	2
4619 	earlier 	→ 	rather (preference) 	2
4620 	to penetrate, get into 	→ 	to understand 	4
4621 	to spoil (tr.) 	→ 	to pamper 	7
4622 	to shut, close 	→ 	to deceive 	1
4623 	to slide 	→ 	to fail 	1
4624 	to fall down 	→ 	to be solved 	1
4625 	to burn (intr.) 	→ 	to fail 	1
4626 	to turn round 	→ 	to appear somewhere 	1
4627 	to turn back to look at smth. 	→ 	to return (intr.) 	1
4628 	to turn, rotate (tr.) 	→ 	to invest 	1
4629 	to blow off 	→ 	to cancel 	1
4630 	to leave, abandon 	→ 	to lose (an object) 	1
4631 	to enter 	→ 	to cost 	1
4632 	to anchor 	→ 	to choose 	1
4633 	to shake off 	→ 	to get rid of 	1
4634 	to pierce 	→ 	to choose 	1
4635 	to lower, put down 	→ 	to stop doing smth. 	1
4636 	to break (tr.) 	→ 	gloomy, depressed 	1
4637 	to rivet 	→ 	to work carelessly 	2
4638 	to sell 	→ 	to betray 	8
4639 	to feel pain, ache 	→ 	disease 	6
4640 	on the outside 	→ 	by heart 	3
4641 	to rivet 	— 	to slander 	1
4642 	to unfold, unwind 	→ 	to create a text 	1
4643 	to put out 	→ 	to tell 	2
4644 	brain (cerebrum) 	— 	top of the head 	1
4645 	couple 	→ 	to copulate 	5
4646 	to see/to look at 	→ 	mirror 	20
4647 	mistress of a house 	→ 	wife 	9
4648 	uncle (father's brother) 	— 	nephew 	2
4649 	market 	— 	week 	2
4650 	sated with food 	→ 	rude, impolite 	1
4651 	sated with food 	→ 	to be fed up with 	3
4652 	to cut 	→ 	to begin (tr.) 	1
4653 	to cut 	→ 	to kill 	15
4654 	to knock down 	→ 	to suppress 	1
4655 	to knock down 	→ 	gloomy, depressed 	1
4656 	to take 	→ 	to trust / to believe in 	1
4657 	to take 	→ 	to subtract 	4
4658 	to raise, lift (tr.) 	→ 	to record 	1
4659 	to buy 	→ 	to bribe 	1
4660 	to put 	→ 	to persuade 	1
4661 	to put out 	→ 	to subtract 	1
4662 	to look inside 	→ 	to understand 	6
4663 	to want 	→ 	any 	4
4664 	to sink (tr.) 	— 	swamp 	2
4665 	pink 	→ 	good 	2
4666 	blue 	→ 	eggplant (Solanum melongena) 	2
4667 	straw 	→ 	penis 	1
4668 	pit 	→ 	dimple 	2
4669 	sack, bag 	→ 	clumsy 	2
4670 	rotten 	→ 	unreliable 	1
4671 	road 	→ 	rule, regulations 	1
4672 	plough, ard 	→ 	moose 	1
4673 	to end, finish 	→ 	to experience an orgasm 	1
4674 	to approach, come near 	→ 	to experience an orgasm 	2
4675 	goldsmith 	→ 	dragonfly 	1
4676 	sieve (n.) 	→ 	dragonfly 	1
4677 	needle (sewing) 	→ 	dragonfly 	2
4678 	official (n.) 	→ 	dragonfly 	1
4679 	herder, shepherd 	→ 	dragonfly 	1
4680 	horse 	→ 	dragonfly 	8
4681 	grandfather 	→ 	dragonfly 	1
4682 	grandmother 	→ 	dragonfly 	1
4683 	girl 	→ 	dragonfly 	2
4684 	day 	→ 	unit of length 	1
4685 	bottom 	→ 	caecum (blind gut) 	1
4686 	blind 	→ 	caecum (blind gut) 	28
4687 	aunt (father's sister) 	→ 	fever 	1
4688 	neighbour 	→ 	fever 	1
4689 	kind, good-hearted 	→ 	fever 	1
4690 	well-being 	→ 	property, possessions 	1
4691 	thrush 	→ 	coward 	1
4692 	rain 	→ 	puffball 	6
4693 	tobacco 	→ 	puffball 	5
4694 	to speak 	→ 	to prove, to argue 	1
4695 	teacher 	→ 	doctor, physician 	3
4696 	uncle 	→ 	woodland spirit 	1
4697 	owner 	→ 	woodland spirit 	1
4698 	long (size) 	→ 	woodland spirit 	1
4699 	long (size) 	→ 	snake 	1
4700 	long-armed 	→ 	thief 	3
4701 	lower part 	→ 	away 	1
4702 	length 	→ 	longitude 	4
4703 	width 	→ 	latitude 	5
4704 	to add 	→ 	to inform, let know 	1
4705 	palm (body part) 	→ 	threshing floor 	1
4706 	to tear, rend 	→ 	to flog 	1
4707 	act, deed 	→ 	drama (theatre) 	1
4708 	drama (theatre) 	→ 	distressing event 	18
4709 	<name of person> 	→ 	police officer 	3
4710 	dog 	→ 	police officer 	5
4711 	to scratch (with nails) 	→ 	to run away 	1
4712 	to explain 	→ 	to translate 	1
4713 	back (body part) 	→ 	book spine 	3
4714 	root (of a plant) 	→ 	book spine 	3
4715 	bowels, intestine 	→ 	common melilot (Melilotus officinalis) 	1
4716 	house 	→ 	inheritance 	1
4717 	house 	→ 	part 	1
4718 	root (of a plant) 	→ 	root (arithmetic) 	35
4719 	root (of a plant) 	→ 	root of equation 	4
4720 	sleeping 	→ 	dense (of forest) 	1
4721 	swamp 	→ 	aspic (dish) 	1
4722 	to breathe heavily 	→ 	sick, ill 	1
4723 	grandfather 	→ 	house spirit 	2
4724 	grandfather 	→ 	woodland spirit 	2
4725 	falcon 	→ 	cannon (weapon) 	5
4726 	snake 	→ 	cannon (weapon) 	2
4727 	sod (stratum of soil) 	→ 	oath 	1
4728 	white 	→ 	distilled alcohol 	5
4729 	zebra 	→ 	Danio rerio 	11
4730 	beech + wheat 	→ 	buckwheat 	8
4731 	dirty 	— 	swamp 	3
4732 	to bend (tr.) 	→ 	gulf 	1
4733 	buttock 	→ 	wagtail (Motacilla) 	1
4734 	corral, enclosure for cattle 	→ 	herd 	1
4735 	caterpillar 	→ 	caterpillar track 	14
4736 	to see/to look at 	→ 	hill 	1
4737 	to drive, force to move on 	→ 	to distill, retort 	2
4738 	to bend (tr.) 	→ 	to swear, curse 	1
4739 	to revere 	→ 	to keep the fast 	1
4740 	to wait 	→ 	suitable 	1
4741 	wizard, magician 	→ 	fraudster 	1
4742 	naked, bare 	→ 	stone loach (Barbatula barbatula) 	1
4743 	naked, bare 	→ 	charr (Salvelinus) 	2
4744 	naked, bare 	→ 	mountain 	1
4745 	honour 	→ 	salary 	1
4746 	to drive, force to move on 	→ 	to raft timber 	2
4747 	hump (of a person or camel) 	→ 	pink salmon (Oncorhynchus gorbuscha) 	1
4748 	bull 	→ 	common bullfinch 	2
4749 	snow 	→ 	common bullfinch 	3
4750 	smooth (surface) 	→ 	thick 	1
4751 	red 	→ 	common bullfinch 	13
4752 	gold 	→ 	common bullfinch 	1
4753 	priest (Christianity) 	→ 	common bullfinch 	6
4754 	to go deaf 	→ 	to fail (of engine) 	1
4755 	fool 	→ 	northern fulmar (Fulmarus glacialis) 	1
4756 	deaf 	→ 	western capercaillie (Tetrao urogallus) 	1
4757 	horse 	→ 	western capercaillie (Tetrao urogallus) 	1
4758 	clothes 	— 	property, possessions 	2
4759 	leaf 	— 	tobacco 	1
4760 	plough, ard 	→ 	unit of area 	1
4761 	air 	→ 	aër (veil covering vessels in the Orthodox Church) 	2
4762 	air 	→ 	lung 	1
4763 	<foreigner> 	→ 	<thorny plant> 	3
4764 	horn 	→ 	spout of vessel 	2
4765 	horn 	→ 	swelling (on skin) 	2
4766 	red 	— 	brave 	1
4767 	eagle 	→ 	Venus 	2
4768 	dragonfly 	↔ 	bullroarer 	3
4769 	club (a weapon) 	→ 	dragonfly 	2
4770 	needle (sewing) 	— 	arrow 	1
4771 	kidney 	→ 	bean 	4
4772 	to try, to attempt 	→ 	to measure 	1
4773 	Tahitian chestnut 	→ 	kidney 	9
4774 	liver 	→ 	spleen (anat.) 	18
4775 	red 	→ 	gills 	11
4776 	mane 	— 	fin 	4
4777 	sack, bag 	→ 	head 	1
4778 	to throw 	— 	to lose (an object) 	2
4779 	foot 	— 	time (instance) 	3
4780 	road 	→ 	time (instance) 	6
4781 	sadness, melancholy 	→ 	will (legal document) 	1
4782 	to strike, hit 	→ 	time (instance) 	4
4783 	eye 	— 	colour 	2
4784 	knot 	— 	hump (of a person or camel) 	2
4785 	bitter 	— 	difficult 	3
4786 	milk 	↔ 	female breast 	133
4787 	wind 	→ 	bad weather 	1
4788 	to see/to look at 	→ 	to discuss 	1
4789 	hair 	↔ 	feather 	51
4790 	skin (of a person) 	— 	body 	25
4791 	blunt 	— 	tasteless 	7
4792 	leaf 	— 	to sweep 	1
4793 	moon 	→ 	mirror 	5
4794 	new 	→ 	recently 	4
4795 	to lose (an object) 	→ 	to make a mistake, be wrong 	3
4796 	to go down 	— 	to give birth 	2
4797 	part 	— 	half 	3
4798 	side (n.) 	— 	half 	2
4799 	middle, centre 	→ 	half 	9
4800 	to lie (posture) 	→ 	to believe in 	6
4801 	open (adj.) 	— 	tactless 	1
4802 	girl 	— 	bride 	2
4803 	low (location) 	→ 	inaccessible 	1
4804 	servant 	— 	husband 	2
4805 	man (male) 	→ 	soldier 	3
4806 	beloved 	→ 	husband 	8
4807 	hand/arm 	→ 	foreleg 	8
4808 	to marry, take a wife 	↔ 	husband 	17
4809 	wife 	↔ 	to marry, take a wife 	3
4810 	father 	— 	foster-father 	1
4811 	daughter 	— 	daughter-in-law 	1
4812 	wife 	— 	daughter-in-law 	1
4813 	blood 	— 	anger 	1
4814 	circle 	→ 	apartment, flat 	1
4815 	board, plank 	— 	floor (vs. ceiling) 	1
4816 	tail 	→ 	consequence 	1
4817 	grandfather 	→ 	tiger 	1
4818 	snail 	→ 	spiral 	1
4819 	<honorific title> 	→ 	tiger 	1
4820 	grandparent 	→ 	tiger 	1
4821 	friend 	→ 	tiger 	1
4822 	tiger 	→ 	power, authority 	1
4823 	woodland spirit 	→ 	tiger 	1
4824 	hoop 	— 	tyre (of a car) 	1
4825 	bed 	→ 	garden bed 	8
4826 	to get stuck 	— 	to stumble 	1
4827 	bowels, intestine 	— 	penis 	2
4828 	fireplace 	→ 	garden bed 	1
4829 	bench 	→ 	garden bed 	1
4830 	pole (long stick) 	→ 	chief, boss 	1
4831 	wind musical instrument 	→ 	trunk, proboscis (of elephant) 	2
4832 	elephant 	→ 	whale 	1
4833 	trunk, proboscis (of elephant) 	→ 	tendril (of plant) 	1
4834 	moustache 	→ 	tendril (of plant) 	2
4835 	to call 	→ 	to cost 	1
4836 	grandparent 	→ 	elephant 	1
4837 	elephant 	→ 	good 	2
4838 	elephant 	→ 	marble goby (Oxyeleotris marmorata) 	1
4839 	stick (n.) 	→ 	penis 	3
4840 	to go away / to go out 	→ 	to marry, take a husband 	5
4841 	penis 	— 	urine 	1
4842 	rope, cord 	→ 	duty, responsibility 	2
4843 	to feel pity 	— 	to die 	1
4844 	bull 	→ 	elephant 	3
4845 	to spring, jump 	→ 	to surpass 	1
4846 	tiger 	→ 	lion (Panthera leo) 	1
4847 	tortoise, turtle 	→ 	cuckold, deceived husband 	2
4848 	body part 	→ 	member of the collective 	6
4849 	to spit 	→ 	to despise 	5
4850 	by oneself, alone 	→ 	monk 	1
4851 	to catch up with 	→ 	to find 	1
4852 	to blow 	— 	to spit 	1
4853 	chief, boss 	— 	parents 	1
4854 	spleen (anat.) 	→ 	anger 	2
4855 	to suffer from hunger 	— 	to whine 	1
4856 	snail 	→ 	slug 	16
4857 	fable 	— 	riddle 	1
4858 	pregnant 	— 	sensitive 	1
4859 	wolf 	→ 	lion (Panthera leo) 	1
4860 	scorpion 	→ 	nettle (Urtica) 	1
4861 	healthy 	→ 	kind, good-hearted 	2
4862 	right (vs. left) 	→ 	best 	1
4863 	tail fat (of sheep) 	→ 	hearts (in cards) 	1
4864 	heart 	→ 	hearts (in cards) 	22
4865 	drinking vessel 	→ 	hearts (in cards) 	3
4866 	club (a weapon) 	→ 	clubs (in cards) 	2
4867 	spade, shovel 	→ 	spades (in cards) 	6
4868 	diamond 	→ 	diamonds (in cards) 	7
4869 	biscuit, cookie 	→ 	diamonds (in cards) 	2
4870 	square (geometrical) 	→ 	diamonds (in cards) 	9
4871 	tambourine 	→ 	diamonds (in cards) 	1
4872 	rhombus 	→ 	diamonds (in cards) 	2
4873 	diamond 	→ 	rhombus 	1
4874 	clover 	→ 	clubs (in cards) 	7
4875 	coin 	→ 	diamonds (in cards) 	1
4876 	sword 	→ 	spades (in cards) 	1
4877 	spear 	→ 	spades (in cards) 	12
4878 	cauldron 	→ 	spades (in cards) 	1
4879 	leaf 	→ 	spades (in cards) 	2
4880 	fly (n.) 	→ 	clubs (in cards) 	1
4881 	flower 	→ 	clubs (in cards) 	2
4882 	acorn 	→ 	clubs (in cards) 	2
4883 	wound (n.) 	→ 	plantain (Plantago) 	3
4884 	night 	→ 	badger (Meles) 	1
4885 	bug (Heteroptera) 	→ 	short person 	1
4886 	line 	→ 	footprint, track 	1
4887 	vinegar 	— 	barberry 	1
4888 	shrimp, prawn 	→ 	sty (on the eye) 	1
4889 	hajji 	→ 	maize 	3
4890 	noble 	→ 	free 	2
4891 	eagle-owl (Bubo bubo) 	→ 	clubs (in cards) 	1
4892 	bird cherry tree 	→ 	hearts (in cards) 	1
4893 	arrow 	→ 	diamonds (in cards) 	1
4894 	goose 	→ 	clubs (in cards) 	1
4895 	hoof 	→ 	hearts (in cards) 	1
4896 	arrow 	→ 	spades (in cards) 	1
4897 	crow 	→ 	clubs (in cards) 	1
4898 	queen 	→ 	queen (playing card) 	1
4899 	police officer 	→ 	jack (playing card) 	3
4900 	drum 	→ 	tympanum (of ear) 	13
4901 	orphan 	→ 	jack (playing card) 	1
4902 	spear 	→ 	dragonfly 	1
4903 	cigar 	→ 	dragonfly 	1
4904 	callus, corn 	— 	hemorrhoids 	1
4905 	water-melon (Cucurbita citrullus) 	→ 	buttock 	1
4906 	sin 	→ 	misfortune 	1
4907 	yard, courtyard 	→ 	diaphragm 	1
4908 	grandfather 	→ 	devil, satan 	1
4909 	snake 	→ 	dragonfly 	1
4910 	peasant, farmer 	→ 	jack (playing card) 	1
4911 	to pasture, shepherd 	→ 	to guard 	3
4912 	elder 	→ 	ace (playing card) 	1
4913 	girl 	→ 	queen (playing card) 	2
4914 	term of address to a married woman 	→ 	queen (playing card) 	2
4915 	snake 	→ 	fly agaric (Amanita muscaria) 	1
4916 	birch 	→ 	birch bolete (Leccinum scabrum) 	1
4917 	water 	→ 	birch bolete (Leccinum scabrum) 	1
4918 	thick 	→ 	birch bolete (Leccinum scabrum) 	1
4919 	hare (Lepus) 	→ 	birch bolete (Leccinum scabrum) 	1
4920 	swamp 	→ 	birch bolete (Leccinum scabrum) 	1
4921 	grey 	→ 	birch bolete (Leccinum scabrum) 	1
4922 	soldier 	→ 	birch bolete (Leccinum scabrum) 	1
4923 	ear, spike (of a grain plant) 	→ 	birch bolete (Leccinum scabrum) 	1
4924 	pillow 	→ 	birch bolete (Leccinum scabrum) 	1
4925 	black 	→ 	birch bolete (Leccinum scabrum) 	1
4926 	harm, damage 	→ 	to deceive 	1
4927 	ancestor 	— 	cause, reason 	1
4928 	to accuse, blame 	— 	to revenge 	1
4929 	burial 	— 	sunset 	1
4930 	to die 	→ 	to fail (of engine) 	2
4931 	to fear, be afraid 	→ 	to turn sour 	1
4932 	buttock 	→ 	butt of the rifle 	2
4933 	to water (plants) 	— 	to adorn, decorate 	1
4934 	page 	— 	diaphragm 	1
4935 	net (n.) 	→ 	diaphragm 	1
4936 	egg 	→ 	kidney 	1
4937 	to sail 	→ 	to drive (the car) 	3
4938 	spine, backbone 	→ 	keel 	2
4939 	evening 	→ 	party, soiree 	10
4940 	danger 	— 	accident 	1
4941 	wet 	→ 	inert, passive 	1
4942 	son-in-law 	— 	daughter-in-law 	1
4943 	to sway 	— 	to set (of Moon, Sun) 	1
4944 	jaw 	— 	molar (tooth) 	6
4945 	crocodile 	→ 	criminal 	3
4946 	to mix, stir 	— 	to marry, take a wife 	1
4947 	to sink (tr.) 	→ 	to conceal, keep secret 	1
4948 	to defecate 	→ 	to slander 	2
4949 	to roast 	— 	to harass 	1
4950 	to turn over 	→ 	to fail 	1
4951 	to lose one's way 	→ 	to menstruate 	1
4952 	to turn, rotate (intr.) 	— 	to repent 	2
4953 	sky 	→ 	ceiling 	4
4954 	to shave 	→ 	to enculturate, civilize 	1
4955 	no 	— 	yes 	1
4956 	<hat> 	— 	pride 	1
4957 	to dance 	— 	to joke 	1
4958 	passionate, zealous 	→ 	jealous 	7
4959 	hobby horse 	→ 	hobby 	5
4960 	wing 	→ 	outbuilding 	5
4961 	always 	→ 	still (adv.) 	3
4962 	qibla 	→ 	<cardinal direction> 	8
4963 	to lose colour 	→ 	to lose fertility (of the soil) 	1
4964 	sooner 	→ 	more probable 	1
4965 	simultaneously 	→ 	immediately 	4
4966 	to strike, hit 	→ 	immediately 	3
4967 	benediction, blessing 	→ 	will (legal document) 	1
4968 	green 	— 	beautiful 	1
4969 	skill 	— 	magic 	1
4970 	pawn (in chess) 	→ 	puppet, lay figure 	2
4971 	shark 	— 	stingray 	1
4972 	shape, form 	→ 	figure, stature 	1
4973 	foundation, basement 	— 	pedestal 	1
4974 	to use 	→ 	to employ 	1
4975 	gilt 	→ 	pleasant 	3
4976 	yard, courtyard 	— 	page 	1
4977 	forbidden 	→ 	bastard 	1
4978 	cricket (insect) 	— 	shepherd's pipe (musical instrument) 	1
4979 	hungry 	— 	powder-like 	1
4980 	to overflow 	— 	arrogant 	1
4981 	berry 	→ 	nipple (part of the breast) 	3
4982 	tongue (body part) 	— 	nipple (part of the breast) 	1
4983 	head 	→ 	nipple (part of the breast) 	2
4984 	<animal> 	→ 	gay 	3
4985 	sour 	→ 	orange (color) 	2
4986 	sheath 	→ 	vagina 	23
4987 	horse 	→ 	seahorse (Hippocampus) 	50
4988 	to sail into harbour 	→ 	to copulate 	1
4989 	to unload, download 	— 	to copulate 	1
4990 	to prick 	→ 	to copulate 	2
4991 	strength 	— 	price 	1
4992 	bone marrow 	— 	strength 	1
4993 	rib 	→ 	rib (part of a ship’s framework) 	6
4994 	rib 	→ 	reed (in loom) 	1
4995 	comb 	→ 	reed (in loom) 	8
4996 	to strike, hit 	→ 	reed (in loom) 	1
4997 	ray 	— 	spoke of wheel 	10
4998 	ray 	→ 	reed (in loom) 	1
4999 	shuttle (weaving instrument) 	→ 	shuttle (in a sewing machine) 	3
5000 	sword 	— 	reed (in loom) 	1
5001 	reed 	→ 	reed (in loom) 	2
5002 	weft, woof 	→ 	latitude 	1
5003 	warp 	→ 	longitude 	1
5004 	string (of a musical instrument) 	→ 	chord (music) 	3
5005 	bow-string 	→ 	chord (geometry) 	2
5006 	bow-string 	→ 	hypotenuse 	2
5007 	garden 	→ 	kindergarten 	12
5008 	shield 	→ 	coin 	12
5009 	to blow 	→ 	arrogant 	5
5010 	to stand 	→ 	to become 	5
5011 	to come, arrive 	— 	to become 	2
5012 	place 	→ 	instead of 	16
5013 	with exception of 	→ 	in addition to 	3
5014 	not to look 	→ 	to hate, dislike 	2
5015 	tail 	→ 	wolf 	11
5016 	horned 	→ 	deer 	1
5017 	girl 	→ 	wife 	4
5018 	woman 	— 	daughter 	12
5019 	this way, like this 	→ 	yes 	5
5020 	human, person 	→ 	husband 	6
5021 	to spring, jump 	→ 	to begin (intr.) 	1
5022 	boy 	— 	human, person 	1
5023 	mother 	→ 	old woman 	9
5024 	mother 	→ 	female animal 	10
5025 	daughter 	→ 	Aloe vera (plant) 	3
5026 	mother 	— 	wife 	2
5027 	woman 	→ 	Aloe vera (plant) 	4
5028 	child (son or daughter) 	→ 	<small artifact> 	1
5029 	father 	→ 	motherland 	50
5030 	mother 	→ 	motherland 	35
5031 	to carry 	→ 	to lose (an object) 	1
5032 	to give birth 	→ 	father 	3
5033 	to get, obtain 	→ 	parents 	1
5034 	name 	→ 	grandfather 	1
5035 	name 	→ 	grandchild 	2
5036 	to get, obtain 	→ 	husband 	1
5037 	house 	→ 	husband 	4
5038 	lord, master 	→ 	husband 	18
5039 	to burn (intr.) 	→ 	to be poisoned by fumes 	2
5040 	stem (of a plant) 	→ 	handle, gripe 	2
5041 	to go down 	→ 	to begin (tr.) 	1
5042 	innocent 	→ 	child (son or daughter) 	1
5043 	monarch 	— 	owner 	1
5044 	grandfather 	→ 	term of address to a man 	11
5045 	mother 	→ 	smallpox 	5
5046 	aunt (mother's sister) 	→ 	smallpox 	1
5047 	mother 	— 	grandmother 	5
5048 	mother 	→ 	goddess 	7
5049 	grandfather 	— 	<priest> 	1
5050 	brood, hatch 	→ 	children 	2
5051 	grandfather 	→ 	old man 	45
5052 	vocation 	→ 	profession 	4
5053 	to answer 	→ 	to correspond 	29
5054 	to speak 	→ 	to correspond 	2
5055 	to strike, hit 	→ 	to correspond 	2
5056 	dry 	→ 	lenten (fare) 	5
5057 	dry 	→ 	dry (wine) 	10
5058 	dry 	→ 	empty 	7
5059 	dry 	→ 	abstinent (from alcohol) 	3
5060 	lenten (fare) 	→ 	fatless 	1
5061 	daughter 	→ 	doll 	3
5062 	corpse 	→ 	ugly 	1
5063 	servant 	— 	soldier 	4
5064 	grandmother 	→ 	term of address to a woman 	7
5065 	grandmother 	→ 	old woman 	30
5066 	grandchild 	— 	grandparent 	106
5067 	son 	→ 	servant 	3
5068 	son 	— 	follower (of guru, leader) 	1
5069 	dry 	→ 	fatless 	1
5070 	son 	→ 	prince 	5
5071 	son 	— 	<God> 	1
5072 	daughter 	— 	female servant, maid 	2
5073 	daughter 	— 	follower (of guru, leader) 	2
5074 	goddess 	→ 	wife 	1
5075 	chief, boss 	→ 	husband 	2
5076 	daughter 	— 	princess 	1
5077 	son 	— 	jewel, precious stone 	1
5078 	to ripen 	→ 	ready 	1
5079 	to stand up 	→ 	to stop moving 	5
5080 	sweetheart 	→ 	wife 	2
5081 	strong 	→ 	husband 	2
5082 	body 	→ 	daughter 	1
5083 	body 	→ 	son 	1
5084 	family 	→ 	wife 	4
5085 	family 	— 	caste 	1
5086 	country, land 	→ 	wife 	1
5087 	child (son or daughter) 	→ 	people (pl.) 	1
5088 	lineage 	→ 	offspring 	2
5089 	one's own 	→ 	sibling 	1
5090 	together 	→ 	sibling 	2
5091 	garbage 	→ 	police officer 	1
5092 	idler, loafer 	→ 	sloth (South American mammal) 	34
5093 	grandmother 	→ 	smallpox 	2
5094 	son 	↔ 	courage 	3
5095 	river 	→ 	Milky Way 	5
5096 	together 	→ 	wife 	2
5097 	green 	→ 	child (son or daughter) 	1
5098 	green 	— 	courage 	1
5099 	raw 	→ 	raw material 	5
5100 	man (male) 	→ 	cooked rice 	1
5101 	child (son or daughter) 	— 	unripe (fruit) 	1
5102 	daughter 	— 	virgin 	2
5103 	bridegroom 	→ 	cooked rice 	1
5104 	tender (adj.) 	— 	husband 	1
5105 	afterwards, later 	→ 	younger 	2
5106 	tender (adj.) 	— 	child (son or daughter) 	1
5107 	love 	→ 	daughter 	1
5108 	love 	→ 	son 	1
5109 	love 	→ 	wife 	1
5110 	beautiful 	→ 	husband 	1
5111 	beautiful 	→ 	wife 	1
5112 	body 	→ 	wife 	1
5113 	field 	→ 	wife 	1
5114 	joy 	→ 	daughter 	1
5115 	to give birth 	→ 	son 	1
5116 	to give birth 	→ 	daughter 	1
5117 	priest (Christianity) 	→ 	king (a playing card) 	2
5118 	soul, spirit 	→ 	husband 	1
5119 	sati (Hindu practice) 	→ 	wife 	2
5120 	whore 	→ 	wife 	1
5121 	beginning 	→ 	chief, boss 	1
5122 	to inform, let know 	→ 	to accuse, blame 	1
5123 	to stand, be in vertical position 	→ 	torso 	1
5124 	state, situation 	→ 	state (sovereign polity) 	1
5125 	monarch 	→ 	state (sovereign polity) 	2
5126 	elder sister 	→ 	term of address to a woman 	8
5127 	elder sister 	→ 	term of address with endearment 	1
5128 	aunt (mother's sister) 	→ 	term of address to a woman 	4
5129 	little, small 	→ 	younger 	2
5130 	elder brother 	→ 	term of address to a man 	4
5131 	child (son or daughter) 	→ 	term of address with endearment 	1
5132 	brother 	→ 	term of address to a man 	7
5133 	sister 	→ 	term of address to a woman 	1
5134 	woman 	→ 	term of address to a woman 	1
5135 	aunt (father's sister) 	→ 	term of address to a woman 	1
5136 	cousin (male, cross-) 	→ 	fool 	1
5137 	father 	→ 	term of address with endearment 	3
5138 	son 	→ 	bridegroom 	1
5139 	mother 	→ 	sister 	1
5140 	to fall down 	→ 	to fall in love 	5
5141 	mother 	→ 	daughter 	2
5142 	little, small 	→ 	aunt (mother's sister) 	2
5143 	elder sister 	— 	mother 	3
5144 	brother 	→ 	member of criminal organisation 	2
5145 	elder brother 	→ 	term of address with endearment 	1
5146 	goat 	→ 	drinking vessel 	1
5147 	stem (of a plant) 	→ 	strain (microbiology) 	4
5148 	to fall down 	→ 	to get (in games) 	1
5149 	to fall down 	→ 	to lie prostrate, as in reverence 	1
5150 	to sow 	— 	summer 	1
5151 	to stand, be in vertical position 	↔ 	to stand still 	4
5152 	man (male) 	→ 	exclamation of surprise, pain or sorrow 	3
5153 	uncle (father's brother) 	— 	grandfather 	4
5154 	uncle (father's brother) 	— 	uncle (mother's sister's husband) 	6
5155 	aunt (mother's sister) 	— 	aunt (father's brother's wife) 	7
5156 	aunt (mother's brother's wife) 	— 	mother-in-law 	3
5157 	elder sister 	— 	cousin (female, parallel) 	3
5158 	younger sister 	— 	cousin (female, parallel) 	2
5159 	mistress of a house 	→ 	mistress, paramour 	2
5160 	mother 	→ 	aunt (mother's sister) 	14
5161 	uncle (mother's brother) 	— 	uncle (father's sister's husband) 	1
5162 	aunt (father's sister) 	— 	aunt (mother's brother's wife) 	6
5163 	uncle (mother's brother) 	— 	cousin (male, cross-) 	2
5164 	man (male) 	→ 	son 	2
5165 	son 	↔ 	soldier 	2
5166 	husband 	— 	soldier 	1
5167 	unripe (fruit) 	— 	undercooked 	5
5168 	child (son or daughter) 	— 	baby 	2
5169 	man (male) 	— 	bridegroom 	1
5170 	child (son or daughter) 	— 	man (male) 	1
5171 	younger brother 	— 	younger sister 	3
5172 	son 	— 	younger brother 	1
5173 	dust 	→ 	gunpowder 	5
5174 	young 	→ 	newlywed 	1
5175 	to lead 	→ 	to drive (the car) 	4
5176 	to sail 	→ 	to soar 	5
5177 	to go, walk 	→ 	to make a move (in a game) 	4
5178 	to move (tr.) 	→ 	to make a move (in a game) 	3
5179 	hand 	→ 	move (board games) 	2
5180 	quick 	→ 	swift (bird) 	1
5181 	step, pace 	→ 	move (board games) 	1
5182 	to pull, to draw 	→ 	to make a move (in a game) 	5
5183 	sickle 	→ 	swift (bird) 	1
5184 	mother 	→ 	queen (termites and ants) 	1
5185 	sickle 	→ 	harvest time 	3
5186 	sickle 	→ 	July 	2
5187 	sickle 	→ 	August 	5
5188 	always 	→ 	certainly, for sure 	2
5189 	child (son or daughter) 	→ 	bridegroom 	1
5190 	fist 	→ 	handful 	7
5191 	bark (of a tree) 	→ 	to tan (hides) 	4
5192 	mother 	→ 	widow 	1
5193 	mother 	→ 	wet-nurse 	6
5194 	scorpion 	— 	spider 	5
5195 	dog 	— 	ugly 	1
5196 	saint 	→ 	devil, satan 	3
5197 	aunt (mother's brother's wife) 	→ 	term of address to a woman 	1
5198 	aunt (mother's sister) 	→ 	widow 	1
5199 	aunt (mother's sister) 	→ 	stepmother 	2
5200 	child (son or daughter) 	— 	undercooked 	1
5201 	child (son or daughter) 	— 	dwarf 	1
5202 	guest 	— 	host (person) 	1
5203 	to seem 	→ 	to please 	1
5204 	lineage 	— 	wife 	1
5205 	pure 	→ 	husband 	1
5206 	cousin (female, parallel) 	→ 	term of address to a woman 	1
5207 	cousin (female, parallel) 	→ 	term of address with endearment 	1
5208 	grandfather 	— 	teacher 	1
5209 	to go out 	→ 	to get immunity 	1
5210 	always 	→ 	nevertheless 	1
5211 	brother 	— 	cousin (male) 	1
5212 	younger brother 	→ 	term of address with endearment 	2
5213 	younger brother 	→ 	owner 	1
5214 	father 	→ 	monarch 	1
5215 	air 	— 	steam, vapour 	1
5216 	gas 	— 	steam, vapour 	5
5217 	breathing 	→ 	air 	2
5218 	head 	→ 	chapter (of a book) 	11
5219 	wind 	→ 	rumour 	4
5220 	wind 	→ 	fart, flatus 	7
5221 	steam, vapour 	↔ 	sweat 	4
5222 	sky 	→ 	bed canopy 	6
5223 	still (adv.) 	→ 	nevertheless 	3
5224 	child (son or daughter) 	— 	child (vs. adult) 	80
5225 	to feel pain, ache 	→ 	grief, sorrow 	1
5226 	grandfather 	→ 	father-in-law 	2
5227 	grandfather 	→ 	ancestor 	19
5228 	grandfather 	→ 	soldier who is approaching demobilization 	2
5229 	old (vs. young) 	→ 	<priest> 	1
5230 	will, intention 	→ 	will (legal document) 	2
5231 	anathema 	→ 	swearword 	2
5232 	idler, loafer 	→ 	track idler wheel 	2
5233 	middle, centre 	→ 	Wednesday 	12
5234 	Turk 	→ 	heathen, pagan 	1
5235 	priest's wife 	→ 	dandelion 	1
5236 	brother 	→ 	member of religious organisation 	8
5237 	fat (adj., of a person) 	→ 	husband 	1
5238 	beetle 	→ 	pupil (of an eye) 	1
5239 	white 	→ 	birch 	2
5240 	dew 	→ 	tears 	1
5241 	house 	→ 	motherland 	29
5242 	to wipe 	→ 	to abolish 	5
5243 	drone 	→ 	hornet 	6
5244 	drone 	→ 	bumblebee 	4
5245 	bumblebee 	— 	hornet 	5
5246 	bee 	→ 	hornet 	2
5247 	wasp 	→ 	hornet 	6
5248 	foxglove (Digitalis) 	— 	Saint-John's-wort (Hypericum) 	1
5249 	to spring, jump 	→ 	to break (intr.) 	2
5250 	elder sister 	— 	grandfather 	1
5251 	brother 	→ 	friend 	10
5252 	father 	— 	aunt (father's sister) 	1
5253 	hell 	→ 	great suffering 	5
5254 	nun 	→ 	mantis 	1
5255 	low (location) 	→ 	embroidery on the hem 	1
5256 	low (location) 	→ 	mat, bedding 	1
5257 	bottom 	→ 	sole (of shoe) 	1
5258 	bottom 	→ 	foundation ditch 	1
5259 	participant in the ritual wedding procession 	→ 	young person 	1
5260 	rope, cord 	→ 	split (gymnastics) 	4
5261 	furuncle 	→ 	fig sign 	1
5262 	mortar (bowl) 	→ 	millstone 	6
5263 	<fruit> 	→ 	fig sign 	5
5264 	nettle (Urtica) 	→ 	motherwort (Leonurus) 	6
5265 	stallion 	→ 	idler, loafer 	1
5266 	<animal> 	→ 	<baked good> 	5
5267 	broom 	— 	rake 	5
5268 	water with honey 	— 	nectar 	1
5269 	raven 	— 	horse-bird 	1
5270 	to give birth 	→ 	mother 	4
5271 	to drink 	→ 	to peck (of a bird) 	1
5272 	jay 	→ 	siberian jay 	6
5273 	aunt (father's sister) 	→ 	lady 	1
5274 	younger sister 	— 	aunt (mother's sister) 	1
5275 	family 	→ 	child (son or daughter) 	6
5276 	ice 	→ 	window 	1
5277 	younger sister 	— 	aunt (father's sister) 	1
5278 	girl 	— 	sister 	1
5279 	sister 	— 	daughter 	2
5280 	son-in-law 	— 	brother-in-law 	1
5281 	daughter-in-law 	— 	sister-in-law 	2
5282 	elder sister 	— 	grandmother 	1
5283 	husband 	— 	wife 	10
5284 	to establish, found 	→ 	mother 	1
5285 	woman 	→ 	female animal 	48
5286 	wife 	— 	female animal 	4
5287 	foot/leg 	→ 	wheel 	10
5288 	hand/arm 	→ 	pointer (on a dial) 	6
5289 	foot/leg 	→ 	pointer (on a dial) 	1
5290 	foot/leg 	→ 	foot-wear 	1
5291 	to die 	→ 	to set (of Moon, Sun) 	2
5292 	silver 	↔ 	lead, plumbum 	5
5293 	silver 	→ 	nickel 	2
5294 	silver 	→ 	tin (n.) 	2
5295 	white 	→ 	tin (n.) 	13
5296 	lead, plumbum 	— 	zinc 	6
5297 	tin (n.) 	— 	zinc 	7
5298 	dog 	→ 	hunt (n.), hunting 	2
5299 	silver 	↔ 	gold 	14
5300 	roof 	→ 	house 	15
5301 	ship, vessel 	→ 	automobile 	1
5302 	<animal> 	→ 	police officer 	11
5303 	kilogram 	→ 	100 units of currency 	2
5304 	dough 	→ 	money 	4
5305 	cabbage 	→ 	money 	2
5306 	lemon 	→ 	million 	1
5307 	weed 	→ 	cannabis 	3
5308 	grass, herb 	→ 	cannabis 	10
5309 	carriage 	→ 	automobile 	12
5310 	carriage 	→ 	railcar 	12
5311 	tank (closed container for liquids) 	→ 	tank (armour) 	1
5312 	to crawl 	→ 	tank (armour) 	1
5313 	aunt 	— 	mother-in-law 	7
5314 	brother 	→ 	son 	1
5315 	child (son or daughter) 	→ 	orphan 	1
5316 	sister 	— 	friend 	1
5317 	people (pl.) 	→ 	village 	3
5318 	copper 	→ 	zinc 	1
5319 	copper 	→ 	tin (n.) 	2
5320 	lightning 	→ 	<curse> 	2
5321 	beehive 	→ 	cannon (weapon) 	1
5322 	bird 	→ 	airplane 	5
5323 	sword 	— 	sickle 	1
5324 	tusk (of animal) 	→ 	wild boar 	1
5325 	bee 	→ 	sugar 	2
5326 	already 	— 	now 	10
5327 	sticky 	— 	honey 	1
5328 	to feel pain, ache 	— 	sour 	1
5329 	to swim 	→ 	to climb 	1
5330 	hand/arm 	→ 	leaf 	1
5331 	name 	→ 	kind (n.) 	6
5332 	orphan 	→ 	unique 	1
5333 	orphan 	→ 	farm laborer 	4
5334 	orphan 	↔ 	poor, needy 	12
5335 	orphan 	— 	widow 	3
5336 	zenith 	— 	noon, midday 	2
5337 	moon 	— 	noon, midday 	14
5338 	to wait 	→ 	to prepare 	2
5339 	iron 	→ 	metal 	80
5340 	iron 	→ 	nail (metal spike) 	6
5341 	iron 	— 	coin 	2
5342 	iron 	— 	axe 	4
5343 	iron 	→ 	instrument, tool 	10
5344 	iron 	→ 	knife 	8
5345 	iron 	→ 	money 	17
5346 	copper 	→ 	iron 	12
5347 	iron 	— 	bone 	1
5348 	iron 	— 	spear 	4
5349 	iron 	— 	tooth 	1
5350 	tooth 	— 	spear 	1
5351 	iron 	— 	shield 	1
5352 	iron 	→ 	sword 	2
5353 	iron 	— 	hoe 	1
5354 	thumb 	↔ 	five 	4
5355 	door 	→ 	window 	9
5356 	window 	— 	opening, hole 	7
5357 	Pleiades 	→ 	star 	1
5358 	chervil (Anthriscus cerefolium) 	→ 	potato 	1
5359 	iron 	→ 	silver 	1
5360 	iron 	— 	tin (n.) 	4
5361 	chalk 	→ 	pencil 	1
5362 	iron 	→ 	fetters 	4
5363 	iron 	→ 	lock (n.) 	1
5364 	iron 	→ 	scissors 	1
5365 	tooth 	→ 	tentacle (of animals) 	1
5366 	tooth 	→ 	horn 	10
5367 	tooth 	→ 	scissors 	1
5368 	angry 	→ 	evil (adj.) 	2
5369 	tooth 	— 	mouth 	33
5370 	tooth 	→ 	thorn 	1
5371 	tooth 	→ 	beak 	15
5372 	tooth 	— 	bone 	4
5373 	to pass by 	→ 	to end, finish 	1
5374 	tooth 	— 	egg 	3
5375 	tooth 	— 	grain, seed 	5
5376 	tooth 	— 	bead 	1
5377 	cone (fruit) 	→ 	crossbill (Loxia) 	3
5378 	sacred, holy 	→ 	sacrum (bone) 	12
5379 	cross (n.) 	→ 	sacrum (bone) 	22
5380 	tail 	→ 	sacrum (bone) 	3
5381 	mother 	→ 	term of address with endearment 	1
5382 	sun 	→ 	father 	1
5383 	sun 	→ 	mother 	1
5384 	nail (metal spike) 	→ 	screw, screw-bolt 	4
5385 	screw, screw-bolt 	→ 	joint, articulation 	1
5386 	tin (n.) 	→ 	tin, can 	5
5387 	box, container 	→ 	tin, can 	1
5388 	shell (of mollusc) 	→ 	sink (basin for holding water for washing) 	2
5389 	rooster 	→ 	tap, faucet 	7
5390 	lifting machine 	→ 	tap, faucet 	6
5391 	key (of a door) 	→ 	tap, faucet 	2
5392 	word 	— 	letter (text) 	1
5393 	word 	— 	book (n.) 	6
5394 	pass (document allowing admission) 	→ 	letter (text) 	1
5395 	paper 	→ 	book (n.) 	3
5396 	house 	— 	address (description of the location) 	1
5397 	to sow 	→ 	father 	1
5398 	good 	→ 	sweets, candy 	4
5399 	joy 	→ 	son 	1
5400 	Samsara 	→ 	wife 	1
5401 	mother 	— 	father 	2
5402 	to praise 	→ 	grandfather 	1
5403 	egg 	— 	child (son or daughter) 	3
5404 	bathroom 	→ 	toilet 	7
5405 	grain, seed 	→ 	pill, tablet 	7
5406 	to cut 	→ 	to touch 	1
5407 	to feel 	→ 	to regret 	2
5408 	to perceive smell 	→ 	to know 	2
5409 	ashes 	— 	dust 	6
5410 	elder brother 	— 	stepfather 	1
5411 	nephew 	→ 	descendant 	4
5412 	pale 	→ 	sick, ill 	1
5413 	tongue (body part) 	↔ 	clapper of a bell 	16
5414 	heart 	→ 	clapper of a bell 	1
5415 	clapper of a bell 	→ 	penis 	2
5416 	sulfur 	→ 	match (for fire) 	7
5417 	phosphorus 	→ 	match (for fire) 	4
5418 	wax 	→ 	match (for fire) 	2
5419 	gold 	→ 	measles 	1
5420 	sting (n.) 	→ 	penis 	4
5421 	smoke 	→ 	common fumitory (Fumaria officinalis) 	8
5422 	dyer's greenweed (Genista tinctoria) 	— 	woad (Isatis tinctoria) 	1
5423 	soldier 	→ 	police officer 	4
5424 	light (n.) 	→ 	electricity 	5
5425 	hot 	→ 	electricity 	1
5426 	crown (n.) 	→ 	comb (of a bird) 	1
5427 	crown (n.) 	→ 	queen (bee) 	1
5428 	three times 	→ 	very, of high degree 	2
5429 	to make deaf 	→ 	to stun, to knock out 	4
5430 	to go out 	→ 	to speak 	1
5431 	to feel 	→ 	to emit smell 	2
5432 	to walk, wander 	→ 	Samsara 	1
5433 	tortoise, turtle 	→ 	Gemini (constellation) 	2
5434 	to break (tr.) 	→ 	split (gymnastics) 	2
5435 	dry season 	— 	year 	4
5436 	carrot 	↔ 	parsnip 	4
5437 	grape (plant) 	→ 	carrot 	1
5438 	celery 	→ 	parsley 	2
5439 	ear 	→ 	shoehorn 	1
5440 	ear 	→ 	tuning peg 	2
5441 	to adorn, decorate 	→ 	to award 	1
5442 	male animal 	→ 	door bolt 	1
5443 	flower 	→ 	fireworks 	1
5444 	joint, articulation 	→ 	node (botany) 	4
5445 	bull 	→ 	arrogant 	1
5446 	cave 	→ 	den (of thieves etc.) 	4
5447 	together 	— 	catamaran 	1
5448 	butterfly 	— 	flying fish 	2
5449 	butterfly 	→ 	butterfly fish 	5
5450 	ember 	→ 	red 	5
5451 	sorghum 	↔ 	maize 	12
5452 	millet 	→ 	sorghum 	5
5453 	stone (piece of rock) 	→ 	cemetery 	1
5454 	stone (piece of rock) 	→ 	anchor 	5
5455 	butterfly 	→ 	worry, anxiety 	1
5456 	sister 	— 	sibling of opposite sex 	1
5457 	prophet 	→ 	mantis 	3
5458 	grasshopper (Tettigonioidea) 	→ 	mantis 	8
5459 	grasshopper (Tettigonioidea) 	→ 	flying fish 	1
5460 	number 	→ 	date 	2
5461 	number 	— 	quantity 	7
5462 	star 	→ 	starfish 	26
5463 	star 	→ 	pupil (of an eye) 	6
5464 	moon 	→ 	girl 	1
5465 	crocodile 	→ 	dangerous 	1
5466 	crocodile 	→ 	greedy 	2
5467 	body part 	→ 	syllable 	1
5468 	corner of the eye 	→ 	intellect 	1
5469 	to dilute 	— 	bloodletting 	1
5470 	corner 	→ 	kneepit 	1
5471 	wheeze 	→ 	radiointerference 	1
5472 	desert (n.) 	→ 	hardship 	1
5473 	sin 	→ 	foreskin 	1
5474 	mountain pass 	— 	coccyx, tailbone 	1
5475 	one, single 	→ 	god 	2
5476 	trench 	→ 	afterbirth, placenta 	1
5477 	threshold 	— 	windowsill 	1
5478 	to blow one's nose 	— 	to snuff a candle 	1
5479 	to drink 	→ 	to drink alcohol 	13
5480 	to gnaw 	→ 	to distress 	23
5481 	moon 	→ 	horseshoe 	1
5482 	moon 	→ 	silver 	3
5483 	moon 	→ 	date 	1
5484 	hood 	→ 	crested lark 	1
5485 	winter 	→ 	common bullfinch 	3
5486 	rooster 	→ 	crested lark 	1
5487 	flute 	→ 	Eurasian skylark 	1
5488 	bully 	→ 	crested lark 	2
5489 	haymaking (time) 	→ 	Eurasian hoopoe 	1
5490 	bad weather 	→ 	Eurasian hoopoe 	1
5491 	red 	→ 	common redstart 	9
5492 	tail 	→ 	common redstart 	9
5493 	to burn (intr.) 	→ 	common redstart 	1
5494 	fan (hand-held) 	→ 	common redstart 	1
5495 	winnowing fan 	→ 	fan (hand-held) 	1
5496 	fan (hand-held) 	→ 	electrical fan 	10
5497 	forest 	→ 	common redstart 	1
5498 	alder (tree) 	→ 	common redstart 	1
5499 	western swamphen 	— 	nightingale 	1
5500 	nightingale 	— 	Eurasian skylark 	2
5501 	nightingale 	— 	European robin 	1
5502 	to whistle 	→ 	nightingale 	1
5503 	common bullfinch 	→ 	golden oriole 	1
5504 	to slide 	→ 	to make a mistake, be wrong 	1
5505 	nut, hazel 	→ 	Eurasian nuthatch 	3
5506 	to crawl 	→ 	Eurasian nuthatch 	1
5507 	bearded man 	→ 	bearded vulture 	2
5508 	lamb 	→ 	bearded vulture 	5
5509 	carrion 	→ 	Egyptian vulture 	1
5510 	to sleep 	→ 	Eurasian scops owl 	1
5511 	neck 	→ 	Eurasian wryneck 	7
5512 	to hide (tr.) 	↔ 	thief 	7
5513 	rowan 	→ 	fieldfare 	5
5514 	juniper 	→ 	fieldfare 	1
5515 	birch 	→ 	fieldfare 	1
5516 	grain, seed 	→ 	rook 	3
5517 	jackdaw 	→ 	rook 	4
5518 	crow 	→ 	jackdaw 	4
5519 	magpie (Pica pica) 	→ 	jay 	2
5520 	acorn 	→ 	jay 	1
5521 	sparrow 	→ 	siskin 	2
5522 	green 	→ 	siskin 	1
5523 	piper (musician) 	→ 	siskin 	1
5524 	frog 	→ 	breaststroke 	6
5525 	frog 	→ 	lock (n.) 	1
5526 	yellow 	→ 	siskin 	1
5527 	crow 	→ 	jay 	1
5528 	magpie (Pica pica) 	→ 	happiness, luck 	1
5529 	field 	→ 	fieldfare 	2
5530 	leaf 	→ 	leaf (of door, window) 	2
5531 	leaf (of door, window) 	→ 	fan (hand-held) 	7
5532 	night 	→ 	nightingale 	2
5533 	golden oriole 	→ 	nightingale 	1
5534 	common starling 	— 	jay 	1
5535 	common starling 	— 	fieldfare 	1
5536 	corn crake 	→ 	lean, thin (of a person) 	1
5537 	crow 	→ 	rook 	7
5538 	common quail 	→ 	corn crake 	8
5539 	monarch 	→ 	corn crake 	5
5540 	corn crake 	— 	water rail 	2
5541 	meadow 	→ 	corn crake 	2
5542 	rye 	→ 	corn crake 	6
5543 	ruff 	→ 	ruff (fish) 	1
5544 	ruff 	→ 	ruff (bird) 	1
5545 	corn crake 	— 	ruff (bird) 	1
5546 	field 	→ 	corn crake 	1
5547 	to struggle 	→ 	ruff (bird) 	6
5548 	pope 	→ 	ruff (fish) 	1
5549 	pope 	→ 	<bird> 	5
5550 	perch (Perca fluviatilis) 	→ 	ruff (fish) 	4
5551 	dog 	→ 	pike (fish) 	2
5552 	squirrel (Sciurus) 	→ 	Siberian flying squirrel 	18
5553 	wing 	→ 	leaf (of door, window) 	4
5554 	<high rank official in the Catholic Church> 	→ 	<alcoholic drink> 	9
5555 	spindle 	→ 	dragonfly 	2
5556 	squirrel (Sciurus) 	→ 	common chipmunk 	13
5557 	<musician> 	→ 	Eurasian skylark 	1
5558 	wild, untamed 	→ 	very, of high degree 	10
5559 	field 	→ 	year 	1
5560 	girl 	→ 	<fish> 	3
5561 	<tree> 	→ 	<fish> 	9
5562 	gold 	→ 	platinum 	31
5563 	silver 	→ 	platinum 	1
5564 	iron 	→ 	platinum 	1
5565 	wild, untamed 	→ 	violent 	17
5566 	wild, untamed 	→ 	impulsive 	10
5567 	wild, untamed 	→ 	rude, impolite 	24
5568 	to say 	→ 	to ask in marriage 	1
5569 	thousand 	→ 	many, much 	8
5570 	to miss the target 	→ 	to break a deadline 	1
5571 	leaf 	→ 	<fish> 	5
5572 	bud (on a twig) 	→ 	<fish> 	1
5573 	ide (fish) 	— 	common roach 	2
5574 	common chub 	— 	ide (fish) 	1
5575 	snow 	→ 	weasel (Mustella nivalis) 	1
5576 	glutton 	→ 	wolverine 	15
5577 	misfortune 	→ 	wolf 	1
5578 	fox (Vulpes vulpes) 	→ 	rowan 	1
5579 	fire 	→ 	fox (Vulpes vulpes) 	1
5580 	fire 	→ 	squirrel (Sciurus) 	2
5581 	tail 	→ 	fox (Vulpes vulpes) 	3
5582 	sable 	→ 	dog 	1
5583 	forehead 	→ 	bear (Ursus) 	3
5584 	fur, hair (of animals) 	→ 	bear (Ursus) 	3
5585 	honey 	→ 	bear (Ursus) 	2
5586 	gold 	→ 	bear (Ursus) 	1
5587 	silver 	→ 	bear (Ursus) 	1
5588 	noble 	→ 	bear (Ursus) 	2
5589 	bad (ethically) 	→ 	bear (Ursus) 	2
5590 	forest 	→ 	bear (Ursus) 	5
5591 	fearful, dreadful 	→ 	lynx 	1
5592 	bull 	→ 	moose 	1
5593 	horn 	→ 	moose 	1
5594 	reindeer 	— 	moose 	2
5595 	cow 	→ 	squirrel (Sciurus) 	4
5596 	common vole 	— 	mole (Talpa) 	3
5597 	owl 	— 	bat 	1
5598 	straight 	→ 	good 	3
5599 	female breast 	→ 	dandelion 	1
5600 	proverb 	— 	password 	1
5601 	badger (Meles) 	→ 	mole (Talpa) 	1
5602 	bear (Ursus) 	→ 	mole (Talpa) 	4
5603 	to wipe 	→ 	to forgive 	1
5604 	to pray 	→ 	mantis 	22
5605 	<priest> 	→ 	mantis 	1
5606 	horse 	→ 	mantis 	5
5607 	camel 	→ 	mantis 	1
5608 	nun 	→ 	flea 	1
5609 	flat (adj) 	→ 	louse 	1
5610 	great-grandmother 	— 	mantis 	1
5611 	axe 	→ 	mantis 	1
5612 	red 	→ 	socialist or communist 	16
5613 	left 	→ 	left (political) 	16
5614 	right (vs. left) 	→ 	right (political) 	16
5615 	to destroy, annihilate 	→ 	fighter plane 	7
5616 	to hunt 	→ 	fighter plane 	17
5617 	key (of a door) 	→ 	keystone 	13
5618 	navel 	→ 	keystone 	2
5619 	lock (n.) 	→ 	keystone 	5
5620 	beetle 	→ 	common starling 	2
5621 	priest (Christianity) 	→ 	dung-beetle 	1
5622 	mosquito, gnat 	→ 	ant 	1
5623 	wet 	— 	fat (adj., of food) 	1
5624 	grasshopper (Tettigonioidea) 	→ 	June 	2
5625 	cow 	→ 	ladybird 	7
5626 	elder brother 	— 	cousin (male, parallel) 	3
5627 	Mary, mother of Jesus 	→ 	ladybird 	3
5628 	younger brother 	— 	cousin (male, parallel) 	1
5629 	Easter 	→ 	ladybird 	2
5630 	ladybird 	— 	firebug, Pyrrhocoris apterus 	1
5631 	cow 	→ 	firebug, Pyrrhocoris apterus 	2
5632 	Easter 	→ 	firebug, Pyrrhocoris apterus 	1
5633 	witch, sorceress 	→ 	ladybird 	1
5634 	cuckoo 	→ 	ladybird 	1
5635 	hen 	→ 	ladybird 	3
5636 	sun 	→ 	ladybird 	3
5637 	god 	→ 	ladybird 	9
5638 	alder (tree) 	→ 	blood 	1
5639 	blood 	→ 	ladybird 	1
5640 	<name of person> 	→ 	ladybird 	5
5641 	<profession> 	→ 	firebug, Pyrrhocoris apterus 	8
5642 	happiness, luck 	→ 	ladybird 	1
5643 	fire 	→ 	firebug, Pyrrhocoris apterus 	9
5644 	<foreigner> 	→ 	firebug, Pyrrhocoris apterus 	2
5645 	tail 	→ 	branch (of a river) 	1
5646 	black 	→ 	bear (Ursus) 	2
5647 	third-person singular 	→ 	bear (Ursus) 	2
5648 	animal 	→ 	bear (Ursus) 	1
5649 	violent 	→ 	bear (Ursus) 	1
5650 	bull 	→ 	bear (Ursus) 	1
5651 	uncle (father's brother) 	→ 	bear (Ursus) 	2
5652 	ancestor 	→ 	bear (Ursus) 	1
5653 	claw 	→ 	wolf 	1
5654 	predator 	→ 	wolf 	1
5655 	grandchild 	→ 	wolf 	1
5656 	violent 	→ 	wolf 	1
5657 	tooth 	→ 	wolf 	1
5658 	forest 	→ 	wolf 	1
5659 	lord, master 	→ 	eagle 	1
5660 	wing 	→ 	eagle 	1
5661 	footprint, track 	→ 	moose 	1
5662 	shin 	→ 	moose 	1
5663 	bow-legged 	→ 	bear (Ursus) 	1
5664 	tail 	→ 	black grouse 	1
5665 	god 	→ 	wolf 	1
5666 	calm 	→ 	bear (Ursus) 	1
5667 	grandfather 	→ 	bear (Ursus) 	1
5668 	fearful, dreadful 	→ 	bear (Ursus) 	1
5669 	fearful, dreadful 	→ 	wolf 	1
5670 	old man 	→ 	wolf 	1
5671 	red 	→ 	fox (Vulpes vulpes) 	1
5672 	cell (of honeycomb) 	→ 	cell (in biology) 	6
5673 	cage 	→ 	cell (in biology) 	4
5674 	room 	→ 	cell (of honeycomb) 	3
5675 	blister 	→ 	cell (in biology) 	1
5676 	room 	→ 	cell (in biology) 	14
5677 	vessel 	→ 	cell (in biology) 	1
5678 	monster (abnormal creature) 	→ 	cruel 	8
5679 	mine (underground tunnel) 	→ 	mine (explosive device) 	10
5680 	to make real 	→ 	to understand 	4
5681 	sack, bag 	→ 	to discharge, dismiss 	2
5682 	to separate 	→ 	diaphragm 	1
5683 	barrier 	→ 	diaphragm 	2
5684 	onion 	→ 	garlic (Allium sativum) 	15
5685 	yellow 	→ 	brass 	3
5686 	water 	→ 	urine 	3
5687 	water 	→ 	tears 	4
5688 	to nail 	→ 	to crucify 	2
5689 	kite 	→ 	kite (lightweight toy) 	5
5690 	kite (lightweight toy) 	→ 	flying fish 	1
5691 	comet 	→ 	kite (lightweight toy) 	2
5692 	star 	→ 	kite (lightweight toy) 	1
5693 	<bird> 	→ 	kite (lightweight toy) 	7
5694 	butterfly 	→ 	kite (lightweight toy) 	2
5695 	dragon 	→ 	kite (lightweight toy) 	22
5696 	stag beetle 	→ 	kite (lightweight toy) 	1
5697 	hammer 	→ 	axe 	1
5698 	barrel 	→ 	kite (lightweight toy) 	1
5699 	bird 	→ 	kite (lightweight toy) 	1
5700 	soured milk 	→ 	cloud 	1
5701 	sphere; ball 	→ 	wheel 	1
5702 	bronze 	— 	brass 	14
5703 	court (of a sovereign) 	→ 	noble 	1
5704 	son 	→ 	noble 	1
5705 	room 	→ 	cage 	1
5706 	front part 	→ 	index finger 	2
5707 	branch, twig 	— 	little finger 	1
5708 	little finger 	→ 	ring finger 	3
5709 	water 	→ 	wine 	1
5710 	western capercaillie (Tetrao urogallus) 	→ 	May 	1
5711 	eagle 	→ 	April 	1
5712 	pike (fish) 	→ 	April 	1
5713 	common chipmunk 	→ 	April 	1
5714 	burbot 	→ 	December 	1
5715 	hare (Lepus) 	→ 	December 	1
5716 	hare (Lepus) 	→ 	May 	1
5717 	muksun 	→ 	October 	1
5718 	peled 	→ 	September 	1
5719 	<sturgeon> 	→ 	September 	1
5720 	nelma 	→ 	August 	1
5721 	berry 	→ 	August 	1
5722 	mosquito, gnat 	→ 	July 	1
5723 	fish 	→ 	July 	1
5724 	sterlet 	→ 	June 	1
5725 	silver 	— 	copper 	4
5726 	upper reach (of river) 	→ 	South 	1
5727 	lower reach (of river) 	→ 	North 	1
5728 	promise (n.) 	→ 	will (legal document) 	2
5729 	to emit smoke 	→ 	to smoke (meat or fish) 	14
5730 	spindle 	— 	arrow 	2
5731 	low (location) 	→ 	bass, low-pitched voice 	2
5732 	low (social) 	→ 	bad (ethically) 	1
5733 	high (location) 	→ 	high-pitched 	7
5734 	light, bright, clear 	→ 	high-pitched 	1
5735 	wasp 	— 	bumblebee 	3
5736 	to approach, come near 	→ 	to suffice, be enough 	4
5737 	needle (sewing) 	→ 	hedgehog (Еrinaceus) 	1
5738 	younger brother 	→ 	bear (Ursus) 	1
5739 	letter (text) 	→ 	signature 	1
5740 	strange 	→ 	funny 	1
5741 	water 	→ 	distilled alcohol 	3
5742 	bitter 	→ 	distilled alcohol 	4
5743 	warm 	→ 	South 	1
5744 	nose 	→ 	mole (Talpa) 	1
5745 	to calculate, count 	→ 	computer 	15
5746 	to systematize 	→ 	computer 	3
5747 	wing 	— 	arrow fletching 	1
5748 	wing 	— 	ray 	1
5749 	to go down 	→ 	to go downstream 	4
5750 	pig (Sus scrofa) 	→ 	lead, plumbum 	1
5751 	animal bladder 	→ 	glass (material) 	1
5752 	clay 	→ 	chalk 	1
5753 	dew 	— 	mist, fog 	17
5754 	dew 	— 	steam, vapour 	1
5755 	mist, fog 	— 	steam, vapour 	4
5756 	mist, fog 	— 	smoke 	32
5757 	mist, fog 	— 	dust 	11
5758 	smoke 	— 	steam, vapour 	16
5759 	steam, vapour 	— 	dust 	1
5760 	mist, fog 	— 	cloud 	54
5761 	court (of a sovereign) 	→ 	polite 	12
5762 	line 	→ 	trait 	4
5763 	to practice witchcraft 	→ 	to prevent 	1
5764 	to practice witchcraft 	→ 	to make, create 	1
5765 	to leave, abandon 	→ 	to begin (intr.) 	1
5766 	cloud 	— 	dust 	3
5767 	smoke 	— 	perfume, scent 	1
5768 	shine (n.) 	— 	smoke 	1
5769 	to emit smoke 	→ 	to stink 	2
5770 	to emit smell 	→ 	to indicate something bad 	10
5771 	to emit smoke 	→ 	censer 	2
5772 	beetle 	→ 	insect 	1
5773 	forest 	→ 	toilet 	1
5774 	forest 	→ 	wild, untamed 	5
5775 	bow (weapon) 	→ 	bow, fiddlestick 	30
5776 	cloud 	→ 	cataract (of the eye) 	2
5777 	curtain 	→ 	cataract (of the eye) 	7
5778 	mist, fog 	→ 	cataract (of the eye) 	3
5779 	red 	→ 	erysipelas 	5
5780 	twin 	→ 	testicle 	1
5781 	wing 	— 	shoulder 	4
5782 	shoulder-blade, scapula 	↔ 	shoulder 	12
5783 	shoulder 	— 	upper arm 	7
5784 	shoulder 	→ 	clavicle 	6
5785 	shoulder-blade, scapula 	— 	clavicle 	3
5786 	shoulder 	— 	hand/arm 	1
5787 	ladle 	→ 	shoulder-blade, scapula 	2
5788 	wing 	— 	shoulder-blade, scapula 	2
5789 	shoulder 	→ 	degree (unit of measurement) 	1
5790 	shoulder-blade, scapula 	→ 	side (n.) 	1
5791 	palm (body part) 	→ 	palm (tree) 	9
5792 	waterfall 	— 	cataract (of the eye) 	1
5793 	fat, lard 	→ 	cataract (of the eye) 	1
5794 	pearl 	— 	cataract (of the eye) 	2
5795 	tin (n.) 	→ 	cataract (of the eye) 	1
5796 	star 	→ 	cataract (of the eye) 	2
5797 	scale, squama 	— 	cataract (of the eye) 	1
5798 	eye 	→ 	planet 	1
5799 	flower 	→ 	cataract (of the eye) 	1
5800 	bead 	→ 	cataract (of the eye) 	1
5801 	general (military) 	→ 	middle finger 	1
5802 	roof beam 	→ 	middle finger 	2
5803 	tiger 	→ 	middle finger 	1
5804 	organ (anatomy) 	→ 	institution 	6
5805 	to sleep 	→ 	temple (body part) 	5
5806 	net (n.) 	→ 	retina 	12
5807 	to die 	→ 	temple (body part) 	1
5808 	neck 	→ 	isthmus 	6
5809 	tail 	→ 	coccyx, tailbone 	2
5810 	chestnut 	→ 	prostate 	2
5811 	body 	→ 	institution 	6
5812 	fish 	→ 	lightning 	1
5813 	rib 	→ 	side (n.) 	18
5814 	rib 	→ 	husband / wife 	1
5815 	rainbow 	→ 	iris (anatomy) 	11
5816 	lung 	→ 	sponge (animal) 	3
5817 	friend 	→ 	afterbirth, placenta 	6
5818 	to strike, hit 	→ 	artery 	5
5819 	human, person 	→ 	person (grammar) 	13
5820 	horse 	→ 	Asiatic dock 	4
5821 	millstone 	→ 	molar (tooth) 	2
5822 	to fight (war) 	→ 	to argue, have a dispute 	3
5823 	firm, durable 	→ 	reliable, trustworthy 	2
5824 	curly-headed 	→ 	Jewish 	1
5825 	face 	→ 	human, person 	7
5826 	humpbacked 	→ 	mosquito, gnat 	1
5827 	difficult 	— 	good 	1
5828 	pellicle, membrane 	→ 	cataract (of the eye) 	3
5829 	pellicle, membrane 	→ 	cloud 	1
5830 	brain (cerebrum) 	→ 	computer 	1
5831 	to separate 	→ 	to switch off 	1
5832 	earth, soil 	→ 	distance 	3
5833 	steppe, plain 	— 	side (n.) 	2
5834 	thigh / hip 	→ 	jamb (of a door, window) 	3
5835 	pellicle, membrane 	→ 	film, movie 	6
5836 	ashes 	→ 	powdery mildew 	1
5837 	middle, centre 	→ 	boundary (of land plots) 	1
5838 	to braid, plait, weave 	→ 	complex, complicated 	3
5839 	to press 	→ 	to hide (tr.) 	1
5840 	craftsman 	→ 	blacksmith 	1
5841 	moon 	→ 	calendar 	1
5842 	moon 	→ 	time 	1
5843 	Coleus (Plectranthus) rotundifolius 	→ 	potato 	1
5844 	bitch, female dog 	→ 	<curse: bad person> 	5
5845 	pericarp of a lotus 	→ 	middle finger 	3
5846 	poisonous 	→ 	magic 	1
5847 	heart 	→ 	middle finger 	1
5848 	father 	→ 	middle finger 	1
5849 	second (num.) 	→ 	middle finger 	2
5850 	monarch 	→ 	middle finger 	1
5851 	high (size), tall 	→ 	middle finger 	4
5852 	to miss the target 	→ 	mad, insane 	1
5853 	to pass by 	→ 	to lose colour 	2
5854 	season (of the year) 	— 	chapter (of a book) 	4
5855 	to strike, hit 	→ 	to mix, stir 	1
5856 	to cut 	→ 	to turn sour 	1
5857 	to resemble, be alike 	→ 	to get along (with smb.) 	1
5858 	brave 	— 	severe, harsh 	1
5859 	brave 	— 	hot-tempered 	1
5860 	to put together 	→ 	to reconcile 	1
5861 	to forget 	— 	to make a mistake, be wrong 	1
5862 	to bind 	→ 	to enter into a contract 	1
5863 	to destroy, annihilate 	→ 	to blunt 	1
5864 	to ask / to ask for, request 	→ 	to ask in marriage 	5
5865 	to love 	— 	must 	1
5866 	incomplete 	→ 	mad, insane 	1
5867 	devil, satan 	→ 	dragonfly 	1
5868 	to clothe 	→ 	to saddle 	1
5869 	to swell up 	→ 	to swagger 	7
5870 	to pull, to draw 	→ 	to milk 	5
5871 	increase (n.) 	→ 	falsified, fake 	1
5872 	horse 	→ 	horse-fly (Tabanidae) 	7
5873 	animal 	→ 	horse 	2
5874 	to weaken (intr.) 	→ 	purgative (medicine) 	2
5875 	to go out 	→ 	to have relationships (romantic or sexual) 	2
5876 	to spring, jump 	→ 	to disappear 	1
5877 	young animal 	— 	sapling 	1
5878 	to distinguish 	— 	to discriminate, treat improperly 	2
5879 	air 	— 	vain, in vain 	2
5880 	easy / simple 	— 	cheap 	1
5881 	to soil, make dirty 	— 	eclipse 	1
5882 	dense, thick (of liquid) 	— 	to make, create 	1
5883 	hand 	→ 	direction 	2
5884 	to pull, to draw 	— 	to shoot 	1
5885 	life 	— 	health 	2
5886 	alive 	— 	intact 	1
5887 	to speak 	→ 	to live, be alive 	1
5888 	bat 	→ 	poor, needy 	1
5889 	stork (Ciconia) 	→ 	tall person 	1
5890 	<bird> 	→ 	dear, darling 	11
5891 	to guess 	— 	to remember 	1
5892 	to seal (a document) 	— 	to print 	1
5893 	milk 	→ 	Milky Way 	8
5894 	curved 	→ 	cunning person 	1
5895 	stomach 	— 	belly 	31
5896 	grass, herb 	→ 	oregano 	1
5897 	waist 	→ 	girth 	1
5898 	wood shavings 	→ 	dandelion 	1
5899 	bush, shrub 	→ 	bouquet 	1
5900 	radish 	↔ 	black radish 	6
5901 	to joke 	→ 	easy 	2
5902 	nest (n.) 	— 	lair 	2
5903 	happy 	→ 	anthrax 	1
5904 	cold 	→ 	shame 	2
5905 	black radish 	→ 	root vegetable 	1
5906 	to take out 	→ 	to distill, retort 	1
5907 	to live, be alive 	→ 	property, possessions 	4
5908 	to go down 	→ 	to spoil (intr.) 	2
5909 	to undress (tr.) 	→ 	to rob 	3
5910 	to undress (tr.) 	→ 	to skin, flay 	2
5911 	to decorticate, debark 	→ 	to skin, flay 	3
5912 	to skin, flay 	→ 	to rob 	2
5913 	naked, bare 	→ 	bareback 	1
5914 	to cry, weep 	— 	to fall (of rain, snow) 	1
5915 	to get lost 	→ 	to die 	9
5916 	tea 	→ 	lemon balm (Melissa) 	1
5917 	tea 	→ 	Saint-John's-wort (Hypericum) 	4
5918 	blood 	→ 	Saint-John's-wort (Hypericum) 	5
5919 	opening, hole 	→ 	Saint-John's-wort (Hypericum) 	1
5920 	dysentery 	→ 	Saint-John's-wort (Hypericum) 	1
5921 	heart 	→ 	Saint-John's-wort (Hypericum) 	1
5922 	will, intention 	→ 	love 	3
5923 	sparrow 	→ 	bird 	19
5924 	to go, walk 	→ 	to flow 	2
5925 	union 	→ 	mortar (masonry) 	1
5926 	grain, seed 	→ 	<measure of weight> 	3
5927 	to make soft 	→ 	to persuade 	1
5928 	to shine, glitter 	→ 	to laugh 	1
5929 	dialect 	— 	tone 	1
5930 	ankle bone for playing 	→ 	spool 	1
5931 	ankle bone for playing 	— 	beam 	1
5932 	tailed 	→ 	witch, sorceress 	1
5933 	cock (of a gun) 	→ 	trigger (of a gun) 	7
5934 	rooster 	→ 	trigger (of a gun) 	3
5935 	dog 	→ 	trigger (of a gun) 	4
5936 	cat 	→ 	trigger (of a gun) 	1
5937 	fox (Vulpes vulpes) 	→ 	trigger (of a gun) 	1
5938 	woodpecker 	→ 	trigger (of a gun) 	1
5939 	cricket (insect) 	→ 	trigger (of a gun) 	1
5940 	dog 	→ 	cock (of a gun) 	4
5941 	bird 	→ 	cock (of a gun) 	1
5942 	upper arm 	→ 	cock (of a gun) 	1
5943 	dump 	— 	toilet 	1
5944 	heel (of a foot) 	→ 	to spur a horse 	1
5945 	to slide 	→ 	to shirk 	1
5946 	beautiful 	→ 	beloved 	2
5947 	string (of a musical instrument) 	— 	rope, cord 	4
5948 	already 	— 	suddenly 	1
5949 	to hear / to listen 	→ 	to watch, stare 	1
5950 	to hold (in hands) 	→ 	to suffer from rheumatism 	1
5951 	how many? 	→ 	some, several 	17
5952 	to cut 	→ 	to flog 	3
5953 	to flap, wave (hands) 	→ 	to play cards 	1
5954 	sign, designation 	→ 	shooting target 	3
5955 	shield 	→ 	shooting target 	1
5956 	prayer (text) 	— 	incantation, spell 	1
5957 	to wither 	→ 	to lose colour 	2
5958 	to heat up, warm up (intr.) 	→ 	to get tired 	1
5959 	warm 	→ 	lazy 	2
5960 	sweet (taste) 	→ 	kind, good-hearted 	1
5961 	moustache 	→ 	to grow up (intr.) 	1
5962 	flint 	→ 	active, agile 	1
5963 	firm, durable 	→ 	aborigine 	1
5964 	place 	— 	bed 	1
5965 	to put out one’s toungue 	→ 	to flame up 	1
5966 	to lick 	→ 	rumour 	1
5967 	wind 	→ 	spirit (supernatural being) 	10
5968 	mother 	→ 	thumb 	9
5969 	to winnow 	→ 	to waste 	1
5970 	winnowing fan 	→ 	kite (lightweight toy) 	1
5971 	to raise, lift (tr.) 	→ 	to winnow 	2
5972 	difficult 	→ 	poor, needy 	12
5973 	to go out 	→ 	to marry, take a husband 	1
5974 	elbow 	→ 	curve, turn (of road) 	3
5975 	to put into 	→ 	to bury, inter 	1
5976 	to put into 	→ 	to lock 	1
5977 	to overstep 	→ 	to go mad 	1
5978 	to lead 	→ 	to breed (animals) 	2
5979 	butterfly 	— 	button (on a dress) 	1
5980 	precipitous 	— 	pure 	1
5981 	little, small 	→ 	unimportant, slight 	6
5982 	to give 	→ 	to advise 	1
5983 	to inflate (intr.) 	→ 	to ascend (dough) 	1
5984 	tablecloth 	→ 	banquet, feast 	1
5985 	grain, seed 	→ 	descendant 	11
5986 	earth, soil 	→ 	Saturn 	6
5987 	shoulder-blade, scapula 	— 	foreleg 	1
5988 	finger / toe 	→ 	neck (of bottle etc.) 	1
5989 	to overpass the mountain passage 	→ 	impudence 	1
5990 	bridge 	— 	raft 	3
5991 	to suffice, be enough 	— 	to take possession 	1
5992 	bone marrow 	→ 	stone (of a fruit) 	1
5993 	rear 	→ 	last 	2
5994 	simple 	— 	free of charge 	1
5995 	yoke 	→ 	duty, responsibility 	1
5996 	ugly 	— 	unskillful 	1
5997 	to become full 	→ 	to set (of Moon, Sun) 	1
5998 	to become full 	→ 	sated with food 	4
5999 	falsified, fake 	→ 	bad 	1
6000 	hollow tree 	→ 	sluggish, torpid person 	1
6001 	flea 	→ 	camomile 	1
6002 	to blow 	→ 	to go mad 	1
6003 	ice 	→ 	hail 	4
6004 	fishbone 	— 	awn 	5
6005 	splinter (wood fragment) 	— 	fishbone 	1
6006 	splinter (wood fragment) 	→ 	splinter (group of people) 	2
6007 	beard 	→ 	awn 	2
6008 	sword 	→ 	awn 	1
6009 	moustache 	→ 	awn 	2
6010 	frog 	→ 	on all fours 	1
6011 	frog 	→ 	stork (Ciconia) 	1
6012 	to mix, stir 	→ 	to soil, make dirty 	1
6013 	doctor, physician 	— 	moon 	1
6014 	hand/arm 	→ 	to tame (animal) 	5
6015 	foot/leg 	→ 	leg (furniture) 	22
6016 	foot/leg 	→ 	assistant 	1
6017 	foot/leg 	→ 	second wife 	1
6018 	to gnaw 	→ 	rodent 	39
6019 	rain 	→ 	earthworm 	13
6020 	lean, thin (of a person) 	— 	poor, needy 	2
6021 	back of the axe head 	— 	heel (of bread) 	1
6022 	heel (of a foot) 	→ 	heel (of bread) 	5
6023 	hump (of a person or camel) 	→ 	heel (of bread) 	1
6024 	corner 	→ 	heel (of bread) 	1
6025 	spear 	→ 	firearm 	2
6026 	deaf 	→ 	remote area 	3
6027 	to lead 	→ 	to have opinion 	2
6028 	knot 	→ 	to get a cramp, spasm 	1
6029 	gnarl 	→ 	to get a cramp, spasm 	1
6030 	rope, cord 	→ 	braid (of hair) 	2
6031 	far away 	→ 	rare 	1
6032 	bear (Ursus) 	→ 	profiteer 	1
6033 	mouse 	→ 	squirrel (Sciurus) 	4
6034 	claw 	→ 	claw (of a crustacean) 	1
6035 	scissors 	→ 	claw (of a crustacean) 	9
6036 	thumb 	→ 	claw (of a crustacean) 	1
6037 	hoof 	→ 	claw (of a crustacean) 	4
6038 	first 	→ 	Monday 	7
6039 	string (of a musical instrument) 	— 	galloon 	1
6040 	rough wool 	→ 	rude, impolite 	1
6041 	root (of a plant) 	— 	sole (of shoe) 	1
6042 	under, below 	→ 	instead of 	2
6043 	dew 	→ 	drop (n.) 	2
6044 	fool 	→ 	to deceive 	2
6045 	important 	→ 	respected, venerable 	10
6046 	to deceive 	→ 	March 	1
6047 	to believe in 	— 	to torture 	1
6048 	skin (of a person) 	→ 	pillowcase 	1
6049 	to forge 	→ 	to shoe (horses) 	11
6050 	mouth 	→ 	mill race 	1
6051 	mouth 	→ 	inattentive person 	1
6052 	to forge 	→ 	to counterfeit 	5
6053 	to throw 	→ 	to stab 	4
6054 	to throw 	→ 	to kill 	1
6055 	to throw 	→ 	to feel pain, ache 	1
6056 	to collapse 	— 	to slim 	1
6057 	to throw 	→ 	to prick 	1
6058 	to plunge 	— 	to dip 	1
6059 	to duck 	— 	to dip 	1
6060 	to duck 	— 	to hide (tr.) 	1
6061 	bear (Ursus) 	→ 	clumsy 	4
6062 	novice 	→ 	unbroken horse 	1
6063 	to draw, paint 	→ 	to photograph 	3
6064 	to ask, inquire 	— 	to read 	1
6065 	to ask, inquire 	→ 	to tell a person's fortune 	1
6066 	khash 	→ 	sourdough 	2
6067 	to ride (e.g., a horse) 	→ 	to drink 	1
6068 	to sit down 	→ 	to mount a horse 	3
6069 	to sit 	→ 	to cost 	1
6070 	to get information 	— 	to understand 	1
6071 	to go out (of light) 	→ 	to weaken (intr.) 	1
6072 	saw 	→ 	manner, way, method 	1
6073 	to break (intr.) 	→ 	to come to end, cease 	2
6074 	to break (intr.) 	→ 	to disappear 	1
6075 	to break (intr.) 	→ 	to sentence 	1
6076 	to ride (e.g., a horse) 	→ 	to tell lies 	1
6077 	to know 	→ 	custom, habit 	1
6078 	dense, thick (of liquid) 	— 	frequent 	1
6079 	to attach to 	→ 	to strike, hit 	1
6080 	lotus 	→ 	persimmon 	1
6081 	to throw 	→ 	rash, eruption 	1
6082 	to throw 	→ 	to urinate 	1
6083 	to hug, embrace 	— 	to copulate 	1
6084 	to reach 	→ 	to turn (of age) 	2
6085 	to grasp, seize 	→ 	to set cupping glass 	1
6086 	to catch up with 	→ 	to ripen 	1
6087 	to catch up with 	→ 	to strike, hit 	1
6088 	to catch up with 	→ 	to become infected 	1
6089 	to hang (tr.) 	→ 	to bear fruits (tree) 	1
6090 	to pour 	→ 	to be covered with leaves (buds) 	1
6091 	to throw 	→ 	to vomit 	1
6092 	to get moving 	→ 	to begin (tr.) 	1
6093 	to stand in front 	→ 	to hinder 	1
6094 	to place in front of 	→ 	to prefer 	1
6095 	in front of 	→ 	old (vs. new) 	1
6096 	forehead 	→ 	obstinate, persistent 	1
6097 	visible 	→ 	famous 	2
6098 	to fly up 	→ 	to clear away (fog, clouds) 	1
6099 	to call 	→ 	to reconcile 	1
6100 	high (size), tall 	→ 	many, much 	3
6101 	to close one's eyes 	→ 	to clench one's fist 	1
6102 	tendon 	→ 	breed 	1
6103 	to make sb look at smth 	→ 	to send 	1
6104 	to smear, anoint 	→ 	to sweep 	1
6105 	to sweep 	→ 	to blow (about wind) 	1
6106 	milk 	→ 	field sowthistle 	3
6107 	winter 	→ 	afterworld 	1
6108 	to learn, study 	→ 	to be tamed, domesticated 	1
6109 	grave, tomb 	— 	night 	1
6110 	to sit 	→ 	angry 	1
6111 	god 	→ 	Sunday 	7
6112 	not to act 	→ 	Sunday 	6
6113 	front part of foot 	→ 	sock 	1
6114 	fur, hair (of animals) 	→ 	wool, yarn 	14
6115 	greedy 	→ 	stingy 	3
6116 	second (num.) 	→ 	Tuesday 	15
6117 	third 	→ 	Wednesday 	7
6118 	fourth 	→ 	Thursday 	15
6119 	five 	→ 	Friday 	11
6120 	sixth 	→ 	Saturday 	3
6121 	sky 	→ 	Sunday 	1
6122 	second (num.) 	→ 	Monday 	5
6123 	third 	→ 	Tuesday 	7
6124 	fourth 	→ 	Wednesday 	5
6125 	five 	→ 	Thursday 	9
6126 	to prepare 	→ 	Friday 	3
6127 	calf (young cow or bull) 	→ 	duffer 	1
6128 	snake 	→ 	enemy 	1
6129 	soon 	→ 	early 	4
6130 	ready 	→ 	quick 	2
6131 	pig (Sus scrofa) 	→ 	swearword 	1
6132 	pigeon (Columba) 	→ 	whore 	2
6133 	rain 	→ 	umbrella 	14
6134 	nest (n.) 	— 	honeycomb 	1
6135 	nest (n.) 	— 	afterbirth, placenta 	2
6136 	nest (n.) 	— 	sheath 	1
6137 	nest (n.) 	— 	prison 	1
6138 	umbrella 	→ 	mushroom cap 	2
6139 	<bird> 	→ 	chanterelle 	3
6140 	cow 	→ 	chanterelle 	1
6141 	comb (of a bird) 	→ 	chanterelle 	1
6142 	apricot 	→ 	chanterelle 	1
6143 	drinking vessel 	→ 	chanterelle 	1
6144 	squirrel (Sciurus) 	→ 	chanterelle 	1
6145 	shadow 	→ 	umbrella 	4
6146 	ready 	→ 	soon 	2
6147 	pomegranate 	→ 	hawthorn 	1
6148 	pear 	→ 	guava 	2
6149 	mango 	→ 	guava 	1
6150 	rose apple (Syzygium) 	→ 	guava 	1
6151 	cone (fruit) 	→ 	pineapple 	5
6152 	pineapple 	→ 	hand grenade 	3
6153 	apple 	→ 	pineapple 	3
6154 	pandanus 	→ 	pineapple 	2
6155 	sweet-smelling, fragrant 	→ 	pineapple 	1
6156 	pear 	→ 	pineapple 	10
6157 	jackfruit 	→ 	pineapple 	4
6158 	pockmarked 	→ 	pineapple 	1
6159 	fox (Vulpes vulpes) 	→ 	skunk 	1
6160 	to stink 	→ 	skunk 	4
6161 	weasel (Mustella nivalis) 	→ 	skunk 	2
6162 	marten 	→ 	skunk 	1
6163 	fox (Vulpes vulpes) 	→ 	opossum 	1
6164 	fox (Vulpes vulpes) 	→ 	cockroach 	1
6165 	fox (Vulpes vulpes) 	→ 	vagina 	1
6166 	bark (of a tree) 	→ 	tin (n.) 	2
6167 	fox (Vulpes vulpes) 	→ 	coati 	1
6168 	badger (Meles) 	→ 	coati 	1
6169 	nose 	→ 	coati 	8
6170 	bear (Ursus) 	→ 	bully 	1
6171 	bear (Ursus) 	→ 	kinkajou 	6
6172 	bear (Ursus) 	→ 	anteater 	3
6173 	bear (Ursus) 	→ 	sloth (South American mammal) 	1
6174 	bear (Ursus) 	→ 	tayra 	1
6175 	bear (Ursus) 	→ 	raccoon 	3
6176 	wild boar 	→ 	tapir 	1
6177 	moose 	→ 	tapir 	2
6178 	cow 	→ 	tapir 	2
6179 	tapir 	→ 	horse 	1
6180 	bear (Ursus) 	→ 	wombat 	3
6181 	bear (Ursus) 	→ 	red panda 	3
6182 	fox (Vulpes vulpes) 	→ 	red panda 	3
6183 	bear (Ursus) 	→ 	koala 	4
6184 	bear (Ursus) 	→ 	wolverine 	2
6185 	badger (Meles) 	→ 	wolverine 	2
6186 	bear (Ursus) 	→ 	giant panda 	5
6187 	rhinoceros 	→ 	tapir 	1
6188 	to drink alcohol 	→ 	to celebrate 	1
6189 	to drink alcohol 	→ 	to ask in marriage 	1
6190 	middle, centre 	↔ 	lap 	2
6191 	to read 	↔ 	to speak 	9
6192 	to search, look for 	→ 	to make a telephone call 	1
6193 	to ring (tr.) 	→ 	to make a telephone call 	16
6194 	to shake 	→ 	to ring (tr.) 	1
6195 	to call 	→ 	to invite 	3
6196 	intact 	→ 	genuine, true 	2
6197 	sunbeam 	→ 	Xenopeltis unicolor 	4
6198 	rainbow 	→ 	Xenopeltis unicolor 	6
6199 	mud 	→ 	Xenopeltis unicolor 	1
6200 	slow (adj.) 	→ 	Anguis fragilis 	1
6201 	blind 	→ 	Anguis fragilis 	1
6202 	deaf 	→ 	Anguis fragilis 	1
6203 	fragile 	→ 	Anguis fragilis 	3
6204 	steel 	→ 	Anguis fragilis 	3
6205 	glass (material) 	→ 	Anguis fragilis 	1
6206 	nut, hazel 	→ 	Anguis fragilis 	1
6207 	<noise> 	→ 	Bitis arietans 	7
6208 	to strike, hit 	→ 	Bitis arietans 	1
6209 	snub-nosed 	→ 	Vipera latastei 	5
6210 	snout 	→ 	Vipera latastei 	1
6211 	horn 	→ 	Vipera latastei 	1
6212 	lyre 	→ 	Trimorphodon biscutatus 	4
6213 	milk 	→ 	Lampropeltis triangulum 	6
6214 	triangle 	→ 	Lampropeltis triangulum 	1
6215 	spade, shovel 	→ 	Chionactis occipitalis 	4
6216 	pig (Sus scrofa) 	→ 	Heterodon nasicus 	4
6217 	hook 	→ 	Heterodon nasicus 	4
6218 	poison 	— 	temptation 	1
6219 	silver 	→ 	grey-haired 	1
6220 	snub-nosed 	→ 	Heterodon nasicus 	1
6221 	mute, dumb 	→ 	child (vs. adult) 	5
6222 	to do, act 	→ 	to repaire, mend 	1
6223 	to pick, gather 	→ 	to read 	3
6224 	to break (intr.) 	→ 	to behave affectedly 	2
6225 	to break (intr.) 	→ 	to be stubborn, obstinate 	2
6226 	to break (intr.) 	→ 	to break (of male voice) 	3
6227 	star 	— 	spark 	1
6228 	once 	→ 	when 	2
6229 	beautiful 	→ 	very, of high degree 	3
6230 	sun 	→ 	dear, darling 	3
6231 	noon, midday 	— 	North 	1
6232 	how many? 	→ 	when 	2
6233 	what? 	→ 	how many? 	1
6234 	poisonous 	— 	salty 	1
6235 	brother-in-law 	— 	cousin (male) 	1
6236 	mouth 	→ 	door 	9
6237 	mushroom 	— 	algae 	1
6238 	deep 	→ 	bass, low-pitched voice 	3
6239 	rib 	— 	collarbone 	1
6240 	to turn, rotate (intr.) 	— 	waist 	1
6241 	dirty 	— 	to smoke (tobacco) 	1
6242 	to smoke (tobacco) 	— 	to flow 	1
6243 	hot 	→ 	to cook 	1
6244 	red 	→ 	to light, kindle (the fire) 	1
6245 	to drop (tr.) 	— 	to miss the target 	1
6246 	to see/to look at 	→ 	awake 	1
6247 	to see/to look at 	→ 	to live, be alive 	1
6248 	to find 	— 	to catch 	1
6249 	to beware, be careful 	— 	correct, right 	1
6250 	upside down 	→ 	false, wrong 	3
6251 	soft (adj.) 	→ 	newborn baby 	3
6252 	rain 	→ 	year 	7
6253 	mute, dumb 	→ 	earnest, serious 	1
6254 	dense (of forest) 	— 	quick 	1
6255 	tooth 	— 	stick (n.) 	1
6256 	opening, hole 	— 	idle 	1
6257 	blood vessel 	→ 	vein (geology) 	5
6258 	foam 	— 	spit, saliva 	1
6259 	to stop (intr.) 	— 	to doubt 	1
6260 	to stand 	— 	to be born 	1
6261 	to stand 	— 	foot/leg 	1
6262 	to cover ears 	→ 	to misunderstand 	1
6263 	grandfather 	— 	grandson 	1
6264 	to enter 	— 	to wear (clothes) 	1
6265 	buttock 	— 	Emu (Dromaius novaehollandiae) 	1
6266 	egg 	— 	honeycomb 	1
6267 	grandmother 	— 	granddaughter 	1
6268 	first 	→ 	chief, boss 	1
6269 	to swim 	— 	to wash 	1
6270 	to play (intr.) 	— 	to laugh 	1
6271 	clean (adj.) 	— 	hot 	1
6272 	clean (adj.) 	— 	keen (of senses) 	1
6273 	to blow 	— 	to evaporate, exhale 	1
6274 	uterus 	— 	pregnant 	1
6275 	cousin (female, parallel) 	— 	sister-in-law 	1
6276 	to teach 	— 	to think, consider 	1
6277 	thorn 	— 	peak of mountain 	1
6278 	thorn 	— 	sting (n.) 	2
6279 	stomach 	— 	sad 	1
6280 	head 	→ 	talent 	1
6281 	throat 	— 	source (of a river) 	1
6282 	old (vs. young) 	— 	strange 	1
6283 	son 	— 	nephew 	1
6284 	difficult 	— 	wife 	1
6285 	to joke 	— 	to teach 	1
6286 	eye 	— 	knee-cap 	1
6287 	eye 	— 	nipple (part of the breast) 	1
6288 	tail 	→ 	comet 	30
6289 	to tell lies 	— 	to mock 	1
6290 	hard, solid 	→ 	fortress 	4
6291 	cheek 	— 	half 	1
6292 	ring finger 	— 	index finger 	1
6293 	hand 	— 	the day after tomorrow 	1
6294 	two 	— 	seven 	2
6295 	table, desk 	→ 	molar (tooth) 	1
6296 	plate (a serving dish) 	→ 	table, desk 	6
6297 	porcelain 	→ 	plate (a serving dish) 	2
6298 	China 	→ 	porcelain 	6
6299 	shield 	→ 	tortoise, turtle 	11
6300 	to arrange, put in order 	→ 	to kill 	1
6301 	opening, hole 	— 	cover, lid 	1
6302 	anvil (of a blacksmith) 	→ 	incus, anvil bone 	28
6303 	earth, soil 	→ 	strawberry (Fragaria moschata) 	20
6304 	to have opinion 	— 	to respect 	1
6305 	piglet 	→ 	cowrie 	1
6306 	cowrie 	→ 	porcelain 	2
6307 	cowrie 	→ 	white of an eye, sclera 	1
6308 	cowrie 	→ 	lead, plumbum 	1
6309 	cowrie 	→ 	vagina 	1
6310 	seventy 	— 	many, much 	1
6311 	seven 	→ 	many, much 	2
6312 	sound 	→ 	song 	3
6313 	to fall (of rain, snow) 	→ 	to swear, curse 	1
6314 	to yawn 	→ 	inattentive person 	2
6315 	to strike, hit 	→ 	stroke, apoplexy 	2
6316 	mythical giant 	→ 	champion, winner 	2
6317 	to take 	— 	to help, aid 	1
6318 	elder sister 	→ 	elder brother's wife 	2
6319 	sound 	→ 	smell (n.) 	1
6320 	prickly, thorned 	→ 	sarcastic 	1
6321 	end (space) 	→ 	mouth (of a river) 	2
6322 	last 	— 	bad (ethically) 	1
6323 	horse 	— 	cattle 	1
6324 	Aloe vera (plant) 	— 	cypress 	1
6325 	juniper 	— 	cypress 	1
6326 	obstinate, persistent 	— 	healthy 	1
6327 	evil spirit 	→ 	<curse: bad person> 	8
6328 	evil spirit 	→ 	cobalt (metal) 	3
6329 	name 	↔ 	fame, reputation 	28
6330 	hammer 	→ 	hammer bone, malleus 	7
6331 	mouth 	→ 	to promise 	2
6332 	test, experiment 	— 	to have experience 	2
6333 	stallion 	→ 	male animal 	5
6334 	work (n.) 	→ 	smallpox 	1
6335 	palm (body part) 	→ 	to steal 	1
6336 	calm 	— 	easy 	2
6337 	tasty 	→ 	Boletus edulis 	1
6338 	stone (piece of rock) 	→ 	Boletus edulis 	4
6339 	pig (Sus scrofa) 	→ 	Boletus edulis 	1
6340 	cork 	→ 	Boletus edulis 	1
6341 	deaf 	→ 	mute, dumb 	6
6342 	to fly up 	→ 	to die 	1
6343 	to overflow 	→ 	to get angry 	2
6344 	foot 	— 	toe 	10
6345 	to extinguish 	— 	to set (of Moon, Sun) 	2
6346 	two 	→ 	pregnant 	1
6347 	algae 	— 	moss 	1
6348 	edge, border 	→ 	collar 	2
6349 	to eat 	→ 	to swear, curse 	2
6350 	near 	→ 	shallow 	1
6351 	partridge 	↔ 	common quail 	5
6352 	common quail 	→ 	buttonquail 	2
6353 	hazel grouse (Tetrastes bonasia) 	→ 	buttonquail 	1
6354 	hazel grouse (Tetrastes bonasia) 	↔ 	partridge 	10
6355 	nut, hazel 	→ 	hazel grouse (Tetrastes bonasia) 	2
6356 	abies (Abies) 	→ 	hazel grouse (Tetrastes bonasia) 	1
6357 	<bird> 	→ 	cockchafer 	2
6358 	to gather, collect 	→ 	to intend 	4
6359 	root (of a plant) 	→ 	carrot 	2
6360 	francolin 	→ 	hazel grouse (Tetrastes bonasia) 	1
6361 	monarch 	→ 	hazel grouse (Tetrastes bonasia) 	1
6362 	hen 	→ 	hazel grouse (Tetrastes bonasia) 	1
6363 	hen 	→ 	partridge 	1
6364 	vain, in vain 	— 	unfair 	1
6365 	blade, edge (of an instrument) 	— 	barrel (of a gun) 	1
6366 	sick, ill 	— 	not working 	1
6367 	sable 	→ 	otter (Lutra lutra) 	3
6368 	dog 	→ 	otter (Lutra lutra) 	12
6369 	grey 	→ 	badger (Meles) 	1
6370 	nail (body part) 	→ 	quotation mark 	3
6371 	freckle 	→ 	hazel grouse (Tetrastes bonasia) 	1
6372 	to do, act 	— 	to make, create 	18
6373 	to come, arrive 	→ 	to marry, take a husband 	1
6374 	to fall down 	→ 	to be fired, dismissed 	1
6375 	to make sit 	→ 	to appoint (to a position) 	2
6376 	to shed leaves 	— 	to shed hair or feathers 	1
6377 	to solve (a problem) 	— 	to end, finish 	1
6378 	can, to be able 	→ 	suitable 	1
6379 	expensive 	— 	pleasant 	1
6380 	open-eyed 	→ 	vigilant 	2
6381 	beloved 	— 	talisman 	1
6382 	palate 	→ 	taste (n.) 	1
6383 	to gnaw 	→ 	to bite (of fish) 	4
6384 	to break (tr.) 	→ 	to answer 	1
6385 	spice 	→ 	flattery 	2
6386 	yellow 	→ 	golden oriole 	5
6387 	cat 	→ 	golden oriole 	2
6388 	scissors 	→ 	crossbill (Loxia) 	1
6389 	crooked 	→ 	crossbill (Loxia) 	1
6390 	straw 	→ 	strawberry (Fragaria moschata) 	4
6391 	sun 	→ 	strawberry (Fragaria moschata) 	1
6392 	sun 	→ 	moderlieschen 	5
6393 	leaf 	→ 	moderlieschen 	1
6394 	sick, ill 	→ 	fan (sport) 	6
6395 	to hug, embrace 	→ 	to hatch eggs 	1
6396 	axe 	→ 	woodpecker 	1
6397 	head 	→ 	clasp, buckle 	1
6398 	head 	→ 	best 	1
6399 	monitor lizard 	→ 	evil spirit 	1
6400 	ink 	→ 	cuttlefish 	5
6401 	heavy (of weight) 	→ 	clumsy 	1
6402 	heavy (of weight) 	→ 	faeces 	1
6403 	skin (of an animal) 	→ 	shadow theatre 	1
6404 	flag, banner 	→ 	comet 	2
6405 	smoke 	→ 	comet 	3
6406 	hair 	→ 	comet 	5
6407 	to line up 	→ 	poetry 	2
6408 	bad 	→ 	very, of high degree 	7
6409 	anus 	→ 	eye of a needle 	1
6410 	shirt 	→ 	capsule (pharmacy) 	1
6411 	heart 	→ 	nausea 	1
6412 	nausea 	→ 	disgusting 	2
6413 	to eat 	→ 	to defeat, win 	4
6414 	board, plank 	→ 	table (of data) 	2
6415 	to speak 	→ 	to teach 	2
6416 	to fly 	→ 	to flutter (of flag) 	1
6417 	cold 	→ 	fever 	1
6418 	garbage 	→ 	swearword 	1
6419 	frozen 	→ 	roasted 	1
6420 	naked, bare 	→ 	bat 	2
6421 	tadpole 	— 	leech 	1
6422 	cricket (insect) 	— 	grasshopper (Tettigonioidea) 	4
6423 	to shake 	→ 	fever 	2
6424 	to draw, paint 	→ 	to tell lies 	1
6425 	to clothe 	→ 	to tell lies 	1
6426 	to fly 	→ 	to pass (of time) 	1
6427 	to light, kindle (the fire) 	→ 	to run 	1
6428 	to light, kindle (the fire) 	→ 	to strike, hit 	2
6429 	to bite 	— 	to peck (of a bird) 	1
6430 	to make stand 	→ 	to stop (tr.) 	2
6431 	to make stand 	→ 	to appoint (to a position) 	1
6432 	left 	→ 	opposite (space) 	2
6433 	left-handed 	→ 	clumsy 	1
6434 	word 	→ 	rumour 	3
6435 	sour 	→ 	sorrel 	5
6436 	sour 	→ 	rotten 	3
6437 	burdock 	→ 	rhubarb 	1
6438 	to collapse 	→ 	to be defeated 	1
6439 	sugar 	— 	sweet (taste) 	7
6440 	raven 	→ 	rook 	2
6441 	wheat 	→ 	buckwheat 	11
6442 	tail 	→ 	ermine; stoat (Mustela erminea) 	4
6443 	to whistle 	→ 	to loaf, do nothing 	1
6444 	to untwist, unscrew (intr.) 	→ 	to go out of tune 	1
6445 	to untwist, unscrew (intr.) 	→ 	to calm down 	1
6446 	to untwist, unscrew (intr.) 	→ 	to sober up 	1
6447 	to cut 	→ 	to vaccinate, inoculate 	2
6448 	to melt, thaw 	→ 	to feel pain, ache 	1
6449 	to spit 	→ 	to practice witchcraft 	1
6450 	wart 	→ 	greater celandine 	2
6451 	spindle 	— 	axle 	4
6452 	beard 	→ 	sliver (for spinning) 	1
6453 	to come, arrive 	→ 	to rise (of Moon, Sun) 	3
6454 	wolf 	→ 	mole cricket (Gryllotalpa) 	2
6455 	bear (Ursus) 	→ 	mole cricket (Gryllotalpa) 	7
6456 	crawfish 	→ 	mole cricket (Gryllotalpa) 	4
6457 	mole (Talpa) 	→ 	mole cricket (Gryllotalpa) 	11
6458 	pig (Sus scrofa) 	→ 	mole cricket (Gryllotalpa) 	1
6459 	young animal 	→ 	mole cricket (Gryllotalpa) 	1
6460 	to sew 	→ 	to deceive 	1
6461 	mosquito, gnat 	→ 	tansy 	1
6462 	elder brother 	— 	uncle (father's brother) 	2
6463 	to live, be alive 	→ 	to inhabit, live 	9
6464 	human, person 	→ 	stranger, foreign 	1
6465 	acorn 	— 	cone (fruit) 	1
6466 	scorpion 	→ 	mole cricket (Gryllotalpa) 	2
6467 	cricket (insect) 	→ 	mole cricket (Gryllotalpa) 	10
6468 	horse 	→ 	mole cricket (Gryllotalpa) 	2
6469 	cat 	→ 	mole cricket (Gryllotalpa) 	1
6470 	spirit (supernatural being) 	→ 	mole cricket (Gryllotalpa) 	3
6471 	gardener 	→ 	mole cricket (Gryllotalpa) 	1
6472 	louse 	→ 	mole cricket (Gryllotalpa) 	1
6473 	to repaire, mend 	→ 	to cure, treat (medically) 	3
6474 	to cure, treat (medically) 	→ 	to save 	8
6475 	elder brother 	→ 	uncle 	3
6476 	brain (cerebrum) 	→ 	skull 	2
6477 	skull 	— 	palate 	1
6478 	back (body part) 	→ 	stern 	3
6479 	backwards 	— 	earlier 	2
6480 	stepfather 	— 	father-in-law 	1
6481 	friend 	— 	trader 	1
6482 	to present, gift 	— 	to sacrifice (relig.) 	1
6483 	firstborn 	→ 	index finger 	1
6484 	fin 	— 	gills 	1
6485 	to help, aid 	→ 	to cure, treat (medically) 	1
6486 	to help, aid 	→ 	to correct 	1
6487 	to help, aid 	→ 	to clean up, tidy up 	1
6488 	mad, insane 	→ 	false, wrong 	4
6489 	wild, untamed 	→ 	strange 	4
6490 	night 	→ 	evening 	15
6491 	curved 	→ 	homosexual 	1
6492 	warm 	→ 	homosexual 	3
6493 	to divide into several parts 	— 	to present, gift 	1
6494 	otter (Lutra lutra) 	— 	polecat, ferret (Mustela putorius) 	1
6495 	lame 	→ 	bad 	7
6496 	muddy, turbid, opaque 	→ 	suspicious, questionable 	5
6497 	to get, obtain 	→ 	to become 	1
6498 	to walk, to go 	→ 	to become 	1
6499 	lame 	→ 	unlucky 	1
6500 	lame 	→ 	stammerer 	1
6501 	lame 	→ 	slow (adj.) 	1
6502 	rose 	→ 	rose chafer 	5
6503 	May 	→ 	cockchafer 	22
6504 	John the Baptist 	→ 	cockchafer 	2
6505 	leaf 	→ 	cockchafer 	1
6506 	fruit 	→ 	cockchafer 	5
6507 	bronze 	→ 	rose chafer 	4
6508 	gold 	→ 	rose chafer 	15
6509 	cockchafer 	→ 	rose chafer 	5
6510 	green 	→ 	rose chafer 	3
6511 	copper 	→ 	rose chafer 	1
6512 	bumblebee 	→ 	cockchafer 	3
6513 	oak 	→ 	cockchafer 	1
6514 	cow 	→ 	cockchafer 	1
6515 	present, gift 	→ 	poetry 	1
6516 	bumblebee 	— 	horse-fly (Tabanidae) 	1
6517 	<name of person> 	→ 	rose chafer 	1
6518 	cow 	→ 	hippopotamus 	3
6519 	horse 	→ 	hippopotamus 	29
6520 	elephant 	→ 	hippopotamus 	1
6521 	rhinoceros 	→ 	hippopotamus 	2
6522 	to throw 	→ 	to flap, wave (hands) 	1
6523 	to throw 	→ 	to nod 	1
6524 	to throw 	→ 	to blow (about wind) 	1
6525 	to throw 	→ 	to discharge, dismiss 	1
6526 	to strike, hit 	→ 	to photograph 	1
6527 	rust (n.) 	→ 	rust (plant disease) 	5
6528 	magpie (Pica pica) 	— 	woodpecker 	1
6529 	devil, satan 	→ 	common reed 	1
6530 	common reed 	→ 	club-rush (Scirpus) 	2
6531 	devil, satan 	→ 	beggartick 	1
6532 	devil, satan 	→ 	<thorny plant> 	7
6533 	true sedge (Carex) 	— 	swamp 	1
6534 	to end, finish 	→ 	to wring a cloth 	1
6535 	to rub 	→ 	to whet 	1
6536 	to rub 	→ 	to haunt, bother 	2
6537 	to suck 	→ 	to distress 	1
6538 	to suck 	→ 	to feel pain, ache 	1
6539 	god 	→ 	blue 	1
6540 	flea 	→ 	pepperwort 	1
6541 	to stink 	→ 	garlic (Allium sativum) 	1
6542 	mouse 	→ 	field bindweed 	1
6543 	mouse 	→ 	tufted vetch 	1
6544 	comprehensible 	→ 	noticeable 	1
6545 	mask 	→ 	caul, amniotic sac 	1
6546 	face 	→ 	mask 	10
6547 	correct, right 	→ 	healthy 	6
6548 	straight 	→ 	fat (adj., of a person) 	1
6549 	rain 	→ 	many, much 	2
6550 	<hat> 	→ 	mushroom cap 	14
6551 	head 	→ 	mushroom cap 	3
6552 	back (body part) 	→ 	mushroom cap 	1
6553 	awake 	→ 	to be not frozen (water) 	1
6554 	owner 	— 	chief, boss 	2
6555 	to pass by 	→ 	very, of high degree 	1
6556 	word 	→ 	contract, treaty 	2
6557 	to straighten 	→ 	to correct 	2
6558 	strength 	→ 	full age 	1
6559 	to increase (tr.) 	— 	to continue 	1
6560 	to defeat, win 	→ 	to miss the target 	1
6561 	to lie down 	→ 	to get tired 	1
6562 	to cross a river 	→ 	to pass (of time) 	1
6563 	thigh / hip 	→ 	penis 	2
6564 	foot/leg 	→ 	upper part (of a leg) 	3
6565 	to speak 	— 	to imitate 	1
6566 	unknown 	— 	strange 	1
6567 	tree resin, gum 	→ 	glue 	7
6568 	bow (weapon) 	→ 	boy 	1
6569 	to grasp, seize 	→ 	to attain, achieve 	1
6570 	circle 	→ 	all, whole 	3
6571 	sand 	— 	gunpowder 	2
6572 	tundra 	→ 	North 	1
6573 	to become flat 	→ 	to fall down 	1
6574 	to bend (tr.) 	→ 	to add 	1
6575 	winding, meandering 	→ 	talkative person 	1
6576 	to cope (with) 	→ 	to give birth 	1
6577 	to think, consider 	→ 	to love 	2
6578 	foundation, basement 	→ 	bearing (mechanical device) 	1
6579 	pillow 	→ 	bearing (mechanical device) 	4
6580 	bed 	→ 	bearing (mechanical device) 	8
6581 	sour 	→ 	acid 	31
6582 	to unfold, unwind 	→ 	to explain 	1
6583 	pig (Sus scrofa) 	→ 	anteater 	1
6584 	equal, identical 	→ 	kind (n.) 	2
6585 	to hew 	→ 	to strike, hit 	1
6586 	chip, splinter 	— 	substance, material 	1
6587 	to speak 	→ 	to behave well 	2
6588 	harvestman, reaper 	→ 	opilione, daddy longlegs 	2
6589 	trace 	→ 	talent 	1
6590 	to answer 	→ 	revenge 	2
6591 	to answer 	→ 	punishment 	2
6592 	to wake up (intr.) 	→ 	to begin (intr.) 	3
6593 	rotten 	— 	lean, thin (of a person) 	1
6594 	criminal 	— 	poor, needy 	1
6595 	quick 	— 	tight, taut 	2
6596 	father 	— 	uncle 	1
6597 	to walk, wander 	— 	to rob 	1
6598 	limit 	→ 	definition 	7
6599 	stone (piece of rock) 	→ 	unit of length 	2
6600 	stone (material) 	→ 	firm, durable 	1
6601 	to wait 	— 	ready 	1
6602 	engaged 	→ 	husband / wife 	8
6603 	sweet (taste) 	→ 	pleasant 	26
6604 	black 	→ 	pleasant 	1
6605 	to move (tr./intr.) 	→ 	to move, change residence 	5
6606 	greedy 	— 	fatless 	1
6607 	to bury, place in the ground 	→ 	to vaccinate, inoculate 	1
6608 	steppe, plain 	→ 	wolf 	1
6609 	often 	→ 	all, whole 	1
6610 	to make smb/smth light (of weight) 	→ 	to castrate 	2
6611 	to make smb/smth light (of weight) 	→ 	to urinate 	1
6612 	empty 	→ 	ravine 	1
6613 	strong 	→ 	bitter 	1
6614 	greedy 	— 	angry 	4
6615 	matter, affair 	→ 	necessary 	2
6616 	third-person singular 	→ 	husband 	4
6617 	difficult 	→ 	very, of high degree 	3
6618 	ordinary 	— 	only 	1
6619 	to butt 	— 	to pray 	1
6620 	wild sow 	— 	female maral 	1
6621 	bride 	→ 	husband 	1
6622 	light, bright, clear 	→ 	saint 	2
6623 	to follow, go after smb. 	→ 	to suit (of clothes etc.) 	1
6624 	to stink 	→ 	elder (Sambucus) 	3
6625 	to aim (weapon) 	— 	to set a bone 	1
6626 	to light, kindle (the fire) 	→ 	torch fishing 	1
6627 	closed 	→ 	secret 	1
6628 	western capercaillie (Tetrao urogallus) 	— 	black grouse 	1
6629 	right (vs. left) 	— 	happiness, luck 	1
6630 	to graze 	→ 	to eat too much 	1
6631 	thousand 	→ 	yarrow 	2
6632 	to braid, plait, weave 	→ 	to tell 	1
6633 	to bite 	→ 	to burn (tr.) 	3
6634 	wave 	→ 	fraud, cheat 	1
6635 	blood vessel 	→ 	trait 	2
6636 	drop (n.) 	→ 	small quantity of something 	2
6637 	white 	→ 	salt 	3
6638 	bow (weapon) 	→ 	slingshot 	1
6639 	bow (weapon) 	→ 	leaf spring 	2
6640 	catapult 	→ 	slingshot 	4
6641 	to strike, hit 	→ 	coup d'état, revolution 	1
6642 	to find 	→ 	to turn (of age) 	1
6643 	drum 	→ 	buttock 	1
6644 	uncle (mother's brother) 	→ 	patron, protector 	1
6645 	monarch 	→ 	police officer 	1
6646 	uncle (mother's brother) 	→ 	police officer 	1
6647 	naked, bare 	→ 	unforested, treeless place 	4
6648 	lean, thin (of a person) 	— 	plaintive 	1
6649 	tower 	— 	town, city 	2
6650 	bald 	→ 	unforested, treeless place 	7
6651 	mill (building) 	→ 	watch, clock 	1
6652 	servant 	— 	herder, shepherd 	2
6653 	race, ethnos 	→ 	state (sovereign polity) 	1
6654 	to tie 	→ 	to block 	1
6655 	to scream 	→ 	longhorn beetle 	3
6656 	mad, insane 	→ 	wild, untamed 	1
6657 	opening, hole 	→ 	middle of nowhere, periphery 	3
6658 	opening, hole 	→ 	prison 	2
6659 	<vessel> 	→ 	Aquarius (constellation) 	5
6660 	blood 	→ 	menstruation 	2
6661 	to say 	→ 	to mean 	2
6662 	sea 	→ 	many, much 	9
6663 	skin (of a person) 	→ 	pellicle, membrane 	7
6664 	beam 	→ 	support (n.) 	1
6665 	bow (weapon) 	→ 	shoulder pole 	1
6666 	tongue (body part) 	→ 	clitoris 	2
6667 	tongue (body part) 	→ 	key (of a door) 	2
6668 	thorn 	→ 	obstacle 	1
6669 	thorn 	→ 	ruff (fish) 	1
6670 	stem (of a plant) 	— 	torso 	1
6671 	to tear, rend 	→ 	to discharge, dismiss 	1
6672 	to stand up 	→ 	to come into existence 	1
6673 	to hear / to listen 	→ 	to rest 	1
6674 	<woman> 	→ 	opening, hole 	4
6675 	to be born 	→ 	to come into existence 	5
6676 	to touch 	→ 	to harm, damage 	3
6677 	cupboard, closet 	→ 	trap, snare (n.) 	1
6678 	to pour 	→ 	rash, eruption 	2
6679 	sling (weapon) 	→ 	slingshot 	14
6680 	to pour 	→ 	to fail 	2
6681 	sling (weapon) 	→ 	centrifuge 	2
6682 	smoke 	→ 	cannabis 	1
6683 	elder (Sambucus) 	→ 	lilac 	5
6684 	catapult 	→ 	seesaw 	1
6685 	arbalest, crossbow 	→ 	leaf spring 	1
6686 	bow (weapon) 	→ 	spring (mechanical device) 	1
6687 	mare 	→ 	shoulder pole 	2
6688 	shoulder pole 	→ 	wishbone, merrythought 	2
6689 	shoulder pole 	→ 	<measure of volume> 	2
6690 	drum 	→ 	diamonds (in cards) 	2
6691 	dinner fork 	→ 	wishbone, merrythought 	5
6692 	shoulder pole 	→ 	dragonfly 	3
6693 	shoulder pole 	→ 	clavicle 	1
6694 	spur (for horse) 	→ 	wishbone, merrythought 	1
6695 	flute 	→ 	fool 	1
6696 	button (on a dress) 	— 	bud (of a flower) 	1
6697 	elder brother 	— 	brave person 	1
6698 	carriage 	→ 	spool 	1
6699 	Europe 	→ 	sexually transmitted disease 	2
6700 	to incline 	→ 	inclination to smth 	3
6701 	eagle 	→ 	side of a coin 	2
6702 	crown (n.) 	→ 	side of a coin 	2
6703 	yoke 	→ 	side of a coin 	1
6704 	face 	→ 	side of a coin 	4
6705 	head 	→ 	side of a coin 	9
6706 	tail 	→ 	side of a coin 	1
6707 	pillar 	→ 	side of a coin 	1
6708 	number 	→ 	side of a coin 	3
6709 	cross (n.) 	→ 	side of a coin 	3
6710 	seal, stamp 	→ 	side of a coin 	1
6711 	mint (coins producing) 	→ 	side of a coin 	2
6712 	lattice, grid 	→ 	side of a coin 	2
6713 	gold 	→ 	good 	4
6714 	ship, vessel 	→ 	side of a coin 	1
6715 	to burn (intr.) 	→ 	shame 	1
6716 	dirty 	→ 	snake 	2
6717 	gold 	→ 	dear, darling 	12
6718 	raw 	— 	lazy 	1
6719 	to lose (an object) 	→ 	to waste 	4
6720 	to make stand 	→ 	to plant 	2
6721 	squire, armor-bearer 	→ 	bishop (chess) 	1
6722 	mule 	→ 	bridge (of musical imstrument) 	1
6723 	mare 	→ 	bridge (of musical imstrument) 	3
6724 	bridge 	→ 	bridge (of musical imstrument) 	9
6725 	Mount Meru 	→ 	bridge (of musical imstrument) 	1
6726 	stable 	→ 	bridge (of musical imstrument) 	1
6727 	horse 	→ 	bridge (of musical imstrument) 	4
6728 	comb 	→ 	bridge (of musical imstrument) 	1
6729 	seat, chair 	→ 	bridge (of musical imstrument) 	2
6730 	donkey 	→ 	bridge (of musical imstrument) 	2
6731 	horseman, rider 	→ 	bridge (of musical imstrument) 	1
6732 	yoke 	→ 	bridge (of musical imstrument) 	1
6733 	bridge 	→ 	sternum, breastbone 	1
6734 	to coagulate, curdle 	— 	to bake 	1
6735 	to peck (of a bird) 	— 	to sting 	1
6736 	to raise, lift (tr.) 	— 	to buy 	1
6737 	to know 	— 	to respect 	2
6738 	trust, confidence 	→ 	safety 	2
6739 	nape 	→ 	behind 	1
6740 	to melt, thaw 	→ 	to feel shy, embarrassed 	1
6741 	man (male) 	→ 	male animal 	55
6742 	self 	→ 	male animal 	1
6743 	stairs, ladder 	— 	bridge 	4
6744 	old (vs. new) 	— 	previous 	11
6745 	to blow (about wind) 	→ 	to have strange ideas 	1
6746 	hem (of a skirt) 	→ 	soft palate 	1
6747 	to do, act 	→ 	to be, exist 	3
6748 	tendon 	↔ 	string (of a musical instrument) 	8
6749 	excessive, extra 	→ 	whore 	2
6750 	berry 	— 	grain, seed 	2
6751 	scale, squama 	— 	money 	6
6752 	seasonal flooding 	→ 	abundance 	1
6753 	to boil (intr.) 	→ 	to laugh 	1
6754 	storm 	→ 	petrel (Procellaria) 	6
6755 	hernia (medical) 	→ 	burstwort (herniaria) 	3
6756 	wick 	→ 	drunk 	1
6757 	to peck (of a bird) 	→ 	to kiss 	1
6758 	thick 	→ 	vulgar 	2
6759 	stranger, foreign 	→ 	miserable, unhappy 	1
6760 	boy 	— 	penis 	1
6761 	<person of a different faith> 	→ 	cruel 	2
6762 	diver 	→ 	hard-working, laborious 	1
6763 	frog 	→ 	diver 	2
6764 	frog 	→ 	Ranunculus 	4
6765 	to go, walk 	— 	to be in use 	1
6766 	opening, hole 	→ 	advantage 	1
6767 	bride 	→ 	ladybird 	1
6768 	to come, arrive 	→ 	bride 	8
6769 	bride 	→ 	poppy (Papaver somniferum) 	1
6770 	to come, arrive 	→ 	to pretend 	1
6771 	to come, arrive 	→ 	to be situated 	1
6772 	to come, arrive 	→ 	to seem 	1
6773 	to come, arrive 	→ 	to fit 	2
6774 	again 	— 	but, however 	1
6775 	to pull, to draw 	→ 	tense, stressful 	3
6776 	chatter, idle talk 	→ 	false, wrong 	1
6777 	difficult 	→ 	expensive 	8
6778 	to enter 	→ 	to turn (of age) 	1
6779 	to turn, rotate (intr.) 	→ 	to turn (of age) 	1
6780 	to go, walk 	→ 	to suffice, be enough 	1
6781 	to dress someone (tr.) 	→ 	to offend (tr.) 	1
6782 	to itch 	→ 	worry, anxiety 	2
6783 	navel 	→ 	generation 	1
6784 	hare (Lepus) 	— 	marten 	1
6785 	hare (Lepus) 	— 	ermine; stoat (Mustela erminea) 	1
6786 	to nomadize 	→ 	to collapse 	1
6787 	to nomadize 	→ 	to die 	1
6788 	shirt 	→ 	generation 	1
6789 	to see/to look at 	→ 	matchmaker 	1
6790 	to see/to look at 	→ 	sister-in-law 	1
6791 	buttock 	→ 	courage 	1
6792 	buttock 	→ 	fool 	1
6793 	buttock 	→ 	homosexual 	1
6794 	to take away, carry away 	→ 	to endure 	1
6795 	to burn (tr.) 	→ 	suntanned 	1
6796 	eye 	→ 	eye (of potato) 	8
6797 	bitter 	— 	clever, wise 	1
6798 	to praise 	→ 	to be surprised 	1
6799 	short (size) 	→ 	February 	5
6800 	strong 	→ 	difficult 	4
6801 	to laugh 	→ 	to mock 	5
6802 	to laugh 	→ 	to smile 	7
6803 	sun 	→ 	South 	1
6804 	to drive, force to move on 	— 	to pasture, shepherd 	1
6805 	to drive, force to move on 	→ 	to govern, control, rule 	1
6806 	bridegroom 	→ 	son-in-law 	1
6807 	beautiful 	→ 	kind, good-hearted 	2
6808 	autumn 	→ 	shadow side 	1
6809 	dream (during sleep) 	→ 	fraud, cheat 	1
6810 	grain, seed 	— 	one piece (at counting) 	1
6811 	evil (adj.) 	→ 	malignant (of tumor) 	1
6812 	sharp 	→ 	acute (vs. chronic) 	2
6813 	tall person 	↔ 	fool 	2
6814 	eunuch 	— 	servant 	1
6815 	girl 	→ 	whore 	13
6816 	to stand still 	→ 	state, situation 	4
6817 	state, situation 	→ 	misfortune 	1
6818 	state, situation 	→ 	tense (grammar) 	1
6819 	empty 	→ 	lacking in smth 	1
6820 	to mix, stir 	→ 	to talk nonsense 	2
6821 	raw 	→ 	unripe (fruit) 	19
6822 	raw 	→ 	impossible 	1
6823 	cow 	→ 	woman 	14
6824 	dough 	→ 	essence, core 	2
6825 	silence 	→ 	death 	2
6826 	to yawn 	→ 	hostile 	1
6827 	palate 	→ 	conversation 	1
6828 	drug, medicine 	→ 	narcotic drugs 	2
6829 	colour 	— 	spot, stain 	1
6830 	good 	→ 	<foreigner> 	1
6831 	to spend (money) 	→ 	to kill 	2
6832 	scale, squama 	→ 	artichoke 	1
6833 	sensitive (instrument) 	— 	sensitive (person) 	1
6834 	brushwood 	→ 	oak 	4
6835 	worm 	→ 	<curse: bad person> 	6
6836 	trunk (of a tree) 	— 	wood, timber 	1
6837 	to scald 	→ 	to sting 	1
6838 	to scald 	→ 	to scold 	1
6839 	to scald 	→ 	to incur losses 	1
6840 	foot 	→ 	sole (of shoe) 	2
6841 	to undress (intr.) 	→ 	to clear away (fog, clouds) 	1
6842 	firewood 	→ 	fool 	1
6843 	gas 	→ 	nonsense 	1
6844 	air 	→ 	light-headed 	1
6845 	air 	→ 	blue 	1
6846 	market 	→ 	noisy place 	1
6847 	synagogue 	→ 	noisy place 	1
6848 	stomach 	→ 	mind (n.) 	3
6849 	stomach 	→ 	pelvis 	1
6850 	animal 	→ 	<curse: bad person> 	4
6851 	full 	→ 	genuine, true 	1
6852 	to digest (food) 	→ 	to endure 	1
6853 	dust 	→ 	vain, in vain 	1
6854 	to die 	→ 	to get tired 	2
6855 	chariot 	→ 	bishop (chess) 	1
6856 	shame 	— 	veil, head-covering 	1
6857 	objection, contradiction 	→ 	lie (n.), untruth 	1
6858 	<foreign country> 	→ 	turkey 	8
6859 	<foreign country> 	→ 	guinea pig (Cavia porcellus) 	14
6860 	trunk, proboscis (of elephant) 	→ 	whirlwind 	1
6861 	trunk, proboscis (of elephant) 	→ 	hose 	1
6862 	frank 	— 	flattery 	1
6863 	blood 	→ 	murder 	13
6864 	useless thing 	→ 	narcotic drugs 	2
6865 	date (Phoenix dactylifera) 	→ 	young person 	1
6866 	human temper, character 	→ 	custom, habit 	1
6867 	<foreigner> 	→ 	tomato (Solanum lycopersicum) 	1
6868 	plum 	→ 	tomato (Solanum lycopersicum) 	1
6869 	respected, venerable 	→ 	big 	2
6870 	blood vessel 	→ 	race, ethnos 	2
6871 	to bite 	→ 	nettle (Urtica) 	1
6872 	to bite 	→ 	to feel pain, ache 	4
6873 	spinach (Spinacia) 	→ 	fool 	1
6874 	light (n.) 	→ 	state, situation 	3
6875 	to shine, glitter 	→ 	to rise (of Moon, Sun) 	1
6876 	needle (sewing) 	→ 	needle (conifers) 	17
6877 	virgin 	→ 	honest 	1
6878 	to cast (metal) 	→ 	to defecate 	1
6879 	needle (sewing) 	→ 	sarcastic 	1
6880 	to need 	→ 	poor, needy 	3
6881 	to owe, be in debt 	→ 	duty, responsibility 	14
6882 	disease 	→ 	custom, habit 	1
6883 	disease 	→ 	cause, reason 	1
6884 	thin (of an object) 	→ 	palatal (sound) 	2
6885 	thin (of an object) 	→ 	lesbian 	1
6886 	thin (of an object) 	→ 	tuberculosis 	1
6887 	thin (of an object) 	→ 	to investigate/examine 	1
6888 	pearl 	→ 	lily-of-the-valley (Convallaria majalis) 	4
6889 	light, bright, clear 	↔ 	white 	2
6890 	cow 	→ 	fool 	6
6891 	to go down 	→ 	to strike, hit 	1
6892 	to go down 	→ 	to remain, stay 	4
6893 	to fasten, rope 	→ 	to respect 	1
6894 	big 	→ 	rude, impolite 	2
6895 	iris (anatomy) 	— 	blueflag (Iris) 	1
6896 	to relocate 	→ 	to die 	2
6897 	tears 	→ 	lily-of-the-valley (Convallaria majalis) 	4
6898 	lily-of-the-valley (Convallaria majalis) 	→ 	dear, darling 	1
6899 	spawn, roe 	→ 	ajvar (vegetable dish) 	4
6900 	name 	→ 	noun (grammar) 	17
6901 	harbour, port 	→ 	european kingfisher (Alcedo atthis) 	1
6902 	skeleton 	→ 	basis 	1
6903 	wave 	→ 	whale 	1
6904 	monster (supernatural) 	→ 	whale 	4
6905 	bell 	→ 	lily-of-the-valley (Convallaria majalis) 	7
6906 	May 	→ 	lily-of-the-valley (Convallaria majalis) 	4
6907 	tongue (body part) 	→ 	lily-of-the-valley (Convallaria majalis) 	1
6908 	guinea fowl 	→ 	turkey 	2
6909 	steam, vapour 	→ 	distilled alcohol 	1
6910 	pharaoh 	→ 	guinea fowl 	2
6911 	<foreign country> 	→ 	guinea fowl 	14
6912 	partridge 	→ 	guinea fowl 	2
6913 	fast (n.) 	→ 	breakfast 	4
6914 	morning 	→ 	breakfast 	4
6915 	evening 	→ 	dinner, evening meal 	3
6916 	turkey 	→ 	fool 	7
6917 	pearl 	→ 	guinea fowl 	15
6918 	spotted 	→ 	guinea fowl 	1
6919 	to work 	→ 	to vesicate 	1
6920 	to work 	→ 	to pass (of time) 	2
6921 	fence 	— 	curtain 	1
6922 	fence 	— 	shield 	1
6923 	South 	— 	leeward 	1
6924 	to grow up (intr.) 	— 	to convalesce, recover from illness 	1
6925 	unprofitable 	— 	bad 	2
6926 	wife's brother 	— 	husband's brother 	1
6927 	wife's brother 	— 	sister's husband 	1
6928 	wife's brother 	— 	daughter's husband 	1
6929 	husband's brother 	— 	sister's husband 	1
6930 	husband's brother 	— 	daughter's husband 	1
6931 	sister's husband 	— 	daughter's husband 	1
6932 	to work 	→ 	to mock 	1
6933 	to ask for, request 	— 	to be hungry 	1
6934 	to get dark 	→ 	to lose hope 	1
6935 	to breathe 	→ 	to release a fountain (of whale) 	1
6936 	to hang (tr.) 	→ 	to anchor 	1
6937 	weak 	— 	flexible 	2
6938 	to get tired 	— 	to unbend (intr.) 	1
6939 	to come loose (of rope, belt) 	→ 	to ripen 	1
6940 	first time 	— 	just now 	1
6941 	to unbend (intr.) 	— 	to agree 	1
6942 	to let go 	— 	to let, allow 	1
6943 	to rear up 	— 	to dance 	1
6944 	to rear up 	→ 	to disagree 	1
6945 	<bird> 	→ 	bird 	12
6946 	sign, designation 	→ 	letter (character) 	2
6947 	to run wild 	→ 	to go mad 	1
6948 	to run wild 	→ 	to turn into an animal 	1
6949 	to have fun 	— 	to slow, linger 	1
6950 	circle 	→ 	surroundings 	6
6951 	to cool down (intr.) 	— 	to weaken (about wind) 	1
6952 	dangerous 	→ 	fearful, dreadful 	2
6953 	knowledge 	— 	literacy 	1
6954 	sated with food 	— 	fat (adj., of a person) 	1
6955 	foot 	→ 	propeller (of boat engine) 	1
6956 	life 	→ 	livelihood 	1
6957 	to put into 	→ 	to imprison 	1
6958 	white 	→ 	white (politics) 	10
6959 	to move (intr.) 	→ 	to dance 	1
6960 	to dance 	→ 	to do sport, take exercise 	2
6961 	glue 	— 	soldering iron 	1
6962 	to put 	→ 	to pay tax 	1
6963 	sharp 	→ 	cold weapon 	1
6964 	to grow heavy 	— 	to stand motionless 	1
6965 	to tighten (intr.) 	→ 	to harden 	1
6966 	tongue (body part) 	→ 	oar 	1
6967 	lower part 	— 	floor (vs. ceiling) 	1
6968 	lightning 	— 	spark 	2
6969 	drinking vessel 	— 	tobacco pipe 	2
6970 	water vole 	— 	Russian desman 	1
6971 	dandelion 	— 	cotton wool 	1
6972 	source (of a river) 	— 	top/crown (of a tree) 	1
6973 	many-coloured, motley 	→ 	snow bunting 	1
6974 	paper 	— 	money 	2
6975 	cradle 	— 	swing (hanging seat) 	5
6976 	internal monologue 	— 	to think, consider 	1
6977 	appetite, hunger 	→ 	will, intention 	2
6978 	to trust / to believe in 	— 	to obey 	7
6979 	sleeping 	— 	safety 	1
6980 	to meet (each other) 	— 	to wrestle 	1
6981 	dog 	→ 	dog-rose 	17
6982 	respect (n.) 	→ 	relation, connection 	2
6983 	sharp 	→ 	rude, impolite 	1
6984 	good 	→ 	healthy 	26
6985 	house 	→ 	unpleasant place 	1
6986 	permission 	→ 	vacation 	1
6987 	rude, impolite 	→ 	buttock 	1
6988 	brave 	→ 	best 	1
6989 	pumpkin 	→ 	fool 	4
6990 	vegetable marrow 	→ 	bald 	1
6991 	to run 	→ 	shy 	1
6992 	to run 	→ 	to abduct, kidnap a bride 	1
6993 	to run away 	→ 	to disappear 	1
6994 	to run 	→ 	to resemble, be alike 	1
6995 	to run 	→ 	to penetrate, get into 	1
6996 	<vessel> 	→ 	flower cup 	8
6997 	ship, vessel 	→ 	whale 	1
6998 	skeleton 	→ 	lean, thin (of a person) 	1
6999 	cage 	→ 	chest (body part) 	2
7000 	cage 	→ 	prison 	4
7001 	<person of a different faith> 	→ 	<curse: bad person> 	2
7002 	<beverage, drink> 	→ 	breakfast 	2
7003 	coffee 	→ 	brown 	1
7004 	whore 	→ 	<curse: bad person> 	2
7005 	lean, thin (of a person) 	→ 	ugly 	1
7006 	to caulk 	→ 	to scold 	1
7007 	tin (n.) 	→ 	to scold 	1
7008 	to raise, lift (tr.) 	→ 	to abduct, kidnap a bride 	1
7009 	to raise, lift (tr.) 	→ 	to bury, inter 	1
7010 	always 	→ 	too much 	1
7011 	snail / slug 	→ 	sluggish, torpid person 	7
7012 	fortress 	→ 	rook (chess) 	15
7013 	pen (for writing) 	→ 	chisel 	1
7014 	pen (for writing) 	→ 	kind (n.) 	1
7015 	<hat> 	→ 	flower cup 	1
7016 	thick 	→ 	back vowels (linguistics) 	2
7017 	thick 	→ 	rich 	2
7018 	shield 	→ 	thyroid gland 	2
7019 	to stand up 	→ 	to go away 	1
7020 	peacock 	→ 	turkey 	1
7021 	peacock 	→ 	arrogant 	1
7022 	many-coloured, motley 	→ 	turkey 	1
7023 	saddle 	→ 	whore 	1
7024 	wedge 	→ 	knife 	1
7025 	screen, cover 	→ 	backdrop (visual) 	1
7026 	elephant 	→ 	turkey 	3
7027 	snot 	→ 	turkey 	1
7028 	pheasant 	→ 	turkey 	1
7029 	swelling (on skin) 	→ 	turkey 	1
7030 	cannon (weapon) 	→ 	turkey 	1
7031 	trunk, proboscis (of elephant) 	→ 	turkey 	2
7032 	face 	→ 	turkey 	1
7033 	sea 	→ 	West 	2
7034 	lion (Panthera leo) + tail 	→ 	motherwort (Leonurus) 	7
7035 	<horned animal> 	→ 	longhorn beetle 	15
7036 	goat 	→ 	shrimp, prawn 	1
7037 	spring (season) 	→ 	daisy (Bellis) 	1
7038 	board, plank 	→ 	bream (Abramis) 	1
7039 	donkey 	→ 	codfish 	1
7040 	lightning 	→ 	meteorite 	1
7041 	poison 	→ 	hemlock (plant) 	1
7042 	horse 	→ 	horsetail, equisetum 	1
7043 	rhinoceros 	→ 	narwhal (Monodon monoceros); 	1
7044 	poison 	→ 	oleander 	1
7045 	whip 	→ 	flagellate 	6
7046 	to whip 	→ 	to induce 	2
7047 	bell 	→ 	testicle 	1
7048 	ocean 	→ 	dictionary 	4
7049 	truck, lorry 	→ 	whore 	2
7050 	solid, entire, continuous 	→ 	perfect, complete 	1
7051 	solid, entire, continuous 	→ 	narcotic drugs 	1
7052 	lamp 	→ 	drunk 	1
7053 	to shut, close 	→ 	to switch off 	2
7054 	trap, snare (n.) 	→ 	trick, deceit 	2
7055 	strength 	— 	many, much 	1
7056 	to shut, close 	→ 	mistress, paramour 	1
7057 	door 	→ 	place of employment, job 	1
7058 	to be caught, found 	→ 	to fall in love 	2
7059 	overcoat 	→ 	condom 	1
7060 	rubber 	→ 	condom 	5
7061 	mountain pass 	— 	forest 	1
7062 	to sleep 	→ 	bed 	2
7063 	to sleep 	→ 	blanket 	1
7064 	nose 	→ 	barrel (of a gun) 	1
7065 	to stop moving 	→ 	to stop (intr.) 	2
7066 	grandmother 	→ 	body of water 	1
7067 	grandmother 	→ 	midwife 	4
7068 	nurse 	— 	midwife 	2
7069 	midwife 	— 	godmother 	1
7070 	midwife 	→ 	gossiper 	1
7071 	old woman 	→ 	midwife 	3
7072 	box, container 	— 	burrow (of animal) 	1
7073 	box, container 	— 	cradle 	1
7074 	to touch 	→ 	to drop by 	1
7075 	to whisper 	→ 	to snitch 	1
7076 	foot 	→ 	bottom 	2
7077 	breathing 	→ 	spirit (supernatural being) 	3
7078 	to stand 	→ 	to be alive (about babies) 	1
7079 	to peel off (about skin) 	— 	to disperse (intr., about cloud) 	1
7080 	to shoot 	→ 	to throw a lasso 	1
7081 	low (location) 	→ 	to be defeated 	1
7082 	low (location) 	→ 	small (amount) 	1
7083 	low (location) 	→ 	downriver 	2
7084 	low (location) 	→ 	leeward 	1
7085 	to decrease (water level) 	→ 	to subside (medicine) 	1
7086 	to move down (tr.) 	→ 	to defeat, win 	2
7087 	to gather, collect 	→ 	to recall, recollect 	1
7088 	to call 	→ 	to recall, recollect 	2
7089 	low (size) 	→ 	small (amount) 	3
7090 	to dress leather 	— 	to heal (of a wound) 	1
7091 	to preserve 	→ 	to remember 	1
7092 	to melt, thaw 	→ 	to heat up, warm up (intr.) 	2
7093 	to feel shy, embarrassed 	→ 	to shut one's eyes 	1
7094 	to become better 	→ 	to convalesce, recover from illness 	2
7095 	bone 	→ 	height (of a person) 	1
7096 	bone 	→ 	shell (of an egg) 	1
7097 	mouse 	→ 	marmot 	1
7098 	to harm, damage 	— 	to steal 	1
7099 	to think, consider 	→ 	to remember 	8
7100 	to understand 	— 	to remember 	6
7101 	to pass (of time) 	— 	to die 	1
7102 	nest (n.) 	→ 	vagina 	1
7103 	board, plank 	→ 	plate (a serving dish) 	1
7104 	board, plank 	→ 	picture 	1
7105 	vineyard 	↔ 	garden 	4
7106 	plate (a serving dish) 	→ 	tray 	2
7107 	pillow 	→ 	base (geometry) 	1
7108 	to tear, rend 	→ 	to cut off relationships 	2
7109 	louse 	— 	bedbug (Cimex lectularius) 	1
7110 	to go blind 	→ 	to be paid (e. g. debt) 	1
7111 	middle, centre 	→ 	manner, way, method 	9
7112 	head 	→ 	life 	3
7113 	to run away 	→ 	to violate an agreement 	1
7114 	digit (mathematics) 	— 	problem (mathematics) 	1
7115 	digit (mathematics) 	→ 	cipher, code 	7
7116 	empty 	→ 	zero 	7
7117 	zero 	→ 	digit (mathematics) 	1
7118 	to help, aid 	→ 	to pledge, pawn 	1
7119 	to shine, glitter 	→ 	to feel pain, ache 	1
7120 	distance 	— 	age group 	1
7121 	to extract a thorn 	→ 	to comfort 	1
7122 	to put 	→ 	to appoint (to a position) 	4
7123 	to strike, hit 	→ 	to meet accidentally 	1
7124 	magical remedy 	— 	roof beam 	1
7125 	to tremble 	— 	to twinkle, glimmer 	1
7126 	to sculpt in clay 	→ 	to slander 	1
7127 	angry 	— 	to strike, hit 	1
7128 	varicose veins 	— 	wickerwork 	1
7129 	to unite 	→ 	to give birth to twins 	1
7130 	to unite 	→ 	to take one thing for another 	1
7131 	torch 	→ 	flag, banner 	2
7132 	torch 	→ 	asphodel 	1
7133 	to throw on the ground 	→ 	to slander 	1
7134 	to smear, anoint 	→ 	to slander 	2
7135 	to watch, stare 	→ 	awake 	1
7136 	<vessel> 	→ 	ravine 	1
7137 	stingy 	— 	jealous 	1
7138 	to thresh (grain) 	— 	to tell a person's fortune 	1
7139 	to stab with a spear 	→ 	to jump into the water 	1
7140 	to jump into the water 	→ 	to swim 	1
7141 	bad (ethically) 	→ 	severe, harsh 	1
7142 	nose 	— 	root (of a plant) 	5
7143 	bad 	→ 	bad (ethically) 	4
7144 	bad 	→ 	garbage 	1
7145 	to eat 	→ 	breakfast 	4
7146 	to break (tr.) 	→ 	to make, create 	4
7147 	eternity 	→ 	grave, tomb 	1
7148 	tree 	→ 	destiny 	1
7149 	beetle 	→ 	enthusiastic person 	1
7150 	to pay attention 	— 	to beware, be careful 	5
7151 	<wooden object> 	→ 	lazy person 	1
7152 	respected, venerable 	— 	strong 	1
7153 	to suffer 	— 	to try, to attempt 	1
7154 	dissolute 	→ 	hybrid 	1
7155 	dissolute 	→ 	malignant (of tumor) 	1
7156 	to corrupt, deprave 	→ 	to leave untreated (disease) 	1
7157 	step, pace 	→ 	act, deed 	9
7158 	brave 	— 	dangerous 	1
7159 	strong 	— 	dangerous 	1
7160 	brave 	→ 	to threaten 	1
7161 	brave 	— 	vigorous 	1
7162 	dragon 	→ 	cruel 	1
7163 	cuckoo 	→ 	May 	2
7164 	to flap, wave 	→ 	to look around 	1
7165 	to sober up 	→ 	to lose smell or taste (of liquids) 	1
7166 	dragon 	— 	thunder 	21
7167 	tower 	→ 	rook (chess) 	26
7168 	white 	→ 	grey-haired 	6
7169 	white 	→ 	kind, good-hearted 	2
7170 	white 	→ 	albumen, white of an egg 	7
7171 	white 	→ 	Arctic fox 	8
7172 	white 	→ 	swan 	8
7173 	horn 	→ 	fenugreek 	4
7174 	swan 	→ 	pale 	1
7175 	white 	→ 	protein 	1
7176 	mind (n.) 	— 	advice 	2
7177 	chaffinch 	→ 	common bullfinch 	2
7178 	many-coloured, motley 	→ 	European whitefish 	1
7179 	spruce (Picea) 	→ 	crossbill (Loxia) 	1
7180 	shrike (Lanius) 	— 	crossbill (Loxia) 	1
7181 	executioner 	→ 	shrike (Lanius) 	2
7182 	butcher 	→ 	shrike (Lanius) 	2
7183 	tiger 	→ 	shrike (Lanius) 	1
7184 	torn 	→ 	bad 	1
7185 	throat 	→ 	instep 	1
7186 	substitution 	→ 	pronoun 	5
7187 	autumn fall of the leaves 	→ 	November 	4
7188 	slaughter 	→ 	November 	2
7189 	polar night 	→ 	November 	1
7190 	death 	→ 	November 	1
7191 	cold 	→ 	November 	6
7192 	Saint George’s Day 	→ 	November 	1
7193 	gold 	→ 	globeflower 	2
7194 	spleen (anat.) 	→ 	golden-saxifrage 	4
7195 	gold 	→ 	golden-saxifrage 	1
7196 	gold 	→ 	goldenrod 	6
7197 	spleen (anat.) 	→ 	goldenrod 	1
7198 	sharp 	→ 	steel 	1
7199 	fat, lard 	— 	bone marrow 	3
7200 	foam 	→ 	lumpen 	2
7201 	dissimilar, distinct 	— 	unusual 	1
7202 	to be, exist 	→ 	to be situated 	5
7203 	bee 	→ 	bumblebee 	4
7204 	to eat 	— 	to graze 	1
7205 	elder sister 	→ 	elder brother 	2
7206 	tree 	— 	stick (n.) 	6
7207 	how many? 	— 	few, little 	1
7208 	to pull up (a plant) 	→ 	to subtract 	1
7209 	dust 	— 	powder 	4
7210 	worry, anxiety 	— 	to be interested in 	2
7211 	to cut one's hair 	— 	to shave 	3
7212 	good 	— 	tidy, neat 	1
7213 	good 	→ 	dear, darling 	1
7214 	good 	→ 	simple 	1
7215 	joy 	— 	active, agile 	1
7216 	keen (of senses) 	— 	light, bright, clear 	1
7217 	tundra 	— 	earth, soil 	1
7218 	to sweep 	— 	to wipe 	1
7219 	bear garlic 	— 	onion 	1
7220 	boy 	↔ 	child 	34
7221 	to freeze, congeal 	— 	to coagulate, curdle 	1
7222 	solid crust on snow 	→ 	spring (season) 	1
7223 	clothes 	— 	ware, goods 	1
7224 	clothes 	— 	thing 	2
7225 	to put into 	→ 	to switch on 	1
7226 	top of the head 	→ 	smoke hole in a tent-like home 	1
7227 	to calculate, count 	— 	to measure 	1
7228 	to flow into 	→ 	to become a member of 	1
7229 	to open one's mouth 	→ 	to set a trap 	1
7230 	to rejoice 	→ 	to congratulate 	1
7231 	quick 	— 	early 	5
7232 	to emerge from the water 	→ 	to rise (of Moon, Sun) 	1
7233 	top of the head 	↔ 	fontanelle 	15
7234 	spring, fountain 	→ 	fontanelle 	3
7235 	fontanelle 	→ 	weak point 	1
7236 	black 	→ 	land (vs. sea) 	2
7237 	to pound (of the pulse) 	→ 	fontanelle 	2
7238 	grandfather 	— 	husband's elder brother 	1
7239 	ant 	→ 	rust (n.) 	1
7240 	to mix, stir 	→ 	to flow into 	1
7241 	sacred, holy 	→ 	feast, holiday 	7
7242 	idle 	→ 	feast, holiday 	4
7243 	colour 	→ 	sunset 	1
7244 	to press 	→ 	to iron 	1
7245 	to make a bonfire 	→ 	to arrange a banquet 	1
7246 	wood shavings 	— 	moss 	1
7247 	to grind (with the pestle) 	— 	to sting 	1
7248 	under, below 	→ 	mistress, paramour 	1
7249 	to lose (an object) 	→ 	to bury, inter 	1
7250 	to mix, stir 	— 	to add 	1
7251 	evil spirit 	→ 	magnet 	1
7252 	evil spirit 	→ 	mushroom 	2
7253 	evil spirit 	→ 	tuberculosis 	1
7254 	to take out 	→ 	to vomit 	1
7255 	to cut out 	→ 	to castrate 	1
7256 	to squeeze 	→ 	to milk 	24
7257 	from land to shore 	— 	downwards 	1
7258 	to launch a boat 	— 	to take down 	1
7259 	to pull ashore 	— 	to remove from fire 	1
7260 	fearful, dreadful 	→ 	tiger 	1
7261 	to throw 	→ 	to send 	2
7262 	to throw 	→ 	to spend (money) 	2
7263 	edge, border 	→ 	end (space) 	3
7264 	to stand 	→ 	to suit (of clothes etc.) 	4
7265 	hour 	→ 	class, lesson 	6
7266 	to stand, take a fixed vertical position 	→ 	to begin (tr.) 	3
7267 	high (location) 	→ 	good 	1
7268 	mother 	→ 	origin 	3
7269 	free 	→ 	brave 	1
7270 	blue 	→ 	blonde 	2
7271 	fish 	→ 	girl 	1
7272 	fruit 	↔ 	child (son or daughter) 	5
7273 	watch, clock 	→ 	meter (device) 	3
7274 	bath 	→ 	Saturday 	3
7275 	sacred, holy 	→ 	Sunday 	5
7276 	rest (n.) 	→ 	Saturday 	1
7277 	sabbath 	→ 	Saturday 	2
7278 	sixth 	→ 	Friday 	1
7279 	Sunday 	→ 	Monday 	12
7280 	sabbath 	→ 	meeting of witches 	10
7281 	sun 	→ 	gold 	2
7282 	sun 	→ 	fever 	2
7283 	sacred, holy 	→ 	Saturday 	1
7284 	female breast 	→ 	wet-nurse 	1
7285 	winter 	→ 	December 	3
7286 	short (size) 	→ 	December 	1
7287 	twelve 	→ 	December 	7
7288 	ten 	→ 	December 	2
7289 	Christmas 	→ 	December 	9
7290 	Jesus Christ 	→ 	December 	1
7291 	dark (adj.) 	→ 	December 	2
7292 	St. Andrew 	→ 	December 	4
7293 	wind 	→ 	December 	2
7294 	Advent 	→ 	December 	4
7295 	snow 	→ 	December 	1
7296 	Sagittarius 	→ 	December 	2
7297 	to hit the target 	→ 	to find 	1
7298 	heat (n.) 	↔ 	sun 	5
7299 	uncultivated, unprocessed 	→ 	rude, impolite 	1
7300 	sun 	↔ 	hour 	4
7301 	big 	→ 	February 	1
7302 	hot 	→ 	August 	1
7303 	rain 	→ 	March 	1
7304 	leaf 	→ 	May 	2
7305 	summer 	→ 	July 	3
7306 	colored leaves 	→ 	October 	1
7307 	cold 	→ 	December 	5
7308 	autumn 	→ 	September 	12
7309 	spring (season) 	→ 	April 	1
7310 	to cross a river 	— 	to cross a mountain range 	1
7311 	handle, gripe 	— 	spout of vessel 	1
7312 	world 	— 	god 	1
7313 	to snore 	— 	to purr 	1
7314 	to shine, glitter 	— 	to rejoice 	1
7315 	clever, wise 	— 	kind, good-hearted 	1
7316 	to lean on/against 	— 	to moor 	1
7317 	to play (intr.) 	— 	to play (a musical instrument) 	13
7318 	to move (tr.) 	— 	to dislocate (of a joint) 	1
7319 	eagle 	→ 	January 	1
7320 	crow 	→ 	February 	1
7321 	rainbow smelt 	→ 	April 	1
7322 	wagtail (Motacilla) 	→ 	March 	1
7323 	redfin dace 	→ 	May 	1
7324 	burdock 	→ 	June 	1
7325 	pink salmon (Oncorhynchus gorbuscha) 	→ 	July 	1
7326 	chum salmon 	→ 	August 	1
7327 	lingonberry 	→ 	September 	1
7328 	boat 	→ 	November 	1
7329 	year 	→ 	December 	3
7330 	to sing 	→ 	Eurasian skylark 	1
7331 	to sing 	→ 	to perform a shamanistic ritual 	1
7332 	sun 	→ 	year 	9
7333 	sun 	→ 	moon 	29
7334 	sun 	→ 	<money> 	3
7335 	sun 	— 	dry season 	2
7336 	sun 	→ 	summer 	7
7337 	thunder 	→ 	Eurasian skylark 	1
7338 	China 	→ 	rice 	1
7339 	hard, solid 	→ 	greedy 	7
7340 	strong 	— 	important 	1
7341 	to pray 	— 	to bow down 	1
7342 	to bow down 	→ 	to worship 	2
7343 	to steer a vessel 	→ 	to govern, control, rule 	4
7344 	ear 	→ 	mushroom 	7
7345 	blood 	→ 	petroleum, oil 	1
7346 	to turn into (tr.) 	→ 	to appoint (to a position) 	1
7347 	basket 	→ 	vagina 	1
7348 	sun 	— 	god 	16
7349 	sun 	— 	period of time 	2
7350 	sun 	— 	season (of the year) 	2
7351 	time 	— 	season (of the year) 	4
7352 	sun 	— 	age 	2
7353 	sun 	— 	yolk 	1
7354 	to fall down 	→ 	West 	2
7355 	sun 	— 	thirst 	8
7356 	Sunday 	→ 	sabbath 	1
7357 	to lie (posture) 	→ 	to inhabit, live 	7
7358 	to crawl 	→ 	slippery 	1
7359 	many-coloured, motley 	→ 	lynx 	1
7360 	to spring, jump 	→ 	move (board games) 	1
7361 	to spring, jump 	→ 	unit of length 	1
7362 	hip joint 	— 	hinge 	1
7363 	sun 	→ 	month 	7
7364 	great-grandmother 	→ 	bear (Ursus) 	1
7365 	will, intention 	— 	freedom 	5
7366 	to make a mistake, be wrong 	→ 	to die 	1
7367 	to wither 	→ 	to die 	1
7368 	to behave oneself 	— 	to fear, be afraid 	1
7369 	to follow each other 	— 	to do something one after another 	1
7370 	to bend (tr.) 	— 	to change direction 	1
7371 	to bend (tr.) 	→ 	to return (intr.) 	1
7372 	luck 	→ 	Sunday 	1
7373 	lattice, grid 	→ 	harrow 	6
7374 	stairs, ladder 	— 	harrow 	1
7375 	rake 	— 	harrow 	15
7376 	bird's foot 	→ 	rake 	2
7377 	comb 	— 	rake 	4
7378 	winter solstice 	→ 	Christmas 	4
7379 	spoke of wheel 	→ 	radius (bone) 	1
7380 	new year 	→ 	January 	7
7381 	cold 	→ 	January 	5
7382 	first 	→ 	January 	9
7383 	ice 	→ 	January 	3
7384 	middle, centre 	→ 	January 	1
7385 	moon 	→ 	January 	1
7386 	makara 	→ 	Capricorn 	5
7387 	dry 	→ 	January 	1
7388 	Capricorn 	→ 	January 	2
7389 	snow 	→ 	January 	1
7390 	calendar 	→ 	January 	2
7391 	fireplace 	→ 	January 	1
7392 	to cut 	→ 	January 	2
7393 	light (vs. heavy) 	→ 	light, bright, clear 	4
7394 	stone (piece of rock) 	→ 	pupil (of an eye) 	3
7395 	stone (piece of rock) 	→ 	<measure of weight> 	3
7396 	stone (piece of rock) 	→ 	egg 	2
7397 	stone (piece of rock) 	→ 	clot of blood 	1
7398 	stone (piece of rock) 	→ 	talisman 	2
7399 	stone (piece of rock) 	→ 	tooth 	2
7400 	stone (piece of rock) 	→ 	grain, seed 	17
7401 	stone (piece of rock) 	→ 	fetus 	1
7402 	stone (piece of rock) 	→ 	asleep 	1
7403 	stone (piece of rock) 	→ 	money 	10
7404 	stone (material) 	→ 	iron 	3
7405 	stone (piece of rock) 	→ 	shoulder-blade, scapula 	1
7406 	stone (piece of rock) 	→ 	heart 	4
7407 	spine, backbone 	— 	spindle 	1
7408 	spine, backbone 	→ 	back (body part) 	4
7409 	silver 	→ 	dear, darling 	2
7410 	one hundred thousand 	→ 	many, much 	1
7411 	metal 	— 	glass (material) 	3
7412 	metal 	→ 	silver 	2
7413 	wampum 	— 	money 	1
7414 	stone (material) 	→ 	metal 	3
7415 	money 	→ 	expensive 	1
7416 	bronze 	→ 	silver 	1
7417 	bronze 	→ 	gold 	1
7418 	grey 	→ 	silver 	1
7419 	hard, solid 	→ 	silver 	1
7420 	silver 	→ 	aluminium 	3
7421 	metal 	→ 	instrument, tool 	1
7422 	metal 	→ 	bell 	1
7423 	sky 	— 	rain 	4
7424 	mortar (bowl) 	— 	bell 	1
7425 	green 	→ 	grey 	2
7426 	lock (n.) 	→ 	fortress 	7
7427 	sour 	→ 	gloomy, depressed 	2
7428 	<container> 	→ 	to trade 	1
7429 	good 	→ 	left 	2
7430 	mosquito, gnat 	— 	nettle (Urtica) 	1
7431 	below, down, bottom part 	→ 	North 	12
7432 	urine 	→ 	ant 	10
7433 	dry 	→ 	pure 	2
7434 	to come into existence 	→ 	to rise (of Moon, Sun) 	1
7435 	black 	→ 	blackberry 	1
7436 	Shevat 	→ 	February 	3
7437 	wolf 	→ 	February 	3
7438 	cruel 	→ 	February 	3
7439 	second (num.) 	→ 	February 	8
7440 	bead 	→ 	February 	1
7441 	Aquarius (constellation) 	→ 	February 	3
7442 	rut 	→ 	February 	1
7443 	Fat Tuesday 	→ 	February 	1
7444 	mud 	→ 	February 	1
7445 	eagle 	→ 	February 	1
7446 	sucker-fish (Catostomidae) 	→ 	February 	1
7447 	winter 	→ 	February 	1
7448 	knot 	→ 	unit of speed 	30
7449 	to let someone get ahead 	→ 	dear, darling 	1
7450 	dog 	→ 	blackcurrant 	1
7451 	dog 	→ 	rude, impolite 	1
7452 	expensive 	→ 	respected, venerable 	2
7453 	dawn 	— 	melody, tune 	1
7454 	white 	→ 	white of an eye, sclera 	21
7455 	copper 	→ 	aluminium 	1
7456 	to take 	→ 	to defeat, win 	4
7457 	face 	→ 	stone in a ring 	1
7458 	to become clear (of sky) 	→ 	to disappear 	1
7459 	fire 	— 	stone in a ring 	1
7460 	ready 	→ 	almost 	2
7461 	afterwards, later 	→ 	to follow logically, consequently 	2
7462 	nephew 	→ 	warrior 	1
7463 	wind 	→ 	meaningless 	1
7464 	in this way 	→ 	to follow logically, consequently 	3
7465 	sky 	— 	time 	2
7466 	season (of the year) 	— 	weather 	4
7467 	air 	— 	sky 	8
7468 	to seize 	→ 	clothes 	2
7469 	gold 	→ 	diamonds (in cards) 	1
7470 	to press 	→ 	to defeat, win 	2
7471 	ten 	→ 	mountain pass 	1
7472 	time 	→ 	verb 	3
7473 	stoker 	→ 	driver (of a motorized vehicle) 	1
7474 	coachman 	→ 	driver (of a motorized vehicle) 	1
7475 	eye 	→ 	hope, expectation 	2
7476 	to wait 	→ 	pregnant 	1
7477 	fish 	→ 	osprey (Pandion haliaёtus) 	11
7478 	sea 	→ 	osprey (Pandion haliaёtus) 	2
7479 	river 	→ 	osprey (Pandion haliaёtus) 	3
7480 	water 	→ 	osprey (Pandion haliaёtus) 	2
7481 	to dive 	→ 	osprey (Pandion haliaёtus) 	1
7482 	tortoise, turtle 	→ 	armadillo 	1
7483 	near 	→ 	relative (n.) 	2
7484 	water-melon (Cucurbita citrullus) 	→ 	sphere; ball 	1
7485 	opposite (space) 	→ 	against 	2
7486 	cup 	→ 	buttock 	1
7487 	to move (intr.) 	→ 	artery 	1
7488 	power, authority 	→ 	artery 	1
7489 	eyebrow 	→ 	front part 	1
7490 	whale 	→ 	fool 	1
7491 	layer 	→ 	time (instance) 	1
7492 	badger (Meles) 	↔ 	honey badger 	11
7493 	badger (Meles) 	— 	jackal 	1
7494 	badger (Meles) 	— 	porcupine 	1
7495 	pig (Sus scrofa) 	→ 	porcupine 	6
7496 	porcupine 	↔ 	hedgehog (Еrinaceus) 	2
7497 	hard, solid 	→ 	rich 	1
7498 	<vessel> 	→ 	skull 	14
7499 	heavy (of weight) 	→ 	fat (adj., of a person) 	1
7500 	to polish 	→ 	to render a wall 	1
7501 	to begin (intr.) 	→ 	to put into 	1
7502 	wind 	→ 	chickenpox 	10
7503 	hen 	→ 	chickenpox 	3
7504 	water 	→ 	chickenpox 	13
7505 	wolf 	→ 	chickenpox 	1
7506 	lamb 	→ 	chickenpox 	1
7507 	term (chronological) 	→ 	urgent 	3
7508 	wind 	→ 	direction 	1
7509 	ship, vessel 	→ 	airplane 	13
7510 	tadpole 	— 	mosquito larva 	1
7511 	child 	→ 	mosquito larva 	1
7512 	mosquito larva 	→ 	comma 	1
7513 	child (son or daughter) 	→ 	subordinate (n.) 	3
7514 	fruit 	→ 	round object 	1
7515 	to cut 	→ 	comma 	3
7516 	stick (n.) 	→ 	comma 	2
7517 	crook, hooked stick 	→ 	comma 	1
7518 	thorn 	→ 	comma 	1
7519 	sickle 	→ 	comma 	1
7520 	yolk 	↔ 	yellow 	20
7521 	kidney 	→ 	side (body part) 	1
7522 	second (num.) 	→ 	bran 	2
7523 	to pull up (a plant) 	→ 	to disagree 	1
7524 	air 	— 	soul, spirit 	1
7525 	hundred 	→ 	myriapod 	20
7526 	forty 	→ 	myriapod 	9
7527 	thousand 	→ 	myriapod 	14
7528 	to fill (tr.) 	→ 	to remain, stay 	1
7529 	to fill (tr.) 	— 	to load (weapon) 	2
7530 	fang 	— 	claw 	1
7531 	to monitor, supervise 	— 	to prohibit 	1
7532 	beet (Beta vulgaris) 	— 	black radish 	1
7533 	street 	— 	ravine 	1
7534 	<hat> 	→ 	man (male) 	1
7535 	headscarf 	→ 	woman 	1
7536 	sheet of paper 	→ 	talisman 	1
7537 	to sleep 	→ 	dormouse 	7
7538 	<priest> 	→ 	clever, wise 	1
7539 	<priest> 	→ 	prophet 	1
7540 	current, flow, stream 	→ 	speed, velocity 	1
7541 	black 	→ 	ermine; stoat (Mustela erminea) 	4
7542 	moon 	→ 	sickle 	1
7543 	scythe 	→ 	bow, fiddlestick 	1
7544 	crime 	→ 	fine, penalty 	1
7545 	pitchfork 	→ 	thymus 	1
7546 	to change (tr.) 	→ 	to betray 	1
7547 	pitchfork 	→ 	slingshot 	1
7548 	horned 	→ 	slingshot 	3
7549 	satintails (Imperata) 	→ 	wood small-reed 	1
7550 	white 	→ 	wood small-reed 	1
7551 	white 	→ 	sorghum 	1
7552 	white 	→ 	beluga sturgeon 	3
7553 	white 	→ 	beloribitsa 	8
7554 	white 	→ 	saiga antelope 	1
7555 	white 	→ 	common jasmine 	1
7556 	white 	→ 	parsley 	1
7557 	white 	→ 	horseradish 	1
7558 	white 	→ 	belladonna 	1
7559 	white 	→ 	white-eye bream 	7
7560 	spring, fountain 	→ 	sparkling wine 	1
7561 	white 	→ 	ermine; stoat (Mustela erminea) 	5
7562 	white 	→ 	weasel (Mustella nivalis) 	2
7563 	white 	→ 	bog-rosemary 	2
7564 	swamp 	→ 	bog-rosemary 	3
7565 	white 	→ 	ide (fish) 	1
7566 	white 	→ 	asp (fish) 	2
7567 	white 	→ 	melon (Cucumis melo) 	1
7568 	white 	→ 	noble 	1
7569 	to make white 	→ 	to acquit 	1
7570 	to make white 	→ 	to castrate 	1
7571 	nurse 	→ 	nurse (junior medical staff) 	1
7572 	sister 	→ 	nurse (junior medical staff) 	18
7573 	female servant, maid 	→ 	nurse (junior medical staff) 	1
7574 	to suck 	→ 	to smoke (tobacco) 	4
7575 	to grow (plants) 	→ 	plant (biol.) 	43
7576 	work (n.) 	→ 	misfortune 	1
7577 	mandrake 	→ 	belladonna 	2
7578 	salsify 	→ 	horseradish 	1
7579 	radish 	→ 	horseradish 	8
7580 	beard 	→ 	salsify 	3
7581 	to help, aid 	→ 	to cast a spell 	1
7582 	guest 	→ 	beloved 	1
7583 	to blow (about wind) 	→ 	to dry 	1
7584 	perch (Perca fluviatilis) 	→ 	pondweed 	1
7585 	to ride (e.g., a horse) 	→ 	to sail 	2
7586 	to drive, force to move on 	↔ 	to ride (e.g., a horse) 	2
7587 	to drive, force to move on 	→ 	to make blunt 	1
7588 	to move down (tr.) 	→ 	to diminish 	3
7589 	to move down (tr.) 	→ 	to demote 	1
7590 	mushroom 	→ 	birch bolete (Leccinum scabrum) 	1
7591 	dog 	→ 	fly agaric (Amanita muscaria) 	1
7592 	branch, twig 	— 	leaves of root vegetables 	1
7593 	wide, broad 	— 	long (size) 	4
7594 	thief 	— 	mediator 	1
7595 	heavy (of weight) 	→ 	to offend (tr.) 	1
7596 	spear 	— 	reed 	1
7597 	to blow 	→ 	dandelion 	4
7598 	to add 	→ 	to drive, force to move on 	1
7599 	reed 	— 	arrow 	8
7600 	rook 	→ 	March 	1
7601 	pigeon (Columba) 	→ 	April 	1
7602 	spring (season) 	→ 	March 	5
7603 	swan 	→ 	March 	2
7604 	snow-crust 	→ 	March 	1
7605 	crow 	→ 	March 	1
7606 	maple sugar 	→ 	March 	1
7607 	goose 	→ 	March 	1
7608 	earth, soil 	→ 	March 	1
7609 	third 	→ 	March 	7
7610 	Pisces 	→ 	March 	2
7611 	foal 	→ 	March 	1
7612 	Nowruz 	→ 	March 	1
7613 	honour 	→ 	March 	1
7614 	to untie, unbind 	→ 	to abolish 	1
7615 	third-person singular 	→ 	devil, satan 	4
7616 	oat 	— 	cereal 	1
7617 	to undress (tr.) 	→ 	to copulate 	1
7618 	comb (of a bird) 	→ 	eaves 	1
7619 	to end, finish 	→ 	to fulfill a vow 	1
7620 	to end, finish 	→ 	to ripen 	1
7621 	to shut, close 	→ 	to imprison 	5
7622 	birch 	→ 	March 	4
7623 	birch 	→ 	April 	2
7624 	sap (of a plant) 	→ 	March 	1
7625 	sound 	→ 	noise 	6
7626 	voice 	→ 	noise 	4
7627 	to apologize 	— 	stingy 	1
7628 	paper 	— 	venereal disease 	1
7629 	paper 	→ 	to read 	1
7630 	to do, act 	— 	to inhabit, live 	1
7631 	to boil (intr.) 	→ 	abundance 	2
7632 	to boil (intr.) 	→ 	to waste 	1
7633 	slippery 	→ 	unreliable 	1
7634 	slippery 	→ 	stolen 	1
7635 	to boil (intr.) 	→ 	to weld 	1
7636 	goose 	→ 	fool 	9
7637 	accident 	— 	destiny 	2
7638 	<ethnic group> 	→ 	<clothes> 	4
7639 	seat, chair 	→ 	post of employment 	13
7640 	to judge 	→ 	destiny 	2
7641 	storm 	→ 	accident 	1
7642 	to butt 	— 	to stamp one's foot 	1
7643 	blood 	→ 	little finger 	1
7644 	to sow 	— 	to mill, grind 	1
7645 	to cut 	→ 	yarrow 	3
7646 	wound (n.) 	→ 	yarrow 	2
7647 	to clean 	→ 	to flog 	2
7648 	cotton 	→ 	to grow numb 	2
7649 	to pinch 	→ 	to feel pain, ache 	3
7650 	to pinch 	→ 	to pluck (bird) 	1
7651 	blood 	→ 	yarrow 	2
7652 	skilful, dexterous 	— 	bully 	1
7653 	to thrust (into) 	→ 	horse-fly (Tabanidae) 	1
7654 	shy 	— 	fragile 	1
7655 	further 	→ 	immediately 	1
7656 	to understand 	— 	to know how 	1
7657 	owner (female) 	→ 	house spirit 	1
7658 	owner (female) 	→ 	mother of one's husband 	1
7659 	goat 	→ 	homosexual 	1
7660 	goat 	→ 	champignon (Agaricus) 	2
7661 	to seem 	— 	to jeer, scoff 	1
7662 	bald 	→ 	fool 	1
7663 	god 	→ 	icon (christianity) 	1
7664 	hump (of a person or camel) 	→ 	Eurasian woodcock 	1
7665 	horsehair 	→ 	horsehair worm 	7
7666 	string (of a musical instrument) 	→ 	horsehair worm 	1
7667 	hair 	→ 	horsehair worm 	3
7668 	grain, seed 	→ 	cereal 	3
7669 	hare (Lepus) 	→ 	lily-of-the-valley (Convallaria majalis) 	1
7670 	hare (Lepus) 	→ 	clover 	2
7671 	line 	→ 	rainbow 	1
7672 	to bite 	→ 	to scold 	2
7673 	tooth 	→ 	bully 	1
7674 	<vessel> 	→ 	scatterbrain 	1
7675 	step, pace 	→ 	stitch 	1
7676 	to steam out 	→ 	to hatch eggs 	4
7677 	opening of a sack 	→ 	scatterbrain 	1
7678 	magpie (Pica pica) 	→ 	scatterbrain 	1
7679 	powder-like 	— 	weak 	1
7680 	thin (of an object) 	— 	weak 	2
7681 	dung 	→ 	fallow 	1
7682 	steam, vapour 	→ 	fallow 	3
7683 	to rot, putrefy 	→ 	fallow 	1
7684 	summer 	— 	fallow 	1
7685 	to ski 	— 	to crawl 	1
7686 	grass, herb 	— 	hay 	5
7687 	tree 	→ 	plant (biol.) 	9
7688 	flower 	→ 	plant (biol.) 	3
7689 	grain, seed 	→ 	plant (biol.) 	3
7690 	to slide 	→ 	to ski 	1
7691 	seam 	→ 	Milky Way 	6
7692 	to see/to look at 	→ 	to respect 	3
7693 	smoke 	→ 	drunk 	2
7694 	time 	→ 	quite, rather 	1
7695 	substance, material 	→ 	school subject 	1
7696 	substance, material 	→ 	text 	1
7697 	back (body part) 	— 	buttock 	1
7698 	blind + eye 	→ 	temple (body part) 	3
7699 	Easter 	→ 	May 	2
7700 	region 	— 	family 	1
7701 	face 	→ 	sun 	1
7702 	needle-leaved forest 	→ 	dry sandy soil 	2
7703 	bronze 	→ 	mirror 	2
7704 	<animal> 	→ 	novice 	2
7705 	copper 	→ 	Anguis fragilis 	3
7706 	copper 	→ 	smooth snake 	3
7707 	smooth (surface) 	→ 	smooth snake 	4
7708 	nut, hazel 	→ 	smooth snake 	2
7709 	shy 	— 	sensitive 	1
7710 	price 	— 	fame, reputation 	1
7711 	to move (tr.) 	→ 	to be fast (of clocks, watches) 	1
7712 	to move (intr.) 	→ 	to suffice, be enough 	1
7713 	to live, be alive 	→ 	cereal 	12
7714 	life 	→ 	noise 	1
7715 	first 	→ 	next 	1
7716 	first 	→ 	best 	6
7717 	mouse 	→ 	child (vs. adult) 	3
7718 	lunch, midday meal 	→ 	sun 	1
7719 	bow (weapon) 	→ 	violine 	2
7720 	mouse 	↔ 	thief 	2
7721 	white 	— 	ice 	3
7722 	mark of wheels on the ground 	— 	river-bed 	1
7723 	sun 	→ 	starfish 	1
7724 	day 	— 	time 	2
7725 	smell (n.) 	— 	mind (n.) 	1
7726 	light, bright, clear 	— 	dear, darling 	1
7727 	mane 	→ 	brush 	1
7728 	grey 	→ 	grey-haired 	8
7729 	smoke 	→ 	grey 	1
7730 	mouse 	→ 	grey 	1
7731 	hoar-frost 	→ 	grey 	2
7732 	ashes 	→ 	dead (adj.) 	1
7733 	hay 	→ 	July 	10
7734 	to throw 	→ 	to end, finish 	1
7735 	to throw 	→ 	to undress (intr.) 	1
7736 	to go down 	— 	to pretend 	1
7737 	light, bright, clear 	— 	sonorous 	1
7738 	light, bright, clear 	→ 	famous 	2
7739 	sonorous 	→ 	famous 	1
7740 	pearl 	→ 	bead 	4
7741 	lord, master 	→ 	furuncle 	2
7742 	mouse 	→ 	common buzzard 	1
7743 	sweat 	→ 	downy birch 	1
7744 	fearful, dreadful 	→ 	unpleasant 	5
7745 	cold 	— 	pale 	1
7746 	hoar-frost 	— 	mist, fog 	1
7747 	to spring, jump 	→ 	to be naughty, mischievous 	1
7748 	to abolish 	— 	to lose (an object) 	1
7749 	flax 	→ 	bedsheet 	1
7750 	bedsheet 	→ 	screen (in cinema) 	1
7751 	sheet of paper 	→ 	newspaper 	13
7752 	sphere; ball 	→ 	lead, plumbum 	1
7753 	tin (n.) 	→ 	aluminium 	1
7754 	clay 	→ 	aluminium 	4
7755 	bark (of a tree) 	— 	cream (of milk) 	1
7756 	camp 	— 	bearing (mechanical device) 	2
7757 	noon, midday 	↔ 	lunch, midday meal 	3
7758 	hand/arm 	→ 	to govern, control, rule 	8
7759 	black 	→ 	European blueberry 	1
7760 	nail (metal spike) 	→ 	<measure of weight> 	1
7761 	beak 	→ 	cap peak 	1
7762 	advice 	— 	thought, idea 	1
7763 	to come, arrive 	→ 	to set (of Moon, Sun) 	1
7764 	horn 	→ 	plastic 	1
7765 	burn (physical injury) 	— 	fire (accident) 	1
7766 	fire (accident) 	→ 	misfortune 	2
7767 	water 	→ 	otter (Lutra lutra) 	16
7768 	river 	→ 	otter (Lutra lutra) 	3
7769 	otter (Lutra lutra) 	— 	mink 	1
7770 	fish 	→ 	otter (Lutra lutra) 	1
7771 	otter (Lutra lutra) 	→ 	nutria, coypu 	1
7772 	lunch, midday meal 	→ 	dinner, evening meal 	5
7773 	breakfast 	→ 	lunch, midday meal 	10
7774 	Easter 	→ 	April 	3
7775 	leaf 	→ 	April 	1
7776 	sap (of a plant) 	→ 	April 	2
7777 	flower 	→ 	April 	3
7778 	fast (n.) 	→ 	April 	1
7779 	Aries 	→ 	April 	2
7780 	fourth 	→ 	April 	6
7781 	cuckoo 	→ 	April 	1
7782 	Taurus 	→ 	April 	1
7783 	spring ice drift 	→ 	April 	1
7784 	seasonal flooding 	→ 	April 	1
7785 	oak 	→ 	April 	1
7786 	ploughing 	→ 	April 	1
7787 	skilled artisan 	— 	doctor, physician 	1
7788 	heel (of a foot) 	→ 	butt of the rifle 	1
7789 	heel (of a foot) 	→ 	butt of a log 	1
7790 	to lie (posture) 	→ 	sick, ill 	7
7791 	to hobble 	→ 	to brake 	1
7792 	shin 	— 	foot/leg 	1
7793 	fetlock 	→ 	bush, shrub 	1
7794 	ankle 	— 	fetlock 	2
7795 	beard 	→ 	fetlock 	1
7796 	brush 	→ 	fetlock 	1
7797 	anemic 	→ 	weak 	3
7798 	root (of a plant) 	— 	bread 	3
7799 	glass (material) 	— 	porcelain 	1
7800 	skin (of a person) 	— 	shell (of an egg) 	1
7801 	ploughing 	→ 	Eurasian skylark 	1
7802 	chili pepper 	→ 	hot-tempered 	1
7803 	cast iron 	→ 	pot 	4
7804 	dock-tailed, tailless 	→ 	endless, infinite 	1
7805 	dock-tailed, tailless 	→ 	childless 	1
7806 	thin (of an object) 	— 	liquid (adj.) 	1
7807 	trailer (vehicle) 	→ 	dependant 	1
7808 	wormwood 	— 	naphthalene 	1
7809 	to become visible 	→ 	to come into existence 	2
7810 	fire 	→ 	pyrite 	1
7811 	gold 	→ 	pyrite 	10
7812 	fool 	→ 	pyrite 	9
7813 	cat 	→ 	pyrite 	3
7814 	poor, needy 	→ 	pyrite 	1
7815 	gold 	→ 	biotite 	3
7816 	flea 	→ 	wormwood 	1
7817 	cat 	→ 	biotite 	4
7818 	horn 	→ 	drinking vessel 	1
7819 	template for making clothes 	→ 	role model 	1
7820 	bow-string 	— 	spring (mechanical device) 	1
7821 	string (of a musical instrument) 	— 	bow-string 	6
7822 	fallow deer 	→ 	brave 	1
7823 	nipple (part of the breast) 	→ 	spout of vessel 	1
7824 	wide, broad 	— 	fat (adj., of a person) 	1
7825 	market 	→ 	disorder, mess 	1
7826 	to stand near 	→ 	to adhere, support 	1
7827 	<noble rank, title> 	→ 	mother of one's husband 	1
7828 	to understand 	→ 	to have a good relationship 	1
7829 	proud 	— 	brave 	1
7830 	to destroy, annihilate 	— 	to spoil (tr.) 	1
7831 	to accelerate 	— 	to ease 	1
7832 	to soften (an object) 	→ 	to bring into a good mood 	1
7833 	to sit down 	→ 	to land (of plane, bird etc.) 	2
7834 	fellow traveller 	→ 	to adhere, support 	1
7835 	fellow traveller 	→ 	satellite of a planet 	5
7836 	dry 	— 	evident 	1
7837 	<horned animal> 	→ 	stag beetle 	18
7838 	to send 	→ 	to marry off (a daughter) 	1
7839 	game 	— 	wedding 	1
7840 	to strike, hit 	→ 	to sting 	1
7841 	to stand near 	→ 	to resign oneself 	1
7842 	to bite 	→ 	to sting 	5
7843 	strong (of liquid or smell) 	— 	spicy 	2
7844 	spicy 	— 	sour 	1
7845 	strong (of liquid or smell) 	— 	sour 	1
7846 	yes 	→ 	very, of high degree 	1
7847 	sound 	→ 	news 	3
7848 	to do, act 	→ 	verse 	1
7849 	ember 	→ 	Mars 	1
7850 	red 	→ 	Mars 	5
7851 	to open one's mouth 	→ 	to be inattentive 	1
7852 	rare 	— 	bad (ethically) 	1
7853 	sound 	→ 	echo 	4
7854 	rock, crag, cliff 	→ 	echo 	1
7855 	to hear 	→ 	pregnant 	1
7856 	to rattle, rumble 	→ 	to feel pain, ache 	1
7857 	crown (n.) 	→ 	<noble rank, title> 	1
7858 	pig (Sus scrofa) 	→ 	capybara 	8
7859 	to swim 	→ 	capybara 	1
7860 	widow 	→ 	swearword 	1
7861 	to wash 	→ 	to tin 	1
7862 	wolverine 	→ 	lazy person 	1
7863 	lead, plumbum 	— 	laxative 	1
7864 	earring 	→ 	bellflower (Campanula) 	1
7865 	sickle 	→ 	crescent 	7
7866 	earring 	→ 	crescent 	1
7867 	tusk (of animal) 	→ 	icicle 	2
7868 	spear 	→ 	icicle 	1
7869 	tongue (body part) 	→ 	icicle 	1
7870 	finger / toe 	→ 	icicle 	1
7871 	pillar 	→ 	icicle 	1
7872 	awl 	→ 	icicle 	1
7873 	roof 	→ 	icicle 	1
7874 	candle 	→ 	icicle 	3
7875 	reed 	→ 	icicle 	3
7876 	pike (fish) 	→ 	icicle 	1
7877 	steppe polecat (Mustela eversmanii) 	— 	Siberian weasel (Mustela sibirica) 	1
7878 	arrow 	→ 	straight 	1
7879 	news 	→ 	newspaper 	2
7880 	news 	→ 	interest 	1
7881 	trench 	— 	thread 	1
7882 	weak 	→ 	open (adj.) 	1
7883 	to ask, inquire 	— 	to learn, study 	5
7884 	tail 	→ 	pendulum 	1
7885 	tail 	→ 	last 	3
7886 	axe 	→ 	bit (of a key) 	3
7887 	beard 	→ 	bit (of a key) 	2
7888 	mesentery 	→ 	cirrus (clouds) 	1
7889 	feather 	→ 	cirrus (clouds) 	2
7890 	fin 	→ 	spoke of wheel 	1
7891 	to awaken, wake up 	→ 	to keep a fire burning 	1
7892 	raven 	→ 	brown meagre 	5
7893 	raven 	→ 	pickaxe 	1
7894 	man (male) 	→ 	thumb 	1
7895 	miracle 	↔ 	to be surprised 	9
7896 	to not believe one's eyes 	→ 	to be surprised 	2
7897 	to die 	→ 	to faint 	19
7898 	to lose one's mind 	→ 	to be surprised 	6
7899 	to freeze, become motionless 	→ 	to be surprised 	2
7900 	different 	→ 	excellent 	5
7901 	to be confused 	— 	to be surprised 	3
7902 	to be caught, found 	→ 	to be surprised 	1
7903 	to be struck by lightning 	→ 	to be surprised 	2
7904 	textile, cloth 	→ 	sail (n.) 	5
7905 	textile, cloth 	→ 	clothes 	3
7906 	clothes 	↔ 	dress (feminine) 	6
7907 	rag, duster 	→ 	spineless person 	4
7908 	shirt 	— 	dress (feminine) 	32
7909 	woman 	→ 	index finger 	1
7910 	to bite one's lip 	— 	to be surprised 	1
7911 	rag, duster 	→ 	sail (n.) 	2
7912 	curtain 	→ 	sail (n.) 	1
7913 	leaf 	→ 	sail (n.) 	2
7914 	five 	→ 	May 	5
7915 	sixth 	→ 	June 	6
7916 	seven 	→ 	July 	7
7917 	eight 	→ 	August 	12
7918 	nine 	→ 	September 	9
7919 	ten 	→ 	October 	6
7920 	eleven 	→ 	November 	6
7921 	bull 	→ 	Taurus 	7
7922 	Taurus 	→ 	May 	2
7923 	reindeer calf 	→ 	May 	2
7924 	flower 	→ 	May 	5
7925 	spawning 	→ 	May 	1
7926 	to milk 	→ 	May 	1
7927 	to sow 	→ 	May 	1
7928 	grass, herb 	→ 	May 	2
7929 	elder brother 	→ 	ring finger 	1
7930 	sugar 	→ 	sweets, candy 	9
7931 	<foreign country> 	→ 	sugar 	8
7932 	honey 	↔ 	sugar 	5
7933 	salt 	→ 	sugar 	6
7934 	palmyra palm 	→ 	sugar 	2
7935 	sugar 	→ 	brown 	2
7936 	sand 	→ 	sugar 	2
7937 	fire 	→ 	fire (accident) 	7
7938 	to hit by axe 	→ 	to thunder 	1
7939 	inner side of hide 	— 	sapwood, alburnum 	1
7940 	faeces 	→ 	lichen 	1
7941 	faeces 	→ 	<berry> 	1
7942 	to find 	→ 	to become infected 	1
7943 	to gather, collect 	→ 	to prepare 	1
7944 	smooth (surface) 	→ 	unforested, treeless place 	2
7945 	to smear, anoint 	→ 	to draw, paint 	3
7946 	fly (n.) 	→ 	bee 	7
7947 	campfire, bonfire 	→ 	starfish 	1
7948 	liver 	→ 	medusa, jellyfish 	1
7949 	bad 	→ 	syphilis 	1
7950 	to ask for, request 	— 	to need 	1
7951 	to ask for, request 	→ 	to invite 	2
7952 	near 	— 	soon 	2
7953 	sapwood, alburnum 	— 	mucus, slime 	1
7954 	to hold (in hands) 	→ 	to keep as a domestic animal 	2
7955 	penis 	— 	musk gland 	1
7956 	fat, lard 	— 	butter 	31
7957 	butter 	— 	vegetable oil 	40
7958 	new 	→ 	fresh 	4
7959 	to pull, to draw 	— 	to saw 	1
7960 	to go downstream 	→ 	to set (of Moon, Sun) 	1
7961 	echo 	— 	evil spirit 	1
7962 	to break (intr.) 	→ 	to wane (of the Moon) 	2
7963 	spinal cord 	→ 	pith, medulla 	2
7964 	to shine, glitter 	→ 	to distinguish 	1
7965 	jingle bell 	→ 	diamonds (in cards) 	2
7966 	tick (Acarina) 	— 	to drink 	1
7967 	tile 	→ 	diamonds (in cards) 	1
7968 	corner 	→ 	diamonds (in cards) 	2
7969 	peach 	→ 	hearts (in cards) 	1
7970 	peach 	→ 	spades (in cards) 	2
7971 	plum blossom 	→ 	clubs (in cards) 	2
7972 	fan (hand-held) 	→ 	spades (in cards) 	1
7973 	goad 	→ 	diamonds (in cards) 	1
7974 	papular eruption (on the skin) 	→ 	hearts (in cards) 	1
7975 	bud (of a flower) 	→ 	spades (in cards) 	1
7976 	tinea versicolor 	→ 	clubs (in cards) 	1
7977 	peanut 	→ 	clubs (in cards) 	1
7978 	faeces 	→ 	clubs (in cards) 	1
7979 	betel 	→ 	hearts (in cards) 	1
7980 	cavity, hollow 	→ 	hearts (in cards) 	1
7981 	red 	→ 	hearts (in cards) 	2
7982 	sword 	→ 	clubs (in cards) 	1
7983 	club (a weapon) 	→ 	spades (in cards) 	2
7984 	leaf 	→ 	clubs (in cards) 	1
7985 	bell 	→ 	clubs (in cards) 	1
7986 	mood 	→ 	humor 	6
7987 	flower 	→ 	comb (of a bird) 	1
7988 	flower 	→ 	auricle 	1
7989 	fin 	↔ 	ear 	7
7990 	tent 	→ 	auricle 	3
7991 	ladle 	→ 	auricle 	1
7992 	shell (of mollusc) 	→ 	auricle 	7
7993 	leaf 	→ 	auricle 	2
7994 	sail (n.) 	→ 	auricle 	1
7995 	fin 	→ 	blade, edge (of an instrument) 	1
7996 	leaf 	→ 	calf of a leg 	2
7997 	to talk nonsense 	→ 	to go mad 	1
7998 	elder brother 	— 	cousin (male) 	1
7999 	cousin (male) 	— 	uncle 	1
8000 	to hate, dislike 	→ 	to slander 	1
8001 	tidy, neat 	— 	beautiful 	1
8002 	grave, tomb 	— 	cemetery 	3
8003 	hind leg 	— 	backside 	1
8004 	present, gift 	— 	award 	1
8005 	backdrop (visual) 	— 	horizon 	1
8006 	horizon 	→ 	level 	1
8007 	wine 	→ 	spades (in cards) 	4
8008 	to find 	— 	to guess 	1
8009 	planting (in ground) 	— 	childbirth 	1
8010 	newborn baby 	— 	young growth 	1
8011 	to give birth 	→ 	to yield (of land) 	1
8012 	sheep 	— 	goat 	10
8013 	glue 	— 	aspic (dish) 	1
8014 	to crumble (intr.) 	→ 	to wander off 	1
8015 	to follow, go after smb. 	→ 	to listen 	2
8016 	many-coloured, motley 	→ 	goosander 	1
8017 	many-coloured, motley 	→ 	lemming 	2
8018 	face 	→ 	to resemble, be alike 	2
8019 	body 	— 	skeleton 	2
8020 	enemy 	→ 	<foreigner> 	3
8021 	child 	→ 	servant 	10
8022 	moon 	→ 	to calculate, count 	1
8023 	throat 	→ 	greedy 	1
8024 	to choose 	— 	to shine, glitter 	1
8025 	silver 	→ 	mercury 	15
8026 	dowry 	→ 	live-in son-in-law 	2
8027 	house 	→ 	live-in son-in-law 	4
8028 	to have equal rights 	→ 	to fall in love 	1
8029 	to ask for, request 	— 	to want 	1
8030 	to go, walk 	→ 	to function 	8
8031 	to work 	→ 	to function 	6
8032 	to work 	→ 	to gain, earn 	1
8033 	to work 	→ 	to try, to attempt 	1
8034 	far away 	— 	long (time) 	1
8035 	to speak 	→ 	to bequeath 	3
8036 	to promise 	→ 	to bequeath 	3
8037 	fire striker 	→ 	match (for fire) 	1
8038 	to guard 	→ 	to act according to 	3
8039 	to weave 	→ 	to reckon 	2
8040 	to cut 	→ 	definite, certain 	2
8041 	sharp 	→ 	homosexual 	1
8042 	<building> 	→ 	constellation 	12
8043 	to cut 	— 	to set 	1
8044 	to cut 	→ 	to speak 	1
8045 	to cut 	→ 	to think, consider 	1
8046 	to cut 	→ 	to sleep 	1
8047 	to cut 	→ 	to ferment, yeast 	1
8048 	dairy product 	→ 	fool 	2
8049 	backside 	↔ 	buttock 	6
8050 	clove, segment 	→ 	twin 	1
8051 	twin 	→ 	conjoined fruits 	7
8052 	nest (n.) 	— 	town, city 	1
8053 	<ethnic group> 	→ 	Romani 	7
8054 	edge, border 	→ 	mountain ridge 	1
8055 	to shine, glitter 	→ 	excellent 	3
8056 	wild, untamed 	→ 	unmarried, single, bachelor 	1
8057 	to search, look for 	→ 	to ask in marriage 	1
8058 	sadness, melancholy 	— 	remembrance 	2
8059 	to become clear (of sky) 	→ 	to sleep one's fill 	1
8060 	to become clear (of sky) 	→ 	to sober up 	1
8061 	larynx 	— 	aorta 	1
8062 	to pay 	— 	to award 	2
8063 	to recall, recollect 	— 	to dream (of) 	1
8064 	sensitive, keen (of hearing) 	→ 	obedient 	1
8065 	to hear / to listen 	→ 	attentive 	2
8066 	to take down 	→ 	to haul to shore 	1
8067 	land (vs. sea) 	— 	forest 	1
8068 	end (space) 	— 	horizon 	1
8069 	end (space) 	— 	peak of mountain 	4
8070 	end (space) 	— 	sharp point 	1
8071 	calm 	— 	idle 	1
8072 	to burn (intr.) 	→ 	to lose colour 	2
8073 	to burn (intr.) 	→ 	fuel 	14
8074 	to melt, thaw 	→ 	to feel tenderness, compassion 	6
8075 	firewood 	→ 	fuel 	4
8076 	raisin 	→ 	currant-bush 	1
8077 	younger brother 	→ 	little finger 	2
8078 	drinking vessel 	→ 	knee-cap 	3
8079 	<hat> 	→ 	knee-cap 	1
8080 	dumpling 	→ 	knee-cap 	1
8081 	cover, lid 	→ 	knee-cap 	4
8082 	head 	→ 	knee-cap 	2
8083 	wheel 	→ 	knee-cap 	1
8084 	disc 	→ 	knee-cap 	3
8085 	cake 	→ 	knee-cap 	1
8086 	shell (of mollusc) 	→ 	knee-cap 	1
8087 	plate (a serving dish) 	→ 	knee-cap 	1
8088 	entada (plant) 	→ 	knee-cap 	3
8089 	turnip 	→ 	knee-cap 	1
8090 	to play (intr.) 	→ 	to play (theater, movie) 	16
8091 	to play (intr.) 	→ 	to swarm (bees) 	1
8092 	shell (of mollusc) 	— 	skull 	2
8093 	thumb 	→ 	unit of length 	3
8094 	chief, boss 	— 	thumb 	1
8095 	inexperienced 	— 	New Zealand fur seal 	1
8096 	to bloom, blossom 	→ 	to be full (of the moon) 	1
8097 	to think, consider 	— 	spleen (anat.) 	1
8098 	wing 	→ 	fern 	3
8099 	wing 	→ 	kite (lightweight toy) 	1
8100 	wing 	— 	beard 	1
8101 	to fall down 	— 	to be defeated 	2
8102 	to fall down 	→ 	to be captured (of a fortress, etc.) 	5
8103 	heart 	— 	patience 	1
8104 	heart 	— 	breathing 	6
8105 	body 	→ 	hull (of a ship) 	5
8106 	pig (Sus scrofa) 	→ 	guinea pig (Cavia porcellus) 	31
8107 	forty 	→ 	many, much 	1
8108 	butterfly 	→ 	butterfly stroke 	19
8109 	dolphin 	→ 	butterfly stroke 	6
8110 	disease 	— 	death 	1
8111 	cloud 	— 	smoke 	11
8112 	channel, opening in a reef 	→ 	river 	1
8113 	mouth 	→ 	orator 	1
8114 	to search, look for 	— 	mad, insane 	1
8115 	marmot 	→ 	guinea pig (Cavia porcellus) 	2
8116 	nose 	→ 	clitoris 	1
8117 	mouse 	→ 	guinea pig (Cavia porcellus) 	7
8118 	age 	— 	youth 	1
8119 	hare (Lepus) 	→ 	guinea pig (Cavia porcellus) 	2
8120 	sea 	→ 	guinea pig (Cavia porcellus) 	19
8121 	belly 	→ 	sadness, melancholy 	1
8122 	spleen (anat.) 	→ 	sadness, melancholy 	2
8123 	female breast 	— 	water 	2
8124 	female breast 	— 	beautiful 	1
8125 	female breast 	— 	circle 	1
8126 	nipple (part of the breast) 	— 	bee 	1
8127 	female breast 	→ 	udder 	38
8128 	female breast 	— 	crab 	1
8129 	birch 	→ 	June 	1
8130 	summer solstice, St John's Day 	→ 	June 	2
8131 	fallow 	→ 	June 	3
8132 	to plant 	→ 	June 	1
8133 	female breast 	— 	children's food 	1
8134 	summer 	↔ 	June 	5
8135 	mother 	→ 	<game> 	1
8136 	arrow 	— 	bamboo 	1
8137 	strawberry (Fragaria moschata) 	→ 	June 	1
8138 	heart 	→ 	strawberry (Fragaria moschata) 	1
8139 	to exude (liquid) 	→ 	to feel tenderness, compassion 	1
8140 	inside 	— 	to be satisfied (sexually) 	1
8141 	handle, gripe 	— 	nipple (part of the breast) 	1
8142 	sound of kissing, sucking 	— 	nipple (part of the breast) 	1
8143 	term of address to a woman 	— 	exclamation of surprise, pain or sorrow 	1
8144 	<plant (biol.)> 	→ 	daughter 	2
8145 	noble 	→ 	cultivated (of person) 	1
8146 	daughter 	— 	bride 	1
8147 	daughter 	→ 	pupil (of an eye) 	3
8148 	scale insect 	→ 	June 	6
8149 	worm 	→ 	scale insect 	6
8150 	shield 	→ 	scale insect 	5
8151 	sweet cherry 	→ 	June 	3
8152 	to weed 	→ 	June 	1
8153 	young 	→ 	June 	1
8154 	pine-tree 	→ 	June 	1
8155 	water 	→ 	June 	1
8156 	linden 	→ 	June 	1
8157 	Gemini (constellation) 	→ 	June 	3
8158 	wild boar 	→ 	June 	1
8159 	guinea pig (Cavia porcellus) 	→ 	capybara 	1
8160 	circle 	→ 	yard, courtyard 	1
8161 	to pierce 	→ 	to enter 	1
8162 	land (vs. sea) 	→ 	countryside (vs. city) 	4
8163 	narrow 	→ 	street 	1
8164 	pig (Sus scrofa) 	→ 	mumps 	6
8165 	shrimp, prawn 	→ 	Aries 	1
8166 	to sharpen 	→ 	to set bounds 	1
8167 	to distinguish 	→ 	to restrict one's rights 	2
8168 	mother 	— 	companion, partner 	1
8169 	tea 	→ 	willowherb 	2
8170 	fire (accident) 	→ 	willowherb 	3
8171 	willow 	→ 	willowherb 	5
8172 	milk 	→ 	willowherb 	2
8173 	fluff / down (of feather) 	→ 	willowherb 	2
8174 	common jasmine 	→ 	mock-orange 	15
8175 	orange (plant) 	→ 	mock-orange 	2
8176 	tobacco pipe 	→ 	mock-orange 	5
8177 	lemon 	→ 	mock-orange 	1
8178 	<fruit> 	→ 	glans penis 	13
8179 	noble 	→ 	good (ethically) 	2
8180 	to press 	→ 	gloomy, depressed 	4
8181 	narrow, close 	→ 	gloomy, depressed 	3
8182 	narrow, close 	→ 	to fear, be afraid 	2
8183 	horse 	→ 	willowherb 	1
8184 	<name of person> 	→ 	willowherb 	3
8185 	cannabis 	→ 	willowherb 	3
8186 	to creak 	→ 	willowherb 	1
8187 	to break (intr.) 	→ 	to get tired 	2
8188 	gold 	↔ 	faeces 	2
8189 	destiny 	→ 	death 	2
8190 	evil spirit 	→ 	diabetes 	1
8191 	to calculate, count 	→ 	to intend 	9
8192 	owner 	→ 	author 	1
8193 	lord, master 	→ 	subject (grammar) 	4
8194 	vegetable oil 	→ 	ointment 	1
8195 	how many? 	→ 	some, several 	1
8196 	good 	→ 	good (ethically) 	2
8197 	enemy 	— 	army 	1
8198 	army 	→ 	battle 	2
8199 	wing 	→ 	bat 	5
8200 	to convalesce, recover from illness 	→ 	to have luck 	1
8201 	to dip 	→ 	to dye 	1
8202 	to dip 	→ 	to strike, hit 	1
8203 	beautiful 	→ 	good (ethically) 	5
8204 	joy 	→ 	May 	1
8205 	coin 	→ 	knee-cap 	1
8206 	smooth (surface) 	— 	smooth (movement) 	2
8207 	to lie (posture) 	→ 	to hatch eggs 	5
8208 	owner 	→ 	merchant 	1
8209 	to repaire, mend 	→ 	to reconcile 	3
8210 	harvest 	→ 	July 	2
8211 	nut, hazel 	→ 	July 	2
8212 	June 	→ 	July 	4
8213 	linden 	→ 	July 	4
8214 	to see/to look at 	→ 	to concern, be related to 	2
8215 	as, like 	→ 	because of 	4
8216 	as, like 	→ 	when 	8
8217 	since 	→ 	because of 	1
8218 	as, like 	→ 	if 	3
8219 	Cancer (constellation) 	→ 	July 	2
8220 	to plant 	→ 	July 	1
8221 	blueberry 	→ 	July 	1
8222 	oven 	→ 	July 	1
8223 	to shed hair or feathers 	→ 	July 	1
8224 	activity 	→ 	commerce, business 	6
8225 	to break (intr.) 	— 	to flirt 	1
8226 	traitor 	→ 	snail 	1
8227 	happy 	— 	beautiful 	1
8228 	parents 	→ 	motherland 	2
8229 	family 	→ 	motherland 	1
8230 	mallow 	→ 	hollyhock 	11
8231 	mallow 	→ 	marsh mallow 	2
8232 	hollyhock 	→ 	marsh mallow 	1
8233 	rose 	→ 	hollyhock 	11
8234 	mallow 	→ 	hibiscus 	1
8235 	moon 	→ 	watch, clock 	1
8236 	to calculate, count 	— 	month 	1
8237 	moon 	— 	spider 	1
8238 	moon 	→ 	tympanum (of ear) 	1
8239 	blood 	→ 	motherland 	1
8240 	horse 	→ 	cow 	3
8241 	air 	— 	daydream (n.) 	1
8242 	mouth 	→ 	language 	25
8243 	old man 	— 	wife's father 	1
8244 	to answer 	→ 	to obey 	2
8245 	to respect 	→ 	to obey 	11
8246 	face 	→ 	forehead 	15
8247 	to follow, go after smb. 	→ 	to obey 	15
8248 	to join, take part 	→ 	to obey 	1
8249 	cartilage 	— 	tin (n.) 	1
8250 	to sleep 	→ 	husband / wife 	1
8251 	bed 	→ 	sexual partner 	13
8252 	mother 	→ 	river-bed 	4
8253 	womb, uterus 	— 	river-bed 	1
8254 	neighbour 	→ 	husband / wife 	2
8255 	to lie (posture) 	→ 	husband / wife 	1
8256 	male animal 	— 	husband 	2
8257 	woman / wife 	→ 	queen (playing card) 	5
8258 	horse 	→ 	bison 	1
8259 	horse 	→ 	muskox 	1
8260 	other 	— 	husband / wife 	1
8261 	second (num.) 	→ 	husband / wife 	1
8262 	big 	↔ 	husband 	2
8263 	<noble rank, title> 	→ 	husband 	2
8264 	grandfather 	— 	husband 	1
8265 	old man 	→ 	ancestor 	10
8266 	old man 	→ 	father 	9
8267 	old man 	→ 	spirit (supernatural being) 	3
8268 	old man 	→ 	term of address to a man 	9
8269 	old man 	→ 	thunder 	4
8270 	liver 	→ 	courage 	16
8271 	liver 	→ 	dear, darling 	13
8272 	liver 	→ 	bile, gall 	3
8273 	bread 	→ 	liver 	1
8274 	liver 	↔ 	stomach 	2
8275 	liver 	— 	diaphragm 	1
8276 	back (body part) 	→ 	roof 	1
8277 	to stand up 	→ 	to convalesce, recover from illness 	2
8278 	liver 	↔ 	heart 	9
8279 	liver 	→ 	patience 	2
8280 	human, person 	→ 	pupil (of an eye) 	8
8281 	light (vs. heavy) 	→ 	weak 	1
8282 	light (vs. heavy) 	→ 	thin (of an object) 	1
8283 	chest (body part) 	— 	lung 	8
8284 	tobacco 	→ 	Thursday 	1
8285 	middle, centre 	→ 	liver 	1
8286 	liver 	— 	grief, sorrow 	1
8287 	spleen (anat.) 	→ 	lung 	2
8288 	lung 	→ 	seat of emotions 	6
8289 	gall bladder 	→ 	seat of emotions 	2
8290 	stomach 	→ 	seat of emotions 	6
8291 	chest (body part) 	→ 	seat of emotions 	6
8292 	liver 	→ 	anger 	4
8293 	heart 	→ 	lung 	10
8294 	spleen (anat.) 	— 	to fear, be afraid 	1
8295 	stomach 	↔ 	heart 	17
8296 	spleen (anat.) 	↔ 	leech 	3
8297 	leech 	→ 	slug 	2
8298 	nimble, deft 	→ 	lung 	1
8299 	to breathe 	→ 	lung 	1
8300 	foam 	→ 	lung 	6
8301 	foam 	→ 	beer 	1
8302 	<religious festival> 	→ 	August 	2
8303 	sixth 	→ 	August 	1
8304 	Leo (constellation) 	→ 	August 	2
8305 	to ripen 	→ 	August 	1
8306 	<berry> 	→ 	August 	2
8307 	to shed hair or feathers 	→ 	August 	1
8308 	pitchfork 	→ 	August 	1
8309 	to reap 	→ 	August 	1
8310 	bird 	→ 	spleen (anat.) 	2
8311 	toad 	— 	wart 	1
8312 	gall bladder 	— 	spleen (anat.) 	3
8313 	liver 	— 	yolk 	1
8314 	pancreas 	— 	spleen (anat.) 	4
8315 	roof 	→ 	sparrow 	2
8316 	liver 	— 	pancreas 	1
8317 	tongue (body part) 	→ 	spleen (anat.) 	3
8318 	spleen (anat.) 	— 	kidney 	1
8319 	left 	→ 	spleen (anat.) 	1
8320 	human, person 	→ 	woman 	6
8321 	stomach 	↔ 	abdomen 	32
8322 	spleen (anat.) 	— 	bitter 	1
8323 	leaf 	→ 	lung 	1
8324 	belly 	— 	abdomen 	36
8325 	stomach 	↔ 	womb, uterus 	7
8326 	abdomen 	→ 	womb, uterus 	10
8327 	bone 	→ 	fat (adj., of a person) 	1
8328 	spleen (anat.) 	→ 	eye of a needle 	1
8329 	foam 	→ 	liver 	1
8330 	man (male) 	→ 	woman 	1
8331 	to feed 	→ 	child (vs. adult) 	1
8332 	herder, shepherd 	→ 	child (vs. adult) 	1
8333 	child 	— 	girl 	5
8334 	little, small 	→ 	child 	55
8335 	child (vs. adult) 	→ 	mistress, paramour 	1
8336 	child (vs. adult) 	→ 	protégé 	2
8337 	child (vs. adult) 	→ 	uvula 	1
8338 	human, person 	→ 	uvula 	1
8339 	lizard 	→ 	uvula 	1
8340 	lizard 	→ 	oesophagus 	1
8341 	lizard 	→ 	croup (illness) 	1
8342 	child 	→ 	small object 	1
8343 	child 	— 	foal 	1
8344 	child 	→ 	friend 	1
8345 	son 	→ 	dear, darling 	1
8346 	child (son or daughter) 	→ 	daughter 	2
8347 	child 	→ 	prince 	3
8348 	lamb 	→ 	child 	1
8349 	orphan 	→ 	Coracina novaehollandiae 	1
8350 	to kiss 	— 	to lick 	9
8351 	child 	→ 	icon (christianity) 	1
8352 	pericarp of a lotus 	— 	lung 	1
8353 	spleen (anat.) 	— 	palm (body part) 	1
8354 	spleen (anat.) 	→ 	pupil (of an eye) 	1
8355 	flank (body part) 	→ 	spleen (anat.) 	3
8356 	urinary bladder 	→ 	spleen (anat.) 	1
8357 	near 	→ 	spleen (anat.) 	1
8358 	liver 	→ 	brown 	7
8359 	spleen (anat.) 	— 	strangles (equine distemper) 	2
8360 	lung 	→ 	resentment, offense 	4
8361 	spleen (anat.) 	— 	swim bladder 	1
8362 	bride 	↔ 	bridegroom 	15
8363 	queen, princess 	→ 	bride 	6
8364 	eternal 	→ 	marriage 	1
8365 	stone (piece of rock) 	→ 	sinker (fishing) 	1
8366 	lead, plumbum 	→ 	sinker (fishing) 	3
8367 	egg 	→ 	dandelion 	1
8368 	butter 	→ 	dandelion 	3
8369 	peace 	→ 	kiss 	2
8370 	to strike, hit 	→ 	to multiply 	6
8371 	to suffer 	→ 	to be ill, sick 	2
8372 	cucumber 	↔ 	melon (Cucumis melo) 	7
8373 	goat 	→ 	supporting device 	11
8374 	donkey 	→ 	supporting device 	5
8375 	horse 	→ 	supporting device 	10
8376 	goat 	→ 	driver's seat 	6
8377 	seven 	→ 	September 	2
8378 	heather 	→ 	September 	3
8379 	Michael archangel 	→ 	September 	2
8380 	Virgo 	→ 	September 	3
8381 	oat 	→ 	September 	1
8382 	to ripen 	→ 	September 	2
8383 	moose 	→ 	September 	1
8384 	maize 	→ 	September 	1
8385 	sacred, holy 	→ 	September 	1
8386 	to separate 	→ 	September 	1
8387 	long (time) 	→ 	September 	1
8388 	leaf 	→ 	September 	1
8389 	yurt 	→ 	September 	1
8390 	Romani 	→ 	to steal 	1
8391 	height (of a person) 	→ 	waist 	2
8392 	Mid-Autumn 	→ 	September 	1
8393 	rooster 	→ 	sunrise 	1
8394 	old (vs. new) 	→ 	historical tale 	2
8395 	bull 	→ 	male animal 	1
8396 	to break (intr.) 	→ 	to fall in love 	2
8397 	pearl 	→ 	pearl barley 	5
8398 	eight 	→ 	October 	2
8399 	grape harvest 	→ 	October 	1
8400 	Saint Demetrius 	→ 	October 	1
8401 	little, small 	→ 	October 	1
8402 	shive 	→ 	October 	3
8403 	rut 	→ 	October 	4
8404 	mud 	→ 	October 	1
8405 	god 	→ 	October 	1
8406 	autumn 	→ 	October 	1
8407 	Libra 	→ 	October 	4
8408 	leaf 	→ 	October 	1
8409 	rain 	→ 	October 	1
8410 	back (body part) 	→ 	October 	1
8411 	storm 	→ 	October 	1
8412 	autumn fall of the leaves 	→ 	October 	2
8413 	winter 	→ 	October 	1
8414 	November 	→ 	October 	1
8415 	yellow 	→ 	October 	1
8416 	wind 	→ 	October 	1
8417 	swallow (bird) 	→ 	Triglidae (fish) 	2
8418 	to break (tr.) 	→ 	hybrid 	1
8419 	to break (tr.) 	→ 	to kill 	1
8420 	to hug, embrace 	→ 	to kiss 	7
8421 	goat 	→ 	bagpipes 	6
8422 	to break (tr.) 	→ 	to offend (tr.) 	1
8423 	to break (tr.) 	→ 	to run away 	1
8424 	female servant, maid 	— 	beautiful girl 	2
8425 	to shear 	— 	to blink 	1
8426 	narrow, close 	→ 	ravine 	2
8427 	to squeeze 	→ 	to diminish 	1
8428 	part 	→ 	continent 	2
8429 	popcorn 	→ 	lie (n.), untruth 	1
8430 	hot 	→ 	sexually attractive 	5
8431 	red 	→ 	very, of high degree 	1
8432 	ram 	→ 	Aries 	11
8433 	empty 	→ 	nonsense 	7
8434 	arm 	→ 	sleeve 	7
8435 	arm 	→ 	neck (of a musical instrument) 	2
8436 	neck 	→ 	neck (of a musical instrument) 	8
8437 	armpit 	→ 	middle of nowhere, periphery 	1
8438 	<noble rank, title> 	→ 	teacher 	1
8439 	to tear (intr.) 	→ 	to begin (intr.) 	2
8440 	to tear (intr.) 	→ 	to feel pain, ache 	1
8441 	to run 	→ 	to use 	1
8442 	bucket 	→ 	homosexual 	1
8443 	to drive, force to move on 	→ 	to fire (from job) 	2
8444 	to put 	→ 	to set 	1
8445 	to put 	→ 	to touch (about feelings) 	1
8446 	to put 	→ 	to name 	1
8447 	dense, thick (of liquid) 	→ 	very, of high degree 	1
8448 	root (of a plant) 	→ 	root (of a word) 	24
8449 	to bypass 	→ 	to evade 	4
8450 	to want 	→ 	to be about to 	1
8451 	bank, shore 	→ 	river 	1
8452 	to turn over 	→ 	disgusting 	2
8453 	whip 	→ 	flagellum 	26
8454 	branch, twig 	→ 	flagellum 	1
8455 	cheek 	→ 	ploughshare 	3
8456 	court (of a sovereign) 	→ 	parliament 	1
8457 	yoke 	→ 	marriage 	4
8458 	hazel grouse (Tetrastes bonasia) 	→ 	willow ptarmigan 	1
8459 	partridge 	→ 	willow ptarmigan 	10
8460 	cereal 	→ 	corn crake 	1
8461 	corn crake 	— 	lapwing (Vanellus) 	1
8462 	willow 	→ 	willow ptarmigan 	1
8463 	chicken (Gallus domesticus) 	↔ 	bird 	16
8464 	draught animal 	→ 	husband / wife 	5
8465 	companion, partner 	→ 	afterbirth, placenta 	4
8466 	house 	→ 	afterbirth, placenta 	4
8467 	to bury, inter 	→ 	afterbirth, placenta 	1
8468 	pillow 	→ 	afterbirth, placenta 	4
8469 	plate (a serving dish) 	→ 	afterbirth, placenta 	1
8470 	flat cake 	→ 	afterbirth, placenta 	9
8471 	garbage 	↔ 	afterbirth, placenta 	7
8472 	sibling 	↔ 	afterbirth, placenta 	3
8473 	bed 	→ 	afterbirth, placenta 	13
8474 	mother 	→ 	afterbirth, placenta 	6
8475 	to sit 	→ 	afterbirth, placenta 	1
8476 	to follow, go after smb. 	→ 	afterbirth, placenta 	1
8477 	jungle 	— 	smell (n.) 	1
8478 	smell (n.) 	— 	flower 	1
8479 	end (space) 	→ 	afterbirth, placenta 	2
8480 	devil, satan 	— 	smell of cattle 	1
8481 	dress (feminine) 	→ 	afterbirth, placenta 	1
8482 	to emit smell 	→ 	to come into existence 	1
8483 	<foreigner> 	→ 	blond person 	4
8484 	inkwell 	→ 	squid 	4
8485 	contents 	→ 	content 	6
8486 	union 	→ 	companion, partner 	1
8487 	to unite 	→ 	to copulate 	1
8488 	to buzz 	→ 	crowd (of people) 	1
8489 	hermaphrodite 	→ 	stupid 	1
8490 	frigidity 	— 	cold 	1
8491 	clever, wise 	→ 	Mercury 	3
8492 	sharp 	→ 	witty 	3
8493 	circle 	→ 	Milky Way 	2
8494 	to roast 	→ 	to torture 	2
8495 	cradle 	— 	afterbirth, placenta 	2
8496 	clothes 	→ 	afterbirth, placenta 	1
8497 	bowels, intestine 	→ 	afterbirth, placenta 	1
8498 	North 	— 	last 	1
8499 	last 	→ 	afterbirth, placenta 	2
8500 	place 	→ 	afterbirth, placenta 	5
8501 	nine 	→ 	November 	2
8502 	straw 	→ 	November 	1
8503 	black 	→ 	November 	1
8504 	mist, fog 	→ 	November 	1
8505 	Samhain 	→ 	November 	2
8506 	Scorpius 	→ 	November 	3
8507 	sacrifice 	→ 	November 	1
8508 	wind 	→ 	November 	1
8509 	All Saints' Day 	→ 	November 	1
8510 	winter 	→ 	November 	2
8511 	scorpion 	→ 	myriapod 	15
8512 	bull 	→ 	November 	1
8513 	bow (weapon) 	→ 	Sagittarius 	4
8514 	fresh (of water) 	→ 	unleavened (bread) 	5
8515 	beard 	→ 	mane 	1
8516 	sword 	→ 	gladiolus 	13
8517 	bread 	→ 	bribe 	1
8518 	melody, tune 	→ 	dialect 	3
8519 	melody, tune 	→ 	manner, way, method 	6
8520 	moisture 	→ 	benefit 	1
8521 	liquid food 	→ 	benefit 	1
8522 	to salt 	→ 	to disgrace, dishonor 	2
8523 	right (vs. left) 	— 	West 	3
8524 	consciousness 	→ 	conscience, scruples 	2
8525 	heart 	→ 	abdomen 	3
8526 	heart 	→ 	battery 	1
8527 	heart 	→ 	watch, clock 	1
8528 	heart 	→ 	grain, seed 	1
8529 	heart 	— 	life 	1
8530 	black 	→ 	bubonic plague 	3
8531 	heart 	→ 	banana flower 	19
8532 	West 	→ 	South 	1
8533 	East 	→ 	North 	1
8534 	South 	→ 	East 	1
8535 	to lick 	→ 	index finger 	2
8536 	cold 	→ 	South 	1
8537 	throat 	→ 	seat of emotions 	1
8538 	heart 	→ 	to desire 	3
8539 	elbow 	→ 	elbow piece (tube) 	4
8540 	knee 	→ 	elbow piece (tube) 	6
8541 	mirror 	→ 	mirror armour 	9
8542 	mirror 	→ 	dictionary 	4
8543 	snake 	→ 	lead, plumbum 	9
8544 	iron 	— 	lead, plumbum 	1
8545 	lead, plumbum 	— 	antimony 	2
8546 	to bite one's finger 	— 	to be surprised 	1
8547 	to slap one's thighs 	→ 	to be surprised 	1
8548 	surprising 	→ 	great 	4
8549 	lead, plumbum 	→ 	mirror 	2
8550 	surprising 	→ 	very, of high degree 	3
8551 	to open one's mouth 	→ 	to be surprised 	2
8552 	copper 	— 	lead, plumbum 	2
8553 	weapon 	→ 	penis 	3
8554 	to open one's eyes wide 	→ 	to be surprised 	4
8555 	moon 	→ 	lead, plumbum 	1
8556 	surprising 	→ 	beautiful 	2
8557 	<foreign country> 	→ 	<metal> 	9
8558 	to spread one's arms 	→ 	to be surprised 	2
8559 	part 	→ 	talent 	1
8560 	to feel pain, ache 	→ 	worry, anxiety 	2
8561 	blood vessel 	— 	muscle 	4
8562 	steep 	→ 	arrogant 	1
8563 	animal 	→ 	cruel 	5
8564 	winter solstice 	→ 	December 	2
8565 	lump 	→ 	December 	4
8566 	cruel 	→ 	December 	1
8567 	cruel 	→ 	January 	1
8568 	to bloom, blossom 	— 	to hatch out, brood 	1
8569 	place 	— 	relation, connection 	1
8570 	lump 	→ 	November 	5
8571 	Saint Nicholas 	→ 	December 	1
8572 	wolf 	→ 	December 	2
8573 	to know 	— 	to do, act 	1
8574 	muddy, turbid, opaque 	→ 	angry 	2
8575 	destiny 	→ 	life 	6
8576 	to order, command 	→ 	destiny 	4
8577 	to name 	→ 	to order, command 	2
8578 	yesterday 	↔ 	tomorrow 	87
8579 	morning 	→ 	yesterday 	2
8580 	firearm 	↔ 	cannon (weapon) 	5
8581 	elder sister 	→ 	mischievous person 	1
8582 	elder brother 	→ 	ancestor 	1
8583 	younger brother 	→ 	prince 	1
8584 	daughter 	— 	little finger 	1
8585 	daughter 	— 	female ascetic 	1
8586 	grandfather 	→ 	uncle (mother's brother) 	4
8587 	to see/to look at 	→ 	to take into account 	2
8588 	envious, envy 	↔ 	to want 	2
8589 	bullet 	→ 	belemnite 	2
8590 	bitter 	→ 	camomile 	1
8591 	person of the Caucasian race 	→ 	cannon (weapon) 	1
8592 	vessel 	→ 	ship's bells 	8
8593 	to teach 	→ 	ready 	1
8594 	mirror 	→ 	window 	4
8595 	surface of water 	→ 	mirror 	7
8596 	eye 	→ 	sprout 	5
8597 	glass (material) 	→ 	lens 	2
8598 	eye 	— 	mirror 	1
8599 	mirror 	→ 	lens 	4
8600 	metal 	— 	axe 	1
8601 	photograph 	— 	mirror 	1
8602 	to live, be alive 	— 	to flourish, prosper 	1
8603 	wing 	→ 	branch (of a river) 	1
8604 	to knit 	— 	to braid, plait, weave 	1
8605 	roof 	— 	cover, lid 	1
8606 	<plant (biol.)> 	→ 	roof 	2
8607 	umbrella 	→ 	umbel 	6
8608 	shadow 	→ 	<hat> 	3
8609 	ray 	→ 	radius (geometry) 	11
8610 	ray 	— 	water jet 	2
8611 	ray 	→ 	lightning 	4
8612 	ray 	— 	spark 	2
8613 	radius (geometry) 	→ 	radius (bone) 	5
8614 	ray 	→ 	radius (bone) 	5
8615 	man (male) 	→ 	January 	1
8616 	black 	→ 	January 	1
8617 	Aquarius (constellation) 	→ 	January 	1
8618 	in front of 	→ 	January 	1
8619 	to write 	→ 	to order, command 	6
8620 	crab 	→ 	Cancer (constellation) 	18
8621 	crawfish 	→ 	Cancer (constellation) 	10
8622 	crab 	→ 	cancer (disease) 	11
8623 	crawfish 	→ 	cancer (disease) 	11
8624 	hedgehog (Еrinaceus) 	→ 	cancer (disease) 	1
8625 	to feel pain, ache 	→ 	cancer (disease) 	1
8626 	rock, crag, cliff 	→ 	cancer (disease) 	1
8627 	to eat 	→ 	cancer (disease) 	1
8628 	worm 	→ 	cancer (disease) 	1
8629 	clothes moth 	→ 	cancer (disease) 	1
8630 	glutton 	→ 	cancer (disease) 	1
8631 	billion 	→ 	cancer (disease) 	1
8632 	spider 	→ 	cancer (disease) 	1
8633 	vessel 	→ 	root (arithmetic) 	1
8634 	sparrow 	→ 	ostrich 	2
8635 	baby chicken 	→ 	Pleiades 	3
8636 	hen 	→ 	Pleiades 	6
8637 	seven 	→ 	Pleiades 	9
8638 	sieve (n.) 	→ 	Pleiades 	8
8639 	bird 	→ 	penis 	11
8640 	<bird> 	→ 	penis 	2
8641 	sausage 	→ 	penis 	1
8642 	basket 	→ 	<measure of volume> 	2
8643 	bone 	→ 	keel 	1
8644 	snake 	→ 	keel 	1
8645 	stomach 	→ 	urinary bladder 	1
8646 	kshatriya 	→ 	monarch 	2
8647 	evil spirit 	— 	firefly 	1
8648 	quality 	→ 	high-quality 	5
8649 	to pour 	→ 	to cast (metal) 	13
8650 	stirrup 	→ 	stapes 	24
8651 	bowels, intestine 	→ 	worm 	1
8652 	woman 	→ 	Pleiades 	3
8653 	family 	→ 	Pleiades 	1
8654 	brother 	→ 	Pleiades 	1
8655 	nest (n.) 	→ 	Pleiades 	3
8656 	heap, pile 	→ 	Pleiades 	3
8657 	sister 	→ 	Pleiades 	4
8658 	cluster of onions 	→ 	Pleiades 	2
8659 	hare (Lepus) 	→ 	Pleiades 	2
8660 	bench 	→ 	Pleiades 	1
8661 	to sail 	→ 	Pleiades 	1
8662 	salt shaker 	→ 	Pleiades 	1
8663 	beehive 	→ 	Pleiades 	1
8664 	sparrow 	→ 	Pleiades 	1
8665 	sheep 	→ 	Pleiades 	1
8666 	frost 	→ 	Pleiades 	1
8667 	bast shoe 	→ 	Pleiades 	2
8668 	girl 	→ 	Virgo 	11
8669 	ear, spike (of a grain plant) 	→ 	Virgo 	2
8670 	star 	→ 	<spotted animal> 	1
8671 	watchman 	→ 	meteorite 	1
8672 	to turn, rotate (tr.) 	→ 	to pour 	2
8673 	abundance 	→ 	Pleiades 	1
8674 	lord, master 	→ 	rich 	2
8675 	rich 	→ 	tasty 	1
8676 	crow foot 	→ 	cross (n.) 	1
8677 	crow 	→ 	whore 	1
8678 	bivalve mollusk 	→ 	Venus flytrap 	1
8679 	to bring up (children) 	→ 	to guard 	1
8680 	to bring up (children) 	→ 	to govern, control, rule 	1
8681 	to end, finish 	— 	empty 	1
8682 	to end, finish 	→ 	most 	1
8683 	to end, finish 	→ 	very, of high degree 	1
8684 	top, upper part 	→ 	source (of a river) 	2
8685 	to kill 	→ 	to destroy, annihilate 	2
8686 	to lower, put down 	→ 	to kill 	3
8687 	to boil (food) (tr.) 	— 	to brew (beer) 	1
8688 	courage 	→ 	virtue 	2
8689 	document (n.) 	→ 	role 	9
8690 	glass (material) 	→ 	mantle of clam 	1
8691 	metal 	→ 	plastic 	1
8692 	first 	— 	nose 	1
8693 	reflection (in the mirror, water) 	— 	mirror 	2
8694 	obsidian 	→ 	glass (material) 	1
8695 	shrew 	↔ 	mouse 	16
8696 	spider 	→ 	shrew 	2
8697 	sharp point 	→ 	shrew 	9
8698 	beak 	→ 	shrew 	1
8699 	nose 	→ 	shrew 	2
8700 	rat 	→ 	calf of a leg 	1
8701 	late 	→ 	evening 	5
8702 	to dig 	→ 	shrew 	5
8703 	crab 	→ 	pair of compasses 	1
8704 	seat, chair 	→ 	stump (of tree) 	1
8705 	seat, chair 	→ 	thigh / hip 	3
8706 	seat, chair 	→ 	udder 	1
8707 	human, person 	→ 	somebody 	14
8708 	fire 	→ 	erysipelas 	3
8709 	snake 	→ 	erysipelas 	3
8710 	first 	→ 	near 	2
8711 	bastard 	→ 	February 	1
8712 	bead 	→ 	January 	1
8713 	palate 	→ 	to chew 	1
8714 	veil, head-covering 	→ 	soft palate 	6
8715 	roof 	→ 	palate 	2
8716 	sail (n.) 	→ 	soft palate 	3
8717 	pomegranate 	→ 	hand grenade 	6
8718 	hinge 	→ 	clavicle 	1
8719 	neck 	→ 	clavicle 	1
8720 	horse collar 	→ 	clavicle 	1
8721 	yard (nautical) 	→ 	clavicle 	1
8722 	sad 	— 	bewitched 	1
8723 	skirt 	— 	shirt 	5
8724 	monarch 	→ 	common bullfinch 	1
8725 	lord, master 	→ 	common bullfinch 	1
8726 	bud (on a twig) 	→ 	common bullfinch 	5
8727 	bee 	— 	honey 	22
8728 	goldfinch (Carduelis) 	→ 	Eurasian nuthatch 	1
8729 	to adorn, decorate 	→ 	common bullfinch 	1
8730 	to whistle 	→ 	common bullfinch 	1
8731 	to clean 	→ 	to circumcise 	2
8732 	blood 	→ 	common bullfinch 	3
8733 	parrot 	→ 	puffin 	5
8734 	fool 	→ 	puffin 	3
8735 	priest (Christianity) 	→ 	parrot 	1
8736 	Manx shearwater 	→ 	puffin 	3
8737 	holly (tree) 	→ 	common bullfinch 	1
8738 	goldfinch (Carduelis) 	— 	common bullfinch 	1
8739 	noise 	→ 	common bullfinch 	1
8740 	cow's nipple 	→ 	belemnite 	1
8741 	thunder 	→ 	belemnite 	10
8742 	evil spirit 	→ 	belemnite 	15
8743 	tail 	→ 	belemnite 	1
8744 	wedge 	→ 	belemnite 	3
8745 	god 	→ 	belemnite 	2
8746 	sack, bag 	→ 	belemnite 	1
8747 	witch, sorceress 	→ 	belemnite 	1
8748 	toad 	→ 	belemnite 	1
8749 	lynx 	→ 	belemnite 	1
8750 	hammer 	→ 	belemnite 	1
8751 	skittle, bowling pin 	→ 	belemnite 	1
8752 	storm 	→ 	belemnite 	1
8753 	cone (fruit) 	→ 	belemnite 	1
8754 	lightning 	→ 	belemnite 	2
8755 	to make sit 	→ 	to circumcise 	1
8756 	to adorn, decorate 	→ 	to circumcise 	1
8757 	to improve 	→ 	to shave 	1
8758 	false, wrong 	— 	different 	2
8759 	gold 	→ 	sulfur 	3
8760 	craw (of bird) 	→ 	common bullfinch 	1
8761 	brown 	→ 	common bullfinch 	1
8762 	fire 	→ 	common bullfinch 	2
8763 	soup 	→ 	dinner, evening meal 	2
8764 	hoof 	→ 	<money> 	2
8765 	market 	→ 	whore 	1
8766 	first 	→ 	Sunday 	1
8767 	egg 	→ 	world 	4
8768 	good 	→ 	spring (season) 	1
8769 	young 	→ 	spring (season) 	1
8770 	mouth 	→ 	burner 	1
8771 	rose 	→ 	shower head 	1
8772 	spring (season) 	→ 	Lent 	1
8773 	long (time) 	→ 	spring (season) 	5
8774 	wing 	→ 	eyelash 	3
8775 	wing 	→ 	half of a lunar month 	2
8776 	wing 	→ 	political party 	5
8777 	wing 	→ 	bird 	7
8778 	wing 	→ 	fan (hand-held) 	4
8779 	star 	↔ 	eye 	5
8780 	time 	→ 	death 	5
8781 	time 	→ 	tense (grammar) 	59
8782 	fire 	→ 	summer 	1
8783 	eye 	→ 	eye of coconut 	17
8784 	eye 	→ 	anus 	5
8785 	eye 	→ 	door 	1
8786 	eye 	→ 	eye of a needle 	8
8787 	house 	→ 	unit of area 	1
8788 	house 	→ 	square (chess) 	1
8789 	foot 	→ 	foot (poetry) 	22
8790 	grief, sorrow 	— 	to fear, be afraid 	1
8791 	little, small 	→ 	easy 	1
8792 	to ring (tr.) 	→ 	<money> 	1
8793 	to ring (tr.) 	→ 	blade, edge (of an instrument) 	2
8794 	eye 	→ 	point of a needle 	5
8795 	eye 	→ 	operculum of a snail 	9
8796 	eye 	→ 	ankle 	5
8797 	grain, seed 	→ 	pupil (of an eye) 	2
8798 	to get stuck 	→ 	to stammer, stutter 	1
8799 	to immerse in water 	→ 	to baptize 	8
8800 	to make a hole 	— 	to strike, hit 	1
8801 	bitter 	— 	to stink 	3
8802 	bitter 	→ 	rowan 	1
8803 	to heat up, warm up (intr.) 	— 	to get angry 	1
8804 	ear 	→ 	eye of a needle 	3
8805 	to baptize 	→ 	rain 	1
8806 	to get lost 	→ 	to be screwed 	2
8807 	gills 	— 	cover, lid 	1
8808 	evil spirit 	— 	bear (Ursus) 	1
8809 	novice 	— 	stranger, foreign 	1
8810 	lower part of a tree 	→ 	chief, boss 	1
8811 	lower part of a tree 	→ 	grandfather 	1
8812 	grass, herb 	— 	needle (conifers) 	1
8813 	uterus 	→ 	afterbirth, placenta 	3
8814 	ashes 	→ 	powder 	1
8815 	hungry 	→ 	insomniac bear 	1
8816 	stone (piece of rock) 	→ 	sty (on the eye) 	1
8817 	nurse 	→ 	elder sister 	1
8818 	root (of a plant) 	— 	sprout 	1
8819 	light, bright, clear 	→ 	beautiful 	1
8820 	guilt, guilty 	→ 	disease 	1
8821 	sound 	→ 	thunder 	1
8822 	calm 	→ 	grown-up, adult 	1
8823 	to go up 	→ 	to die 	1
8824 	curved 	→ 	obstinate, persistent 	1
8825 	rude, impolite 	→ 	cunning, sly 	1
8826 	food 	— 	pasture (n.) 	2
8827 	literate 	— 	skilful, dexterous 	1
8828 	palm (body part) 	→ 	paw 	3
8829 	palm (body part) 	— 	foot 	9
8830 	palm (body part) 	→ 	oar 	2
8831 	to go, walk 	→ 	animal 	1
8832 	hand 	→ 	rafter (architecture) 	1
8833 	skis 	→ 	aspen 	1
8834 	monkey 	→ 	skilful, dexterous 	1
8835 	mother 	— 	aunt (father's brother's wife) 	1
8836 	tears 	— 	spit, saliva 	4
8837 	cunning, sly 	→ 	lazy 	1
8838 	caterpillar 	— 	slug 	2
8839 	stepmother 	— 	mother-in-law 	2
8840 	good 	— 	happy 	1
8841 	giraffe 	— 	rafter (architecture) 	1
8842 	scissors 	→ 	rafter (architecture) 	2
8843 	sky 	→ 	paradise, heaven 	15
8844 	black 	— 	dyed 	1
8845 	conversation 	— 	language 	2
8846 	lazy 	— 	obstinate, persistent 	1
8847 	to get caught 	→ 	to stammer, stutter 	1
8848 	game (hunting) 	→ 	animal 	1
8849 	to promise 	— 	to point 	1
8850 	to teach 	→ 	to answer 	1
8851 	to praise 	— 	to bless 	2
8852 	spruce (Picea) 	— 	aspen 	1
8853 	light, bright, clear 	→ 	East 	1
8854 	to take clothes off 	— 	to harvest 	1
8855 	to take clothes off 	— 	to unharness 	1
8856 	predator 	→ 	evil (adj.) 	1
8857 	to wound (tr.) 	— 	to deceive 	1
8858 	to shine, glitter 	— 	to melt, thaw 	1
8859 	bone marrow 	— 	essence, core 	1
8860 	plant (biol.) 	→ 	to flourish, prosper 	1
8861 	stupid 	— 	sick, ill 	1
8862 	to make noise 	— 	to rejoice 	1
8863 	death 	— 	misfortune 	1
8864 	wolf 	— 	chief, boss 	1
8865 	to strike, hit 	→ 	to awaken, wake up 	1
8866 	lion (Panthera leo) 	— 	hero 	1
8867 	rain 	→ 	rich 	1
8868 	throat 	→ 	life 	4
8869 	albumen, white of an egg 	— 	afterbirth, placenta 	1
8870 	to be covered 	→ 	to die 	1
8871 	ebony 	→ 	black 	1
8872 	to mill, grind 	— 	to drill 	1
8873 	wolf 	→ 	hero 	1
8874 	part 	→ 	political party 	4
8875 	root (of a plant) 	— 	nerve 	1
8876 	<fruit> 	→ 	calf of a leg 	1
8877 	load, cargo 	→ 	electrical resistance 	1
8878 	pestle 	— 	millstone 	3
8879 	to burn (tr.) 	— 	to smoke (tobacco) 	1
8880 	to mature 	— 	to marry, take a wife 	1
8881 	sweet (taste) 	— 	soft (adj.) 	3
8882 	underground, subterranean 	— 	worm 	1
8883 	red 	→ 	ripe (fruit) 	25
8884 	cold 	→ 	disgusting 	2
8885 	to shake 	→ 	to astonish 	10
8886 	earth, soil 	→ 	Earth (planet) 	11
8887 	goose 	→ 	catkin 	3
8888 	quick 	→ 	spicy 	1
8889 	to rest 	— 	to sleep 	3
8890 	empty 	→ 	false, wrong 	1
8891 	light (vs. heavy) 	→ 	skilful, dexterous 	1
8892 	fruit 	→ 	grape (plant) 	1
8893 	fire (accident) 	→ 	<disease> 	1
8894 	fire (accident) 	→ 	Saint-John's-wort (Hypericum) 	1
8895 	to spring, jump 	→ 	to get angry 	1
8896 	to turn, rotate (intr.) 	→ 	to walk, wander 	1
8897 	tendon 	→ 	strong 	1
8898 	wrinkle 	→ 	street 	8
8899 	grey 	→ 	cloudy 	2
8900 	to pull, to draw 	→ 	to put on 	2
8901 	to wash (clothes) 	→ 	to scold 	3
8902 	dragon 	→ 	devil, satan 	5
8903 	dragon 	→ 	meteorite 	1
8904 	dragon 	→ 	comet 	1
8905 	bull 	→ 	snail 	1
8906 	juice 	— 	soup 	3
8907 	soup 	— 	sauce 	3
8908 	frog 	→ 	ranula 	7
8909 	grape (plant) 	→ 	lock (of hair) 	1
8910 	foster (of a parent or child) 	→ 	severe, harsh 	1
8911 	neighbour 	→ 	serf 	1
8912 	lifetime 	→ 	century 	8
8913 	to pour 	→ 	smallpox 	1
8914 	wind 	→ 	mad, insane 	1
8915 	correct, right 	→ 	rule, regulations 	1
8916 	correct, right 	→ 	law, jurisprudence 	4
8917 	correct, right 	→ 	right (juridic) 	5
8918 	time (instance) 	→ 	if 	2
8919 	blood vessel 	→ 	vein (botany) 	6
8920 	to think, consider 	— 	to understand 	4
8921 	to respect 	→ 	to act according to 	4
8922 	astringent, tart 	→ 	severe, harsh 	5
8923 	astringent, tart 	→ 	to suffer 	2
8924 	head 	— 	end (space) 	1
8925 	head 	→ 	first 	2
8926 	bull 	→ 	mammoth 	4
8927 	whale 	→ 	mammoth 	1
8928 	plate (a serving dish) 	→ 	dish (meal) 	12
8929 	young animal 	↔ 	child (son or daughter) 	27
8930 	<young animal> 	→ 	novice 	2
8931 	bull 	→ 	despot, tyrant 	1
8932 	will, intention 	— 	desire, wish 	4
8933 	to shine, glitter 	→ 	to reveal 	1
8934 	snow 	→ 	joy 	1
8935 	to rip 	→ 	to break one's fast 	3
8936 	palm (body part) 	→ 	winnowing fan 	1
8937 	grief, sorrow 	→ 	to feel pity 	6
8938 	monk 	→ 	sparrow 	1
8939 	hump (of a person or camel) 	→ 	clitoris 	1
8940 	sky 	→ 	dear, darling 	1
8941 	to whistle 	— 	to blow (about wind) 	4
8942 	sky 	→ 	head 	2
8943 	to see/to look at 	→ 	window 	1
8944 	to see/to look at 	→ 	to condone, indulge 	1
8945 	to see/to look at 	→ 	supervision 	1
8946 	knot 	→ 	node (botany) 	11
8947 	eye 	→ 	node (botany) 	6
8948 	eye 	→ 	to awaken, wake up 	11
8949 	beautiful 	→ 	big 	5
8950 	beautiful 	→ 	OK 	2
8951 	eye 	→ 	blade, edge (of an instrument) 	43
8952 	eye 	→ 	sharp point 	40
8953 	eye 	→ 	source (of a river) 	5
8954 	eye 	→ 	cover, lid 	9
8955 	bone 	→ 	campfire, bonfire 	2
8956 	eye 	→ 	pointer (on a dial) 	1
8957 	arrow 	→ 	pointer (on a dial) 	13
8958 	arrow 	→ 	fibula (anat.) 	1
8959 	finger / toe 	→ 	pointer (on a dial) 	2
8960 	needle (sewing) 	→ 	pointer (on a dial) 	23
8961 	tongue (body part) 	→ 	pointer (on a dial) 	3
8962 	thorn 	→ 	pointer (on a dial) 	3
8963 	tongue (body part) 	→ 	pendulum 	2
8964 	eye 	→ 	drop (n.) 	3
8965 	eye 	→ 	fireplace 	6
8966 	to stop (intr.) 	→ 	comma 	1
8967 	fusilier 	→ 	caesionid fish 	5
8968 	goat 	→ 	salsify 	3
8969 	power, authority 	→ 	territorial entity 	2
8970 	to suck 	→ 	icicle 	1
8971 	right (vs. left) 	→ 	clever, wise 	2
8972 	lamb 	→ 	catkin 	7
8973 	dog 	→ 	catkin 	1
8974 	goat 	→ 	catkin 	1
8975 	cat 	→ 	fur seal 	3
8976 	dog 	→ 	fur seal 	4
8977 	bear (Ursus) 	→ 	fur seal 	3
8978 	right (vs. left) 	— 	good 	20
8979 	right (vs. left) 	→ 	higher in rank 	1
8980 	grandmother 	→ 	queen (bee) 	1
8981 	portion 	→ 	salary 	1
8982 	to cover 	— 	to clothe 	1
8983 	to cover 	— 	to wrap 	1
8984 	step, pace 	→ 	victory 	1
8985 	lion (Panthera leo) 	→ 	big 	1
8986 	mouth 	→ 	sharp point 	2
8987 	throat 	— 	manner, way, method 	1
8988 	foam 	— 	bud (on a twig) 	1
8989 	herder, shepherd 	→ 	<bird> 	3
8990 	mother 	→ 	sediment 	3
8991 	table, desk 	↔ 	seat, chair 	5
8992 	mother 	→ 	ferment, leaven 	1
8993 	toe 	— 	wing 	1
8994 	udder 	— 	desire, wish 	1
8995 	bull 	→ 	brave person 	1
8996 	fire 	→ 	heat (n.) 	2
8997 	fire 	→ 	malaria 	2
8998 	crane (Grus) 	→ 	<dance> 	7
8999 	soul, spirit 	→ 	wishbone, merrythought 	1
9000 	straight 	→ 	right (angle) 	15
9001 	straight 	→ 	vertical, upright 	15
9002 	herder, shepherd 	→ 	cattle egret 	3
9003 	straight 	→ 	straight (angle) 	5
9004 	vertical, upright 	→ 	proud 	2
9005 	skin (of a person) 	→ 	clothes 	2
9006 	lamb 	→ 	black poplar 	3
9007 	worm 	→ 	catkin 	3
9008 	to attach to 	→ 	to love 	4
9009 	liquid (adj.) 	→ 	smooth (surface) 	1
9010 	to become sunburned 	— 	to become scalded 	1
9011 	to perfume 	→ 	to get accustomed 	1
9012 	to do, act 	— 	to cure, treat (medically) 	1
9013 	mirror 	→ 	fried eggs 	6
9014 	sun 	→ 	fried eggs 	2
9015 	fox (Vulpes vulpes) 	→ 	Arctic fox 	25
9016 	ear 	→ 	pillow 	4
9017 	feather 	→ 	pillow 	2
9018 	food 	→ 	cereal 	3
9019 	harm, damage 	→ 	it's a pity 	4
9020 	to stink 	→ 	onion 	1
9021 	to emit smell 	→ 	to fear, be afraid 	2
9022 	part 	→ 	drama (theatre) 	4
9023 	eye 	→ 	human, person 	2
9024 	smell (n.) 	— 	joy 	1
9025 	house 	— 	smell (n.) 	1
9026 	to stink 	→ 	to hate, dislike 	2
9027 	to pull, to draw 	→ 	to mill, grind 	2
9028 	eagle 	→ 	columbine (Aquilegia) 	6
9029 	vigil lamp 	→ 	columbine (Aquilegia) 	2
9030 	pigeon (Columba) 	→ 	columbine (Aquilegia) 	2
9031 	<hat> 	→ 	columbine (Aquilegia) 	2
9032 	water 	→ 	columbine (Aquilegia) 	2
9033 	to perceive smell 	→ 	to suspect 	4
9034 	to walk, to go 	→ 	to wear (clothes) 	2
9035 	to walk, to go 	→ 	to be appropriate (for) 	1
9036 	tooth 	— 	berry 	1
9037 	to suffer 	→ 	passion 	5
9038 	to admire 	↔ 	to see/to look at 	7
9039 	to be surprised 	→ 	to admire 	4
9040 	goat 	→ 	snipe (Gallinago) 	5
9041 	Easter 	→ 	lilac 	1
9042 	olive (Olea europaea) 	→ 	lilac 	1
9043 	Judas tree 	→ 	lilac 	2
9044 	common jasmine 	→ 	lilac 	3
9045 	smoketree 	→ 	lilac 	2
9046 	daphne 	→ 	lilac 	1
9047 	bird cherry tree 	→ 	lilac 	1
9048 	tired 	→ 	pregnant 	2
9049 	back (body part) 	→ 	top, upper part 	5
9050 	louse 	→ 	wood-louse 	3
9051 	piglet 	→ 	vagina 	2
9052 	cold 	→ 	positive evaluation 	2
9053 	fearful, dreadful 	→ 	positive evaluation 	3
9054 	donkey 	→ 	wood-louse 	2
9055 	armadillo 	→ 	wood-louse 	2
9056 	contract, treaty 	→ 	Testament (christianity) 	7
9057 	will (legal document) 	→ 	Testament (christianity) 	19
9058 	contract, treaty 	↔ 	will (legal document) 	3
9059 	law (body of rules) 	→ 	Testament (christianity) 	2
9060 	to pull, to draw 	→ 	to bring up (children) 	3
9061 	shape, form 	→ 	education 	5
9062 	image 	→ 	education 	2
9063 	light (n.) 	→ 	education 	5
9064 	to lead out 	→ 	education 	1
9065 	to take out 	→ 	to make, create 	2
9066 	lip 	→ 	eyelid 	2
9067 	lip 	→ 	coast, shore 	9
9068 	to lead out 	→ 	to follow logically, consequently 	3
9069 	to shut, close 	→ 	to follow logically, consequently 	8
9070 	chariot 	→ 	rook (chess) 	10
9071 	ship, vessel 	→ 	rook (chess) 	5
9072 	right (vs. left) 	— 	strength 	1
9073 	evil (adj.) 	→ 	positive evaluation 	5
9074 	hen 	→ 	night-blindness 	17
9075 	bird 	→ 	night-blindness 	3
9076 	fox (Vulpes vulpes) 	→ 	small tortoise-shell (Aglais urticae) 	5
9077 	fart, flatus 	→ 	puffball 	14
9078 	to swell up 	→ 	puffball 	2
9079 	dust 	→ 	puffball 	5
9080 	smoke 	→ 	puffball 	3
9081 	cheese 	→ 	puffball 	2
9082 	pear 	→ 	puffball 	1
9083 	sphere; ball 	→ 	puffball 	2
9084 	club (a weapon) 	→ 	puffball 	1
9085 	steam bath 	→ 	puffball 	1
9086 	to fly 	→ 	to attack 	2
9087 	faeces 	→ 	puffball 	1
9088 	to attack 	→ 	to rob 	2
9089 	spade, shovel 	→ 	tooth 	2
9090 	water 	→ 	pus 	2
9091 	water 	→ 	juice 	14
9092 	soft (adj.) 	→ 	young 	4
9093 	face 	→ 	fame, reputation 	4
9094 	to measure 	→ 	geometrid 	6
9095 	to see/to look at 	↔ 	eye 	5
9096 	beard + star 	→ 	comet 	3
9097 	education 	— 	to bring up (children) 	2
9098 	to touch 	— 	to hold (in hands) 	7
9099 	to feel 	— 	to touch 	9
9100 	to feel 	→ 	to feel (an emotion) 	3
9101 	to pass through 	→ 	to die 	2
9102 	to flow 	→ 	to follow logically, consequently 	1
9103 	to flow into 	→ 	to influence 	2
9104 	to taste (tr.) 	→ 	to suffer 	1
9105 	taste (n.) 	→ 	interest 	3
9106 	to taste (tr.) 	→ 	to enjoy 	1
9107 	to become visible 	→ 	to be, exist 	1
9108 	to fall down 	→ 	to hit the target 	1
9109 	to touch 	→ 	innocent 	1
9110 	layman 	→ 	warrior 	2
9111 	warrior 	→ 	braggart, boaster 	1
9112 	brave person 	→ 	warrior 	10
9113 	archer 	→ 	soldier 	2
9114 	to see/to look at 	→ 	to recognize 	3
9115 	taste (n.) 	→ 	spice 	1
9116 	tasteless 	→ 	weak 	1
9117 	to hear 	→ 	to agree 	1
9118 	to hear 	→ 	ear 	3
9119 	ear 	→ 	branch, twig 	1
9120 	to perceive smell 	— 	nose 	2
9121 	to stink 	→ 	strength 	1
9122 	mouth 	→ 	kiss 	4
9123 	to perfume 	→ 	to ingratiate, befriend 	1
9124 	nail (body part) 	— 	thumb 	1
9125 	water 	→ 	rain 	12
9126 	bird 	— 	butterfly 	2
9127 	to melt, thaw 	— 	dew 	1
9128 	bird 	→ 	child 	1
9129 	dim 	→ 	stupid 	1
9130 	hump (of a person or camel) 	→ 	to work 	2
9131 	cow 	→ 	meat 	5
9132 	wing 	→ 	grand piano 	4
9133 	king's counselor 	→ 	queen (chess) 	20
9134 	king's counselor 	→ 	bishop (chess) 	7
9135 	old (vs. young) 	→ 	ripe (fruit) 	6
9136 	young 	→ 	white 	1
9137 	old (vs. young) 	→ 	black 	1
9138 	teacher 	→ 	queen (bee) 	1
9139 	fish 	— 	meat 	5
9140 	queen 	→ 	queen (chess) 	45
9141 	flag, banner 	→ 	queen (chess) 	1
9142 	lady 	→ 	queen (chess) 	21
9143 	<military rank> 	→ 	queen (chess) 	2
9144 	to ride (e.g., a horse) 	→ 	ready 	2
9145 	to prepare 	→ 	to cook 	7
9146 	pomegranate 	→ 	garnet 	9
9147 	grain, seed 	→ 	pomegranate 	1
9148 	to lose memory 	→ 	to lose consciousness 	4
9149 	to follow, go after smb. 	→ 	to recompense 	1
9150 	to see/to look at 	→ 	to follow, go after smb. 	1
9151 	object 	→ 	school subject 	9
9152 	light (vs. heavy) 	→ 	aluminium 	5
9153 	to see/to look at 	→ 	to watch, stare 	1
9154 	to feel, perceive touch 	→ 	to know 	1
9155 	to touch 	→ 	to tame (animal) 	1
9156 	taste (n.) 	→ 	to spice (food) 	1
9157 	to swallow 	→ 	to restrain, control one’s feelings 	1
9158 	smell (n.) 	→ 	to perfume 	1
9159 	to sound 	→ 	vowel 	1
9160 	to hear / to listen 	→ 	clever, wise 	1
9161 	to hear / to listen 	→ 	curious 	1
9162 	to desire 	→ 	to have sexual desire 	2
9163 	dream (during sleep) 	→ 	ejaculation 	3
9164 	to lay out 	→ 	to teach 	3
9165 	to desire 	→ 	youth 	2
9166 	shadow 	→ 	surveillance 	6
9167 	shadow 	→ 	dubious legality 	3
9168 	grey 	→ 	dubious legality 	6
9169 	tail 	→ 	surveillance 	4
9170 	dairy product 	→ 	butterfly 	8
9171 	to hear / to listen 	↔ 	to eavesdrop 	9
9172 	cone (fruit) 	→ 	cone (geometr.) 	6
9173 	roof 	→ 	mind (n.) 	2
9174 	to breed (animals) 	→ 	to bring up (children) 	1
9175 	trace 	→ 	to investigate 	3
9176 	to crucify 	→ 	to hang (tr.) 	2
9177 	to hang (tr.) 	→ 	to weigh (tr.) 	2
9178 	pole (long stick) 	→ 	Pole Star 	6
9179 	nail (metal spike) 	→ 	Pole Star 	3
9180 	to bring 	→ 	to cause 	10
9181 	to catch 	→ 	to fall ill 	7
9182 	skull 	— 	coconut shell 	4
9183 	gall bladder 	→ 	courage 	3
9184 	ladle 	→ 	Big Dipper (Ursa Major) 	8
9185 	plough, ard 	→ 	Big Dipper (Ursa Major) 	4
9186 	carriage 	→ 	Big Dipper (Ursa Major) 	26
9187 	bear (Ursus) 	→ 	Big Dipper (Ursa Major) 	3
9188 	to boil (liquid) (tr.) 	→ 	to boil (food) (tr.) 	6
9189 	trace 	→ 	surveillance 	3
9190 	cannon (weapon) 	→ 	rook (chess) 	3
9191 	seven 	→ 	Big Dipper (Ursa Major) 	14
9192 	North 	→ 	Big Dipper (Ursa Major) 	5
9193 	arc 	→ 	Big Dipper (Ursa Major) 	2
9194 	tail 	→ 	Big Dipper (Ursa Major) 	2
9195 	duck 	→ 	Big Dipper (Ursa Major) 	2
9196 	nest (n.) 	→ 	Big Dipper (Ursa Major) 	2
9197 	tongue (body part) 	→ 	plaice (fish) 	1
9198 	to foam 	→ 	to get angry 	4
9199 	blind 	→ 	dim 	2
9200 	to blow 	→ 	to provoke 	1
9201 	corner 	— 	angle 	2
9202 	angle 	→ 	diagonal 	2
9203 	to trust / to believe in 	→ 	credit (financial) 	2
9204 	rabies 	→ 	anger 	12
9205 	ear 	→ 	earwig (Forficula auricularia) 	14
9206 	wolf 	→ 	expert, experienced 	2
9207 	belt 	→ 	generation 	1
9208 	beak 	→ 	dog-rose 	1
9209 	wing 	→ 	diphtheria 	1
9210 	strength 	→ 	power (mathematics) 	7
9211 	deer 	→ 	Big Dipper (Ursa Major) 	3
9212 	scissors 	→ 	earwig (Forficula auricularia) 	7
9213 	sin 	→ 	scorpion 	1
9214 	tail 	→ 	scorpion 	1
9215 	lamb 	→ 	milk-tooth, deciduous tooth 	1
9216 	lamb 	→ 	humble 	1
9217 	lamb 	→ 	Boletus luteus 	1
9218 	bear (Ursus) 	→ 	Little Dipper (Ursa Minor) 	2
9219 	to put a hat on 	→ 	to deceive 	2
9220 	to solder 	→ 	to copulate 	1
9221 	tasty 	↔ 	pleasant 	8
9222 	lichen 	→ 	lichen (medicine) 	8
9223 	armpit 	— 	groin 	1
9224 	inclined 	→ 	almost 	1
9225 	place 	→ 	authorities 	1
9226 	meaning, sense 	→ 	dream (during sleep) 	1
9227 	spiritual, nonmaterial 	→ 	adopted child 	1
9228 	wolf 	→ 	puffball 	9
9229 	earth, soil 	→ 	truffle 	2
9230 	mushroom 	— 	cork 	1
9231 	mushroom 	→ 	lie (n.), untruth 	1
9232 	saw 	→ 	sawfish (Pristis) 	6
9233 	school 	→ 	brothel 	1
9234 	female breast 	→ 	earlobe, earlap 	1
9235 	middle, centre 	→ 	institution 	2
9236 	square (in a town) 	→ 	opportunity 	1
9237 	stomach 	→ 	taste (aesthetic) 	1
9238 	disease 	→ 	<curse: bad person> 	5
9239 	germ, microorganism 	→ 	<curse: bad person> 	1
9240 	grey 	→ 	dark-skinned 	3
9241 	malefactor 	→ 	thief 	6
9242 	empty 	→ 	lean, thin (of a person) 	1
9243 	goat 	→ 	tragus 	4
9244 	to stand 	→ 	to be, exist 	8
9245 	<bird> 	→ 	Milky Way 	3
9246 	bird 	→ 	Milky Way 	2
9247 	people, nation 	→ 	people (pl.) 	4
9248 	tower 	→ 	tall person 	2
9249 	weak 	→ 	leprosy 	1
9250 	scales, weighing machine 	→ 	Libra 	21
9251 	child 	→ 	term of address with endearment 	4
9252 	stupid 	↔ 	child (vs. adult) 	2
9253 	to climb 	→ 	to fit in 	1
9254 	to climb 	→ 	to bother, pester 	1
9255 	to reel 	→ 	to spend (money) 	2
9256 	to climb 	→ 	to increase (intr.) 	3
9257 	guest 	→ 	albugo, wall-eye 	1
9258 	closed 	→ 	vague 	1
9259 	to dodge 	→ 	evasive 	2
9260 	friend 	→ 	Budgerigar (Melopsittacus undulatus) 	1
9261 	closed 	→ 	respected, venerable 	1
9262 	<fruit> 	→ 	old man 	1
9263 	saint 	→ 	strange 	2
9264 	naked, bare 	— 	unmarried, single, bachelor 	1
9265 	relation, connection 	→ 	opportunity 	3
9266 	to stink 	→ 	to become infected 	1
9267 	believer 	— 	honest 	1
9268 	cuckoo + flax 	→ 	haircap moss 	4
9269 	hajji 	→ 	teacher 	1
9270 	bad (ethically) 	— 	greedy 	1
9271 	defect 	↔ 	minus 	3
9272 	to lose one's way 	→ 	to fornicate 	1
9273 	to deceive 	→ 	to cheat on, be unfaithful to 	7
9274 	breathing 	→ 	instant, moment 	2
9275 	breathing 	→ 	incantation, spell 	2
9276 	salty 	— 	sweet (taste) 	8
9277 	salty 	→ 	tasty 	1
9278 	ant 	→ 	goosebumps 	2
9279 	number 	→ 	trick, hocus-pocus 	3
9280 	light, bright, clear 	→ 	respected, venerable 	1
9281 	fireplace 	→ 	middle, centre 	2
9282 	goat 	→ 	Capricorn 	13
9283 	son 	→ 	jack (playing card) 	1
9284 	arrow 	→ 	porcupine 	2
9285 	to be, exist 	— 	to become 	4
9286 	shoulder 	→ 	friend 	1
9287 	shoulder 	→ 	luff (of a ship) 	1
9288 	fireplace 	→ 	focus (geometry, optics) 	4
9289 	fire 	→ 	focus (geometry, optics) 	7
9290 	horse 	→ 	Big Dipper (Ursa Major) 	3
9291 	sickle 	→ 	Big Dipper (Ursa Major) 	1
9292 	forehead 	→ 	stoking hole (in a stove) 	4
9293 	top, upper part 	→ 	cream (of milk) 	6
9294 	son 	→ 	fetus 	2
9295 	stomach 	— 	fetus 	1
9296 	son 	→ 	womb, uterus 	2
9297 	bee swarm 	→ 	lemon balm (Melissa) 	4
9298 	virtue 	→ 	penis 	1
9299 	middle, centre 	→ 	approximately 	1
9300 	middle, centre 	→ 	surroundings 	1
9301 	to pass by 	→ 	to fit 	1
9302 	bee 	→ 	lemon balm (Melissa) 	9
9303 	lemon 	→ 	lemon balm (Melissa) 	8
9304 	honey 	→ 	lemon balm (Melissa) 	2
9305 	mint (Mentha) 	→ 	lemon balm (Melissa) 	1
9306 	grass, herb 	→ 	poison 	2
9307 	to sit 	→ 	to fit 	2
9308 	opinion 	→ 	vote 	2
9309 	to play (intr.) 	→ 	frivolous 	1
9310 	to play (intr.) 	→ 	joint, articulation 	1
9311 	to play (intr.) 	→ 	to neglect 	1
9312 	to play (intr.) 	→ 	to move (intr.) 	4
9313 	to play (intr.) 	→ 	to flirt 	2
9314 	to play (intr.) 	→ 	to deceive 	2
9315 	queen (bee) 	→ 	lemon balm (Melissa) 	2
9316 	other 	→ 	next 	1
9317 	bile, gall 	→ 	to fear, be afraid 	1
9318 	to find out 	— 	to learn, study 	2
9319 	foal 	→ 	foalfoot (Tussilago farfara) 	1
9320 	to cough 	→ 	foalfoot (Tussilago farfara) 	1
9321 	foot 	→ 	foalfoot (Tussilago farfara) 	2
9322 	bull 	→ 	hornbill (Bucerotidae) 	1
9323 	<measure of weight> 	→ 	scale, scope 	1
9324 	to carry 	→ 	to wear (clothes) 	5
9325 	to measure 	→ 	to think, consider 	1
9326 	to kill 	→ 	to waste 	5
9327 	to throw 	→ 	waste, trash 	2
9328 	life 	→ 	pleasure 	5
9329 	to kiss 	→ 	to collide 	2
9330 	duck 	→ 	bedpan 	9
9331 	to crumple 	→ 	to weaken, loosen 	1
9332 	to cover 	→ 	to conceal, keep secret 	5
9333 	to play (intr.) 	→ 	to twinkle, glimmer 	3
9334 	to grasp, seize 	→ 	to strike, hit 	2
9335 	raspberry 	→ 	European robin 	6
9336 	heart 	→ 	lemon balm (Melissa) 	3
9337 	to braid, plait, weave 	→ 	spider 	6
9338 	spider 	→ 	shrike (Lanius) 	1
9339 	other 	→ 	the day before yesterday 	2
9340 	to sing 	→ 	chatter, idle talk 	2
9341 	to sleep 	→ 	to dream while sleeping 	3
9342 	to burn (tr.) 	→ 	to frostbite 	2
9343 	fetters 	→ 	obstacle 	1
9344 	shoe 	→ 	mountain foot 	1
9345 	<fish> 	→ 	whore 	2
9346 	devil, satan 	→ 	very, of high degree 	4
9347 	to be, exist 	→ 	to want 	3
9348 	to shine, glitter 	→ 	good weather 	1
9349 	to shine, glitter 	→ 	to get angry 	1
9350 	paw 	→ 	sole (of shoe) 	1
9351 	to rivet 	→ 	to copulate 	1
9352 	to rivet 	→ 	to strengthen 	1
9353 	evil spirit 	→ 	epilepsy 	1
9354 	moon 	→ 	ocean sunfish (Mola mola) 	21
9355 	sun 	→ 	ocean sunfish (Mola mola) 	3
9356 	butterfly 	→ 	ocean sunfish (Mola mola) 	1
9357 	moth 	→ 	propeller (of boat engine) 	2
9358 	Friday 	→ 	Saturday 	4
9359 	sawfish (Pristis) 	→ 	joiner, cabinetmaker 	1
9360 	step (of a staircase, step-ladder) 	→ 	power (mathematics) 	3
9361 	to rivet 	→ 	to defeat, win 	2
9362 	millstone 	→ 	ocean sunfish (Mola mola) 	4
9363 	head 	→ 	ocean sunfish (Mola mola) 	4
9364 	barrel 	→ 	wineskin 	2
9365 	wineskin 	→ 	ocean sunfish (Mola mola) 	3
9366 	wheel 	→ 	ocean sunfish (Mola mola) 	3
9367 	lump 	→ 	ocean sunfish (Mola mola) 	4
9368 	carrion 	→ 	<curse: bad person> 	10
9369 	to sing 	→ 	to talk nonsense 	2
9370 	bark (of a tree) 	→ 	cinnamon 	7
9371 	black 	→ 	ink 	14
9372 	bridge 	→ 	porch 	2
9373 	to split, chop 	→ 	to feel pain, ache 	5
9374 	to steam out 	— 	to be sultry 	3
9375 	tail 	→ 	grand piano 	6
9376 	peace 	→ 	<greeting> 	5
9377 	trunk (of a tree) 	→ 	Boletus edulis 	1
9378 	clever, wise 	→ 	witty 	5
9379 	deficiency, lack 	→ 	to need 	3
9380 	deficiency, lack 	↔ 	error, defect 	7
9381 	monarch 	→ 	king (chess) 	81
9382 	error, defect 	→ 	guilt, guilty 	5
9383 	to tie 	→ 	duty, responsibility 	7
9384 	to deceive 	→ 	to seduce 	1
9385 	miracle 	→ 	positive evaluation 	13
9386 	to eat 	→ 	to bore 	4
9387 	dirty 	→ 	bad 	1
9388 	dirty 	→ 	obscene 	4
9389 	one, single 	→ 	the same one 	7
9390 	to pull, to draw 	→ 	train 	5
9391 	one, single 	→ 	almost 	3
9392 	soul, spirit 	→ 	witty 	5
9393 	dog 	→ 	miserable, unhappy 	3
9394 	skin (of a person) 	→ 	human, person 	2
9395 	chatter, idle talk 	→ 	parrot 	1
9396 	navel 	→ 	boss of a shield 	3
9397 	grain, seed 	→ 	maize 	12
9398 	wheat 	↔ 	maize 	6
9399 	millet 	→ 	maize 	8
9400 	rice 	→ 	wheat 	2
9401 	rice 	→ 	maize 	2
9402 	pillar 	→ 	tetanus (disease) 	3
9403 	manger (for animals) 	→ 	day nursery 	8
9404 	to stand + <localization> 	→ 	to understand 	9
9405 	moon 	→ 	satellite of a planet 	8
9406 	to cook 	→ 	to learn, study 	1
9407 	language 	— 	to quarrel 	1
9408 	fox (Vulpes vulpes) 	↔ 	jackal 	6
9409 	to conceive, become pregnant 	↔ 	to conceive, form in the mind 	4
9410 	to gather, collect 	→ 	to understand 	1
9411 	bodyguard 	→ 	satellite of a planet 	5
9412 	flea 	→ 	plantain (Plantago) 	1
9413 	<insect> 	→ 	mental problems 	2
9414 	town, city 	→ 	politics 	3
9415 	to stand + <localization> 	→ 	to know 	1
9416 	noble 	→ 	good 	2
9417 	Mary, mother of Jesus + <insect> 	→ 	ladybird 	7
9418 	Mary, mother of Jesus + hen 	→ 	ladybird 	2
9419 	Mary, mother of Jesus + bird 	→ 	ladybird 	1
9420 	Mary, mother of Jesus + priest (Christianity) 	→ 	ladybird 	1
9421 	to separate 	— 	sacred, holy 	1
9422 	to swell up 	→ 	to conceive, become pregnant 	1
9423 	torso 	— 	middle, centre 	1
9424 	pig (Sus scrofa) 	→ 	livestock 	3
9425 	white 	→ 	person of the Caucasian race 	6
9426 	dragonfly 	→ 	helicopter 	2
9427 	garden 	— 	work (n.) 	2
9428 	tree 	→ 	cross (n.) 	4
9429 	under, below 	→ 	earlier 	2
9430 	above 	→ 	next 	3
9431 	road 	— 	side (n.) 	1
9432 	dirty 	— 	sin 	1
9433 	to open (tr.) 	→ 	to decorticate, debark 	1
9434 	angry 	— 	enemy 	1
9435 	to duck 	→ 	to enter 	1
9436 	bone 	→ 	consonant 	1
9437 	meat 	→ 	vowel 	1
9438 	bone 	— 	stick (n.) 	5
9439 	forbidden 	→ 	sacred, holy 	18
9440 	vine (any climbing plant) 	— 	rope, cord 	2
9441 	food 	→ 	Holy Communion 	3
9442 	to get, obtain 	→ 	to give birth 	3
9443 	house 	↔ 	village 	18
9444 	equal, identical / the same one 	→ 	however 	10
9445 	quick 	→ 	active, agile 	5
9446 	rough, uneven 	→ 	obstacle 	1
9447 	proper arrangement, order 	→ 	decent 	2
9448 	benediction, blessing 	→ 	rain 	1
9449 	colour 	→ 	result, outcome 	1
9450 	thread 	→ 	relation, connection 	2
9451 	soul, spirit 	→ 	essence, extract 	1
9452 	must (in winemaking) 	→ 	mustard (spice) 	5
9453 	equal, identical 	→ 	the same one 	5
9454 	one, single 	→ 	equal, identical 	5
9455 	to think, consider 	→ 	to miss somebogy, long for 	4
9456 	enemy 	— 	distant place 	1
9457 	new 	— 	unripe (fruit) 	4
9458 	new 	— 	raw 	7
9459 	raw 	→ 	alive 	6
9460 	foot 	→ 	road 	3
9461 	burrow (of animal) 	— 	fontanelle 	1
9462 	to dig 	→ 	to plant 	2
9463 	bird + language 	→ 	Tok Pisin 	3
9464 	equal, identical 	→ 	indifferent 	12
9465 	to lack 	→ 	fool 	1
9466 	bottom 	— 	mountain foot 	1
9467 	kind, good-hearted 	→ 	index finger 	1
9468 	kind, good-hearted 	→ 	cultivated (plant) 	1
9469 	stump (of tree) 	→ 	thumb 	1
9470 	bud (on a twig) 	→ 	swelling (on skin) 	1
9471 	awake 	→ 	vigilant 	10
9472 	fly (n.) 	→ 	freckle 	2
9473 	fragile 	→ 	pregnant 	1
9474 	bone 	— 	branch, twig 	3
9475 	to hang (tr.) 	— 	to build 	2
9476 	to hear / to listen 	— 	to ask, inquire 	2
9477 	plough, ard 	→ 	vomer (bone) 	9
9478 	red 	→ 	raw 	2
9479 	to cut 	→ 	to understand 	3
9480 	horn 	→ 	wind musical instrument 	22
9481 	bone 	→ 	die (n.) 	9
9482 	good 	→ 	although 	4
9483 	voice 	→ 	vowel 	12
9484 	to fear, be afraid 	— 	to beware, be careful 	2
9485 	to become light (in weight) 	→ 	to give birth 	1
9486 	hot 	→ 	to feel pain, ache 	6
9487 	to have opinion 	→ 	almost 	1
9488 	near 	→ 	almost 	5
9489 	firm, durable 	→ 	stingy 	1
9490 	equal, identical 	→ 	although 	1
9491 	the same one 	→ 	even (conj) 	3
9492 	near 	→ 	approximately 	9
9493 	camel 	↔ 	giraffe 	10
9494 	neck 	→ 	giraffe 	4
9495 	camel 	↔ 	elephant 	2
9496 	odd (of numbers) 	→ 	strange 	3
9497 	to become 	→ 	may, to be allowed 	1
9498 	simple 	→ 	only 	3
9499 	simple 	— 	pure 	1
9500 	healthy 	— 	right (vs. left) 	1
9501 	healthy 	→ 	certainly, for sure 	1
9502 	field 	→ 	area (of knowledge/activity) 	5
9503 	owner 	→ 	having a certain quality 	3
9504 	to stink 	→ 	blackcurrant 	3
9505 	certainly, for sure 	→ 	probably 	10
9506 	to fear, be afraid 	— 	to care for, look after 	3
9507 	around 	→ 	approximately 	5
9508 	two 	→ 	to doubt 	2
9509 	to obey 	→ 	to belong 	3
9510 	to stink 	→ 	bird cherry tree 	1
9511 	knee 	→ 	tribe 	2
9512 	good + lineage 	→ 	noble 	2
9513 	mind (n.) 	→ 	manner, way, method 	9
9514 	third-person singular 	→ 	<disease> 	2
9515 	night 	— 	black 	8
9516 	good 	— 	sweet (taste) 	8
9517 	knee 	— 	lap 	5
9518 	flood, deluge 	→ 	disaster, catastrophe 	2
9519 	behind 	→ 	inheritance 	2
9520 	sky 	→ 	iron 	2
9521 	present, gift 	→ 	portion 	3
9522 	road 	— 	caravan 	3
9523 	bowels, intestine 	— 	omen 	1
9524 	throat 	— 	breathing 	1
9525 	tendon 	↔ 	rope, cord 	4
9526 	head 	→ 	human, person 	10
9527 	to spring, jump 	→ 	to escape, flee 	4
9528 	to pick, gather 	→ 	to remove, eliminate 	1
9529 	mountain 	→ 	East 	2
9530 	mountain 	→ 	foreign land 	1
9531 	to hang (tr.) 	→ 	to show, indicate 	1
9532 	host (Christianity) 	→ 	<curse> 	3
9533 	foot/leg 	→ 	trunk (of a tree) 	4
9534 	to ask for, request 	→ 	beggar 	2
9535 	to ask, inquire 	→ 	beggar 	1
9536 	shin 	→ 	stem (of a plant) 	1
9537 	heavy (of weight) 	→ 	boring 	1
9538 	to protect 	→ 	to hide (tr.) 	3
9539 	to protect 	— 	to preserve 	4
9540 	salad 	→ 	cucumber 	1
9541 	to sway 	→ 	to masturbate 	1
9542 	snail 	→ 	cochlea 	17
9543 	straw + road 	→ 	Milky Way 	3
9544 	flag, banner 	→ 	<administrative division> 	3
9545 	tortoise, turtle 	→ 	ladybird 	1
9546 	yellow 	→ 	blonde 	2
9547 	to scold 	→ 	to swear, curse 	2
9548 	sacred, holy 	→ 	<curse: bad person> 	1
9549 	fire 	— 	red 	13
9550 	flower 	— 	red 	3
9551 	<vessel> 	→ 	basin (geographical depression ) 	4
9552 	harbour, port 	— 	bridge 	3
9553 	yellow 	→ 	wasp 	3
9554 	steep 	→ 	difficult 	3
9555 	to sell 	→ 	to pretend 	1
9556 	short (size) 	→ 	soon 	3
9557 	brief 	→ 	recently 	2
9558 	short / brief 	→ 	deficiency, lack 	4
9559 	to bend, bow (intr.) 	→ 	to avoid 	2
9560 	<natural fibres> + stone (piece of rock) 	→ 	asbestos 	10
9561 	cold 	→ 	aspic (dish) 	6
9562 	not to know 	→ 	some, several 	3
9563 	fire + stone (piece of rock) 	→ 	flint 	10
9564 	stone (piece of rock) + steel 	→ 	flint 	3
9565 	steep 	→ 	positive evaluation 	1
9566 	to incline 	→ 	grammatical mood 	4
9567 	finger-ring 	→ 	vertebra 	3
9568 	to turn, rotate (intr.) 	→ 	vertebra 	2
9569 	bead 	→ 	vertebra 	2
9570 	link of a chain 	→ 	vertebra 	3
9571 	boomerang 	→ 	crescent 	1
9572 	manner, way, method 	→ 	grammatical mood 	9
9573 	<insect> 	→ 	bug (spy device) 	9
9574 	bile, gall + black 	→ 	sadness, melancholy 	5
9575 	mud 	→ 	paint, dye (n.) 	3
9576 	ear 	→ 	seat of intelligence and perception 	9
9577 	full 	→ 	to accomplish 	5
9578 	sphere; ball 	→ 	testicle 	8
9579 	to blow 	→ 	to smoke (tobacco) 	4
9580 	opening, hole 	→ 	grave, tomb 	8
9581 	blood 	→ 	Mars 	2
9582 	to think, consider 	— 	to know 	3
9583 	to enter 	→ 	to clothe 	5
9584 	to feel pain, ache 	→ 	resentment, offense 	3
9585 	children 	→ 	Orion's Belt 	3
9586 	to go up 	→ 	to mount a horse 	7
9587 	roof beam 	→ 	Milky Way 	2
9588 	to choose 	↔ 	to distinguish 	4
9589 	pearl 	→ 	psoriasis 	1
9590 	pearl 	→ 	rue ( Ruta graveolens) 	1
9591 	saddle 	→ 	buttock 	1
9592 	anger 	→ 	war 	2
9593 	voice + without 	→ 	consonant 	2
9594 	to love 	→ 	to copulate 	12
9595 	mouse 	→ 	arsenic 	4
9596 	to defecate 	— 	to harm, damage 	2
9597 	bull 	→ 	common starling 	1
9598 	bull + tail 	→ 	motherwort (Leonurus) 	1
9599 	white 	→ 	plate armour 	4
9600 	mother 	→ 	motherwort (Leonurus) 	4
9601 	<bird> + footprint, track 	→ 	motherwort (Leonurus) 	2
9602 	wasteland 	→ 	motherwort (Leonurus) 	3
9603 	heart 	→ 	motherwort (Leonurus) 	9
9604 	lion (Panthera leo) + ear 	→ 	motherwort (Leonurus) 	2
9605 	voice + together 	→ 	consonant 	3
9606 	mind (n.) + to step off 	→ 	to go mad 	1
9607 	clever, wise 	→ 	midwife 	4
9608 	to need 	→ 	to urinate 	2
9609 	heavy (of weight) 	→ 	gloomy, depressed 	4
9610 	boredom 	→ 	to miss somebogy, long for 	4
9611 	to lie (posture) 	→ 	to be imprisoned 	4
9612 	missing, failing 	→ 	to miss somebogy, long for 	5
9613 	alpha 	→ 	dominant male 	2
9614 	alpha 	→ 	beginning 	2
9615 	Arctic fox 	→ 	swearword 	1
9616 	to squeeze 	→ 	to shoot 	1
9617 	line 	→ 	queue 	6
9618 	line 	→ 	opportunity 	2
9619 	line 	→ 	table, desk 	1
9620 	plasterer, stucco worker 	→ 	Eurasian nuthatch 	2
9621 	nerve 	→ 	to be nervous 	8
9622 	onion 	— 	bulb (of plant) 	2
9623 	end (space) 	→ 	afterwards, later 	1
9624 	end (space) 	→ 	result, outcome 	1
9625 	question 	→ 	hardship 	2
9626 	to ask, inquire 	→ 	duty, responsibility 	1
9627 	to peel off (about skin) 	→ 	to undress (tr.) 	1
9628 	to extinguish 	→ 	to calm down 	3
9629 	to say 	— 	to sing 	2
9630 	to call 	→ 	to awaken, wake up 	3
9631 	water 	→ 	vain, in vain 	1
9632 	water 	→ 	approximately 	1
9633 	spine, backbone 	→ 	generation 	1
9634 	to drive, force to move on 	→ 	to plough 	1
9635 	<vegetable> 	→ 	fool 	3
9636 	happiness, luck 	— 	opportunity 	2
9637 	peach 	→ 	kiss 	1
9638 	sugar 	→ 	dear, darling 	6
9639 	foot 	→ 	floor (vs. ceiling) 	2
9640 	destiny 	— 	happiness, luck 	1
9641 	comb 	→ 	gills 	1
9642 	comb 	→ 	scallop (Pecten iacolaens) 	3
9643 	date 	— 	history 	11
9644 	field 	→ 	Eurasian skylark 	3
9645 	elephant 	→ 	rook (chess) 	3
9646 	horned 	→ 	bishop (chess) 	2
9647 	old man 	→ 	bishop (chess) 	5
9648 	<noble rank, title> 	→ 	bishop (chess) 	2
9649 	courier 	→ 	bishop (chess) 	5
9650 	stone (piece of rock) 	→ 	playing piece (in a board game) 	6
9651 	testicle 	→ 	brave 	3
9652 	stone (piece of rock) + oil (food) 	→ 	kerosene 	3
9653 	stone (piece of rock) + heart 	→ 	severe, harsh 	1
9654 	stranger, foreign 	→ 	<ethnic group> 	1
9655 	<foreigner> 	→ 	<blood-sucking insect> 	11
9656 	blood + hare (Lepus) 	→ 	purple 	1
9657 	hare (Lepus) + ear 	→ 	Cyclamen 	1
9658 	one, single 	— 	odd (of numbers) 	1
9659 	to turn over 	→ 	to die 	1
9660 	thread 	→ 	string (of a musical instrument) 	3
9661 	education 	— 	reins 	1
9662 	to sweat 	→ 	to sprout (of moustaches, beard) 	1
9663 	to sweat 	→ 	to get tired 	3
9664 	mole (Talpa) 	→ 	spy 	5
9665 	prayer beads 	→ 	wood-louse 	1
9666 	crocodile 	→ 	Egyptian plover (Pluvianus aegyptius) 	5
9667 	archer 	→ 	expert, experienced 	1
9668 	grain, seed 	→ 	sperm 	2
9669 	swelling (on skin) 	→ 	truffle 	1
9670 	bud (on a twig) 	— 	bud (of a flower) 	3
9671 	tree resin, gum 	— 	tar 	3
9672 	tree resin, gum 	→ 	rubber 	3
9673 	oil (food) + stone (material) 	→ 	petroleum, oil 	8
9674 	oil (food) + mountain 	→ 	petroleum, oil 	2
9675 	oil (food) + earth 	→ 	petroleum, oil 	2
9676 	to gather, collect 	→ 	to gain self-control, mentally focus, concentrate 	2
9677 	sack, bag 	→ 	cochlea 	1
9678 	crane (Grus) 	→ 	ibis (Threskiornithidae) 	1
9679 	<bird> + foot 	→ 	Ranunculus 	5
9680 	to hold (in hands) 	→ 	to preserve 	3
9681 	to hold (in hands) 	→ 	to arrest 	2
9682 	to grasp, seize 	→ 	eclipse 	2
9683 	to hold (in hands) 	→ 	to adhere, support 	2
9684 	to grasp, seize 	→ 	epilepsy 	2
9685 	to fall down 	→ 	epilepsy 	5
9686 	to grasp, seize 	→ 	seizure (of a disease) 	2
9687 	to grasp, seize 	→ 	to feel pain, ache 	1
9688 	to hold (in hands) 	→ 	to use 	1
9689 	toilet 	— 	dress (feminine) 	2
9690 	petroleum, oil 	→ 	petrol, gasoline (motor fuel) 	9
9691 	petroleum, oil 	→ 	kerosene 	10
9692 	oil (food) + light (n.) 	→ 	kerosene 	1
9693 	oil (food) + earth 	→ 	kerosene 	3
9694 	water + fire 	→ 	petroleum, oil 	1
9695 	oil (food) + fire 	→ 	kerosene 	9
9696 	oil (food) + fire 	→ 	petroleum, oil 	1
9697 	oil (food) + mine (underground tunnel) 	→ 	petroleum, oil 	1
9698 	water + fire 	→ 	kerosene 	3
9699 	coal + oil (food) 	→ 	kerosene 	6
9700 	foreign + oil (food) 	→ 	kerosene 	10
9701 	water + oil (food) 	→ 	kerosene 	2
9702 	to stink + oil (food) 	→ 	kerosene 	1
9703 	foreign + oil (food) 	→ 	petrol, gasoline (motor fuel) 	2
9704 	steam, vapour + oil (food) 	→ 	petrol, gasoline (motor fuel) 	12
9705 	electricity + oil (food) 	→ 	petrol, gasoline (motor fuel) 	3
9706 	stone (material) + oil (food) 	→ 	petrol, gasoline (motor fuel) 	1
9707 	petroleum, oil + light (n.) 	→ 	kerosene 	1
9708 	to dig + oil (food) 	→ 	petroleum, oil 	1
9709 	to stink + water 	→ 	petroleum, oil 	1
9710 	butter 	→ 	Ranunculus 	4
9711 	gold 	→ 	Ranunculus 	2
9712 	yellow 	→ 	Ranunculus 	2
9713 	forehead 	→ 	pubis 	3
9714 	dragon 	→ 	seahorse (Hippocampus) 	2
9715 	face 	→ 	cover, lid 	1
9716 	hand/arm 	— 	fin 	7
9717 	to copulate + water 	→ 	dragonfly 	5
9718 	stick insect 	— 	mantis 	5
9719 	star 	— 	firefly 	8
9720 	louse 	— 	flea 	9
9721 	cicada 	— 	cricket (insect) 	4
9722 	stick (n.) 	→ 	stick insect 	6
9723 	honey 	→ 	dear, darling 	2
9724 	spear 	→ 	penis 	4
9725 	<sharp tool> 	→ 	insult, offence 	2
9726 	calabash 	→ 	cucumber 	1
9727 	not to know 	→ 	to ignore, disregard 	13
9728 	not to know 	→ 	to miss somebogy, long for 	2
9729 	to breathe + outwards 	→ 	to die 	7
9730 	to find + outwards 	→ 	to invent 	4
9731 	claw (of a crustacean) 	→ 	water soldier (plant) 	4
9732 	to cut 	→ 	water soldier (plant) 	5
9733 	to emit smoke 	→ 	tobacco (Nicotiana tabacum) 	1
9734 	fluff / down (of feather) 	→ 	wealth 	2
9735 	fur / wool 	→ 	wooly milkcap (Lactarius torminosus) 	3
9736 	<sharp tool> 	→ 	water soldier (plant) 	2
9737 	strange 	→ 	monster (abnormal creature) 	2
9738 	knot 	→ 	obstacle 	2
9739 	knot 	→ 	relation, connection 	2
9740 	knot 	→ 	node (anatomy) 	7
9741 	common, shared + woman 	→ 	whore 	1
9742 	lord, master 	→ 	expert, experienced 	3
9743 	to sleep 	→ 	pancreas 	3
9744 	mangy, scabby 	→ 	field scabious (Knautia arvensis) 	3
9745 	far away 	→ 	unlikely, less probable 	1
9746 	space 	→ 	space, universe 	14
9747 	three 	→ 	clover 	10
9748 	to shout 	→ 	to sing 	2
9749 	top, upper part 	→ 	clothes 	2
9750 	top, upper part 	→ 	chief, boss 	4
9751 	valley 	→ 	manner, way, method 	1
9752 	tuberculosis 	— 	tumor 	1
9753 	dead (adj.) 	→ 	consonant 	2
9754 	alive 	→ 	vowel 	2
9755 	elder 	→ 	best 	2
9756 	weight 	→ 	rhythm, meter 	3
9757 	dust 	→ 	many, much 	3
9758 	grandchild 	↔ 	descendant 	8
9759 	space 	→ 	room 	4
9760 	sky 	→ 	space, universe 	3
9761 	fish 	— 	cephalopod 	10
9762 	fish 	— 	tortoise, turtle 	19
9763 	fish 	— 	crocodile 	7
9764 	crab 	→ 	scorpion 	5
9765 	to urinate + eye 	→ 	mantis 	3
9766 	to strike, hit 	— 	stress (linguistics) 	2
9767 	mother 	→ 	vowel 	6
9768 	to strike, hit 	→ 	to pretend 	1
9769 	to strike, hit 	→ 	to penetrate, get into 	1
9770 	child (son or daughter) 	→ 	consonant 	6
9771 	to strike, hit 	→ 	to prick 	1
9772 	to strike, hit 	→ 	to go, walk 	1
9773 	wallaby 	→ 	fish 	2
9774 	body 	— 	height (of a person) 	4
9775 	desert (n.) 	— 	stranger, foreign 	1
9776 	to load (weapon) 	→ 	to charge (battery) 	9
9777 	Samsara 	→ 	space, universe 	1
9778 	man 	→ 	brother 	4
9779 	woman 	→ 	left 	2
9780 	woman 	→ 	sister 	6
9781 	fat 	→ 	catfish 	1
9782 	mother 	→ 	left 	1
9783 	father 	→ 	right (vs. left) 	1
9784 	throat 	→ 	opening, hole 	1
9785 	foliage 	— 	contrary, opposite (logical) 	19
9786 	head 	→ 	source (of a river) 	6
9787 	thin 	→ 	front vowel 	3
9788 	mat, bedding 	→ 	whore 	2
9789 	captive 	→ 	bad 	2
9790 	to pour 	→ 	to fall (of rain, snow) 	2
9791 	to wet, moisten 	→ 	to fall (of rain, snow) 	2
9792 	to live, be alive 	→ 	enough 	3
9793 	Jewish 	→ 	stingy 	10
9794 	tube, pipe 	→ 	barrel (of a gun) 	3
9795 	tube, pipe 	→ 	television 	2
9796 	rear end 	— 	back (body part) 	2
9797 	hard, solid 	→ 	long (time) 	1
9798 	open (adj.) 	→ 	obscene 	2
9799 	alive 	→ 	flowing (vs. standing, of water) 	2
9800 	head 	→ 	club (a weapon) 	3
9801 	head + arm 	→ 	shoulder 	3
9802 	to breathe 	→ 	fontanelle 	7
9803 	face 	→ 	before (temporal) 	2
9804 	blood 	→ 	money 	1
9805 	to bite 	→ 	to tear, rend 	2
9806 	nose + horn 	→ 	nostril 	1
9807 	heart 	— 	happy 	1
9808 	to feel good 	— 	to awaken, wake up 	1
9809 	to tangle 	→ 	to confuse (with) 	4
9810 	to touch 	→ 	rhyme 	2
9811 	soft (adj.) 	→ 	easy 	4
9812 	to sleep 	→ 	carotid 	2
9813 	<numeral> + eye 	→ 	lamprey (Petromyzontidae) 	7
9814 	eye 	→ 	lamprey (Petromyzontidae) 	3
9815 	opening, hole 	→ 	lamprey (Petromyzontidae) 	7
9816 	eel (Anguilla anguilla) 	→ 	lamprey (Petromyzontidae) 	5
9817 	to lick / to suck + stone (piece of rock) 	→ 	lamprey (Petromyzontidae) 	2
9818 	song 	— 	dance (n.) 	11
9819 	worm 	→ 	noodle, pasta 	2
9820 	to cut 	→ 	noodle, pasta 	8
9821 	wing 	— 	branch, twig 	5
9822 	wing 	→ 	leaf 	10
9823 	heart 	→ 	to remember 	2
9824 	dead (adj.) 	→ 	to be out (sport) 	2
9825 	liver + foot/leg 	→ 	calf of a leg 	8
9826 	scrotum + foot/leg 	→ 	calf of a leg 	3
9827 	back of the head, occupit + foot 	→ 	heel (of a foot) 	5
9828 	back (body part) + foot 	→ 	heel (of a foot) 	4
9829 	basket 	→ 	belly 	2
9830 	liver 	→ 	chest (body part) 	7
9831 	mother 	— 	female breast 	11
9832 	to live, be alive 	— 	fat, lard 	3
9833 	shadow / reflection 	→ 	soul, spirit 	11
9834 	soul, spirit 	→ 	ancestor 	2
9835 	shadow / reflection 	→ 	likeness, similarity 	5
9836 	reflection (in the mirror, water) 	→ 	picture 	9
9837 	to live, be alive 	→ 	to grow (plants) 	3
9838 	to live, be alive 	→ 	to convalesce, recover from illness 	8
9839 	to die 	→ 	to be ill, sick 	12
9840 	dead (adj.) 	→ 	calm (about sea) 	6
9841 	to carry 	→ 	to lay eggs 	5
9842 	to give birth 	→ 	to lay eggs 	12
9843 	to be born 	→ 	to come, arrive 	3
9844 	to call 	→ 	vocation 	11
9845 	cat 	→ 	squirrel (Sciurus) 	5
9846 	to split, chop 	→ 	<money> 	1
9847 	to cut 	→ 	<money> 	1
9848 	book (n.) 	→ 	omasum 	11
9849 	<book> 	→ 	omasum 	3
9850 	sheet of paper 	→ 	omasum 	8
9851 	honeycomb 	→ 	reticulum (zoology) 	5
9852 	net (n.) 	→ 	reticulum (zoology) 	13
9853 	sieve (n.) 	→ 	reticulum (zoology) 	1
9854 	cheese 	→ 	abomasum 	6
9855 	scar 	→ 	rumen 	3
9856 	<hat> 	→ 	reticulum (zoology) 	10
9857 	abdomen / belly 	→ 	rumen 	18
9858 	mucus, slime 	→ 	abomasum 	3
9859 	stomach 	— 	abomasum 	2
9860 	to eat 	→ 	sharp 	18
9861 	to eat 	→ 	to burn (tr.) 	2
9862 	to swallow 	→ 	neck / throat 	2
9863 	to lick 	→ 	to taste (tr.) 	8
9864 	to taste (tr.) 	→ 	to feel 	6
9865 	to lick 	↔ 	to suck 	8
9866 	Christian 	→ 	human, person 	13
9867 	Christian 	→ 	peasant, farmer 	1
9868 	peasant, farmer 	→ 	heathen, pagan 	2
9869 	to wake up (intr.) 	→ 	to be surprised 	3
9870 	bird 	→ 	epilepsy 	4
9871 	to sit 	→ 	to ride (e.g., a horse) 	5
9872 	one, single 	→ 	lonely 	6
9873 	palm (body part) 	→ 	handful 	2
9874 	iron 	→ 	vervain 	9
9875 	pigeon (Columba) 	→ 	vervain 	4
9876 	to see/to look at 	→ 	to pay attention 	2
9877 	to touch 	→ 	to strike, hit 	2
9878 	to see/to look at 	→ 	to introspect 	1
9879 	opposite (space) 	→ 	contrary, opposite (logical) 	5
9880 	leper 	→ 	outcast 	2
9881 	to smear, anoint 	→ 	to miss the target 	2
9882 	sponge (animal) 	→ 	sponge (material) 	11
9883 	down (of birds) 	— 	fluff 	7
9884 	to suffer 	→ 	to be damaged 	3
9885 	orange (plant) 	↔ 	lemon 	4
9886 	gold + apple 	→ 	orange (plant) 	3
9887 	sour 	→ 	lemon 	5
9888 	banana 	→ 	penis 	3
9889 	flea 	→ 	suspicious 	1
9890 	pestle 	→ 	pistil 	5
9891 	pillar 	→ 	pistil 	2
9892 	mother 	→ 	pistil 	4
9893 	father 	→ 	stamen 	2
9894 	mark (visible sign) 	→ 	stigma (botany) 	15
9895 	capital (architecture) 	→ 	stigma (botany) 	4
9896 	snout 	→ 	stigma (botany) 	3
9897 	thread 	→ 	stamen 	2
9898 	warp 	→ 	stamen 	3
9899 	to go, walk 	→ 	to continue 	3`);

// Fetch POS for all missing words sequentially and safely
for (const w of wordsNotInDictionaryArr) {
  const pos = await getPOS(w);
  if (pos) {
    wordsToAddToDictionaryArr.push({
      word_type: "word",
      [pos]: [w]
    });
  } else {
    wordsToAddManually.push(w);
  }
}


fs.writeFileSync(
  "wordsNotInDictionary.txt",
  JSON.stringify(wordsToAddManually, null, 2),
  "utf8"
);


fs.writeFileSync(
  "wordsToAddToDictionary.txt",
  JSON.stringify(wordsToAddToDictionaryArr, null, 2),
  "utf8"
);

})();