import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";

import { parseDocument } from "htmlparser2";
import renderHtml from "../Functions/renderHTML";

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

const isIPA = (text) => /[ˈˌɑɐɔəɛɪʊʁŋɡʃʒθð]/.test(text);


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "CharisSIL",
  },

  heading: {
    fontSize: 30,
    textAlign: "center",
  },

  word: {
    marginBottom: 15,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  topic: {
    fontSize: 10,
    fontStyle: "italic",
  },
  author: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: "50",
  },
  stats: {
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

export default function GrammarPdf({
 grammar,
 languageName
}) {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Text style={styles.heading}>A Grammar of</Text>
          <Text style={styles.heading}>{languageName}</Text>
       
      
        
        <View break>
          <Text>
                {renderHtml(grammar)}
              </Text>
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
