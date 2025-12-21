import { ExternalLink, GitFork, GitPullRequest, FileEdit, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Contribute",
  description: "Learn how to contribute to Historical Parallax by creating or editing articles.",
};

const GITHUB_REPO = "https://github.com/joshephan/historical-parallax";

export default function ContributePage() {
  return (
    <div className="bg-background overflow-x-hidden">


      <main className="container max-w-4xl py-12 px-4">
        <div className="space-y-2 mb-8">
          <h1 className="font-sans text-4xl font-bold tracking-tight">
            Contribute to Historical Parallax
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us build a comprehensive, balanced resource on historical figures and events.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button asChild>
            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`${GITHUB_REPO}/fork`} target="_blank" rel="noopener noreferrer">
              <GitFork className="mr-2 h-4 w-4" />
              Fork Repository
            </a>
          </Button>
        </div>

        <Separator className="my-8" />

        {/* Getting Started */}
        <section className="space-y-4 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Getting Started</h2>
          <p className="text-muted-foreground">
            We accept contributions in the form of Markdown files located in the{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">content/articles/</code>{" "}
            directory. You can either create new articles or improve existing ones.
          </p>
        </section>

        {/* How to Create a New Article */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <FileEdit className="h-6 w-6" />
            Creating a New Article
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Fork the Repository</h3>
                <p className="text-muted-foreground">
                  Go to our{" "}
                  <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    GitHub repository
                  </a>{" "}
                  and click the &quot;Fork&quot; button to create your own copy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Clone Your Fork</h3>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>git clone https://github.com/YOUR_USERNAME/historical-parallax.git</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Create a New Branch</h3>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>git checkout -b feature/add-article-name</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Create Your Article</h3>
                <p className="text-muted-foreground">
                  Create a new file in <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">content/articles/</code> with the naming format:
                </p>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>firstname-lastname.md</code>
                </pre>
                <p className="text-sm text-muted-foreground">
                  Example: <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">winston-churchill.md</code>, <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">cleopatra-vii.md</code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                5
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Commit and Push</h3>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>{`git add content/articles/your-article.md
git commit -m "Add article on [Person Name]"
git push origin feature/add-article-name`}</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                6
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Open a Pull Request</h3>
                <p className="text-muted-foreground">
                  Go to your fork on GitHub and click &quot;Compare & pull request&quot;. Provide a clear description of your contribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Article Format */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Article Format</h2>
          <p className="text-muted-foreground">
            Every article must follow this exact Markdown structure:
          </p>

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
A 3-4 sentence overview of the person's significance.

## Early Life
Birth, family background, education. Include citations [^1].

## Middle Years
Main career achievements and key events [^2].

## Later Life
Final years and legacy [^3].

## Positive Perspectives
- Positive point 1 with citation [^4]
- Positive point 2 with citation [^5]

## Negative Perspectives
- Criticism or controversy 1 [^6]
- Criticism or controversy 2 [^7]

## Recent News
Recent news or developments (if applicable).

## Career Timeline
| Year | Event |
|------|-------|
| YYYY | Description |

## References
[^1]: Author, "Title" (Year). URL
[^2]: Author, "Title" (Year). URL`}</code>
          </pre>
        </section>

        <Separator className="my-8" />

        {/* Guidelines */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Content Guidelines</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Do</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Write all content in English</li>
                <li>• Include both positive and negative perspectives</li>
                <li>• Cite every factual claim with footnotes</li>
                <li>• Use reputable sources (academic, news organizations)</li>
                <li>• Use Wikimedia Commons images only</li>
                <li>• Use ISO date format (YYYY-MM-DD)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">✕</span>
                <h3 className="font-semibold">Don&apos;t</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Modify code or configuration files</li>
                <li>• Use copyrighted images</li>
                <li>• Include unsourced claims</li>
                <li>• Write biased or one-sided content</li>
                <li>• Include promotional material</li>
                <li>• Add personal opinions without attribution</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Editing Existing Articles */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <GitPullRequest className="h-6 w-6" />
            Editing Existing Articles
          </h2>

          <p className="text-muted-foreground">
            To edit an existing article:
          </p>

          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">1.</span>
              Navigate to the article page on our website
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">2.</span>
              Click the &quot;Edit&quot; button in the header to go directly to the file on GitHub
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">3.</span>
              Click the pencil icon on GitHub to edit the file
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">4.</span>
              Make your changes and submit a pull request
            </li>
          </ol>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm">
              <strong>Tip:</strong> You can also browse all articles directly at{" "}
              <a
                href={`${GITHUB_REPO}/tree/main/content/articles`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {GITHUB_REPO}/tree/main/content/articles
              </a>
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Review Process */}
        <section className="space-y-4 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Review Process</h2>
          <p className="text-muted-foreground">
            After you submit a pull request:
          </p>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            <li>Your PR will be reviewed for formatting compliance</li>
            <li>Content will be verified for accuracy using AI-powered fact-checking</li>
            <li>An editorial review will check for balance and quality</li>
            <li>Once approved, your contribution will be merged and deployed</li>
          </ol>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <h2 className="font-sans text-2xl font-semibold">Ready to Contribute?</h2>
          <p className="text-muted-foreground max-w-md">
            Your contributions help create a more comprehensive understanding of history.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Go to GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
