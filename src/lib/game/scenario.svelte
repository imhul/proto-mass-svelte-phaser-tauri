<script lang="ts">
    // TODO: docs: https://github.com/phaserjs/examples/blob/master/public/src/depth%20sorting/isometric%20map.js
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import Phaser from 'phaser';
    // types
    import type { Aside, Message } from '$lib/types/ui';
    // store
    import { unit } from '$lib/store/unit';
    import settings from '$lib/store/settings';
    import { messages } from '$lib/store/notify';
    // components
    import { Scene } from 'svelte-phaser';
    import Background from '$lib/game/background.svelte';
    // utils
    import { start, stop } from '$lib/utils/interval';
    import { loadSave } from '$lib/utils/actions';
    import { v5 as uuidv5 } from 'uuid';
    // assets
    import mapJson from '$lib/assets/sprites/isometric-grass-and-water.json';
    import tilesPng from '$lib/assets/sprites/isometric-grass-and-water.png';
    import skeletonPng from '$lib/assets/sprites/skeleton8.png';
    import housePng from '$lib/assets/sprites/rem_0002.png';
    // objects
    import Skeleton from '$lib/objects/skeleton';

    export let h = 0;
    export let w = 0;

    $: mapwidth = 0;
    $: mapheight = 0;
    $: pointerX = 0;
    $: pointerY = 0;
    $: mouseButton = '';
    let sceneInstance: Phaser.Scene;
    const idLength = new Array(16);
    const sceneID = 'main_scene';
    const MIN_WIDTH_FOR_ZOOM = 1500;
    let tileWidthHalf: number;
    let tileHeightHalf: number;
    const newH = h;
    const newW = w;
    const hover = 0x86bfda;

    const cameraControls = (scene: Phaser.Scene) => {
        if (!scene.input.keyboard) return;
        const camera = scene.cameras.main;
        // const cursors = scene.input.keyboard.createCursorKeys(); // for ←↑→↓ keys only
        const controls =
            new Phaser.Cameras.Controls.SmoothedKeyControl({
                camera: camera,
                left: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.A
                ), // cursors.left,
                right: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.D
                ), // cursors.right,
                up: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.W
                ), // cursors.up,
                down: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.S
                ), // cursors.down,
                zoomIn: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.Q
                ),
                zoomOut: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.E
                ),
                zoomSpeed: 0.02,
                acceleration: 0.1,
                drag: 0.0001,
                maxSpeed: 1.05,
                minZoom: 1,
                maxZoom: 2.8
            });

        controls.start();
        camera.setBounds(0, 0, w, h);
        // camera.setZoom(w > MIN_WIDTH_FOR_ZOOM ? 1.5 : 1);

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
        scene.load.json('map', mapJson);
        scene.load.spritesheet('tiles', tilesPng, {
            frameWidth: 64,
            frameHeight: 64
        });
        scene.load.spritesheet('skeleton', skeletonPng, {
            frameWidth: 128,
            frameHeight: 128
        });
        scene.load.image('house', housePng);
        scene.load.image('stars-1', '/images/parallax_1.png');
        scene.load.image('stars-2', '/images/parallax_2.png');
        scene.load.image('stars-3', '/images/parallax_3.png');
        scene.load.image(
            'starship',
            '/images/parallax_starship_1.png'
        );
    };

    const buildMap = (scene: Phaser.Scene) => {
        //  Parse the data out of the map
        const data = scene.cache.json.get('map');
        const tilewidth = data.tilewidth;
        const tileheight = data.tileheight;
        const layer = data.layers[0].data;
        mapwidth = data.layers[0].width;
        mapheight = data.layers[0].height;
        tileWidthHalf = tilewidth / 2;
        tileHeightHalf = tileheight / 2;
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

    const placeHouses = (scene: Phaser.Scene) => {
        const house_1 = scene.add.image(240, 370, 'house');
        house_1.depth = house_1.y + 86;

        const house_2 = scene.add.image(1300, 290, 'house');
        house_2.depth = house_2.y + 86;
    };

    const unitFocus = (scene: Phaser.Scene) => {
        console.log('unitFocus');
        if (!$unit) return;
        $unit.setTint(hover);
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

    const unitBlur = (scene: Phaser.Scene) => {
        if (!$unit) return;
        $unit.clearTint();
        scene.cameras.main.stopFollow();
    };

    const crteateSceleton = (scene: Phaser.Scene) => {
        const skeletonId = 'skeleton-' + uuidv5('skeleton', idLength);

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

    const create = (scene: Phaser.Scene) => {
        if (scene.input.keyboard)
            scene.input.keyboard.on(
                'keyup',
                (event: KeyboardEvent) => onSceneKeyup(event, scene),
                scene
            );

        scene.events.on('pause', pause);
        scene.events.on('resume', resume);

        scene.input.on(
            'pointerdown',
            (pointer: Phaser.Input.Pointer) => {
                if (pointer.leftButtonDown()) {
                    mouseButton = 'left';
                } else if (pointer.rightButtonDown()) {
                    mouseButton = 'right';
                    unitBlur(scene);
                    $messages.forEach((board: Message) => {
                        if (board.parent === 'unit')
                            messages.delete(board.id, 'delete');
                    });
                }

                pointerX = pointer.x;
                pointerY = pointer.y;
                const id =
                    'id-' +
                    mouseButton +
                    '-' +
                    uuidv5('message-' + $messages?.length, idLength);

                messages.add({
                    id,
                    title: `Name: ${mouseButton}`,
                    aside: (mouseButton as Aside) ?? 'right',
                    message: `x: ${pointerX}, y: ${pointerY}`
                });
            }
        );

        scene.cameras.main.setSize(w, h);
        cameraControls(scene);
        buildMap(scene);
        placeHouses(scene);
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
        start(() => {
            if (!$unit) return;
            $unit.update();
            $unit = $unit;
        });
    });

    afterUpdate(() => {
        // TODO: responsive scene
        if (sceneInstance && (newH !== h || newW !== w)) {
            // sceneInstance.physics.world.setBounds(w/2, h/2, w, h, true, true, true, true);
            // const x = sceneInstance.cameras.main.centerX;
            // const y = sceneInstance.cameras.main.centerY;
            // sceneInstance.cameras.main.setBounds(0, 0, w, h);
            sceneInstance.cameras.main.setZoom(
                w > MIN_WIDTH_FOR_ZOOM ? 1.5 : 1
            );
            sceneInstance.scale.scaleMode =
                Phaser.Scale.ScaleModes.FIT;
            sceneInstance.game.scale.autoCenter =
                Phaser.Scale.Center.CENTER_BOTH;
            sceneInstance.scale.resize(w, h);
            sceneInstance.game.scale.resize(w, h);
            sceneInstance.cameras.main.centerOn(
                mapwidth / 2,
                mapheight / 2
            );
        }
    });

    onDestroy(() => stop());
</script>

<Scene
    bind:instance={sceneInstance}
    key={sceneID}
    {preload}
    {create}
    active
>
    <Background {w} {h} />
</Scene>
