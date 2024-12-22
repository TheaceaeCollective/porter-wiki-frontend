<script setup>
import { PhQuestionMark } from '@phosphor-icons/vue';


const props = defineProps({
    icon: {
        type: Object,
        default: PhQuestionMark
    },
    title: {
        type: String,
        default: "????"
    },
    subtitle: {
        type: String,
        default: "???????"
    },
    buttonStyle: {
        type: String,
        default: "normal",
        validator(value) {
            return value == null || ["normal", "danger"].includes(value)
        }
    }
});

let extraStyling = "text-light-gray hover:border-l-accent hover:text-white";
if (props.buttonStyle == "danger") extraStyling = "text-red hover:border-l-accent-soft hover:text-accent-soft";
</script>

<template>
    <button
        :class="'transition flex flex-row items-center text-left cursor-pointer p-3 border-l-2 w-full ' + extraStyling">
        <component :is="icon" size="32" />
        <div class="flex flex-col px-2">
            <p class="text-xl font-medium leading-6">{{ title }}</p>
            <p class="text-lg leading-6">{{ subtitle }}</p>
        </div>
    </button>
</template>