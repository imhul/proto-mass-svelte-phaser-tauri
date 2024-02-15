export interface Config {
    appURL: string;
}

const config: Config = {
    appURL: 'https://imhul.github.io/proto-mass-svelte-phaser-tauri'
};

export const assets = {
    stars1: config.appURL + '/assets/bg/layer_1.png',
    stars2: config.appURL + '/assets/bg/layer_2.png',
    stars3: config.appURL + '/assets/bg/layer_3.png',
    starship: config.appURL + '/assets/sprites/layer_starship_1.png'
};

export default config;
