<script lang="ts">
    import { getContext } from 'svelte';
    // types
    import type { MouseEventHandler } from 'svelte/elements';
    // stores
    import save from '$lib/store/save';
    import settings from '$lib/store/settings';
    // utils
    import {
        loadSave,
        makeSave,
        fullscreen,
        minimize,
        toggleFullscreen
    } from '$lib/utils/actions';

    let fullscreenChecked = false;
    const { close } = getContext('simple-modal') as {
        close: MouseEventHandler<HTMLElement>;
    };

    const onFullscreen = () => {
        if ($settings.isFullscreen) {
            toggleFullscreen(false);
            minimize();
        } else {
            toggleFullscreen(true);
            fullscreen();
        }
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
    <h1 class="title">Settings</h1>
    <div class="list">
        <div class="list-item">
            <div class="list-item-text">
                <h3>Fullscreen mode</h3>
            </div>
            <div class="list-item-input">
                <input
                    id="fullscreen-switch"
                    type="checkbox"
                    on:change={onFullscreen}
                    bind:checked={fullscreenChecked}
                />
                <label for="fullscreen-switch" class="switch-label">
                    {#if fullscreenChecked}
                        <i class="icon-Iacute1" />
                    {:else}
                        <i class="icon-V6" />
                    {/if}
                </label>
            </div>
        </div>

        <div class="list-item">
            <div class="btn-flex-wrapper">
                <button on:click={() => makeSave($save)}>
                    <i class="icon-degree1" /> Save Game
                </button>

                <button on:click={() => loadSave()}>
                    <i class="icon-degree1" /> Load Game
                </button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .big-modal {
        @extend %big-modal;

        .list {
            .list-item {
                &-input {
                    flex: 0 0 rem(20);
                    width: rem(20);
                    height: rem(20);
                    margin: rem(10);

                    input {
                        &[type='checkbox'] {
                            display: none;
                        }
                    }

                    label {
                        cursor: pointer;

                        &.switch-label {
                            position: relative;
                            display: block;
                            width: rem(20);
                            height: rem(20);
                            background-color: var(--game-color-light);

                            i {
                                position: absolute;
                                top: 0;
                                left: rem(20);
                                font-size: rem(20);
                            }
                        }
                    }
                }

                .btn-flex-wrapper {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    margin-top: rem(20);

                    button {
                        display: flex;
                        align-items: center;
                        height: rem(30);
                        padding: 0 rem(20);
                        background-color: var(--game-color-light);
                        border: rem(2) solid var(--game-color-darkest);
                        cursor: pointer;

                        @include font(
                            rem(14),
                            400,
                            1,
                            var(--game-color-darkest)
                        );

                        &:hover {
                            background-color: var(--game-color-dark);
                            color: var(--game-color-light);
                        }

                        i {
                            width: rem(20);
                            font-size: rem(20);
                        }
                    }
                }
            }
        }
    }
</style>
