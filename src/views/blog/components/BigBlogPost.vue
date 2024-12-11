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
	<RouterLink :to="post.url || '/not-found'" class="w-fit">
		<!-- this stupid fixed width and height man - john -->
		<OverlapGrid class="big-news-post w-full h-full rounded-lg overlap-grid md:w-[598px] md:h-[502px]"
			v-if="post.meta">
			<LoadingImage :src="Utils.fixCDNImages(post.meta.image, post.url) || DefaultImage || EmptyImage"
				class="object-cover" />
			<div class="dim" v-if="linearBackground"></div>
			<div class="radial-dim" v-else></div>
			<div class="card-content">
				<div class="gap-4">
					<div class="flex justify-between items-center">
						<h3 class="text-lg font-semibold">{{ postType }}</h3>
						<h3 class="text-base font-medium">{{ Formatting.formatDate(post.meta.date) }}</h3>
					</div>
					<LoadingImage :src="Utils.fixCDNImages(post.meta.image, post.url) || DefaultImage || EmptyImage"
						class="object-cover w-64 h-64 self-center rounded-lg" />
					<h2 class="text-3xl italic font-semibold self-center text-center text-shadow">{{ post.meta.title }}
					</h2>
				</div>
				<div>
					<p class="post-description w-full leading-tight self-center text-center">{{ post.meta.description }}
					</p>
				</div>
			</div>
		</OverlapGrid>
	</RouterLink>
</template>

<style lang="scss">
.big-news-post {

	.dim {
		transition: background 400ms;
		background: rgba(0, 0, 0, 0.5) linear-gradient(180deg, transparent 0%, var(--background-1) 85%);
	}

	.radial-dim {
		background: radial-gradient(circle at 100% 0%, transparent, var(--background-1) 70%);
	}

	&:hover>.dim {
		transition: background 200ms;
		background: rgba(0, 0, 0, 0.0) linear-gradient(180deg, transparent 0%, var(--background-1) 85%);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		padding: 20px;
		justify-content: space-between;

		>div {
			display: flex;
			flex-direction: column;
		}

		.post-description {
			font-size: 18px;
			max-height: 4em;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
	}
}
</style>