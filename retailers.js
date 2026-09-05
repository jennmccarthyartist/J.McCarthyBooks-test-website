/* ============================================================
   RETAILER + PREORDER CONFIGURATION
   ------------------------------------------------------------
   This is the ONLY file you edit when links go live.

   HOW IT WORKS
   - Paste a URL between the quotes. That button turns on everywhere
     on the site, automatically. No HTML editing.
   - Leave it as "" (empty). That button renders as a quiet
     "Link coming" chip instead, and the page falls back to the
     newsletter CTA.
   - Delete a whole line to remove that retailer from the site.

   These are READER-FACING STOREFRONTS. Your publishing platforms
   (KDP, IngramSpark, Kobo Writing Life, iTunes Connect, B&N Press,
   Draft2Digital) are where you upload the book — readers never see
   them, so they are not listed here. D2D and IngramSpark feed the
   storefronts below; paste the resulting store URLs here.
   ============================================================ */

window.SITE_CONFIG = {

  /* ---- Book 1: The Joseon Retrospective (Tuesday, 20 October 2026) ---- */
  joseon: {
    /* Set to true once ANY link below is live and the book is
       orderable. Controls whether CTAs read "Preorder" or "Buy". */
    onSale: false,

    /* THE EBOOK PREORDER LINK (Books2Read universal link).
       Paste it here and the book page's primary button flips from
       "Tell me the moment preorders open" (→ newsletter) to
       "Preorder the ebook · $4.99" (→ this URL). One-line change. */
    books2readUrl: "",

    /* Flip to true when the /excerpt page ships (§4). Until then the
       "Read the opening pages" button stays hidden so the live site
       never links to a page that doesn't exist. */
    excerptLive: true,

    /* The book's Goodreads page (not the author page). Paste it here
       and the "Want to Read" buttons appear on the book page and the
       excerpt; leave empty and they stay hidden. Goodreads emails
       every shelver on release day, so this matters at launch. */
    goodreadsBookUrl: "",

    retailers: [
      { name: "Amazon",        url: "https://www.amazon.com/dp/B0HFZQ127N" },  // ebook preorder, releases 20 October 2026
      { name: "Barnes & Noble", url: "" }, // via B&N Press
      { name: "Apple Books",   url: "https://books.apple.com/us/book/the-joseon-retrospective/id6808521415" },  // via iTunes Connect / D2D
      { name: "Kobo",          url: "https://www.kobo.com/us/en/ebook/the-joseon-retrospective" },  // via Kobo Writing Life / D2D
      { name: "Google Play",   url: "" },  // via Google Play Books / D2D
      { name: "Bookshop.org",  url: "" }   // via IngramSpark
    ],

    /* Shown to libraries and booksellers on the trade pages. */
    trade: {
      ingram: "Ingram Content Group (iPage)",
      isbnPaperback: "979-8-9964711-0-2",
      isbnHardcover: "979-8-9964711-1-9"
    }
  },

  /* ---- Book 2: The Unsigned Falcon (Spring 2027) ---- */
  falcon: {
    /* Paste a preorder URL here and /falcon flips from a
       "be first to know" signup to a preorder call-to-action. */
    preorderUrl: ""
  },

  /* ---- Advance review copies (/advance-copies page) ----
     Each link on that page turns real the moment its URL is here.
     While empty, its card link gracefully points at the newsletter
     so a reviewer can still opt in to hear when it opens. */
  arc: {
    /* Booksprout ARC team claim page. */
    booksproutUrl: "https://booksprout.co/reviewer/review-copy/view/314110/the-joseon-retrospective",
    /* Blogger / bookstagram request form (BookFunnel-delivered). */
    requestFormUrl: "https://dl.bookfunnel.com/kd90qgovow",
    /* BookSirens — submission declined 1 September 2026, before any
       manuscript was uploaded. BookSirens does not reconsider
       submissions, so this stays empty and the card stays hidden.
       Not an open task. */
    bookSirensUrl: ""
  }
};
