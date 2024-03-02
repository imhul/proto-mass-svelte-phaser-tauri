import type { Config } from '$lib/types';

const config: Config = {
    notifyTimeout: 3000, // ms
    offsetZ: 86,
    minZoom: 0.9,
    maxZoom: 2.8,
    mapWidth: 1600,
    mapHeight: 800,
    bounds: {
        w: 2048,
        h: 1024
    },
    idLength: new Array(16),
    sceneID: 'proto_mass_main_scene',
    focusColor: 0x86bfda,
    blurColor: 0xffffff,
    appURL: 'https://imhul.github.io/proto-mass-svelte-phaser-tauri',
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
                    task: 'mine',
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
                    task: 'harvest',
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
                    task: 'collect',
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
                    task: 'construct',
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
                    task: 'deconstruct',
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
                    task: 'repair',
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
                    task: 'research',
                    parent: 'commands',
                    profession: 'researcher',
                    description: 'Technologies Research'
                },
                {
                    id: 'explore',
                    icon: 'semicolon',
                    small: false,
                    forMenu: true,
                    level: 1,
                    task: 'explore',
                    parent: 'commands',
                    profession: 'explorer',
                    description: 'Explore the Area'
                },
                {
                    id: 'patrol',
                    icon: 'Atilde1',
                    small: false,
                    forMenu: true,
                    level: 1,
                    task: 'patrol',
                    parent: 'commands',
                    profession: 'defender',
                    description: 'Defense Patrol'
                },
                {
                    id: 'attack',
                    icon: 'quoteleft',
                    small: false,
                    forMenu: false,
                    level: 1,
                    task: 'attack',
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
                    task: 'move',
                    parent: 'commands',
                    profession: 'any',
                    description: 'Move'
                },
                {
                    id: 'cancel',
                    icon: 'n10',
                    small: false,
                    forMenu: true,
                    level: 1,
                    task: 'cancel',
                    parent: 'commands',
                    profession: 'any',
                    description: 'Сancel the Сommand'
                },
                {
                    id: 'upgrade',
                    icon: 'Q9',
                    small: false,
                    forMenu: false,
                    level: 1,
                    task: 'upgrade',
                    parent: 'commands',
                    profession: 'any',
                    description: 'Unit Upgrade'
                },
                {
                    id: 'heal',
                    icon: 'add',
                    small: false,
                    forMenu: false,
                    level: 1,
                    task: 'heal',
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
                    task: 'craft',
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
                    task: 'carrying',
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
                    id: 'base',
                    icon: 'urbanize',
                    small: false,
                    forMenu: true,
                    level: 5,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Motherboard'
                },
                {
                    id: 'power-storage',
                    icon: 'uacute',
                    small: false,
                    forMenu: true,
                    level: 5,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Power Storage'
                },
                {
                    id: 'solar-plant',
                    icon: 'blow',
                    small: false,
                    forMenu: true,
                    level: 1,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Solar Mini Power Plant'
                },
                {
                    id: 'mega-power-plant',
                    icon: 'power',
                    small: false,
                    forMenu: true,
                    level: 10,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Solar Mega Power Plant'
                },
                {
                    id: 'calibrator',
                    icon: 'celebrate',
                    small: false,
                    forMenu: true,
                    level: 1,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Level Pumping'
                },
                {
                    id: 'fabricator',
                    icon: 'scare',
                    small: false,
                    forMenu: true,
                    level: 2,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Details & Tools Fabricator'
                },
                {
                    id: 'mini-factory',
                    icon: 'rule',
                    small: false,
                    forMenu: true,
                    level: 5,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Simple Units Factory'
                },
                {
                    id: 'factory',
                    icon: 'u16',
                    small: false,
                    forMenu: true,
                    level: 10,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Middle Units Factory'
                },
                {
                    id: 'mega-factory',
                    icon: 'w16',
                    small: false,
                    forMenu: true,
                    level: 15,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Mega Units Factory'
                },
                {
                    id: 'melter',
                    icon: 'photograph',
                    small: false,
                    forMenu: true,
                    level: 2,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Ore Processor'
                },
                {
                    id: 'nano-lab',
                    icon: 'I16',
                    small: true,
                    forMenu: true,
                    level: 5,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Technologies Research'
                },
                {
                    id: 'turret',
                    icon: 'w13',
                    small: true,
                    forMenu: true,
                    level: 5,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Turret'
                },
                {
                    id: 'auto-turret',
                    icon: 'x14',
                    small: true,
                    forMenu: true,
                    level: 10,
                    task: 'construct',
                    profession: 'constructor',
                    parent: 'constructions',
                    description: 'Auto Turret'
                }
            ]
        }
    ],
    resources: [
        {
            typeId: 101,
            type: 'ground',
            name: 'ground',
            status: 'inactive',
            blocker: false,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 80,
                damage: 0,
                hp: 80,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 102,
            type: 'mineral',
            name: 'titanum',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 80,
                damage: 0,
                hp: 80,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 103,
            type: 'mineral',
            name: 'sand',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 60,
                damage: 0,
                hp: 60,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 104,
            type: 'ground',
            name: 'grass',
            status: 'inactive',
            blocker: false,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 105,
            type: 'mineral',
            name: 'platinum',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 106,
            type: 'mineral',
            name: 'resin',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 107,
            type: 'mineral',
            name: 'ferrum',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 108,
            type: 'mineral',
            name: 'uranium',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 109,
            type: 'tree',
            name: 'gammfitum',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 110,
            type: 'tree',
            name: 'filonterius',
            status: 'grow',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 55,
                damage: 0,
                hp: 55,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        },
        {
            typeId: 111,
            type: 'ground',
            name: 'rock',
            status: 'inactive',
            blocker: true,
            src: '',
            width: 42,
            height: 42,
            stats: {
                health: 80,
                damage: 0,
                hp: 80,
                position: {
                    x: 0,
                    y: 0
                },
                xp: 0
            }
        }
    ]
};

export default config;
