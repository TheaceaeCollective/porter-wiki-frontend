<script setup lang="ts">
import { onMounted, ref } from 'vue';
const currentLocation = ref('');
onMounted(() => {
    currentLocation.value = window.location.origin;
});
</script>

<template>
    <a :href="`${currentLocation}/news/gardens-wiki`"
        class="sticky bottom-0 bg-cover bg-center bg-no-repeat w-full bg-red flex items-center justify-center overflow-hidden z-10 print:hidden">
        <div id="dim"
            class="relative w-full py-2 inset-0 flex justify-center items-center transition-background duration-400 bg-black/20">
            <p class="font-bold text-center text-white">The site is no longer in development due to our priorities
                being elsewhere. Don't fret, we're just migrating! Click here for info.</p>
        </div>
    </a>
</template>

<style lang="scss">
#dim {
    transition: background 400ms;

    &:hover {
        transition: background 200ms;
        background: rgba(0, 0, 0, 0);
    }
}
</style>