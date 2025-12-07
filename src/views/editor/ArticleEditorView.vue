<script lang="ts" setup>
import { useRoute, RouterLink } from "vue-router";
import { reactive, watch, provide, toRef, ref, onMounted } from "vue";
import { PhCaretRight } from "@phosphor-icons/vue";
import SelectedUnderline from "@/components/SelectedUnderline.vue";

import { ArticleMetadata, ArticleMetadataUtil } from "./ArticleMetadata";
import ArticleEditorSourceTab from "./components/ArticleEditorSourceTab.vue";
import ArticleEditorVisualTab from "./components/ArticleEditorVisualTab.vue";
import ArticleEditorHistoryTab from "./components/ArticleEditorHistoryTab.vue";
import ArticleEditorMetadataTab from "./components/ArticleEditorMetadataTab.vue";

import API from "@/utils/API";
import Utils from "@/utils/Utils";

// Utils.setTitle('Article Creation');

type ArticleEditorTab = "source" | "visual" | "history" | "metadata";
const defaultTab: ArticleEditorTab = "metadata";

type State = {
    meta: ArticleMetadata;
    markdown: { source: string };
    editSummary: string;
    breadcrumbs: { name: string; path: string }[];
    tab: ArticleEditorTab;
};

const react: State = reactive({
    meta: {
        title: "",
        description: "",
        author: "",
        image: "",
        layout: "",
        type: "wiki",
        date: Date.now() / 1000,
        tags: [],
    },
    markdown: {
        source: "",
    },
    editSummary: "",
    breadcrumbs: [],
    tab: defaultTab,
});

const articleUrl = ref("");
provide("articleUrl", articleUrl);

const articleMetadata = toRef(react.meta);
provide("articleMetadata", articleMetadata);

provide("editSummary", toRef(react.editSummary));

const markdownSource = toRef(react.markdown.source);
provide("markdownSource", markdownSource);

const route = useRoute();

interface ArticleEditorTabEntry {
    name: ArticleEditorTab;
    title: string;
}

interface ArticleEditorTabMap {
    left: ArticleEditorTabEntry[];
    right: ArticleEditorTabEntry[];
}

const tabs: ArticleEditorTabMap = {
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

const validateTab = (text: string): ArticleEditorTab => {
    if (!text.startsWith("#")) return defaultTab;
    text = text.substring(1);
    let result = tabs.left.find((item) => item.name == text);
    if (result === undefined) result = tabs.right.find((item) => item.name == text);
    if (result === undefined) return defaultTab;
    return result.name;
};

react.tab = validateTab(route.hash);

watch(
    route,
    (to) => {
        react.tab = validateTab(to.hash);
    },
    { flush: "pre", immediate: true, deep: true }
);

const loadArticle = (path: string) => {
    if (path.startsWith("/")) path = path.substring(1);
    let articlePath = `/articles/${path}`;
    articleUrl.value = articlePath;
    if (path == "style-test") {
        articlePath = "http://localhost:5173/src/assets/tests/blockquote-test.md"; // can be replaced with md files in the tests folder

        fetch(articlePath)
            .then((response) => response.text())
            .then((text) => {
                markdownSource.value = text;
            });
    } else {
        API.get(articlePath).then(async (res) => {
            if (res.status != 200) {
                // TODO Emma: handle errors and not found
                return;
            }

            // Set metadata fields:
            articleMetadata.value.title = res.data.meta.title;
            articleMetadata.value.description = res.data.meta.description;
            articleMetadata.value.author = res.data.meta.author;
            articleMetadata.value.image = res.data.meta.image;
            articleMetadata.value.layout = res.data.meta.layout;
            articleMetadata.value.type = ArticleMetadataUtil.parseArticleTypeFromBackend(res.data.meta.type);
            articleMetadata.value.date = res.data.meta.date;
            articleMetadata.value.tags = res.data.meta.tags;

            // Set breadcrumbs:
            react.breadcrumbs = res.data.breadcrumbs;

            // Set mardown content:
            markdownSource.value = res.data.content;
        });
    }
};

onMounted(() => {
    const path = route.query.path;
    if (typeof path == "string") loadArticle(<string>path);
});

react.meta.title = typeof route.params.title == "string" ? <string>route.params.title : route.path.split("/").pop();
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
                    <span v-if="index == Object.keys(react.breadcrumbs).length - 1">{{ part.name }}</span>
                    <RouterLink v-else class="text-light-gray readMoreHover" :to="part.path">{{ part.name }} </RouterLink>
                </span>
            </p>
        </div>
        <div class="w-full flex flex-col gap-4">
            <div class="w-full h-14 rounded-lg bg-background-1 flex flex-row justify-between px-5">
                <div class="flex flex-row gap-5">
                    <SelectedUnderline
                        v-for="tab in tabs.left"
                        class="hover:text-accent text-lg font-light cursor-pointer m-auto"
                        :href="'#' + tab.name"
                        :selected="react.tab == tab.name"
                        type="a"
                    >
                        {{ tab.title }}
                    </SelectedUnderline>
                </div>
                <div class="flex flex-row gap-5">
                    <SelectedUnderline
                        v-for="tab in tabs.right"
                        class="hover:text-accent text-lg font-light cursor-pointer m-auto"
                        :href="'#' + tab.name"
                        :selected="react.tab == tab.name"
                        type="a"
                    >
                        {{ tab.title }}
                    </SelectedUnderline>
                </div>
            </div>
            <ArticleEditorSourceTab v-if="react.tab == 'source'" />
            <ArticleEditorVisualTab v-if="react.tab == 'visual'" />
            <ArticleEditorHistoryTab v-if="react.tab == 'history'" />
            <ArticleEditorMetadataTab v-if="react.tab == 'metadata'" />
        </div>
    </div>
</template>

<style lang="scss"></style>
