<script setup>
import SidebarImagePost from './sidebar/SidebarImagePost.vue';
import SidebarTextPost from './sidebar/SidebarTextPost.vue';

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	useImages: {
		type: Boolean,
		default: false
	},
	posts: {
		type: Object,
		required: true
	},
	url: {
		type: String,
		required: false
	}
});
</script>

<template>
	<div class="flex flex-col flex-auto max-xl:w-full rounded-lg bg-background-1 w-64">
		<div
			:class="`flex flex-col flex-auto ${posts.length > 1 ? 'justify-between' : ''} bg-background-3 p-2 rounded-lg gap-2`">
			<h3 class="text-2xl font-medium pl-2">{{ title }}</h3>
			<h4 v-if="posts.length < 1" class="pl-2">No {{ title }} to display!</h4>
			<div v-else class="flex flex-col flex-auto justify-between gap-2">
				<SidebarImagePost v-if="useImages" v-for="post in posts" :post="post" />
				<SidebarTextPost v-else v-for="post in posts" :post="post" />
			</div>
		</div>
		<div v-if="posts.length >= 1" class="rounded-xl flex justify-center text-center p-2">
			<RouterLink :to="url"
				class="text-xl font-light cursor-pointer transition-colors duration-200 hover:duration-50 hover:text-accent">
				View More</RouterLink>
		</div>
	</div>
</template>