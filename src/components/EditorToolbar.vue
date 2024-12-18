<script setup>
import {
    PhCaretDown,
    PhTextBolder,
    PhTextItalic,
    PhTextUnderline,
    PhTextStrikethrough,
    PhListBullets,
    PhListNumbers,
    PhQuotes,
    PhHighlighter,
} from "@phosphor-icons/vue";

const props = defineProps({
    size: {
        type: Number,
        default: 22,
    },
});
</script>

<template>
    <div
        class="editor-toolbar max-w-fit flex flex-wrap bg-background-2 rounded-lg pr-1"
    >
        <div id="heading" class="w-auto flex">
            <button class="editor-toolbar-button hover:text-accent">
                Paragraph
                <PhCaretDown class="inline-block ml-4" :size="props.size" />
            </button>
        </div>
        <div id="formatting" class="w-auto flex">
            <button class="editor-toolbar-button hover:text-accent">
                <PhTextBolder :size="props.size" />
            </button>
            <button class="editor-toolbar-button hover:text-accent">
                <PhTextItalic :size="props.size" />
            </button>

            <button class="editor-toolbar-button hover:text-accent">
                <PhTextUnderline :size="props.size" />
            </button>

            <button class="editor-toolbar-button hover:text-accent">
                <PhTextStrikethrough :size="props.size" />
            </button>
        </div>
        <div id="list" class="w-auto flex">
            <button class="editor-toolbar-button hover:text-accent">
                <PhListBullets :size="props.size" />
            </button>

            <button class="editor-toolbar-button hover:text-accent">
                <PhListNumbers :size="props.size" />
            </button>
        </div>
        <div id="misc" class="w-auto flex">
            <button
                class="editor-toolbar-button cursor-pointer hover:text-accent"
            >
                <PhQuotes :size="props.size" class="inline-block mr-1" />
                Cite
            </button>
            <button
                class="editor-toolbar-button cursor-pointer hover:text-accent"
            >
                <PhHighlighter :size="props.size" class="inline-block mr-1" />
                Highlight
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.editor-toolbar > *:not(:last-child) {
    border-right: 2px solid rgba(255, 255, 255, 15%);
}
.editor-toolbar > * {
    padding-left: 5px;
    padding-right: 5px;
}
.editor-toolbar-button {
    padding: 5px;
    font-size: 1.1rem;
}
</style>
