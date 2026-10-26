# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (confirmed 2026-10-05): prospective consulting clients — engineering leads and technical decision-makers
evaluating whether to hire Miguel Alpañez for DevOps and Linux infrastructure work. They arrive from a referral,
LinkedIn, or a repository, and need to judge competence quickly.

Secondary (confirmed as "a bit of everything"):

- Engineers, sysadmins and homelab owners who use the open source tools and arrive from a repository.
- Prospective readers of the Advanced PAM Course for Linux.
- Recruiters and peers reading the site as a professional profile.

## Product Purpose

homelabforge.dev is the public home of HomelabForge, the name under which Miguel Alpañez publishes open source
infrastructure tooling, a forthcoming Linux PAM course, and offers consulting.

Success, in order: a prospective client books a call; an engineer opens a repository; a reader joins the course
waitlist.

## Positioning

Inferred from existing site copy, not separately confirmed: a practising infrastructure consultant who publishes the
tools he runs in production, with unusual depth in Linux authentication (PAM, U2F/FIDO2, SSSD) and teaching material
written for neurodivergent learners.

## Operating Context

- Static site: hand-written HTML, CSS and vanilla ES modules, built by `scripts/build.js` (minification,
  content hashing, image re-encoding) into `dist/`.
- Deployed to GitHub Pages by GitHub Actions on push to `main`; custom domain `homelabforge.dev`.
- Offline support through a service worker (`sw.js`) and `offline.html`.
- Third parties: Tally (waitlist form), Calendly (call booking), `shields.io` (repository badges).

## Capabilities and Constraints

- Pages: home (`index.html`), course page (`books/advanced-pam-course.html`), offline fallback (`offline.html`).
- CI gates that the site must keep passing: html-validate, stylelint, eslint, Lighthouse (performance >= 0.85,
  accessibility >= 0.93, best practices >= 0.90, SEO >= 0.95), spellcheck. Lighthouse is the only accessibility gate
  since the standalone axe job was removed, so its step must stay blocking (no `continue-on-error`).
- Node: `.node-version` is 24 (maintenance LTS, end of life 2028-04-30). Local and CI must match.
- No framework and no runtime dependencies; the build has no bundler beyond the concatenation in
  `scripts/build.js`. The owner asked about Astro and plain static files were kept.
- Public repository: no secrets.
- Course dates (resolved 2026-10-08): the copy says "First edition, 2026" and that no release day has been
  announced. If the book does not ship in 2026, that line becomes false on 2027-01-01.

## Brand Commitments

- The name **HomelabForge** and the domain `homelabforge.dev` are binding.
- Standing preference (owner, 2026-10-05): professional and restrained, never strident. Colour is used sparingly and
  for meaning, not as decoration. A drenched multi-colour direction was built and rejected on these grounds.
- Dark mode is the owner's preferred theme. The site ships dark and light themes with a visible day/night switch and
  follows the system setting by default.
- The forge (owner, 2026-10-05): after seeing the status board the owner asked for the forge of the previous hero
  back and chose it from a rendered study. It returns as drawn elements only: an orange "hf" mark and hairline
  circuit traces with ember sparks feeding the home board. Orange is the brand colour and appears nowhere else.
- Not to return: the previous hero raster (low resolution, baked-in text, a misspelled domain, a generator watermark).

## Evidence on Hand

- Open source repositories: `ansible-devcontainer-vscode`, `terraform-cloudflare-github-pages`, `config_files`,
  `tempus`, and the `security` Ansible collection, all under `github.com/malpanez`.
- Credentials named on the site, from certificates the owner showed on 2026-10-05:
  - AWS Certified Solutions Architect, Associate: issued 2021-02-06, valid to 2027-02-03.
  - Red Hat Accredited Professional (Partner Training Portal), Delivery Specialist: Automation II (2023-09-16) and
    Red Hat Enterprise Linux (2023-08-13). These are partner accreditations, not RHCE, valid two years, so both
    have lapsed. Earlier Delivery Specialist accreditations from 2021 exist and are not listed.
  - HashiCorp Certified Terraform Associate (002): issued May 2021, expired January 2024 (owner's credential list).
  - Microsoft Certified Azure Fundamentals: issued March 2021, no expiry (owner's credential list).
- Rule agreed with the owner: a lapsed credential is shown as lapsed, never dropped and never passed off as current.
- Not listed on the site: course completion certificates (`O'Reilly`, Udemy, GitKraken, Cognitive Class, A Cloud Guru,
  LinkedIn, Coursera, an IBM badge) and an English level certificate. They are training records, not credentials.
  Several are exam preparation courses named after a vendor exam (EX294, EX447, Terraform Associate); completing
  the course is not holding that certification, and the site must never word it as if it were.
- Planned by the owner and not listed until earned: AWS recertification before February 2027, CKA and CKAD.
- Book source, audited on 2026-10-05 in the owner's private `pam-linux-book` repository (partly superseded: on
  2026-10-26 the source has 9 lab files per language, which is what the site states; page counts below are stale):
  - Written: 11 chapters in three languages, structurally in sync, no unfinished text. The English main file adds
    5 lab files and 3 case studies. Built PDFs are from 2026-05-10 (English 386 pages, Spanish 378, Brazilian
    Portuguese 382); a redesigned layout builds to about 311 pages.
  - Not sellable yet: long code listings and the labs are cut off at the page foot, the labs and diagrams are in
    Spanish in every edition, the English and Portuguese builds carry a draft watermark, the covers lack bleed and
    their logo files, and no launch checklist item is done.
  - Numbers the site may state: 11 chapters, 300+ pages, 5 labs, 3 languages. "202 pages" was the January 2025
    release and "15+ labs" has no support in the source; both were removed from the site.
  - A cheatsheet PDF exists but carries an old domain and needs a rebuild; the sample chapter has no PDF. The
    cover shows vendor logos whose permission the book's own notes list as pending.
- The `security` Ansible collection is private by the owner's decision (2026-10-05) and is labelled "Private" on
  both pages.
- Course facts on the site (2026-10-08): a printed book, eleven chapters, nine labs, three case studies, three
  languages, self-published through Kindle Direct Publishing. No page count and no cover image are shown;
  `assets/books/pam-course/cover-en.jpg` is not used by any page but is still deployed.
- Consulting scope named on the site: DevOps automation, Infrastructure as Code, CI/CD pipelines, team training;
  Ireland and remote worldwide.
- Blog at `blog.homelabforge.dev`.
- Absent, never to be fabricated: client names, testimonials, case studies, benchmarks, pricing, download or user
  counts.

## Product Principles

1. Show the work. The proof is real repositories, real configuration and real chapters, not adjectives.
2. One clear next step per visitor: a call, a repository, or the waitlist.
3. Say what is true today. Unreleased things are labelled as unreleased.
4. Stay light. A site about infrastructure discipline must itself be fast, accessible and dependency-free.

## Accessibility & Inclusion

The course is written for neurodivergent learners (ADHD/ASD) and `tempus` targets the same audience; low cognitive
load, predictable structure and reduced-motion support are product requirements, not polish. CI enforces a Lighthouse
accessibility score of at least 0.93.
