{#await import('$lib/game/loader.svelte') then app}
    <svelte:component this={app.default} />
{/await}
