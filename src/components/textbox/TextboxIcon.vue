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
		default: 24
	},
	title: {
		type: String,
		default: ''
	}
});
</script>

<template>
	<span :title="title">
		<Component :is="icon" :size="size" :disabled="disabled"
			:class='"rounded cursor-" + `${disabled ? "deny" : "pointer hover:text-accent"}`' />
	</span>
</template>