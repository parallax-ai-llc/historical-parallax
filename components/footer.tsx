import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6" role="contentinfo" aria-label="Site footer">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <a
            href="https://parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Parallax AI, LLC (opens in new tab)"
          >
            Parallax AI, LLC
          </a>
        </p>
        <nav
          aria-label="Footer navigation"
          className="flex items-center gap-4 text-sm text-muted-foreground"
        >
          <a
            href="https://legal.parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Legal Parallax
          </a>
          <a
            href="https://truth.parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Truth Parallax
          </a>
          <Link
            href="/terms-of-service"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
