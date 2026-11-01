---
title: "Where does an enquiry actually go? How we connected our own systems"
date: "2027-03-12"
category: "Operations"
excerpt: "At most companies the website form sends an email to an inbox, and that's where the process ends. Here's what happens to an enquiry on our side, and why the same pattern connects a webshop to an invoicing tool or a form to a CRM."
huSlug: "hova-fut-be-a-megkereses"
---

Ask your team what happens to an enquiry someone submits on the website. The answer is usually: "it arrives by email".

And then? Who sees it? Who owns it? What if the person whose inbox it lands in is on holiday? How do you know at the end of the month how many enquiries came in, and which turned into a quote?

**At most companies there's no answer, because the process ends in the inbox.** Not because anyone is careless. Because between the form and sales there's no connection, only an email.

## What's missing isn't software, it's the connection

When a company says "we need to sort out sales", it usually means a new tool. But most already have everything: a website, email, a spreadsheet, an invoicing tool, sometimes a CRM. **What's missing is the connection between them.** Data only moves from one place to another when someone copies it.

So we started at home. Before recommending that anyone connect their systems, we had to treat our own enquiries the same way.

## What happens to an enquiry on our side

When someone fills in our contact form, four things happen at once:

1. **The enquiry lands in our sales system's inbox.** Not a mailbox, but one place where, after signing in, the owner sees who wrote, from which company, about what, in what budget range, and from which form.
2. **We get an email notification**, so nobody has to watch the system all day.
3. **The sender gets a confirmation**, so they know it arrived and when to expect a reply.
4. **Every step is logged.** If one doesn't run, it shows up instead of failing silently.

The link between the website and the sales system is protected: only our website can send to it, using a secret key that never reaches the browser.

## The check matters more than the connection

Connecting two systems isn't a big job any more. **The expensive mistake is when the connection quietly stops and nobody notices for weeks.**

So our website doesn't settle for "no error came back". It waits for the sales system to confirm the enquiry was stored and returns its ID. If that confirmation doesn't arrive, the log flags it and the enquiry can be added by hand. Nothing gets lost.

We apply the same rule to every integration: **we don't check whether there was an error, we check whether what should have happened actually happened.**

## Same pattern, different systems

What we did with our own enquiries is the same pattern as connecting:

- **a webshop and an invoicing tool**: the invoice is created from the order, not copied by hand;
- **a form and a CRM**: the enquiry reaches its owner with its source attached;
- **a webshop and a warehouse or ERP system**: stock and partner prices come from one place;
- **anything and a spreadsheet**: where you keep it by hand today, it gets there on its own.

Each time it's the same three questions: where does the data come from, where does it need to go, and **who finds out when it doesn't get there.**

## When it isn't worth it

If two or three enquiries arrive a month and one person handles them all, a well-run inbox may be enough. Connecting systems pays off when several people work on the same enquiries, or when someone copies data from one place to another every day. We'll tell you which one you are.

## How we work

[Automation](/en/services/automation) starts with a written assessment of what's done by hand today, what's worth connecting, and what isn't. We connect what you already have, wherever there's an official integration point. Every run is logged, and failures raise an alert. If you're rebuilding your website too, [we build the form](/en/services/web-development) this way from the start.

---

Tell us which task someone on your team copies by hand from one place to another every day. [You can do it here](/en/contact). We'll tell you whether it's worth connecting.
