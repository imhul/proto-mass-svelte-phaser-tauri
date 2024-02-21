<script lang="ts">
    // docs: https://github.com/phaserjs/examples/blob/master/public/src/depth%20sorting/isometric%20map.js
    import { onDestroy, onMount } from 'svelte';
    import Phaser from 'phaser';
    // types
    import type { IScene, Message } from '$lib/types';
    // store
    import { unit } from '$lib/store/unit';
    import settings from '$lib/store/settings';
    import { messages } from '$lib/store/notify';
    import tasks, { memoizedTask } from '$lib/store/task';
    import { sceneInstance } from '$lib/store/scene';
    // import minimap from '$lib/store/minimap';
    // components
    import { Scene } from 'svelte-phaser';
    import Background from '$lib/game/background.svelte';
    // import MinimapWrapper from '$lib/game/ui/minimap/index.svelte';
    // utils
    import { start, stop } from '$lib/utils/interval';
    import { loadSave } from '$lib/utils/actions';
    import config from '$lib/utils/config';
    import getId from '$lib/utils/getId';
    // assets
    import mapJson from '$lib/assets/sprites/isometric-grass-and-water.json';
    import tilesPng from '$lib/assets/sprites/isometric-grass-and-water.png';
    import skeletonPng from '$lib/assets/sprites/skeleton8.png';
    import solarPlantImg from '$lib/assets/sprites/solar-plant.png';
    // objects
    import Skeleton from '$lib/objects/skeleton';

    export let h = 0;
    export let w = 0;
    $: pointerX = 0;
    $: pointerY = 0;
    $: movingPionterX = 0;
    $: movingPionterY = 0;
    $: mouseButton = '';
    $: zoomSize = 1;
    const taskImgOffsetX = 250;
    const taskImgOffsetY = 150;
    $: awaitPlacement = Boolean($memoizedTask.id?.length);
    $: construction = {} as Phaser.GameObjects.Sprite;

    const cameraUpdate = () => {
        if (!$sceneInstance) return;
        const zoomCoef = w < config.mapWidth ? 1.5 : 1.2;
        zoomSize = Number(
            (
                zoomCoef +
                (w - config.mapWidth) / (2 * config.mapWidth)
            ).toFixed(2)
        );
        $sceneInstance.scale.resize(w, h);
        $sceneInstance.game.scale.resize(w, h);
        $sceneInstance.cameras.main.setBounds(
            0,
            0,
            config.mapWidth,
            config.mapHeight,
            true
        );
        $sceneInstance.cameras.main.setZoom(zoomSize);
    };

    const cameraControls = (scene: Phaser.Scene) => {
        if (!scene.input.keyboard) return;

        const controls =
            new Phaser.Cameras.Controls.SmoothedKeyControl({
                camera: scene.cameras.main,
                left: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.A
                ),
                right: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.D
                ),
                up: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.W
                ),
                down: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.S
                ),
                zoomIn: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.Q
                ),
                zoomOut: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.E
                ),
                zoomSpeed: 0.05,
                acceleration: 0.8,
                drag: 0.5,
                maxSpeed: 1,
                minZoom: 1,
                maxZoom: 2.8
            });

        controls.start();
        scene.update = function (_, delta) {
            controls.update(delta);
        };
    };

    const pause = (scene: Phaser.Scene) => {
        settings.set({
            ...$settings,
            isGamePaused: true
        });
        scene.events.emit('pause');
    };

    const resume = (scene: Phaser.Scene) => {
        settings.set({
            ...$settings,
            isGamePaused: false
        });
        scene.events.emit('resume');
    };

    const onSceneKeyup = (e: KeyboardEvent, scene: Phaser.Scene) => {
        if (e.key === 'p') pause(scene);
        if (e.key === 'r') resume(scene);
    };

    const preload = (scene: Phaser.Scene) => {
        sceneInstance.set(scene as IScene);
        scene.load.json('map', mapJson);
        scene.load.spritesheet('tiles', tilesPng, {
            frameWidth: 64,
            frameHeight: 64
        });
        scene.load.spritesheet('skeleton', skeletonPng, {
            frameWidth: 128,
            frameHeight: 128
        });
        scene.load.image('solar-plant', solarPlantImg);
        scene.load.image('stars-1', '/images/parallax_1.png');
        scene.load.image('stars-2', '/images/parallax_2.png');
        scene.load.image('stars-3', '/images/parallax_3.png');
    };

    const buildMap = (scene: Phaser.Scene) => {
        //  Parse the data out of the map
        const data = scene.cache.json.get('map');
        const tilewidth = data.tilewidth;
        const tileheight = data.tileheight;
        const layer = data.layers[0].data;
        // const minimapLayer = layer;
        // minimapLayer.length = minimapLayer.length - 1;
        // minimap.set(minimapLayer);
        const mapwidth = data.layers[0].width;
        const mapheight = data.layers[0].height;
        const tileWidthHalf = tilewidth / 2;
        const tileHeightHalf = tileheight / 2;
        const centerX = mapwidth * tileWidthHalf;
        const centerY = 16;
        let i = 0;

        for (let y = 0; y < mapheight; y++) {
            for (let x = 0; x < mapwidth; x++) {
                const id = layer[i] - 1;
                const tx = (x - y) * tileWidthHalf;
                const ty = (x + y) * tileHeightHalf;
                const tile = scene.add.image(
                    centerX + tx,
                    centerY + ty,
                    'tiles',
                    id
                );

                tile.depth = centerY + ty;

                i++;
            }
        }
    };

    const unitFocus = (scene: Phaser.Scene) => {
        if (!$unit) return;
        $unit.setTint(config.focusColor);
        scene.cameras.main.startFollow($unit);
        $messages.forEach((board: Message) => {
            if (board.parent === 'unit')
                messages.delete(board.id, 'delete');
        });
        messages.add({
            id: 'click-unit-' + $unit.name,
            type: 'info',
            title: 'Name: Skeleton',
            aside: 'right',
            icon: 'a10',
            fixed: true,
            parent: 'unit',
            message: ''
        });
    };

    const unitBlur = () => {
        if (!$unit) return;
        $unit.clearTint();
        if (!$sceneInstance) return;
        $sceneInstance.cameras.main.stopFollow();
    };

    const crteateSceleton = (scene: Phaser.Scene) => {
        const skeletonId = getId('unit', 'skeleton');

        unit.set(
            new Skeleton(
                skeletonId,
                scene,
                620,
                140,
                'walk',
                'south',
                380
            )
        );

        if (!$unit) return;
        $unit.setInteractive();
        scene.add.existing($unit);
        $unit.on('pointerdown', () => unitFocus(scene));
    };

    const onMouseMoveOverScene = (pointer: Phaser.Input.Pointer) => {
        movingPionterX = pointer.x;
        movingPionterY = pointer.y;
        // TODO: moving sprite with cursor !!!
        if ($sceneInstance && $memoizedTask.context?.length) {
            if (!construction) {
                construction = $sceneInstance.add.sprite(
                    pointer.x,
                    pointer.y,
                    $memoizedTask.context
                );
            }

            construction.x = pointer.x + taskImgOffsetX; // construction.x = pointer.x
            construction.y = pointer.y - taskImgOffsetY; // construction.y = pointer.y
            construction.x = Phaser.Math.Wrap(pointer.x, 0, w);
            construction.y = Phaser.Math.Wrap(pointer.y, 0, h);
            construction.depth = pointer.y + config.offsetZ;
        }
    };

    const onMouseDownScene = (pointer: Phaser.Input.Pointer) => {
        pointerX = pointer.x;
        pointerY = pointer.y;

        // if ($sceneInstance?.input.mouse?.locked) $sceneInstance.input.mouse.releasePointerLock();

        if (pointer.leftButtonDown()) {
            mouseButton = 'left';

            if ($memoizedTask.id?.length && !awaitPlacement) {
                awaitPlacement = true;
            } else if (
                $memoizedTask.context?.length &&
                awaitPlacement &&
                $sceneInstance
            ) {
                const newConstruction = $sceneInstance.add.sprite(
                    pointer.x,
                    pointer.y,
                    $memoizedTask.context
                );
                newConstruction.depth =
                    newConstruction.y + config.offsetZ;
                tasks.add({
                    ...$memoizedTask,
                    position: { x: pointerX, y: pointerY }
                });
                awaitPlacement = false;
                memoizedTask.reset();
            }
        } else if (pointer.rightButtonDown()) {
            mouseButton = 'right';
            unitBlur();
            awaitPlacement && memoizedTask.reset();
            $messages.forEach((board: Message) => {
                if (board.parent === 'unit')
                    messages.delete(board.id, 'delete');
            });
        }

        // for journal
        const id = getId('message-id', mouseButton);
        messages.add({
            id,
            title: `Name: ${mouseButton}`,
            aside: 'right',
            message: `x: ${pointerX}, y: ${pointerY}`
        });
    };

    const create = (scene: Phaser.Scene) => {
        if (scene.input.keyboard)
            scene.input.keyboard.on(
                'keyup',
                (event: KeyboardEvent) => onSceneKeyup(event, scene),
                scene
            );

        scene.events.on('pause', pause);
        scene.events.on('resume', resume);

        // The mini map
        (scene as IScene).minimap = scene.cameras
            .add(20, 20, 200, 200)
            .setZoom(0.2)
            .setName('mini');
        (scene as IScene).minimap.setBackgroundColor(0x0f2a3f);
        (scene as IScene).minimap.scrollX = 800;
        (scene as IScene).minimap.scrollY = 400;

        scene.input.on('pointerdown', onMouseDownScene);
        scene.input.on('pointermove', onMouseMoveOverScene);

        cameraControls(scene);
        buildMap(scene);
        // placeHouses(scene);
        crteateSceleton(scene);

        // Post FX
        scene.cameras.main.postFX.addTiltShift(
            0.2,
            0.1,
            1,
            0.5,
            1,
            1
        );
    };

    // component lifecycle
    onMount(() => {
        loadSave();
        if (!$sceneInstance) return;
        cameraUpdate();
        start(() => {
            if (!$unit) return;
            $unit.update();
        });
    });

    onDestroy(() => stop());
</script>

<svelte:window on:resize={cameraUpdate} />
<!-- <MinimapWrapper /> -->
<!-- bind:instance={$sceneInstance} -->
<Scene key={config.sceneID} {preload} {create} active>
    <Background {w} {h} />
</Scene>

<div class="top">
    awaitPlacement: {awaitPlacement ? 'true' : 'false'}<br />
    mouseButton: {mouseButton}<br />
    autozoom size: {zoomSize}<br />
    pointerX: {pointerX}<br />
    pointerY: {pointerY}<br />
    window width: {w}<br />
    window height: {h}<br />
    movingPionterX: {movingPionterX}<br />
    movingPionterY: {movingPionterY}<br />
</div>

<style lang="scss">
    .top {
        position: absolute;
        left: rem(20);
        bottom: rem(20);
        z-index: 100;
        background: var(--half-transparent);
        color: var(--game-color);
        padding: rem(10);
    }
</style>
