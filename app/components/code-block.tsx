import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
};

export function CodeBlock({
  code,
  filename,
  language,
  className = "",
}: CodeBlockProps) {
  return (
    <div className={`code-block ${className}`.trim()}>
      <div className="code-block-header">
        <span className="code-file">{filename ?? "Code"}</span>
        <span className="code-header-actions">
          {language ? <span className="code-language">{language}</span> : null}
          <CopyButton value={code} compact />
        </span>
      </div>
      <pre>
        <code>
          {code.split("\n").map((line, index) => (
            <span className="code-line" key={`${index}-${line}`}>
              <span className="line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="line-content">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
