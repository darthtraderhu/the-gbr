# Cégbemutató videó (Remotion)

A főoldal 02 / Videó szekciójának forrása. Külön csomag, nem része a Next.js buildnek.

- Kompozíció: `src/Cegbemutato.tsx` (2240×960, 21:9, 30 fps, 64 mp, hang nélkül)
- A szövegek a főoldal meglévő szövegeiből jönnek. Ha a videó szövege változik, az `app/(hu)/page.tsx` `INTRO_VIDEO.transcript` leirata is frissítendő.

```bash
cd video
npm install
npm run studio   # szerkesztés böngészőben
npm run render   # out/cegbemutato.mp4
npm run poster   # out/cegbemutato-poster.jpg (60. képkocka, ott már teljesen látszik a logó)
```

Élesítés: a kész fájlokat faststart-tal kell a `public/video/` mappába tenni, hogy a lejátszás a teljes letöltés előtt elinduljon:

```bash
ffmpeg -i out/cegbemutato.mp4 -c copy -movflags +faststart ../public/video/cegbemutato.mp4
cp out/cegbemutato-poster.jpg ../public/video/
```

Licenc: a Remotion legfeljebb 3 fős cégnek ingyenes, nagyobb csapatnál céges licenc kell (remotion.dev/license).
