import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import renderHtml from "../Functions/renderHTML";
import { parseDocument } from "htmlparser2";
import formatMeaning from "../Functions/formatMeaning";
import meaningKeys from "../assets/meaningKeys";
import FindWordsDescendants from "./findWordsDescendants";
import getPartofSpeech from "../Functions/getPartofSpeech";
import checkIfProto from "../Functions/checkIfProto";
import { useTranslate } from "../Functions/TranslateUI";

Font.register({
  family: "CharisSIL",
  fonts: [
    {
      src: "/fonts/CharisSIL-Regular.ttf",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "/fonts/charis-sil.bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/charis-sil.italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "/fonts/charis-sil.bold-italic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

function renderInline(nodes) {
  const result = [];

  function walk(node, activeStyle = {}) {
    if (!node) return;

    // TEXT NODE
    if (node.type === "text") {
      const text = node.data || "";

      if (!text.trim()) return;

      result.push({
        text,
        style: {
          ...activeStyle,
          fontFamily: "CharisSIL",
        },
      });

      return;
    }

    if (node.type === "tag") {
      let newStyle = { ...activeStyle };

      if (node.name === "i" || node.name === "em") {
        newStyle.fontStyle = "italic";
      }

      if (node.name === "b" || node.name === "strong") {
        newStyle.fontWeight = "bold";
      }

      const styleString = node.attribs?.style;

      if (styleString) {
        const fontSize = styleString.match(/font-size\s*:\s*([^;]+)/);
        if (fontSize) {
          const size = parseFloat(fontSize[1]);
          if (!isNaN(size)) newStyle.fontSize = size;
        }
      }

      node.children?.forEach((child) => walk(child, newStyle));
    }
  }

  nodes.forEach((n) => walk(n));

  return result;
}


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
  bold: {
    fontWeight: "bold",
  },

  word: {
    marginBottom: 15,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
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
    fontStyle: "italic",
  },
  boldItalic: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  author: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: "50",
  },
  stats: {
    textAlign: "center",
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

export default function EtymologyDictionaryPdf({
  visibleWords,
  languageName,
  topicCounts,
  isProto,
  etymologyTree,
  languageData,
}) {
 
  //get number of roots i.e words with no etymology
  const numOfRoots = visibleWords.filter(
    (word) => word.etymology_type !== "derived",
  );


  function getLanguageName(id) {
    const chosenLanguage = languageData.filter(
      (language) => language.language_id === id,
    );
    return chosenLanguage[0].language_name;
  }



  function RenderDescendants({ child, depth = 1, number, ancestorId }) {

    const desc = child.child ? child.child : child;

    if (!child.word) {
      return;
    }

    return (
      <View style={{ marginLeft: depth + 3 }}>
        <Text>
          <Text>{number}. </Text>
          <Text>{getLanguageName(desc.word.language_id)}</Text>
          <Text>{" "}</Text>
          {desc.etymology.etymology_type === "loaned" && (
            <Text style={styles.italic}>(loaned) </Text>
          )}
          {ancestorId === desc.word.language_id && (
            <Text style={styles.italic}>(derivation) </Text>
          )}
          <Text style={styles.bold}>
            {checkIfProto(desc.word.language_id, desc.word, languageData)}
          </Text>{" "}
          {desc.word.ipa && <Text>/{desc.word.ipa}/</Text>}
          <Text>{" "}</Text>
          <Text style={styles.italic}>{getPartofSpeech(desc.word)}</Text>
          <Text>"{formatMeaning(desc.word)}"</Text>
          {desc.word.word_type === "place_name" && (<Text style={styles.italic}>place name</Text>)}
          {desc.word.word_type === "personal_name" && (<Text style={styles.italic}>personal name</Text>)}
           <Text>
          <Text>{" "}{desc.word.word_note && renderHtml(desc.word.word_note)}</Text>
        </Text>
          <Text>
            {desc.components?.length > 0 &&
              desc.components.map((component, index) => {

                if (!component.word) {
                  return (<></>)
                }


                return (
                <Text key={component.position}>
                  <Text>{" "}←</Text>
                  {index > 0 && " + "}
                  <Text style={styles.boldItalic}>
                    {checkIfProto(desc.word.language_id, component.word, languageData)}
                  </Text>
                  {' "'}
                  {formatMeaning(component.word)}
                  {'"'}
                </Text>)
  })}
          </Text>
          <Text>
            {desc.etymology.note && (
              <Text>{" "}-{" "}{renderHtml(desc.etymology.note)}</Text>
            )}
          </Text>
          
        </Text>



        {desc.descendants.map((descendant, index) => {

          if (!descendant.word) return
          
          return (
          <RenderDescendants
            key={descendant.word.word_id}
            child={descendant}
            depth={depth + 1}
            number={`${number}.${index + 1}`}
            ancestorId={desc.word.language_id}
          />)
  })}
      </View>
    );
  }

  function RenderTree({ root, headword, partOfSpeechAbbr }) {

    return (
      <View key={root.word.word_id} style={styles.word}>
        <Text style={styles.line}>
          <Text style={styles.headword}>{headword} </Text>
        </Text>
        <Text>
          {root.word.ipa && <Text style={styles.ipa}>/{root.word.ipa}/</Text>}
        </Text>
        <Text>
          <Text style={styles.abbr}>{partOfSpeechAbbr}</Text>
          <Text> </Text>
          <Text style={styles.meaning}>"{formatMeaning(root.word)}"</Text>
        </Text>
       
        

        {root.descendants.map((child, index) => (
          <RenderDescendants
            key={child.word.word_id}
            child={child}
            depth={0}
            number={`${index + 1}`}
            ancestorId={root.word.word_id}
          />
        ))}
      </View>
    );
  }

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Text style={styles.heading}>{languageName}</Text>
        <Text
          style={styles.stats}
        >{`${numOfRoots.length.toLocaleString()} roots`}</Text>

        <View break>
          {etymologyTree.map((root) => {
           

            //check part of speech and return the right abbreviation
            let partOfSpeechAbbr = "";
            meaningKeys.forEach((key) => {
              if (root.word[key.meaning]) {
                partOfSpeechAbbr = key.abbr;
              }
            });



            return (
              <>
                <RenderTree
                  root={root}
                  headword={checkIfProto(root.word.language_id, root.word, languageData)}
                  partOfSpeechAbbr={partOfSpeechAbbr}
                />
                <View style={styles.divider} />
              </>
            );
          })}
        </View>
        
        <Text
          style={styles.pageNumber}
          fixed
          render={({ pageNumber }) =>
            pageNumber > 1 ? ` ${pageNumber - 1}` : ""
          }
        />
      </Page>
    </Document>
  );
}
