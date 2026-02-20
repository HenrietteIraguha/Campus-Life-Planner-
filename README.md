🎓 Campus Life Planner

A clean, student-focused task planner built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just solid web fundamentals.

✨ Organize tasks • ⏱️ Track study time • 🎯 Stay on target • ♿ Fully accessible

<p align="center"> <img src="assets/campus.jpg.png" alt="Campus Life Planner preview" width="80%"> </p>
🔗 Links

🌐 Live Demo: (add GitHub Pages link)

📦 Repository: (add repo link)

🎥 Demo Video: (add unlisted link)

🌟 Why Campus Life Planner?

University life gets chaotic fast.
This app helps students see their workload clearly, plan realistically, and stay in control — all while respecting accessibility and performance best practices.

✨ What You Can Do
✅ Task Management

Add, edit, and delete tasks

Inline form validation (instant feedback)

Confirmation before deleting

📊 Smart Dashboard

Total tasks & study duration

Most-used tag

7-day workload trend

Cap/target warnings with screen-reader alerts

🔍 Search & Filter

Live regex search (safe — never crashes)

Filter by tag or date

Sorting + filtering work together

🎨 Personalization

Light / Dark theme

Minutes ↔ Hours toggle

All settings saved automatically

🖼️ Interface Preview
Dashboard	Tasks
📊 Stats + Chart	📋 Sortable Table
Settings	Accessibility
🎛️ Theme & Import	♿ Keyboard & ARIA

(You can later replace this with screenshots)

⌨️ Keyboard Friendly (No Mouse Needed)
Shortcut	Action
Alt + A	Add Task
Alt + D	Dashboard
Alt + T	Tasks
Alt + S	Settings
Alt + /	Search
Esc	Close dialogs

✔️ Skip link included
✔️ Visible focus styles
✔️ Screen reader announcements

♿ Accessibility First

Semantic HTML landmarks

Proper heading hierarchy

ARIA live regions for dynamic updates

WCAG AA color contrast

Fully usable with keyboard only

This project was built with accessibility in mind from day one, not added later.

🧠 Under the Hood (Optional Reading)
<details> <summary><strong>📁 File Structure</strong></summary>
campus-life-planner/
├── index.html
├── styles/styles.css
├── Scripts/
│   ├── ui.js
│   ├── state.js
│   ├── storage.js
│   ├── validators.js
│   └── search.js
├── assets/
├── seed.json
├── tests.html
└── README.md

</details> <details> <summary><strong>🔐 Regex Validation</strong></summary>

Title length & spacing rules

Duplicate word detection (Math Math)

Strict date format + calendar check

Positive numeric duration only

Clean tag names (letters, spaces, hyphens)

All regex logic lives in validators.js.

</details> <details> <summary><strong>💾 Data Persistence</strong></summary>

Tasks and settings stored in localStorage

JSON import/export with structure validation

Data survives page reloads

</details> <details> <summary><strong>🧪 Testing</strong></summary>

Open tests.html in the browser to run unit tests for:

Validators

Regex safety

Search logic

No libraries required.

</details>
🌱 Sample Data

A seed.json file is included with 10+ realistic tasks:

Different tags

Edge-case durations

Date ranges for chart testing

Load via:
Settings → Import JSON → seed.json

🚀 Run Locally
git clone https://github.com/HenrietteIraguha/your-repo-name.git
cd your-repo-name
python -m http.server 8000


Then open:
👉 http://localhost:8000

👩‍💻 Author

GitHub: https://github.com/HenrietteIraguha

Email: h.iraguha@alustudent.com

🏁 Final Notes

This project demonstrates:

Strong JavaScript architecture

Real-world form validation

Accessibility best practices

Clean UI/UX thinking

No frameworks — just fundamentals

© 2026 — Campus Life Planner