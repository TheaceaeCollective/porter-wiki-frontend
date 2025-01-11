<script lang="ts" setup>
import InputText from "@/components/input/InputText.vue";
import MarkdownVisualEditor from "@/components/md/MarkdownVisualEditor.vue";
</script>

<template>
    <div>
        <div class="mb-1">
            <span class="text-2xl font-medium mr-1">Edit summary</span
            ><span>(Briefly describe your changes)</span>
        </div>
        <InputText placeholder="Insert some text..." />
    </div>
    <MarkdownVisualEditor />
</template>

<style lang="scss"></style>
