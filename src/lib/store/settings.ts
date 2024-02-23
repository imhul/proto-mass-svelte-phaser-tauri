import { writable } from 'svelte/store';
// type
import type { Settings } from '$lib/types';

const initState: Settings = {
    loadingPercent: 0,
    isGameInit: false,
    isGameLoaded: false,
    isGameStarted: false,
    isGamePaused: false,
    isGameOver: false,
    isGameMenuOpen: false,
    isGameWin: false,
    isSaveExists: false,
    isNewGame: true
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
