import { getRequestConfig } from "next-intl/server";

// Nincs next-intl middleware/routing: a magyar oldalak a gyökéren, prefix
// nélkül futnak (nem next-intl-en keresztül), az angol fa (/en/...) pedig
// mindig explicit locale="en"-nel hívja a getTranslations-t. A requestLocale
// (middleware hiányában) sosem ad értéket — ez a next-intl dokumentált esete,
// amikor egy oldal a [locale] szegmensen kívül renderel.
export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "hu";
  const messages = (await import(`../messages/${resolvedLocale}.json`)).default;

  return {
    locale: resolvedLocale,
    messages,
  };
});
