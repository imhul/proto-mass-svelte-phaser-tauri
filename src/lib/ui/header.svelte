<script lang="ts">
    import settings from '$lib/store/settings';

    export let isSaveLoaded: boolean = false;

    const gameContinue = () => {
        settings.set({
            ...$settings,
            isSaveExists: true,
            isNewGame: false
        });
    };

    const startNewGame = () => {
        settings.set({
            ...$settings,
            isSaveExists: false,
            isNewGame: true
        });
    };
</script>

<header>
    <div class="title">
        <!-- svelte-ignore missing-declaration -->
        Proto-Mass <span class="small">v</span>{PKG.version}
    </div>
    <nav>
        {#if isSaveLoaded}
            <a
                href="/game#continue"
                on:click={gameContinue}
                class="menu-link"
            >
                <span>continue</span>
            </a>

            <a
                href="/game#new"
                on:click={startNewGame}
                class="menu-link"
            >
                <span>new game</span>
            </a>
        {:else}
            <a
                href="/game#new"
                on:click={startNewGame}
                class="menu-link"
            >
                <span>new game</span>
            </a>
        {/if}

        <a
            href="https://github.com/imhul/proto-mass-svelte-phaser-tauri/blob/master/README.md"
            target="_blank"
            class="menu-link"
        >
            <span>About</span>
        </a>
        <a
            href="https://www.buymeacoffee.com/blashirkz"
            target="_blank"
            class="menu-link"
        >
            <span>Donate</span>
        </a>
    </nav>
</header>

<style lang="scss">
    header {
        z-index: 1;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: rem(80);
        width: 100%;
        padding: 0 rem(30);
        background-color: var(--game-color-dark);

        .title {
            @include font(
                rem(22),
                400,
                1,
                var(--game-color),
                var(--8-bit)
            );

            text-transform: uppercase;
            text-shadow: rem(2) rem(2) 0 var(--game-color-darkest);

            .small {
                text-transform: none;
            }
        }

        nav {
            @extend %nav;

            .menu-link {
                span {
                    font-size: rem(22);
                    font-family: var(--8-bit);
                    color: var(--game-color);
                }

                &:hover {
                    background-color: var(--game-color);
                    span,
                    a {
                        color: var(--game-color-darkest);
                        text-shadow: rem(2) rem(2) 0
                            var(--game-color-warn);
                    }
                }
            }
        }
    }
</style>
