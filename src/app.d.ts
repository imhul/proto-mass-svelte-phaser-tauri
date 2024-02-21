// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}

        declare module '*.cur' {
            const src: string;
            export default src;
        }
    }
}

interface ImportMetaEnv {
    PROTO_MASS_BASE_URL: string;
    PROTO_MASS_CHUCK_NORRIS_API_URL: string;
    PROTO_MASS_CHUCK_NORRIS_API_LANG: string;
    PROTO_MASS_TWITTER_API_KEY: string;
    PROTO_MASS_TWITTER_TWEETS_ENDPOINT: string;
    PROTO_MASS_TWITTER_SEARCH_URL: string;
    PROTO_MASS_GITHUB_API_URL: string;
}
