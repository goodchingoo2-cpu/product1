import { Fragment } from "react";

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

export function renderSimpleMarkdown(content = "") {
  const lines = content.split("\n");
  const blocks = [];
  let listItems = [];

  function flushList(key) {
    if (!listItems.length) return;

    blocks.push(
      <ul key={`list-${key}`}>
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(index);
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList(index);
      blocks.push(<h2 key={`h2-${index}`}>{trimmed.slice(3)}</h2>);
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList(index);
      blocks.push(<h3 key={`h3-${index}`}>{trimmed.slice(4)}</h3>);
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList(index);
    blocks.push(<p key={`p-${index}`}>{renderInline(trimmed)}</p>);
  });

  flushList("end");
  return blocks;
}
