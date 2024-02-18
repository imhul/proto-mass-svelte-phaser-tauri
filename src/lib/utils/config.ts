export interface Menu {
    id: string;
    icon: string;
    small: boolean;
    level: number;
    description: string;
}

export interface SubmenuIten extends Menu {
    parent: string;
}

export interface MenuItem extends Menu {
    submenu?: SubmenuIten[];
}

export interface Config {
    appURL: string;
    footerMenu: MenuItem[];
}

const config: Config = {
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
                    id: 'harvest',
                    icon: 'dig',
                    small: false,
                    level: 1,
                    parent: 'commands',
                    description: 'Сollection and extraction of resources',
                }
            ],
        },
        {
            id: 'deconstruct',
            icon: 'Odieresis1',
            small: true,
            level: 1,
            description: 'Deconstruction',
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
                    description: 'Solar Mini Power Plant',
                },
                {
                    id: 'mega-power-plant',
                    icon: 'explore',
                    small: false,
                    level: 10,
                    parent: 'construct',
                    description: 'Solar Mega Power Plant',
                },
                {
                    id: 'calibrator',
                    icon: 'celebrate',
                    small: false,
                    level: 1,
                    parent: 'construct',
                    description: 'Level Pumping',
                },
                {

                }
            ]
        },
        
    ]
};

export default config;
