<script>
    import Modal from 'svelte-simple-modal';
    // styles
    import '../scss/index.scss';
</script>

<Modal
    closeButton={false}
    classBg="modal-bg"
    classWindowWrap="modal-window-wrap"
    classWindow="modal-window"
    classContent="modal-content"
>
    <div class="game">
        <slot />
    </div>
</Modal>

<style lang="scss">
    .game {
        position: relative;
        display: contents;
    }
</style>
