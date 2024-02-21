import type { Keyboard } from '$lib/types';
import { writable } from 'svelte/store';

const initState = {
    key: '',
    ctrl: {
        isCtrl: false,
        key: '',
        code: ''
    },
    alt: {
        isAlt: false,
        key: '',
        code: ''
    },
    shift: {
        isShift: false,
        key: '',
        code: ''
    },
    meta: {
        isMeta: false,
        key: '',
        code: ''
    }
};

function createKeyboard() {
    const { subscribe, set, update } = writable<Keyboard>(initState);

    return {
        subscribe,
        set,
        update,
        reset: () => set(initState)
    };
}

const keyboard = createKeyboard();

export default keyboard;
