<script lang="ts">
    import { browser } from '$app/environment';
    // store
    import settings from '$lib/store/settings';
    // components
    import { Game } from 'svelte-phaser';
    import Header from '$lib/game/ui/header.svelte';
    import Footer from '$lib/game/ui/footer.svelte';
    import AsideL from '$lib/game/ui/aside-left.svelte';
    import AsideR from '$lib/game/ui/aside-right.svelte';
    import Scenario from '$lib/game/scenario.svelte';
    // utils
    import { onKeydown, onKeyup } from '$lib/utils/actions';

    $: h = 0;
    $: w = 0;
</script>

<svelte:window
    bind:innerHeight={h}
    bind:innerWidth={w}
    on:contextmenu|preventDefault={() => false}
/>
<svelte:document on:keydown={onKeydown} on:keyup={onKeyup} />

{#if $settings.isGameLoaded}
    <Header />
    <AsideL />
    <AsideR />
    <Footer />
{/if}
{#if browser && w !== 0 && h !== 0}
    <Game
        physics={{ default: 'arcade' }}
        width={w}
        height={h}
        backgroundColor="#00000000"
    >
        <Scenario {w} {h} />
    </Game>
{/if}
