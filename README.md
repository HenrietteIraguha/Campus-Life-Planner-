# 🎓 Campus Life Planner  
### Plan smarter. Study better. Stay balanced.

<p align="center">
  <strong>A clean, student-focused task planner built with pure web fundamentals.</strong><br>
  <em>No frameworks. No build tools. Just HTML, CSS & JavaScript.</em>
</p>

<p align="center">
  ✨ Organize tasks • ⏱️ Track study time • 🎯 Stay on target • ♿ Accessibility-first
</p>

<p align="center">
  <img src="assets/campus.jpg.png" alt="Campus Life Planner preview" width="85%">
</p>

---

## 🔗 Links

- 🌐 **Live Demo:** https://henrietteiraguha.github.io/Campus-Life-Planner-/
- 📦 **Repository:** https://github.com/HenrietteIraguha/Campus-Life-Planner-
- 🎥 **Demo Video:** https://youtu.be/mKFxnaMuHTU  

---

## 🌟 Why Campus Life Planner?

University life gets chaotic — fast.

**Campus Life Planner** helps students:
- See their workload clearly  
- Plan realistically  
- Stay in control without feeling overwhelmed  

All while respecting performance, clarity, and accessibility from day one.

---

## ✨ Features List

| Feature | Status |
|--------|--------|
| Add, edit, delete tasks | ✅ |
| Inline form validation with instant feedback | ✅ |
| Confirmation prompts before deleting | ✅ |
| Total tasks & total study duration stats | ✅ |
| Most-used tag display | ✅ |
| 7-day workload trend chart | ✅ |
| Cap / target warnings with ARIA live alerts | ✅ |
| Live regex search (safe compiler) | ✅ |
| Filter by tag or date | ✅ |
| Sort by title, date, duration | ✅ |
| Light / Dark mode toggle | ✅ |
| Minutes ↔ Hours unit toggle | ✅ |
| localStorage persistence | ✅ |
| JSON import with structure validation | ✅ |
| JSON export | ✅ |
| Keyboard navigation | ✅ |
| ARIA live regions | ✅ |
| Skip-to-content link | ✅ |
| Mobile-first responsive design (3 breakpoints) | ✅ |

---

## 🧠 Regex Catalog

All regex patterns live in `Scripts/validators.js` and `Scripts/search.js`.

### Validation Patterns

| Pattern | Purpose | Accepts | Rejects |
|---------|---------|---------|---------|
| `/^(?!\s)(?!.*\s$)(?!.*\s{2,}).{2,100}$/` | Title validation — no leading/trailing/double spaces, 2–100 chars | `"Math Assignment"` | `" Math"`, `"Math  Assignment"` |
| `/^[1-9]\d{0,4}$/` | Duration — positive whole number, no decimals or leading zeros | `"45"`, `"120"` | `"0"`, `"45.5"`, `"00120"` |
| `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | Date format YYYY-MM-DD | `"2025-09-29"` | `"29-09-2025"`, `"2025-13-01"` |
| `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Tag — letters, single spaces or hyphens only | `"Study Group"`, `"Self-Study"` | `"Tag!"`, `"  tag"` |
| `/\b(\w+)\s+\1\b/i` | Advanced: back-reference to catch duplicate consecutive words | — | `"Math Math"`, `"the the"` |

### Search Pattern (Live Regex Search)

| Pattern | Purpose | Example |
|---------|---------|---------|
| `compileRegex(input, 'gi')` | Safe regex compiler — wraps in try/catch, returns null on invalid input | User types `math` → highlights all title/tag matches |

### How Search Works

User input is compiled into a regex using a safe wrapper that catches invalid patterns. The resulting regex is applied to task titles and tags, and matches are wrapped in `<mark>` tags for visual highlighting without breaking accessibility.

---

## ⌨️ Full Keyboard Map

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + A` | Scroll to Add Task form & focus title field |
| `Alt + D` | Scroll to Dashboard |
| `Alt + T` | Scroll to Task Records table |
| `Alt + S` | Scroll to Settings |
| `Alt + /` | Focus the search input |
| `Tab` | Move forward through interactive elements |
| `Shift + Tab` | Move backward through interactive elements |
| `Enter` | Submit form / activate button |
| `Space` | Activate focused button |
| `Esc` | Cancel confirm dialogs |

### Tab Order (Focus Flow)

1. Skip-to-content link (first tab stop)
2. Header navigation links
3. Search input
4. Filter by tag dropdown
5. Filter by date input
6. Sort buttons in the table header
7. Edit / Delete buttons per task row
8. Add Task form fields (title → duration → due date → tag → submit)
9. Settings controls (unit → theme → cap → import → export)

All interactive elements have visible focus indicators styled with a blue outline.

---

## ♿ Accessibility Notes

### Semantic Structure
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` landmarks used throughout
- Heading hierarchy: `h1` (app title) → `h2` (sections) → `h3` (subsections)
- All form inputs have associated `<label>` elements

### ARIA Live Regions
| Region | Role | Behavior |
|--------|------|---------|
| `#status` | `role="status"` with `aria-live` | Announces task add/edit/delete success messages |
| `#cap-status` | `aria-live="polite"` | Updates when under the cap target |
| `#cap-status` | `aria-live="assertive"` | Fires when cap is exceeded — interrupts screen reader |
| `#search-status` | `aria-live="polite"` | Announces number of search results found |

### Color Contrast
- All text meets WCAG AA contrast ratios
- Dark mode maintains equivalent contrast ratios
- Focus indicators visible against both light and dark backgrounds

### Other A11y Features
- Skip-to-content link as first focusable element
- `aria-label` on edit/delete buttons includes task title (e.g., `"Edit Math Assignment"`)
- `<mark>` used for search highlights (natively announced by screen readers)
- Confirm dialogs use native `confirm()` which is keyboard accessible

---

## 📁 File Structure

```
campus-life-planner/
├── index.html
├── styles/
│   └── styles.css
├── Scripts/
│   ├── ui.js          — DOM rendering, events, search, settings UI
│   ├── state.js       — App state, task CRUD, stats logic
│   ├── storage.js     — localStorage read/write
│   ├── validators.js  — All regex validation functions
│   └── search.js      — Regex-powered task filtering
├── assets/
├── seed.json          — 10+ sample tasks for testing
├── tests.html         — In-browser unit tests
└── README.md
```

---

## 💾 Data Persistence

- Tasks and settings stored in `localStorage` under keys `clp_tasks` and `clp_settings`
- Data survives page reloads automatically
- JSON import validates structure before loading — rejects files missing required fields
- JSON export downloads all current tasks as a formatted `.json` file

---

## 🧪 How to Run Tests

1. Open `tests.html` directly in your browser (no server needed)
2. Tests run automatically on page load
3. Results display inline — green for pass, red for fail

**What is tested:**
- `validateTitle()` — accepts valid titles, rejects leading/trailing spaces, double spaces, duplicates
- `validateDuration()` — accepts positive integers, rejects decimals, zeros, negatives
- `validateDate()` — accepts valid YYYY-MM-DD dates, rejects invalid months/days and wrong formats
- `validateTag()` — accepts clean tags, rejects special characters
- `compileRegex()` — returns null for invalid patterns instead of throwing
- `filterTasks()` — correctly filters tasks by search term against title and tag

---

## 🌱 Sample Data

A `seed.json` file is included with 10+ realistic tasks covering:
- Multiple tags (Lecture, Assignment, Study, Lab, Self-Study)
- Edge-case durations (short and long)
- Date ranges across the last 7 days for chart testing
- Tricky strings to test validation edge cases

**Load via:**  
Settings → Import JSON → select `seed.json`

---

## 🚀 Run Locally

```bash
git clone https://github.com/HenrietteIraguha/Campus-Life-Planner-
cd Campus-Life-Planner-
python -m http.server 8000
```

Then open: http://localhost:8000

> ⚠️ Must be served via a local server (not opened as a file) due to ES module imports.

---

## 👩‍💻 Author

- GitHub: https://github.com/HenrietteIraguha  
- Email: h.iraguha@alustudent.com  

---

## 🏁 Final Notes

This project demonstrates:
- Strong JavaScript architecture with ES modules
- Real-world regex form validation including an advanced back-reference pattern
- Accessibility best practices built in from the start
- Clean, mobile-first UI/UX

No frameworks — just solid fundamentals.

© 2026 — Campus Life Planner