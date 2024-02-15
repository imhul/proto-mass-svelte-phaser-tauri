<script lang="ts">
    import { getContext } from 'svelte';
    import { goto } from '$app/navigation';
    // store
    import { isDev } from '$lib/store';
    import user from '$lib/store/user/auth';
    // components
    import AuthModal from '$lib/ui/auth.svelte';
    // utils
    import config from '$lib//utils/config';

    const { open } = getContext('simple-modal') as { open: Function };
    $: isLoggedIn = $user.isLoggedIn;

    // const goGame = () => {
    //     isLoggedIn
    //         ? goto('/game')
    //         : open(AuthModal, { message: 'Log in first!' });
    // };

    const login = () => {
        open(AuthModal);
    };

    const logout = () => {
        $user.isLoggedIn = false;
    };

    $: console.log('$isDev', $isDev);
</script>

<header>
    <a href="/" class="logo">
        <i class="icon-i1" />
    </a>

    <nav>
        {#if $user.isLoggedIn}
            <a href="{!$isDev ? config.appURL + '/game' : '/game'}" class="menu-link">
                <!-- <i class="icon-Y15"></i> -->
                <span>game</span>
            </a>
        {:else}
            {open(AuthModal, { message: 'Log in first!' })}
        {/if}

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
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
            class="menu-link"
            tabindex="0"
            role="button"
            on:click={isLoggedIn ? logout : login}
        >
            <!-- <i class="icon-Y15"></i> -->
            <span>{isLoggedIn ? 'logout' : 'login'}</span>
        </span>
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
