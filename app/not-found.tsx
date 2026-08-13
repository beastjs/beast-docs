import Link from "next/link";
import { SiteHeader } from "./components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <span className="section-kicker">404 · Missing page</span>
        <h1>This trail went cold.</h1>
        <p>The page you were looking for is not part of the Beast docs.</p>
        <Link href="/" className="button button-primary">
          Back to the docs
        </Link>
      </main>
    </>
  );
}
