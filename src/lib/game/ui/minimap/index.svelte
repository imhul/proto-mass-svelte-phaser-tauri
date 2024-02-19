<script lang="ts">
    // store
    import settings from '$lib/store/settings';
    import { messages } from '$lib/store/notify';
    // components
    import { onMount } from 'svelte';

    const defaultPosition = 'right';

    onMount(() => {
        if (!$settings.minimapEnabled) return;
        const isMinimapExist = $messages.find(
            m => m.id === 'minimap'
        );
        if (isMinimapExist) return;

        messages.add({
            id: 'minimap',
            title: 'Minimap',
            aside: $settings.minimapPosition ?? defaultPosition,
            fixed: true,
            parent: 'minimap'
        });
    });
</script>
