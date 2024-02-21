import { Scene } from 'svelte-phaser';

// UI types
export type Aside = 'left' | 'right';
export type Complexity = 'easy' | 'normal' | 'hard';
export type Theme = 'dark' | 'light' | 'oldschool';
export type IMotion = 'walk' | 'attack' | 'idle' | 'die';
export type TopLevelMenuId = 'commands' | 'constructions';
export type IOpposite =
    | 'west'
    | 'northWest'
    | 'north'
    | 'northEast'
    | 'east'
    | 'southEast'
    | 'south'
    | 'southWest';

export type MessageType =
    | 'default'
    | 'danger'
    | 'success'
    | 'warn'
    | 'info';

export type TaskStatus =
    | 'accepted'
    | 'paused'
    | 'continued'
    | 'await'
    | 'complete'
    | 'progress'
    | 'failed'
    | 'canceled';

export type TaskType =
    | 'collect'
    | 'construct'
    | 'deconstruct'
    | 'repair'
    | 'upgrade'
    | 'attack'
    | 'move'
    | 'patrol'
    | 'explore'
    | 'harvest'
    | 'mine'
    | 'craft'
    | 'research'
    | 'heal'
    | 'carrying'
    | 'cancel';

export type Profession =
    | 'collector'
    | 'constructor'
    | 'defender'
    | 'warrior'
    | 'explorer'
    | 'harvester'
    | 'miner'
    | 'crafter'
    | 'researcher'
    | 'healer'
    | 'bearer'
    | 'any';

export type ProfessionLevel =
    | 'trainee'
    | 'junior'
    | 'middle'
    | 'senior'
    | 'architect'
    | 'master'
    | 'legendary';

export type Construction =
    | 'base'
    | 'auto-turret'
    | 'turret'
    | 'nano-lab'
    | 'melter'
    | 'mega-factory'
    | 'factory'
    | 'mini-factory'
    | 'fabricator'
    | 'calibrator'
    | 'mega-power-plant'
    | 'power-plant'
    | 'power-storage';

export interface ButtonUIAction {
    id: string;
    title: string;
    url?: string;
    callback?: () => void;
}

export interface Message {
    id: string;
    type?: MessageType;
    title?: string;
    message?: string;
    actions?: ButtonUIAction[];
    expiring?: boolean;
    aside: Aside;
    archived?: boolean;
    fixed?: boolean;
    img?: string;
    icon?: string;
    parent?: string;
}

export interface Task {
    id: string;
    status: TaskStatus;
    level: number;
    type: TaskType;
    workerId: string;
    priority: number;
    profession: Profession | Profession[];
    professionLevel: ProfessionLevel;
    limit: number;
    context: string;
    position: {
        x: number;
        y: number;
    };
}

export interface Settings {
    loadingPercent: number;
    isGameInit: boolean;
    isGameLoaded: boolean;
    isGameStarted: boolean;
    isGamePaused: boolean;
    isGameOver: boolean;
    isGameMenuOpen: boolean;
    isGameWin: boolean;
}

export interface Stats {
    id: string;
    colony: {
        id: string;
        name: string;
        level: number; // 1-20
    };
    objects: unknown[];
    map: unknown[];
    units: unknown[];
    taskList: unknown[];
    gameInitTime: number;
    saveDate: number | string | Date;
    playHours: number;
    minimapEnabled?: boolean;
    minimapPosition?: Aside;
    volume: number;
    isFullscreen: boolean;
    complexity: Complexity;
    theme: Theme;
}

export interface Save {
    $settings: Settings;
    $stats: Stats;
}

export interface Menu {
    id: string;
    icon: string;
    small: boolean;
    level: number;
    description: string;
}

export interface SubmenuIten extends Menu {
    // id: Construction;
    parent: string;
    profession: Profession | Profession[];
    forMenu?: boolean;
    context?: string | string[];
    task: TaskType;
}

export interface MenuItem extends Menu {
    id: TopLevelMenuId;
    submenu?: SubmenuIten[];
}

export interface Config {
    notifyTimeout: number; // ms
    mapWidth: number;
    mapHeight: number;
    idLength: any[];
    sceneID: string;
    focusColor: number;
    appURL: string;
    offsetZ: number;
    footerMenu: MenuItem[];
}

export interface IScene extends Phaser.Scene, Scene {
    minimap: Phaser.Cameras.Scene2D.Camera;
}

export interface IDirection {
    offset: number;
    x: number;
    y: number;
    opposite: IOpposite;
}

export interface IDirections {
    [key: string]: IDirection;
}

export interface IAnim {
    startFrame: number;
    endFrame: number;
    speed: number;
}

export interface IAnims {
    [key: string]: IAnim;
}

export interface IUnit extends Phaser.GameObjects.Sprite {
    id: string;

    //     name: "",
    //     freeMode: true,
    //     status: "search", // walk, work, attak, rest, search, dead
    //     stats: {
    //         level: 0, // max 20
    //         health: 0, // h-points
    //         damage: 0, // h-points
    //         speed: 0.666,
    //         healthPoints: 0, // h-points
    //         pointsToNextLevel: 0, // max 20
    //     },
    //     // isUnitStatsShown: true,
    //     position: {
    //         x: 0,
    //         y: 0,
    //     },
    //     taskList: [],
    //     skills: [
    //         {
    //             id: "",
    //             name: "",
    //             status: "",
    //             progress: "", // x-points
    //             level: 0, // max 20
    //             levelName: "trainee", // medium, prime
    //             pointsToNextLevel: 0, // x-points
    //             bonus: {
    //                 id: "",
    //                 name: "",
    //                 value: 0,
    //             },
    //         },
    //     ],
    //     technologies: [
    //         {
    //             id: "",
    //             name: "",
    //             status: "",
    //             progress: "", // x-points
    //             level: 0, // max 20
    //             levelName: "trainee", // medium, prime
    //             pointsToNextLevel: 0, // x-points
    //             bonus: {
    //                 id: "",
    //                 name: "",
    //                 value: 0,
    //             },
    //         },
    //     ],
    //     professions: [
    //         {
    //             id: "",
    //             name: "collector", // constructor, collector, protector, numerator
    //             status: "",
    //             progress: "", // x-points
    //             level: 0, // max 20
    //             levelName: "trainee", // medium, prime
    //             pointsToNextLevel: 0, // x-points
    //             bonus: {
    //                 id: "",
    //                 name: "",
    //                 value: 0,
    //             },
    //         },
    //     ],
    //     // backpack
    //     itemsStorage: [],
    //     // wear
    //     items: [
    //         {
    //             id: "",
    //             name: "",
    //             type: "",
    //             stats: {},
    //         },
    //     ],
    // },
}
