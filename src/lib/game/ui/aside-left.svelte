<script lang="ts">
    // components
    import Board from '$lib/game/ui/board.svelte';
    // store
    import { messages } from '$lib/store/notify';
    // types
    import type { Message } from '$lib/types';

    $: boards = $messages
        ? $messages.filter((board: Message) => board.aside === 'left')
        : [];
</script>

<aside>
    {#each boards as board (board.id)}
        <Board {board} />
    {/each}
</aside>

<style lang="scss">
    aside {
        position: absolute;
        width: 13rem;
        z-index: 999;
        left: rem(16);
        top: rem(80);
    }
</style>
