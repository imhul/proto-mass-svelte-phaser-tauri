<script lang="ts">
    // store
    import stats from '$lib/store/stats';
    import { memoizedTask } from '$lib/store/task';
    // utils
    import config from '$lib/utils/config';
    import getId from '$lib/utils/getId';
    // types
    import type { SubmenuIten } from '$lib/types';
    // assets
    // import solarPlantImg from '$lib/assets/sprites/solar-plant.png';

    let menuId = '';
    let submenuId = '';
    let timer: NodeJS.Timeout;
    $: colonyLevel = $stats.colony.level;

    const mouselive = () => {
        timer = setTimeout(() => {
            menuId = '';
            clearTimeout(timer);
        }, 3000);
    };

    const mouseover = (id: string) => {
        menuId = id;
        if (timer) clearTimeout(timer);
    };

    const commonHandler = (command: SubmenuIten) => {
        const id = getId('task-id', command.id);
        memoizedTask.set({
            id,
            status: 'await',
            level: command.level,
            type: command.task,
            workerId: '',
            priority: 1,
            profession: command.profession,
            professionLevel: 'trainee',
            limit: 1,
            position: { x: 0, y: 0 },
            context: command.id,
            icon: command.icon
        });
        // if (!$sceneInstance) return;
        // $sceneInstance.input.mouse?.requestPointerLock();
        // console.log('new task: ', $memoizedTask);
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
                            {#if item.id === subitem.parent && subitem.level >= colonyLevel && subitem.forMenu}
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
                                        commonHandler(subitem)}
                                >
                                    <i
                                        class="submenu-icon icon-{subitem.icon}"
                                        class:small={subitem.small}
                                    />
                                    <div class="tooltip">
                                        {subitem.description}
                                    </div>
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

                .menu-icon {
                    font-size: rem(40);
                    color: var(--game-color);
                    // margin-left: rem(10);
                }

                .menu-icon,
                .submenu-icon {
                    &.small {
                        font-size: rem(50) !important;
                    }
                }

                &:hover {
                    background: var(--transparent);

                    .menu-icon {
                        color: var(--game-color-darker);
                        text-shadow: rem(2) rem(2) 0
                            var(--game-color-light);
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
                    padding: 0 rem(20) 0 rem(40);

                    &.active {
                        bottom: rem(80);
                        opacity: 1;
                    }

                    .submenu-link {
                        @extend %flex-center;

                        width: rem(60);
                        height: rem(80);
                        line-height: rem(80);
                        text-transform: uppercase;
                        text-shadow: rem(2) rem(2) 0
                            var(--game-color-darkest);
                        cursor: pointer;

                        .submenu-icon {
                            @extend %flex-center;

                            position: relative;
                            font-size: rem(40);
                            color: var(--game-color);

                            &::before {
                                position: absolute;
                                transform: translateX(-50%);
                            }
                        }

                        .tooltip {
                            position: absolute;
                            top: rem(-20);
                            left: 0;
                            display: none;

                            @include font(
                                rem(12),
                                400,
                                1,
                                var(--game-color-light)
                            );
                        }

                        &.hover {
                            .submenu-icon {
                                color: var(--game-color-darker);
                                text-shadow: rem(2) rem(2) 0
                                    var(--game-color-light);
                            }

                            .tooltip {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
