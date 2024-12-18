<script setup>
import Textbox from "@/components/textbox/Textbox.vue";
import { PhCloudArrowUp } from "@phosphor-icons/vue";
</script>

<template>
    <!-- todo: replace some text boxes with dropdowns. maybe replace shit textbox code -->
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
    <div>
        <h1 class="text-xl font-medium pb-1">Article cover</h1>
        <div
            id="dragAndDrop"
            class="w-full h-auto bg-background-1 rounded-lg p-6 flex align-center justify-center items-center flex-col"
        >
            <PhCloudArrowUp :size="54" />
            <p class="text-2xl">Drag image here to upload</p>
            <p class="text-lg font-medium">
                ... or click to select from a file picker
            </p>
        </div>
    </div>
    <div class="w-full flex flex-row gap-4">
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article title</h1>
            <Textbox
                placeholder-text="Insert some text..."
                :simple="true"
            ></Textbox>
        </div>
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article type</h1>
            <select
                name="font_style"
                class="flex w-full rounded-xl bg-background-1 p-3 text-lg h-12"
            >
                <option value="wiki">Wiki</option>
                <option value="news">News</option>
                <option value="blog">Blog</option>
            </select>
        </div>
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article date</h1>
            <Textbox
                placeholder-text="Insert some text..."
                :simple="true"
            ></Textbox>
        </div>
    </div>
    <div class="w-full flex flex-row gap-4">
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article description</h1>
            <Textbox
                placeholder-text="Insert some text..."
                :simple="true"
            ></Textbox>
        </div>
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article tags</h1>
            <Textbox
                placeholder-text="Insert some text..."
                :simple="true"
            ></Textbox>
        </div>
    </div>
</template>

<style lang="scss"></style>
