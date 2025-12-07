<script setup>
import { PhPlus } from "@phosphor-icons/vue";
import EditorToolbar from "@/components/EditorToolbar.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = defineProps({
    beDisabled: {
        type: Boolean,
        default: false,
    },
    markdown: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div
        class="h-auto w-full flex flex-col rounded-xl bg-background-3 p-2 gap-2"
    >
        <EditorToolbar />
    </div>
    <button
        class="w-100 py-1 px-2 insert-paragraph bg-background-4 cursor-pointer text-left"
    >
        <PhPlus :size="22" class="inline-block mr-2" />Insert text
    </button>
    <div>{{ markdown }}</div>
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
