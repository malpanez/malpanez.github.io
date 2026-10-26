---

    # Indented four spaces on purpose: the block is still valid YAML, and the CI spellcheck reads it as code.
    # Colour keys are the custom property names. A bare key is the light value; "-dark" is the dark value.
    name: HomelabForge
    description: "A service status board in two neutral themes: hairlines, hue as state, ember for the forge."
    colors:
      bg: "#f2f3ef"
      panel: "#fbfbf9"
      ink: "#12171a"
      mute: "#4c5651"
      line: "#d4d8cf"
      line-strong: "#848d86"
      ok: "#12734a"
      ok-bg: "#e2efe6"
      plan: "#8a5407"
      plan-bg: "#f3e7cf"
      "off": "#4c5651"
      off-bg: "#e4e6e0"
      btn: "#12171a"
      btn-ink: "#fbfbf9"
      dock: "#12171a"
      dock-ink: "#eef1ee"
      dock-line: "#12171a"
      ember: "#d9660b"
      bg-dark: "#0e1113"
      panel-dark: "#15191c"
      ink-dark: "#eef1ee"
      mute-dark: "#a3ada8"
      line-dark: "#262c30"
      line-strong-dark: "#646e76"
      ok-dark: "#4ccb8f"
      ok-bg-dark: "#13291f"
      plan-dark: "#e3ab4f"
      plan-bg-dark: "#2e2412"
      off-dark: "#a3ada8"
      off-bg-dark: "#1e2428"
      btn-dark: "#eef1ee"
      btn-ink-dark: "#0e1113"
      dock-dark: "#15191c"
      dock-line-dark: "#262c30"
      ember-dark: "#ff8f2e"
    typography:
      display:
        fontFamily: "'Red Hat Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "clamp(2.5rem, 1.1rem + 5.4vw, 5.5rem)"
        fontWeight: 800
        lineHeight: 1
        letterSpacing: "-0.038em"
      headline:
        fontFamily: "'Red Hat Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "clamp(2rem, 1.2rem + 3.2vw, 3.75rem)"
        fontWeight: 800
        lineHeight: 1.03
        letterSpacing: "-0.032em"
      band-title:
        fontFamily: "'Red Hat Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "clamp(1.625rem, 1.2rem + 1.8vw, 2.5rem)"
        fontWeight: 800
        lineHeight: 1.08
        letterSpacing: "-0.026em"
      row-title:
        fontFamily: "'Red Hat Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
        fontWeight: 700
        lineHeight: 1.2
        letterSpacing: "-0.016em"
      subhead:
        fontFamily: "'Red Hat Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)"
        fontWeight: 700
        lineHeight: 1.25
        letterSpacing: "-0.012em"
      name:
        fontFamily: "'Red Hat Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "1.1875rem"
        fontWeight: 700
        lineHeight: 1.3
        letterSpacing: "-0.012em"
      lede:
        fontFamily: "'Red Hat Text', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)"
        fontWeight: 400
        lineHeight: 1.5
      body:
        fontFamily: "'Red Hat Text', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "1.0625rem"
        fontWeight: 400
        lineHeight: 1.55
      small:
        fontFamily: "'Red Hat Text', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "0.9375rem"
        fontWeight: 400
      button:
        fontFamily: "'Red Hat Text', system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize: "1.0625rem"
        fontWeight: 650
        lineHeight: 1.2
      label:
        fontFamily: "'Red Hat Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
        fontSize: "0.8125rem"
        fontWeight: 500
        lineHeight: 1.5
        letterSpacing: "0.06em"
      pill:
        fontFamily: "'Red Hat Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
        fontSize: "0.8125rem"
        fontWeight: 600
        lineHeight: 1
      mono:
        fontFamily: "'Red Hat Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
        fontSize: "0.9375rem"
        fontWeight: 500
    rounded:
      xs: "4px"
      sm: "8px"
      md: "10px"
      lg: "12px"
      full: "999px"
    spacing:
      pad: "clamp(20px, 5vw, 72px)"
      bar-h: "72px"
      wrap-max: "1440px"
      section: "clamp(56px, 8vw, 112px)"
      column-gap: "clamp(32px, 5vw, 72px)"
      panel-pad: "20px"
    components:
      button-primary:
        backgroundColor: "{colors.btn}"
        textColor: "{colors.btn-ink}"
        typography: "{typography.button}"
        rounded: "{rounded.sm}"
        padding: "0 22px"
        height: "52px"
      button-primary-hover:
        backgroundColor: "color-mix(in srgb, #12171a 86%, #f2f3ef)"
        textColor: "{colors.btn-ink}"
      button-secondary:
        backgroundColor: "transparent"
        textColor: "{colors.ink}"
        typography: "{typography.button}"
        rounded: "{rounded.sm}"
        padding: "0 22px"
        height: "52px"
      button-secondary-hover:
        backgroundColor: "{colors.panel}"
        textColor: "{colors.ink}"
      button-small:
        backgroundColor: "{colors.btn}"
        textColor: "{colors.btn-ink}"
        rounded: "{rounded.sm}"
        padding: "0 16px"
        height: "44px"
      button-large:
        backgroundColor: "{colors.btn}"
        textColor: "{colors.btn-ink}"
        rounded: "{rounded.sm}"
        padding: "0 28px"
        height: "64px"
      pill-ok:
        backgroundColor: "{colors.ok-bg}"
        textColor: "{colors.ok}"
        typography: "{typography.pill}"
        rounded: "{rounded.full}"
        padding: "0 11px"
        height: "28px"
      pill-plan:
        backgroundColor: "{colors.plan-bg}"
        textColor: "{colors.plan}"
        typography: "{typography.pill}"
        rounded: "{rounded.full}"
        padding: "0 11px"
        height: "28px"
      pill-off:
        backgroundColor: "{colors.off-bg}"
        textColor: "{colors.off}"
        typography: "{typography.pill}"
        rounded: "{rounded.full}"
        padding: "0 11px"
        height: "28px"
      board:
        backgroundColor: "{colors.panel}"
        textColor: "{colors.ink}"
        rounded: "{rounded.lg}"
      service-row:
        backgroundColor: "{colors.panel}"
        textColor: "{colors.ink}"
        typography: "{typography.name}"
        padding: "20px"
      service-row-hover:
        backgroundColor: "color-mix(in srgb, #12171a 5%, #fbfbf9)"
      mark:
        backgroundColor: "{colors.ember}"
        textColor: "#14100b"
        rounded: "7px"
        size: "28px"
      bar:
        backgroundColor: "{colors.bg}"
        textColor: "{colors.ink}"
        height: "72px"
      nav-link:
        backgroundColor: "transparent"
        textColor: "{colors.ink}"
        rounded: "{rounded.sm}"
        padding: "0 14px"
        height: "44px"
      nav-link-hover:
        backgroundColor: "{colors.panel}"
      nav-link-current:
        backgroundColor: "{colors.panel}"
      theme-switch:
        backgroundColor: "transparent"
        textColor: "{colors.ink}"
        rounded: "{rounded.sm}"
        size: "44px"
      theme-switch-hover:
        backgroundColor: "{colors.panel}"
      dock:
        backgroundColor: "{colors.dock}"
        textColor: "{colors.dock-ink}"
        rounded: "{rounded.lg}"
        padding: "24px 20px 12px"
---

# Design System: HomelabForge

## Overview

**Creative North Star: "The Status Board"**
The site reads as the status board of a small infrastructure practice. Every page opens with one bordered board
that lists what is on offer as services. Each row is a link and carries an indicator, a name with an arrow, one
line of description and, on most rows, a state pill. The board is the proof, the in-page navigation and the first
thing a visitor reads.

The system is restrained and neutral. It ships two themes of equal standing, dark and light, with the same
roles. The page follows the system setting and remembers a manual choice made with a visible switch. Grounds are
near-neutral with a slight green cast, structure is drawn in one-pixel hairlines, and nothing casts a shadow. Hue
appears only as state: green for what is live, amber for what is coming, neutral for what is not available. The
one exception is the forge: ember orange, the brand colour, on the mark and on the circuit traces above the home
board, approved by the owner. A drenched multi-colour direction was built first and rejected by the owner as too
colourful; this system replaces it.

Three Red Hat typefaces split the work: one for headings and names, one for reading and controls, one for
labels, states and literal identifiers. Motion is tied to the board: on the home page ember signals travel down
the traces into it, its indicators check in on load, the local time and the last push are live data, and changing
theme is a circular reveal from the switch.

**Key Characteristics:**

- Two themes of equal standing with identical roles; every colour is read through a custom property.
- Hue as state: green, amber or neutral. Everything else is ink, muted ink and hairlines.
- Ember, the brand colour, only on the forge: the mark and the circuit traces.
- State labels from a closed set of six.
- One bordered board per page, with rows as links.
- One-pixel hairlines and rows instead of cards.
- No shadows, no gradients, no blur.
- Three Red Hat typefaces with fixed jobs.
- Gently rounded controls (`8px`), panels (`12px`) and full pills for states.
- Authored animation only when the reader has not asked for reduced motion.

## Colors

Two near-neutral grounds, one ink, one muted ink, two greys for lines, two state colours that each come with a
tint, and one brand colour kept to the forge. The front matter holds the values; this section holds the roles.
Each role is a custom property declared on `:root` for the light theme and overridden for the dark theme, both
under `:root[data-theme="dark"]` and under `prefers-color-scheme: dark` when no theme has been chosen. Values
below are given as light, then dark.

### Primary

- **Ink** (`--ink`: `#12171a`, `#eef1ee`): all text, icons, focus rings and the selection ground. Through
  `--btn` it is also the fill of the primary button, with `--btn-ink` (`#fbfbf9`, `#0e1113`) as its text. The
  primary action colour is ink, not a hue.

### Secondary

- **Forge Ember** (`--ember`: `#d9660b`, `#ff8f2e`): the brand colour. It is the ground of the mark and the
  colour of the signals and sparks on the circuit traces, and it appears nowhere else. The lettering on the mark
  is a fixed dark (`#14100b`) in both themes, written as a literal and not as a role.

### Tertiary

- **Operational Green** (`--ok`: `#12734a`, `#4ccb8f`; tint `--ok-bg`: `#e2efe6`, `#13291f`): live, available,
  public, open. It fills the indicator of a running service and sets the text of a pill on its own tint.
- **Planned Amber** (`--plan`: `#8a5407`, `#e3ab4f`; tint `--plan-bg`: `#f3e7cf`, `#2e2412`): coming soon. It
  draws the ring indicator of something announced but not released, and sets the text of its pill.

### Neutral

- **Ground** (`--bg`: `#f2f3ef`, `#0e1113`): the page, the pinned bar and the browser theme colour.
- **Panel** (`--panel`: `#fbfbf9`, `#15191c`): the board, the skip link, and the hover fill of navigation links,
  the theme switch and the secondary button.
- **Muted Ink** (`--mute`: `#4c5651`, `#a3ada8`): labels, descriptions, subtitles, list markers and the small
  print of the footer.
- **Neutral State** (`--off`, the same values as muted ink; tint `--off-bg`: `#e4e6e0`, `#1e2428`): not
  available. A ring indicator and a grey pill, used for work that is not public and for the offline page.
- **Hairline** (`--line`: `#d4d8cf`, `#262c30`): every rule and panel border.
- **Strong Line** (`--line-strong`: `#848d86`, `#646e76`): the border of the secondary button, the resting
  underline of a text link and the scroll bar.
- **Dock** (`--dock`: `#12171a`, `#15191c`; text `--dock-ink`: `#eef1ee` in both themes; border `--dock-line`:
  `#12171a`, `#262c30`): the one inverted surface. It stays dark in both themes, because the third-party form
  inside it has light text.

Contrast measured from the tokens, light then dark:

- ink on ground `16.20:1`, `16.65:1`; ink on panel `17.42:1`, `15.54:1`
- muted ink on ground `6.83:1`, `8.21:1`; muted ink on panel `7.35:1`, `7.66:1`
- green on its tint `4.95:1`, `7.51:1`; amber on its tint `5.11:1`, `7.41:1`; neutral on its tint `6.05:1`,
  `6.80:1`
- primary button text on its fill `17.42:1`, `16.65:1`, and on its hover fill `11.82:1`, `12.43:1`
- dock text on the dock `15.86:1`, `15.54:1`
- mark lettering on ember `5.28:1`, `8.32:1`
- strong line on ground `3.07:1`, `3.64:1`; strong line on panel `3.30:1`, `3.40:1`

The tonal ramps in `.impeccable/design.json` are synthesised for the design panel only; the build uses each
colour at one value per theme.

**The State Only Rule.** Outside the forge, hue says what state something is in and does nothing else. Green is
live, amber is coming, neutral is not available. No heading, link, button or surface carries a hue.

**The Forge Rule.** Ember is the brand colour and belongs to the forge alone: the ground of the mark, and the
signals and sparks of the circuit traces. It is the one exception to the State Only Rule, approved by the owner.
Ember never sets text, never fills a button, a pill or a surface, and never stands for a state.

**The Closed Set Rule.** A state is named with one of six labels. Green: Available, Public, Open. Amber: Coming
soon. Neutral: Private, Offline.

**The Tint Pair Rule.** A state colour sets text only on its own tint, as a pill. On any other ground it appears
only as a `10px` indicator.

**The Shared Roles Rule.** Components name roles, never literal colours. Both themes define every role, so a
component is written once and the theme switch never touches it. The one literal in the build is the lettering
of the mark, which is the same dark in both themes.

## Typography

- **Display Font:** Red Hat Display (with `system-ui`, `-apple-system`, `Segoe UI`, `sans-serif`)
- **Body Font:** Red Hat Text (with the same stack)
- **Label/Mono Font:** Red Hat Mono (with `ui-monospace`, `SFMono-Regular`, `Menlo`, `Consolas`, `monospace`)

**Character:** One family in three cuts, so the page sounds like one voice at three volumes. The display cut is
heavy and tightly tracked, the text cut is plain and comfortable to read, and the mono cut marks everything that
is a label, a state or a literal string.

The three faces are self-hosted from `assets/fonts/` as one variable file each, under the Open Font License
(`OFL-RedHat.txt`). Display covers weight 300 to 900; Text and Mono cover 300 to 700. All three load with
`font-display: swap`, and the home page and the course page fetch Display and Text early.

### Hierarchy

- **Display** (800, `clamp(2.5rem, 1.1rem + 5.4vw, 5.5rem)`, line height 1, `-0.038em`): the one page headline.
  The closing section of the home page repeats this size for its title.
- **Headline** (800, `clamp(2rem, 1.2rem + 3.2vw, 3.75rem)`, line height 1.03, `-0.032em`): section titles. The
  bands of the course page use a smaller cut: `clamp(1.625rem, 1.2rem + 1.8vw, 2.5rem)`, line height 1.08,
  `-0.026em`.
- **Title** (700, `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)`, line height 1.2, `-0.016em`): project row titles,
  the dock title and footer link names. Course page subheads are 700 at
  `clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)`. Service names on the board are 700 at `1.1875rem`, line height
  1.3. The site name in the bar is 800 at `1.1875rem`, and `1.0625rem` below `480px`. The mark sets `hf` in the
  same face at 800 and `0.9375rem`, tracked `-0.06em`.
- **Lead** (Text 400, `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)`, line height 1.5, at most `31em` wide): the one
  paragraph under a headline. A section subtitle is muted, `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)`, at most
  `32em` wide.
- **Body** (Text 400, `1.0625rem`, line height 1.55): running text, capped between `34em` and `36em`. Small
  text is `0.9375rem`. Values in term lists and items in the credential list are 600; navigation links are 500.
- **Button** (Text 650, `1.0625rem`, line height 1.2): the small button is `1rem`, the large one
  `clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)`.
- **Label** (Mono 500, `0.8125rem`, line height 1.5, `0.06em`, uppercase, muted): the board header, terms in a
  term list and chapter ranges. Live details on a board row and the technology line of a project keep the size
  and colour but drop the capitals and the tracking.
- **Pill** (Mono 600, `0.8125rem`, line height 1): the text of a state pill, in sentence case.
- **Mono** (Mono 500): `0.9375rem` for repository names, `0.92em` for an identifier inside a sentence.

Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`. Live details and term list values use
tabular figures. A text link is underlined at `1.5px` with an offset of `0.2em`.

**The Three Faces Rule.** Display sets headings and names. Text sets reading and controls. Mono sets labels,
states and literal identifiers. A face is never borrowed for another job.

**The Two Weights Rule.** Display appears at 800 for the site name and the headings of a page and its sections,
and at 700 for titles and names inside them.

**The Capitals Rule.** Uppercase with tracking belongs to the mono label alone. It captions data: a board header,
a term, a range.

## Layout

One centred container, at most `1440px` wide, padded on both sides by `--pad` (`clamp(20px, 5vw, 72px)`). Inside
it every text block has its own measure in `em`, so lines stay short on a wide screen.

The first screen is the model for the whole system. The headline spans the container. Under it, from `1000px`,
two columns: the pitch with its actions on the left and the board on the right, in a column of at most `540px`.
From `1000px` the home page also draws its circuit traces above the board, running down into its top edge.
Below `1000px` the board follows the pitch in one column. A single wrapping line of facts, under a hairline,
closes the block. On the home page that line belongs to the same grid and is a labelled list of credentials,
each with a muted note for its validity: from `1400px` it sits at the foot of the left column, level with the
foot of the board, and below `1400px` it spans the grid under the board in as many columns as fit.

Sections stack in one column and are separated by a hairline, never by a change of ground:

- a home page section pads `clamp(56px, 8vw, 112px)` above and below
- the hero pads `clamp(36px, 6vw, 88px)` above and `clamp(48px, 6vw, 80px)` below
- a course page band pads `clamp(36px, 5vw, 72px)` above and `clamp(48px, 6.5vw, 96px)` below
- the footer pads `clamp(40px, 6vw, 72px)` above and `32px` below

Grids are plain fractions and collapse to one column on narrow screens. Columns are `clamp(32px, 5vw, 72px)`
apart.

- split sections are 7 to 5 from `900px`
- project rows are 4 to 5 to 3 from `800px`
- course page bands are 4 to 7 from `900px`, with the band title pinned under the bar while its column scrolls
- course page items are 5 to 7 once their own column is `540px` wide, by container query
- footer links run two across, then four from `900px`
- a board row puts its pill beside the text from `560px`; below that the pill sits directly under the row name,
  above the description

The bar stays pinned to the top at `72px` (`--bar-h`) and in-page jumps clear it by a further `16px`. Its section
links appear from `900px`; below that the bar keeps the site name, the theme switch and its one button, and the
board rows do the in-page navigation. Below `480px` the buttons of an action group fill the width, and below
`360px` the button leaves the bar. Interactive targets in the bar are `44px` tall.

In print the bar, the theme switch, the dock and the circuit traces are removed.

## Elevation & Depth

Flat. The build has no `box-shadow`, no gradient and no blur. Depth is one tonal step and a hairline: the panel
is slightly lighter than the ground in both themes and carries a one-pixel border. The pinned bar shares the
ground colour and sits above the content by stacking order only. Where the browser supports scroll-driven
animation it gains a hairline along its bottom edge over the first `64px` of scroll; elsewhere the hairline is
always drawn.

**The Flat Board Rule.** A surface is a panel tone and a hairline. Nothing floats and nothing casts a shadow.

## Shapes

Gently rounded and thin-lined. Controls (buttons, navigation links, the theme switch, the skip link) have an
`8px` radius. The two panels, board and dock, have `12px`. States are full pills. Indicators are `10px` circles:
filled for a live state, a `2px` ring for a planned or unavailable one. The mark is a `28px` tile with a `7px`
radius of its own.

Every rule, and every border of a panel or a control, is one pixel. Hairline grey draws structure, strong line
grey outlines the secondary button, and the skip link alone has an ink outline.

The focus ring is a `2px` ink outline, offset `3px`, with a `4px` radius. Where an element fills its container
the ring is drawn inside it and takes the shape of what it sits in: `10px` on a board row, `8px` on the theme
switch. Inside the dock the ring takes the dock text colour.

Icons are inline line drawings on a 16 unit grid with a `1.75` stroke, round caps and joins, no fill, sized to
`1em` of the text they follow. Each one states where a link goes: a diagonal arrow leaves the site, a down arrow
jumps within the page, a right or left arrow moves within the site. A tick and a cross mark list items. List
bullets are small squares in muted ink.

**The Hairline Rule.** Structure is drawn with one-pixel lines. Thickness is never used for emphasis.

**The Shape Scale Rule.** `8px` for a control, `12px` for a panel, a full pill for a state, a circle for an
indicator. A focus ring follows the shape it sits in.

## Components

Every component reads its colours from the shared roles, so each of them works in both themes without a variant.
The build has no native form fields; the waiting list form is a third-party frame.

### Buttons

- **Shape:** gently rounded (`8px`), at least `52px` tall, padding `0 22px`, with an optional icon `10px` after
  the text.
- **Primary:** ink fill with the inverse text (`--btn`, `--btn-ink`). One per action group. On hover the fill
  is mixed with 14% of the ground, over `160ms`.
- **Secondary:** transparent with a one-pixel strong line border and ink text. On hover the border turns ink
  and the fill turns panel, over `160ms`.
- **Sizes:** small is `44px` tall with padding `0 16px`, used in the bar. Large is `64px` tall with padding
  `0 28px`, used once as the closing action of the home page.
- **Pressed and focus:** a pressed button moves down `1px`, unless the reader has asked for reduced motion.
  Focus is the global ring.

### Status pills and indicators

- **Pill:** a full pill at least `28px` tall, padding `0 11px`, mono type, no border. Green text on the green
  tint, amber on the amber tint, muted ink on the neutral tint.
- **Indicator:** a `10px` circle. Green and filled for live; a `2px` amber ring for planned; a `2px` neutral ring
  for unavailable.
- **Pulse:** an indicator that marks something open right now carries a slow ring that expands and fades
  (`2.6s`, repeating). It is used once per board at most.
- **Labels:** Available, Public and Open are green. Coming soon is amber. Private and Offline are
  neutral. No other label is used.
- **Use:** a pill always states a fact about the thing next to it.

### The Service Board

The signature component: a panel that lists services with their true state.

- **Structure:** a `12px` panel with a hairline border. A header row holds the board name as a mono label and
  may hold a second one on the right: a count of the states on the home page, the page count on the course
  page. The header wraps between its labels, never inside one. Each service row holds an indicator, a name, a
  muted description, an optional mono line of detail and, on most rows, a pill. Rows are separated by hairlines
  and padded `20px`.
- **Rows as links:** each row is one link to the section or page it names. A small muted arrow follows the
  name: down for a section of the same page, right for another page. On hover the row darkens by mixing 5% ink
  into the panel, over `160ms`, and the arrow moves `3px`. Focus is drawn inside the row.
- **Narrow screens:** below `560px` the pill moves from the right edge to sit directly under the name.
- **Live detail:** the local time in Dublin, refreshed every twenty seconds, and the day of the last push to
  GitHub with the repository name. Both replace plain text that is already true without script.
- **Check-in:** on load each indicator fills and its pill slides in from the right (`420ms` each), one row after
  another at `350ms`, `600ms` and `850ms`.
- **Course page:** the same board lists the contents of the page. Opening the course from the home board morphs
  the course name into the headline of the course page.
- **Offline page:** the board is reduced to one static row with a neutral ring and a neutral pill. It is not a
  link, so it has no arrow.

### The Forge

The brand, drawn and never pictured: a mark and a set of circuit traces. They are the only places ember appears.

- **Mark:** a `28px` tile with a `7px` radius on an ember ground, lettered `hf` in a fixed dark. It stands before
  the site name in the bar of every page, and the site icons and the social image use the same tile.
- **Circuit traces:** on the home page only, a drawing `468px` wide and `300px` tall that ends on the top edge of
  the board. Six traces in strong line grey, one pixel wide at 70% opacity, with small ring nodes where a trace
  ends. It is decoration: hidden from assistive technology, transparent to the pointer and removed in print.
- **Responsive:** the traces are absent below `1000px`. From `1000px` only the right half is shown, and from
  `1400px` the whole drawing.
- **Signals:** short ember dashes travel down five of the traces towards the board, each over `7s` and staggered
  so they never arrive together.
- **Sparks:** three four-point sparks in ember sit at the nodes and fade between 35% and full strength over
  `3.6s`, staggered.
- **Reduced motion:** without motion the signals are not drawn and the sparks stay still at full strength.

### Dock

- **Style:** a `12px` panel that stays dark in both themes, with padding `24px 20px 12px`. In the light theme it
  is ink with light text; in the dark theme it is the panel tone with a hairline border.
- **Use:** it holds the third-party waiting list form and a plain link that opens the same form in a new tab.
  The frame loads when it nears the screen and stays collapsed until it has loaded, so the dock never shows an
  empty hole.
- **States:** text selection and the focus ring inside the dock take the dock text colour.

### Rows and lists

- **Project rows:** a list between hairlines, with no fill and no box. Each row holds a title, a short body
  with a mono technology line, and a side column with a state pill and the repository name in mono.
- **Term list:** term and value pairs between hairlines. The term is a mono label in a `7rem` column; the value
  is Text 600.
- **Tick list:** single lines between hairlines, each led by a tick or a cross icon. The cross is muted.
- **Item list:** on the course page, a subhead with its text, items separated by hairlines.
- **Credential list:** on the home page, a labelled grid under a hairline. A muted label takes the first row;
  the items follow in columns at least `22rem` wide, each in Text 600 with an optional muted note for its year
  and validity. On the course page the same strip is one wrapping line of four terms with their values.
- **Settle:** where the browser supports scroll-driven animation, project rows rise `14px` and fade in as they
  enter the screen.

### Links

- **Text links:** ink, underlined in strong line grey. On hover the underline turns to the text colour, over
  `160ms`.
- **Icons on hover:** the icon after a link moves `2px` to `3px` in the direction it points, over `220ms`.
  Under reduced motion it stays still.
- **Footer links:** a title-sized name with an icon and one muted line under it, two across and then four.

### Navigation

- **Bar:** ground colour, `72px` tall, pinned, with a hairline along its bottom edge once the page has
  scrolled. It holds the mark and the site name, the section links, the theme switch and a small primary
  button.
- **Section links:** Text 500 at `1rem`, `44px` tall, padding `0 14px`, `8px` radius. Hover and the current page
  take the panel fill, over `160ms`. They are shown from `900px`.
- **Theme switch:** a `44px` square button with a moon in the light theme and a sun in the dark theme. It
  appears only when script runs, keeps one label, "Dark theme", and reports the current theme as its pressed
  state. It stores the choice under the key `theme`.
  With no stored choice the site follows the system setting and tracks its changes. The stored theme is applied
  before first paint.
- **Theme reveal:** the new theme opens as a circle from the centre of the switch, over `560ms`. Without view
  transitions the theme changes at once.
- **Skip link:** panel fill, one-pixel ink border, `8px` radius, shown on focus.

**The One Board Rule.** A page has one board. The dock is the only other bordered panel, and it exists to hold
a third-party form. Everything else is rows between hairlines.

**The True State Rule.** An indicator or a pill states something that is true today. Live detail always has a
plain text fallback in the markup.

**The Quiet Motion Rule.** One easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`, drives every transition and the
animations of the board; the traces keep slower curves of their own. The check-in, the pulse, the signals, the
sparks, the settle, the theme reveal and the page transition run only under
`prefers-reduced-motion: no-preference`. Under `prefers-reduced-motion: reduce` the icon movement on hover and
the pressed shift of a button are removed as well, and only colour transitions remain.

## Do's and `Don'ts`

### Do

- **Do** read every colour from a role (`--bg`, `--panel`, `--ink`, `--mute`, `--line`, `--line-strong` and the
  state pairs), so both themes follow.
- **Do** use green, amber and neutral only to state what is live, what is coming and what is not available.
- **Do** put state colour on its own tint as a pill, or alone as a `10px` indicator.
- **Do** keep ember to the forge: the ground of the mark, and the signals and sparks of the circuit traces.
- **Do** name a state with one of the six labels: Available, Public, Open, Coming soon, Private, Offline.
- **Do** open a page with one board whose rows are links and whose states are true today.
- **Do** separate repeated content with one-pixel hairlines and rows.
- **Do** set headings and names in Red Hat Display at 800 or 700, reading text and controls in Red Hat Text,
  and labels, states and literal identifiers in Red Hat Mono.
- **Do** keep text blocks to a measure between `31em` and `36em`.
- **Do** use `8px` for controls, `12px` for panels and a full pill for states.
- **Do** keep every button and every target in the bar at least `44px` tall; the standard button is `52px`.
- **Do** give live detail a plain text fallback that is true without script.
- **Do** gate authored animation behind `prefers-reduced-motion: no-preference`, and remove movement on hover
  and on press under `prefers-reduced-motion: reduce`.
- **Do** check both themes: text pairs measure at least `4.9:1` and the strong line at least `3:1`.

### Don't

- **Don't** use hue as decoration outside the forge: no coloured headings, links, buttons, section fills or
  icons. A drenched multi-colour direction was built and rejected by the owner.
- **Don't** use ember for text, for a button, for a pill, for a surface or for a state.
- **Don't** write a literal colour in a component, and don't ship a component that works in one theme only. The
  dock is the one inverted surface, dark in both themes.
- **Don't** add shadows, gradients or blur. The build has none.
- **Don't** box repeated content into cards. The board and the dock are the only bordered panels.
- **Don't** use line thickness for emphasis; rules and borders stay at one pixel.
- **Don't** set uppercase or tracked text outside the mono label.
- **Don't** use Red Hat Mono for headings or running text.
- **Don't** show a state that is not true on the day it is published.
