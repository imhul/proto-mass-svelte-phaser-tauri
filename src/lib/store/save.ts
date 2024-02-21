import { derived } from 'svelte/store';
import stats from '$lib/store/stats';
import settings from '$lib/store/settings';

// TODO: fix the settings and stats stores. Save file seems old format
const save = derived([stats, settings], ([$stats, $settings]) => {
    return {
        $stats,
        $settings
    };
});

export default save;
