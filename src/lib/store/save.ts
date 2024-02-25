import { derived } from 'svelte/store';
import stats from '$lib/store/stats';
import tasks from '$lib/store/task';
import { units } from '$lib/store/unit';

const save = derived(
    [stats, units, tasks],
    ([$stats, $units, $tasks]) => {
        return {
            stats: {
                ...$stats,
                taskList: $tasks,
                units: $units
            }
        };
    }
);

export default save;
