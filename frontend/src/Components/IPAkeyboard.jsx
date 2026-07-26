import { useState, useRef } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import Collapsible from "./collapsable";
import { Tooltip } from "react-tooltip";

export const IPAkeyboard = ({ inputVal, setInputVal }) => {
  const { translate } = useTranslate();
  const [charDisplay, setCharDisplay] = useState("flex");
  const [diacriticDisplay, setDiacriticDisplay] = useState("none");
  const [IPAval, setIPAval] = useState(inputVal);
  const [leftButtonColor, setLeftButtonColor] = useState("#141414");
  const [rightButtonColor, setRightButtonColor] = useState("#626161");
  const inputRef = useRef(null);

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

  function updateVals(value) {
    setInputVal(value);
    setIPAval(value);
  }

  return (
    <div>
      <h4>{translate("Pronunciation")}</h4>
      <input
        type="text"
        className="modal-input"
        placeholder={translate("IPA")}
        value={IPAval}
        onChange={(e) => updateVals(e.target.value)}
        ref={inputRef}
        onClick={updateCursor}
        onKeyUp={updateCursor}
        onSelect={updateCursor}
      />

      <Collapsible title={translate("IPA Keyboard")}>
        <div>
          <button
            className="keyboard-button-left"
            style={{ backgroundColor: `${leftButtonColor}` }}
            onClick={selectChars}
          >
            {translate("Characters")}
          </button>
          <button
            className="keyboard-button-right"
            style={{ backgroundColor: `${rightButtonColor}` }}
            onClick={selectDiacritics}
          >
            {translate("Diacritics")}
          </button>
        </div>
        <Tooltip id="open back unrounded vowel" />
        <Tooltip id="near-open front unrounded vowel" />
        <Tooltip id="near-open central vowel" />
        <Tooltip id="nasalised open back unrounded vowel" />
        <Tooltip id="voiced bilabial fricative" />
        <Tooltip id="voiced bilabial implosive" />
        <Tooltip id="bilabial trill" />
        <Tooltip id="voiceless palatal fricative" />
        <Tooltip id="voiceless alveo-palatal fricative" />
        <Tooltip id="voiced dental fricative" />
        <Tooltip id="voiced post-alveolar affricate" />
        <Tooltip id="voiced retroflex plosive" />
        <Tooltip id="voiced alveolar implosive" />
        <Tooltip id="schwa" />
        <Tooltip id="rhoticised schwa" />
        <Tooltip id="close-mid central rounded vowel" />
        <Tooltip id="close-mid central unrounded vowel" />
        <Tooltip id="open-mid front unrounded vowel" />
        <Tooltip id="open-mid central unrounded vowel" />
        <Tooltip id="rhoticised open-mid central unrounded vowel" />
        <Tooltip id="nasalised open-mid front unrounded vowel" />
        <Tooltip id="near-open front unrounded vowel" />
        <Tooltip id="velopharyngeal fricative" />
        <Tooltip id="voiced velar implosive" />
        <Tooltip id="voiced uvular plosive" />
        <Tooltip id="voiced uvular implosive" />
        <Tooltip id="voiced velar plosive" />
        <Tooltip id="voiceless pharnygeal fricative" />
        <Tooltip id="voiced glottal fricative" />
        <Tooltip id="labio-palatal approximant" />
        <Tooltip id="simultaneous /x/ and /ʃ/" />
        <Tooltip id="voiceless epiglottal fricative" />
        <Tooltip id="near-close near-front unrounded vowel" />
        <Tooltip id="close central unrounded vowel" />
        <Tooltip id="near close central unrounded vowel" />
        <Tooltip id="voiced palatal fricative" />
        <Tooltip id="voiced palatal plosive" />
        <Tooltip id="voiced palatal implosive" />
        <Tooltip id="velarised alveolar lateral approximant" />
        <Tooltip id="retroflex lateral approximant" />
        <Tooltip id="voiceless lateral alveolar fricative" />
        <Tooltip id="voiceless velar lateral approximant" />
        <Tooltip id="voiced lateral alveolar fricative" />
        <Tooltip id="voiceless grooved lateral alveolar fricative" />
        <Tooltip id="voiced grooved lateral alveolar fricative" />
        <Tooltip id="voiceless retroflex lateral fricative" />
        <Tooltip id="labio-dental nasal" />
        <Tooltip id="velar nasal stop" />
        <Tooltip id="palatal nasal stop" />
        <Tooltip id="retroflex nasal stop" />
        <Tooltip id="uvular nasal stop" />
        <Tooltip id="open-mid back unrounded vowel" />
        <Tooltip id="open-mid front unrounded vowel" />
        <Tooltip id="open back rounded vowel" />
        <Tooltip id="open-mid front unrounded vowel" />
        <Tooltip id="nasalised open-mid back unrounded vowel" />
        <Tooltip id="open front rounded vowel" />
        <Tooltip id="close-mid front rounded vowel" />
        <Tooltip id="voiceless bilabial fricative" />
        <Tooltip id="alveolar tap" />
        <Tooltip id="alveolar approximant" />
        <Tooltip id="voiced uvular fricative" />
        <Tooltip id="uvular trill" />
        <Tooltip id="retroflex approximant" />

        <Tooltip id="retroflex flap" />
        <Tooltip id="alveolar lateral tap" />
        <Tooltip id="voiceless post-alveolar fricative" />
        <Tooltip id="voiceless retroflex fricative" />
        <Tooltip id="voiceless dental fricative" />
        <Tooltip id="voiceless post-alveolar affricate" />
        <Tooltip id="voiceless alveolar affricate" />
        <Tooltip id="voiceless retroflex plosive" />
        <Tooltip id="near-close near-back rounded vowel" />
        <Tooltip id="close central rounded vowel" />
        <Tooltip id="open-mid back unrounded vowel" />
        <Tooltip id="labio-dental approximant" />
        <Tooltip id="labio-dental flap" />
        <Tooltip id="close back unrounded vowel" />
        <Tooltip id="voiceless labio-velar approximant" />
        <Tooltip id="velar approximant" />
        <Tooltip id="bilabial percussive" />
        <Tooltip id="voiceless uvular fricative" />
        <Tooltip id="voiced velar fricative" />
        <Tooltip id="palatal lateral approximent" />
        <Tooltip id="near-close near-front rounded vowel" />
        <Tooltip id="close-mid back unrounded vowel" />
        <Tooltip id="voiced post-alveolar fricative" />
        <Tooltip id="voiced retroflex fricative" />
        <Tooltip id="voiced alveo-palatal fricative" />
        <Tooltip id="glottal stop" />
        <Tooltip id="voiced pharyngeal fricative" />
        <Tooltip id="voiceless epiglottal fricative" />
        <Tooltip id="voiced epiglottal fricative" />
        <Tooltip id="minor group" />
        <Tooltip id="major group" />
        <Tooltip id="sublingual percussive" />
        <Tooltip id="bidental percussive" />
        
        <div className="keyboard-background">
          {/*CHARACTERS*/}
          <div className="letter-board" style={{ display: `${charDisplay}` }}>
            <>
              <div className="letter-section">
                <span className="letter-title">A</span>
                <span
                  className="letter"
                  data-tooltip-id="open back unrounded vowel"
                  data-tooltip-content={translate("open back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɑ
                </span>
                <span
                  className="letter" data-tooltip-id="near-open front unrounded vowel"
                  data-tooltip-content={translate("near-open front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  æ
                </span>
                <span
                  className="letter" data-tooltip-id="near-open central vowel"
                  data-tooltip-content={translate("near-open central vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɐ
                </span>
                <span
                  className="letter" data-tooltip-id="nasalised open back unrounded vowel"
                  data-tooltip-content={translate("nasalised open back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɑ̃
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">B</span>
                <span
                  className="letter" data-tooltip-id="voiced bilabial fricative"
                  data-tooltip-content={translate("voiced bilabial fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  β
                </span>
                <span
                  className="letter" data-tooltip-id="voiced bilabial implosive"
                  data-tooltip-content={translate("voiced bilabial implosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɓ
                </span>
                <span
                  className="letter" data-tooltip-id="bilabial trill"
                  data-tooltip-content={translate("bilabial trill")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʙ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">C</span>
                <span
                  className="letter" data-tooltip-id="voiceless palatal fricative"
                  data-tooltip-content={translate("voiceless palatal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ç
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless alveo-palatal fricative"
                  data-tooltip-content={translate("voiceless alveo-palatal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɕ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">D</span>
                <span
                  className="letter" data-tooltip-id="voiced dental fricative"
                  data-tooltip-content={translate("voiced dental fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ð
                </span>
                <span
                  className="letter" data-tooltip-id="voiced post-alveolar affricate"
                  data-tooltip-content={translate("voiced post-alveolar affricate")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  d͡ʒ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced retroflex plosive"
                  data-tooltip-content={translate("voiced retroflex plosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɖ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced alveolar implosive"
                  data-tooltip-content={translate("voiced alveolar implosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɗ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">E</span>
                <span
                  className="letter" data-tooltip-id="schwa"
                  data-tooltip-content={translate("schwa")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ə
                </span>
                <span
                  className="letter" data-tooltip-id="rhoticised schwa"
                  data-tooltip-content={translate("rhoticised schwa")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɚ
                </span>
                <span
                  className="letter" data-tooltip-id="close-mid central rounded vowel"
                  data-tooltip-content={translate("close-mid central rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɵ
                </span>
                <span
                  className="letter" data-tooltip-id="close-mid central unrounded vowel"
                  data-tooltip-content={translate("close-mid central unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɘ
                </span>
                <span
                  className="letter" data-tooltip-id="open-mid front unrounded vowel"
                  data-tooltip-content={translate("open-mid front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɛ
                </span>
                <span
                  className="letter" data-tooltip-id="open-mid central unrounded vowel"
                  data-tooltip-content={translate("open-mid central unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɜ
                </span>
                <span
                  className="letter" data-tooltip-id="rhoticised open-mid central unrounded vowel"
                  data-tooltip-content={translate("rhoticised open-mid central unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɝ
                </span>
                <span
                  className="letter" data-tooltip-id="nasalised open-mid front unrounded vowel"
                  data-tooltip-content={translate("nasalised open-mid front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɛ̃
                </span>
                <span
                  className="letter" data-tooltip-id="near-open front unrounded vowel"
                  data-tooltip-content={translate("near-open front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɞ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">F</span>
                <span
                  className="letter" data-tooltip-id="velopharyngeal fricative"
                  data-tooltip-content={translate("velopharyngeal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʩ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">G</span>
                <span
                  className="letter" data-tooltip-id="voiced velar implosive"
                  data-tooltip-content={translate("voiced velar implosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɠ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced uvular plosive"
                  data-tooltip-content={translate("voiced uvular plosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɢ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced uvular implosive"
                  data-tooltip-content={translate("voiced uvular implosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʛ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced velar plosive"
                  data-tooltip-content={translate("voiced velar plosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɡ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">H</span>
                <span
                  className="letter" data-tooltip-id="voiceless pharnygeal fricative"
                  data-tooltip-content={translate("voiceless pharnygeal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ħ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced glottal fricative"
                  data-tooltip-content={translate("voiced glottal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɦ
                </span>
                <span
                  className="letter" data-tooltip-id="labio-palatal approximant"
                  data-tooltip-content={translate("labio-palatal approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɥ
                </span>
                <span
                  className="letter" data-tooltip-id="simultaneous /x/ and /ʃ/"
                  data-tooltip-content={translate("simultaneous /x/ and /ʃ/")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɧ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless epiglottal fricative"
                  data-tooltip-content={translate("voiceless epiglottal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʜ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">I</span>
                <span
                  className="letter" data-tooltip-id="near-close near-front unrounded vowel"
                  data-tooltip-content={translate("near-close near-front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɪ
                </span>
                <span
                  className="letter" data-tooltip-id="close central unrounded vowel"
                  data-tooltip-content={translate("close central unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɨ
                </span>
                <span
                  className="letter" data-tooltip-id="near close central unrounded vowel"
                  data-tooltip-content={translate("near close central unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɪ̈
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">J</span>
                <span
                  className="letter" data-tooltip-id="voiced palatal fricative"
                  data-tooltip-content={translate("voiced palatal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʝ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced palatal plosive"
                  data-tooltip-content={translate("voiced palatal plosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɟ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced palatal implosive"
                  data-tooltip-content={translate("voiced palatal implosive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʄ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">L</span>
                <span
                  className="letter" data-tooltip-id="velarised alveolar lateral approximant"
                  data-tooltip-content={translate("velarised alveolar lateral approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɫ
                </span>
                <span
                  className="letter" data-tooltip-id="retroflex lateral approximant"
                  data-tooltip-content={translate("retroflex lateral approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɭ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless lateral alveolar fricative"
                  data-tooltip-content={translate("voiceless lateral alveolar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɬ
                </span>
                <span
                  className="letter" data-tooltip-id="velar lateral approximant"
                  data-tooltip-content={translate("velar lateral approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʟ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced lateral alveolar fricative"
                  data-tooltip-content={translate("voiced lateral alveolar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɮ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless grooved lateral alveolar fricative"
                  data-tooltip-content={translate("voiceless grooved lateral alveolar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʪ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced grooved lateral alveolar fricative"
                  data-tooltip-content={translate("voiced grooved lateral alveolar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʫ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless retroflex lateral fricative"
                  data-tooltip-content={translate("voiceless retroflex lateral fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ꞎ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">M</span>
                <span
                  className="letter" data-tooltip-id="labio-dental nasal"
                  data-tooltip-content={translate("labio-dental nasal")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɱ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">N</span>
                <span
                  className="letter" data-tooltip-id="velar nasal stop"
                  data-tooltip-content={translate("velar nasal stop")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ŋ
                </span>
                <span
                  className="letter" data-tooltip-id="palatal nasal stop"
                  data-tooltip-content={translate("palatal nasal stop")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɲ
                </span>
                <span
                  className="letter" data-tooltip-id="retroflex nasal stop"
                  data-tooltip-content={translate("retroflex nasal stop")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɳ
                </span>
                <span
                  className="letter" data-tooltip-id="uvular nasal stop"
                  data-tooltip-content={translate("uvular nasal stop")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɴ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">O</span>
                <span
                  className="letter" data-tooltip-id="open-mid back unrounded vowel"
                  data-tooltip-content={translate("open-mid back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɔ
                </span>
                <span
                  className="letter" data-tooltip-id="open-mid front unrounded vowel"
                  data-tooltip-content={translate("open-mid front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  œ
                </span>
                <span
                  className="letter" data-tooltip-id="open back rounded vowel"
                  data-tooltip-content={translate("open back rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɒ
                </span>
                <span
                  className="letter" data-tooltip-id="nasalised open-mid back unrounded vowel"
                  data-tooltip-content={translate("nasalised open-mid back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɔ̃
                </span>
                <span
                  className="letter" data-tooltip-id="open front rounded vowel"
                  data-tooltip-content={translate("open front rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɶ
                </span>
                <span
                  className="letter" data-tooltip-id="close-mid front rounded vowel"
                  data-tooltip-content={translate("close-mid front rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ø
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">P</span>
                <span
                  className="letter" data-tooltip-id="voiceless bilabial fricative"
                  data-tooltip-content={translate("voiceless bilabial fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɸ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">R</span>
                <span
                  className="letter" data-tooltip-id="alveolar tap"
                  data-tooltip-content={translate("alveolar tap")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɾ
                </span>
                <span
                  className="letter" data-tooltip-id="alveolar approximant"
                  data-tooltip-content={translate("alveolar approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɹ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced uvular fricative"
                  data-tooltip-content={translate("voiced uvular fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʁ
                </span>
                <span
                  className="letter" data-tooltip-id="uvular trill"
                  data-tooltip-content={translate("uvular trill")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʀ
                </span>
                <span
                  className="letter" data-tooltip-id="retroflex approximant"
                  data-tooltip-content={translate("retroflex approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɻ
                </span>
                <span
                  className="letter" data-tooltip-id="retroflex flap"
                  data-tooltip-content={translate("retroflex flap")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɽ
                </span>
                <span
                  className="letter" data-tooltip-id="alveolar lateral tap"
                  data-tooltip-content={translate("alveolar lateral tap")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɺ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">S</span>
                <span
                  className="letter" data-tooltip-id="voiceless post-alveolar fricative"
                  data-tooltip-content={translate("voiceless post-alveolar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʃ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless retroflex fricative"
                  data-tooltip-content={translate("voiceless retroflex fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʂ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">T</span>
                <span
                  className="letter" data-tooltip-id="voiceless dental fricative"
                  data-tooltip-content={translate("voiceless dental fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  θ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless post-alveolar affricate"
                  data-tooltip-content={translate("voiceless post-alveolar affricate")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  t͡ʃ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless alveolar affricate"
                  data-tooltip-content={translate("voiceless alveolar affricate")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  t͡s
                </span>
                <span
                  className="letter" data-tooltip-id="near-open front unrounded vowel"
                  data-tooltip-content={translate("near-open front unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʈ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">U</span>
                <span
                  className="letter" data-tooltip-id="near-close near-back rounded vowel"
                  data-tooltip-content={translate("near-close near-back rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʊ
                </span>
                <span
                  className="letter" data-tooltip-id="close central rounded vowel"
                  data-tooltip-content={translate("close central rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʉ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">V</span>
                <span
                  className="letter" data-tooltip-id="open-mid back unrounded vowel"
                  data-tooltip-content={translate("open-mid back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʌ
                </span>
                <span
                  className="letter" data-tooltip-id="labio-dental approximant"
                  data-tooltip-content={translate("labio-dental approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʋ
                </span>
                <span
                  className="letter" data-tooltip-id="labio-dental flap"
                  data-tooltip-content={translate("labio-dental flap")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ⱱ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">W</span>
                <span
                  className="letter" data-tooltip-id="close back unrounded vowel"
                  data-tooltip-content={translate("close back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɯ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless labio-velar approximant"
                  data-tooltip-content={translate("voiceless labio-velar approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʍ
                </span>
                <span
                  className="letter" data-tooltip-id="velar approximant"
                  data-tooltip-content={translate("velar approximant")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɰ
                </span>
                <span
                  className="letter" data-tooltip-id="bilabial percussive"
                  data-tooltip-content={translate("bilabial percussive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʬ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">X</span>
                <span
                  className="letter" data-tooltip-id="voiceless uvular fricative"
                  data-tooltip-content={translate("voiceless uvular fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  χ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Y</span>
                <span
                  className="letter" data-tooltip-id="voiced velar fricative"
                  data-tooltip-content={translate("voiced velar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɣ
                </span>
                <span
                  className="letter" data-tooltip-id="palatal lateral approximent"
                  data-tooltip-content={translate("palatal lateral approximent")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʎ
                </span>
                <span
                  className="letter" data-tooltip-id="near-close near-front rounded vowel"
                  data-tooltip-content={translate("near-close near-front rounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʏ
                </span>
                <span
                  className="letter" data-tooltip-id="close-mid back unrounded vowel"
                  data-tooltip-content={translate("close-mid back unrounded vowel")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ɤ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Z</span>
                <span
                  className="letter" data-tooltip-id="voiced post-alveolar fricative"
                  data-tooltip-content={translate("voiced post-alveolar fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʒ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced retroflex fricative"
                  data-tooltip-content={translate("voiced retroflex fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʐ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced alveo-palatal fricative"
                  data-tooltip-content={translate("voiced alveo-palatal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʑ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">?</span>
                <span
                  className="letter" data-tooltip-id="glottal stop"
                  data-tooltip-content={translate("glottal stop")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʔ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced pharyngeal fricative"
                  data-tooltip-content={translate("voiced pharyngeal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʕ
                </span>
                <span
                  className="letter" data-tooltip-id="voiceless epiglottal fricative"
                  data-tooltip-content={translate("voiceless epiglottal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʡ
                </span>
                <span
                  className="letter" data-tooltip-id="voiced epiglottal fricative"
                  data-tooltip-content={translate("voiced epiglottal fricative")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʢ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">!</span>
                <span
                  className="letter" data-tooltip-id="minor group"
                  data-tooltip-content={translate("minor group")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  |
                </span>
                <span
                  className="letter" data-tooltip-id="major group"
                  data-tooltip-content={translate("major group")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ‖
                </span>
                <span
                  className="letter" data-tooltip-id="sublingual percussive"
                  data-tooltip-content={translate("sublingual percussive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ¡
                </span>
                <span
                  className="letter" data-tooltip-id="bidental percussive"
                  data-tooltip-content={translate("bidental percussive")}
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʭ
                </span>
              </div>
            </>
          </div>

          {/*DIACRITICS*/}
          <div
            className="letter-board"
            style={{ display: `${diacriticDisplay}` }}
          >
            <>
              <div className="letter-section">
                <span className="letter-title">Pr</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˈ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˌ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̩
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̏
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̀
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̄
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ́
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̋
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̂
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̌
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ᷅
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ᷄
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ᷈
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">T</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˩
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˨
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˧
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˦
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˥
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˥˩
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˩˥
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˩˨
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˦˥
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˧˦˧
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Lng</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ː
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̆
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˑ
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Tb</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͡
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͜
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ‿
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Sp</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʰ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʲ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʷ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̚
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʷ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˤ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˀ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ᵝ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ᵊ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʱ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˡ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ⁿ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʳ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ᵗ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˠ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʼ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ʶ
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ˭
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Ov</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̃
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̈
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̑
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̊
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̽
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͋
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͆
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͊
                </span>
              </div>

              <div className="letter-section">
                <span className="letter-title">Un</span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̯
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̥
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̬
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̪
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̺
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̝
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̞
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̟
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̠
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̹
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̜
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̤
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̰
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̼
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̘
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̙
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̻
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͍
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͈
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͉
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ̣
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͔
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͕
                </span>
                <span
                  className="diacritic"
                  onClick={(e) => insertIPA(e.currentTarget.textContent)}
                >
                  ͢
                </span>
              </div>
            </>
          </div>
        </div>
      </Collapsible>
    </div>
  );
};
