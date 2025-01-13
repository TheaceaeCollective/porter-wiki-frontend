<script setup>

import { defineProps } from 'vue';
import OverlapGrid from './OverlapGrid.vue';
import LoadingImage from './LoadingImage.vue';

import DefaultProfileImage from '@/assets/images/home-header.png';

const props = defineProps({
	user: {
		type: Object,
		default: {}
	}
});

</script>

<template>
	<OverlapGrid class="profile-card w-full h-20 rounded-xl overlap-grid">
		<!-- todo: get discord banner or custom banner -->
		<LoadingImage :src="DefaultProfileImage" class="object-cover bg-no-repeat bg-cover bg-center" />
		<div class="radial-dim"></div>
		<div class="flex gap-2 content-center rounded-xl p-3 h-20">
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
	</OverlapGrid>
</template>

<style lang="scss">
.profile-card {
	.radial-dim {
		background: radial-gradient(circle at 100% 0%, transparent, var(--background-1) 70%);
	}
}
</style>