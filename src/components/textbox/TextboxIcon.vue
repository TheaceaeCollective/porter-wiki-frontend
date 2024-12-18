<script setup>
const props = defineProps({
	icon: {
		type: Object,
		default: null
	},
	disabled: {
		type: Boolean,
		default: true
	},
	size: {
		type: Number,
		default: 22
	}
});
</script>

<template>
	<Component :is="icon" :size="size" :disabled="disabled"
		:class='"rounded cursor-" + `${disabled ? "deny" : "pointer hover:text-accent"}`' />
</template>