<script lang="ts">
    // store
    import minimap from '$lib/store/minimap';
</script>

<div class="minimap">
    <div class="map">
        <!-- {($minimap.length = $minimap.length - 1)} -->
        {#each $minimap as pixel, i (`${pixel}-${i}`)}
        {@const half = 312}
            <div class="pixel pixel-{pixel}" style="--x:{
                i < half ? i + 1 : half - i};--y:{
                i < half ? half - i : i + 1}" 
            />
        {/each}
    </div>
</div>

<style lang="scss">
    .minimap {
        .map {
            // TODO: make a square of 624 div.pixel
            width: rem(170);
            height: rem(170);
            // display: grid;
            // grid-template-columns: repeat(312, 0.5px);
            // grid-template-rows: repeat(312, 0.5px);
            display: flex;
            flex-flow: row wrap;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 0;

            .pixel {
                width: 5px;
                height: 5px;
                // width: 0.5px;
                // height: 0.5px;
                // grid-column: var(--x) / 312;
                // grid-row: var(--y) / 312;

                &-0 {
                    background-color: #000;
                }
                &-1 {
                    background-color: #fff;
                }
                &-2 {
                    background-color: #f00;
                }
                &-3 {
                    background-color: #0f0;
                }
                &-4 {
                    background-color: #00f;
                }
                &-5 {
                    background-color: #ff0;
                }
                &-6 {
                    background-color: #f0f;
                }
                &-7 {
                    background-color: #0ff;
                }
                &-8 {
                    background-color: #888;
                }
                &-9 {
                    background-color: #444;
                }
                &-10 {
                    background-color: #666;
                }
                &-11 {
                    background-color: #999;
                }
                &-12 {
                    background-color: #333;
                }
                &-13 {
                    background-color: #111;
                }
                &-14 {
                    background-color: #222;
                }
                &-15 {
                    background-color: #55f;
                }
                &-16 {
                    background-color: #77f;
                }
                &-17 {
                    background-color: #aaf;
                }
                &-18 {
                    background-color: #ccf;
                }
                &-19 {
                    background-color: #2ef;
                }
                &-20 {
                    background-color: #f00;
                }
                &-21 {
                    background-color: #ff4;
                }
                &-22 {
                    background-color: #00f;
                }
                &-23 {
                    background-color: #5ff;
                }
            }
        }
    }
</style>
