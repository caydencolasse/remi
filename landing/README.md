# remii.ai landing page

The "coming soon" page for Remii with the waitlist form. It is separate from
the phone app: plain HTML, CSS and one small script, with no build step.

It was built from the design canvas "Remii — Landing page" (Desktop, Tablet and
Mobile frames) and is one page that rearranges itself for each screen size.

## What is in this folder

| File | What it is |
| --- | --- |
| `index.html` | The page |
| `styles.css` | All styling, including the tablet and phone layouts |
| `waitlist.js` | Form checks, the "You're on the list" message, the swipe dots on phones |
| `api/waitlist.js` | The server function that saves a sign-up to Brevo. Runs on the host, never in the browser |
| `assets/` | Images, the share image (`og.jpg`) and the two fonts (served from this site, not from Google) |
| `404.html`, `robots.txt`, `vercel.json` | Not-found page, search-engine file, host settings |
| `tests/` | Tests for the server function. Run `npm run test:landing` from the repo root |

There is no analytics, no cookies and no third-party script on the page.

## Putting it live at remii.ai (about 15 minutes)

These steps use Vercel because the waitlist function is written for it.

1. **Make the list in Brevo.** Contacts > Lists > create a list called
   "Remii waitlist". Open it and note the list number (the `#` id).
2. **Make a Brevo API key.** Settings > SMTP & API > API keys > generate one
   named "remii.ai waitlist". Copy it once; treat it like a password.
3. **Create the Vercel project.** vercel.com > Add New > Project > import
   `caydencolasse/remi`. Set **Root Directory** to `landing`. Framework preset:
   "Other". Leave the build command empty.
4. **Add the two settings** under Environment Variables before deploying:
   - `BREVO_API_KEY` = the key from step 2
   - `BREVO_LIST_ID` = the list number from step 1
5. **Deploy**, open the `.vercel.app` address Vercel gives you, and sign up
   with your own email and then your own phone number. Check both appear in
   the Brevo list.
6. **Point remii.ai at it.** In the Vercel project: Settings > Domains > add
   `remii.ai` and `www.remii.ai`. Vercel shows the DNS records to add at the
   company where remii.ai is registered. The padlock (HTTPS) is automatic.

After that, every push to `main` that changes this folder updates the site.

## Rules for this folder

- **The Brevo key never goes in a file.** It lives only in the host's
  Environment Variables. Same rule as the app: no secrets in the repo.
- **The form never claims a sign-up it did not save.** If the two settings are
  missing or Brevo is down, the visitor sees "We couldn't add you just now".
- A 10-digit phone number with no country code is saved as a US or Canada
  number (+1).

## Before you advertise the page

- The page promises "We'll only use this to tell you when Remii is ready."
  Keep the Brevo list to that one use.
- Texting people who leave a phone number is regulated (TCPA in the US, and
  carriers require sender registration). Have the consent wording under the
  form checked before the first text goes out. Email has no such hurdle.
- There is no privacy policy page yet. Add one and link it in the footer
  before running paid traffic to the page.
- Vercel's free plan is for non-commercial use; a company site belongs on a
  paid plan.

## Changing the page

Copy and layout are in `index.html` and `styles.css`. The design canvas is the
reference: if the canvas changes, ask Claude to bring this folder in line with
it. To look at the page on your own computer, open `index.html` in a browser;
everything works except the final sign-up step, which needs the host.
