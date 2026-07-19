# J. McCarthy Books — Author Website

Static website for author **J. McCarthy** and the **Keiko Ito Mystery Series**
(Book 1: *The Joseon Retrospective*, October 2026).

Hand-coded HTML/CSS/JS. No build step, no framework, no dependencies.
Deploy the `site/` folder to any static host.

---

## The one file you'll actually edit: `retailers.js`

Every buy link on the site is driven from `retailers.js`. Paste a URL between
the quotes and that button turns on everywhere, automatically. Leave it empty
and the button renders as a quiet "Link coming" chip instead, with the
newsletter shown as the fallback call to action.

```js
{ name: "Amazon", url: "https://..." }   // live button, sitewide
{ name: "Kobo",   url: "" }              // "Link coming" chip
```

Three switches live in that file:

| Setting | Effect |
|---|---|
| `joseon.retailers[].url` | Turns each store button on. |
| `joseon.onSale` | `false` → buttons read "Preorder". `true` → "Buy". |
| `falcon.preorderUrl` | Set it and `/falcon` flips from a signup form to a preorder button. |

You never have to edit HTML to launch. This behaviour is verified working in
both states.

**Note on your platform list.** Amazon KDP, IngramSpark, Kobo Writing Life,
iTunes Connect, B&N Press and Draft2Digital are *publishing* platforms — where
you upload the book. Readers never visit them. `retailers.js` lists the
*storefronts* those platforms feed: Amazon, Barnes & Noble, Apple Books, Kobo,
Google Play, and Bookshop.org (via IngramSpark).

---

## Pages

| Route | File | Primary CTA |
|---|---|---|
| `/` | `index.html` | Request Archive Access (newsletter) |
| `/series` | `series.html` | Reading order → Book 1 |
| `/the-joseon-retrospective` | `the-joseon-retrospective.html` | Retailer links |
| `/falcon` | `falcon.html` | Be first to know → preorder |
| `/the-file` | `the-file.html` | Open the file (newsletter) |
| `/about` | `about.html` | Newsletter |
| `/faq` | `faq.html` | Contact / newsletter |
| `/book-clubs` | `book-clubs.html` | Download kit |
| `/media-kit` | `media-kit.html` | Contact for review copies |
| `/contact` | `contact.html` | Email |
| `/privacy` | `privacy.html` | — |
| — | `404.html` | Home / contact / newsletter |

One primary CTA per page, per the conversion architecture in the brief.

### The media kit is deliberately different

`media-kit.html` is built from the separate **Media Kit Web** design reference
(`design_handoff_media_kit_web/`), which specifies a standalone press page with
its **own sticky top bar and its own footer** — not the main site's header and
footer. That is by design, so the page can be linked directly to journalists
and booksellers. Its CSS is namespaced `.mk-*` at the end of `styles.css` and
shares nothing with the site chrome, so editing one will never affect the other.

The only route back into the site is the logo in its top bar (which links home)
— the reference has no other cross-links, and that was preserved.

Two deliberate departures from the reference, both noted in the CSS:

- **Narrow-screen top bar.** The reference's top bar is a non-wrapping flex row,
  so below ~700px the nav overlapped the wordmark. It now stacks. The
  reference's tested layout above 700px is untouched.
- **Paragraph margins.** The reference builds text blocks from `<div>`s; the
  page uses semantic `<p>`/`<h3>`, so the base paragraph margin is cancelled to
  keep spacing identical.

Assets it uses (downscaled from the 2000–5000px originals for load speed):
`logo-white-transparent.png`, `logo-black-transparent.png`, `logo-on-dark.png`.
Note the source file named "black logo.png" is actually the *reversed* logo on
a black field — it is correctly used in the on-dark contexts.

---

## Copy provenance

All copy comes from the audited source documents in `design_handoff_jmccarthy_brand/`
and is reproduced **verbatim**. Where the sources disagreed, these rulings were
applied consistently sitewide:

- Keiko Ito is a **Senior Registrar**, never a curator.
- Name order is **"Keiko Ito"** throughout — Western convention, chosen for
  marketing. Note this deliberately differs from the novel itself, which uses
  Japanese order ("Ito Keiko") consistently. Any new marketing copy should
  follow the site, not the book.
- Publication is **"October 2026"** — never a specific day.
- Prices/ISBNs are the one-sheet figures: $15.99 / $27.99 / $4.99.
- Contact is **contact@jmccarthybooks.com**.
- The phrases "fair-play mystery", "forgery", and "attribution" appear nowhere —
  the one-sheets explicitly reject that framing.
- No invented praise, reviews, or blurbs anywhere on the site.

---

## Design system

Palette and type are taken directly from Brand Guidelines v1.0. All tokens are
CSS variables at the top of `styles.css`, so the site re-themes from one place.

Ink `#141210` · Paper `#FFFFFF` · Cinnabar `#A6342A` · Celadon `#7C8F78` ·
Stone `#6E685F` · hairline `#DBD5C8`. Jost (display) + Atkinson Hyperlegible (body).

Register: spare, precise, archival — catalog typography, ledger hairlines,
generous margins.

---

## SEO / AEO / GEO

Implements the "Invisible Requirements" section of the inspiration brief.

- **Schema (JSON-LD)** — validated on every page: `WebSite`, `Person`,
  `BookSeries`, `Book` (with ISBNs, three price points, and the 150-word
  authoritative summary in `abstract`), `FAQPage`, `AboutPage`, `ContactPage`,
  `WebPage`, `BreadcrumbList` on all interior pages.
- The FAQPage schema text matches the visible on-page Q&A **exactly** — verified
  string-for-string across all 13 questions.
- The 150-word authoritative summary lives only in metadata/schema, never as
  visible copy, exactly as specified.
- Question-format H2s with the direct answer in the first 40–60 words;
  `.answer-block` "what is this?" boxes; one H1 per page; sequential heading
  levels; visible "Last updated" stamps.
- Consistent entity naming sitewide.
- Mobile-first; ≥44px touch targets; explicit `width`/`height` on every image
  (no layout shift); lazy loading below the fold; deferred JS; skip link;
  visible focus rings; `prefers-reduced-motion` respected.
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, canonical URL per page.
- No entry pop-ups; the newsletter offers a specific lead magnet (the four
  documents), not a bare "join my list".

---

## Newsletter (Kit)

Form ID **9696841** is wired into `index.html`, `the-file.html`, and
`falcon.html`. Forms post to Kit in the background so the reader never leaves
the page; with JS disabled they fall back to a normal POST to Kit's hosted
confirmation. The email field is named `email_address` as Kit requires.

**Still to do in the Kit dashboard:** set the incentive email to deliver the
four documents (Settings → Incentive), and enable double opt-in. The on-page
copy promises delivery "one at a time, in order" — that sequence is configured
in Kit, not on the site.

To also collect a first name, add `<input name="fields[first_name]">` to a form
and it flows through automatically.

---

## Before launch

1. **Privacy policy** — the page is built verbatim from
   `Legal/Privacy_Policy_Page(1).md`. Three `[PLACEHOLDER]` markers remain
   visible on the page, and they are the ones that document itself asks you to
   fill: **effective date**, **hosting provider**, and the **analytics branch**
   (delete that section outright if you run no analytics).
2. **Domain** — canonical/OG URLs use `https://jmccarthybooks.com/`.
   Find-and-replace if that changes.
3. **Social handles** — the `sameAs` schema arrays and footer icons use
   `@jmccarthybooks` / `@j.mccarthybooks`. Confirm each profile exists.
4. **`media-kit.pdf` is 29 MB** — far too heavy for a web download. Compress it
   (target under 5 MB) before launch or link it from a file host.
5. **Media kit page count** — `media-kit.html` shows a visible `[Page count TK]`
   in the bibliographic data card. Fill it at typesetting.
6. **Early Praise is hidden**, by decision, until real quotes exist. The whole
   section is still in `media-kit.html`, commented out, with restore
   instructions inline. To switch it back on: delete the two comment markers
   around the `<section id="praise">`, un-comment the "Praise" link in the top
   nav, drop in the real quotes, and change `.mk-quote`'s border from
   `1px dashed` to `1px solid` in `styles.css` so the cards read as finished.

**Settled — no action needed:**

- **Author photo.** By decision, the site uses no headshot. `about.html` and
  `media-kit.html` are designed around the moon emblem and Binder artwork, and
  read as complete. Nothing is stubbed or waiting.
- **Se-bin's annotation is seven lines.** The longer literary blurb in the
  source `.docx` said six; that was the error, and the page says seven
  throughout. If you reuse that blurb elsewhere, fix it at the source.
- **Keiko is a Senior Registrar.** The Media Kit PDF's "curator" wording is
  being corrected by the author; the site already says registrar everywhere.

---

## Hosting: pick one config file

Three are included; only the one matching your host applies.

- **Netlify** → `_redirects` (wins over `netlify.toml`)
- **Apache** → `.htaccess`
- Others → replicate the same two rules: pretty URLs, and serve `404.html`
  with a real **404 status** (not a redirect to home, or search engines will
  index broken URLs).

---

## Local preview

From the project root (one level above `site/`):

```
node serve.mjs          # http://localhost:3000
```

Serves pretty URLs and returns a real 404, matching production.

Screenshots, if you want them:

```
node screenshot.mjs http://localhost:3000/ home
```
