{#await import('$lib/game/output.svelte') then app}
    <svelte:component this={app.default} />
{/await}
