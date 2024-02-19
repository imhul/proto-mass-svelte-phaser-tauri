import type { Config } from '$lib/types';

const config: Config = {
    notifyTimeout: 3000, // ms
    mapWidth: 1600,
    mapHeight: 800,
    idLength: new Array(16),
    sceneID: 'proto_mass_main_scene',
    focusColor: 0x86bfda,
    appURL: 'https://imhul.github.io/proto-mass-svelte-phaser-tauri',
    defaultTask: {
        id: '',
        status: 'await', // accepted, paused, continued, await, complete, progress, failed
        level: 0,
        type: 'collect',
        workerId: '',
        priority: 1,
        profession: 'collector',
        professionLevel: 'trainee',
        limit: 1,
        position: {
            x: 0,
            y: 0
        }
    },
    footerMenu: [
        {
            id: 'commands',
            icon: 'n18',
            small: true,
            level: 1,
            description: 'Commands',
            submenu: [
                {
                    id: 'harvest',
                    icon: 'dig',
                    small: false,
                    level: 1,
                    parent: 'commands',
                    description:
                        'Сollection and extraction of resources'
                }
            ]
        },
        {
            id: 'deconstruct',
            icon: 'Odieresis1',
            small: true,
            level: 1,
            description: 'Deconstruction'
        },
        {
            id: 'construct',
            icon: 'oacute1',
            small: false,
            level: 1,
            description: 'Constructions',
            submenu: [
                {
                    id: 'power-plant',
                    icon: 'blow',
                    small: false,
                    level: 1,
                    parent: 'construct',
                    description: 'Solar Mini Power Plant'
                },
                {
                    id: 'mega-power-plant',
                    icon: 'explore',
                    small: false,
                    level: 10,
                    parent: 'construct',
                    description: 'Solar Mega Power Plant'
                },
                {
                    id: 'calibrator',
                    icon: 'celebrate',
                    small: false,
                    level: 1,
                    parent: 'construct',
                    description: 'Level Pumping'
                },
                {
                    id: 'fabricator',
                    icon: 'celebrate',
                    small: false,
                    level: 2,
                    parent: 'construct',
                    description: 'Details & Units Fabricator'
                },
                {
                    id: 'mini-factory',
                    icon: 'celebrate',
                    small: false,
                    level: 5,
                    parent: 'construct',
                    description: 'Simple Units Factory'
                },
                {
                    id: 'factory',
                    icon: 'celebrate',
                    small: false,
                    level: 5,
                    parent: 'construct',
                    description: 'Middle Units Factory'
                },
                {
                    id: 'mega-factory',
                    icon: 'celebrate',
                    small: false,
                    level: 5,
                    parent: 'construct',
                    description: 'Mega Units Factory'
                }
            ]
        }
    ]
};

export default config;
