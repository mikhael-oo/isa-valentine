"use client";

import React from "react";

/**
 * Matches quoted text. Excludes straight single quotes to avoid matching apostrophes (don't, I'll).
 * Capture: full match, content, opening quote, closing quote.
 * Keeps quote characters visible around the styled content.
 */
const QUOTED_REGEX =
  /(")([^"]*)(")|\u201C([^\u201D]*)\u201D|(\u2018)([^\u2019]*)(\u2019)/g;

/**
 * Renders letter body with quoted content formatted (e.g. italic).
 * Supports: "text" (keeps quotes), "text", 'text' (curly only—straight ' skipped to avoid don't/I'll).
 */
export function formatLetterBody(body: string): React.ReactNode {
  const lines = body.split("\n");
  const result: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    if (i > 0) result.push(<br key={`br-${i}`} />);

    const line = lines[i];
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    QUOTED_REGEX.lastIndex = 0;
    while ((match = QUOTED_REGEX.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      // Straight double: match[1]=", match[2]=content, match[3]="
      // Curly double: match[4]=content
      // Curly single: match[5]=' match[6]=content match[7]='
      const content = match[2] ?? match[4] ?? match[6] ?? "";
      const open = match[1] ?? (match[4] !== undefined ? "\u201C" : match[5]) ?? "";
      const close = match[3] ?? (match[4] !== undefined ? "\u201D" : match[7]) ?? "";
      parts.push(
        <React.Fragment key={key++}>
          {open}
          <em>{content}</em>
          {close}
        </React.Fragment>
      );
      lastIndex = QUOTED_REGEX.lastIndex;
    }

    if (parts.length === 0) {
      result.push(line);
    } else {
      if (lastIndex < line.length) parts.push(line.slice(lastIndex));
      result.push(
        <React.Fragment key={i}>
          {parts.map((p, j) =>
            React.isValidElement(p) ? p : <span key={j}>{p}</span>
          )}
        </React.Fragment>
      );
    }
  }

  return <>{result}</>;
}
