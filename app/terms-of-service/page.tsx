import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service - Historical Parallax",
  description: "Terms of Service for Historical Parallax",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container flex-1 py-12">
        <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          <h1 className="font-serif">Terms of Service</h1>

          <p className="lead">
            Last updated: December 2024
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Historical Parallax, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>

          <h2>2. Use of Service</h2>
          <p>
            Historical Parallax provides informational content about historical figures and events. The content is provided for educational and reference purposes only.
          </p>

          <h2>3. Content Accuracy</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the information provided.
          </p>

          <h2>4. Multiple Perspectives</h2>
          <p>
            Historical Parallax presents multiple perspectives on historical figures and events. The inclusion of any perspective does not constitute endorsement by Historical Parallax or its operators.
          </p>

          <h2>5. Sources and Citations</h2>
          <p>
            All information is sourced from publicly available materials. We provide citations where possible, but users should verify information independently for critical uses.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The content, organization, and presentation of Historical Parallax are protected by copyright and other intellectual property laws. Images and media may be subject to separate licenses as indicated.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Historical Parallax or its operators be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of this service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>

          <h2>9. Contact</h2>
          <p>
            For questions about these terms, please contact us at{" "}
            <a href="mailto:contact@parallax.kr">contact@parallax.kr</a>.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
