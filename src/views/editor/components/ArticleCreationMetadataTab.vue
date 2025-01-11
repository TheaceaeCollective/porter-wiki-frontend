<script setup>
import InputText from "@/components/input/InputText.vue";
import InputSelect from "@/components/input/InputSelect.vue";
import { PhCloudArrowUp } from "@phosphor-icons/vue";
</script>

<template>
    <!-- todo: replace some text boxes with dropdowns. maybe replace shit textbox code -->
    <div>
        <div class="mb-1">
            <span class="text-2xl font-medium mr-1">Edit summary</span
            ><span>(Briefly describe your changes)</span>
        </div>
        <InputText placeholder="Insert some text..." />
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
            <InputText placeholder="Insert some text..." />
        </div>
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article type</h1>
            <InputSelect name="font_style">
                <option value="wiki">Wiki</option>
                <option value="news">News</option>
                <option value="blog">Blog</option>
            </InputSelect>
        </div>
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article date</h1>
            <InputText placeholder="Insert some text..." />
        </div>
    </div>
    <div class="w-full flex flex-row gap-4">
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article description</h1>
            <InputText placeholder="Insert some text..." />
        </div>
        <div class="w-full">
            <h1 class="text-xl font-medium pb-1">Article tags</h1>
            <InputText placeholder="Insert some text..." />
        </div>
    </div>
</template>

<style lang="scss">
// https://stackoverflow.com/questions/56593500/change-the-dropdown-arrow-design
select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='%23cccccc'%3E%3Cpath d='M208.49 96.49a12 12 0 0 0-17 0L128 159l-63.51-62.51a12 12 0 0 0-17 17l72 72a12 12 0 0 0 17 0l72-72a12 12 0 0 0 0-17z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 24px auto;
}
</style>
