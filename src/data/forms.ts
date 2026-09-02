/* ---------------------------------------------------------------------------
   FORM ENDPOINTS

   The site is statically hosted, so forms need a third-party handler. Paste the
   endpoint URL in below and every form on the site starts posting to it — no
   other change needed.

   Works with anything that accepts a plain POST of form fields:
     • Formspree     https://formspree.io/f/xxxxxxxx
     • Web3Forms     https://api.web3forms.com/submit
     • Netlify Forms (add `netlify` to the <form> instead)
     • Cloudflare Pages Function at e.g. /api/contact

   While these are empty, forms stay fully usable: submitting opens the user's
   mail client with the answers pre-filled and addressed to the company. That
   is a real fallback, not a dead end — but wire up an endpoint before launch,
   because mail-client handoff loses a meaningful share of enquiries.
--------------------------------------------------------------------------- */

export const FORM_ENDPOINTS = {
  /** Booking a meeting, call or office tour. */
  booking: '',
  /** Newsletter / publication subscription. */
  subscribe: '',
  /** General contact and brochure requests. */
  contact: '',
};
