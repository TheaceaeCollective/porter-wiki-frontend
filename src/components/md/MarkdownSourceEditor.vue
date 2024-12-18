<script setup>
import EditorToolbar from "@/components/EditorToolbar.vue";

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
        <div class="w-full flex gap-2">
            <textarea
                class="h-96 w-full overflow-scroll rounded-lg bg-background-1 px-3 py-1 text-lg outline-none ring-background-4 focus:ring-2"
                >{{ markdown }}</textarea
            >
        </div>
    </div>
</template>

<style lang="scss"></style>
