<script lang="ts">
    import { getContext } from 'svelte';
    // types
    import type { MouseEventHandler } from 'svelte/elements';
    // store
    import tasks from '$lib/store/task';

    const { close } = getContext('simple-modal') as {
        close: MouseEventHandler<HTMLElement>;
    };

    $: console.info('$tasks: ', $tasks);
</script>

<div class="big-modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
        class="icon-forbid close"
        role="button"
        tabindex="0"
        on:click|stopPropagation={close}
    />
    <h1 class="title">Task Board</h1>
    <div class="list">
        {#each $tasks as task (task.id)}
            <div class="list-item">
                <div class="list-item-icon">
                    <i class="icon-{task.icon}" />
                </div>
                <div class="list-item-text">
                    <h3>{task.type}: {task.context}</h3>
                    <p>task id: {task.id}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .big-modal {
        @extend %big-modal;

        .list {
            .list-item {
                &-icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 0 0 rem(60);
                    width: rem(60);
                    height: rem(60);
                    margin: rem(10);
                    background-color: var(--game-color-warn);

                    i {
                        font-size: rem(50);
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
