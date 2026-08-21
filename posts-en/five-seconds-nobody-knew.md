---
title: "Five seconds — and nobody knew"
date: "2026-09-03"
category: "Operations"
excerpt: "A store's product pages took five seconds to load. For three years. The owner didn't know, because nothing was watching — and a speed test wouldn't have told him why."
huSlug: "pulzus-ot-masodperc"
---

We recently ran a full assessment on a store before starting its rebuild. That means finding out what's underneath: what's fast, what's slow, and why.

The homepage responded in 28 milliseconds. Excellent.
The category page: 64 milliseconds. Also fine.

**The product page: 5,140 milliseconds.**

Five seconds before the server even started responding. Not image loading, not the end of the render — just the server "thinking."

**And nobody had known for three years.**

## Why it doesn't surface on its own

Not because the owner doesn't care. Because **there's nothing that would tell him.**

A website gets built, then it just runs. Nothing in it flags when it slows down. The owner opens it every day — but his own browser serves it from cache, so to him it's fast.

**And the decay is slow.** A plugin updates, someone uploads five large images, a new feature gets bolted on. Each one adds a tenth of a second here, a tenth there. Over six months the load time doubles, and there was never a single day anyone could point to and say, *"it got slow today."*

**By the time it surfaces, traffic has already dropped** — and even then, nobody knows since when, or why.

## What a speed test won't tell you

Here's the part that rarely gets discussed.

This particular fault **would not have shown up in a PageSpeed test.** That tells you it's slow, and gives you a score. It doesn't tell you **why.**

For that you have to go behind the server and watch what actually happens during a page load. Which plugin runs how many database queries. Who's calling an external server, and how long it waits. How much memory it takes to generate a single page.

**In this case, a single product page load triggered 519 database queries.** Somewhere in there was the culprit.

## The best find

A payment plugin's update checker tried, on every single page load, to reach an external address that **no longer existed — sixteen times.** All sixteen requests failed.

That alone was **1.2 seconds.** On every visitor, every page, for nothing.

At some point the developer had moved hosting. The plugin never adjusted: it found nothing, had nothing to cache, so it retried every time.

**Nobody made a direct mistake. There was simply nobody looking.**

## The other four

**A page-builder plugin** scanned the entire content table with an unindexed query on every load. Half a second.

**Two separate plugins** counted the same page views, independently of each other — and both **wrote to the database** on every visit. Not just slow: it also meant the product pages couldn't be cached at all.

**A related-products block** pulled in twenty other products with their full data sets — more than ten thousand rows of data for one small block.

**And the images.** The homepage downloaded 16 megabytes across two hundred requests. A typical business site downloads about a seventh of that. One photo was a half-megabyte PNG — despite an image optimiser being installed. It just never ran.

## The lesson isn't the bug list

Every one of these fixes is a matter of days. That's not the interesting part of the story.

**The interesting part is that nobody looked for three years.**

Not out of negligence. There's simply no routine for it. A website isn't like a car that gets an annual inspection. It gets built, it works, and from then on it's invisible — until something breaks.

**And by the time something breaks, it's already more expensive.** Not just the fix — the lost months too.

## What we built out of this

That's why we started **Pulse.**

We measure the site every month and send a letter about what changed. Not a score — what's worth doing.

Things like:

> Your SSL certificate expires in 24 days. If it isn't renewed, browsers will flag the site as "not secure."
>
> Load time is 2.1 seconds — that's fine.
>
> We tested the contact form; it arrived.

We also watch the Google profile: new reviews, the shifting average, and where the business shows up in local search.

## Why a monitoring tool alone isn't enough

There's no shortage of tools that alert you when a site goes down. They're cheap and useful.

**But none of them can tell you what to do with the alert.**

If a tool says "Largest Contentful Paint is 4.2 seconds," a florist has no idea what to do with that. If we say *"the homepage header image is half a megabyte, and that's slowing down what actually matters — shall we replace it?"*, they can make a decision.

**The difference isn't in the measurement. It's in whether someone understands what's being measured.**

And whether someone **can actually fix it.** If it turns out a plugin is calling a dead address sixteen times, flagging it isn't enough — it needs fixing.

---

If you're curious what's going on with your own site, [get in touch](/en/contact). We'll send the first measurement either way, even if it doesn't turn into a working relationship.

More on the service: [Pulse](/en/services#pulse).
