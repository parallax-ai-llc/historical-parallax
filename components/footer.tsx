import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <Link
            href="https://parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Parallax AI, LLC
          </Link>
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
