import { writable } from 'svelte/store';
import type { IUnit } from '$lib/types/objects';

export const unit = writable<IUnit | null>(null);

function unitCollection() {
    const { subscribe, set, update } = writable<IUnit[]>([]);

    return {
        subscribe,
        set,
        update,
        reset: () => set([])
    };
}

export const units = unitCollection();
