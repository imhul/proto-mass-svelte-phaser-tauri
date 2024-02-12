import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const fixString = (str: string): string => {
    return str.slice(3);
};
const aliases = [
    {
        find: '$store',
        replacement: fixString(resolve(__dirname, 'src/lib/store'))
    },
    {
        find: '$game',
        replacement: fixString(resolve(__dirname, 'src/lib/game'))
    },
    {
        find: '$ui',
        replacement: fixString(resolve(__dirname, 'src/lib/ui'))
    },
    {
        find: '$utils',
        replacement: fixString(resolve(__dirname, 'src/lib/utils'))
    },
    {
        find: '$assets',
        replacement: fixString(resolve(__dirname, 'src/lib/assets'))
    },
    {
        find: '$types',
        replacement: fixString(resolve(__dirname, 'src/lib/types'))
    }
];

export default defineConfig({
    plugins: [sveltekit()],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/variables.scss" as *;'
            }
        }
    },
    resolve: {
        alias: aliases
    }
});
