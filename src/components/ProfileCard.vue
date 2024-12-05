<script setup>

import { defineProps } from 'vue';

const props = defineProps({
	user: {
		type: Object,
		default: {}
	}
});

</script>

<template>
	<div class="flex gap-2 content-center rounded-xl bg-background-1 p-3 h-20">
		<img :class="`rounded-xl border-2 w-14 h-14`" :src="props.user.avatar"
			:style="`border-color: ${props.user.color}`" alt="avatar" />
		<div class="flex flex-col content-center justify-center">
			<p class="text-2xl font-semibold leading-7">
				{{ props.user.nickname || props.user.nick || props.user.username || props.user.props.name }}
			</p>
			<p class="text-base font-semibold leading-4 text-light-gray">
				{{ (props.user.loggedIn ? "@" : "") + (props.user.username || props.user.name) }}</p>
		</div>
	</div>
</template>