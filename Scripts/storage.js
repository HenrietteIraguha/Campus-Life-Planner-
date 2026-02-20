//handling loacl storage for campus planner under keys 

const TASKS_KEY = "clp_tasks";
const SETTINGS_KEY = "clp_settings";

export function readTasks() {
    try {
        const raw = localStorage.getItem(TASKS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Failed to load tasks:", error);
        return [];
    }
}

export function saveTasks(tasks) {
    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Failed to save tasks:", error);
    }
}

export function showSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) {
            return getDefaultSettings();
        }
        const parsed = JSON.parse(raw);
        return { ...getDefaultSettings(), ...parsed };
    } catch (error) {
        console.error("Failed to load settings:", error);
        return getDefaultSettings();
    }
}

export function saveSettings(settings) {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error("Failed to save settings:", error);
    }
}

function getDefaultSettings() {
    return {
        unit: "minutes",
        theme: "light",
        capTarget: 0
    };
}