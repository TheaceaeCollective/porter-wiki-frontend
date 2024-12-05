<script setup>
import { RouterLink } from 'vue-router';

import OverlapGrid from '@/components/OverlapGrid.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import EmptyImage from '@/assets/images/empty.png';
import DefaultImage from '@/assets/images/placeholder.png';

import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';

const props = defineProps({
	postType: {
		type: String
	},
	linearBackground: {
		type: Boolean,
		default: false
	},
	post: {
		type: Object,
		required: true
	}
});

</script>

<template>
	<RouterLink :to="post.url || '/not-found'">
		<OverlapGrid class="news-post w-full h-28 rounded-lg overlap-grid" v-if="post.meta">
			<LoadingImage :src="Utils.fixCDNImages(post.meta.image, post.url) || DefaultImage || EmptyImage"
				class="object-cover" />
			<div class="dim" v-if="linearBackground"></div>
			<div class="radial-dim" v-else></div>
			<div class="card-content">
				<div class="card-line">
					<!-- this messes up jp text. sucks - john -->
					<h2 class="post-title text-2xl font-medium text-shadow">{{ post.meta.title }}</h2>
					<div class="flex justify-between items-center">
						<h3 class="text-lg font-semibold">{{ postType }}</h3>
						<h3 class="text-base font-medium">{{ Formatting.formatDate(post.meta.date) }}</h3>
					</div>
				</div>
				<div class="card-line">
					<p class="post-description w-full">{{ post.meta.description }}</p>
				</div>
			</div>
		</OverlapGrid>
	</RouterLink>
</template>

<style lang="scss">
.news-post {

	.dim {
		transition: background 400ms;
		background: rgba(0, 0, 0, 0.4) linear-gradient(-120deg, transparent 0%, var(--background-1) 58%);
	}

	.radial-dim {
		background: radial-gradient(circle at 100% 0%, transparent, var(--background-1) 58%);
	}

	&:hover>.dim {
		transition: background 200ms;
		background: rgba(0, 0, 0, 0.0) linear-gradient(-120deg, transparent 0%, var(--background-1) 58%);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		padding: 20px;
		justify-content: space-between;

		.card-line {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.post-description {
			font-size: 18px;
			max-height: 3em;
			max-width: auto;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.post-title {
			max-height: 4em;
			max-width: auto;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}
}
</style>