// tauri
import { invoke } from '@tauri-apps/api/tauri';
// store
import user from '$lib/store/user/auth';

async function fullscreen() {
    await invoke('fullscreen');
}

async function minimize() {
    await invoke('minimize');
}

const toggleFullscreen = (val: boolean) => {
    user.update(state => {
        return {
            ...state,
            settings: {
                ...state.settings,
                isFullscreen: val
            }
        };
    });
};

const getFullscreen = () => {
    let isFullscreen: boolean = false;
    user.subscribe(value => {
        isFullscreen = value.settings.isFullscreen;
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
