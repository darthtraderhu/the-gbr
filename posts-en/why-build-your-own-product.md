---
title: "Why does an agency build its own product?"
date: "2026-09-17"
category: "Engineering"
excerpt: "We built a financial ledger — for ourselves. Then it turned out business owners needed the same thing: not bookkeeping, but visibility."
huSlug: "miert-epit-sajat-termeket"
---

An agency usually builds software for other companies. Delivers it, invoices it, moves on. If something breaks six months later, an email arrives and it gets fixed.

**We started building for ourselves too** — and it taught us more than twenty client projects.

## How it started

I trade. And like most traders, I kept my log in a spreadsheet.

After a while I noticed **I didn't trust it.** Not because I was lying to myself — because in a spreadsheet, everything can be rewritten. A bad day looked a little better in hindsight. A botched trade got left out. Six months later the summary looked great, but I had no idea how true it was.

**That's not a character flaw, it's a structural problem.** If a log allows rewriting, memory will use it.

I started building what I'd actually use myself. That became **Gimbal**.

## The principle that decided everything

Gimbal isn't a spreadsheet — it's **built on accounting logic.**

Once you've recorded an entry, it stays. You can correct it — but the correction is **a new line, not an overwrite.** Exactly like real bookkeeping: you don't erase a botched voucher, you post a reversing entry against it.

It's less convenient. And that's exactly why it works: six months later, the data reflects what happened, not what you'd like to remember.

**The important part of the implementation:** a database trigger blocks modification of ledger rows. Not a setting, not a rule in the application code — **it simply cannot be done at the database level.** So it can't be broken even if someone later writes faulty code on top of it.

That's the kind of decision that never gets made on a template-based project.

## What we learned along the way

### Money isn't a decimal fraction

In a financial application, the quietest bug is rounding. Work with floating-point numbers and sooner or later a fraction of a cent appears — or disappears. Invisible on a single transaction; on fifteen hundred of them, the totals stop adding up.

**We calculate in whole units**, and more than a hundred automated tests watch to make sure the maths stays correct.

That level of care rarely fits into a client project — or rarely gets asked for. **On your own product there's no excuse**, and from then on you know how it's done.

### The legal side isn't an afterthought

Collecting financial data — even from a handful of people — is a completely different category from a contact form.

With Gimbal we had to be specifically careful that **the application never slides into investment advice.** The analysis feature surfaces patterns in your own data — but that's easy to misread as a recommendation, and advice is a licensed activity in Hungary.

**The fix wasn't a disclaimer buried on a legal page** — it's a line sitting directly next to the relevant screen: this is observation, not advice.

We've carried that mindset into every client project since — and more than once we've found a claim on a client's website that was better removed before anyone asked about it.

### Operating is different from building

As long as you're only delivering, a project ends. If you also operate it, it never does.

**That's the most important thing our own product taught us.** When it's your system live in production, and there's nobody else to point to, you think differently about error handling, logging, backups, and what happens when something falls over at two in the morning.

## And it turned out it wasn't just for traders

Along the way I showed it to a few business owners. The reaction was the same every time: *"that's exactly what I'm missing too, just not for trading."*

Because it's the same problem. A business owner tracks their numbers in a spreadsheet too — if they track them at all. Money comes and goes, the accountant tells them in April that March had a problem, and **meanwhile nobody can say where the company actually stands today.**

**It's not the bookkeeping that's missing. That exists.** It's the visibility: how much came in this month, how much goes out next week, who owes what and since when — and the one question most owners can't answer:

> **How long can I last if not a single forint comes in from tomorrow?**

Gimbal calculates that. Not from a guess — from your own recorded data.

**That's why it ended up with two modes:** the same system, the same rigour, just different data. For a business owner: income, expenses, receivables, runway. For a trader: daily result, payouts, patterns.

**The same principle runs through both:** what you recorded stays recorded. No retroactive polishing, no "I'll fix it later." That's what makes it usable six months on.

## Why we're telling you this

Not to sell Gimbal — it's in closed beta, and it isn't our main business.

**But because this is the difference.**

An agency's portfolio shows what got built. It doesn't show what happened to it six months later — and that's exactly where you find out whether the work was actually good.

We have an answer for that too: **we operate our own products ourselves.** Every decision we recommend to a client, we try on ourselves first. If something doesn't work, we find out on our own system first — not the client's.

**That's the most expensive quality assurance an agency can run.** It's also the most honest.

---

Gimbal is currently in **closed beta**, and we're looking for business owners to try it.

The beta is free, and if you join now, it stays free for you. In exchange we ask one thing: tell us honestly what's wrong with it.

[Get in touch](/en/contact) and we'll send access. Or see [what we build and operate for others](/en/services#ops).
