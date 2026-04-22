import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: `${t("title")} - Historical Parallax`,
    description: t("title"),
  };
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  const sections = [
    "acceptance", "use", "accuracy", "perspectives",
    "sources", "ip", "liability", "changes", "contact",
  ] as const;

  return (
    <div className="container py-12">
      <article className="prose mx-auto max-w-3xl dark:prose-invert">
        <h1 className="font-serif">{t("title")}</h1>
        <p className="lead">{t("lastUpdated")}</p>

        {sections.map((section) => (
          <div key={section}>
            <h2>{t(`sections.${section}.title`)}</h2>
            <p>
              {t(`sections.${section}.content`)}
              {section === "contact" && (
                <>
                  {" "}
                  <a href="mailto:contact@parallax.kr">contact@parallax.kr</a>.
                </>
              )}
            </p>
          </div>
        ))}
      </article>
    </div>
  );
}
