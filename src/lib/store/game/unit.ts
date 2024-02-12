import { writable } from 'svelte/store';
import type { ICube } from '$lib/types/objects';

export const unit = writable<ICube | null>(null);

function unitCollection() {
    const { subscribe, set, update } = writable<ICube[]>([]);

    return {
        subscribe,
        set,
        update,
        reset: () => set([])
    };
}

export const units = unitCollection();
