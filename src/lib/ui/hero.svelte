<h1>Proto-Mass<br /><i class="icon-i1" /></h1>

<style lang="scss">
    h1 {
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%) scale(1);
        position: absolute;
        text-align: center;
        text-shadow:
            rem(4) rem(4) 0 var(--color-primary),
            rem(8) rem(8) 0 var(--color-secondary);
        margin: 0 0 rem(10);
        animation: playHero 20s ease-in-out;
        user-select: none;
        touch-action: none;

        @include font(13rem, 500, 1, var(--color-hero), var(--hero));
    }
</style>
