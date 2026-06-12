import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

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

    return {
      id,
      readTime: computedReadTime, // <--- BUMM! Itt adjuk át az automatikus adatot
      ...(matterResult.data as { date: string; title: string; excerpt: string; category: string }),
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

  return {
    id,
    contentHtml,
    readTime: computedReadTime, // <--- És itt is átadjuk
    ...(matterResult.data as { date: string; title: string; excerpt: string; category: string }),
  };
}