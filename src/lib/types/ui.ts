export interface ButtonUIAction {
    id: string;
    title: string;
    url?: string;
    callback?: () => void;
}

export type Aside = 'left' | 'right';

export interface Message {
    id: string;
    type?: 'default' | 'danger' | 'success' | 'warn' | 'info';
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

export interface Settings {
    volume: number;
    isFullscreen: boolean;
    complexity: 'easy' | 'normal' | 'hard';
    theme: 'dark' | 'light' | 'oldschool';
    zoom: number;
    gameHours: number;
    notifyTimeout: number;
    loadingPercent: number;
    isGameInit: boolean;
    isGameLoaded: boolean;
    isGameStarted: boolean;
    isGamePaused: boolean;
    isGameOver: boolean;
    isGameMenuOpen: boolean;
    isGameWin: boolean;
    gameInitTime: number;
    date: number | string | Date;
}

export interface Stats {
    id: string;
    colony: {
        id: string;
        name: string;
        level: number;
    };
    objects: unknown[];
    map: unknown[];
    units: unknown[];
    taskList: unknown[];
}

export interface Save {
    $settings: Settings;
    $stats: Stats;
}
