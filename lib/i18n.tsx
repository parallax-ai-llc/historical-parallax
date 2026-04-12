"use client";

import * as React from "react";

const STORAGE_KEY = "preferred-locale";

type Locale = "en" | "ko" | "zh" | "es" | "fr" | "de" | "ja" | "pt" | "ar" | "hi";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    tagline: "Every history creates a parallax",
    searchPlaceholder: "Search articles...",
    docsCount: "{count} documents archived",
    contribute: "Contribute",
    search: "Search...",
    poweredBy: "Powered by",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    translationsComingSoon: "Translations coming soon",
    editOnGithub: "Edit this page on GitHub",
    recentArticles: "Recent Articles",
  },
  ko: {
    tagline: "모든 역사는 시차를 만든다",
    searchPlaceholder: "기사 검색...",
    docsCount: "{count}개 문서 보관",
    contribute: "기여하기",
    search: "검색...",
    poweredBy: "제공",
    termsOfService: "이용약관",
    privacyPolicy: "개인정보처리방침",
    translationsComingSoon: "번역이 곧 제공됩니다",
    editOnGithub: "GitHub에서 이 페이지 편집",
    recentArticles: "최근 기사",
  },
  zh: {
    tagline: "每段历史都产生视差",
    searchPlaceholder: "搜索文章...",
    docsCount: "已归档 {count} 篇文档",
    contribute: "贡献",
    search: "搜索...",
    poweredBy: "技术支持",
    termsOfService: "服务条款",
    privacyPolicy: "隐私政策",
    translationsComingSoon: "翻译即将推出",
    editOnGithub: "在GitHub上编辑此页",
    recentArticles: "最新文章",
  },
  es: {
    tagline: "Cada historia crea un paralaje",
    searchPlaceholder: "Buscar artículos...",
    docsCount: "{count} documentos archivados",
    contribute: "Contribuir",
    search: "Buscar...",
    poweredBy: "Desarrollado por",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    translationsComingSoon: "Traducciones próximamente",
    editOnGithub: "Editar esta página en GitHub",
    recentArticles: "Artículos recientes",
  },
  fr: {
    tagline: "Chaque histoire crée une parallaxe",
    searchPlaceholder: "Rechercher des articles...",
    docsCount: "{count} documents archivés",
    contribute: "Contribuer",
    search: "Rechercher...",
    poweredBy: "Propulsé par",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    translationsComingSoon: "Traductions à venir",
    editOnGithub: "Modifier cette page sur GitHub",
    recentArticles: "Articles récents",
  },
  de: {
    tagline: "Jede Geschichte erzeugt eine Parallaxe",
    searchPlaceholder: "Artikel durchsuchen...",
    docsCount: "{count} Dokumente archiviert",
    contribute: "Beitragen",
    search: "Suchen...",
    poweredBy: "Bereitgestellt von",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutz",
    translationsComingSoon: "Übersetzungen folgen",
    editOnGithub: "Diese Seite auf GitHub bearbeiten",
    recentArticles: "Neueste Artikel",
  },
  ja: {
    tagline: "すべての歴史が視差を生む",
    searchPlaceholder: "記事を検索...",
    docsCount: "{count}件のドキュメントをアーカイブ",
    contribute: "貢献する",
    search: "検索...",
    poweredBy: "提供",
    termsOfService: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    translationsComingSoon: "翻訳は近日公開予定",
    editOnGithub: "GitHubでこのページを編集",
    recentArticles: "最近の記事",
  },
  pt: {
    tagline: "Cada história cria uma paralaxe",
    searchPlaceholder: "Pesquisar artigos...",
    docsCount: "{count} documentos arquivados",
    contribute: "Contribuir",
    search: "Pesquisar...",
    poweredBy: "Fornecido por",
    termsOfService: "Termos de serviço",
    privacyPolicy: "Política de privacidade",
    translationsComingSoon: "Traduções em breve",
    editOnGithub: "Editar esta página no GitHub",
    recentArticles: "Artigos recentes",
  },
  ar: {
    tagline: "كل تاريخ يخلق منظوراً مختلفاً",
    searchPlaceholder: "البحث في المقالات...",
    docsCount: "{count} وثيقة مؤرشفة",
    contribute: "المساهمة",
    search: "بحث...",
    poweredBy: "مدعوم من",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    translationsComingSoon: "الترجمات قادمة قريباً",
    editOnGithub: "تحرير هذه الصفحة على GitHub",
    recentArticles: "أحدث المقالات",
  },
  hi: {
    tagline: "हर इतिहास एक दृष्टिकोण बनाता है",
    searchPlaceholder: "लेख खोजें...",
    docsCount: "{count} दस्तावेज़ संग्रहित",
    contribute: "योगदान करें",
    search: "खोजें...",
    poweredBy: "द्वारा संचालित",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    translationsComingSoon: "अनुवाद जल्द आ रहे हैं",
    editOnGithub: "GitHub पर इस पृष्ठ को संपादित करें",
    recentArticles: "हाल के लेख",
  },
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = React.createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && translations[stored]) setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      /* ignore */
    }
  }, []);

  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let text = translations[locale]?.[key] || translations.en[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
