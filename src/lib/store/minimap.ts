import { writable } from 'svelte/store';

const initState: number[] = [0];

function createMinimap() {
    const { subscribe, set, update } = writable<number[]>(initState);

    return {
        subscribe,
        set,
        update,
        reset: () => set(initState)
    };
}

const minimap = createMinimap();

export default minimap;