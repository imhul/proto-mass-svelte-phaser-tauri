import type { IScene } from '$lib/types';
import { writable } from 'svelte/store';

function createSceneInstance() {
    const { subscribe, set, update } = writable<IScene | null>(null);

    return {
        subscribe,
        set,
        update,
        reset: () => set({} as IScene)
    };
}

export const sceneInstance = createSceneInstance();
