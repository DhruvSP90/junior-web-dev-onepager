# junior-web-dev-onepager

One-page static site listing programs that loads 'program-data.json' at runtime and displays Confederation College programs with:

* Program **name**
* **Mission statement** (or “No description yet.” if missing)
* **Program link** constructed from `slug.current` in the format
  `https://www.confederationcollege.ca/programs/<slug.current>`

## Live Demo & Repo

* **Live site:** [View Live Site](https://dhruvsp90.github.io/junior-web-dev-onepager/)
* **Repository:** [Repo](https://github.com/DhruvSP90/junior-web-dev-onepager)

## Stack

* **Vanilla JavaScript** 
* **Static** only — no server-side code
* Responsive **CSS**
* One page: `index.html`

## Data

* File: `program-data.json` (placed at the **project root**, same folder as `index.html`)
* Fields per item:

  * `_id` (string)
  * `missionStatement` (string | nullable)
  * `name` (string | nullable)
  * `slug.current` (string | nullable)

## How It Works

* Fetches `program-data.json` at runtime (`fetch(...)`)
* Renders a responsive **grid** of cards
* For each program:

  * **Name** shown as a heading (fallback: `Untitled Program`)
  * **Mission statement** (fallback: `No description yet.`)
  * **Program link** from `slug.current`

    * If `slug.current` is missing/empty -> link is **disabled** with `aria-disabled="true"`
* **Alphabetical sort** by program name
* **Search** box to filter by name (case-insensitive)

## Run Locally

From the project folder (with `program-data.json` at the root):

```bash
npx serve .
```

Then open the local URL printed in the terminal (e.g., `http://localhost:3000`).

> Note: Using a local HTTP server is required because the app fetches a JSON file.


## Deployment (GitHub Pages)

1. Push this project (including **`program-data.json`**) to a **public** GitHub repository.
2. In your repo, go to **Settings -> Pages**.
3. Under **Source**, choose **Deploy from a branch**.
   Select **Branch: `main`** and **Folder: `/ (root)`**, then **Save**.
4. After the Pages build completes, GitHub will show your **live URL**.
   Add that URL to the **Live site** link at the top of this README.


## Correctness & Edge Cases

* **Missing `missionStatement`** -> displays **“No description yet.”**
* **Missing `slug.current`** -> disables the link with `aria-disabled="true"`
* **Missing `name`** -> displays **“Untitled Program”**
* **Safe text rendering** (HTML-escaped)
* **Alpha-sorted** by name
* **Search** filters programs by name
* Clear **error message** if `program-data.json` fails to load

## Accessibility

* Semantic headings (`h1`, per-card `h2`)
* Live region (`aria-live="polite"`) for the result count
* `aria-busy` while data loads
* External links use `rel="noopener noreferrer"`

## Project Structure

```
.
├── index.html
├── styles.css
├── script.js
├── program-data.json
└── README.md
```

## Tradeoffs & Design Choices

* **Vanilla JS** for clarity and zero tooling
* **No framework** keeps load fast and review simple
* **CSS** for a clean, accessible UI without dependencies
* **Client-side filter/sort** adds UX value with minimal complexity

## Approximate Time Spent

It took me around **70-75 minutes** to complete the code writing and deploy it on GitHub.
