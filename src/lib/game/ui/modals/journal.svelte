<script lang="ts">
    import { getContext } from 'svelte';
    // types
    import type { Message } from '$lib/types';
    import type { MouseEventHandler } from 'svelte/elements';
    // store
    import { messages } from '$lib/store/notify';

    const { close } = getContext('simple-modal') as {
        close: MouseEventHandler<HTMLElement>;
    };
    $: archive = $messages.filter(
        (message: Message) => message.archived
    );
</script>

<div class="big-modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
        class="icon-forbid close"
        role="button"
        tabindex="0"
        on:click|stopPropagation={close}
    />
    <h1 class="title">Actions Journal</h1>
    <div class="list">
        {#each archive as message (message.id)}
            <div class="list-item">
                <div class="list-item-icon">
                    {#if message.img}
                        <img src={message.img} alt={message.title} />
                    {:else if message.icon}
                        <i class="icon-{message.icon}" />
                    {:else}
                        <i class="icon-question7" />
                    {/if}
                </div>
                <div class="list-item-text">
                    <h3>{message.title}</h3>
                    <p>{message.message}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .big-modal {
        @extend %big-modal;

        .list {
            margin-top: rem(50);

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
                        margin-top: rem(10);
                    }
                }
            }
        }
    }
</style>
