📅 Campus Life Planner

A responsive, accessible, vanilla HTML/CSS/JavaScript web application that helps students organize tasks, track study time, and stay on top of their academic life — all without frameworks or build tools.

🌐 Live Demo & Repository

Live Site: 👉 Insert GitHub Pages URL here

Repository: 👉 Insert GitHub Repo URL here

📌 Project Theme

Campus Life Planner — one of the three official assignment themes.

Students can:

Add tasks with a title, due date, duration, and tag

View tasks in a sortable table

Search and filter in real time

Track total study duration against a personal cap/target

Persist everything using localStorage

📂 File Structure
campus-life-planner/
├── index.html              # Main HTML (semantic landmarks)
├── styles/
│   └── styles.css          # Mobile-first CSS, Flexbox, 3 breakpoints,
│                           # dark/light theme, animations
├── Scripts/
│   ├── ui.js               # DOM rendering, events, sorting, charts, import/export
│   ├── state.js            # App state, CRUD logic, stats, theme management
│   ├── storage.js          # localStorage read/write
│   ├── validators.js       # All regex patterns & validation logic
│   └── search.js           # Safe regex-powered live search
├── assets/
│   ├── campus.jpg.png      # Dashboard image
│   └── studentlife.png     # Sidebar image
├── seed.json               # 10+ sample task records
├── tests.html              # In-browser unit tests
└── README.md               # Project documentation

✨ Features Overview
📊 Pages & Sections
Section	Description
Dashboard	Total tasks, total duration, top tag, cap/target status, 7-day trend chart
Add / Edit Task	Form with live inline validation
Tasks Table	Sortable table with Edit/Delete actions
Search & Filter	Live regex search, tag filter, date filter
Settings	Duration units, theme toggle, cap/target, JSON import/export
About	Project purpose and contact info
⚙️ Core Functionality

Add, edit, and delete tasks (with delete confirmation)

Inline editing — Edit pre-fills the form

Sortable table columns:

Title

Due Date

Duration
(↑ ascending / ↓ descending toggle)

Live regex-powered search with:

Safe compilation (no crashes)

Match highlighting

Filter by:

Tag (auto-generated dropdown)

Date

Search + Sort work together

Dashboard statistics:

Total tasks

Total duration

Top tag

7-day chart

Cap / target system with ARIA live announcements

Duration unit toggle (minutes ↔ hours)

Light / Dark theme (persisted)

JSON import & export

Full keyboard accessibility

localStorage persistence

🎞️ Animations & Transitions

Task rows fade in with staggered animation

Stat cards lift on hover with shadow

Feature cards gently scale on hover

Buttons lift on hover and press on click

Form inputs glow blue on focus

Table rows highlight on hover

🔐 Regex Catalog

All patterns live in Scripts/validators.js.

🏷️ Title Validation
/^(?!\s)(?!.*\s$)(?!.*\s{2,}).{2,100}$/


No leading/trailing spaces

No consecutive spaces

Length: 2–100 characters

⏱️ Duration Validation
/^[1-9]\d{0,4}$/


Positive integers only (1–99999)

No decimals, zero, or leading zeros

📅 Due Date Validation
/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/


Strict YYYY-MM-DD format

Secondary calendar check catches impossible dates

🏷️ Tag Validation
/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/


Letters only

Single spaces or hyphens allowed

No leading/trailing separators

🔁 Duplicate Word Detection (Advanced)
/\b(\w+)\s+\1\b/i


Uses back-references to catch:

"the the"

"Math Math"

"study study"

🔍 Safe Live Search Compiler
export function compileRegex(input, flags = "i") {
  try {
    return input ? new RegExp(input, flags) : null;
  } catch {
    return null;
  }
}


Prevents crashes from invalid regex input

⌨️ Keyboard Shortcuts
Shortcut	Action
Tab / Shift+Tab	Navigate elements
Enter / Space	Activate buttons
Escape	Close dialogs
Alt + A	Jump to Add Task
Alt + D	Jump to Dashboard
Alt + T	Jump to Tasks Table
Alt + S	Jump to Settings
Alt + /	Focus Search
Skip Link	Jump to main content
♿ Accessibility Highlights

Semantic landmarks: header, nav, main, section, footer

Proper heading hierarchy

All inputs paired with <label>

ARIA live regions for:

Task status updates

Search results count

Cap/target alerts

WCAG AA color contrast (light & dark)

Fully usable keyboard-only

💾 Data Persistence
localStorage Keys
Key	Purpose
clp_tasks	All task records
clp_settings	Theme, unit, cap/target
Task Data Model
{
  "id": "rec_1748293847362_412",
  "title": "Linear Algebra Assignment",
  "duration": 90,
  "dueDate": "2025-10-15",
  "tag": "Homework",
  "createdAt": "2025-10-01T08:00:00.000Z",
  "updatedAt": "2025-10-01T08:00:00.000Z"
}

🌱 Seed Data

seed.json contains 10+ diverse tasks covering:

Edge-case durations

Multiple tags

Date ranges for chart testing

Multi-word tags

Load it via:
Settings → Import JSON → select seed.json

🧪 Testing

Open tests.html directly in the browser.

Covers:

Title validation (including duplicate words)

Duration edge cases

Date validation

Tag validation

Safe regex compilation

Search filtering logic

🚀 Running Locally

No dependencies required.

git clone https://github.com/HenrietteIraguha/your-repo-name.git
cd your-repo-name


Because ES modules are used, run a local server:

# Python
python -m http.server 8000


Then visit:
👉 http://localhost:8000

🎥 Demo Video

📹 Insert unlisted YouTube / Drive link here

Demo includes:

Keyboard-only navigation

CRUD operations

Sorting & searching

Regex edge cases

ARIA announcements

Responsive layout

👩‍💻 Author

Henriette Iraguha

GitHub: https://github.com/HenrietteIraguha

Email: h.iraguha@alustudent.com

© 2026 Campus Life Planner