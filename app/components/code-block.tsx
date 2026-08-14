import { CopyButton } from "./copy-button";
import hljs from "@/lib/btsx-hljs";

type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
};

// Map docs language ids to highlight.js ids
function normalizeLang(lang?: string): string | undefined {
  if (!lang) return undefined;
  const l = lang.toLowerCase();
  if (l === "btsx" || l === "beast") return "btsx";
  if (l === "tsrx") return "tsrx";
  if (l === "shell" || l === "bash" || l === "sh") return "bash";
  if (l === "text" || l === "txt") return undefined;
  // highlight.js uses 'typescript' for ts, 'javascript' for js
  if (["ts", "typescript", "tsx", "js", "javascript", "css", "json", "html", "xml"].includes(l)) return l;
  // fallback: let hljs auto-detect or plain
  return hljs.getLanguage(l) ? l : undefined;
}

export function CodeBlock({ code, filename, language, className = "" }: CodeBlockProps) {
  const lang = normalizeLang(language);
  let highlighted: string | null = null;
  try {
    if (lang && hljs.getLanguage(lang)) {
      highlighted = hljs.highlight(code, { language: lang }).value;
    } else if (lang === undefined) {
      highlighted = null;
    } else {
      highlighted = hljs.highlightAuto(code).value;
    }
  } catch {
    highlighted = null;
  }
  const lines = highlighted ? highlighted.split("\n") : null;

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
          {lines
            ? lines.map((line, index) => (
                <span className="code-line" key={index}>
                  <span className="line-number" aria-hidden="true">{index + 1}</span>
                  <span
                    className="line-content hljs"
                    dangerouslySetInnerHTML={{ __html: line || " " }}
                  />
                </span>
              ))
            : code.split("\n").map((line, index) => (
                <span className="code-line" key={`${index}-${line}`}>
                  <span className="line-number" aria-hidden="true">{index + 1}</span>
                  <span className="line-content">{line || " "}</span>
                </span>
              ))}
        </code>
      </pre>
    </div>
  );
}
