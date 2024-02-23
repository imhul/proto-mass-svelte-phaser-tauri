<script lang="ts">
    import { onMount } from 'svelte';
    // components
    import Hero from '$lib/ui/hero.svelte';
    import Header from '$lib/ui/header.svelte';
    import Footer from '$lib/ui/footer.svelte';
    // utils
    import { loadSave } from '$lib/utils/actions';

    let isSaveLoaded = false;

    onMount(async () => {
        const save = await loadSave();
        if (save) {
            isSaveLoaded = true;
        }
    });
</script>

<div class="container">
    <Header isSaveLoaded />
    <main>
        <Hero />
    </main>
    <Footer />
</div>

<style lang="scss">
    .container {
        width: 100%;
        background: url('/images/bg.gif') no-repeat 50% 50%;
        background-size: cover;

        main {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            min-height: 100%;
            height: calc(100vh - 10rem);
            transform: perspective(18.75rem) rotateX(20deg);
        }
    }
</style>
