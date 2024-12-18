<script setup>
const props = defineProps({
    type: {
        type: String || Object,
        default: "span",
    },
    selected: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <component
        class="selected-underline"
        :is="props.type"
        :aria-selected="props.selected"
    >
        <slot></slot>
    </component>
</template>

<style lang="scss">
.selected-underline {
    padding-top: 4px;
}

.selected-underline[aria-selected="true"] {
    font-weight: 500;
}

.selected-underline::after {
    display: block;
    content: "";
    width: 100%;
    height: 4px;
    background-color: transparent;
    border-radius: 2px;
}

.selected-underline[aria-selected="true"]::after {
    /* TODO: make this come from variable file */
    background: linear-gradient(to right, #833bff, #805fad);
}
</style>
