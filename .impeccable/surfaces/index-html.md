---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["books/advanced-pam-course.html","offline.html"]
---

# Surface brief: home, course page, offline page

## Scope and mode

- `index.html`: Persuade. Primary visitor is a prospective consulting client; secondary are engineers arriving from a
  repository and prospective course readers.
- `books/advanced-pam-course.html`: Persuade, with long-form reading sections. Visitor is a Linux admin deciding whether
  to join the waitlist.
- `offline.html`: service worker fallback, same world, no external assets beyond what the worker caches.

## Audience, job, action

- Client: judge competence in under a minute, then book a call (Calendly).
- Engineer: find the repository and open it on GitHub.
- Reader: understand what the course covers, then join the waitlist (Tally).

## Proof and content

Real repositories, the course outline and facts, certifications, consulting scope. No testimonials, client names or
counts exist; none may be invented. Every state shown on a board must be true on the day it is published.

## Constraints

Static HTML, CSS and vanilla ES modules; existing build and CI gates; self-hosted fonts only; reduced motion respected;
dark and light themes, following the system with a manual switch.

## History

The first direction built for this brief, a drenched three-colour cabling diagram, was rejected by the owner as too
colourful. Its files are kept under `.impeccable/variants/drenched/`. This contract replaces it.

## Direction contract

THESIS: The site is the status board of HomelabForge. The three things on offer are listed as services with their true
state, and that board is the proof, the navigation and the first thing a client reads. It refuses the hero with
icon cards and the wall of skill badges.

OWN-WORLD: Two themes of equal standing; the page follows the system and remembers a manual choice. Dark: ground
`#0e1113`, panel `#15191c`, ink `#eef1ee`, muted `#a3ada8`, hairline `#262c30`. Light: ground `#f2f3ef`, panel
`#fbfbf9`, ink `#12171a`, muted `#4c5651`, hairline `#d4d8cf`. Colour appears only as state: operational green, planned
amber, neutral for not public. The one exception is the forge: ember orange (`#ff8f2e` dark, `#d9660b` light) on the
"hf" mark and on the sparks and signals of the circuit traces, and nowhere else. State labels are a closed set:
Available, Public, Open, Coming soon, Private, Offline. One-pixel hairlines, one bordered board per page, pill
states, 8px buttons. One inverted surface is allowed: the waitlist dock that holds the embedded form stays dark in both
themes, because the form ships light text. Red Hat Display for headings, Red Hat Text for reading, Red Hat Mono for
labels, states and literal identifiers.

STORY: The visitor understands that Miguel builds Linux infrastructure and publishes the tooling; believes it from
live repositories, a course outline and certifications; and books a call.

FIRST VIEWPORT: A top bar with the orange "hf" mark and wordmark, section links, the theme switch and a small call
button. Left: a headline up to 5.5rem on two lines, one paragraph, "Schedule a call" as the primary button and "Browse
the projects" beside it. Right: the services board with three rows, each a link: Consulting, Available, with local time
in Dublin, to its section; Open source, Public, with the last push to GitHub, to its section; Advanced PAM course,
Coming soon, to the course page. Credentials, each with its validity or the year and "not renewed": from 1400px a
labelled list at the foot of the left column, level with the foot of the board; on narrower screens the same list
beneath the board.

SIGNATURE: The forge feeds the board: from 1000px hairline circuit traces drop from under the bar into the head of the
services board, ember signals travel down them and sparks glow at their nodes. The board checks in. On load each
indicator fills and its state arrives in turn; the Consulting indicator keeps a slow pulse; Dublin time and the last
push are live data. Switching theme is a circular reveal from the switch. Opening the course page morphs the course name
into that page's headline. Rows settle as they scroll into view. All motion is off under reduced motion.

FORM: Service status page, chosen by the owner from the safer-register lineup after re-roll 1, seed key 26147166.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md,
and every shipping raster carrying its provenance

## Unresolved

- Course dates in the copy are in the past ("Early access Q1 2026", "Expected release: September 2026"); kept verbatim
  pending the owner's decision.
- `malpanez/config_files` and `malpanez/security` are not public repositories.
- The course page Open Graph image still points at the placeholder `assets/books/pam-course/cover-en.jpg`.
