# The Holberton-Turing Oath

A static, multilingual website for the Holberton-Turing Oath — built with the
Design Components runtime (React under the hood, no build step). Open
`index.html` directly in a browser, or host it anywhere static (GitHub Pages,
Netlify, Cloudflare Pages…).

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole site (markup + logic). |
| `Oath-v2.dc.html` | Proposed **v2** draft page (linked from the Oath section). Not yet ratified; English only for now. |
| `translations.js` | All copy in 7 languages (EN, FR, ES, DE, NL, ZH, KO). Edit text here. |
| `support.js` | Runtime that powers the page. Don't edit. |
| `google-apps-script.gs` | Backend that saves signatures to a Google Sheet. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |

## 1 — Collect signatures (Google Sheet, free)

1. Create a Google Sheet. In row 1, headers A→G:
   `Timestamp | Name | Email | Role | Country | Message | Language`
2. **Extensions ▸ Apps Script**, paste the contents of `google-apps-script.gs`.
3. **Deploy ▸ New deployment ▸ Web app** — *Execute as: Me*, *Who has access: Anyone*.
   Deploy, authorize, and copy the **Web app URL** (ends in `/exec`).
4. Open `index.html`, find `FORM_ENDPOINT = "";` near the top of the script and
   paste your URL between the quotes. Save.

Until you do this, the Sign form shows a "not configured yet" notice instead of
sending anything.

## 2 — Publish on GitHub Pages

1. Create a new GitHub repo (e.g. `holberton-turing-oath`).
2. Upload **all files in this folder** to the repo root
   (drag-and-drop on github.com → "Add file ▸ Upload files", or `git push`).
3. Repo **Settings ▸ Pages** → Source: *Deploy from a branch* → Branch: `main` / `/root` → Save.
4. Your site goes live at `https://<username>.github.io/<repo>/` within a minute.

### Custom domain (holbertonturingoath.org)

1. In **Settings ▸ Pages ▸ Custom domain**, enter `www.holbertonturingoath.org`.
2. At your domain registrar, add a `CNAME` record:
   `www  →  <username>.github.io`
   and four `A` records on the apex `@` pointing to GitHub's IPs:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. Back in GitHub Pages, tick **Enforce HTTPS** once the certificate is issued.

## Editing

- **Text / translations:** edit `translations.js`.
- **Add a language:** add an entry to `LANGS` and a matching block in `I18N`.
- **Portraits:** the Holberton & Turing cards use placeholders. Drop in real
  images by replacing the placeholder `<div>`s with `<img>` tags.
- **Default language / numbering / emblem:** props at the bottom of `index.html`.
