import { writable } from 'svelte/store';
// type
import type { Settings } from '$lib/types/ui';

const initState: Settings = {
    volume: 0.5,
    isFullscreen: false,
    complexity: 'normal', // easy, normal, hard
    theme: 'dark', // dark, light, oldschool
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
    saveDate: new Date().getMilliseconds(),
    mapWidth: 1600,
    mapHeight: 800,
    idLength: new Array(16),
    sceneID: 'proto_mass_main_scene',
    focusColor: 0x86bfda,
    playHours: 0,
    minimapEnabled: true,
    minimapPosition: 'right',
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
