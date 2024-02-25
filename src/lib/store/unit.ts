import { writable } from 'svelte/store';
import type { IUnit, ShortUnit } from '$lib/types';

export const unit = writable<IUnit | null>(null);

function unitCollection() {
    const { subscribe, set, update } = writable<ShortUnit[]>([]);

    return {
        subscribe,
        set,
        update,
        reset: () => set([])
    };
}

export const units = unitCollection();
