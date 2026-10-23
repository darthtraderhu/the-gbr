# Cégbemutató videó (Remotion)

A magyar és az angol főoldal 02 / Videó szekciójának forrása. Külön csomag, nem része a Next.js buildnek.

- Kompozíciók: `Cegbemutato` (magyar) és `IntroEn` (angol), közös felépítés: `src/Cegbemutato.tsx` (2240×960, 21:9, 30 fps, 64 mp, hang nélkül)
- Szövegek: `src/copy.ts`, az adott nyelvű főoldal meglévő szövegeiből. Ha változnak, a leiratot is frissíteni kell: HU `app/(hu)/page.tsx` `INTRO_VIDEO.transcript`, EN `messages/en.json` `Home.videoTranscript`.

```bash
cd video
npm install
npm run studio   # szerkesztés böngészőben
npm run render   # out/cegbemutato.mp4, out/intro-en.mp4
npm run poster   # előnézeti képek (60. képkocka, ott már teljesen látszik a logó)
```

Élesítés: a kész fájlokat faststart-tal kell a `public/video/` mappába tenni, hogy a lejátszás a teljes letöltés előtt elinduljon:

```bash
for n in cegbemutato intro-en; do
  ffmpeg -i out/$n.mp4 -c copy -movflags +faststart ../public/video/$n.mp4
  cp out/$n-poster.jpg ../public/video/
done
```

Licenc: a Remotion legfeljebb 3 fős cégnek ingyenes, nagyobb csapatnál céges licenc kell (remotion.dev/license).
