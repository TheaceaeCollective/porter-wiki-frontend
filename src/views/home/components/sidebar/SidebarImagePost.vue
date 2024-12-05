<script setup>
import { RouterLink } from 'vue-router';

import OverlapGrid from '@/components/OverlapGrid.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import DefaultImage from '@/assets/images/placeholder.png';

import Utils from '@/utils/Utils';

const props = defineProps({
	post: {
		type: Object,
		required: true
	}
});
</script>

<template>
	<RouterLink :to="post.url">
		<OverlapGrid class="sidebar-post h-44 rounded-lg">
			<LoadingImage :src="Utils.fixCDNImages(post.meta.image, post.url) || DefaultImage" alt="card background"
				class="object-cover" />
			<div class="sidebar-image-dim"></div>
			<div class="flex flex-col justify-end p-3">
				<h2 class="text-xl font-semibold line-clamp-3 leading-tight text-shadow">{{ post.meta.title }}</h2>
				<p class="text-base leading-tight">by {{ post.meta.author }}</p>
			</div>
		</OverlapGrid>
	</RouterLink>
</template>

<style>
.sidebar-post {
	.sidebar-image-dim {
		transition: background 200ms;
		background: rgba(0, 0, 0, 0.4) linear-gradient(180deg, transparent 0%, var(--background-4) 100%);
	}

	&:hover>.sidebar-image-dim {
		transition: background 50ms;
		background: rgba(0, 0, 0, 0.0) linear-gradient(180deg, transparent 0%, var(--background-4) 100%);
	}
}

.text-shadow {
	text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>