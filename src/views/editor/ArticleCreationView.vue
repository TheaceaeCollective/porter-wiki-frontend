<script setup>
import { reactive } from 'vue';

import Utils from '@/utils/Utils';

Utils.setTitle('Article Creation');
</script>

<template>
    test
</template>
<style lang="scss">
.news-header {
    background-color: var(--background-1);
    background: url('/src/assets/images/home-header.png') no-repeat center center / cover;

    .dim {
        background: rgba(255, 255, 255, 0.1) linear-gradient(-120deg, transparent 0%, var(--background-1) 50%)
    }
}
</style>