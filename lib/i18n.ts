import en from "@/messages/en.json";
import zh from "@/messages/zh.json";
import ko from "@/messages/ko.json";
import es from "@/messages/es.json";
import hi from "@/messages/hi.json";
import ar from "@/messages/ar.json";
import vi from "@/messages/vi.json";
import tl from "@/messages/tl.json";

export const SUPPORTED_LOCALES = ["en", "zh", "ko", "es", "hi", "tl", "vi", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: ReadonlyArray<Locale> = ["ar"];

type Messages = Record<string, unknown>;

const MESSAGES: Record<Locale, Messages> = {
  en: en as Messages,
  zh: zh as Messages,
  ko: ko as Messages,
  es: es as Messages,
  hi: hi as Messages,
  ar: ar as Messages,
  vi: vi as Messages,
  tl: tl as Messages,
};

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(value);
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    if (!raw) continue;
    const code = raw.toLowerCase().split("-")[0];
    if (code === "fil") return "tl";
    if (isSupportedLocale(code)) return code;
  }
  return DEFAULT_LOCALE;
}

function lookup(messages: Messages, key: string): string | undefined {
  const parts = key.split(".");
  let cur: unknown = messages;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, name) => {
    const v = params[name];
    return v === undefined ? `{${name}}` : String(v);
  });
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  const value =
    lookup(getMessages(locale), key) ?? lookup(getMessages(DEFAULT_LOCALE), key) ?? key;
  return interpolate(value, params);
}
