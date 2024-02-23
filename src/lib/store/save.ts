import { derived } from 'svelte/store';
import stats from '$lib/store/stats';
import tasks from '$lib/store/task';
import settings from '$lib/store/settings';

// TODO: fix the settings and stats stores. Save file seems old format
const save = derived(
    [stats, tasks, settings],
    ([$stats, $tasks, $settings]) => {
        return {
            $stats: {
                ...$stats,
                taskList: $tasks
            },
            $settings
        };
    }
);

export default save;
