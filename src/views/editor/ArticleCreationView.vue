<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { reactive } from 'vue';
import { PhCaretRight } from '@phosphor-icons/vue';
import Textbox from '@/components/textbox/Textbox.vue';

import Utils from '@/utils/Utils';

// Utils.setTitle('Article Creation');

const react = reactive({
    meta: {
        title: '',
    },
    breadcrumbs: [],
});

const route = useRoute();

const createCrumbs = () => {
    const pathParts = route.path.split('/').filter(Boolean);
    react.breadcrumbs = pathParts.map((part, index) => {
        return {
            name: part.charAt(0).toUpperCase() + part.slice(1),
            path: '/' + pathParts.slice(0, index + 1).join('/'),
        };
    });
};

createCrumbs();
react.meta.title = route.params.title || route.path.split('/').pop();
Utils.setTitle(react.meta.title);
</script>

<template>
    <div class="article-page w-full xl:w-content-width">
        <!-- todo: breadcrumbs are suppose to be the title of the article the user is wishing to create -->
        <div class="flex justify-between w-full mb-2 px-5 flex-wrap">
            <p class="flex gap-0.5 flex-wrap">
                <RouterLink to="/" class="text-light-gray readMoreHover">Home</RouterLink>
                <span v-for="(part, index) in react.breadcrumbs" class="flex items-center gap-1">
                    <PhCaretRight :size="16" class="text-light-gray" />
                    <span v-if="index == (Object.keys(react.breadcrumbs).length - 1)">{{ part.name }}</span>
                    <RouterLink v-else class="text-light-gray readMoreHover" :to=part.path>{{ part.name }}
                    </RouterLink>
                </span>
            </p>
        </div>
        <div class="w-full flex flex-col gap-4 pt-4">
            <div>
                <div class="w-full h-14 bg-black"></div>
            </div>
            <div>
                <h1 class="text-2xl font-medium pb-1">Edit summary (briefly describe your changes)</h1>
                <Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
            </div>
            <div>
                <h1 class="text-xl font-medium pb-1">Article cover</h1>
                <div class="w-full h-[148px] bg-black"></div>
            </div>
            <div class="w-full flex flex-row gap-4">
                <div class="w-full">
                    <h1 class="text-xl font-medium pb-1">Article title</h1>
                    <Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
                </div>
                <div class="w-full">
                    <h1 class="text-xl font-medium pb-1">Article type</h1>
                    <Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
                </div>
                <div class="w-full">
                    <h1 class="text-xl font-medium pb-1">Article date</h1>
                    <Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
                </div>
            </div>
            <div class="w-full flex flex-row gap-4">
                <div class="w-full">
                    <h1 class="text-xl font-medium pb-1">Article description</h1>
                    <Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
                </div>
                <div class="w-full">
                    <h1 class="text-xl font-medium pb-1">Article tags</h1>
                    <Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>