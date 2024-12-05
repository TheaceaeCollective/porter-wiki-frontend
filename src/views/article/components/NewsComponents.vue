<script setup>
import { reactive } from 'vue';
import API from '@/utils/API';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import NewsPostSelector from './NewsPostSelector.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
	type: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false
	},
	layout: {
		type: String,
		required: false
	}
});

const articlePlaceholders = {
	loading: {
		title: 'loading...',
		description: 'we are still fetching this for you...',
		date: -1,
	},
	none: {
		title: 'No content.',
		description: '',
		date: -1
	},
	error: {
		title: 'Oh no!',
		description: 'Something went wrong while loading this... :(',
		date: -1
	}
};

const react = reactive({
	// Random
	random: {
		meta: articlePlaceholders.loading,
		url: "/random"
	}
});

API.get("/articles/random?type=news").then((res) => {
	if (res.status == 200) react.random = res.data;
	else if (res.status == 204) react.random.meta = articlePlaceholders.none;
	else if (res.status >= 400 || !res.status) react.random.meta = articlePlaceholders.error;
});

// News
react.nearby = { next: null, previous: null };
API.get("/articles?type=news&count=1984").then((res) => {
	if (res.status == 200) {
		for (let i = 0; i < res.data.length; i++) {
			if (res.data[i].url == route.fullPath) {
				if (res.data[i - 1]) react.nearby.next = res.data[i - 1];
				if (res.data[i + 1]) react.nearby.previous = res.data[i + 1];
				break;
			};
		};
	}
	else if (res.status >= 404 || !res.status) react.nearby = { next: { meta: articlePlaceholders.error }, previous: { meta: articlePlaceholders.error } };
});

</script>

<template>
	<img v-if="props.type === '1'" :src="props.image" class="object-cover" alt="Article Cover">
	<div v-else-if="props.type === '2'" class="w-full flex flex-col gap-4 mt-[120px]">
		<BlockquoteNote class="border-x-0 rounded-lg" title="Wanna Read more? Here's a random post">
			<div class='text-3xl font-semibold mb-2'>{{ react.random.meta.title }}</div>
			<div class="mb-2">{{ react.random.meta.description }}</div>
			<a class="text-lg text-accent readMoreHover" :href="react.random.url">
				Click here to read
			</a>
		</BlockquoteNote>
		<div>
			<NewsPostSelector v-if="react.nearby.next" class="w-full" :post="react.nearby.next" other-image
				:displayNext="true" :onlyOne="(!react.nearby.previous)" />
			<NewsPostSelector v-if="react.nearby.previous" class="w-full" :post="react.nearby.previous" other-image
				:displayNext="false" :onlyOne="(!react.nearby.next)" />
		</div>
	</div>
</template>