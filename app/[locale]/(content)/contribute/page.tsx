import { getTranslations } from "next-intl/server";
import { ExternalLink, GitFork, GitPullRequest, FileEdit, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const GITHUB_REPO = "https://github.com/parallax-ai-llc/historical-parallax";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contribute" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContributePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contribute" });

  return (
    <div className="bg-background overflow-x-hidden">
      <main className="container max-w-4xl py-12 px-4">
        <div className="space-y-2 mb-8">
          <h1 className="font-sans text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button asChild>
            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              {t("viewOnGitHub")}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`${GITHUB_REPO}/fork`} target="_blank" rel="noopener noreferrer">
              <GitFork className="mr-2 h-4 w-4" />
              {t("forkRepository")}
            </a>
          </Button>
        </div>

        <Separator className="my-8" />

        <section className="space-y-4 mb-12">
          <h2 className="font-sans text-2xl font-semibold">{t("gettingStarted.title")}</h2>
          <p className="text-muted-foreground">
            {t.rich("gettingStarted.description", {
              directory: (chunks) => (
                <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
                  {chunks}
                </code>
              ),
            })}
          </p>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <FileEdit className="h-6 w-6" />
            {t("creatingArticle.title")}
          </h2>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {step}
                </div>
                <div className="space-y-2 min-w-0 flex-1">
                  <h3 className="font-semibold">
                    {t(`creatingArticle.step${step}.title` as Parameters<typeof t>[0])}
                  </h3>
                  {step === 1 && (
                    <p className="text-muted-foreground">
                      {t.rich("creatingArticle.step1.description", {
                        link: (chunks) => (
                          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {chunks}
                          </a>
                        ),
                      })}
                    </p>
                  )}
                  {step === 2 && (
                    <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                      <code>git clone https://github.com/parallax-ai-llc/historical-parallax.git</code>
                    </pre>
                  )}
                  {step === 3 && (
                    <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                      <code>git checkout -b feature/add-article-name</code>
                    </pre>
                  )}
                  {step === 4 && (
                    <>
                      <p className="text-muted-foreground">
                        {t.rich("creatingArticle.step4.description", {
                          directory: (chunks) => (
                            <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">{chunks}</code>
                          ),
                        })}
                      </p>
                      <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                        <code>firstname-lastname.md</code>
                      </pre>
                      <p className="text-sm text-muted-foreground">
                        {t.rich("creatingArticle.step4.example", {
                          examples: () => (
                            <>
                              <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">winston-churchill.md</code>
                              {", "}
                              <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">cleopatra-vii.md</code>
                            </>
                          ),
                        })}
                      </p>
                    </>
                  )}
                  {step === 5 && (
                    <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                      <code>{`git add content/articles/your-article.md\ngit commit -m "Add article on [Person Name]"\ngit push origin feature/add-article-name`}</code>
                    </pre>
                  )}
                  {step === 6 && (
                    <p className="text-muted-foreground">{t("creatingArticle.step6.description")}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold">{t("articleFormat.title")}</h2>
          <p className="text-muted-foreground">{t("articleFormat.description")}</p>
          <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm leading-relaxed max-w-full">
            <code>{`---
id: "firstname-lastname"
name: "Full Name"
birth: "YYYY-MM-DD"
death: "YYYY-MM-DD"
nationality: "Country"
occupation: ["Occupation1", "Occupation2"]
image: "https://upload.wikimedia.org/wikipedia/commons/..."
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/..."
lastUpdated: "YYYY-MM-DD"
---

## Summary
## Early Life
## Middle Years
## Later Life
## Positive Perspectives
## Negative Perspectives
## Recent News
## Career Timeline
## References`}</code>
          </pre>
        </section>

        <Separator className="my-8" />

        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold">{t("guidelines.title")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">{t("guidelines.doTitle")}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(t.raw("guidelines.doItems") as string[]).map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">✕</span>
                <h3 className="font-semibold">{t("guidelines.dontTitle")}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(t.raw("guidelines.dontItems") as string[]).map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <GitPullRequest className="h-6 w-6" />
            {t("editingArticles.title")}
          </h2>
          <p className="text-muted-foreground">{t("editingArticles.description")}</p>
          <ol className="space-y-3 text-muted-foreground">
            {["step1", "step2", "step3", "step4"].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="font-semibold text-foreground">{i + 1}.</span>
                {t(`editingArticles.${step}` as Parameters<typeof t>[0])}
              </li>
            ))}
          </ol>
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm">
              {t.rich("editingArticles.tip", {
                link: (chunks) => (
                  <a
                    href={`${GITHUB_REPO}/tree/main/content/articles`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="space-y-4 mb-12">
          <h2 className="font-sans text-2xl font-semibold">{t("reviewProcess.title")}</h2>
          <p className="text-muted-foreground">{t("reviewProcess.description")}</p>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            {["step1", "step2", "step3", "step4"].map((step) => (
              <li key={step}>{t(`reviewProcess.${step}` as Parameters<typeof t>[0])}</li>
            ))}
          </ol>
        </section>

        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <h2 className="font-sans text-2xl font-semibold">{t("cta.title")}</h2>
          <p className="text-muted-foreground max-w-md">{t("cta.description")}</p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("cta.button")}
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
