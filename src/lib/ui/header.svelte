<header>
    <a href="/" class="logo">
        <i class="icon-i1" />
    </a>

    <nav>
        <a href="/game" class="menu-link">
            <!-- <i class="icon-Y15"></i> -->
            <span>game</span>
        </a>
        <a
            href="https://github.com/imhul/proto-mass-svelte-phaser-tauri/blob/master/README.md"
            rel="noopener noreferrer"
            target="_blank"
            class="menu-link"
        >
            <!-- <i class="icon-Y15"></i> -->
            <span>About</span>
        </a>
        <a
            href="https://www.patreon.com/protomass"
            rel="noopener noreferrer"
            target="_blank"
            class="menu-link"
        >
            <!-- <i class="icon-dollar3"></i> -->
            <span>Donate</span>
        </a>
    </nav>
</header>

<style lang="scss">
    header {
        z-index: 1;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: rem(80);
        width: 100%;
        padding: 0 rem(30);
        background-color: var(--game-color-dark);

        .logo {
            font-size: rem(32);
            color: var(--game-color);
            text-shadow: rem(2) rem(2) 0 var(--game-color-darkest);

            &:hover {
                color: var(--game-color-darkest);
                text-shadow: rem(2) rem(2) 0 var(--game-color-warn);
            }
        }

        nav {
            @extend %nav;
        }
    }
</style>
