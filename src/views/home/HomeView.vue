<script setup>
import HomeHeader from './components/HomeHeader.vue';
import FeaturedPost from './components/FeaturedPost.vue';
import SimplePost from './components/SimplePost.vue';
import BigPost from './components/BigPost.vue';
import HomeStats from './components/HomeStats.vue';
import SidebarPosts from './components/SidebarPosts.vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';
import { onMounted, reactive } from 'vue';
import { useHead } from '@unhead/vue'
import GradientLine from '@/components/GradientLine.vue';
import LatestRelease from './components/LatestRelease.vue';
import MetaTagsController from '@/utils/MetaTagsController';

const articlePlaceholders = {
	loading: {
		title: 'loading...',
		description: 'we are still fetching this for you...',
		date: -1,
	},
	none: {
		title: 'No content.',
		description: '',
		date: -2
	},
	error: {
		title: 'Oh no!',
		description: 'Something went wrong while loading this... :(',
		date: -3
	}
};

const react = reactive({
	// Featured
	featured: {
		meta: articlePlaceholders.loading,
		url: "/featured"
	},

	// Popular
	popular: {
		meta: articlePlaceholders.loading,
		url: "/popular"
	},

	// Random
	random: {
		meta: articlePlaceholders.loading,
		url: "/random"
	},

	// Statistics
	stats: {
		articles: 0,
		comments: 0,
		visits: 0
	}
});

// API calls

// Featured
API.get("/articles/featured").then((res) => {
	if (res.status == 200) react.featured = res.data;
	else if (res.status == 204) react.featured.meta = articlePlaceholders.none;
	else if (res.status >= 400 || !res.status) react.featured.meta = articlePlaceholders.error;
});

// Popular
API.get("/articles/popular").then((res) => {
	if (res.status == 200) react.popular = res.data;
	else if (res.status == 404) react.popular.meta = { ...articlePlaceholders.none, date: (Date.now() / 1000) };
	else if (res.status >= 400 || !res.status) react.popular.meta = { ...articlePlaceholders.error, date: (Date.now() / 1000) };
});

API.get("/articles/random").then((res) => {
	if (res.status == 200) react.random = res.data;
	else if (res.status == 204) react.random.meta = articlePlaceholders.none;
	else if (res.status >= 400 || !res.status) react.random.meta = articlePlaceholders.error;
});

// Statistics
API.get("/stats").then((res) => {
	let tmpData = {
		articles: (res.status >= 400 || !res.status || res.status == 204) ? "N/A" : res.data?.articles,
		comments: (res.status >= 400 || !res.status || res.status == 204) ? "N/A" : res.data?.comments,
		visits: (res.status >= 400 || !res.status || res.status == 204) ? "N/A" : res.data?.visitors,
	};
	react.stats = tmpData;
});

// home posts
react.posts = [];
API.get("/articles/home").then((res) => {
	if (res.status == 200) react.posts = res.data;
});

// News
react.news = [];
API.get("/articles?type=news&count=3").then((res) => {
	if (res.status == 200) react.news = res.data;
});


// Blog Posts
react.community = [];
API.get("/articles?type=community&count=5").then((res) => {
	if (res.status == 200) react.community = res.data;
});

onMounted(() => {
	Utils.setTitle('Homepage');
	useHead(MetaTagsController.getMeta("/"));
});

</script>

<template>
	<div class="w-full flex flex-col items-center justify-center gap-5">
		<HomeHeader />
		<div class="flex flex-col md:flex-row w-full xl:w-content-width xl:mx-auto gap-5 md">
			<div class="flex w-full flex-col gap-4">
				<div class="w-full flex flex-col md:flex-row gap-4">
					<BigPost post-type="Popular Today" :post="react.popular" linearBackground other-image />
					<div class="flex w-full flex-col gap-4">
						<FeaturedPost class="w-full" post-type="Featured Post" :post="react.featured" linearBackground
							other-image />
						<FeaturedPost class="w-full" post-type="Random Post" :post="react.random" linearBackground
							other-image />
						<HomeStats class="w-full" :stats="react.stats" />
					</div>
				</div>
				<div class="w-full flex flex-col md:flex-row gap-4">
					<LatestRelease linearBackground />
				</div>
				<div>
					<h2 class="text-4xl font-semibold mb-1">Wiki Articles</h2>
					<GradientLine :overshoot="false" />
				</div>
				<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
					<div v-for="(post) in react.posts" class="w-full flex flex-col gap-4">
						<SimplePost :post="post" />
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col lg:w-64 gap-4">
				<SidebarPosts title="News" :posts="react.news" url="/news" use-images />
				<SidebarPosts title="Blog Posts" :posts="react.community" url="/community/blog" />
			</div>
		</div>
	</div>
</template>
