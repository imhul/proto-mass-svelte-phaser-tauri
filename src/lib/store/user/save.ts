import { derived } from 'svelte/store';
import stats from '$lib/store/user/stats';
import settings from '$lib/store/game/settings';

const save = derived([stats, settings], ([$stats, $settings]) => {
    return {
        $stats,
        $settings
    };
});

export default save;
