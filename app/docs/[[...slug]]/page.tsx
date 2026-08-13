import { ArrowLeft, ArrowRight, ArrowUpRight, GitFork } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "../../components/code-block";
import { Sidebar } from "../../components/sidebar";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import {
  docPages,
  githubUrl,
  orderedDocPages,
  type DocPage,
} from "../../lib/docs";

type DocsPageProps = {
  params: Promise<{ slug?: string[] }>;
};

function getPage(slug?: string[]) {
  return docPages[(slug ?? []).join("/")];
}

function InlineText({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>
    ) : (
      part
    ),
  );
}

function pageSection(page: DocPage) {
  if (page.eyebrow === "Language") return "language" as const;
  if (page.eyebrow === "Tooling") return "tooling" as const;
  return "docs" as const;
}

export function generateStaticParams() {
  return Object.keys(docPages).map((slug) => ({
    slug: slug ? slug.split("/") : [],
  }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const page = getPage((await params).slug);
  if (!page) notFound();

  const pageIndex = orderedDocPages.findIndex((candidate) => candidate.slug === page.slug);
  const previous = pageIndex > 0 ? orderedDocPages[pageIndex - 1] : undefined;
  const next =
    pageIndex >= 0 && pageIndex < orderedDocPages.length - 1
      ? orderedDocPages[pageIndex + 1]
      : undefined;
  const currentHref = `/docs${page.slug ? `/${page.slug}` : ""}`;

  return (
    <>
      <SiteHeader section={pageSection(page)} />
      <div className="site-frame docs-frame">
        <Sidebar currentHref={currentHref} />

        <main id="main-content" className="docs-main">
          <article className="docs-article">
            <div className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/docs">Docs</Link>
              <span aria-hidden="true">/</span>
              <span>{page.eyebrow}</span>
            </div>

            <header className="article-header">
              <span className="section-kicker">{page.eyebrow}</span>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
              <div className="article-actions">
                <a
                  href={`${githubUrl}/blob/main/README.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="article-action"
                >
                  <GitFork size={15} aria-hidden="true" />
                  View source
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </header>

            <div className="article-rule" />

            {page.sections.map((section) => (
              <section className="article-section" id={section.id} key={section.id}>
                <h2>
                  <a href={`#${section.id}`}>{section.title}</a>
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>
                    <InlineText text={paragraph} />
                  </p>
                ))}

                {section.list ? (
                  <ul className="article-list">
                    {section.list.map((item) => (
                      <li key={item}>
                        <InlineText text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.code ? <CodeBlock {...section.code} /> : null}

                {section.table ? (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("-")}>
                            {row.map((cell, index) => (
                              <td key={`${cell}-${index}`}>
                                <InlineText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {section.note ? (
                  <aside
                    className={`article-note ${
                      section.note.tone === "warning" ? "warning" : "info"
                    }`}
                  >
                    <strong>{section.note.title}</strong>
                    <p>
                      <InlineText text={section.note.body} />
                    </p>
                  </aside>
                ) : null}
              </section>
            ))}

            <nav className="article-pagination" aria-label="Documentation pages">
              {previous ? (
                <Link href={`/docs${previous.slug ? `/${previous.slug}` : ""}`}>
                  <ArrowLeft size={15} aria-hidden="true" />
                  <span>
                    <small>Previous</small>
                    <strong>{previous.title}</strong>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/docs/${next.slug}`} className="next-page">
                  <span>
                    <small>Next</small>
                    <strong>{next.title}</strong>
                  </span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>

          <aside className="article-toc" aria-label="On this page">
            <p>On this page</p>
            <nav>
              {page.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.title}
                </a>
              ))}
            </nav>
            <div className="toc-feedback">
              <span>Was this helpful?</span>
              <div>
                <a
                  href={`${githubUrl}/issues/new`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send feedback
                </a>
              </div>
            </div>
          </aside>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
