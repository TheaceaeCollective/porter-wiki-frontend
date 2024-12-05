<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { reactive } from 'vue';
import { PhCaretRight } from '@phosphor-icons/vue';
import CameCry from "@/assets/images/CameCry.webp";
import Utils from '@/utils/Utils';
import BlockquoteNote from '@/components/BlockquoteNote.vue';

const props = defineProps({
	error: {
		type: String,
		default: "NotFound"
	}
});

const react = reactive({
	meta: {
		title: '',
	},
	breadcrumbs: [],
});

const route = useRoute();

const createCrumbs = () => {
	const pathParts = route.path.split('/').filter(Boolean);
	react.breadcrumbs = pathParts.map((part, index) => {
		return {
			name: part.charAt(0).toUpperCase() + part.slice(1),
			path: '/' + pathParts.slice(0, index + 1).join('/'),
		};
	});
};

createCrumbs();
react.meta.title = route.params.title || route.path.split('/').pop();
Utils.setTitle(react.meta.title);
</script>

<template>
	<div class="article-page w-full xl:w-content-width">
		<div class="flex justify-between w-full mb-2 px-5 flex-wrap">
			<p class="flex gap-0.5 flex-wrap">
				<RouterLink to="/" class="text-light-gray readMoreHover">Home</RouterLink>
				<span v-for="(part, index) in react.breadcrumbs" class="flex items-center gap-1">
					<PhCaretRight :size="16" class="text-light-gray" />
					<span v-if="index == (Object.keys(react.breadcrumbs).length - 1)">{{ part.name }}</span>
					<RouterLink v-else class="text-light-gray readMoreHover" :to=part.path>{{ part.name }}
					</RouterLink>
				</span>
			</p>
		</div>
		<div
			class="w-full md:h-16 bg-background-1 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center mb-4">
			<h3 class="text-2xl font-semibold">{{ react.meta.title }}</h3>
		</div>
		<div v-if="error != 'NotFound'" class="w-full flex flex-col gap-4 items-center">
			<img :src="CameCry" class="w-24"></img>
			<BlockquoteNote class="w-full" type="caution" title="There was an error loading the requested article!">
				Uh-oh. Something went wrong loading the article. Don't panic!
				Let's try
				<a class="text-accent hover:text-accent-soft" :href="route.fullPath">refreshing the page</a>
				and that doesn't work, please contact us!
			</BlockquoteNote>
		</div>
		<div v-else class="w-full flex flex-col gap-4 items-center">
			<img :src="CameCry" class="w-24"></img>
			<BlockquoteNote class="w-full" type="caution" title="The requested article does not exist!">
				The Wiki does not have an article with this exact name. Please search for
				<a href="" class="text-accent readMoreHover">{{ react.meta.title }}</a>
				to check for alternative titles, spellings, or tags.
			</BlockquoteNote>
			<BlockquoteNote class="w-full" type="tip" title="A tip for you">
				If you would like to create an article within this location you must
				<a href="" class="text-accent readMoreHover">link your GitHub account.</a>
				Alternatively, you may request for a new article in
				<a href="https://discord.gg/camellia" class="text-accent readMoreHover">Discord</a>
				or head
				<RouterLink to="/" class="text-accent readMoreHover">Home</RouterLink>.
			</BlockquoteNote>
		</div>
	</div>
</template>
