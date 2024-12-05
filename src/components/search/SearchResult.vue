<script setup>
import { RouterLink } from 'vue-router';
import { PhCaretRight } from '@phosphor-icons/vue';

import OverlapGrid from '@/components/OverlapGrid.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import EmptyImage from '@/assets/images/empty.png';

import Utils from '@/utils/Utils';
import Formatting from '@/utils/Formatting';
import { toRefs } from 'vue';

const props = defineProps({
	result: {
		type: Object,
		required: true
	},
	resultClick: {
		type: Function,
		default: () => { }
	}
});

const { resultClick } = toRefs(props);

</script>

<template>
	<RouterLink @click="resultClick" :to="result.url || '/not-found'">
		<OverlapGrid class="search-result w-full h-28 rounded-lg overlap-grid" v-if="result.meta">
			<LoadingImage v-if="result.meta.image"
				:src="Utils.fixCDNImages(result.meta.image, result.url) || EmptyImage" class="object-cover" />
			<div class="dim" v-if="result.meta.image"></div>
			<div class="default-bg" v-else></div>
			<div class="flex flex-col h-auto justify-between gap-2 p-5">
				<div>
					<div class="flex justify-between items-center">
						<p class="flex gap-0.5">
							<RouterLink to="/" class="text-light-gray readMoreHover">Home</RouterLink>
							<span v-for="(part, index) in result.breadcrumbs" class="flex items-center gap-1">
								<PhCaretRight :size="16" class="text-light-gray" />
								<RouterLink v-if="index != (Object.keys(result.breadcrumbs).length - 1)"
									class="text-light-gray readMoreHover" :to=part.path>{{ part.name }}
								</RouterLink>
							</span>
						</p>
						<h3 class="text-base font-medium">{{ Formatting.formatDate(result.meta.date) }}</h3>
					</div>
					<h2 class="post-title text-xl font-medium leading-6 text-shadow truncate max-md:max-w-48">{{
						result.meta.title }}</h2>
				</div>
				<div>
					<div>
						<p class="post-description w-full leading-5 truncate max-md:max-w-48">
							{{ result.meta.description }}
						</p>
					</div>
				</div>
			</div>
		</OverlapGrid>
	</RouterLink>
</template>

<style lang="scss">
.search-result {

	.dim {
		transition: background 400ms;
		background: rgba(0, 0, 0, 0.4) linear-gradient(-180deg, transparent 0%, var(--background-2) 75%);
	}

	&:hover>.dim {
		transition: background 200ms;
		background: rgba(0, 0, 0, 0.0) linear-gradient(-180deg, transparent 0%, var(--background-2) 75%);
	}

	.default-bg {
		transition: background 400ms;
		background: var(--background-3);
	}

	&:hover>.default-bg {
		transition: background 200ms;
		background: var(--background-1);
	}
}
</style>