# Archiving a past edition

The site at `qiskit-fall-fest-bw.com` always shows the **current** edition at the
root. Past editions live on under `/<year>/` as frozen snapshots, linked from
the "Past editions" line in the footer.

Currently archived: [`/2025/`](2025/) (snapshot of commit `1693f04`, the last
state of the 2025 site).

## How a snapshot is made

Everything is plain static files, so an archive is just a copy of the old tree
in a subdirectory. Relative asset paths (`css/style.css`, `assets/...`) keep
working unchanged inside the subdirectory.

1. Find the last commit of the edition you want to freeze — the commit right
   before the rewrite for the following year started:

   ```sh
   git log --oneline
   ```

2. Extract that commit's tree into a year directory and drop the `CNAME`
   (GitHub Pages only reads the one at the repository root):

   ```sh
   mkdir -p 2025
   git archive <commit> | tar -x -C 2025/
   rm 2025/CNAME
   ```

3. Add the archive wrapper to `2025/index.html`. Keep the snapshot's own
   `style.css`, `utilities.css` and `script.js` untouched — all archive-specific
   rules and behaviour go in `css/archive.css` and `js/archive.js` so the
   snapshot stays faithful and the wrapper stays easy to spot:

   - `<title>` / `og:title` / `twitter:title` get a ` (Archive)` suffix.
   - `<link rel="stylesheet" href="css/archive.css" />` after the other two.
   - An `.archive-banner` element as the first child of `<body>`, linking to `/`.
   - Any live call to action (registration link, ticket shop) is replaced with a
     disabled `Registration closed` label, so the archive does not send people to
     a dead form.
   - A footer note linking back to the current edition.
   - `<script src="js/archive.js"></script>` after `js/script.js`.

4. Point `assets/favicon/site.webmanifest` at the archive: `start_url` and
   `scope` become `/2025/`, and the icon `src` paths get the `/2025` prefix.
   Otherwise installing the archived page as an app opens the live site.

5. Link it from the current site's footer in the root `index.html`:

   ```html
   <p class="past-editions">Past editions: <a href="/2025/">2025</a></p>
   ```

6. Verify nothing 404s before pushing:

   ```sh
   python3 -m http.server 8000
   # then open http://127.0.0.1:8000/ and http://127.0.0.1:8000/2025/
   ```

## Notes

- Repository size is barely affected: git already stores the old blobs from
  history, and identical files are not stored twice.
- The archive is intentionally left indexable by search engines, so people
  looking for "Qiskit Fall Fest 2025 Stuttgart" still find the programme. If an
  archive ever starts outranking the live site, add
  `<meta name="robots" content="noindex, follow" />` to that year's `<head>`.
- The `.archive-banner` is `position: fixed`, so `css/archive.css` pushes the
  (also fixed) navbar and the hero down by `--archive-banner-height`.
  `js/archive.js` keeps that variable equal to the banner's real height, which
  matters on narrow screens where the banner text wraps to two lines.
