<script setup>
const props = defineProps({
	overshoot: {
		type: Boolean,
		default: true
	},
	lineStyle: {
		type: String,
		default: "hort",
		validator(value) {
			return value == null || ["hort", "vert"].includes(value)
		}
	}
});
</script>

<template>
	<div :class="'gradient-line style-' + lineStyle + ' ' + (overshoot ? 'overshoot' : '')"></div>
</template>

<style>
.gradient-line {
	background: linear-gradient(to right, #E442B7, #EF656E);

	&.style-hort {
		width: 100%;
		height: 2px;
	}

	&.style-vert {
		width: 2px;
		height: 100%;
	}


	&.overshoot {
		width: calc(100% + 10px);
		margin: 0 -5px;
	}

	&.overshoot-extra {
		width: calc(100% + 20px);
		margin: 0 -10px;
	}
}
</style>