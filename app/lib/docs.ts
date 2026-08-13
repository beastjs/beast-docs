export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavigationSection = {
  label: string;
  items: NavigationItem[];
};

export type CodeSample = {
  code: string;
  filename?: string;
  language?: string;
};

export type DocSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  code?: CodeSample;
  list?: string[];
  note?: {
    title: string;
    body: string;
    tone?: "info" | "warning";
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type DocPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  sections: DocSection[];
};

export const githubUrl = "https://github.com/phtn/beast";

export const navigation: NavigationSection[] = [
  {
    label: "Get started",
    items: [
      {
        label: "Overview",
        href: "/docs",
        description: "What Beast is and where it fits.",
      },
      {
        label: "Quick start",
        href: "/docs/get-started",
        description: "Create a typed Beast application.",
      },
      {
        label: "How it works",
        href: "/docs/how-it-works",
        description: "Follow BTSX from source to browser.",
      },
    ],
  },
  {
    label: "Language",
    items: [
      {
        label: "Elements & nesting",
        href: "/docs/language",
        description: "Author structure with indentation.",
      },
      {
        label: "Components & props",
        href: "/docs/components",
        description: "Imports, setup, props, and local components.",
      },
      {
        label: "Control flow",
        href: "/docs/control-flow",
        description: "Conditions, loops, switches, and boundaries.",
      },
    ],
  },
  {
    label: "Tooling",
    items: [
      {
        label: "CLI reference",
        href: "/docs/cli",
        description: "Compile files and build source trees.",
      },
      {
        label: "Vite integration",
        href: "/docs/vite",
        description: "Run Beast before Octane in memory.",
      },
      {
        label: "Compiler API",
        href: "/docs/compiler-api",
        description: "Compile and inspect Beast programmatically.",
      },
      {
        label: "Diagnostics",
        href: "/docs/diagnostics",
        description: "Stable error codes and source spans.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Golden examples",
        href: `${githubUrl}/tree/main/examples`,
        description: "Compare BTSX inputs with exact TSRX output.",
        external: true,
      },
      {
        label: "Octane coverage",
        href: `${githubUrl}/blob/main/docs/octane-coverage.md`,
        description: "See supported runtime APIs and roadmap.",
        external: true,
      },
      {
        label: "GitHub repository",
        href: githubUrl,
        description: "Source, issues, and contributions.",
        external: true,
      },
    ],
  },
];

export const searchItems = navigation.flatMap((section) =>
  section.items.map((item) => ({
    ...item,
    group: section.label,
  })),
);

export const docPages: Record<string, DocPage> = {
  "": {
    slug: "",
    eyebrow: "Get started",
    title: "Beast overview",
    description:
      "Beast is an indentation-first component language that compiles readable BTSX into native TSRX for Octane.",
    sections: [
      {
        id: "what-is-beast",
        title: "What is Beast?",
        paragraphs: [
          "Beast is a small, source-located compiler for authoring TSRX components without closing tags. It owns a compact authoring layer, then hands generated TSRX to the existing Octane and Vite toolchain.",
          "It does not replace TypeScript, TSRX, Octane, or Vite. Embedded TypeScript stays intact, generated output stays inspectable, and Octane remains the authority for runtime compilation.",
        ],
        note: {
          title: "Alpha software",
          body: "The compiler, recursive builder, Vite integration, and project creator are working and tested. The language and public API may still change before a stable release.",
          tone: "warning",
        },
      },
      {
        id: "at-a-glance",
        title: "At a glance",
        table: {
          headers: ["Capability", "What it gives you"],
          rows: [
            ["BTSX compiler", "Indentation-based components compiled to native TSRX"],
            ["Native control flow", "Octane conditions, loops, switches, and boundaries"],
            ["Project builder", "Recursive mixed BTSX and TSRX source trees"],
            ["Vite integration", "In-memory compilation with HMR and production builds"],
            ["Diagnostics", "Stable codes with filenames, source spans, and hints"],
          ],
        },
      },
      {
        id: "first-component",
        title: "A first component",
        paragraphs: [
          "A Beast component mixes normal TypeScript declarations with an indentation-defined template. Selector shorthand follows familiar CSS notation.",
        ],
        code: {
          filename: "src/Greeting.btsx",
          language: "btsx",
          code: `props { name }: { name: string }

main.greeting
  h1 Hello, #{name}
  p Built with Beast and Octane.`,
        },
      },
    ],
  },
  "get-started": {
    slug: "get-started",
    eyebrow: "Get started",
    title: "Quick start",
    description:
      "Scaffold a typed Beast, Octane, and Vite application, then run it locally.",
    sections: [
      {
        id: "requirements",
        title: "Requirements",
        paragraphs: [
          "Use Node.js 22.22.2 or newer and a current stable release of Bun. The project creator configures Beast and Octane as one Vite compilation pipeline.",
        ],
        list: [
          "Node.js 22.22.2 or newer",
          "Bun (current stable)",
          "A modern browser for the generated Vite application",
        ],
      },
      {
        id: "create-a-project",
        title: "Create a project",
        paragraphs: [
          "Run the creator and pass a directory to skip the interactive name prompt.",
        ],
        code: {
          filename: "Terminal",
          language: "shell",
          code: `bun create beast@latest my-app
cd my-app
bun run dev`,
        },
        note: {
          title: "Direct package execution",
          body: "The equivalent form is `bun x create-beast@latest my-app`.",
        },
      },
      {
        id: "what-you-get",
        title: "What the starter includes",
        list: [
          "Beast and Octane configured in a single Vite pipeline",
          "A typed App.btsx component",
          "TSRX-aware checking through tsrx-tsc",
          "Development, build, preview, type-check, and combined check scripts",
          "A focused .gitignore and optional initialized Git repository",
        ],
      },
      {
        id: "creator-options",
        title: "Creator options",
        table: {
          headers: ["Option", "Effect"],
          rows: [
            ["--no-install", "Write the project without running bun install"],
            ["--no-git", "Skip git init"],
            ["--force", "Write known template files into a non-empty directory"],
            ["-h, --help", "Print command help"],
          ],
        },
      },
    ],
  },
  "how-it-works": {
    slug: "how-it-works",
    eyebrow: "Get started",
    title: "How Beast works",
    description:
      "Beast turns source-located BTSX into readable TSRX before Octane and Vite take over.",
    sections: [
      {
        id: "pipeline",
        title: "The compilation pipeline",
        paragraphs: [
          "The indentation-aware parser creates a source-located Beast AST. The generator then emits native TSRX, which Octane validates and lowers before Vite adds the module to the application graph.",
        ],
        list: [
          ".btsx source",
          "Indentation-aware parser",
          "Source-located Beast AST",
          "Readable .tsrx output",
          "Octane compiler",
          "Vite module graph",
        ],
      },
      {
        id: "input",
        title: "BTSX input",
        code: {
          filename: "Card.btsx",
          language: "btsx",
          code: `props { user, messages }: Props

.card
  h1 Welcome, #{user.name}
  if user.isAdmin
    AdminPanel(userId={user.id})
  ul.messages
    each message in messages key message.id
      li #{message.text}`,
        },
      },
      {
        id: "output",
        title: "Native TSRX output",
        paragraphs: [
          "Conditions and loops remain template operations, component output remains readable, and Octane stays the authority for final validation.",
        ],
        code: {
          filename: "Card.tsrx",
          language: "tsrx",
          code: `export default function Card({ user, messages }: Props) @{
  <div className="card">
    <h1>Welcome, {user.name}</h1>
    @if (user.isAdmin) {
      <AdminPanel userId={user.id} />
    }
    <ul className="messages">
      @for (const message of messages; key message.id) {
        <li>{message.text}</li>
      }
    </ul>
  </div>
}`,
        },
      },
    ],
  },
  language: {
    slug: "language",
    eyebrow: "Language",
    title: "Elements and nesting",
    description:
      "Use indentation, selectors, attributes, text, and interpolation to describe a component tree.",
    sections: [
      {
        id: "indentation",
        title: "Indentation defines structure",
        paragraphs: [
          "Every indented line becomes a child of the line above it. Indentation must use spaces; tabs are rejected with a source-located diagnostic.",
        ],
        code: {
          filename: "Hero.btsx",
          language: "btsx",
          code: `main.page
  section#intro.hero
    h1 Beast
    p Indentation becomes structure.`,
        },
      },
      {
        id: "selectors",
        title: "Selector shorthand",
        table: {
          headers: ["BTSX", "Meaning"],
          rows: [
            ["section", "HTML element"],
            ["Card", "Component reference"],
            ["Theme.Provider", "Dotted component reference"],
            [".card", "div with class card"],
            ["section.hero", "section with class hero"],
            ["section#intro.hero", "section with an ID and class"],
          ],
        },
      },
      {
        id: "attributes",
        title: "Attributes",
        paragraphs: [
          "Attributes live in parentheses and may be separated by spaces or commas. Beast normalizes `class` to `className` and combines it with selector shorthand.",
        ],
        code: {
          filename: "Button.btsx",
          language: "btsx",
          code: `Button(tone="primary" count={items.length} disabled) Continue`,
        },
      },
      {
        id: "text",
        title: "Text and interpolation",
        paragraphs: [
          "Inline text follows a selector. Use `#{...}` for expressions and a pipe for a line that should always be interpreted as text.",
        ],
        code: {
          filename: "Inbox.btsx",
          language: "btsx",
          code: `p Hello, #{user.name}. You have #{messages.length} messages.

div.notice
  | This line is text, not an element selector.`,
        },
      },
    ],
  },
  components: {
    slug: "components",
    eyebrow: "Language",
    title: "Components, props, and setup",
    description:
      "Keep imports, typed public props, module code, local components, and Octane hooks together.",
    sections: [
      {
        id: "props",
        title: "Typed props",
        paragraphs: [
          "A component may have one props declaration. Its contents become the complete typed function parameter in generated TSRX.",
        ],
        code: {
          filename: "UserCard.btsx",
          language: "btsx",
          code: `import type { User } from "./types.ts";
props { user, compact = false }: { user: User; compact?: boolean }

article.user-card(class={compact ? "compact" : ""})
  h2 #{user.name}`,
        },
      },
      {
        id: "setup",
        title: "Component setup",
        paragraphs: [
          "Setup emits TypeScript inside the component body before its template root. Use it for local values and Octane hooks.",
        ],
        code: {
          filename: "Counter.btsx",
          language: "btsx",
          code: `import { useMemo, useState } from "octane";
props { initialCount }: { initialCount: number }
setup const [count, setCount] = useState(initialCount);
setup const doubled = useMemo(() => count * 2);

button(onClick={() => setCount(count + 1)})
  | Count: #{count}, doubled: #{doubled}`,
        },
      },
      {
        id: "module-code",
        title: "Module code",
        paragraphs: [
          "Module declarations emit TypeScript at module scope. Use them for directives, types, context values, constants, and helper functions.",
        ],
        code: {
          filename: "Theme.btsx",
          language: "btsx",
          code: `module
  "use strong";
  const shortcutKey = "/";

import { useEffect } from "octane";`,
        },
      },
      {
        id: "local-components",
        title: "Local components",
        paragraphs: [
          "A component declaration creates a tagless local component using the same BTSX syntax as the default export.",
        ],
        code: {
          filename: "ThemeLabel.btsx",
          language: "btsx",
          code: `component ThemeLabel
  setup const currentTheme = use(Theme);
  p Current theme: #{currentTheme}

Theme.Provider(value={theme})
  ThemeLabel`,
        },
      },
    ],
  },
  "control-flow": {
    slug: "control-flow",
    eyebrow: "Language",
    title: "Control flow",
    description:
      "Author conditions, keyed iteration, switches, loading states, and error boundaries as native template operations.",
    sections: [
      {
        id: "conditions",
        title: "Conditions",
        paragraphs: [
          "Aligned `if`, `elseif`, and `else` branches compile directly to Octane `@if` control flow.",
        ],
        code: {
          filename: "Status.btsx",
          language: "btsx",
          code: `if status === "ready"
  ReadyView
elseif status === "loading"
  LoadingView
else
  ErrorView`,
        },
      },
      {
        id: "iteration",
        title: "Iteration and keys",
        paragraphs: [
          "Loops compile to native `@for` blocks. Beast never invents an index key because keys affect rendering and hook identity.",
        ],
        code: {
          filename: "Catalog.btsx",
          language: "btsx",
          code: `each result, index in results key result.id
  SearchResult(result={result} position={index})
empty
  p No matches.`,
        },
      },
      {
        id: "switch",
        title: "Multiple choices",
        code: {
          filename: "Variant.btsx",
          language: "btsx",
          code: `switch status
  case "ready"
    ReadyView
  case "loading"
    LoadingView
  default
    ErrorView`,
        },
      },
      {
        id: "boundaries",
        title: "Loading and error boundaries",
        paragraphs: [
          "A `try` arm can be followed by `pending`, `catch`, or both. These compile directly to Octane template boundaries.",
        ],
        code: {
          filename: "Profile.btsx",
          language: "btsx",
          code: `try
  Profile(data={profileData})
pending
  p Loading profile…
catch error, reset
  .error
    p Could not load profile: #{String(error)}
    button(onClick={reset}) Try again`,
        },
      },
    ],
  },
  cli: {
    slug: "cli",
    eyebrow: "Tooling",
    title: "CLI reference",
    description:
      "Compile one component or recursively build and validate a mixed Beast source tree.",
    sections: [
      {
        id: "commands",
        title: "Commands",
        code: {
          filename: "Terminal",
          language: "text",
          code: `beast compile <input.btsx> [options]
beast <input.btsx> [output.tsrx] [options]
beast build [source-directory] [options]
beast --help`,
        },
      },
      {
        id: "compile",
        title: "Compile a component",
        code: {
          filename: "Terminal",
          language: "shell",
          code: `beast compile src/Card.btsx \\
  --output generated/Card.tsrx \\
  --component-name Card \\
  --props '{ title }: { title: string }'`,
        },
        table: {
          headers: ["Option", "Description"],
          rows: [
            ["-o, --output PATH", "Write TSRX to a specific path"],
            ["--component-name NAME", "Override the generated component identifier"],
            ["--props PARAMETER", "Override the complete typed function parameter"],
            ["--no-validate", "Skip Octane validation"],
          ],
        },
      },
      {
        id: "build",
        title: "Build a source tree",
        paragraphs: [
          "The builder mirrors source paths, validates generated and native TSRX, and writes a deterministic `beast-manifest.json`.",
        ],
        code: {
          filename: "Terminal",
          language: "shell",
          code: `beast build ./src --out-dir ./.beast`,
        },
        note: {
          title: "Safe cleanup",
          body: "Beast only removes stale generated TSRX paths recorded in the previous manifest. It never removes untracked files.",
        },
      },
    ],
  },
  vite: {
    slug: "vite",
    eyebrow: "Tooling",
    title: "Vite integration",
    description:
      "Compile Beast before Octane in memory while keeping normal development, HMR, SSR, and production builds.",
    sections: [
      {
        id: "configure",
        title: "Configure the plugin",
        paragraphs: [
          "Use `beastOctane()` once for projects that contain both Beast and native TSRX modules.",
        ],
        code: {
          filename: "vite.config.ts",
          language: "ts",
          code: `import { defineConfig } from "vite";
import { beastOctane } from "beast-tsrx/vite";

export default defineConfig({
  plugins: [
    beastOctane({
      octane: { strong: true },
    }),
  ],
});`,
        },
      },
      {
        id: "imports",
        title: "Import source normally",
        code: {
          filename: "src/main.ts",
          language: "ts",
          code: `import App from "./App.btsx";
import { NativePanel } from "./NativePanel.tsrx";`,
        },
      },
      {
        id: "behavior",
        title: "What the integration does",
        list: [
          "Generates TSRX in memory during Vite pre-transform",
          "Passes generated code to Octane's public bundler compiler",
          "Forwards HMR invalidation for .btsx changes",
          "Selects Octane's server environment for SSR transforms",
          "Allows per-file componentName and propsParam overrides",
        ],
        note: {
          title: "Advanced configuration",
          body: "The lower-level `beast()` plugin only performs the BTSX pre-transform. Most applications should use `beastOctane()`.",
        },
      },
    ],
  },
  "compiler-api": {
    slug: "compiler-api",
    eyebrow: "Tooling",
    title: "Compiler API",
    description:
      "Compile source, inspect the source-located AST and diagnostics, or build a project from JavaScript.",
    sections: [
      {
        id: "compile-source",
        title: "Compile source",
        code: {
          filename: "compile.ts",
          language: "ts",
          code: `import { compileBeast, compileBeastResult } from "beast-tsrx";

const code = compileBeast(source, {
  filename: "Card.btsx",
  componentName: "Card",
  propsParam: "{ title }: { title: string }",
});

const result = compileBeastResult(source, {
  filename: "Card.btsx",
});

console.log(result.ast, result.code, result.diagnostics);`,
        },
      },
      {
        id: "build-project",
        title: "Build a project",
        code: {
          filename: "build.ts",
          language: "ts",
          code: `import { buildBeastProject } from "beast-tsrx";

const result = await buildBeastProject({
  root: "src",
  outDir: ".beast",
  components: {
    "components/Card.btsx": {
      componentName: "Card",
      propsParam: "{ title }: { title: string }",
    },
  },
});

console.log(result.manifestPath, result.removed);`,
        },
      },
      {
        id: "exports",
        title: "Main exports",
        table: {
          headers: ["Export", "Purpose"],
          rows: [
            ["compileBeast()", "Compile BTSX and return TSRX code"],
            ["compileBeastResult()", "Return code, AST, and diagnostics"],
            ["parse()", "Parse BTSX into the public Beast AST"],
            ["buildBeastProject()", "Compile and validate a recursive source tree"],
            ["BeastCompileError", "Structured error carrying a stable diagnostic"],
            ["beastOctane()", "Complete Vite integration for mixed projects"],
          ],
        },
      },
    ],
  },
  diagnostics: {
    slug: "diagnostics",
    eyebrow: "Tooling",
    title: "Diagnostics",
    description:
      "Turn compiler failures into actionable errors with stable codes and precise source locations.",
    sections: [
      {
        id: "shape",
        title: "Diagnostic shape",
        paragraphs: [
          "Parser and generator failures throw `BeastCompileError`. The CLI formats the failing source line with a caret marker.",
        ],
        list: [
          "A stable BEAST####_* code",
          "Error or warning severity",
          "A human-readable message",
          "The source filename",
          "Start and end offsets, lines, and columns",
          "An optional remediation hint",
        ],
      },
      {
        id: "example",
        title: "Source-located feedback",
        code: {
          filename: "Terminal",
          language: "text",
          code: `src/Card.btsx:4:3 — BEAST1002_INVALID_INDENT

4 | \tsection.card
    ^

Tabs are not supported in BTSX indentation.
Use spaces to define the template tree.`,
        },
        note: {
          title: "TypeScript validation",
          body: "Embedded expressions remain source slices. Octane performs their final language-level TypeScript validation.",
        },
      },
    ],
  },
};

export const orderedDocPages = navigation
  .flatMap((section) => section.items)
  .filter((item) => item.href.startsWith("/docs"))
  .map((item) => item.href.replace(/^\/docs\/?/, ""))
  .map((slug) => docPages[slug])
  .filter((page): page is DocPage => Boolean(page));
