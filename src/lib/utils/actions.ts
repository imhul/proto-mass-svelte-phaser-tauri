// tauri
import { invoke } from '@tauri-apps/api/tauri';
// store
import settings from '$lib/store/settings';
import { messages } from '$lib/store/notify';
import stats from '$lib/store/stats';
import keyboard from '$lib/store/keyboard';
import { memoizedTask } from '$lib/store/task';
// types
import type { Save } from '$lib/types';
// utils
import {
    readTextFile,
    createDir,
    writeFile,
    exists,
    Dir
} from '@tauri-apps/api/fs';

export async function fullscreen() {
    await invoke('fullscreen')
        .then(() => console.info('fullscreened!'))
        .catch(e => console.error(e));
}

export async function minimize() {
    await invoke('minimize')
        .then(() => console.info('minimized!'))
        .catch(e => console.error(e));
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
    stats.subscribe(value => {
        isFullscreen = value.isFullscreen;
    });
    return isFullscreen;
};

export const onKeyup = (e: KeyboardEvent) => {
    if (
        e.key === 'Shift' ||
        e.code === 'ShiftLeft' ||
        e.code === 'ShiftRight'
    ) {
        memoizedTask.reset();
        keyboard.reset();
    }
};

export const onKeydown = (e: KeyboardEvent) => {
    keyboard.set({
        key: e.key || e.code,
        ctrl: {
            isCtrl: e.ctrlKey,
            key: e.key ?? '',
            code: e.code ?? ''
        },
        alt: {
            isAlt: e.altKey,
            key: e.key ?? '',
            code: e.code ?? ''
        },
        shift: {
            isShift: e.shiftKey,
            key: e.key ?? '',
            code: e.code ?? ''
        },
        meta: {
            isMeta: e.metaKey,
            key: e.key ?? '',
            code: e.code ?? ''
        }
    });

    if (
        e.key === 'F11' ||
        e.key === 'f11' ||
        e.key === 'f' ||
        e.code === 'F11' ||
        e.code === 'f11' ||
        e.code === 'f'
    ) {
        const isFullscreen = getFullscreen();

        if (isFullscreen) {
            toggleFullscreen(false);
            minimize();
        } else {
            toggleFullscreen(true);
            fullscreen();
        }
    } else if (
        e.key === 'Escape' ||
        e.code === 'Escape' ||
        e.key === 'esc' ||
        e.code === 'esc' ||
        e.key === 'Esc' ||
        e.code === 'Esc'
    ) {
        toggleFullscreen(false);
        minimize();
    } else {
        console.info('pressed keyboard key: ', e.key || e.code);
    }
};

export const makeSave = async (save: Save) => {
    const isSaveDirExist = await exists('saves', {
        dir: Dir.AppData
    });

    if (!isSaveDirExist)
        await createDir('saves', {
            dir: Dir.AppData,
            recursive: true
        });

    await writeFile(
        {
            path: 'saves\\save.json',
            contents: JSON.stringify(save)
        },
        {
            dir: Dir.AppData,
            append: false
        }
    )
        .then(() =>
            messages.add({
                id: 'game-saved-success-' + Date.now(),
                type: 'success',
                title: 'Game saved!',
                aside: 'right',
                icon: 'degree1',
                fixed: false,
                expiring: true,
                message: ''
            })
        )
        .catch(e => console.error(e));
};

export const loadSave = async () => {
    const isSaveFileExist = await exists('saves\\save.json', {
        dir: Dir.AppData
    });

    if (!isSaveFileExist) {
        // TODO: start new game here
        throw new Error('Save file does not exist!');
    }

    const saveData = await readTextFile('saves\\save.json', {
        dir: Dir.AppConfig
    });
    if (!saveData) throw new Error('Save file loading error!');
    const save = JSON.parse(saveData);

    settings.update(() => save.$settings);
    stats.update(() => save.$stats);
};
