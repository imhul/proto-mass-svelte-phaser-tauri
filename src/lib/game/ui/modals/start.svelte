<script lang="ts">
    import { getContext } from 'svelte';
    // types
    import type { MouseEventHandler } from 'svelte/elements';

    const { close } = getContext('simple-modal') as {
        close: MouseEventHandler<HTMLElement>;
    };
</script>

<div class="big-modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
        class="icon-forbid close"
        role="button"
        tabindex="0"
        on:click|stopPropagation={close}
    />
    <h1 class="title">New Game</h1>
    <div class="list"></div>
</div>
