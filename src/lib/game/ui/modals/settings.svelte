<script lang="ts">
    import { getContext, onDestroy } from 'svelte';
    // types
    import type { MouseEventHandler } from 'svelte/elements';
    import type { Complexity } from '$lib/types';
    // stores
    import save from '$lib/store/save';
    import stats from '$lib/store/stats';
    import settings from '$lib/store/settings';
    // utils
    import {
        loadSave,
        makeSave,
        fullscreen,
        minimize,
        toggleFullscreen,
        killWindow,
        getSave
    } from '$lib/utils/actions';
    import getId from '$lib/utils/getId';
    import { millisToTimeString } from '$lib/utils/date';

    let currentTab = 'Settings';
    let fullscreenChecked = false;
    let currentComplexity =
        $stats.complexity === 'easy'
            ? 0
            : $stats.complexity === 'normal'
              ? 1
              : 2;
    const tabs = ['Settings', 'Controls'];
    const complexity: Complexity[] = ['easy', 'normal', 'hard'];
    const { close } = getContext('simple-modal') as {
        close: Function;
    };

    const onFullscreen = () => {
        if ($stats.isFullscreen) {
            toggleFullscreen(false);
            minimize();
        } else {
            toggleFullscreen(true);
            fullscreen();
        }
    };

    const changeComplexity = () => {
        currentComplexity =
            (currentComplexity + 1) % complexity.length;
        $stats.complexity = complexity[currentComplexity];
    };

    const onSave = async () => {
        const localSave = await getSave();
        const isSaveIdExist = Boolean(localSave?.stats.id?.length);
        const isColonyIdExist = Boolean(
            localSave?.stats.colony.id?.length
        );

        const newSave = !isSaveIdExist
            ? {
                  ...$save,
                  stats: {
                      ...$stats,
                      id: getId('save', 'id'),
                      colony:
                          !isColonyIdExist || !$stats.colony.id
                              ? {
                                    ...$stats.colony,
                                    id: getId('colony', 'id')
                                }
                              : $stats.colony,
                      saveDate: new Date().getTime()
                  }
              }
            : {
                  ...$save,
                  stats: {
                      ...$stats,
                      saveDate: new Date().getTime()
                  }
              };

        makeSave(newSave);
    };

    const beforeExit = async () => {
        await onSave();
        await killWindow();
    };

    const onClose = () => {
        settings.set({
            ...$settings,
            isGameMenuOpen: false,
            isGamePaused: false
        });
        close();
    };

    // component lifecycle
    onDestroy(() => {
        onClose();
    });
</script>

<div class="big-modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
        class="icon-forbid close"
        role="button"
        tabindex="0"
        on:click|stopPropagation|stopPropagation={onClose}
    />

    <div class="tabs">
        <div class="tabs-controls">
            {#each tabs as tab, i}
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h1
                    class="title"
                    role="button"
                    tabindex={i}
                    on:click|stopPropagation={() =>
                        (currentTab = tab)}
                >
                    {tab}
                </h1>
            {/each}
        </div>

        <div class="tab-content">
            {#if currentTab === 'Controls'}
                <div class="box">
                    <span class="key-abs key-a">A</span>
                    <span class="key-abs key-s">S</span>
                    <span class="key-abs key-d">D</span>
                    <span class="key-abs key-w">W</span>
                    <i class="icon-semicolon" />
                </div>
                <div class="bottom">
                    <span class="key-rel key-e"
                        >E<span> - Zoom in</span></span
                    >
                    <span class="key-rel key-q"
                        >Q<span> - Zoom out</span></span
                    >
                    <span class="key-rel key-p"
                        >P<span> - Pause Game</span></span
                    >
                    <span class="key-rel key-r"
                        >R<span> - Resume Game</span></span
                    >
                    <span class="key-rel key-f11"
                        >F11<span> - Enter Foolscreen</span></span
                    >
                    <span class="key-rel key-esc"
                        >Esc<span> - Exit Foolscreen</span></span
                    >
                </div>
            {:else}
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
                            <label
                                for="fullscreen-switch"
                                class="switch-label"
                            >
                                {#if fullscreenChecked}
                                    <i class="icon-Iacute1" />
                                {:else}
                                    <i class="icon-V6" />
                                {/if}
                            </label>
                        </div>
                    </div>

                    <div class="list-item">
                        <div class="list-item-text">
                            <h3>Volume</h3>
                        </div>
                        <div class="list-item-input large">
                            <input
                                type="range"
                                id="volume"
                                min="0"
                                max="100"
                                step="1"
                                bind:value={$stats.volume}
                            />
                            <label
                                for="volume"
                                style="display:none;"
                            />
                        </div>
                    </div>

                    <div class="list-item">
                        <div class="list-item-text">
                            <h3>complexity</h3>
                        </div>
                        <div class="list-item-input large">
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <span
                                on:click|stopPropagation={changeComplexity}
                            >
                                {complexity[currentComplexity]}
                            </span>
                        </div>
                    </div>

                    <div class="list-item">
                        <div class="list-item-text">
                            <h3>Playing Time</h3>
                        </div>
                        <div class="list-item-input large">
                            <span>
                                {millisToTimeString($stats.playTime)}
                            </span>
                        </div>
                    </div>

                    <div class="list-item">
                        <div class="btn-flex-wrapper">
                            <button
                                class="btn"
                                on:click|stopPropagation={onSave}
                            >
                                <i class="icon-degree1" /> Save Game
                            </button>

                            <button
                                class="btn"
                                on:click|stopPropagation={() =>
                                    loadSave()}
                            >
                                <i class="icon-degree1" /> Load Game
                            </button>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="btn-flex-wrapper">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <button
                                class="btn"
                                on:click|stopPropagation={onClose}
                            >
                                <i class="icon-W8 rm-10" /> Resume
                            </button>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="btn-flex-wrapper">
                            <a
                                class="btn"
                                href="/"
                                on:click|stopPropagation={onClose}
                            >
                                <i class="icon-Otilde1 rm-10" /> Exit to
                                menu
                            </a>
                            <button
                                class="btn"
                                on:click|stopPropagation={beforeExit}
                            >
                                <i class="icon-Ntilde rm-10" /> Exit
                            </button>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="btn-flex-wrapper"></div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .big-modal {
        @extend %big-modal;

        .tabs {
            height: 100%;

            .tabs-controls {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-bottom: rem(20);

                h1.title {
                    position: relative;
                    display: block;
                    cursor: pointer;
                    padding: rem(10);
                    margin-right: rem(10);
                    transition: background-color 0.35s ease;
                    background-color: var(--transparent);

                    &:hover {
                        background-color: var(--game-color-dark);
                    }
                }
            }

            .tab-content {
                .box {
                    position: relative;
                    width: 100%;
                    height: rem(220);

                    i {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: rem(90);
                    }

                    span {
                        &.key-abs {
                            position: absolute;
                            font-family: var(--8-bit);
                            font-size: rem(30);

                            &.key-a {
                                top: 50%;
                                left: 25%;
                                transform: translateY(-50%);
                            }

                            &.key-s {
                                bottom: 5%;
                                left: 50%;
                                transform: translateX(-50%);
                            }

                            &.key-d {
                                top: 50%;
                                right: 25%;
                                transform: translateY(-50%);
                            }

                            &.key-w {
                                top: 5%;
                                left: 50%;
                                transform: translateX(-50%);
                            }
                        }
                    }
                }

                .bottom {
                    position: relative;

                    span {
                        &.key-rel {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            margin-bottom: rem(10);
                            font-family: var(--8-bit);
                            font-size: rem(20);

                            span {
                                font-family: var(--mono);
                            }
                        }
                    }
                }

                .list {
                    height: 100%;

                    .list-item {
                        align-items: center;
                        margin-bottom: rem(10);

                        &-text {
                            padding: rem(10);
                        }

                        &-input {
                            flex: 0 0 rem(20);
                            width: rem(20);
                            height: rem(20);
                            margin: rem(10);

                            &.large {
                                flex: 0 0 rem(140);
                                width: rem(140);
                                text-align: center;
                            }

                            input {
                                &[type='checkbox'] {
                                    display: none;
                                }

                                &[type='range'] {
                                    width: 100%;
                                    appearance: none;
                                    margin: 0;

                                    &::-webkit-slider-runnable-track {
                                        width: 100%;
                                        height: rem(4);
                                        background: var(
                                            --game-color-darker
                                        );
                                        box-shadow: rem(2) rem(2) 0
                                            var(--game-color-light);
                                        cursor: pointer;
                                    }

                                    &::-moz-range-track {
                                        width: 100%;
                                        height: rem(4);
                                        background: var(
                                            --game-color-darker
                                        );
                                        cursor: pointer;
                                        box-shadow: rem(2) rem(2) 0
                                            var(--game-color-light);
                                    }

                                    &::-webkit-slider-thumb {
                                        width: rem(16);
                                        height: rem(16);
                                        margin-top: rem(-6);
                                        background: var(
                                            --game-color-darker
                                        );
                                        cursor: pointer;
                                        appearance: none;
                                        box-shadow: rem(2) rem(2) 0
                                            var(--game-color-light);
                                    }

                                    &::-moz-range-thumb {
                                        width: rem(20);
                                        height: rem(20);
                                        margin-top: rem(-6);
                                        background: var(
                                            --game-color-darker
                                        );
                                        cursor: pointer;
                                        appearance: none;
                                        box-shadow: rem(2) rem(2) 0
                                            var(--game-color-light);
                                    }

                                    &:focus {
                                        outline: none;

                                        &::-webkit-slider-runnable-track {
                                            background: var(
                                                --game-color-darker
                                            );
                                        }
                                    }
                                }
                            }

                            label {
                                cursor: pointer;

                                &.switch-label {
                                    position: relative;
                                    display: block;
                                    width: rem(20);
                                    height: rem(20);
                                    background-color: var(
                                        --game-color-light
                                    );

                                    i {
                                        position: absolute;
                                        top: 0;
                                        left: rem(20);
                                        font-size: rem(20);
                                        text-shadow: rem(2) rem(2) 0
                                            var(--game-color-light);
                                    }
                                }
                            }

                            span {
                                cursor: pointer;
                                font-size: rem(14);
                                font-family: var(--8-bit);
                                text-shadow: rem(2) rem(2) 0
                                    var(--game-color-light);
                            }
                        }

                        .btn-flex-wrapper {
                            @extend %btn-flex-wrapper;

                            padding: rem(10);

                            i.rm-10 {
                                display: block;
                                margin-right: rem(10);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
