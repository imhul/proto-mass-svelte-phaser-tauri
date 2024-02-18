<script lang="ts">
    import config from '$lib/utils/config';

    let hovered = false;
    let subHovered = false;
</script>

<footer>
    <nav>
        {#each config.footerMenu as item, i (item.id)}
            <div
                class="menu-link"
                role="menuitem"
                tabindex={i}
                on:mouseover={() => (hovered = true)}
                on:focus={() => (hovered = true)}
                on:mouseleave={() => (hovered = false)}
            >
                <i class="icon-{item.icon}" />
                {#if hovered && item.submenu?.length}
                    <nav
                        class="submenu"
                        id={item.id}
                        class:active={hovered}
                    >
                        {#each item.submenu as subitem (subitem.id)}
                            {#if item.id === subitem.parent}
                                <div
                                    role="menuitem"
                                    tabindex={i}
                                    on:mouseover={() =>
                                        (subHovered = true)}
                                    on:focus={() =>
                                        (subHovered = true)}
                                    on:mouseleave={() =>
                                        (subHovered = false)}
                                    class="submenu-link"
                                    class:hover={subHovered}
                                >
                                    <i class="icon-{subitem.icon}" />
                                </div>
                            {/if}
                        {/each}
                    </nav>
                {/if}
            </div>
        {/each}
    </nav>
</footer>

<style lang="scss">
    footer {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: max-content;
        height: rem(80);
        transform: translateX(-50%);
        background-color: var(--half-transparent);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 rem(20);

        nav {
            @extend %nav;

            height: rem(80);

            &.submenu {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                opacity: 0;
                transition:
                    opacity 0.35s,
                    bottom 0.35s;

                &.active {
                    bottom: rem(80);
                    opacity: 1;
                }

                .submenu-link {
                    @extend %flex-center;

                    background: var(--transparent);
                    font-size: rem(40);

                    i {
                        color: var(--game-color);
                        margin-left: rem(10);
                    }

                    &.hover {
                        background: var(--transparent);

                        i {
                            color: var(--game-color-darker);
                            text-shadow: none;
                        }
                    }
                }
            }

            .menu-link {
                @extend %flex-center;

                background: var(--transparent);
                font-size: rem(40);

                i {
                    color: var(--game-color);
                    margin-left: rem(10);
                }

                &:hover {
                    background: var(--transparent);

                    i {
                        color: var(--game-color-darker);
                        text-shadow: none;
                    }
                }
            }
        }
    }
</style>
