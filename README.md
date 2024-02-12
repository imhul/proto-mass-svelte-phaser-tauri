# Proto-Mass

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```
npm create @svelte-add/kit@latest proto-mass-svelte-phaser-tauri -- --with typescript+prettier
npx svelte-add@latest scss
yarn add phaser svelte-phaser uifx uuid svelte-simple-modal @tauri-apps/api
yarn add -D @sveltejs/adapter-static @tsconfig/svelte @types/uuid @types/node @tauri-apps/cli prettier-plugin-svelte
yarn tauri init
```

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
yarn build
```

You can preview the production build with `yarn preview`.
