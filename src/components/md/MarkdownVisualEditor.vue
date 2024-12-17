<script setup>
import {
    PhTextBolder,
    PhTextItalic,
    PhTextH,
    PhTextUnderline,
    PhTextStrikethrough,
    PhListBullets,
    PhListNumbers,
    PhListChecks,
    PhQuotes,
    PhCodeSimple,
    PhHighlighter,
    PhSelection,
    PhGridFour,
    PhLinkSimple,
    PhImage,
    PhPaperPlaneRight,
    PhX,
    PhPlus,
} from "@phosphor-icons/vue";
import TextboxIcon from "../textbox/TextboxIcon.vue";

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
        <div
            class="max-w-fit flex flex-wrap px-2 gap-2 bg-background-2 rounded-lg py-2"
        >
            <div id="formatting" class="w-auto flex gap-3">
                <TextboxIcon :icon="PhTextBolder" :disabled="beDisabled" />
                <TextboxIcon :icon="PhTextItalic" :disabled="beDisabled" />
                <TextboxIcon :icon="PhTextH" :disabled="beDisabled" />
                <TextboxIcon :icon="PhTextUnderline" :disabled="beDisabled" />
                <TextboxIcon
                    :icon="PhTextStrikethrough"
                    :disabled="beDisabled"
                />
            </div>
            <div
                class="h-auto w-0.5"
                style="background: rgba(255, 255, 255, 15%)"
            ></div>
            <div id="list" class="w-auto flex gap-3">
                <TextboxIcon :icon="PhListBullets" :disabled="beDisabled" />
                <TextboxIcon :icon="PhListNumbers" :disabled="beDisabled" />
                <TextboxIcon :icon="PhListChecks" :disabled="beDisabled" />
            </div>
            <div
                class="h-auto w-0.5"
                style="background: rgba(255, 255, 255, 15%)"
            ></div>
            <div id="misc" class="w-auto flex gap-3">
                <TextboxIcon :icon="PhQuotes" :disabled="beDisabled" />
                <TextboxIcon :icon="PhCodeSimple" :disabled="beDisabled" />
                <TextboxIcon :icon="PhHighlighter" :disabled="beDisabled" />
                <TextboxIcon :icon="PhSelection" :disabled="beDisabled" />
                <TextboxIcon :icon="PhGridFour" :disabled="beDisabled" />
                <TextboxIcon :icon="PhLinkSimple" :disabled="beDisabled" />
                <TextboxIcon :icon="PhImage" :disabled="beDisabled" />
            </div>
        </div>
    </div>
    <button class="w-100 py-2 px-2 insert-paragraph cursor-pointer text-left">
        <PhPlus :size="22" class="inline-block mr-2" />Insert paragraph
    </button>
    <div>{{ markdown }}</div>
</template>

<style lang="scss">
.insert-paragraph {
    background-color: rgba(0, 255, 0, 40%);
    border: 1px dashed #d3d3d3;
    border-radius: 10px;
    user-select: none;
}
</style>
