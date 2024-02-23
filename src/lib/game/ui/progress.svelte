<script lang="ts">
    export let value = 0;
</script>

<div class="wrapper">
    <progress max={100} {value} />
</div>

<style lang="scss">
    .wrapper {
        @extend %flex-center;

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: url('/images/loading_1.jpg') no-repeat 50% 50%;
        background-size: cover;
        opacity: 1;
        z-index: 10000;

        progress[value] {
            position: relative;
            appearance: none;
            width: rem(300);
            height: rem(50);
            padding: rem(4);
            border-radius: 0;
            color: var(--game-color-darkest);
            border: rem(4) solid var(--game-color-darkest);
            background-color: var(--game-color-light);

            &::-webkit-progress-bar {
                background-color: var(--game-color-light);
            }

            &::before {
                content: attr(value) '%';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: rem(20);
                font-weight: bold;
                color: var(--game-color-darkest);
            }
        }

        progress[value]::-webkit-progress-value {
            background-color: var(--game-color-darker);
        }
    }
</style>
