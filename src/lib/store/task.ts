import { writable } from 'svelte/store';
import type { Task } from '$lib/types';

const initState: Task[] = [];
const initTask: Task = {} as Task;

function createTasks() {
    // TODO: Create a tasks store
    const { subscribe, set, update } = writable<Task[]>(initState);

    return {
        subscribe,
        set,
        update,
        add: (task: Task) => {
            return update((allTasks: Task[]) => {
                allTasks.push(task);
                // memoizedTask.set(initTask);
                return allTasks;
            });
        },
        reset: () => set(initState),

        delete: (id: string) =>
            update((allTasks: Task[]) => {
                const current = allTasks.find(task => task.id === id);

                if (!current) return allTasks;

                return allTasks.filter(
                    task => task.id !== current.id
                );
            })
    };
}

const createMemoizedTask = () => {
    const { subscribe, set, update } = writable<Task>(initTask);

    return {
        subscribe,
        set,
        update,
        reset: () => set(initTask)
    };
};

export const memoizedTask = createMemoizedTask();

const tasks = createTasks();

export default tasks;
