const APP = document.getElementById('app');
const GRID = document.getElementById('grid');
const STATUS = document.getElementById('status');
const SEARCH = document.getElementById('search');
const COUNT = document.getElementById('count');

const PROGRAM_URL = 'program-data.json';

// Utilities
const text = (v) => (v ?? '').toString().trim();
const safeHTML = (str) => {
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
};
const programLink = (slugCurrent) => {
  const slug = text(slugCurrent);
  if (!slug) return null;
  return `https://www.confederationcollege.ca/programs/${encodeURIComponent(slug)}`;
};

// Render
function render(programs) {
  GRID.innerHTML = '';
  const frag = document.createDocumentFragment();

  programs.forEach((p) => {
    const name = text(p?.name) || 'Untitled Program';
    const missionRaw = text(p?.missionStatement);
    const mission = missionRaw || 'No description yet.';
    const href = programLink(p?.slug?.current);

    const card = document.createElement('article');
    card.className = 'card';

    const h2 = document.createElement('h2');
    h2.innerHTML = safeHTML(name);

    const para = document.createElement('p');
    para.innerHTML = safeHTML(mission);

    const link = document.createElement('a');
    if (href) {
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View program →';
    } else {
      link.setAttribute('aria-disabled', 'true');
      link.textContent = 'Link unavailable';
    }

    card.append(h2, para, link);
    frag.append(card);
  });

  GRID.append(frag);
  GRID.hidden = false;
}

// Search filter
function attachSearch(fullList) {
  const normalize = (s) => s.toLowerCase();
  const source = fullList.map((p) => ({
    raw: p,
    key: normalize(text(p?.name)),
  }));

  function applyFilter() {
    const q = normalize(SEARCH.value || '');
    const filtered = q ? source.filter((x) => x.key.includes(q)).map((x) => x.raw) : fullList;
    render(filtered);
    COUNT.textContent = `${filtered.length} / ${fullList.length} shown`;
  }

  SEARCH.addEventListener('input', applyFilter);
  applyFilter();
}

// Bootstrap 
async function init() {
  try {
    const res = await fetch(PROGRAM_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error('Invalid data shape: expected an array');

    data.sort((a, b) => (text(a?.name).localeCompare(text(b?.name))));

    STATUS.remove();
    APP.setAttribute('aria-busy', 'false');

    attachSearch(data);
  } catch (err) {
    console.error(err);
    STATUS.textContent = 'Failed to load program list. Ensure program-data.json is present at the site root.';
  }
}

init();
