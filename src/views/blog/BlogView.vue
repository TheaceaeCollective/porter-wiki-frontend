<script setup>
import { reactive } from 'vue';

import Utils from '@/utils/Utils';
import API from '@/utils/API';

import BlogPost from '@/views/blog/components/BlogPost.vue';
import BigBlogPost from './components/BigBlogPost.vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import GradientLine from '@/components/GradientLine.vue';
import OverlapGrid from '@/components/OverlapGrid.vue';

import { PhCaretRight } from '@phosphor-icons/vue';
import WikiLogo from "@/assets/images/icon.png";
import Kofi from "@/assets/images/kofi.png";
import GrayLine from '@/components/GrayLine.vue';

Utils.setTitle('Blog');

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

const loadingPlaceholder = { meta: articlePlaceholders.loading, url: "" };

const react = reactive({
	// All
	all: [],
	popular: {
		title: "In Popular Blog",
		data: loadingPlaceholder
	},
	mostRecent: [loadingPlaceholder, loadingPlaceholder, loadingPlaceholder, loadingPlaceholder],
	evenMore: [loadingPlaceholder, loadingPlaceholder, loadingPlaceholder, loadingPlaceholder]
});

// API calls

// Popular Blogs
// TODO: Get the popular blog. Once that is added in the Backend.
API.get("/articles/popular?type=community").then((res) => {
	if (res.status == 200) react.popular.data = res.data;
	else if (res.status == 404) react.popular.data = { meta: articlePlaceholders.none, url: "" };
	else if (res.status >= 400 || !res.status) react.popular.data = { meta: articlePlaceholders.error, url: "" };
});

// Get all blogs
let allSliceStartRecent = 0;
let allSliceEndRecent = 4;
API.get("/articles?type=community&count=1984").then((res) => {
	if (res.status == 200) react.all = res.data;
	else if (res.status == 404) react.all[0] = { meta: articlePlaceholders.none, url: "" };
	else if (res.status >= 400 || !res.status) react.all[0] = { meta: articlePlaceholders.error, url: "" };

	if (react.all[0].meta.date == articlePlaceholders.none.date || react.all[0].meta.date == articlePlaceholders.error.date) {
		let finalArr = [];

		if (react.all[0].meta.date == articlePlaceholders.error.date) finalArr.push({ meta: articlePlaceholders.error, url: "" });

		react.mostRecent = finalArr;
		react.evenMore = finalArr;
	} else {
		react.mostRecent = react.all.slice(allSliceStartRecent, allSliceEndRecent);
		react.evenMore = react.all.slice(allSliceEndRecent, react.all.length);
	};

	// If Popular has an issue, change to Recent BLog
	// if (react.popular.data.meta.date == articlePlaceholders.none.date || react.popular.data.meta.date == articlePlaceholders.error.date) {
	// make it true because i cant look into cleaning this up. its also bad ux to leave it as popular blog. please fix -john
	if (true) {
		react.popular.title = "Recent Blog";
		react.popular.data = react.all[0];

		react.mostRecent = react.all.slice(allSliceStartRecent + 1, allSliceEndRecent + 1);
		react.evenMore = react.all.slice(allSliceEndRecent + 1, react.all.length);
	};
});

</script>

<template>
	<div class="w-full flex flex-col items-center justify-center">
		<div class="w-full xl:w-content-width flex flex-col items-center justify-center">
			<div class="flex justify-between w-full mb-2 px-5 flex-wrap">
				<p class="flex gap-0.5 items-center flex-wrap">
					<RouterLink to="/" class="text-light-gray readMoreHover">Home</RouterLink>
					<span class="flex items-center gap-1">
						<PhCaretRight :size="16" class="text-light-gray" />
						<RouterLink to="/blog" class="text-light-gray readMoreHover">Blog</RouterLink>
					</span>
				</p>
			</div>
			<OverlapGrid class="blog-header w-full md:h-16 rounded-lg mb-4 overlap-grid">
				<div class="dim">
				</div>
				<div class="flex flex-col md:flex-row justify-between items-center px-5">
					<h3 class="text-2xl font-semibold">Wiki Blog</h3>
					<p class="font-extralight">Writing the meaning of my life.</p>
					<img :src="WikiLogo" alt="Porter Robinson Wiki Icon" class="w-8" />
				</div>
			</OverlapGrid>
		</div>
		<div class="flex flex-col md:flex-row w-full xl:w-content-width xl:mx-auto gap-5 md">
			<div class="flex w-full flex-col gap-4">
				<div class="w-full flex flex-col md:flex-row gap-4">
					<div class="w-full">
						<BigBlogPost :post-type="react.popular.title" :post="react.popular.data" linearBackground
							other-image />
					</div>
					<div class="w-full flex flex-col gap-2 lg:max-h-full xl:max-h-full overflow-y-auto max-h-full">
						<template v-for="(post, index) in react.mostRecent">
							<BlogPost class="flex flex-col w-full" :post="post" linearBackground />
							<GrayLine v-if="(index + 1) != react.mostRecent.length" :lineStyle=2 class="!h-0.5" />
						</template>
					</div>
				</div>
				<div class="flex w-full flex-col gap-4 px-8">
					<div>
						<h2 class="text-4xl font-semibold mb-1">Read More</h2>
						<GradientLine />
					</div>
					<div class="w-full flex flex-col gap-2 lg:max-h-full max-h-full">
						<div v-for="(post, index) in react.evenMore" class="flex flex-col w-full gap-2">
							<BlogPost :post="post" linearBackground />
							<GrayLine v-if="(index + 1) != react.evenMore.length" :lineStyle=2 class="!h-0.5" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.blog-header {
	background-color: var(--background-1);
	background: url('/src/assets/images/home-header.png') no-repeat center center / cover;

	.dim {
		background: rgba(255, 255, 255, 0.1) linear-gradient(-120deg, transparent 0%, var(--background-1) 50%)
	}
}
</style>