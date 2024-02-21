import { writable } from 'svelte/store';
// type
import type { Stats } from '$lib/types';

const initState: Stats = {
    id: '',
    colony: {
        id: '',
        name: 'Autopia',
        level: 20 // 1-20
    },
    objects: [],
    map: [],
    units: [],
    taskList: [],
    gameInitTime: 0,
    saveDate: new Date().getMilliseconds(),
    playHours: 0,
    minimapEnabled: true,
    minimapPosition: 'right',
    volume: 50,
    isFullscreen: false,
    complexity: 'normal', // easy, normal, hard
    theme: 'dark' // dark, light, oldschool
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
