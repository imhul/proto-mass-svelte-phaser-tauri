// tauri
import { invoke } from '@tauri-apps/api/tauri';
// store
import settings from '$lib/store/game/settings';

export async function fullscreen() {
    await invoke('fullscreen');
}

export async function minimize() {
    await invoke('minimize');
}

export const toggleFullscreen = (val: boolean) => {
    settings.update(state => {
        return {
            ...state,
            isFullscreen: val
        };
    });
};

export const getFullscreen = () => {
    let isFullscreen: boolean = false;
    settings.subscribe(value => {
        isFullscreen = value.isFullscreen;
    });
    return isFullscreen;
};

export const onKeydown = (e: KeyboardEvent) => {
    console.info('pressed keyboard key: ', e.key);

    if (e.key === 'F11' || e.key === 'f11' || e.key === 'f') {
        const isFullscreen = getFullscreen();

        if (isFullscreen) {
            toggleFullscreen(false);
            minimize();
        } else {
            toggleFullscreen(true);
            fullscreen();
        }
    }

    if (e.key === 'Escape') {
        toggleFullscreen(false);
        minimize();
    }

    // if (e.key === 'p')
    // if (e.key === 'r')
};
