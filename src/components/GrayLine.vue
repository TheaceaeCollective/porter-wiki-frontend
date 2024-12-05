<script setup>
const props = defineProps({
	overshoot: {
		type: Boolean,
		default: false
	},
	lineStyle: {
		type: Number,
		default: 1
	}
});
</script>

<template>
	<div :class="'gray-line style-' + lineStyle + ' ' + (overshoot ? 'overshoot' : '')"></div>
</template>

<style>
.gray-line {
	width: 100%;
	height: 1px;

	&.overshoot {
		width: calc(100% + 10px);
		margin: 0 -5px;
	}

	&.overshoot-extra {
		width: calc(100% + 20px);
		margin: 0 -10px;
	}

	&.style-1 {
		background: #808080;
	}

	&.style-2 {
		background: rgba(255, 255, 255, 15%);
	}
}
</style>