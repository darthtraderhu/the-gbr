import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { z } from "zod";
import { notFound } from "next/navigation";
import { isPublished } from "./publish-schedule";

// Csak a kiválasztott, ügynökségi közönségnek szánt cikkek angol fordítása
// él itt (ld. design/thegbr-english-copy.md — "Recommendation on articles").
// Nem az összes magyar cikk párja, szándékosan: fél lefordított archívum
// rosszabb, mint egy kis, tudatos angol válogatás.
const postsEnDirectory = path.join(process.cwd(), "posts-en");

const postFrontmatterSchema = z.object({
  date: z.string(),
  title: z.string(),
  excerpt: z.string().optional().default(""),
  category: z.string().optional(),
  updated: z.string().optional(),
  // A magyar eredeti cikk slugja — a hreflang-párosításhoz és a
  // "read this in Hungarian" linkhez.
  huSlug: z.string(),
});

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200);
  return `${time} min`;
}

export function getSortedEnPostsData() {
  const fileNames = fs.readdirSync(postsEnDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsEnDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const computedReadTime = calculateReadTime(matterResult.content);
    const frontmatter = postFrontmatterSchema.parse(matterResult.data);

    return { id, readTime: computedReadTime, ...frontmatter };
  });

  const publishedPosts = allPostsData.filter((post) => isPublished(post.date));

  return publishedPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getEnPostData(id: string) {
  const fullPath = path.join(postsEnDirectory, `${id}.md`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch {
    notFound();
  }

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  const computedReadTime = calculateReadTime(matterResult.content);
  const frontmatter = postFrontmatterSchema.parse(matterResult.data);

  if (!isPublished(frontmatter.date)) {
    notFound();
  }

  return { id, contentHtml, readTime: computedReadTime, ...frontmatter };
}
