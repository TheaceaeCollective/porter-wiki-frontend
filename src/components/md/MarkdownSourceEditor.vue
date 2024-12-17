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
        <div class="w-full flex gap-2">
            <textarea
                class="h-96 w-full overflow-scroll rounded-lg bg-background-1 px-3 py-1 text-lg outline-none ring-background-4 focus:ring-2"
                >{{ markdown }}</textarea
            >
        </div>
    </div>
</template>

<style lang="scss"></style>
