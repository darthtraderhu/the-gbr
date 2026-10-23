---
title: "Off-the-shelf tool or custom software? How to decide before you automate"
date: "2026-12-18"
category: "AI and automation"
excerpt: "With automation, the hard question is rarely whether it can be done. It's whether it pays off, what to build it with, and who notices when it doesn't run. Four questions worth asking before you decide."
huSlug: "kesz-eszkoz-vagy-sajat-szoftver"
---

Almost every company has someone who copies something from one place to another every day. Webshop orders into the invoicing system. Enquiries from the contact form into a spreadsheet. The spreadsheet into the monthly report.

Sooner or later someone suggests a machine could do it. **And a machine can. The question is what's worth doing.**

These four questions help you decide before anyone starts building.

## 1. Is it worth it at all?

Not every repetitive task is worth automating. Look at three things:

**How often does it happen?** Something that happens ten times a day is a different case from something that happens once a quarter.

**How long does it take, and who does it?** If it's the owner or the most experienced person on the team, it costs more than it first appears.

**What happens when it goes wrong?** A mistyped invoice number, a forgotten confirmation, an enquiry that never reaches the right person. In some places a mistake is an annoyance; in others it loses you a customer.

If the task is rare, quick and a mistake costs little, it can stay manual. **Automation has a price too: it has to be built, and then maintained.**

## 2. Is the process settled?

This is the question asked least often, and it's where most automation fails.

If the process goes slightly differently every time because "it depends", the machine won't know what it depends on. **If you can't write it down on one page as rules, you can't automate it.**

In that case the first step isn't software. It's writing the process down and making it consistent. Sometimes that alone solves half the problem.

## 3. Off-the-shelf tool or custom code?

There are two routes, and both have their place.

**Off-the-shelf automation tools** (such as Make, Zapier or n8n) connect the most widely used systems. They're quick to set up, and often that's all you need.

They're a good choice when:

- you're connecting common systems that have ready-made connectors,
- the steps are simple: when this happens, do that,
- volumes are low.

**Custom code** makes sense when:

- volumes are high and the tool bills per run or per operation, so the cost grows with your traffic,
- the logic is complex, with many branches and exceptions,
- one of the systems has no ready-made connector,
- sensitive data is involved and you don't want yet another provider to receive it.

**Don't just compare the setup cost; look at what it costs to maintain over two or three years.** What's cheaper today isn't necessarily cheaper in the long run.

And there's a third case: when no suitable software exists for the process. Then the job isn't connecting things but building one. An internal register, a client portal, an admin interface that does exactly what your business needs.

## 4. Who notices when it doesn't run?

This is the most important question, and the one most often skipped.

With manual work, when someone's off sick, everyone knows. **An automation can stop silently.** A password expires, the invoicing system changes something, the webshop starts sending a new field. No error message; the task simply doesn't happen.

For weeks. Until a customer complains they never got an invoice.

**An automation that stopped silently is worse than doing it by hand**, because everyone assumes it's running. That's why automation needs these alongside it:

- **A log**: a record of every run, so you can see afterwards what happened.
- **An alert**: when a step fails, a named person is notified.
- **Recovery**: missed items can be re-run from the log instead of being untangled by hand.
- **Documentation**: what does what is written down, so it isn't only understood by whoever built it.

It's also worth settling **whose name the accounts are in** that the automation runs through. If the developer connected the systems with their own account, the process may stop when they leave.

## Where to start

With one process. The one that happens most often and causes the most frustration.

One automation that works, logs and alerts is worth more than five half-finished ones. And once the first one proves itself, the rest can be built on the same foundation.

## How we work

Our [custom software and automation](/en/services#software) service starts with an assessment. We go through what's done by hand today, and **you get a written summary of which processes are worth automating and which aren't.**

Where an off-the-shelf tool is enough, we use it. Where it isn't, we write code. We choose whichever is cheaper to maintain in the long run, and explain why.

Every automation logs its runs and raises an alert on failure. At handover you get documentation, so it isn't only us who understand what does what. If you want, we take on operation and further development too.

---

If there's a task you've long felt isn't a job for a person, [tell us what it is](/en/contact). We'll take a look and write back whether it's worth automating.
