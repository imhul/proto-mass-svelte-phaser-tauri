<script lang="ts">
    import { getContext } from 'svelte';
    // components
    import Journal from '$lib/game/ui/journal.svelte';
    import Settings from '$lib/game/ui/settings.svelte';

    const { open } = getContext('simple-modal') as { open: Function };
</script>

<header>
    <nav>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
            role="button"
            tabindex={0}
            class="menu-link"
            on:click|stopPropagation={() => open(Journal)}
        >
            <i class="icon-Odieresis" />
        </span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
            role="button"
            tabindex={1}
            class="menu-link"
            on:click|stopPropagation={() => open(Settings)}
        >
            <i class="icon-U10" />
        </span>
    </nav>
</header>

<style lang="scss">
    header {
        position: fixed;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        height: rem(80);

        nav {
            @extend %nav;

            .menu-link {
                background: var(--transparent);
                font-size: rem(40);

                span,
                i {
                    color: var(--game-color);
                }

                &:hover {
                    background: var(--transparent);

                    span,
                    i {
                        color: var(--game-color-light);
                        text-shadow: none;
                    }
                }
            }
        }
    }
</style>
