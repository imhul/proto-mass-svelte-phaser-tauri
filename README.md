# Proto-Mass v0.0.1

## Indirect Control Pixel-Art Svelte-based Sandbox Game

## Genre

> [`#sandbox`](https://en.wikipedia.org/wiki/Sandbox_game) [`#colony-construction`](https://en.wikipedia.org/wiki/City-building_game)[`#indirect-control`](https://game-studies.fandom.com/wiki/Indirect_Control) [`#pixel-art`](https://en.wikipedia.org/wiki/Pixel_art) [`#browser-game`](https://en.wikipedia.org/wiki/Browser_game)

## Tech

-   [`Svelte`](https://svelte.dev/) - CYBERNETICALLY ENHANCED WEB APPS
-   [`Phaser 3`](https://phaser.io/phaser3) - Phaser 3 is the next generation of the Phaser Game Framework. Every last element has been rebuilt from scratch using a fully modular structure, combined with a data-orientated approach. It includes a brand-new custom WebGL renderer designed specifically for the needs of modern 2D games.
-   [`svelte-phaser`](https://svelte-phaser.com/) - Create Phaser games with Svelte
-   [`tauri`](https://tauri.studio/) - Tauri is a toolkit that helps developers make applications for the major desktop platforms - using virtually any frontend framework. The core of Tauri is built with Rust, and the CLI leverages Node.js.

You can also see [`React version`](https://github.com/imhul/proto-mass.git)

[`Demo (React version)`](https://github.com/imhul/proto-mass.git)

## Story

Far away on a distant planet inhabited by primitive life forms a small colony of robots accidentally trapped must build, develop and fight only to exist...
How far can they go? 🕹 🎲 🌌 🎰 ⭐ ⭐ ⭐

## Create

If you're seeing this, you've probably already done this step. Congrats!

```
npm create @svelte-add/kit@latest proto-mass-svelte-phaser-tauri -- --with typescript+prettier
npx svelte-add@latest scss
yarn add phaser svelte-phaser uifx uuid svelte-simple-modal @tauri-apps/api
yarn add -D @sveltejs/adapter-static @tsconfig/svelte @types/uuid @types/node @tauri-apps/cli prettier-plugin-svelte
yarn tauri init
```

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `yarn`, start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open

# or as tauri project
yarn tauri dev
```

## Building

To create a production version of your app:

```bash
yarn tauri build
```

You can preview the production build with `yarn preview`.

## Roadmap

-   Task Performance & go to the next task or search for a new
-   Rest & "walking around" algorithm
-   Direct control & user task adding
-   Second unit synthesizing
-   Time Machine (beta complete)
-   Game preloader (beta complete)
-   Enemies synthesizing & interactions
-   Objects (minerals & trees) growth

## Donate

-   ❤️[Patreon](https://www.patreon.com/protomass?fan_landing=true)
-   ☕[buymeacoffee](https://www.buymeacoffee.com/blashirkz)

## Credits

-   Tkachuk Zakhar - author & frontend developer
-   Alex Gudz - math calculations & promotion

## License

MIT
