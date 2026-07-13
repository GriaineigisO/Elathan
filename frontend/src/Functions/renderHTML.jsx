import {
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { parseDocument } from "htmlparser2";

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

function renderHtml(html) {
  if (!html) return null;

  const doc = parseDocument(html);

  const blockNodes = doc.children.flatMap((n) => n.children || n);

  const inline = renderInline(blockNodes);

  return (
    <Text>
      {inline.map((part, i) => (
        <Text key={i} style={part.style}>
          {part.text}
        </Text>
      ))}
    </Text>
  );
}

export default renderHtml;