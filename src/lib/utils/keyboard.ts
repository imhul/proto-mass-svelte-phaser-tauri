import { invoke } from '@tauri-apps/api/tauri';

export const onKeydown = (e: KeyboardEvent) => {
    console.info('pressed keyboard key: ', e.key);

    if (e.key === 'f11') {
        // js
        // const elem = document.documentElement;
        // if (!elem.requestFullscreen) return;
        // elem.requestFullscreen();

        // rust
        async function fullscreen() {
            await invoke('fullscreen');
        }
    }
};
