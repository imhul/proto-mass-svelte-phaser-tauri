import { writable } from 'svelte/store';
// type
import type { Stats } from '$lib/types/ui';

const initState: Stats = {
    id: '',
    colony: {
        id: '',
        name: 'Autopia',
        level: 0
    },
    objects: [],
    map: [],
    units: [],
    taskList: []
};

function createStats() {
    const { subscribe, set, update } = writable<Stats>(initState);

    return {
        subscribe,
        set,
        update,
        reset: () => set(initState)
    };
}

const stats = createStats();

export default stats;
