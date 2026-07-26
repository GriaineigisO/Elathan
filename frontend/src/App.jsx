import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./Components/navbar.jsx";
import Home from "./Pages/home.jsx";
import Encyclopedias from "./Pages/encyclopedias.jsx";
import Dictionary from "./Pages/dictionary.jsx";
import Encyclopedia from "./Pages/encyclopedia.jsx";
import PlaceNames from "./Pages/placenames.jsx";
import PersonalNames from "./Pages/personalNames.jsx";
import DictionaryBuilder from "./Components/dictionaryBuilder.jsx";
import Grammar from "./Pages/grammar.jsx";
import Word from "./Pages/word.jsx";
import Group from "./Pages/group.jsx";
import Search from "./Pages/search.jsx";
import User from "./Pages/user.jsx";
import FrequencyList from "./Pages/frequencyList.jsx";
import CorpusList from "./Pages/corpusList.jsx";
import Corpus from "./Pages/corpus.jsx";
import CorpusFrequencyList from "./Pages/corpusFrequencyList.jsx";
import Thesaurus from "./Pages/thesaurus.jsx";
import Welcome from "./Pages/welcome.jsx";
import Account from "./Pages/Account.jsx";
import CreateLanguage from "./Pages/createLanguage.jsx";
import MakeDaughter from "./Pages/makeDaughter.jsx";
import DevTools from "./Pages/devTools.jsx";

function App() {
  const [resetCreateLanguageKey, setResetCreateLanguageKey] = useState(0);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
         <Route path="/encyclopedias" element={<Encyclopedias />} />
          <Route path="/encyclopedia/:id" element={<Encyclopedia />} />
        <Route path="/dictionary/:id" element={<Dictionary />} />
        <Route path="/placenames/:id" element={<PlaceNames />} />
        <Route path="/personalnames/:id" element={<PersonalNames />} />
        <Route path="/grammar/:id" element={<Grammar />} />
        <Route path="/word/:id" element={<Word />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/frequency/:id" element={<FrequencyList />} />
        <Route path="/corpusList/:id" element={<CorpusList />} />
        <Route path="/corpus/:languageId/:textId" element={<Corpus />} />
        <Route path="/corpusFrequency/:id/" element={<CorpusFrequencyList />} />
        <Route path="/thesaurus/:id/" element={<Thesaurus />} />
        <Route path="/:id/" element={<Account />} />
        <Route
          path="/createLanguage"
          element={
            <CreateLanguage
              key={resetCreateLanguageKey}
              resetAll={() => setResetCreateLanguageKey((k) => k + 1)}
            />
          }
        />
        <Route path="/makeDaughter" element={<MakeDaughter />} />
        <Route path="/devTools/:id" element={<DevTools />} />
      </Routes>

      {/* ✅ Toast container */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        id="toastContainer"
      ></div>
    </BrowserRouter>
  );
}

export default App;
