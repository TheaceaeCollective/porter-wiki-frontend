<script setup>
import Blockquote from '@/components/Blockquote.vue';
import GradientLine from '@/components/GradientLine.vue';

const props = defineProps({
	title: {
		type: String,
		required: true
	}
});
</script>

<template>
	<Blockquote class="blockquote-note" v-bind="$attrs">
		<h3 class="text-center mb-2">{{ title }}</h3>
		<div class="w-2/3 m-auto">
			<GradientLine :overshoot="false" />
		</div>
		<div class="text-center leading-tight mt-2 text-lg">
			<slot></slot>
		</div>
	</Blockquote>
</template>

<style lang="scss"></style>