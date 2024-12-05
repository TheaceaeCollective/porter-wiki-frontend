<script setup>
import { computed } from "vue";

const props = defineProps({
    url: {
		type: String,
		default: null
	},
	first: {
		type: Boolean,
		default: false
	},
	middle: {
		type: Boolean,
		default: false
	},
	last: {
		type: Boolean,
		default: false
	}
});

const position = computed(() => {
	if (props.first) return "first";
	if (props.middle) return "middle";
	if (props.last) return "last";
	return "";
});
</script>

<template>
	<a class="nav-button w-12 h-12 bg-background-header-buttons rounded-lg flex justify-center items-center hover:bg-background-2 transition-colors cursor-pointer"
		:href="url" target="_blank" :position="position" >
		<slot></slot>
	</a>
</template>

<style lang="scss">
.nav-button {
	&[position="first"] {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	&[position="middle"] {
		border-radius: 0;
	}

	&[position="last"] {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
}
</style>