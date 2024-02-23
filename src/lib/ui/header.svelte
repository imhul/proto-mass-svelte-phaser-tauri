<script lang="ts">
    import { goto } from '$app/navigation';
    import { bind } from 'svelte-simple-modal';
    // store
    import settings from '$lib/store/settings';
    import stats from '$lib/store/stats';
    import { modal } from '$lib/store/modal';
    // components
    import Confirm from '$lib/game/ui/modals/confirm.svelte';
    import Modal from 'svelte-simple-modal';

    export let isSaveLoaded: boolean = false;
    const message =
        'WARNING! This action ' +
        'will delete your previous save! ' +
        'Are you sure you want to start a new game?';

    const onOkay = () => {
        settings.set({
            ...$settings,
            isSaveExists: true,
            isNewGame: true
        });
        stats.reset();
        stats.set({
            ...$stats,
            gameInitTime: new Date().getTime()
        });
        goto('/game');
    };

    const gameContinue = () => {
        settings.set({
            ...$settings,
            isSaveExists: true,
            isNewGame: false
        });
    };

    const startNewGame = () => {
        if (isSaveLoaded) {
            modal.set(bind(Confirm, { message, onOkay }));
        } else {
            settings.set({
                ...$settings,
                isSaveExists: false,
                isNewGame: true
            });
            stats.reset();
            stats.set({
                ...$stats,
                gameInitTime: new Date().getTime()
            });
            goto('/game');
        }
    };
</script>

<Modal
    id="confirm-dialog"
    show={$modal}
    closeButton={false}
    closeOnEsc={false}
    closeOnOuterClick={false}
    classBg="modal-bg"
    classWindowWrap="modal-window-wrap"
    classWindow="modal-window"
    classContent="modal-content"
/>

<header>
    <div class="title">
        <!-- svelte-ignore missing-declaration -->
        Proto-Mass <span class="small">v</span>{PKG.version}
    </div>
    <nav>
        {#if isSaveLoaded}
            <a href="/game" on:click={gameContinue} class="menu-link">
                <span>continue</span>
            </a>

            <a
                href="/game"
                on:click|preventDefault={startNewGame}
                class="menu-link"
            >
                <span>new game</span>
            </a>
        {:else}
            <a
                href="/game"
                on:click|preventDefault={startNewGame}
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
