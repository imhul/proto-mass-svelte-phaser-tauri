<script lang="ts">
    // TODO: docs: https://github.com/phaserjs/examples/blob/master/public/src/depth%20sorting/isometric%20map.js
    import Phaser from 'phaser';
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    // types
    import type { Aside } from '$lib/types/ui';
    import type { SkeletonType } from './stats';
    // store
    import user from '$lib/store/user/auth';
    import { unit, units } from '$lib/store/game/unit';
    import { gameUI } from '$lib/store/game/ui';
    import { messages } from '$lib/store/game/notify';
    // components
    import { Scene } from 'svelte-phaser';
    import Background from '$lib/game/background.svelte';
    // utils
    import { start, stop } from '$lib/utils/interval';
    import { v5 as uuidv5 } from 'uuid';
    // assets
    import mapJson from '$lib/assets/sprites/isometric-grass-and-water.json';
    import tilesPng from '$lib/assets/sprites/isometric-grass-and-water.png';
    import skeletonPng from '$lib/assets/sprites/skeleton8.png';
    import housePng from '$lib/assets/sprites/rem_0002.png';
    import Skeleton from './skeleton';

    export let h = 0;
    export let w = 0;

    $: !$user.isLoggedIn && goto('/');
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
    let skeletons: SkeletonType[] = [];
    let d = 0;

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
        gameUI.set({
            ...$gameUI,
            isGamePaused: true
        });
        scene.events.emit('pause');
    };

    const resume = (scene: Phaser.Scene) => {
        gameUI.set({
            ...$gameUI,
            isGamePaused: false
        });
        scene.events.emit('resume');
    };

    const onKeyup = (e: KeyboardEvent, scene: Phaser.Scene) => {
        if (e.key === 'Escape') pause(scene);
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

        tileWidthHalf = tilewidth / 2;
        tileHeightHalf = tileheight / 2;

        const layer = data.layers[0].data;

        mapwidth = data.layers[0].width;
        mapheight = data.layers[0].height;

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

    const create = (scene: Phaser.Scene) => {
        if (scene.input.keyboard)
            scene.input.keyboard.on(
                'keyup',
                (event: KeyboardEvent) => onKeyup(event, scene),
                scene
            );

        scene.events.on('pause', function () {
            console.info('paused');
        });

        scene.events.on('resume', function () {
            console.info('resumed');
        });

        scene.input.on(
            'pointerdown',
            (pointer: Phaser.Input.Pointer) => {
                if (pointer.leftButtonDown()) {
                    mouseButton = 'left';
                } else if (pointer.rightButtonDown()) {
                    mouseButton = 'right';
                }

                pointerX = pointer.x;
                pointerY = pointer.y;
                const id =
                    'id-' +
                    mouseButton +
                    '-' +
                    uuidv5('message-' + $messages?.length, idLength);
                console.log(id);

                messages.add({
                    id,
                    title: `Name: ${mouseButton}`,
                    aside: (mouseButton as Aside) ?? 'right',
                    img: '0',
                    message: `x: ${pointerX}, y: ${pointerY}`
                });
            }
        );

        cameraControls(scene);
        buildMap(scene);
        placeHouses(scene);

        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    240,
                    290,
                    'walk',
                    'southEast',
                    100
                )
            )
        );
        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    100,
                    380,
                    'walk',
                    'southEast',
                    230
                )
            )
        );
        skeletons.push(
            scene.add.existing(
                new Skeleton(scene, 620, 140, 'walk', 'south', 380)
            )
        );
        skeletons.push(
            scene.add.existing(
                new Skeleton(scene, 460, 180, 'idle', 'south', 0)
            )
        );

        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    760,
                    100,
                    'attack',
                    'southEast',
                    0
                )
            )
        );
        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    800,
                    140,
                    'attack',
                    'northWest',
                    0
                )
            )
        );

        skeletons.push(
            scene.add.existing(
                new Skeleton(scene, 750, 480, 'walk', 'east', 200)
            )
        );

        skeletons.push(
            scene.add.existing(
                new Skeleton(scene, 1030, 300, 'die', 'west', 0)
            )
        );

        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    1180,
                    340,
                    'attack',
                    'northEast',
                    0
                )
            )
        );

        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    1180,
                    180,
                    'walk',
                    'southEast',
                    160
                )
            )
        );

        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    1450,
                    320,
                    'walk',
                    'southWest',
                    320
                )
            )
        );
        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    1500,
                    340,
                    'walk',
                    'southWest',
                    340
                )
            )
        );
        skeletons.push(
            scene.add.existing(
                new Skeleton(
                    scene,
                    1550,
                    360,
                    'walk',
                    'southWest',
                    330
                )
            )
        );

        scene.cameras.main.setSize(w, h);
        scene.cameras.main.postFX.addTiltShift(
            0.2,
            0.1,
            1,
            0.5,
            1,
            1
        );
    };

    const update = () => {
        skeletons.forEach(function (skeleton) {
            skeleton.update();
        });

        // return;

        if (d) {
            sceneInstance.cameras.main.scrollX -= 0.5;
            if (sceneInstance.cameras.main.scrollX <= 0) d = 0;
        } else {
            sceneInstance.cameras.main.scrollX += 0.5;
            if (sceneInstance.cameras.main.scrollX >= 800) d = 1;
        }
    };

    onMount(() => start(update));
    onDestroy(() => stop());

    afterUpdate(() => {
        if (sceneInstance) {
            // TODO: responsive scene
            // sceneInstance.physics.world.setBounds(w/2, h/2, w, h, true, true, true, true);
            // const x = sceneInstance.cameras.main.centerX;
            // const y = sceneInstance.cameras.main.centerY;
            // sceneInstance.cameras.main.setBounds(0, 0, w, h);
            // sceneInstance.cameras.main.setZoom(w > MIN_WIDTH_FOR_ZOOM ? 1.5 : 1);
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
