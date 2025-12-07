<script setup>
import Textbox from "@/components/textbox/Textbox.vue";
import MarkdownVisualEditor from "@/components/md/MarkdownVisualEditor.vue";
</script>

<template>
    <div>
        <div class="mb-1">
            <span class="text-2xl font-medium mr-1">Edit summary</span
            ><span>(Briefly describe your changes)</span>
        </div>
        <Textbox
            placeholder-text="Insert some text..."
            :simple="true"
        ></Textbox>
    </div>
    <MarkdownVisualEditor markdown="Page goes here."></MarkdownVisualEditor>
</template>

<style lang="scss"></style>
