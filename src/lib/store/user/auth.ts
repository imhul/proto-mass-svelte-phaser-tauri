import { writable } from 'svelte/store';

export interface User {
    userId: string;
    userAva: string;
    userEmail: string;
    isLoggedIn: boolean;
    userSave: {
        id: string;
        colony: {
            id: string;
            name: string;
            level: number;
        };
        objects: unknown[];
        map: unknown[];
        units: unknown[];
        taskList: unknown[];
    };
    settings: {
        volume: number;
        isFullscreen: boolean;
        complexity: 'easy' | 'normal' | 'hard';
        theme: 'dark' | 'light' | 'oldschool';
        zoom: number;
        gameHours: number;
        notifyTimeout: number;
    };
}

const initState: User = {
    userId: '',
    userAva: '',
    userEmail: '',
    isLoggedIn: true,
    userSave: {
        id: '',
        colony: {
            id: '',
            name: 'Autopia',
            level: 0
        },
        objects: [],
        map: [],
        units: [],
        taskList: []
    },
    settings: {
        volume: 0.5,
        isFullscreen: false,
        complexity: 'normal', // easy, normal, hard
        theme: 'dark', // dark, light, oldschool
        zoom: 100,
        gameHours: 0,
        notifyTimeout: 3000 // ms
    }
};

function createUnit() {
    const { subscribe, set, update } = writable<User>(initState);

    return {
        subscribe,
        set,
        update,
        reset: () => set(initState)
    };
}

export const user = createUnit();

export default user;
