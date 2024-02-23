import { derived } from 'svelte/store';
import stats from '$lib/store/stats';
import tasks from '$lib/store/task';

const save = derived([stats, tasks], ([$stats, $tasks]) => {
    return {
        stats: {
            ...$stats,
            taskList: $tasks
        }
    };
});

export default save;
