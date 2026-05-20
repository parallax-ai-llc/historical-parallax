"use client";

import * as React from "react";
import {
  DEFAULT_LOCALE,
  Locale,
  RTL_LOCALES,
  detectBrowserLocale,
  translate,
} from "@/lib/i18n";

const STORAGE_KEY = "hp-locale";

interface I18nContextValue {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>(DEFAULT_LOCALE);

  React.useEffect(() => {
    let next: Locale;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      next = stored ?? detectBrowserLocale();
    } catch {
      next = detectBrowserLocale();
    }
    setLocale(next);
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  }, [locale]);

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key, params) => translate(locale, key, params),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      t: (key, params) => translate(DEFAULT_LOCALE, key, params),
    };
  }
  return ctx;
}
