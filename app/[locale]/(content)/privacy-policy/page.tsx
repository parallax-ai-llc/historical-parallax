import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: `${t("title")} - Historical Parallax`,
    description: t("title"),
  };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="container py-12">
      <article className="prose mx-auto max-w-3xl dark:prose-invert">
        <h1 className="font-serif">{t("title")}</h1>
        <p className="lead">{t("lastUpdated")}</p>

        <h2>{t("sections.intro.title")}</h2>
        <p>{t("sections.intro.content")}</p>

        <h2>{t("sections.collection.title")}</h2>
        <p>{t("sections.collection.content")}</p>
        <p>{t("sections.collection.analytics")}</p>
        <ul>
          {(t.raw("sections.collection.items") as string[]).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2>{t("sections.cookies.title")}</h2>
        <p>{t("sections.cookies.content")}</p>
        <ul>
          {(t.raw("sections.cookies.items") as string[]).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>{t("sections.cookies.control")}</p>

        <h2>{t("sections.thirdParty.title")}</h2>
        <p>{t("sections.thirdParty.content")}</p>
        <ul>
          {(t.raw("sections.thirdParty.items") as string[]).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2>{t("sections.security.title")}</h2>
        <p>{t("sections.security.content")}</p>

        <h2>{t("sections.children.title")}</h2>
        <p>{t("sections.children.content")}</p>

        <h2>{t("sections.changes.title")}</h2>
        <p>{t("sections.changes.content")}</p>

        <h2>{t("sections.contact.title")}</h2>
        <p>
          {t("sections.contact.content")}{" "}
          <a href="mailto:contact@parallax.kr">contact@parallax.kr</a>.
        </p>
      </article>
    </div>
  );
}
