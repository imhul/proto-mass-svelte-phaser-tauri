import { writable } from 'svelte/store';
import type { Task } from '$lib/types';

const initState: Task[] = [];

function createTasks() {
    // TODO: Create a tasks store
    const { subscribe, set, update } = writable<Task[]>(initState);

    return {
        subscribe,
        set,
        update,
        add: (board: Task) =>
            update((boards: Task[]) => {
                boards.push(board);
                return boards;
            }),
        reset: () => set(initState),
        delete: (id: string, type: string) =>
            update((boards: Task[]) => {
                const toTrash = () => {
                    const current = boards.find(
                        board => board.id === id
                    );
                    if (!current) return boards;
                    const filtered = boards.filter(
                        board => board !== current
                        // board => board.parent !== current.parent
                    );
                    return filtered;
                };

                const toArchive = () => {
                    boards.forEach((board: Task) => {
                        // if (board.id === id) board.archived = true;
                    });
                    return boards;
                };

                return type === 'archive' ? toArchive() : toTrash();
            })
    };
}

export const tasks = createTasks();
