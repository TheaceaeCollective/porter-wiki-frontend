<script setup>
import Textbox from "@/components/textbox/Textbox.vue";
import MarkdownSourceEditor from "@/components/md/MarkdownSourceEditor.vue";
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
    <MarkdownSourceEditor
        markdown="## Biography
Text here

### News Release
More text"
    ></MarkdownSourceEditor>
</template>

<style lang="scss"></style>
