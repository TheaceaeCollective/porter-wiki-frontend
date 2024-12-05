<script setup>

import { provide, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { PhArrowClockwise } from "@phosphor-icons/vue";

import GradientLine from '@/components/GradientLine.vue';

import NewComment from '@/components/comments/NewComment.vue';
import Comment from '@/components/comments/Comment.vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import GrayLine from '@/components/GrayLine.vue';

const route = useRoute();

const props = defineProps({
	commentSystem: {
		type: Object,
		default: {}
	}
});

const react = reactive({
	loaded: false,
	error: false,
	comments: {
		fullCache: [],
		replies: [],
		withoutReplies: []
	}
});
const sortedBy = ref(0);

const commentSystem = ref(props.commentSystem);

const commentSorter = (direction) => {
	if (direction == 1) // New
		react.comments.fullCache = react.comments.fullCache.sort((a, b) => b.time - a.time);
	else if (direction == 2) // Old
		react.comments.fullCache = react.comments.fullCache.sort((a, b) => a.time - b.time);
	else if (direction == 3) // Top
		react.comments.fullCache = react.comments.fullCache.sort((a, b) => {
			// Sort by upvotes first.
			const voteDiff = b.ups - a.ups;
			if (voteDiff != 0) return voteDiff;

			// Then, sort by time.
			return b.time - a.time;
		});

	sortedBy.value = direction;
};

const updateData = () => {
	react.loaded = commentSystem.value.loaded;
	react.error = commentSystem.value.error;

	if (react.loaded && !react.error) {
		react.comments.fullCache = commentSystem.value.cache || [];
		if (react.comments.fullCache.length > 0) {
			react.comments.replies = commentSystem.value.cache.filter(c => c.parent != null && c.parent != "");
			react.comments.withoutReplies = commentSystem.value.cache.filter(c => c.parent == null || c.parent == "");
		};

		if (sortedBy.value == 0) {
			sortedBy.value = commentSystem.value.sortedBy;
			commentSorter(sortedBy.value);
		};
	};
};
updateData();
watch(commentSystem.value, () => {
	const diffComments = react.comments.fullCache.filter(c => !commentSystem.value.cache.includes(c));
	diffComments.forEach(c => { let commentElement = document.getElementById(`comment-${c.id}`); if (commentElement) commentElement.remove(); });
	updateData();
});

// Provide commentSystem (react) to other things :)
provide("commentSystem", commentSystem);
</script>

<template>
	<div v-if="!react.loaded && !react.error" id="comment-loading-overlay">
		<div class="m-auto flex size-10 items-center justify-center rounded-lg bg-background-4 p-1">
			<PhArrowClockwise :size="32" class="spin-spin-spin" />
		</div>
	</div>

	<NewComment :error="react.error" :loaded="react.loaded" />

	<div class="flex gap-10">
		<span class="ml-6 font-normal text-light-gray">Sort by</span>
		<div class="flex gap-6">
			<span :class="`cursor-pointer ${sortedBy == 1 ? 'text-accent' : 'text-white'}`"
				@click="commentSorter(1)">New</span>
			<span :class="`cursor-pointer ${sortedBy == 2 ? 'text-accent' : 'text-white'}`"
				@click="commentSorter(2)">Old</span>
			<span :class="`cursor-pointer ${sortedBy == 3 ? 'text-accent' : 'text-white'}`"
				@click="commentSorter(3)">Top</span>
		</div>
	</div>

	<GradientLine />

	<div class="flex flex-col mt-2">
		<BlockquoteNote v-if="react.error" title="Failed to load comments!" type="danger">
			Let's try
			<a class="text-accent hover:text-accent-soft" :href="route.fullPath">refreshing the page</a>
			and if that doesn't work, please contact us.
		</BlockquoteNote>

		<div v-else-if="react.loaded && !react.error && react.comments.withoutReplies.length > 0"
			v-for="(comment, index) in react.comments.withoutReplies" :id="`comment-${comment.id}`" :key="comment.id"
			class="rounded-xl w-full max-w-screen-lg min-h-16 p-0 flex mb-1 mx-auto flex-col relative">
			<Comment :comment="{ ...comment, isReply: false, isDeleted: (comment.author === undefined) }">
				<template #replyBox />
				<template #replies>
					<div v-if="react.comments.replies.length > 0"
						v-for="(reply, replyIndex) in react.comments.replies.filter(r => r.parent === comment.id)"
						:id="`comment-${reply.id}`" :key="reply.id"
						class="rounded-xl w-full max-w-screen-lg min-h-24 gap-3 py-0 m-auto pl-3 flex relative mt-3">
						<Comment :comment="{ ...reply, isReply: true, isDeleted: (reply.author === undefined) }" />
					</div>
				</template>
			</Comment>
			<GrayLine v-if="(index + 1) != react.comments.withoutReplies.length" :lineStyle=2 class="!h-0.5 !mt-1" />
		</div>
	</div>
</template>

<style lang="scss">
#comment-loading-overlay {
	display: flex;
	justify-content: center;
	position: absolute;
	z-index: 40;
	height: 100%;
	width: calc(100% + 20px);
	left: 0;
	top: 0;
	margin: 0 -10px;
	background: rgba(0, 0, 0, 0.2);
}
</style>