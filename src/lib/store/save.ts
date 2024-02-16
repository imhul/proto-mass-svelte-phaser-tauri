import { derived } from 'svelte/store';
import stats from '$lib/store/stats';
import settings from '$lib/store/settings';

const save = derived([stats, settings], ([$stats, $settings]) => {
    return {
        $stats,
        $settings
    };
});

export default save;
