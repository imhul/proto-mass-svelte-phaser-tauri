<script lang="ts">
    import svelteLogo from '$lib/assets/logo/svelte.svg';
    import phaserLogo from '$lib/assets/logo/phaser.svg';
    import tauriLogo from '$lib/assets/logo/tauri.svg';
</script>

<footer>
    <div class="col" />
    <div class="col">
        <span>Powered by</span>
        <img src={tauriLogo} height="30" alt="tauri logo" />
        <span>+</span>
        <img src={phaserLogo} height="30" alt="phaser logo" />
        <span>+</span>
        <img src={svelteLogo} height="30" alt="svelte logo" />
    </div>
</footer>

<style lang="scss">
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: rem(80);
        width: 100%;
        padding: 0 rem(30);
        background-color: var(--transparent);

        .col {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            & > * {
                margin-left: rem(10);
            }

            span {
                font-family: var(--8-bit);
                color: var(--game-color);
                text-shadow: rem(2) rem(2) 0 var(--game-color-darkest);
            }
        }
    }
</style>
