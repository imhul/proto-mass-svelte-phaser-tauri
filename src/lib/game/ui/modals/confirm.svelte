<script lang="ts">
    import { getContext } from 'svelte';
    // types
    // import type { MouseEventHandler } from 'svelte/elements';

    export let message = '';
    export let onCancel = () => {};
    export let onOkay = () => {};

    const { close } = getContext('simple-modal') as {
        close: Function;
    };

    function _onCancel() {
        onCancel();
        close();
    }

    function _onOkay() {
        onOkay();
        close();
    }
</script>

<div class="small-modal">
    <h1 class="title">Confirm</h1>
    <p>{message}</p>
    <div class="btn-flex-wrapper">
        <button on:click={_onCancel}>Cancel</button>
        <button on:click={_onOkay}>Confirm</button>
    </div>
</div>

<style lang="scss">
    .small-modal {
        h1.title {
            position: absolute;
            left: rem(10);
            top: rem(6);
            font-size: rem(20);
            font-family: var(--8-bit);
            text-shadow: rem(2) rem(2) 0 var(--game-color-light);
        }

        p {
            margin-top: rem(50);
            font-size: rem(18);
            text-align: center;
        }

        .btn-flex-wrapper {
            @extend %btn-flex-wrapper;
        }
    }
</style>
