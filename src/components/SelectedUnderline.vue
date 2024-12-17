<script setup>
const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return value == null || ["link", "span"].includes(value);
        },
    },
    selected: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <a
        v-if="props.type == 'link'"
        class="selected-underline"
        v-bind:aria-selected="props.selected"
    >
        <slot></slot>
    </a>
    <span
        v-else-if="props.type == null || props.type == 'span'"
        class="selected-underline"
        v-bind:aria-selected="props.selected"
    >
        <slot></slot>
    </span>
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
