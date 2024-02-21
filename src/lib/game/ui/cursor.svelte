<script>
    import { spring } from 'svelte/motion';
    // store
    import { memoizedTask } from '$lib/store/task';

    const mouseCoords = spring({ x: 0, y: 0 });
    const onMouseMove = event => {
        $mouseCoords = { x: event.x, y: event.y };
    };

    export let img = '';
    // export let icon = '';
</script>

<svelte:window on:mousemove={onMouseMove} />

{#if $memoizedTask.context?.length}
    <div
        class="cursor"
        style:--x={`${$mouseCoords.x}px`}
        style:--y={`${$mouseCoords.y}px`}
        style:--img={`url(${img})`}
    />
{/if}

<style lang="scss">
    .cursor {
        z-index: 9999;
        position: absolute;
        top: 0;
        left: 0;
        width: rem(150);
        height: rem(122);
        background: var(--img) no-repeat center center / cover;
        pointer-events: none;

        transform: translate(-50%, -50%)
            translate(var(--x, 0), var(--y, 0));
    }
</style>
