import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';

const postsDirectory = path.join(process.cwd(), 'posts');

// A frontmatter-mezők futásidejű ellenőrzése: hiányos/hibás .md fájl esetén
// a build egyértelmű hibaüzenettel áll le, nem csendben renderel undefined-et.
const postFrontmatterSchema = z.object({
  date: z.string(),
  title: z.string(),
  // Néhány meglévő posztból hiányzik — nem szabad emiatt elbukni a buildet.
  excerpt: z.string().optional().default(""),
  // Opcionális: a UI a hiányzó kategóriát "Hírek"-re esik vissza (ld. app/page.tsx, hirek/page.tsx).
  category: z.string().optional(),
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
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

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

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // A konkrét cikkhez is kiszámoljuk, ha ott is ki akarnád írni
  const computedReadTime = calculateReadTime(matterResult.content);
  const frontmatter = postFrontmatterSchema.parse(matterResult.data);

  return {
    id,
    contentHtml,
    readTime: computedReadTime, // <--- És itt is átadjuk
    ...frontmatter,
  };
}