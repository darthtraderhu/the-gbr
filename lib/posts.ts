import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { z } from "zod";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "posts");

// Cikk-ütemezés: a frontmatter `date` mezője jövőbeli is lehet — ilyenkor a
// cikk a megadott napig nem jelenik meg sehol (lista, kapcsolódó cikkek,
// sitemap), a közvetlen URL pedig 404-et ad, hogy ne legyen kiszivárogtatható.
// Fejlesztéskor (NODE_ENV === "development") minden cikk látszik, hogy
// helyben át lehessen nézni ütemezés előtt is.
//
// Az összehasonlítás magyar naptári nap szerint történik, nem UTC-ben — a
// `date` mindig "ÉÉÉÉ-HH-NN" formátumú (ld. postFrontmatterSchema), ezért
// elég a mai budapesti naptári napot ugyanilyen "ÉÉÉÉ-HH-NN" string
// alakban előállítani, és lexikografikusan összevetni. Ez a hajnali
// órákban sem csúszik el, mert sosem UTC-óraszámítás történik.
function getTodayBudapest(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Budapest" }).format(new Date());
}

function isPublished(date: string): boolean {
  if (process.env.NODE_ENV === "development") return true;
  return date <= getTodayBudapest();
}

// A frontmatter-mezők futásidejű ellenőrzése: hiányos/hibás .md fájl esetén
// a build egyértelmű hibaüzenettel áll le, nem csendben renderel undefined-et.
const postFrontmatterSchema = z.object({
  date: z.string(),
  title: z.string(),
  // Néhány meglévő posztból hiányzik — nem szabad emiatt elbukni a buildet.
  excerpt: z.string().optional().default(""),
  // Opcionális: a UI a hiányzó kategóriát "Hírek"-re esik vissza (ld. app/page.tsx, hirek/page.tsx).
  category: z.string().optional(),
  // Opcionális: ha egy cikket frissítünk, ide kerül a frissítés dátuma — ez adja
  // a BlogPosting JSON-LD dateModified mezőjét. Hiányában a dátum a publikálással egyezik.
  updated: z.string().optional(),
});

// -------------------------------------------------------------
// SEGÉDFUNKCIÓ: Olvasási idő kiszámítása (kb. 200 szó / perc)
// -------------------------------------------------------------
function calculateReadTime(content: string): string {
  // Eltávolítjuk a felesleges szóközöket és megszámoljuk a szavakat
  const words = content.trim().split(/\s+/).length;
  // Kiszámoljuk az időt, és felfelé kerekítjük (hogy sose legyen 0 perc)
  const time = Math.ceil(words / 200);
  return `${time} perc`;
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Fejléc és Tartalom szétválasztása
    const matterResult = matter(fileContents);

    // Itt hívjuk meg az okos számolót a nyers szövegre (content)
    const computedReadTime = calculateReadTime(matterResult.content);
    const frontmatter = postFrontmatterSchema.parse(matterResult.data);

    return {
      id,
      readTime: computedReadTime, // <--- BUMM! Itt adjuk át az automatikus adatot
      ...frontmatter,
    };
  });

  const publishedPosts = allPostsData.filter((post) => isPublished(post.date));

  return publishedPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // A konkrét cikkhez is kiszámoljuk, ha ott is ki akarnád írni
  const computedReadTime = calculateReadTime(matterResult.content);
  const frontmatter = postFrontmatterSchema.parse(matterResult.data);

  // Ütemezett, még jövőbeli cikk közvetlen URL-je is 404-et ad — enélkül a
  // /hirek/[a-cikk-slugja] URL kitalálásával a dátum előtt is elolvasható
  // lenne a tartalom.
  if (!isPublished(frontmatter.date)) {
    notFound();
  }

  return {
    id,
    contentHtml,
    readTime: computedReadTime, // <--- És itt is átadjuk
    ...frontmatter,
  };
}
