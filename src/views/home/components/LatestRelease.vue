<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

import OverlapGrid from '@/components/OverlapGrid.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import EmptyImage from '@/assets/images/empty.png';
import DefaultImage from '@/assets/images/placeholder.png';

import API from '@/utils/API';
import Formatting from '@/utils/Formatting';

const props = defineProps({
	linearBackground: {
		type: Boolean,
		default: false
	}
});

const react = reactive({
	output: {
		type: 'Release',
		title: 'we are still fetching this for you...',
		date: -1
	}
});

const replacePlaceHolders = (source, inputData) => {
	const result = {};

	for (const key in source) {
		const template = source[key];
		const replacedValue = template.replace(/%([^%]+)%/g, (_, placeholder) => {
			// Handle nested properties
			const keys = placeholder.split('.');
			return keys.reduce((acc, k) => {
				// Handle array indexing like images[0]
				const arrayMatch = k.match(/(\w+)\[(\d+)\]/);
				if (arrayMatch) {
					const arrayKey = arrayMatch[1];
					const index = Number(arrayMatch[2]);
					return acc && acc[arrayKey] ? acc[arrayKey][index] : '';
				}
				return acc && acc[k] !== undefined ? acc[k] : '';
			}, inputData) || '';
		});
		result[key] = replacedValue;
	}

	return result;
};

const sources = [
	{
		type: "YouTube",
		url: "/latestreleases/youtube",
		output: {
			type: "YouTube",
			title: "%title%",
			image: "%image%",
			date: "%pubDate%",
			url: "https://youtu.be/%video_id%"
		}
	},
	{
		type: "Spotify",
		url: "/latestreleases/spotify",
		output: {
			type: "Spotify",
			title: "%release.name%",
			image: "%image%",
			date: "%release_date%",
			url: "https://open.spotify.com/album/%id%"
		}
	}
];
const sourceRandom = sources[Math.floor(Math.random() * sources.length)];

API.get(sourceRandom.url).then((res) => {
	if (res.status == 200) {
		let output = replacePlaceHolders(sourceRandom.output, res.data);
		react.output = { ...output, type: output.type == "YouTube" ? "YouTube Upload" : "Spotify Release" };
	} else if (res.status == 204) {
		react.output = { ...react.output, title: "No current release data was found." };
	} else if (res.status >= 400 || !res.status) {
		react.output = { ...react.output, title: "Oh no! Something went wrong while fetching this!" };
	};
});

</script>

<template>
	<a :href="react.output.url" :target="react.output.url ? '_blank' : ''" class="w-full">
		<OverlapGrid class="latest-release w-full h-48 rounded-lg overlap-grid" v-if="react.output">
			<LoadingImage :src="react.output.image || DefaultImage || EmptyImage" class="object-cover" />
			<div class="dim" v-if="linearBackground"></div>
			<div class="radial-dim" v-else></div>
			<div class="card-content !flex-row">
				<div class="flex justify-between">
					<div class="flex flex-col gap-1">
						<div class="flex justify-between items-center">
							<h3 class="text-lg">Latest {{ react.output.type }}</h3>
						</div>
						<h2 class="text-2xl font-bold leading-5 text-shadow">{{ react.output.title }}</h2>
					</div>
					<div>
						<p class="text-base">{{ Formatting.formatDate(react.output.date) }}</p>
					</div>
				</div>
				<LoadingImage :src="react.output.image || DefaultImage || EmptyImage"
					class="object-scale-down w-[154px] self-center rounded-lg" />
			</div>
		</OverlapGrid>
	</a>
</template>

<style lang="scss">
.latest-release {

	.dim {
		transition: background 400ms;
		background: rgba(0, 0, 0, 0.4) linear-gradient(-120deg, transparent 0%, var(--background-1) 70%);
	}

	.radial-dim {
		background: radial-gradient(circle at 100% 0%, transparent, var(--background-1) 70%);
	}

	&:hover>.dim {
		transition: background 200ms;
		background: rgba(0, 0, 0, 0.0) linear-gradient(-120deg, transparent 0%, var(--background-1) 70%);
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
	}
}
</style>