<script lang="ts">
    // utils
    import config from '$lib/utils/config';
    // store
    import stats from '$lib/store/stats';

    let menuId = '';
    let submenuId = '';
    let timer: NodeJS.Timeout;
    $: colonyLevel = $stats.colony.level;

    const mouselive = () => {
        timer = setTimeout(() => {
            menuId = '';
            clearTimeout(timer);
        }, 99000);
    };

    const mouseover = (id: string) => {
        menuId = id;
        if (timer) clearTimeout(timer);
    };

    const commonHandler = (id: string, isMenu = true) => {
        console.log('type: ', id);
        console.log('isMenu: ', isMenu);
    };
</script>

<footer>
    <nav>
        {#each config.footerMenu as item, i (item.id)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="menu-link"
                role="menuitem"
                tabindex={i}
                class:active={menuId === item.id}
                on:mouseover={() => mouseover(item.id)}
                on:focus={() => mouseover(item.id)}
                on:mouseleave={mouselive}
                on:click={() =>
                    !item.submenu && commonHandler(item.id)}
            >
                <i
                    class="menu-icon icon-{item.icon}"
                    class:small={item.small}
                />
                {#if menuId === item.id && item.submenu?.length}
                    <nav
                        class="submenu"
                        id={item.id}
                        class:active={menuId === item.id}
                        on:mouseover={() => mouseover(item.id)}
                        on:focus={() => mouseover(item.id)}
                    >
                        {#each item.submenu as subitem (subitem.id)}
                            {#if item.id === subitem.parent}
                                <div
                                    role="menuitem"
                                    tabindex={i}
                                    class="submenu-link"
                                    class:hover={submenuId ===
                                        subitem.id}
                                    on:mouseover={() =>
                                        (submenuId = subitem.id)}
                                    on:focus={() =>
                                        (submenuId = subitem.id)}
                                    on:mouseleave={() =>
                                        (submenuId = '')}
                                    on:click={() =>
                                        commonHandler(
                                            subitem.id,
                                            false
                                        )}
                                >
                                    <i
                                        class="submenu-icon icon-{subitem.icon}"
                                        class:small={subitem.small}
                                    />
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

            .menu-link {
                @extend %flex-center;

                background: var(--transparent);
                font-size: rem(40);

                .menu-icon {
                    color: var(--game-color);
                    margin-left: rem(10);
                }

                &:hover {
                    background: var(--transparent);

                    .menu-icon {
                        color: var(--game-color-darker);
                        text-shadow: none;
                    }
                }

                nav.submenu {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    opacity: 0;
                    transition:
                        opacity 0.35s,
                        bottom 0.35s;
                    background-color: var(--half-transparent);
                    padding: 0 rem(20);
                    // pointer-events: none;

                    &.active {
                        bottom: rem(80);
                        opacity: 1;
                    }

                    .submenu-link {
                        @extend %flex-center;

                        display: block;
                        height: rem(80);
                        padding: 0 rem(20);
                        line-height: rem(80);
                        text-transform: uppercase;
                        text-shadow: rem(2) rem(2) 0
                            var(--game-color-darkest);
                        cursor: pointer;
                        font-size: rem(40);
                        // pointer-events: auto;

                        .submenu-icon {
                            color: var(--game-color);
                            margin-left: rem(10);
                        }

                        &.hover {
                            // background: var(--transparent);

                            .submenu-icon {
                                color: var(--game-color-darker);
                                text-shadow: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
