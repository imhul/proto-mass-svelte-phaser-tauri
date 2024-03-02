<script lang="ts">
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import Phaser from 'phaser';
    import { PhaserNavMeshPlugin } from 'phaser-navmesh/src';
    // types
    import type { IScene, Message } from '$lib/types';
    // store
    import { unit, units } from '$lib/store/unit';
    import settings from '$lib/store/settings';
    import { messages } from '$lib/store/notify';
    import tasks, { memoizedTask } from '$lib/store/task';
    import { sceneInstance } from '$lib/store/scene';
    import keyboard from '$lib/store/keyboard';
    import stats from '$lib/store/stats';
    // components
    import { Scene, onGameEvent } from 'svelte-phaser';
    import Cursor from '$lib/game/ui/cursor.svelte';
    import Progress from '$lib/game/ui/progress.svelte';
    // utils
    import { getPercent } from '$lib/utils/percent';
    import config from '$lib/utils/config';
    import getId from '$lib/utils/getId';
    // assets
    import mapJson from '$lib/assets/sprites/common/isorpg.json';
    import tilesOutside from '$lib/assets/sprites/common/iso-64x64-outside.png';
    import tilesBuilding from '$lib/assets/sprites/common/iso-64x64-building.png';
    import skeletonPng from '$lib/assets/sprites/common/skeleton8.png';
    import solarPlantImg from '$lib/assets/sprites/common/solar-plant.png';
    // objects
    import Skeleton from '$lib/objects/skeleton';
    import FollowerSprite from '$lib/objects/follower';

    export let h = 0;
    export let w = 0;
    $: pointerX = 0;
    $: pointerY = 0;
    $: movingPionterX = 0;
    $: movingPionterY = 0;
    $: mouseButton = '';
    $: zoomSize = 1;
    $: awaitPlacement = Boolean($memoizedTask.id?.length);
    let playTimeCounter: NodeJS.Timeout | undefined;
    let unpaused = false;
    let wasStopped = false;
    // let stars1: Phaser.GameObjects.TileSprite;
    // let stars2: Phaser.GameObjects.TileSprite;
    // let stars3: Phaser.GameObjects.TileSprite;
    let mapSpriteId: string;
    let mapSpriteX: number;
    let mapSpriteY: number;
    let mapSpritePixelX: number;
    let mapSpritePixelY: number;
    const boundXOffset = -990;

    const cameraUpdate = () => {
        if (!$sceneInstance) return;
        const zoomCoef = w < config.bounds.w ? 1.5 : 1.2;
        zoomSize = Number(
            (
                zoomCoef +
                (w - config.bounds.w) / (2 * config.bounds.w)
            ).toFixed(2)
        );
        $sceneInstance.scale.resize(w, h);
        $sceneInstance.game.scale.resize(w, h);
        $sceneInstance.cameras.main.setBounds(
            boundXOffset,
            0,
            config.bounds.w,
            config.bounds.h,
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

    const playTimeCount = () => {
        playTimeCounter = setInterval(() => {
            stats.set({
                ...$stats,
                playTime: $stats.playTime + 1000
            });
        }, 1000);
    };

    const pause = (scene: Phaser.Scene) => {
        console.log('pause');
        if (!$settings.isGamePaused) $settings.isGamePaused = true;
        unpaused = false;
        // if (scene?.events) scene.events.emit('pause');
    };

    const resume = (scene: Phaser.Scene) => {
        if (!unpaused) {
            console.log('resume');
            unpaused = true;
            if ($settings.isGamePaused)
                $settings.isGamePaused = false;
            playTimeCount();

            // start(() => {
            //     if (!$unit) return;
            //     $unit.update();
            // });
        }
        // if (scene?.events) scene.events.emit('resume');
    };

    const onSceneKeydown = (
        e: KeyboardEvent,
        scene: Phaser.Scene
    ) => {
        if (e.key === 'p') pause(scene);
        if (e.key === 'r') resume(scene);
    };

    const preload = (scene: Phaser.Scene) => {
        // scene.load.image('stars-1', '/images/parallax_1.png');
        // scene.load.image('stars-2', '/images/parallax_2.png');
        // scene.load.image('stars-3', '/images/parallax_3.png');

        // install plugins
        scene.plugins.installScenePlugin(
            'NavMeshPlugin',
            PhaserNavMeshPlugin,
            'navMeshPlugin',
            scene,
            true
        );

        // load assets
        scene.load.image('tiles', tilesOutside);
        scene.load.image('tiles2', tilesBuilding);
        scene.load.tilemapTiledJSON('map', mapJson);
        scene.load.spritesheet('skeleton', skeletonPng, {
            frameWidth: 128,
            frameHeight: 128
        });
        scene.load.image('solar-plant', solarPlantImg);
        scene.load.on(
            'progress',
            (progress: number) => {
                settings.set({
                    ...$settings,
                    loadingPercent: getPercent(progress),
                    isGameLoaded: false
                });
            },
            scene
        );

        scene.load.on(
            'complete',
            () => {
                settings.set({
                    ...$settings,
                    isGameLoaded: true,
                    loadingPercent: 100
                });
            },
            scene
        );

        sceneInstance.set(scene as IScene);
    };

    const buildMap = (scene: Phaser.Scene) => {
        const map = scene.add.tilemap('map', 64, 32, 32, 32);

        const tileset1 = map.addTilesetImage(
            'iso-64x64-outside',
            'tiles'
        );
        const tileset2 = map.addTilesetImage(
            'iso-64x64-building',
            'tiles2'
        );

        if (!tileset1 || !tileset2) return;

        const ground = map.createLayer('Tile Layer 1', [
            tileset1,
            tileset2
        ]);
        const walls = map.createLayer('Tile Layer 2', [
            tileset1,
            tileset2
        ]);
        const topFloor = map.createLayer('Tile Layer 3', [
            tileset1,
            tileset2
        ]);
        const roofs = map.createLayer('Tile Layer 4', [
            tileset1,
            tileset2
        ]);
        const tubes = map.createLayer('Tile Layer 5', [
            tileset1,
            tileset2
        ]);

        // grass: 111, 112, 115, 118, 119
        // water: 83, 85, 86, 87, 89, 90, 95, 101, 103,
        // stones: 53, 54, 67, 68,
        // ground: 102,

        walls && walls.setCollisionByProperty({ collides: true });
        const layers = [ground, walls, topFloor, roofs, tubes];
        const navMesh = scene.navMeshPlugin.buildMeshFromTilemap(
            'mesh1',
            map,
            layers
        );

        // Graphics overlay for visualizing path
        const graphics = scene.add.graphics().setAlpha(0.5);
        navMesh.enableDebug(graphics);
        const follower = new FollowerSprite(scene, 50, 200, navMesh);
        console.info('follower', follower);

        // TODO: works only in a straight line.
        // Cannot find a way if there is an obstacle in the straight line.
        scene.input.on(
            'pointerdown',
            (pointer: Phaser.Input.Pointer) => {
                layers.forEach(
                    (layer: Phaser.Tilemaps.TilemapLayer | null) => {
                        if (!layer) return;
                        const tile = layer.getIsoTileAtWorldXY(
                            pointer.worldX,
                            pointer.worldY - 32
                        );
                        if (!tile) return;
                        mapSpriteId = `${tile.layer.name}-(${tile.index})`;
                        mapSpriteX = tile.x;
                        mapSpriteY = tile.y;
                        mapSpritePixelX = tile.pixelX;
                        mapSpritePixelY = tile.pixelY;
                        if (pointer.leftButtonDown()) {
                            tile.tint = config.focusColor;
                        } else {
                            tile.tint = config.blurColor;
                        }
                    }
                );

                const start = new Phaser.Math.Vector2(
                    follower.x,
                    follower.y
                );
                const end = new Phaser.Math.Vector2(
                    pointer.worldX,
                    pointer.worldY
                );
                follower.goTo(end);
                const path = navMesh.findPath(start, end);
                navMesh.debugDrawClear();
                navMesh.debugDrawPath(path, 0xffd900);
            }
        );

        // Toggle the navmesh visibility on/off
        scene.input.keyboard &&
            scene.input.keyboard.on('keydown-M', () => {
                navMesh.debugDrawClear();
                navMesh.debugDrawMesh({
                    drawCentroid: true,
                    drawBounds: false,
                    drawNeighbors: false,
                    drawPortals: true
                });
            });
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

    // const cerateBackground = (scene: Phaser.Scene) => {
    //     stars1 = scene.add
    //         .tileSprite(0, 0, w, h, 'stars-1')
    //         .setOrigin(0, 0)
    //         .setScrollFactor(0);

    //     stars2 = scene.add
    //         .tileSprite(0, 0, w, h, 'stars-2')
    //         .setOrigin(0, 0)
    //         .setScrollFactor(0);

    //     stars3 = scene.add
    //         .tileSprite(0, 0, w, h, 'stars-3')
    //         .setOrigin(0, 0)
    //         .setScrollFactor(0);
    // };

    const crteateSceleton = (scene: Phaser.Scene) => {
        const skeletonId = getId('unit', 'skeleton');
        const distance = 380;
        const motion = 'walk';

        unit.set(
            new Skeleton(
                skeletonId,
                scene,
                -160,
                224,
                motion,
                'south',
                distance
            )
        );

        if (!$unit) return;
        $unit.setInteractive();
        scene.add.existing($unit);
        $unit.on('pointerdown', () => unitFocus(scene));
        units.set([
            {
                id: $unit.id,
                name: $unit.name,
                x: $unit.x,
                y: $unit.y,
                z: $unit.z,
                status: motion,
                distance: distance,
                depth: $unit.depth,
                type: $unit.type
            }
        ]);
    };

    const onMouseMoveOverScene = (pointer: Phaser.Input.Pointer) => {
        movingPionterX = pointer.x;
        movingPionterY = pointer.y;
    };

    const onMouseDownScene = (pointer: Phaser.Input.Pointer) => {
        pointerX = pointer.x;
        pointerY = pointer.y;

        // task flow
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

                if ($keyboard.shift.isShift) {
                    const newTaskId = getId(
                        'task-id',
                        $memoizedTask.context
                    );
                    memoizedTask.set({
                        ...$memoizedTask,
                        id: newTaskId
                    });
                    return;
                }
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

        // journal update
        const id = getId('message-id', mouseButton);
        messages.add({
            id,
            title: `Name: ${mouseButton}`,
            aside: 'right',
            icon: 'n18',
            message: `x: ${pointerX}, y: ${pointerY}`
        });
    };

    const onWheel = (scene: Phaser.Scene, z: number) => {
        if (
            zoomSize >= config.minZoom &&
            zoomSize <= config.maxZoom
        ) {
            scene.cameras.main.setZoom(
                z < 0
                    ? (zoomSize = Number((zoomSize + 0.1).toFixed(2)))
                    : (zoomSize = Number((zoomSize - 0.1).toFixed(2)))
            );
        } else if (zoomSize < config.minZoom) {
            zoomSize = config.minZoom;
        } else if (zoomSize > config.maxZoom) {
            zoomSize = config.maxZoom;
        }
    };

    const create = (scene: Phaser.Scene) => {
        // The mini map
        (scene as IScene).minimap = scene.cameras
            .add(20, 20, 200, 200)
            .setZoom(0.2)
            .setName('mini');
        (scene as IScene).minimap.setBackgroundColor(0x0f2a3f);
        (scene as IScene).minimap.scrollX = 800;
        (scene as IScene).minimap.scrollY = 400;

        // actions
        if (scene.input.keyboard && scene.events) {
            // scene.events.on('pause', pause, scene);
            // scene.events.on('resume', resume, scene);
            scene.input.on('pointerdown', onMouseDownScene, scene);
            scene.input.on(
                'pointermove',
                onMouseMoveOverScene,
                scene
            );
            scene.input.keyboard.on(
                'keydown',
                (event: KeyboardEvent) =>
                    onSceneKeydown(event, scene),
                scene
            );
            scene.input.on(
                'wheel',
                (
                    p: Phaser.Input.Pointer,
                    x: number,
                    y: number,
                    z: number
                ) => onWheel(scene, z),
                scene
            );
        }

        // initializations
        cameraControls(scene);
        buildMap(scene);
        crteateSceleton(scene);
        // cerateBackground(scene);

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

    // updates
    const updateUnit = () => {
        if (!$unit) return;
        $unit.update();
    };

    // const updateBg = () => {
    //     if (!stars1 && !stars2 && !stars3) return;
    //     stars1.tilePositionX += 0.1;
    //     stars2.tilePositionX += 0.15;
    //     stars3.tilePositionX += 0.2;
    // };

    // game tick event
    onGameEvent('step', () => {
        if ($settings.isGamePaused) return;
        // updateBg();
        updateUnit();
    });

    // component lifecycle
    onMount(async () => {
        if (!$sceneInstance) return;
        $settings.isGameInit = true;
        cameraUpdate();
        playTimeCount();
    });

    afterUpdate(() => {
        if ($settings.isGamePaused && $sceneInstance) {
            clearInterval(playTimeCounter);
            wasStopped = true;
            // $sceneInstance.events.emit('pause');
        } else if (
            wasStopped &&
            !$settings.isGamePaused &&
            $sceneInstance
        ) {
            wasStopped = false;
            resume($sceneInstance as Phaser.Scene);
        }
    });

    onDestroy(() => {
        clearInterval(playTimeCounter);
    });

    // $: console.log('$settings', $settings);
    // $: console.log('$units', $units);
</script>

<svelte:window
    on:resize={$settings.isGameLoaded ? cameraUpdate : () => {}}
/>

{#if !$settings.isGameLoaded}
    <Progress value={$settings.loadingPercent} />
{/if}

<Cursor img="images/constructions/{$memoizedTask.context}.png" />

<!-- {#await delay(1000) then _} -->
<Scene key={config.sceneID} {preload} {create} active />
<!-- {/await} -->

<div class="stats">
    {#if mapSpriteId}
        map sprite: id: {mapSpriteId},<br />
        posX: {mapSpriteX}, posY: {mapSpriteY},<br />
        pixelX: {mapSpritePixelX}, pixelY: {mapSpritePixelY}<br />
    {/if}

    awaitPlacement: {awaitPlacement ? 'true' : 'false'}<br />
    mouse button: {mouseButton}<br />
    autozoom size: {zoomSize}<br />
    pointerX: {pointerX}<br />
    pointerY: {pointerY}<br />
    window width: {w}<br />
    window height: {h}<br />
    movingPionterX: {movingPionterX}<br />
    movingPionterY: {movingPionterY}<br />
</div>

<style lang="scss">
    .stats {
        position: absolute;
        left: rem(20);
        bottom: rem(20);
        z-index: 100;
        background: var(--half-transparent);
        color: var(--game-color);
        padding: rem(10);

        &:hover {
            background-color: var(--game-color-darkest);
        }
    }
</style>
