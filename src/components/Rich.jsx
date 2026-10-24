import { Fragment } from 'react';

/**
 * Renders content strings: `\n` → line break, `*text*` → <em>.
 * With `lines`, each line is wrapped in a mask span (used by the hero reveal).
 */
export default function Rich({ text, lines = false }) {
  const parts = String(text).split('\n');
  const renderLine = (line) =>
    line.split(/(\*[^*]+\*)/g).filter(Boolean).map((chunk, i) =>
      chunk.startsWith('*') && chunk.endsWith('*') ? <em key={i}>{chunk.slice(1, -1)}</em> : <Fragment key={i}>{chunk}</Fragment>
    );

  if (lines) {
    return parts.map((line, i) => (
      <span className="line" key={i}>
        <span className="line-inner" style={{ '--i': i }}>{renderLine(line)}</span>
      </span>
    ));
  }
  return parts.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {renderLine(line)}
    </Fragment>
  ));
}
