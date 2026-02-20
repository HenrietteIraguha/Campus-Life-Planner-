// ui.js Handles all DOM rendering, user interactions, live search,setting controls, import/export and announcements 

import {
    getTasks,
    addTask,
    editTask,
    deleteTask,
    getStats,
    getSettings,
    updateSettings,
    applyTheme
} from './state.js';

import { compileRegex } from './validators.js';
import { filterTasks } from './search.js';

const taskTableBody = document.querySelector('#task-list');
const form = document.querySelector('#task-form');
const formFields = {
    title: document.querySelector('#title'),
    duration: document.querySelector('#duration'),
    dueDate: document.querySelector('#due-date'),
    tag: document.querySelector('#tag'),
};

const errorFields = {
    title: document.querySelector('#title-error'),
    duration: document.querySelector('#duration-error'),
    dueDate: document.querySelector('#due-date-error'),
    tag: document.querySelector('#tag-error'),
};
// search and filter controlling 

const searchInput = document.querySelector('#search');
const filterTagSelect = document.querySelector('#filter-tag');
const filterDateInput = document.querySelector('#filter-date');
const searchStatus = document.querySelector('#search-status');
const statusEl = document.querySelector('#status');
const capStatusEl = document.querySelector('#cap-status');

const unitSelect = document.querySelector('#unit');
const themeSelect = document.querySelector('#theme-toggle');
const capInput = document.querySelector('#cap');
const importBtn = document.querySelector('#import-json');
const exportBtn = document.querySelector('#export-json');
const importFile = document.querySelector('#import-file');

let sortKey = null;
let sortAsc = true;

function sortTasks(tasks) {
    if (!sortKey) return tasks;
    return [...tasks].sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
        if (sortKey === 'duration') {
            valA = Number(valA);
            valB = Number(valB);
            return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });
}

export function displayTasks(tasks = getTasks(), highlightPattern = null) {
    taskTableBody.innerHTML = '';

    if (tasks.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" style="text-align:center;"> No tasks found.</td>`;
        taskTableBody.appendChild(tr);
        return;
    }

    tasks.forEach(task => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${highlightText(task.title, highlightPattern)}</td>
            <td>${task.dueDate}</td>
            <td>${task.duration}</td>
            <td>${highlightText(task.tag, highlightPattern)}</td>
            <td>
                <button class="edit-btn" data-id="${task.id}" aria-label="Edit ${task.title}">Edit</button>
                <button class="delete-btn" data-id="${task.id}" aria-label="Delete ${task.title}">Delete</button>
            </td>
        `;

        taskTableBody.appendChild(tr);
    });

    addTableClicks();
    fillTagFilter();
}

function highlightText(text, regex) {
    if (!regex) return text;
    try {
        return text.replace(regex, m => `<mark>${m}</mark>`);
    } catch {
        return text;
    }
}

function addTableClicks() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            fillForm(btn.dataset.id);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.dataset.id;
            if (confirm('Are you sure you want to delete this task?')) {
                const result = deleteTask(btn.dataset.id);
                if (result.success) {
                    displayTasks();
                    updateStats();
                    showStatus('Task deleted successfully.', 'polite');
                } else {
                    showStatus(result.error, 'assertive');
                }
            }
        });
    });
}

document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch (e.key) {
            case 'a':
                e.preventDefault();
                document.querySelector('#add-task').scrollIntoView();
                formFields.title.focus();
                break;
            case 'd':
                e.preventDefault();
                document.querySelector('#dashboard').scrollIntoView();
                break;
            case 't':
                e.preventDefault();
                document.querySelector('#records').scrollIntoView();
                break;
            case 's':
                e.preventDefault();
                document.querySelector('#settings').scrollIntoView();
                break;
            case '/':
                e.preventDefault();
                searchInput.focus();
                break;
        }
    }
});

function fillForm(taskId) {
    const task = getTasks().find(t => t.id === taskId);
    if (!task) return;

    form.dataset.editingId = taskId;
    formFields.title.value = task.title;
    formFields.duration.value = task.duration;
    formFields.dueDate.value = task.dueDate;
    formFields.tag.value = task.tag;

    form.querySelector('button[type="submit"]').textContent = 'Update Task';
    formFields.title.focus();
}

function clearErrors() {
    Object.values(errorFields).forEach(el => {
        if (el) el.textContent = '';
    });
}

function showFieldError(field, message) {
    if (errorFields[field]) {
        errorFields[field].textContent = message;
    }
}

function showError(error) {
    const fieldMap = { title: 'title', duration: 'duration', date: 'dueDate', tag: 'tag' };
    const match = Object.keys(fieldMap).find(key => error.toLowerCase().includes(key));
    match ? showFieldError(fieldMap[match], error) : showStatus(error, 'assertive');
}

function afterSave(message, isEdit = false) {
    if (isEdit) {
        delete form.dataset.editingId;
        form.querySelector('button[type="submit"]').textContent = 'Save Task';
    }
    form.reset();
    displayTasks();
    updateStats();
    showStatus(message, 'polite');
}

form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    const taskData = {
        title: formFields.title.value,
        duration: formFields.duration.value,
        dueDate: formFields.dueDate.value,
        tag: formFields.tag.value,
    };

    const editingId = form.dataset.editingId;

    if (editingId) {
        const result = editTask(editingId, taskData);
        if (result.success) {
            afterSave('Task updated successfully.', true);
        } else {
            showError(result.error);
        }
    } else {
        const result = addTask(taskData);
        if (result.success) {
            afterSave('Task added successfully.');
        } else {
            showError(result.error);
        }
    }
});

searchInput.addEventListener('input', useFilters);
filterTagSelect.addEventListener('change', useFilters);
filterDateInput.addEventListener('change', useFilters);

function useFilters() {
    const query = searchInput.value.trim();
    const selectedTag = filterTagSelect.value;
    const selectedDate = filterDateInput.value;
    const regex = compileRegex(query, 'gi');

    let tasks = getTasks();

    if (query) {
        tasks = filterTasks(tasks, query);
    }

    if (selectedTag) {
        tasks = tasks.filter(t => t.tag === selectedTag);
    }

    if (selectedDate) {
        tasks = tasks.filter(t => t.dueDate === selectedDate);
    }

    searchStatus.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''} found.`;

    tasks = sortTasks(tasks);
    displayTasks(tasks, regex);
}

function fillTagFilter() {
    const tasks = getTasks();
    const tags = [...new Set(tasks.map(t => t.tag))].sort();
    const currentValue = filterTagSelect.value;

    filterTagSelect.innerHTML = '<option value="">All Tags</option>';
    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        if (tag === currentValue) option.selected = true;
        filterTagSelect.appendChild(option);
    });
}

function drawChart(data) {
    const canvas = document.querySelector('#weekly-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 400;
    canvas.height = 150;

    const max = Math.max(...data, 1);
    const gap = canvas.width / 6;
    const today = new Date();
    const points = [];

    data.forEach((val, i) => {
        points.push({
            x: i * gap,
            y: 110 - (val / max) * 90
        });
    });

    ctx.strokeStyle = '#2E6E8E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((p, i) => {
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    points.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#E8A020';
        ctx.fill();

        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        ctx.fillStyle = '#555';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.toLocaleDateString('en-US', { weekday: 'short' }), p.x, 145);
    });
}

export function updateStats() {
    const stats = getStats();

    document.querySelector('#total-tasks').textContent = stats.totalTasks;
    document.querySelector('#total-duration').textContent = stats.totalDuration + ' ' + stats.unit;
    document.querySelector('#top-tag').textContent = stats.topTag || 'None';

    document.querySelector('#cap-limit').textContent = stats.capStatus.capTarget;
    document.querySelector('#cap-used').textContent = stats.capStatus.totalDuration;
    document.querySelector('#cap-remaining').textContent = Math.abs(stats.capStatus.remaining);

    if (capStatusEl) {
        if (stats.capStatus.capTarget === 0) {
            capStatusEl.setAttribute('aria-live', 'polite');
            capStatusEl.textContent = 'No cap set. Go to Settings to set a limit.';
        } else if (stats.capStatus.status === 'over') {
            capStatusEl.setAttribute('aria-live', 'assertive');
            capStatusEl.textContent = `Cap exceeded by ${Math.abs(stats.capStatus.remaining)} min!`;
        } else {
            capStatusEl.setAttribute('aria-live', 'polite');
            capStatusEl.textContent = `${stats.capStatus.remaining} min remaining.`;
        }
    }
    drawChart(stats.last7Days);
}

function loadSettingsUI() {
    const settings = getSettings();
    if (unitSelect) unitSelect.value = settings.unit || 'minutes';
    if (themeSelect) themeSelect.value = settings.theme || 'light';
    if (capInput) capInput.value = settings.capTarget || '';
    applyTheme(settings.theme || 'light');
}

unitSelect.addEventListener('change', () => {
    updateSettings({ unit: unitSelect.value });
    updateStats();
    showStatus('Duration unit updated.', 'polite');
});

themeSelect.addEventListener('change', () => {
    updateSettings({ theme: themeSelect.value });
    applyTheme(themeSelect.value);
    showStatus('Theme updated.', 'polite');
});

capInput.addEventListener('change', () => {
    const value = parseInt(capInput.value, 10);
    if (!isNaN(value) && value >= 0) {
        updateSettings({ capTarget: value });
        updateStats();
        showStatus('Cap target updated.', 'polite');
    }
});

exportBtn.addEventListener('click', () => {
    const tasks = getTasks();
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campus-planner-tasks.json';
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Tasks exported successfully.', 'polite');
});

importBtn.addEventListener('click', () => {
    importFile.click();
});

importFile.addEventListener('change', () => {
    const file = importFile.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const parsed = JSON.parse(e.target.result);

            if (!Array.isArray(parsed)) {
                showStatus('Import failed: File must contain an array of tasks.', 'assertive');
                return;
            }

            const isValid = parsed.every(item =>
                item.id &&
                item.title &&
                item.dueDate &&
                item.duration &&
                item.tag
            );

            if (!isValid) {
                showStatus('Import failed: One or more tasks are missing required fields.', 'assertive');
                return;
            }

            parsed.forEach(task => {
                addTask({
                    title: task.title,
                    duration: String(task.duration),
                    dueDate: task.dueDate,
                    tag: task.tag,
                });
            });

            displayTasks();
            updateStats();
            showStatus(`${parsed.length} tasks imported successfully.`, 'polite');

        } catch {
            showStatus('Import failed: Invalid JSON file.', 'assertive');
        }
    };
    reader.readAsText(file);
    importFile.value = '';
});

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (sortKey === key) {
            sortAsc = !sortAsc;
        } else {
            sortKey = key;
            sortAsc = true;
        }
        document.querySelectorAll('.sort-btn').forEach(b => {
            b.textContent = b.dataset.key.charAt(0).toUpperCase() +
                b.dataset.key.slice(0) + ' ↕';
        });
        btn.textContent = btn.dataset.key === 'dueDate' ? 'Due Date' :
            btn.dataset.key.charAt(0).toUpperCase() +
            btn.dataset.key.slice(1);
        btn.textContent += sortAsc ? ' ↑' : ' ↓';
        useFilters();
    });
});

export function showStatus(message, mode = 'polite') {
    if (!statusEl) return;
    statusEl.setAttribute('aria-live', mode);
    statusEl.textContent = message;
}

loadSettingsUI();
displayTasks();
updateStats();