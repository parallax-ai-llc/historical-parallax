import Script from "next/script";
import { Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { routing, type Locale } from "@/i18n/routing";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: true,
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M5WB8XPRPT" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M5WB8XPRPT');
          `}
        </Script>
      </head>
      <body className={`${cormorant.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a href="#main-content" className="skip-link">
              {locale === "en" ? "Skip to main content" :
               locale === "zh" ? "跳转到主要内容" :
               locale === "hi" ? "मुख्य सामग्री पर जाएं" :
               locale === "es" ? "Ir al contenido principal" :
               locale === "fr" ? "Aller au contenu principal" :
               locale === "ar" ? "انتقل إلى المحتوى الرئيسي" :
               locale === "bn" ? "মূল বিষয়বস্তুতে যান" :
               locale === "pt" ? "Ir para o conteúdo principal" :
               locale === "ru" ? "Перейти к основному содержанию" :
               locale === "ja" ? "メインコンテンツへスキップ" :
               "Skip to main content"}
            </a>
            <div id="main-content" role="main" tabIndex={-1}>
              {children}
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
