//  the state\.js uses validators.js for validation and storage.js for persistence

import {
    validateTitle,
    validateDuration,
    validateDate,
    validateTag
} from './validators.js';

import {
    loadTasks,
    saveTasks,
    loadSettings,
    saveSettings
} from './storage.js';

// the tasks and settings are loaded from the local storage

const state = {
    tasks: loadTasks(),    
    settings: loadSettings(),
};

// Generating  unique IDs for each new task 

function generateId() {
    return 'rec_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}


// validates all the fiels for a new task

export function addTask({ title, duration, dueDate, tag }) {

    const vTitle = validateTitle(title);
    if (!vTitle.valid) return { success: false, error: vTitle.message };

    const vDuration = validateDuration(duration);
    if (!vDuration.valid) return { success: false, error: vDuration.message };

    const vDate = validateDate(dueDate);
    if (!vDate.valid) return { success: false, error: vDate.message };

    const vTag = validateTag(tag);
    if (!vTag.valid) return { success: false, error: vTag.message };

// building a task using values returned by the validator
    const newTask = {
        id: generateId(),
        title: vTitle.value,
        duration: vDuration.value,
        dueDate: vDate.value,
        tag: vTag.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    state.tasks.push(newTask);
    saveTasks(state.tasks);

    return { success: true, task: newTask };
}


// Finds an existing task by ID and  validates the new field values,

export function editTask(id, { title, duration, dueDate, tag }) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return { success: false, error: "Task not found." };

    
    const vTitle = validateTitle(title);
    if (!vTitle.valid) return { success: false, error: vTitle.message };

    const vDuration = validateDuration(duration);
    if (!vDuration.valid) return { success: false, error: vDuration.message };

    const vDate = validateDate(dueDate);
    if (!vDate.valid) return { success: false, error: vDate.message };

    const vTag = validateTag(tag);
    if (!vTag.valid) return { success: false, error: vTag.message };


    task.title = vTitle.value;
    task.duration = vDuration.value;
    task.dueDate = vDate.value;
    task.tag = vTag.value;
    task.updatedAt = new Date().toISOString();

    saveTasks(state.tasks);

    return { success: true, task };
}


//Removes a task from state by its ID

export function deleteTask(id) {
    const index = state.tasks.findIndex(t => t.id === id);
    if (index === -1) return { success: false, error: "Task not found." };

    const deleted = state.tasks.splice(index, 1)[0];
    saveTasks(state.tasks);

    return { success: true, task: deleted };
}




export function getTasks() {
    return [...state.tasks]; 
}


export function updateSettings(newSettings) {
    state.settings = { ...state.settings, ...newSettings };
    saveSettings(state.settings);
    return state.settings;
}

export function getSettings() {
    return { ...state.settings };
}


// Applies the chosen theme  to the html element
export function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}


// summarises the stats for dashboard from the task list

export function getStats() {
    const totalTasks = state.tasks.length;
    const totalDurationMinutes = state.tasks.reduce((sum, t) => sum + t.duration, 0);

 const unit = state.settings.unit;
    const totalDuration = unit === "hours"
        ? parseFloat((totalDurationMinutes / 60).toFixed(1))
        : totalDurationMinutes;

    
    const tagCount = {};
    state.tasks.forEach(t => {
        tagCount[t.tag] = (tagCount[t.tag] || 0) + 1;
    });

    
    let topTag = null;
    let maxCount = 0;
    for (const [tag, count] of Object.entries(tagCount)) {
        if (count > maxCount) {
            maxCount = count;
            topTag = tag;
        }
    }

    const last7Days = Array(7).fill(0);
const now = new Date();
state.tasks.forEach(t => {
    const parts = t.dueDate.split('-');
    const taskDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const diffDays = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays < 7) {
        last7Days[6 - diffDays] += t.duration;
    }
});

    
    const capTarget = state.settings.capTarget || 0;
    const remaining = capTarget - totalDuration;
    const capStatus = {
        totalDuration,
        capTarget,
        remaining,
        status: remaining >= 0 ? "under" : "over"
    };

    return { totalTasks, totalDuration,unit, topTag, last7Days, capStatus };
}
