<script lang="ts" setup>
import { useRoute, RouterLink } from 'vue-router';
import { reactive } from 'vue';
import { PhCaretRight } from '@phosphor-icons/vue';
import Textbox from '@/components/textbox/Textbox.vue';

import ArticleCreationSourceTab from './components/ArticleCreationSourceTab.vue';
import ArticleCreationVisualTab from './components/ArticleCreationVisualTab.vue';
import ArticleCreationHistoryTab from './components/ArticleCreationHistoryTab.vue';
import ArticleCreationMetadataTab from './components/ArticleCreationMetadataTab.vue';

import Utils from '@/utils/Utils';

// Utils.setTitle('Article Creation');

const react = reactive({
    meta: {
        title: '',
    },
    breadcrumbs: [],
    tab: 'metadata',
});

const route = useRoute();

const tabs = {
    left: [
        {
            name: "source",
            title: "Source",
        },
        {
            name: "visual",
            title: "Visual",
        },
        {
            name: "history",
            title: "Edit History",
        },
    ],
    right: [
        {
            name: "metadata",
            title: "Metadata",
        },
    ],
};

const validateTab = (text: string): string => {
    if (!text.startsWith('#'))
        return 'metadata';
    text = text.substring(1);
    if (tabs.left.find(item => item.name == text))
        return text;
    if (tabs.right.find(item => item.name == text))
        return text;
    return 'metadata';
}

react.tab = validateTab(route.hash);

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
react.meta.title = typeof (route.params.title) == typeof (String) ? <string>route.params.title : route.path.split('/').pop();
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
            <div class="w-full h-14 rounded-lg bg-background-1 flex flex-row justify-between px-5">
                <div class="flex flex-row gap-5">
                    <a v-for="tab in tabs.left" class="hover:text-accent text-lg font-light cursor-pointer m-auto"
                        v-bind:style="react.tab == tab.name ? 'color: #ff00ff' : ''" v-bind:href="'#' + tab.name"
                        @click="react.tab = tab.name">
                        {{ tab.title }}
                    </a>
                </div>
                <div class="flex flex-row">
                    <a v-for="tab in tabs.right" class="hover:text-accent text-lg font-light cursor-pointer m-auto"
                        v-bind:style="react.tab == tab.name ? 'color: #ff00ff' : ''" v-bind:href="'#' + tab.name"
                        @click="react.tab = tab.name">
                        {{ tab.title }}
                    </a>
                </div>
            </div>
            <ArticleCreationSourceTab v-if="react.tab == 'source'" />
            <ArticleCreationVisualTab v-if="react.tab == 'visual'" />
            <ArticleCreationHistoryTab v-if="react.tab == 'history'" />
            <ArticleCreationMetadataTab v-if="react.tab == 'metadata'" />
        </div>
    </div>
</template>
<style lang="scss"></style>