<script lang="ts" setup>
import { Ref, inject } from "vue";
import InputText from "@/components/input/InputText.vue";
import MarkdownSourceEditor from "@/components/md/MarkdownSourceEditor.vue";

const editSummary: Ref<string> = inject("editSummary");
</script>

<template>
    <div>
        <div class="mb-1">
            <span class="text-2xl font-medium mr-1">Edit summary</span
            ><span>(Briefly describe your changes)</span>
        </div>
        <InputText
            placeholder="Insert some text..."
            :value="editSummary"
            @input="(event) => (editSummary = event.target.value)"
        />
    </div>
    <MarkdownSourceEditor />
</template>

<style lang="scss"></style>
