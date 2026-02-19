// search.js handles filtering tasks by a search term 
import { compileRegex } from './validators.js';

// Filter tasks array and matches the user searchTerm
export function filterTasks(tasks, searchTerm) {
    if (!searchTerm) return tasks;

    const regex = compileRegex(searchTerm, 'i');
    if (!regex) return tasks;

    return tasks.filter(task => 
        regex.test(task.title) || regex.test(task.tag)
    );
}