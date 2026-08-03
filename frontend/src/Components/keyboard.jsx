import { useState, useRef, useEffect } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import Collapsible from "./collapsable";

export const Keyboard = ({ inputVal, setInputVal, setOverrideWord, setWord}) => {
  const { translate } = useTranslate();
  const [charDisplay, setCharDisplay] = useState("flex");
  const [diacriticDisplay, setDiacriticDisplay] = useState("none");
  const [IPAval, setIPAval] = useState(inputVal);
  const [leftButtonColor, setLeftButtonColor] = useState("#141414");
  const [rightButtonColor, setRightButtonColor] = useState("#626161");
  const inputRef = useRef(null);

  useEffect(() => {
      setIPAval(inputVal)
    }, [inputVal])
  
 
 

  function selectDiacritics() {
    setCharDisplay("none");
    setDiacriticDisplay("flex");
    setLeftButtonColor("#626161");
    setRightButtonColor("#141414");
  }

  function selectChars() {
    setCharDisplay("flex");
    setDiacriticDisplay("none");
    setRightButtonColor("#626161");
    setLeftButtonColor("#141414");
  }

  const cursorRef = useRef({
    start: 0,
    end: 0,
  });

  const updateCursor = () => {
    cursorRef.current = {
      start: inputRef.current.selectionStart,
      end: inputRef.current.selectionEnd,
    };
  };

  const insertIPA = (char) => {
    const { start, end } = cursorRef.current;

   
    const newValue = IPAval.slice(0, start) + char + IPAval.slice(end);

    setIPAval(newValue);
    setWord(newValue)

    // Restore focus after React updates
    requestAnimationFrame(() => {
      inputRef.current.focus();

      const pos = start + char.length;

      inputRef.current.setSelectionRange(pos, pos);

      cursorRef.current = {
        start: pos,
        end: pos,
      };
    });
  };

 

  function handleWord(value) {
    setInputVal(value);
    setIPAval(value);
    setOverrideWord(true); //value will be whatever user types and not simply a spelled version of the IPA
    setWord(value);
  }

  return (
    <div>
      <h4>{translate("Enter Word")}</h4>
      <input
        type="text"
        className="modal-input"
        placeholder={translate("word")}
        value={inputVal}
        onChange={(e) => handleWord(e.target.value)}
        ref={inputRef}
        onClick={updateCursor}
        onKeyUp={updateCursor}
        onSelect={updateCursor}
      />

      <Collapsible title={translate("Keyboard")}>
        <div>
          <button
            className="keyboard-button-left"
            style={{ backgroundColor: `${leftButtonColor}` }}
            onClick={selectChars}
          >
            {translate("Vowels")}
          </button>
          <button
            className="keyboard-button-right"
            style={{ backgroundColor: `${rightButtonColor}` }}
            onClick={selectDiacritics}
          >
            {translate("Consonants")}
          </button>
        </div>

        <div className="keyboard-background">
          {/*VOWELS*/}
          <div className="letter-board" style={{ display: `${charDisplay}` }}>
            <>
              <div className="letter-section">
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  æ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǝ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ı
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ĳ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  œ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ỿ
                </span>
              </div>
              <div className="letter-section">
                <span className="letter-title">Macron</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ā
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ē
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ī
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ō
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ū
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȳ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Acute</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  á
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǽ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  é
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  í
                </span>

                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ó
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǿ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ú
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ý
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Grave</span>
                <span
                  className="letter"
                  data-tooltip-id="voiced dental fricative"
                  data-tooltip-content={translate("voiced dental fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  à
                </span>
                <span
                  className="letter"
                  data-tooltip-id="voiced post-alveolar affricate"
                  data-tooltip-content={translate(
                    "voiced post-alveolar affricate",
                  )}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  è
                </span>
                <span
                  className="letter"
                  data-tooltip-id="voiced retroflex plosive"
                  data-tooltip-content={translate("voiced retroflex plosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ì
                </span>
                <span
                  className="letter"
                  data-tooltip-id="voiced alveolar implosive"
                  data-tooltip-content={translate("voiced alveolar implosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ò
                </span>
                <span
                  className="letter"
                  data-tooltip-id="schwa"
                  data-tooltip-content={translate("schwa")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ù
                </span>
                <span
                  className="letter"
                  data-tooltip-id="rhoticised schwa"
                  data-tooltip-content={translate("rhoticised schwa")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ỳ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Circumflex</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  â
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ê
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  î
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ô
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  û
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ŷ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Diaresis</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ä
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ë
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ï
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ö
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ü
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ÿ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ӛ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ӫ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Tilde</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ã
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ẽ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ĩ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  õ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ũ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ỹ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Ring above</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  å
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ů
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ẙ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Overdot</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȧ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ė
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȯ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  u̇
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ẏ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Underdot</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȧ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ẹ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ị
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ọ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ụ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ỵ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Breve</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ă
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ĕ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ĭ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ŏ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ŭ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Ogonek</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ą
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ę
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  į
                </span>
                <span
                  className="letter"
                  data-tooltip-id="nasalised open-mid back unrounded vowel"
                  data-tooltip-content={translate(
                    "nasalised open-mid back unrounded vowel",
                  )}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǫ
                </span>
                <span
                  className="letter"
                  data-tooltip-id="open front rounded vowel"
                  data-tooltip-content={translate("open front rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ų
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Caron</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǎ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ě
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǐ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǒ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ǔ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  y̌
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Macron & Acute</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ā́
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ḗ
                </span>
                <span
                  className="letter"
                  data-tooltip-id="voiced uvular fricative"
                  data-tooltip-content={translate("voiced uvular fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ī́
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ṓ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ū́
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȳ́
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Macron & Grave</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ā̀
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ḕ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ī̀
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ṑ
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ū̀
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȳ̀
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Circumflex below</span>

                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ḙ
                </span>

                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ṷ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Double Acute</span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ő
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ű
                </span>
                <span
                  className="letter"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  Ӳ
                </span>
              </div>
            </>
          </div>

          {/*CONSONANTS*/}
          <div
            className="letter-board"
            style={{ display: `${diacriticDisplay}` }}
          >
            <>
              <div className="letter-section">
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ł
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ſ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ȝ
                </span>
              </div>
              <div className="letter-section">
                <span className="letter-title">B</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                ></span>
              </div>
            </>
          </div>
        </div>
      </Collapsible>
    </div>
  );
};
