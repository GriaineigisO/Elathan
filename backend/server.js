import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

// Route imports
import register from "./api-routes/register.js";
import login from "./api-routes/login.js";
import getLanguages from "./api-routes/getLanguages.js";
import getLanguage from "./api-routes/getLanguage.js";
import addLanguage from "./api-routes/addLanguage.js";
import addWord from "./api-routes/addWord.js";
import addEntry from "./api-routes/addEntry.js";
import getEntry from "./api-routes/getEntry.js";
import editEntry from "./api-routes/editEntry.js";
import getAllWords from "./api-routes/getAllWords.js";
import getAllEntries from "./api-routes/getAllEntries.js";
import getAllWordsForPrint from "./api-routes/getAllWordsForPrint.js";
import getWord from "./api-routes/getWord.js";
import getLanguageName from "./api-routes/getLanguageName.js";
import getEncyclopedias from "./api-routes/getEncyclopedias.js";
import getWordData from "./api-routes/getWordData.js";
import getEncyclopedia from "./api-routes/getEncyclopedia.js";
import addEncyclopedia from "./api-routes/addEncyclopedia.js";
import getDaughterLanguages from "./api-routes/getDaughterLanguages.js";
import getMotherLanguage from "./api-routes/getMotherLanguage.js";
import getLoanerLanguage from "./api-routes/getLoanerLanguage.js";
import editLanguage from "./api-routes/editLanguage.js";
import addEtymology from "./api-routes/addEtymology.js";
import getEtymology from "./api-routes/getEtymology.js";
import getEtymologyDictionaryGraph from "./api-routes/getEtymologyDictionaryGraph.js";
import getAllEtymologies from "./api-routes/getAllEtymologies.js";
import editEtymology from "./api-routes/editEtymology.js";
import deleteEtymology from "./api-routes/deleteEtymology.js";
import getDerivations from "./api-routes/getDerivations.js";
import getDescendants from "./api-routes/getDescendants.js";
import getCognates from "./api-routes/getCognates.js";
import getWordForms from "./api-routes/getWordForms.js";
import addGroup from "./api-routes/addGroup.js";
import getGroups from "./api-routes/getGroups.js";
import editGroup from "./api-routes/editGroup.js";
import editWord from "./api-routes/editWord.js";
import deleteWord from "./api-routes/deleteWord.js";
import deleteGroup from "./api-routes/deleteGroup.js";
import deleteLanguage from "./api-routes/deleteLanguage.js";
import getWordCategories from "./api-routes/getWordCategories.js";
import getSynonyms from "./api-routes/getSynonyms.js";
import getUserInfo from "./api-routes/getUserInfo.js";
import getGroup from "./api-routes/getGroup.js";
import getAllLanguages from "./api-routes/getAllLanguages.js";
import getUser from "./api-routes/getUser.js";
import getCollabLanguages from "./api-routes/getCollabLanguages.js";
import getCollabGroups from "./api-routes/getCollabGroups.js";
import checkPermission from "./api-routes/checkPermission.js";
import checkPrivacy from "./api-routes/checkPrivacy.js";
import getTags from "./api-routes/getTags.js";
import getRootWord from "./api-routes/getRootWord.js";
import saveFrequencyList from "./api-routes/saveFrequencyList.js";
import getFrequencyList from "./api-routes/getFrequencyList.js";
import getGrammar from "./api-routes/getGrammar.js";
import saveGrammar from "./api-routes/saveGrammar.js";
import addText from "./api-routes/addText.js";
import getText from "./api-routes/getText.js";
import editText from "./api-routes/editText.js";
import getCorpus from "./api-routes/getCorpus.js";
import getSources from "./api-routes/getSources.js";
import addNewSource from "./api-routes/addNewSource.js";
import deleteSource from "./api-routes/deleteSource.js";
import editSource from "./api-routes/editSource.js";
import changePassword from "./api-routes/changePassword.js";
import getMostWords from "./api-routes/getMostWords.js";
import getMostLanguages from "./api-routes/getMostLanguages.js";
import addInterfaceLanguage from "./api-routes/addInterfaceLanguage.js";
import getInterfaceLanguages from "./api-routes/getInterfaceLanguages.js";
import getAllInterfaceLanguages from "./api-routes/getAllInterfaceLanguages.js";
import getInterfaceLanguage from "./api-routes/getInterfaceLanguage.js";
import editInterfaceLanguage from "./api-routes/editInterfaceLanguage.js";
import editUserLanguage from "./api-routes/editUserLanguage.js";
import getUserLanguage from "./api-routes/getUserLanguage.js";
import saveConlang from "./api-routes/saveConlang.js";
import savePhonology from "./api-routes/savePhonology.js";
import getAllPhonologies from "./api-routes/getAllPhonologies.js";
//import handleEnglishWords from "./api-routes/handleEnglishWords.js";


// Load environment variables
dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// ✅ Manual CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://elathadictionary.com",
    "https://oghma.elathadictionary.com",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Body parsing
app.use(bodyParser.json());
app.use(express.json({ limit: "5mb" }));

// ✅ Routes

app.get("/", (req, res) => res.send("API Root reached."));


app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/getLanguages", getLanguages);
app.post("/api/getLanguage", getLanguage);
app.post("/api/addLanguage", addLanguage);
app.post("/api/addWord", addWord);
app.post("/api/addEntry", addEntry);

app.post("/api/getAllWords", getAllWords);
app.post("/api/getAllEntries", getAllEntries);
app.post("/api/getAllWordsForPrint", getAllWordsForPrint);
app.post("/api/getWord", getWord);
app.post("/api/getLanguageName", getLanguageName);
app.post("/api/getDaughterLanguages", getDaughterLanguages);
app.post("/api/getMotherLanguage", getMotherLanguage);
app.post("/api/getLoanerLanguage", getLoanerLanguage);
app.post("/api/editLanguage", editLanguage);
app.post("/api/addEtymology", addEtymology);
app.post("/api/getEtymology", getEtymology);

app.post("/api/getAllEtymologies", getAllEtymologies);
app.post("/api/editEtymology", editEtymology);
app.post("/api/deleteEtymology", deleteEtymology);
app.post("/api/getDerivations", getDerivations);
app.post("/api/getDescendants", getDescendants);
app.post("/api/getCognates", getCognates);
app.post("/api/getWordForms", getWordForms);
app.post("/api/addGroup", addGroup);
app.post("/api/getGroups", getGroups);
app.post("/api/editGroup", editGroup);
app.post("/api/editWord", editWord);
app.post("/api/deleteWord", deleteWord);
app.post("/api/deleteGroup", deleteGroup);
app.post("/api/getWordCategories", getWordCategories);
app.post("/api/getSynonyms", getSynonyms);
app.post("/api/getUserInfo", getUserInfo);
app.post("/api/getGroup", getGroup);
app.post("/api/getAllLanguages", getAllLanguages);
app.post("/api/getUser", getUser);
app.post("/api/getCollabLanguages", getCollabLanguages);
app.post("/api/getCollabGroups", getCollabGroups);
app.post("/api/deleteLanguage", deleteLanguage);
app.post("/api/checkPermission", checkPermission);
app.post("/api/checkPrivacy", checkPrivacy);
app.post("/api/getTags", getTags);
app.post("/api/getRootWord", getRootWord);
app.post("/api/saveFrequencyList", saveFrequencyList);
app.post("/api/getFrequencyList", getFrequencyList);
app.post("/api/getGrammar", getGrammar);
app.post("/api/saveGrammar", saveGrammar);
app.post("/api/addText", addText);
app.post("/api/getText", getText);
app.post("/api/editText", editText);
app.post("/api/getCorpus", getCorpus);
app.post("/api/getSources", getSources);
app.post("/api/addNewSource", addNewSource);
app.post("/api/deleteSource", deleteSource);
app.post("/api/editSource", editSource);
app.post("/api/changePassword", changePassword);
app.post("/api/getMostWords", getMostWords);
app.post("/api/getMostLanguages", getMostLanguages);
app.post("/api/addInterfaceLanguage", addInterfaceLanguage);
app.post("/api/getInterfaceLanguages", getInterfaceLanguages);
app.post("/api/getAllInterfaceLanguages", getAllInterfaceLanguages);
app.post("/api/getInterfaceLanguage", getInterfaceLanguage);
app.post("/api/editInterfaceLanguage", editInterfaceLanguage);
app.post("/api/editUserLanguage", editUserLanguage);
app.post("/api/getUserLanguage", getUserLanguage);
app.post("/api/saveConlang", saveConlang);
app.post("/api/savePhonology", savePhonology);
app.post("/api/getAllPhonologies", getAllPhonologies);
app.post("/api/getEncyclopedias", getEncyclopedias);
app.post("/api/getEncyclopedia", getEncyclopedia);
app.post("/api/getEntry", getEntry);
app.post("/api/editEntry", editEntry);
app.post("/api/addEncyclopedia", addEncyclopedia);
app.post("/api/getWordData", getWordData);

app.post("/api/getEtymologyDictionaryGraph", getEtymologyDictionaryGraph);
//app.post("/api/handleEnglishWords", handleEnglishWords);



// ✅ Start server (traditional Express)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});