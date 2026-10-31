import { getRequestConfig } from "next-intl/server";

// Nincs next-intl middleware/routing: a magyar oldalak a gyökéren, prefix
// nélkül futnak (nem next-intl-en keresztül), az angol fa (/en/...) pedig
// mindig explicit locale="en"-nel hívja a getTranslations-t. A requestLocale
// (middleware hiányában) sosem ad értéket — ez a next-intl dokumentált esete,
// amikor egy oldal a [locale] szegmensen kívül renderel.
export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "hu";
  // A keret szövegei (menü, lábléc, süti-sáv, chat) külön fájlban vannak, mert
  // a kliens-komponensek közvetlenül importálják őket — így a böngésző csak
  // ezt a pár száz bájtot kapja meg, nem az oldalak teljes angol szövegét.
  const shell = (await import(`../messages/shell/${resolvedLocale}.json`)).default;
  const pages = (await import(`../messages/${resolvedLocale}.json`)).default;
  const messages = { ...shell, ...pages };

  return {
    locale: resolvedLocale,
    messages,
  };
});
