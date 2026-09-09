import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";

const styles = {
  body: {
    fontFamily: "CharisSIL",
    fontSize: 10,
  },

  h1: {
    fontFamily: "CharisSIL",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
  },

  h2: {
    fontFamily: "CharisSIL",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
  },

  h3: {
    fontFamily: "CharisSIL",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 8,
  },

  h4: {
    fontFamily: "CharisSIL",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 6,
  },

  p: {
    marginBottom: 6,
  },

  blockquote: {
    marginLeft: 15,
    paddingLeft: 8,
    borderLeftWidth: 2,
    marginBottom: 6,
  },

  ul: {
    marginBottom: 6,
    marginLeft: 10,
  },

  ol: {
    marginBottom: 6,
    marginLeft: 10,
  },

  li: {
    marginBottom: 3,
  },
};

function parseStyle(styleString) {
  const style = {};

  if (!styleString) return style;

  const fontSize = styleString.match(/font-size\s*:\s*([^;]+)/);

  if (fontSize) {
    const size = parseFloat(fontSize[1]);

    if (!isNaN(size)) {
      style.fontSize = size;
    }
  }

  return style;
}

function renderInline(nodes, activeStyle = {}) {
  const result = [];

  function walk(node, style = activeStyle) {
    if (!node) return;

    // Text node
    if (node.type === "text") {
      result.push(
        <Text style={style}>
          {node.data || ""}
        </Text>
      );

      return;
    }

    if (node.type !== "tag") return;

    let newStyle = {
      ...style,
      fontFamily: "CharisSIL",
    };

    // Inline formatting
    if (node.name === "i" || node.name === "em") {
      newStyle.fontStyle = "italic";
    }

    if (node.name === "b" || node.name === "strong") {
      newStyle.fontWeight = "bold";
    }

    if (node.name === "u") {
      newStyle.textDecoration = "underline";
    }

    if (node.name === "s" || node.name === "strike") {
      newStyle.textDecoration = "lineThrough";
    }

    // Inline style attribute
    Object.assign(
      newStyle,
      parseStyle(node.attribs?.style)
    );

    // Explicit line break
    if (node.name === "br") {
      result.push(<Text>{"\n"}</Text>);
      return;
    }

    node.children?.forEach((child) => {
      walk(child, newStyle);
    });
  }

  nodes.forEach((node) => walk(node));

  return result;
}

function renderBlock(node, key, listContext = null) {
  if (!node) return null;

  // Plain text at block level
  if (node.type === "text") {
    if (!node.data?.trim()) return null;

    return (
      <Text key={key} style={styles.body}>
        {node.data}
      </Text>
    );
  }

  if (node.type !== "tag") return null;

  const children = node.children || [];

  /*
   * HEADINGS
   */
  if (/^h[1-6]$/.test(node.name)) {
    return (
      <Text
        key={key}
        style={{
          ...styles[node.name],
          fontFamily: "CharisSIL",
        }}
      >
        {renderInline(children)}
      </Text>
    );
  }

  /*
   * PARAGRAPH
   */
  if (node.name === "p") {
    return (
      <Text
        key={key}
        style={{
          ...styles.p,
          fontFamily: "CharisSIL",
        }}
      >
        {renderInline(children)}
      </Text>
    );
  }

  /*
   * LINE BREAK
   */
  if (node.name === "br") {
    return <Text key={key}>{"\n"}</Text>;
  }

  /*
   * UNORDERED LIST
   */
  if (node.name === "ul") {
    return (
      <View key={key} style={styles.ul}>
        {children.map((child, index) =>
          renderBlock(child, `${key}-${index}`, {
            type: "ul",
          })
        )}
      </View>
    );
  }

  /*
   * ORDERED LIST
   */
  if (node.name === "ol") {
    return (
      <View key={key} style={styles.ol}>
        {children.map((child, index) =>
          renderBlock(child, `${key}-${index}`, {
            type: "ol",
            index,
          })
        )}
      </View>
    );
  }

  /*
   * LIST ITEM
   */
  if (node.name === "li") {
    let prefix = "• ";

    if (listContext?.type === "ol") {
      prefix = `${listContext.index + 1}. `;
    }

    return (
      <Text
        key={key}
        style={{
          ...styles.li,
          fontFamily: "CharisSIL",
        }}
      >
        <Text>{prefix}</Text>
        {renderInline(children)}
      </Text>
    );
  }

  /*
   * BLOCKQUOTE
   */
  if (node.name === "blockquote") {
    return (
      <Text
        key={key}
        style={{
          ...styles.blockquote,
          fontFamily: "CharisSIL",
        }}
      >
        {children.map((child, index) =>
          child.type === "tag" && child.name === "p"
            ? renderInline(child.children)
            : renderInline([child])
        )}
      </Text>
    );
  }

  /*
   * DIV / SECTION / ARTICLE / ETC.
   *
   * Treat these as block containers.
   */
  if (
    node.name === "div" ||
    node.name === "section" ||
    node.name === "article"
  ) {
    return (
      <View key={key}>
        {children.map((child, index) =>
          renderBlock(child, `${key}-${index}`)
        )}
      </View>
    );
  }

  /*
   * Anything unknown:
   *
   * Treat it as inline content rather than throwing it away.
   */
  return (
    <Text key={key} style={styles.body}>
      {renderInline(children)}
    </Text>
  );
}

function renderHtml(html) {
  if (!html) return null;

  const doc = parseDocument(html);

  return (
    <View>
      {doc.children.map((node, index) =>
        renderBlock(node, index)
      )}
    </View>
  );
}

export default renderHtml;