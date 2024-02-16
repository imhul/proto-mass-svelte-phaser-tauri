<script lang="ts">
    import { getContext } from 'svelte';
    // types
    import type { MouseEventHandler } from 'svelte/elements';
    // store
    import settings from '$lib/store/game/settings';
    import {
        fullscreen,
        minimize,
        toggleFullscreen
    } from '$lib/utils/keyboard';

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i
    class="icon-forbid close"
    role="button"
    tabindex="0"
    on:click|stopPropagation={close}
/>
<div class="list">
    <div class="list-item">
        <div class="list-item-text">
            <h3>fullscreen</h3>
        </div>
        <div class="list-item-input">
            <!-- TODO: switch -->
            <input type="checkbox" on:change={onFullscreen} />
        </div>
    </div>
</div>

<style lang="scss">
    .close {
        position: absolute;
        right: rem(6);
        top: rem(6);
        font-size: rem(32);
        cursor: pointer;

        &:hover {
            color: var(--game-color-dark);
        }
    }

    .list {
        @include scrollbar(
            rem(24),
            var(--game-color-dark),
            var(--game-color-light)
        );
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 90vh;
        margin-top: rem(26);
        overflow-y: auto;
        overflow-x: hidden;

        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;

            background-color: var(--game-color);
            transition: background-color 0.3s;

            &:hover {
                background-color: var(--game-color-light);
            }

            &-input {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 0 0 rem(60);
                width: rem(60);
                height: rem(60);
                margin: rem(10);
                background-color: var(--game-color-warn);
            }

            &-text {
                flex: 1 0 calc(100% - 4.375rem);
                padding-right: rem(20);

                h3 {
                    font-size: rem(14);
                    font-family: var(--8-bit);
                    text-shadow: rem(2) rem(2) 0
                        var(--game-color-light);
                }
            }
        }
    }
</style>
