
// Handling  all localStorage interactions for the Campus Life Plannern under keys

const TASKS_KEY = "clp_tasks";
const SETTINGS_KEY = "clp_settings";


// Loads the saved tasks array from localStorage.

export function loadTasks() {
    try {
        const raw = localStorage.getItem(TASKS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);

        // Ensure we always return an array
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Failed to load tasks:", error);
        return [];
    }
}


// Saves the full tasks array to localStorage, replacing what was there before.
 
export function saveTasks(tasks) {
    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Failed to save tasks:", error);
    }
}


//  Load app settings from localStorage and if no settings are saved ,returns default settings.

 
export function loadSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) {
            return getDefaultSettings();
        }

        const parsed = JSON.parse(raw);
        return { ...getDefaultSettings(),... parsed };
    } catch (error) {
        console.error("Failed to load settings:", error);
        return getDefaultSettings();
    }
}


// Saves the settings object to localStorage, replacing the previous saved settings.

export function saveSettings(settings) {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error("Failed to save settings:", error);
    }
}

// Default app settings.

function getDefaultSettings() {
    return {
        unit: "minutes",     
        theme: "light",      
        capTarget: 0         
    };
}