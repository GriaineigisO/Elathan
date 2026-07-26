import React, { useState } from "react";
import formatMeaning from "../Functions/formatMeaning";
import { getToolTipWord } from "../services/languageService";

export const WordWithTooltip = ({
  languageId,
  word,
  inflected,
  userTranslation,
  children,
}) => {
  const [tooltipData, setTooltipData] = useState([]);
  const [show, setShow] = useState(false);

  const fetchTooltip = async () => {
    try {
      const data = await window.electron.getToolTipWord(word, languageId);

      if (data.message) {
        console.error(`error: ${data.message}`);
      } else if (!data) {
        console.error("error getting tooltip word");
      } else {
        setTooltipData(data);
      }
    } catch (err) {
      setTooltipData([{ word, translation: "No data found." }]);
    }
  };

  const handleMouseEnter = () => {
    setShow(true);
    if (tooltipData.length === 0) fetchTooltip();
  };

  const handleMouseLeave = () => setShow(false);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", marginRight: "4px", cursor: "help" }}
    >
      {children}
      {show && tooltipData.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            backgroundColor: "#333",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            fontSize: "13px",
            zIndex: 10,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            width: "fit-content",
          }}
        >
          {tooltipData.map((entry, i) => (
            <div key={i} style={{ marginBottom: "4px" }}>
              {console.log(entry)}
              <strong>{entry.word}</strong>: "{formatMeaning(entry)}"
            </div>
          ))}

          {userTranslation && (
            <div>
              <hr />
              <em>
                <strong>{inflected}</strong>
              </em>
              : "{userTranslation}"
            </div>
          )}
        </div>
      )}
    </span>
  );
};

const stripEquals = (word, type) => {
  if (word !== " ") {
    if (type === "inflectedWord") {
      if (word.includes("=")) {
        return word.split("=")[0];
      } else {
        return word;
      }
    } else {
      if (word.includes("=")) {
        return word.split("=")[1];
      } else {
        word;
      }
    }
  } else {
    return word;
  }
};

const parseWordToken = (token) => {
  const [beforeTilde, userTranslationRaw] = token.split("~");
  const [inflected, headword] = beforeTilde.split("=");

  return {
    inflected: inflected || token,
    headword: headword || "",
    userTranslation: userTranslationRaw?.replace(/-/g, " ") || null,
  };
};

const ParagraphWithTooltips = ({ languageId, paragraph }) => {
  // Updated regex to keep word=headword together
  const prepared = paragraph.replace(/([.,!?;:])(?=\S)/g, "$1 ");
  const tokens = paragraph.match(
    /[\p{Script=Latin}=~\-']+|[.,!?;:()“”"«»]|[\r\n]+|\s+/gu,
  );

  return (
    <p style={{ lineHeight: 1.6 }}>
      {tokens.map((token, index) => {
        const isWord = /\p{Script=Latin}/u.test(token) && !/^\s+$/.test(token);

        if (isWord) {
          const { inflected, headword, userTranslation } =
            parseWordToken(token);
          const lookupWord = headword || inflected;

          return (
            <WordWithTooltip
              key={index}
              languageId={languageId}
              word={lookupWord}
              inflected={inflected}
              userTranslation={userTranslation}
            >
              {inflected}
            </WordWithTooltip>
          );
        }
        return <span key={index}>{token}</span>;
      })}
    </p>
  );
};

export default ParagraphWithTooltips;
