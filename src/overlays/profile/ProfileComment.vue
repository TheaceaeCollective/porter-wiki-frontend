<script setup>
import {
    PhLinkSimple,
    PhPencil,
    PhTrash,
    PhArrowFatUp,
    PhArrowFatDown,
} from "@phosphor-icons/vue";
const props = defineProps({
    borderColor: {
        type: String,
        default: "white",
    },
    commentorPicture: {
        type: String,
        default: "https://picsum.photos/56/56",
    },
});
</script>

<template>
    <div class="flex flex-row gap-4 hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-xl">
        <img class="rounded-xl border-2 h-[56px]" :src="`${commentorPicture}`" :style="`border-color: ${borderColor}`"
            alt="avatar" />
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <div class="flex flex-row items-center gap-2">
                        <span class="text-xl font-bold">Name</span>
                        <span class="text-base opacity-70">@mytagname</span>
                    </div>
                    <span>Jan 6, 2024 - 12 minutes ago</span>
                </div>
                <span class="text-xl leading-6 font-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Velit
                    quisquam laudantium architecto dolor ipsam temporibus officia porro
                    reiciendis eaque totam necessitatibus fugiat quae non delectus
                    sapiente omnis enim, nemo officiis!</span>
            </div>
            <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-2">
                    <button class="flex flex-row gap-1 group">
                        <PhLinkSimple class="text-gray group-hover:text-light-gray" @click="copyLink" :size="22" />
                        <!-- Make text glow on hover using Tailwind CSS -->
                        <span class="group-hover:text-white">Link</span>
                    </button>
                    <button class="flex flex-row gap-1 group">
                        <PhPencil class="text-gray group-hover:text-light-gray" @click="copyLink" :size="22" />
                        <span class="group-hover:text-white">Edit</span>
                    </button>
                    <button class="flex flex-row gap-1 group">
                        <PhTrash class="text-red group-hover:text-userfeedback-error" @click="copyLink" :size="22" />
                        <span class="text-red">Delete</span>
                    </button>
                </div>
                <div class="flex flex-row items-center justify-center gap-2">
                    <PhArrowFatUp class="text-white text-opacity-60 hover:text-light-gray" @click="copyLink"
                        :size="22" />
                    <span class="text-xl">-4</span>
                    <PhArrowFatDown class="text-white text-opacity-60 hover:text-light-gray" @click="copyLink"
                        :size="22" />
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>