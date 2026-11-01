---
title: "Turn off JavaScript and see what's left: that's what AI sees of your website"
date: "2027-03-26"
category: "SEO and AEO"
excerpt: "AI assistants don't look at your website the way your buyers do. They don't see the design, text inside images, and often not what the browser loads afterwards. In five minutes you can check what actually reaches them."
huSlug: "kapcsold-ki-a-javascriptet"
---

When a buyer opens your website, they see images, colours, moving parts, a well-built page. **When an AI assistant looks at the same page, it misses most of that.** It gets a text version, and works from that.

What survives in that text version decides what it can say about you when someone asks.

## What AI sees of your website

AI assistants have their own crawlers that download pages. They typically read:

- **the text** that's in the page's source code: headings, paragraphs, lists, tables;
- **the title and description** you see in search results;
- **structured data**, the company details written for machines: name, address, phone, services, frequently asked questions;
- **the links**, which show what pages you have and how they connect;
- **image descriptions**, if there are any.

## What it doesn't see

What's left out won't get quoted, even if your buyers think it's the most important part.

- **Text inside images.** If the offer, the opening hours or your list of services is baked into an image, the crawler learns that there is an image.
- **The design.** Whether the company feels premium, reliable or modern, the crawler doesn't read from colours but from what you wrote.
- **What the browser loads afterwards.** Many sites first send an almost empty shell, and JavaScript fills in the content in the browser. Most AI crawlers don't run JavaScript, so they get the empty shell.
- **Anything behind a login**, such as partner prices or downloadable material.
- **Whatever robots.txt blocks.** This file tells crawlers what they may look at. Sometimes an old setting or a security plugin locks out AI crawlers too, and nobody knows.

## The five-minute test

You don't need to be a developer to see what reaches the AI.

1. **Look at the source.** Open your homepage and press Ctrl+U (Cmd+Option+U on a Mac). That's what the crawler downloads. Use Ctrl+F to search for a sentence from your homepage, your phone number and the name of one service. If it isn't there, the crawler can't see it.
2. **Turn off JavaScript.** In Chrome settings (Privacy and security → Site settings → JavaScript) you can block it for your own site and reload. What stays is what the crawler sees. If the page is empty or only the menu is left, AI assistants very likely know almost nothing about you.
3. **Try selecting the text.** If you can't select an important sentence with the mouse, it's an image, not text.
4. **Open robots.txt.** Type `yourdomain.com/robots.txt` into the browser. If "Disallow: /" sits next to GPTBot, OAI-SearchBot, ClaudeBot or PerplexityBot, that crawler can't look at the site.
5. **Ask the AI.** Type into ChatGPT or Gemini: "What does [your company] do?" If the answer is wrong or out of date, look at what you found in the first four steps.

## What this means in practice

Passing the test doesn't mean AI assistants will recommend you. It means **they have something to build a good answer from.** If it fails, no amount of work on the content will reach them.

The fix is often small. Text in an image becomes text. A line comes out of robots.txt. Two sentences go on the homepage about what you do and for whom. But where the whole site is assembled in the browser, the fix lies in how the site is built, not in a setting.

## How we do it

The sites we build are assembled on the server. The text is already in the version the crawler downloads; the browser doesn't add it afterwards. In robots.txt we let AI assistants' crawlers in by name, and company details are on the site in machine-readable form too.

If you'd like your current site reviewed, it's part of [our audit](/en/services/audit-and-proposal). If you also want to know what AI assistants say about you today, we measure that in an [AEO audit](/en/seo).

---

Run the five steps above, and if you get stuck on one, [tell us which](/en/contact). We'll tell you the next step.
