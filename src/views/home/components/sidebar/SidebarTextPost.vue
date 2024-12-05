<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <RouterLink class="flex-auto" :to="post.url">
        <div class="flex flex-col h-full justify-center p-3 bg-background-4 hover:bg-background-2 rounded-lg transition-colors duration-200 hover:duration-50">
            <h2 class="text-xl font-semibold line-clamp-3 leading-tight">{{ post.meta.title }}</h2>
            <p class="text-base leading-tight">by {{ post.meta.author }}</p>
        </div>
    </RouterLink>
</template>