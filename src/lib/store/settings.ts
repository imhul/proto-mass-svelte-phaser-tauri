import { writable } from 'svelte/store';
// type
import type { Settings } from '$lib/types/ui';

const initState: Settings = {
    volume: 0.5,
    isFullscreen: false,
    complexity: 'normal', // easy, normal, hard
    theme: 'dark', // dark, light, oldschool
    zoom: 100,
    gameHours: 0,
    notifyTimeout: 3000, // ms
    loadingPercent: 0,
    isGameInit: false,
    isGameLoaded: false,
    isGameStarted: false,
    isGamePaused: false,
    isGameOver: false,
    isGameMenuOpen: false,
    isGameWin: false,
    gameInitTime: 0,
    date: new Date()
};

function createSettings() {
    const { subscribe, set, update } = writable<Settings>(initState);

    return {
        subscribe,
        set,
        update,
        reset: () => set(initState)
    };
}

const settings = createSettings();

export default settings;
