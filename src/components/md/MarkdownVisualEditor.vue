<script lang="ts" setup>
import { Ref, ref, inject, watch, onMounted } from "vue";
import { PhPlus } from "@phosphor-icons/vue";

import EditorToolbar from "@/components/EditorToolbar.vue";
import Dropdown from "@/components/Dropdown.vue";
import MarkdownUtils from "@/utils/MarkdownUtils";
import TypeUtils from "@/utils/TypeUtils";
import MarkdownView from "@/components/md/MarkdownView.vue";

const props = defineProps({
    beDisabled: {
        type: Boolean,
        default: false,
    },
});

const renderedMarkdown = ref("");
const markdownSource: Ref<string> = inject("markdownSource");

async function renderMd(source: string) {
    var md = MarkdownUtils.parse({ content: source });
    var result = MarkdownUtils.render(md.content, null, true, true);
    if (TypeUtils.isPromise(result)) renderedMarkdown.value = await result;
    else renderedMarkdown.value = result;
}

onMounted(async () => await renderMd(markdownSource.value));
</script>

<template>
    <div
        class="h-auto w-full flex flex-col rounded-xl bg-background-3 p-2 gap-2"
    >
        <EditorToolbar />
    </div>
    <!--
    <button
        class="w-100 py-1 px-2 insert-paragraph bg-background-4 cursor-pointer text-left"
    >
        <PhPlus :size="22" class="inline-block mr-2" />Insert text
    </button>
    -->
    <MarkdownView :article="renderedMarkdown" />
    <Dropdown :options="['Paragraph', 'Heading', 'Sub-heading 1']" />
</template>

<style lang="scss">
.insert-paragraph {
    border: 1px dashed #d3d3d3;
    user-select: none;
    font-weight: 500;
    font-size: 1.2rem;
}
</style>
