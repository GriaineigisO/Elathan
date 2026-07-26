import { useEffect, useState } from "react";
import formatMeaning from "../Functions/formatMeaning";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import { parseDocument } from "htmlparser2";
import { getEtymology } from "../services/etymologyService";
import { getWordData } from "../services/dictionaryService.js";


const SplitDerivationIntoMorphemes = ({ derivation, wordId, isProto }) => {
  const [row, setRow] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!derivation?.derived_word_id) return;
    const ac = new AbortController();
    (async () => {
      try {

        const data = await window.electron.getEtymology(derivation.derived_word_id)
        if (!data.success) throw new Error(`HTTP ${res.status}`);

        setRow(data?.[0] ?? null);
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      }
    })();
    return () => ac.abort();
  }, [derivation?.derived_word_id]); // <-- match the field you use

  if (error || !row) return null;

  const {
    first_element_word, second_element_word, third_element_word,
    first_element_word_meaning, second_element_word_meaning, third_element_word_meaning,
    first_element_word_id, second_element_word_id, third_element_word_id,
    first_element_word_type, second_element_word_type, third_element_word_type,
  } = row;

  const dashL = (t) => (t === "suffix" || t === "enclitic" ? "-" : "");
  const dashR = (t) => (t === "prefix" || t === "proclitic" ? "-" : "");

  const three = !!third_element_word;
  const isFirst = wordId === first_element_word_id;
  const isSecond = wordId === second_element_word_id;
  const isThird = wordId === third_element_word_id;

  if (three) {
    if (isFirst)
      return (
    <Text>
      <Text style={styles.boldItalic}>{derivation.word} </Text>

      <Text>
        {"<"} ({isProto && <Text>*</Text>}
        {dashL(second_element_word_type)}
        <Text style={styles.boldItalic}>{second_element_word}</Text>
        {dashR(second_element_word_type)} "{second_element_word_meaning}" +{" "}
        {dashL(third_element_word_type)}
        {third_element_word}
        {dashR(third_element_word_type)} "{third_element_word_meaning}")
      </Text>
    </Text>
      );
    if (isSecond)
      return (
      <Text>
      <Text style={styles.boldItalic}>{derivation.word} </Text>

      <Text>
        {"<"} ({isProto && <Text>*</Text>}
        {dashL(first_element_word_type)}
        <Text style={styles.boldItalic}>{first_element_word}</Text>
        {dashR(first_element_word_type)} "{first_element_word_meaning}" +{" "}
        {dashL(third_element_word_type)}
        {third_element_word}
        {dashR(third_element_word_type)} "{third_element_word_meaning}")
      </Text>
    </Text>
      );
    if (isThird)
      return (
      <Text>
      <Text style={styles.boldItalic}>{derivation.word} </Text>

      <Text>
        {"<"} ({isProto && <Text>*</Text>}
        {dashL(first_element_word_type)}
        <Text style={styles.boldItalic}>{first_element_word}</Text>
        {dashR(first_element_word_type)} "{first_element_word_meaning}" +{" "}
        {dashL(second_element_word_type)}
        {second_element_word}
        {dashR(second_element_word_type)} "{second_element_word_meaning}")
      </Text>
    </Text>
      );
  } else {
    if (isFirst)
      return (
  
       <Text>
      <Text style={styles.boldItalic}>{derivation.word} </Text>

      <Text>
        {"<"} ({isProto && <Text>*</Text>}
        {dashL(second_element_word_type)}
        <Text style={styles.boldItalic}>{second_element_word}</Text>
        {dashR(second_element_word_type)} "{second_element_word_meaning}"
      </Text>
    </Text>
      );
    if (isSecond)
      return (
        <Text>
      <Text style={styles.boldItalic}>{derivation.word} </Text>

      <Text>
        {"<"} ({isProto && <Text>*</Text>}
        {dashL(first_element_word_type)}
        <Text style={styles.boldItalic}>{first_element_word}</Text>
        {dashR(first_element_word_type)} "{first_element_word_meaning}"
      </Text>
    </Text>
      );
  }
  return null;
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "CharisSIL",
  },

  ipa: {
    fontSize: 10,
    fontFamily: "CharisSIL",
    textAlign: "center",
  },

  heading: {
    fontSize: 30,
    textAlign: "center",
  },

  word: {
    marginBottom: 15,
  },

  headword: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  abbr: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "center",
    marginRight: "20",
  },
  italic: {
    fontSize: 10,
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold"
  },
  boldItalic: {
    fontSize: 10,
    fontStyle: "italic",
    fontWeight: "bold"
  },
  author: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: "50",
  },
  stats: {
    textAlign: "center",
  },
  list: {
  marginVertical: 6,
},

listItem: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 2,
},

bullet: {
  width: 12,
},

listText: {
  flex: 1,
},
  meaning: {
    textAlign: "center",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

const FindWordsDescendants = ({
  wordId,
  isProto,
  depth = 0,
  maxDepth = 6,
  path = new Set(), // tracks the current chain to prevent cycles
}) => {
  const [descendants, setDescendants] = useState([]);
  const [derivations, setDerivations] = useState([]);
  const [loadingDesc, setLoadingDesc] = useState(true);
  const [loadingDeriv, setLoadingDeriv] = useState(true);
  const [error, setError] = useState(null);

  // stop on cycles / depth
  if (!wordId || path.has(wordId) || depth >= maxDepth) return null;
  const nextPath = new Set(path).add(wordId);

  useEffect(() => {
    const ac = new AbortController();
    setLoadingDesc(true);
    (async () => {
      try {


        const data = await window.electron.getWordData(wordId);

        if (!data.success) throw new Error(`HTTP ${res.status}`);

   
        setDescendants(Array.isArray(data.descendants) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      } finally {
        setLoadingDesc(false);
      }
    })();
    return () => ac.abort();
  }, [wordId]);

  useEffect(() => {
    const ac = new AbortController();
    setLoadingDeriv(true);
    (async () => {
      try {
        const data = await window.electron.getWordData(wordId);
        if (!data.success) throw new Error(`HTTP ${res.status}`);
     
        setDerivations(Array.isArray(data.derivations) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      } finally {
        setLoadingDeriv(false);
      }
    })();
    return () => ac.abort();
  }, [wordId]);

  const nothingToShow =
    !loadingDesc && !loadingDeriv && descendants.length === 0 && derivations.length === 0;

  if (error) return <div className="text-danger">Failed to load descendants.</div>;
  if (nothingToShow) return null;

  return (
   <View>
  {loadingDesc ? (
    <View style={styles.listItem}>
      <Text style={styles.number}>1.</Text>
      <Text>Loading descendants...</Text>
    </View>
  ) : (
    descendants.map((d, i) => (
      <View key={d.id ?? d.word_id ?? d.child_word_id ?? i}>
        <View style={styles.listItem}>
          <Text style={styles.number}>{i + 1}.</Text>

          <Text>
            {d.etymology_type === "loaned" && (
              <Text style={styles.italic}>(loan) </Text>
            )}

            <Text style={styles.language}>
              {d.language_name}
            </Text>

            <Text>: </Text>

            {d.is_proto && <Text>*</Text>}

            <Text style={styles.bold}>{d.word}</Text>

            <Text> "{formatMeaning(d)}"</Text>
          </Text>
        </View>

        <FindWordsDescendants
          wordId={d.word_id}
          isProto={isProto}
          depth={depth + 1}
          maxDepth={maxDepth}
          path={nextPath}
        />
      </View>
    ))
  )}

  {loadingDeriv ? (
    <View style={styles.listItem}>
      <Text style={styles.number}>1.</Text>
      <Text>Loading derivations...</Text>
    </View>
  ) : (
    derivations.map((derivation, i) => (
      <View key={derivation.id ?? derivation.word_id ?? i}>
        <View style={styles.listItem}>
          <Text style={styles.number}>{i + 1}.</Text>

          <Text>
            <Text style={styles.italic}>derivation: </Text>

            {isProto && <Text>*</Text>}

            <SplitDerivationIntoMorphemes
              derivation={derivation}
              wordId={wordId}
              isProto={isProto}
            />

            <Text> "{formatMeaning(derivation)}"</Text>
          </Text>
        </View>

        <FindWordsDescendants
          wordId={derivation.derived_word_id}
          isProto={isProto}
          depth={depth + 1}
          maxDepth={maxDepth}
          path={nextPath}
        />
      </View>
    ))
  )}
</View>
  );
};

export default FindWordsDescendants;
