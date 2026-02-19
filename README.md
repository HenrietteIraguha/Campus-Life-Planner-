📅 Campus Life Planner

A responsive, accessible, vanilla HTML/CSS/JS web application to help students organize tasks, track study durations, and stay on top of their academic life.

🌐 Live Site: INSERT YOUR GITHUB PAGES URL HERE
📁 Repository: INSERT YOUR GITHUB REPO URL HERE

📌 Theme
Campus Life Planner — chosen from the three available themes.
Students can add tasks with a title, due date, duration, and tag; view them in a sortable table; search and filter in real time; and track their total study load against a personal cap/target — all persisted in localStorage.

📂 File Structure
campus-life-planner/
├── index.html              # Main HTML — semantic landmarks, all sections
├── styles/
│   └── styles.css          # Mobile-first CSS, Flexbox layout, 3 breakpoints, dark/light theme, animations
├── Scripts/
│   ├── ui.js               # DOM rendering, event handling, sorting, chart, import/export
│   ├── state.js            # App state, CRUD operations, stats, theme management
│   ├── storage.js          # localStorage read/write for tasks and settings
│   ├── validators.js       # All regex patterns and validation functions
│   └── search.js           # Live regex-powered search/filter logic
├── assets/
│   ├── campus.jpg.png      # Campus image (dashboard)
│   └── studentlife.png     # Student life sidebar image
├── seed.json               # 10+ diverse sample task records
├── tests.html              # In-browser unit tests for validators and search
└── README.md               # This file

✨ Features
Pages / Sections
SectionDescriptionDashboardShows total tasks, total duration, top tag, cap/target status, and a 7-day trend chartAdd / Edit TaskForm with live inline validation for title, due date, duration, and tagTasks TableSortable records table with Edit and Delete actions per rowSearch & FilterLive regex search, filter by tag dropdown, and filter by dateSettingsDuration unit toggle (minutes/hours), light/dark theme, cap/target input, JSON import/exportAboutPurpose description and contact info (GitHub + email)
Core Functionality

Add, Edit, Delete tasks with confirmation dialogs on delete
Inline form editing — clicking Edit on any row pre-fills the form
Sortable table columns — click Title, Due Date, or Duration headers to sort ascending ↑ or descending ↓; click again to reverse
Real-time regex search with safe compiler and match highlighting via <mark>
Filter by tag (dropdown, auto-populated from current tasks) and filter by date
Sort + Search combined — filters and sorting work together simultaneously
Stats dashboard with total tasks, total duration, top tag, and 7-day chart drawn on <canvas>
Cap / Target system with ARIA live announcements (polite when under, assertive when exceeded)
Duration unit conversion — display in minutes or hours (1 hour = 60 minutes) via Settings
Light / Dark theme toggle, persisted across sessions
JSON Export — downloads all tasks as a .json file
JSON Import — validates structure before loading; rejects malformed or missing-field data
localStorage persistence — all tasks and settings survive page reload
Keyboard navigation — full keyboard-only flow supported (see Keyboard Map below)

Animations & Transitions

Task rows fade in with a staggered delay every time the table renders
Stat cards lift upward on hover with a shadow effect
Feature cards scale up slightly on hover
Buttons lift on hover and press back down on click
Form inputs display a glowing blue focus ring on focus
Table rows highlight light blue on hover


🔐 Regex Catalog
All patterns live in Scripts/validators.js.
1. Title Validation
/^(?!\s)(?!.*\s$)(?!.*\s{2,}).{2,100}$/

Purpose: Forbids leading/trailing whitespace and consecutive double spaces; enforces 2–100 character length.
Passes: "Linear Algebra Assignment", "Quiz prep"
Fails: "  Leading space", "Trailing ", "Double  Space", "A" (too short)

2. Duration Validation
/^[1-9]\d{0,4}$/

Purpose: Allows positive whole numbers only (1–99999); rejects decimals, zero, and leading zeros.
Passes: "45", "120", "1"
Fails: "0", "1.5", "045", "-10"

3. Due Date Validation
/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

Purpose: Enforces strict YYYY-MM-DD format with valid month (01–12) and day (01–31) ranges. A secondary calendar check catches impossible dates like February 30.
Passes: "2025-09-15", "2026-01-01"
Fails: "2025-13-01", "2025/09/15", "2025-02-30" (calendar check)

4. Tag Validation
/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/

Purpose: Allows letters, single spaces, or hyphens between words; no leading/trailing separators or numbers.
Passes: "Homework", "Study Group", "Self-Study"
Fails: "123", "-math", "study--group", "#tag"

5. Duplicate Word Detection (Advanced — Back-Reference)
/\b(\w+)\s+\1\b/i

Purpose: Uses a capturing group and back-reference (\1) to catch consecutive duplicate words in a title.
Catches: "the the assignment", "Math Math", "study study"
Flags: i — case-insensitive, so "Math math" is also caught.
Applied in: validateTitle() — returns an error if a duplicate word pair is found.

6. Live Search Compiler (Safe)
javascriptexport function compileRegex(input, flags = "i") {
    try {
        return input ? new RegExp(input, flags) : null;
    } catch (error) {
        return null;
    }
}

Purpose: Safely wraps user-typed patterns in a try/catch so invalid regex (e.g. [unclosed) silently returns null instead of crashing.
Used in: search.js and ui.js for live filtering and highlighted results.


⌨️ Keyboard Map
ShortcutActionTabMove forward through interactive elementsShift + TabMove backward through interactive elementsEnterActivate focused button or submit formSpaceActivate focused button or toggle selectEscapeClose confirm dialogsAlt + AJump to Add Task form and focus the Title fieldAlt + DJump to Dashboard sectionAlt + TJump to Tasks tableAlt + SJump to Settings sectionAlt + /Focus the Search inputSkip LinkTab once from page load → press Enter → jumps directly to #main-content

All navigation links in the sidebar are keyboard accessible. Table sort buttons are fully keyboard operable. Focus styles are visible on all interactive elements.


♿ Accessibility Notes
Semantic Structure

Full landmark regions: <header>, <nav>, <aside>, <main>, <section>, <footer>
Proper heading hierarchy (h1 → h2 → h3) across all sections
All form inputs have explicit <label> elements bound by for/id

ARIA Live Regions
ElementRole / aria-liveWhen it speaks#statusrole="status" / aria-live (dynamic)Task added, updated, deleted, imported, exported, settings changed#search-statusrole="status" / aria-live="polite"Count of tasks matching search/filter#cap-statusrole="status" / aria-live (dynamic)polite when under cap, assertive when cap is exceeded#title-error etc.aria-live="polite"Inline field validation errors
Skip Link
A "Skip to the main content" link is the very first focusable element — it becomes visible on focus and jumps to #main-content.
Color Contrast
Both light and dark themes maintain sufficient contrast between text and background (WCAG AA compliant).
Keyboard-Only Flow
The entire app — adding tasks, editing, deleting, sorting, searching, importing/exporting, and changing settings — can be completed without a mouse.

💾 Data Persistence
localStorage Keys
KeyContentsclp_tasksJSON array of all task recordsclp_settingsJSON object: { unit, theme, capTarget }
Data Model (per task)
json{
  "id": "rec_1748293847362_412",
  "title": "Linear Algebra Assignment",
  "duration": 90,
  "dueDate": "2025-10-15",
  "tag": "Homework",
  "createdAt": "2025-10-01T08:00:00.000Z",
  "updatedAt": "2025-10-01T08:00:00.000Z"
}
Import / Export

Export: Serializes clp_tasks to a .json file download.
Import: Reads a .json file, validates it is an array, checks each item has id, title, dueDate, duration, and tag before adding. Malformed files are rejected with an ARIA-announced error message.


🧪 How to Run Tests
Open tests.html directly in your browser (no server needed):
File → Open → tests.html
The test page runs assertions against all validator functions and the search module, logging pass/fail results in the browser. It covers:

Valid and invalid title inputs (including duplicate word detection)
Valid and invalid duration values (decimals, zero, leading zeros)
Valid and invalid date formats (bad months, impossible calendar dates)
Valid and invalid tag patterns
compileRegex with invalid patterns (should return null, not throw)
filterTasks matching and non-matching cases


🌱 Seed Data
seed.json contains 10+ diverse task records with edge cases:

Tasks with very short and very long durations
Dates at the start and end of months
Multiple different tags to test filtering and top-tag stats
Multi-word tags with hyphens and spaces
Tasks spread across a date range to populate the 7-day chart

To load seed data: go to Settings → Import JSON and select seed.json.

⚙️ Settings
SettingOptionsDefaultDuration UnitMinutes / HoursMinutesThemeLight / DarkLightCap / TargetAny positive number (minutes)0 (no cap)
All settings persist via localStorage and apply immediately on change.

🚀 How to Run Locally
No build tools or dependencies required.
bashgit clone https://github.com/HenrietteIraguha/your-repo-name.git
cd your-repo-name
Then open index.html in any modern browser. Because the scripts use ES Modules (type="module"), you need a local server to avoid CORS issues:
bash# Using VS Code Live Server extension (recommended)
# Right-click index.html → Open with Live Server

# OR using Python
python -m http.server 8000
# Then visit http://localhost:8000

👩‍💻 Author
Henriette Iraguha

GitHub: HenrietteIraguha
Email: h.iraguha@alustudent.com


🎥 Demo Video

[INSERT UNLISTED YOUTUBE/DRIVE LINK HERE]

The demo covers:

Full keyboard navigation walkthrough
Adding, editing, and deleting a task
Sorting by title, date, and duration
Regex edge cases in live search (including invalid patterns)
Cap/target ARIA announcements
JSON import and export
Responsive layout across mobile, tablet, and desktop


© 2026 Campus Life Planner