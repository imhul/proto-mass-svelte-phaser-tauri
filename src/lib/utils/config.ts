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
                    id: 'mine',
                    icon: 'dig',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: ['collector', 'harvester', 'miner'],
                    description: 'Ore mining'
                },
                {
                    id: 'harvest',
                    icon: 'dig',
                    small: false,
                    forMenu: true,
                    level: 1,
                    parent: 'commands',
                    profession: ['collector', 'harvester'],
                    description: 'Сollection and extraction'
                },
                {
                    id: 'collect',
                    icon: 'dig',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: ['collector', 'harvester'],
                    description: 'Сollection and extraction'
                },
                {
                    id: 'construct',
                    icon: 'wrench',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: 'constructor',
                    description: 'Construction'
                },
                {
                    id: 'deconstruct',
                    icon: 'Odieresis1',
                    small: true,
                    forMenu: true,
                    level: 1,
                    parent: 'commands',
                    profession: 'constructor',
                    description: 'Deconstruction'
                },
                {
                    id: 'repair',
                    icon: 'wrench',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: 'constructor',
                    description: 'Repair'
                },
                {
                    id: 'research',
                    icon: 'cedilla1',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: 'researcher',
                    description: 'Technologies Research'
                },
                {
                    id: 'explore',
                    icon: 'semicolon',
                    small: true,
                    forMenu: true,
                    level: 1,
                    parent: 'commands',
                    profession: 'explorer',
                    description: 'Base Defense'
                },
                {
                    id: 'patrol',
                    icon: 'Atilde1',
                    small: true,
                    forMenu: true,
                    level: 1,
                    parent: 'commands',
                    profession: 'defender',
                    description: 'Defense'
                },
                {
                    id: 'attack',
                    icon: 'quoteleft',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: ['warrior', 'defender', 'explorer'],
                    description: 'Attack the Enemy'
                },
                {
                    id: 'move',
                    icon: 'm10',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    description: 'Move'
                },
                {
                    id: 'cancel',
                    icon: 'n10',
                    small: false,
                    forMenu: true,
                    level: 1,
                    parent: 'commands',
                    description: 'Сancel the Сommand'
                },
                {
                    id: 'upgrade',
                    icon: 'Q9',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    description: 'Unit Upgrade'
                },
                {
                    id: 'heal',
                    icon: 'add',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: 'healer',
                    description: 'Heal'
                },
                {
                    id: 'craft',
                    icon: 'oacute1',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: 'crafter',
                    description: 'Craft'
                },
                {
                    id: 'carrying',
                    icon: 'oacute1',
                    small: false,
                    forMenu: false,
                    level: 1,
                    parent: 'commands',
                    profession: 'bearer',
                    description: 'Carrying'
                }
            ]
        },
        {
            id: 'constructions',
            icon: 'oacute1',
            small: false,
            level: 1,
            description: 'Constructions',
            submenu: [
                {
                    id: 'power-plant',
                    icon: 'blow',
                    small: false,
                    forMenu: true,
                    level: 1,
                    parent: 'constructions',
                    description: 'Solar Mini Power Plant'
                },
                {
                    id: 'mega-power-plant',
                    icon: 'explore',
                    small: false,
                    forMenu: true,
                    level: 10,
                    parent: 'constructions',
                    description: 'Solar Mega Power Plant'
                },
                {
                    id: 'calibrator',
                    icon: 'celebrate',
                    small: false,
                    forMenu: true,
                    level: 1,
                    parent: 'constructions',
                    description: 'Level Pumping'
                },
                {
                    id: 'fabricator',
                    icon: 'scare',
                    small: false,
                    forMenu: true,
                    level: 2,
                    parent: 'constructions',
                    description: 'Details & Tools Fabricator'
                },
                {
                    id: 'mini-factory',
                    icon: 'rule',
                    small: false,
                    forMenu: true,
                    level: 5,
                    parent: 'constructions',
                    description: 'Simple Units Factory'
                },
                {
                    id: 'factory',
                    icon: 'u16',
                    small: false,
                    forMenu: true,
                    level: 10,
                    parent: 'constructions',
                    description: 'Middle Units Factory'
                },
                {
                    id: 'mega-factory',
                    icon: 'w16',
                    small: false,
                    forMenu: true,
                    level: 15,
                    parent: 'constructions',
                    description: 'Mega Units Factory'
                },
                {
                    id: 'melter',
                    icon: 'photograph',
                    small: false,
                    forMenu: true,
                    level: 2,
                    parent: 'constructions',
                    description: 'Ore Processor'
                },
                {
                    id: 'nano-lab',
                    icon: 'Z12',
                    small: true,
                    forMenu: true,
                    level: 5,
                    parent: 'constructions',
                    description: 'Technologies Research'
                },
                {
                    id: 'turret',
                    icon: 'w13',
                    small: true,
                    forMenu: true,
                    level: 5,
                    parent: 'constructions',
                    description: 'Turret'
                },
                {
                    id: 'auto-turret',
                    icon: 'x14',
                    small: true,
                    forMenu: true,
                    level: 10,
                    parent: 'constructions',
                    description: 'Auto Turret'
                }
            ]
        }
    ]
};

export default config;
