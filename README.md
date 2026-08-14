# Beast Developer Docs

Documentation for Beast — indentation-first `.btsx` that compiles to native TSRX for [Octane](https://octanejs.dev) — built with Next.js 16, Tailwind, and Shiki (Tokyo Night).

## Stack

- Next 16 (App Router, Turbopack), React 19, TypeScript 5
- Tailwind 4 + `@tailwindcss/postcss`, `tailwind-merge` (`cn`)
- `highlight.js` + custom `btsx`/`tsrx` (from `phtn/beast-ext` `highlights.scm`/`injections.scm`, Tokyo Night Dark)

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # 18/18 static
bun run lint
```

## Docs content — `app/lib/docs.ts`

- `navigation` + `docPages` — add a section there, `orderedDocPages` and `generateStaticParams` pick it up.
- Code blocks: `CodeBlock` (`app/components/code-block.tsx`) uses `lib/btsx-hljs.ts` (Zed grammar → `highlight.js`), theme in `app/globals.css` (`.hljs` Tokyo Night).

## Editors

- **Zed:** `phtn/beast-ext` — `extension.toml` pinned to `src/parser.c`+`src/scanner.c`, `languages/beast/*.scm`.
- **Neovim:** `phtn/nvim-treesitter#add-beast-parser` → upstream `nvim-treesitter/nvim-treesitter` (parser `beast`, `filetype=beast` for `*.btsx`):
  ```lua
  -- lazy.nvim
  {
    "phtn/beast.ext",
    ft = "beast",
    dependencies = { "nvim-treesitter/nvim-treesitter" },
    config = function()
      vim.filetype.add({ extension = { btsx = "beast" } })
      require("nvim-treesitter.parsers").get_parser_configs().beast = {
        install_info = { url = "https://github.com/phtn/beast-ext", files = { "src/parser.c", "src/scanner.c" }, branch = "main" },
        filetype = "beast",
      }
    end
  }
  -- :TSInstall beast
  ```
  Upstream PR: https://github.com/phtn/nvim-treesitter/pull/1 → https://github.com/nvim-treesitter/nvim-treesitter/compare/main...phtn:add-beast-parser

## Deploy

Vercel — `next build` is static (`/`, `/_not-found`, `/docs/[[...slug]]`).

## Related

- Beast compiler: https://github.com/phtn/beast
- Zed extension: https://github.com/phtn/beast-ext
- Neovim parser PR: https://github.com/phtn/nvim-treesitter/pull/1 (commit [fb27e47](https://github.com/phtn/nvim-treesitter/pull/1/commits/fb27e477129c72421f2571316d37ca5844d61fa3))
