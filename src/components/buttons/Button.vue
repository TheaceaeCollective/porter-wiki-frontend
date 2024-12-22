<script setup>
import { PhCheckFat, PhTrashSimple } from '@phosphor-icons/vue';

const props = defineProps({
	type: {
		type: String,
		validator(value) {
			return value == null || ['success', 'error'].includes(value);
		}
	}
});

</script>

<template>
	<button v-if="type !== 'success' && type !== 'error'"
		class="bg-background-4 hover:bg-background-3 flex row gap-2 items-center justify-center p-3 rounded-xl text-lg cursor-pointer leading-5">
		<slot></slot>
	</button>

	<button v-else :class="[(type === 'success') ? 'colorButtonSuccess' : 'colorButtonError']"
		class="flex gap-2 items-center justify-center p-3 rounded-xl text-lg cursor-pointer leading-5">
		<slot></slot>
		<PhCheckFat v-if="type === 'success'" :size="18" weight="fill" />
		<PhTrashSimple v-else :size="18" weight="fill" />
	</button>
</template>

<style>
/* optimize? -john */
.colorButtonSuccess {
	background-color: #00FF0066;
	/*equals rgba(0, 255, 0, 0.4)*/

	&:hover {
		background-color: #00FF0099;
		/*(99 (hex) in alpha is 0.6)*/
	}
}

.colorButtonError {
	background-color: #DD000066;
	/*rgba(221, 0, 0, 0.4)*/


	&:hover {
		background-color: #DD000099;
	}
}
</style>
