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

- 🌐 **Live Demo:** *(add GitHub Pages link)*  
- 📦 **Repository:** *(add repo link)*  
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

## ✨ What You Can Do

### ✅ Task Management
- Add, edit, and delete tasks  
- Inline form validation with instant feedback  
- Confirmation prompts before deleting  

### 📊 Smart Dashboard
- Total tasks & total study duration  
- Most-used tag  
- 7-day workload trend  
- Cap / target warnings with screen-reader alerts  

### 🔍 Search & Filter
- Live regex search (safe — never crashes)  
- Filter by tag or date  
- Sorting and filtering work together  

### 🎨 Personalization
- Light / Dark mode  
- Minutes ↔ Hours toggle  
- All preferences saved automatically  

---

## 🖼️ Interface Overview

| Section | What You See |
|----------|------------------------------|
| 📊 Dashboard | Stats, trends, workload insights |
| 📋 Tasks | Sortable, searchable task table |
| 🎛️ Settings | Theme, time format, import/export |
| ♿ Accessibility | Keyboard & screen-reader support |

---

## ⌨️ Keyboard Friendly (No Mouse Needed)

| Shortcut | Action |
|----------|--------|
| Alt + A | Add task |
| Alt + D | Dashboard |
| Alt + T | Tasks |
| Alt + S | Settings |
| Alt + / | Search |
| Esc | Close dialogs |

✔ Skip link included  
✔ Visible focus states  
✔ Screen-reader announcements  

---

## ♿ Accessibility First (Not an Afterthought)

- Semantic HTML landmarks  
- Proper heading hierarchy  
- ARIA live regions for dynamic updates  
- WCAG AA color contrast  
- Fully usable with keyboard only  

This project was designed with accessibility from day one — not patched in later.

---

## 🧠 Under the Hood

<details>
<summary><strong>📁 File Structure</strong></summary>

```
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
```

</details>

<details>
<summary><strong>🔐 Regex Validation</strong></summary>

- Title length & spacing rules  
- Duplicate word detection (e.g., Math Math)  
- Strict date format + calendar validation  
- Positive numeric durations only  
- Clean tag names (letters, spaces, hyphens)  

All regex logic lives in validators.js.

</details>

<details>
<summary><strong>💾 Data Persistence</strong></summary>

- Tasks and settings stored in localStorage  
- JSON import/export with structure validation  
- Data survives page reloads  

</details>

<details>
<summary><strong>🧪 Testing</strong></summary>

Open tests.html in the browser to run unit tests for:
- Validators  
- Regex safety  
- Search logic  

No libraries required.

</details>

---

## 🌱 Sample Data

A seed.json file is included with 10+ realistic tasks:
- Multiple tags  
- Edge-case durations  
- Date ranges for chart testing  

Load via:  
Settings → Import JSON → seed.json

---

## 🚀 Run Locally

```bash
git clone https://github.com/HenrietteIraguha/your-repo-name.git
cd your-repo-name
python -m http.server 8000
```

Then open:  
http://localhost:8000

---

## 👩‍💻 Author

- GitHub: https://github.com/HenrietteIraguha  
- Email: h.iraguha@alustudent.com  

---

## 🏁 Final Notes

This project demonstrates:
- Strong JavaScript architecture  
- Real-world form validation  
- Accessibility best practices  
- Clean UI/UX thinking  

No frameworks — just solid fundamentals.

© 2026 — Campus Life Planner