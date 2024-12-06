<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PhX, PhArrowClockwise } from '@phosphor-icons/vue';

import API from '@/utils/API';
import Events from '@/utils/Events';
import ActiveComponents from '@/utils/ActiveComponents';
import SearchTextbox from '@/components/search/SearchTextbox.vue';
import SearchResult from '@/components/search/SearchResult.vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import GrayLine from '@/components/GrayLine.vue';

import PorterCry from "@/assets/images/PorterCry.gif";

const route = useRoute();

const react = reactive({
	open: false,
	isLoading: false,
	error: -1,
	found: {
		all: [],
		wikiArticles: [],
		newsArticles: [],
		communityPost: []
	},
	displayingArticles: [],
	sortedBy: [1, 1] // first value is "Sort by", second value is "Group by"
});
let searchTimer = ref(null);


Events.Register("searchoverlay", () => {
	react.open = true;
	document.body.classList.add("overflow-hidden");
	ActiveComponents.open("searchoverlay");
});

Events.Register("searchoverlay-close", () => {
	ClosePopup(true);
	Events.Emit("searchoverlay-closeComplete");
});

const ClosePopup = (fromEmitted, event) => {
	if (!fromEmitted && event) {
		if (!event.target.classList.contains("backdrop-blur")) return;
	};
	if (fromEmitted != true) return ActiveComponents.close();
	react.open = false;
	resetTimer();

	document.body.classList.remove("overflow-hidden");
}

const handleInput = (e) => {
	let trimmedValue = e.target.value.trim();
	if (trimmedValue == "") resetTimer();
	else {
		trimmedValue = trimmedValue.replace(/[\r\n]+/g, "");

		resetTimer();

		const query = trimmedValue;
		if (query == "") return;

		searchTimer.value = setTimeout(() => {
			react.isLoading = true;

			// call API

			// We'll just load all articles, to simulate searching for now.
			API.get(`/articles/search?query=${trimmedValue}`).then((res) => {
				react.isLoading = false;
				if (res.status >= 400 || !res.status) react.error = res.status ?? 500;
				else {
					if (res.data?.length) {
						react.found.all = res.data;

						for (let i = 0; i < react.found.all.length; i++) {
							let searchResult = react.found.all[i];
							if (searchResult.meta.type == 1) react.found.wikiArticles.push(searchResult);
							else if (searchResult.meta.type == 3) react.found.communityPost.push(searchResult)
							else if (searchResult.meta.type == 2) react.found.newsArticles.push(searchResult);
						};
						react.error = 0;
						searchSorter(react.sortedBy[0], react.sortedBy[1], true); // Trigger the sorter
					} else react.error = 404;
				};
			});
		}, 500);
	};
};

const handleKeydown = (e) => {
	if (e.keyCode === 13) e.preventDefault(); // Prevents ENTER key
};

const resetTimer = () => {
	clearTimeout(searchTimer.value);
	react.isLoading = false;
	react.found = {
		all: [],
		wikiArticles: [],
		newsArticles: [],
		communityPost: []
	};
	react.displayingArticles = [];
	react.error = -1;
	react.sortedBy = [1, 1];
};

const searchSorter = (by, num, forced = false) => {
	let currentGroupby = react.sortedBy[1];
	react.sortedBy[by] = num;

	// First, change displayed articles
	if ((by == 0) || (currentGroupby != react.sortedBy[1]) || forced) {
		if (react.sortedBy[1] == 2) react.displayingArticles = react.found.wikiArticles;
		else if (react.sortedBy[1] == 3) react.displayingArticles = react.found.newsArticles;
		else if (react.sortedBy[1] == 4) react.displayingArticles = react.found.communityPost;
		else react.displayingArticles = react.found.all;

		// Then, Sort displayed articles
		react.displayingArticles = react.displayingArticles.sort((a, b) => {
			let a_metaDate = new Date(a.meta.date);
			let b_metaDate = new Date(b.meta.date);

			if (react.sortedBy[0] == 2) return a_metaDate.getTime() - b_metaDate.getTime(); // Old
			else return b_metaDate.getTime() - a_metaDate.getTime(); // New
		});
	};
};

const stupidGroupSortClassFix = (results, num) => {
	// This function makes it a little easier to understand as it was like:
	// class="react.found.newsArticles.length > 0 ? (`cursor-pointer ${(react.sortedBy[1] == 3? 'text-accent' : 'text-white')}`) : ''"
	// in the <span> of each Group by...

	if (!results || results.length < 1) return "cursor-default";
	return `cursor-pointer ${(react.sortedBy[1] == num) ? "text-accent" : "text-white"}`;
};
</script>

<template>
	<Transition name="overlay">
		<!-- Add "overflow-y-scroll" to this div below if you want that to scroll too -->
		<div class="z-50 flex fixed justify-center items-center w-screen h-screen top-0 bg-opacity-25 backdrop-blur max-lg:items-baseline max-lg:p-0"
			v-if="react.open" @click="e => ClosePopup(null, e)">
			<div
				class="z-0 w-content-width min-h-96 bg-opacity-90 rounded-xl flex flex-col gap-4 xl:my-auto max-lg:min-h-32 max-lg:max-h-32">
				<div class="flex gap-4">
					<SearchTextbox :handleInput="handleInput" :handleKeydown="handleKeydown" />
					<div class="bg-background-3 p-3 flex justify-center items-center rounded-lg hover:bg-background-4 theShadow cursor-pointer"
						@click="ClosePopup(null)">
						<PhX :size="28" @click="ClosePopup(null)" />
					</div>
				</div>
				<div v-if="react.isLoading" class="flex flex-col gap-4">
					<div class="m-auto flex size-14 items-center justify-center rounded-lg bg-background-4 p-1">
						<PhArrowClockwise :size="42" class="spin-spin-spin" />
					</div>
				</div>
				<div v-else-if="!react.isLoading && react.error != -1" class="flex flex-col gap-4">
					<p v-if="react.error <= 404" class="text-white text-lg">
						{{ react.found.all.length }} RESULT{{ react.found.all.length == 1 ? "" : "S" }}
					</p>
					<div v-if="react.error == 0"
						class="h-auto w-full flex flex-col rounded-xl bg-background-1 bg-opacity-90 backdrop-blur p-4 gap-2">
						<div class="flex gap-5">
							<span class="w-fit min-w-16 font-normal text-light-gray">Sort by</span>
							<div class="flex flex-wrap gap-5">
								<span :class="`cursor-pointer ${react.sortedBy[0] == 1 ? 'text-accent' : 'text-white'}`"
									@click="searchSorter(0, 1)">New</span>
								<span :class="`cursor-pointer ${react.sortedBy[0] == 2 ? 'text-accent' : 'text-white'}`"
									@click="searchSorter(0, 2)">Old</span>
							</div>
						</div>
						<div class="flex gap-5">
							<span class="w-fit min-w-16 font-normal text-light-gray">Group by</span>
							<div class="flex flex-wrap gap-5">
								<span :class="`cursor-pointer ${react.sortedBy[1] == 1 ? 'text-accent' : 'text-white'}`"
									@click="searchSorter(1, 1)">
									All - {{ react.found.all.length }}
								</span>
								<span :class="stupidGroupSortClassFix(react.found.wikiArticles, 2)"
									@click="react.found.wikiArticles.length > 0 ? searchSorter(1, 2) : () => { }">
									Wiki Article - {{ react.found.wikiArticles.length }}
								</span>
								<span :class="stupidGroupSortClassFix(react.found.newsArticles, 3)"
									@click="react.found.newsArticles.length > 0 ? searchSorter(1, 3) : () => { }">
									News Article - {{ react.found.newsArticles.length }}
								</span>
								<span :class="stupidGroupSortClassFix(react.found.communityPost, 4)"
									@click="react.found.communityPost.length > 0 ? searchSorter(1, 4) : () => { }">
									Blog Post - {{ react.found.communityPost.length }}
								</span>
							</div>
						</div>
					</div>
					<div v-if="react.error == 0"
						class="w-full flex flex-col gap-2 max-h-[405px] xl:max-h-[535px] max-lg:overflow-y-scroll overflow-y-auto bg-background-1 bg-opacity-90 backdrop-blur p-4 rounded-xl">
						<div v-for="(result, index) in react.displayingArticles" class="flex flex-col w-full gap-2">
							<SearchResult :result="result" :resultClick="() => ClosePopup(null)" />
							<GrayLine v-if="(index + 1) != react.displayingArticles.length" :lineStyle=2
								class="!h-0.5" />
						</div>
					</div>
					<div v-if="react.error > 404" class="flex flex-col gap-4">
						<div class="w-full flex flex-col gap-4 items-center">
							<img :src="PorterCry" class="w-24"></img>
							<BlockquoteNote class="w-full" type="caution"
								title="There was an error processing your search request!">
								Uh-oh. Something went wrong while searching. Don't panic!
								Let's try
								<a class="text-accent hover:text-accent-soft" :href="route.fullPath">
									refreshing the page</a>
								and that doesn't work, please contact us!
							</BlockquoteNote>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style>
.overlay-enter-active,
.overlay-leave-active {
	transition: opacity 150ms, transform 300ms;

	>div {
		transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
	}
}

.overlay-leave-to,
.overlay-enter-from {
	opacity: 0;

	>div {
		transform: scale(.95);
	}
}

.theShadow {
	box-shadow: 0 32px 40px 0 rgba(0, 0, 0, 0.24), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1);
}
</style>
