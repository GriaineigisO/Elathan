import { useState, useEffect } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import React from "react";


const Search = () => {
  const [languageList, setLanguageList] = useState([]);
  const [originalLanguageList, setOriginalLanguageList] = useState([]);
    const { translate } = useTranslate();
  

  const fetchAllLanguages = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getAllLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setLanguageList([...data]);
      setOriginalLanguageList([...data]);
    } else {
      console.error(`Error fetching languages: ${data.message}`);
    }
  };
  useEffect(() => {
    fetchAllLanguages();
  }, []);

  const searchAllLanguages = (value) => {
    const language = originalLanguageList.filter((language) =>
      language.language_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setLanguageList(language);
  };

  const handleOpenUser = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/user/${id}`,
      "_blank"
    );
  };

  const handleOpenLanguage = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/dictionary/${id}`,
      "_blank"
    );
  };

  return (
    <div style={{textAlign:"center"}}>
      <h1>{translate("Search Dictionaries")}</h1>

      <p>
        {translate("Search all {languageList} publically available dictionaries on Elatha", {languageList: originalLanguageList.length})}
      </p>

      <input
        placeholder={translate("search all languages")}
        onChange={(e) => searchAllLanguages(e.target.value)}
      />

      <div
        className="language-list-container"
        style={{ marginLeft: "auto", marginRight: "auto",width:"700px" }}
      >
        <table  className="language-list">
          <tbody >
            {languageList.map((language, index) => (
              <tr key={index}>
                <td
                  onClick={() => handleOpenLanguage(language.language_id)}
                  style={{ textAlign: "left" }}
                >
                  {language.language_name} 
                </td>
                <td>
                    <span style={{paddingLeft:"30px"}}>
                        <i ><>
  <React.Fragment>
  {translate("by {user}", { user: "__USER__" })
    .split("__USER__")
    .map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i === 0 && (
          <span
            className="word-link"
            onClick={() => handleOpenUser(language.user_id)}
          >
            {language.username}
          </span>
        )}
      </React.Fragment>
    ))}
</React.Fragment>


</>
</i>
                    </span>
                    
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
