<script setup>
import { RouterLink } from 'vue-router';
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

import OverlapGrid from '@/components/OverlapGrid.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import EmptyImage from '@/assets/images/empty.png';
import DefaultImage from '@/assets/images/placeholder.png';

import Utils from '@/utils/Utils';


const props = defineProps({
	displayNext: Boolean,
	onlyOne:
	{
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
		<OverlapGrid
			:class="`news-selector-post rounded-lg ${!onlyOne ? (displayNext ? 'nextPost' : 'previousPost') : ''} w-full h-24 overlap-grid`"
			v-if="post.meta">
			<LoadingImage :src="Utils.fixCDNImages(post.meta.image, post.url) || DefaultImage || EmptyImage"
				class="object-cover" />
			<div :class="`dim${!displayNext ? ' flipped' : ''}`"></div>
			<div
				:class="`card-content justify-between items-center ${!displayNext ? 'flex-row-reverse text-right' : ''}`">
				<div>
					<h3 class="text-lg">{{ displayNext ? "Next Post" : "Previous Post" }}</h3>
					<h2 class="post-title text-2xl font-medium leading-6 text-shadow">{{ post.meta.title }}</h2>
				</div>
				<div>
					<component :is="displayNext ? PhCaretRight : PhCaretLeft" :size="48" />
				</div>
			</div>
		</OverlapGrid>
	</RouterLink>
</template>

<style lang="scss">
.news-selector-post {

	&.nextPost {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	&.previousPost {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.dim {
		transition: background 400ms;
		background: rgba(0, 0, 0, 0.5) linear-gradient(-120deg, transparent 0%, var(--background-1) 90%);

		&.flipped {
			background: rgba(0, 0, 0, 0.5) linear-gradient(-120deg, var(--background-1) 0%, transparent 90%);
		}
	}

	&:hover>.dim {
		transition: background 200ms;
		background: rgba(0, 0, 0, 0.2) linear-gradient(-120deg, transparent 0%, var(--background-1) 90%);

		&.flipped {
			background: rgba(0, 0, 0, 0.2) linear-gradient(-120deg, var(--background-1) 0%, transparent 90%);
		}
	}

	.card-content {
		display: flex;
		padding: 20px;
		justify-content: space-between;

		>div {
			display: flex;
			flex-direction: column;
		}

		.post-title {
			max-height: 4em;
			max-width: 12em;
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