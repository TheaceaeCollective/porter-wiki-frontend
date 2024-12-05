<script setup>
import { RouterLink } from 'vue-router';

import Formatting from '@/utils/Formatting';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <RouterLink v-if="post.url" :to="post.url || '/not-found'">
        <div
            class="flex min-h-9 w-full flex-col rounded-lg bg-background-3 p-5 gap-5 hover:bg-background-4 transition-colors duration-200 hover:duration-50">
            <div class="flex justify-between items-center">
                <h1 class="simple-post-title text-3xl font-medium">{{ post.meta.title || "post title" }}</h1>
                <h3 class="text-base font-medium text-nowrap">{{ Formatting.formatDate(post.meta.date) }}</h3>
            </div>
            <div class="w-full flex flex-col gap-3">
                <p class="text-lg w-full leading-tight break-words whitespace-pre-wrap">
                    {{ post.meta.description || "post description" }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss">
.simple-post-title {
    max-height: 2em;
    max-width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>