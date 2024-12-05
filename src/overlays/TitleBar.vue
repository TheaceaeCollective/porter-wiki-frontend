<script setup>

import { PhX } from '@phosphor-icons/vue';
import GradientLine from '@/components/GradientLine.vue';

defineProps({
	close: Function,
	title: String,
	titleStyle: {
		type: Number,
		default: 1
	}
});
</script>

<template>
	<div :class="`flex w-full mb-2 ${titleStyle == 2 ? 'justify-end' : ''}`">
		<p v-if="titleStyle == 1" class="justify text-4xl font-bold w-full">{{ title }}</p>
		<div class="bg-background-3 p-3 flex justify-center items-center rounded-lg hover:bg-background-4 theShadow cursor-pointer"
			@click="close(null)">
			<PhX :size="16" @click="close(null)" />
		</div>
	</div>
	<GradientLine v-if="titleStyle == 1" :overshoot="false" class="mb-2" />
</template>