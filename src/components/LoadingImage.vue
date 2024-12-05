<script setup>
import { reactive } from 'vue';

const react = reactive({
  loaded: false
});

function onImageLoaded() {
  react.loaded = true;
}
</script>

<template>
  <Transition name="image-fade">
    <img v-show="react.loaded" loading="eager" @load="onImageLoaded" />
  </Transition>
</template>

<style>
.image-fade-enter-active {
  transition: all 400ms;
  position: relative;
}

.image-fade-enter-to {
  opacity: 1;
}

.image-fade-enter-from {
  opacity: 0;
}
</style>