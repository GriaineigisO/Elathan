import { useTranslate } from "../Functions/TranslateUI";
import { useState } from "react";

const DictionaryTitle = ({ languageName, dictionaryType }) => {
  const { translate } = useTranslate();

  if (dictionaryType === "dictionary") {
    return (
      <h1 className="dictionary-title">
        {translate("{languageName} Dictionary", { languageName })}
      </h1>
    );
  } else if (dictionaryType === "place_name") {
    return (
      <h1 className="dictionary-title">
        {translate("{languageName} Placenames", { languageName })}
      </h1>
    );
  } else {
    return (
      <h1 className="dictionary-title">
        {translate("{languageName} Personal Names", { languageName })}
      </h1>
    );
  }
};

export default DictionaryTitle;
