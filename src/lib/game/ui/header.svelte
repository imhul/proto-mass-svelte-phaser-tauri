<script lang="ts">
    import { getContext } from 'svelte';
    // store
    import settings from '$lib/store/settings';
    // components
    import Tooltip from '$lib/ui/tooltip.svelte';
    import Journal from '$lib/game/ui/modals/journal.svelte';
    import Settings from '$lib/game/ui/modals/settings.svelte';
    import Taskboard from '$lib/game/ui/modals/taskboard.svelte';

    const { open } = getContext('simple-modal') as { open: Function };
</script>

<header>
    <nav>
        <Tooltip text="Taskboard" position="down">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
                role="button"
                tabindex={0}
                class="menu-link"
                on:click|stopPropagation={() => open(Taskboard)}
            >
                <i class="icon-Odieresis" />
            </span>
        </Tooltip>
        <Tooltip text="Journal" position="down">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
                role="button"
                tabindex={0}
                class="menu-link"
                on:click|stopPropagation={() => open(Journal)}
            >
                <i class="icon-time" />
            </span>
        </Tooltip>
        <Tooltip text="Settings" position="down">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
                role="button"
                tabindex={1}
                class="menu-link"
                on:click|stopPropagation={() => {
                    settings.set({
                        ...$settings,
                        isGameMenuOpen: true,
                        isGamePaused: true
                    });
                    open(Settings);
                }}
            >
                <i class="icon-adjust" />
            </span>
        </Tooltip>
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
                        color: var(--game-color-darker);
                        text-shadow: none;
                    }
                }
            }
        }
    }
</style>
