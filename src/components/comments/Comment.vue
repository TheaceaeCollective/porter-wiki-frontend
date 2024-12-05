<script setup>
import { reactive, inject } from 'vue';
import { useRoute } from 'vue-router';
import { PhArrowClockwise, PhArrowFatUp, PhArrowFatDown, PhArrowBendUpLeft, PhDotsThree, PhPencil, PhTrash, PhLink, PhFlag } from '@phosphor-icons/vue';

import Toast from '@/utils/Toast';
import API from "@/utils/API";
import Formatting from '@/utils/Formatting';

import Logo from "@/assets/images/avatar.png";
import GradientLine from '../GradientLine.vue';

import MarkdownUtils from '@/utils/MarkdownUtils';
import MarkdownView from '../md/MarkdownView.vue';

import NewComment from './NewComment.vue';
import Button from '../Button.vue';
import PopupOverlay from '@/overlays/popup/PopupOverlay.vue';
import Events from '@/utils/Events';

const route = useRoute();

const commentSystem = inject("commentSystem");

const props = defineProps({
	comment: {
		type: Object,
		default: {},
		required: true
	}
});

// Popup
const popup = reactive({
	content: "",
	clickYes: () => { },
	clickNo: () => { }
});
const btnAction = (ClosePopup, callback) => {
	if (callback) callback();
	ClosePopup();
};

const MAX_COMMENT_LENGTH = 300;

const comment = reactive(props.comment);

const changeHover = (isOpen) => {
	comment.hovered = isOpen;
	if (!isOpen) comment.moreActions = false;
};

const chngMoreActions = () => {
	comment.moreActions = !comment.moreActions;
};

const commentAction = (action, options) => {
	if (API.user.loggedIn && action == 0) { // Vote on comment
		const { type } = options;

		let oldVotes = {
			vote: comment.vote,
			ups: comment.ups,
			downs: comment.downs
		};

		if (oldVotes.vote == type) return;

		if (type == 0) {
			if (oldVotes.vote == 1) comment.ups--;
			else comment.downs--;

		} else {
			if (oldVotes.vote == 1) comment.ups--;
			else if (oldVotes.vote == -1) comment.downs--;

			if (type == 1) comment.ups++;
			else if (type == -1) comment.downs++;
		};

		comment.vote = type;
		API.post(`/comments/${comment.id}/votes`, { vote: type }).then(res => {
			if (res.status != 204) {
				Toast.showToast("Failed to cast your vote! Please try again.", { type: "error" });
				// Restore original data
				comment.vote = oldVotes.vote;
				comment.ups = oldVotes.ups;
				comment.downs = oldVotes.downs;
				return;
			};
		});

	} else if (API.user.loggedIn && action == 1) { // Reply
		if (options) {
			comment.isReplying = options.isReplying;
		} else {
			comment.isReplying = !comment.isReplying;
		};
		if (!comment.isReplying) {
			comment.hovered = false;
			comment.moreActions = false;
		};
	} else if (API.user.loggedIn && action == 2) { // Edit
		if (options) {
			comment.isLoading = options.isLoading;
			comment.isEditing = options.isEditing;
			comment.edited = options.edited;

			if (comment.content != options.content) {
				comment.content = options.content;
				updateComment(comment.content);
				if (comment.content.length > MAX_COMMENT_LENGTH) comment.showMore = false;
			};
		} else {
			comment.isEditing = !comment.isEditing;
		};

		if (!comment.isEditing) {
			comment.hovered = false;
			comment.moreActions = false;
		};

	} else if (API.user.loggedIn && action == 3) { // Delete
		comment.isLoading = true;
		popup.content = `Are you sure you want to delete the comment?\nID: ${comment.id}\nAuthor: ${comment.author?.name}\nContent: ${comment.content}`;
		popup.clickNo = () => { comment.isLoading = false; };
		popup.clickYes = () => {
			API.delete(`/comments/${comment.id}`).then(res => {
				comment.isLoading = false;
				if (res.status != 200) {
					Toast.showToast("Failed to delete the comment! Please try again.", { type: "error" });
				} else {
					comment.isDeleted = true;

					if (comment.author.id === API.user.id) API.user.comments--;
					comment.author = { id: 0, name: "[deleted]", color: "" };

					let commentIndex = commentSystem.value.cache.findIndex(c => c.id === comment.id);
					if (commentIndex == null || commentIndex == undefined) return;
					commentSystem.value.cache[commentIndex] = { ...commentSystem.value.cache[commentIndex], author: undefined, content: undefined };

				};
			});
		};
		Events.Register(`popup-comment-${comment.id}-confirmation-closeComplete`, popup.clickNo);
		Events.Emit(`popup-comment-${comment.id}-confirmation`);
	} else if (action == 4) { // Copy to clipboard
		const url = `${route.fullPath.split("#")[0]}#comment-${comment.id}`;

		if (!navigator.clipboard) {
			Toast.showToast("Your browser does not support copying to the clipboard, sorry.", { type: "error" });
			return;
		};

		navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}${url}`)
			.then(() => Toast.showToast("Copied to clipboard!", { type: "success" }))
			.catch((err) => Toast.showToast("Error occurred copying to clipboard.", { type: "error" }));

		chngMoreActions(); // Close dropdown
	} else {
		Toast.showToast("You must be logged in to do that!", { type: "error" });
		return;
	}
};

const fixAvatar = (e) => e.target.src = Logo;

const commentTime = Formatting.convertHumanFromStamp((Date.now() / 1000) - comment.time);

if (comment.isDeleted) comment.author = { id: 0, name: "[deleted]", color: "" };

// TODO: Don't use this one as it renders articles, which comments should have more restrictions.
const updateComment = (content) => {
	var md = MarkdownUtils.parse({ meta: {}, content });
	comment.renderedContent = MarkdownUtils.render(md.content, false);
};

if (comment && comment.content?.length > 0) {
	updateComment(comment.content);
	if (comment.content.length > MAX_COMMENT_LENGTH) comment.showMore = false;
};
</script>

<template class="flex flex-col">
	<div v-if="comment.isLoading" id="comment-loading-overlay">
		<div class="m-auto flex size-10 items-center justify-center rounded-lg bg-background-4 p-1">
			<PhArrowClockwise :size="32" class="spin-spin-spin" />
		</div>
	</div>

	<div :class="`${(comment.isReplying || comment.isEditing) ? 'bg-background-3' : ''} hover:bg-background-3 p-2 flex gap-3 w-full rounded-xl`"
		@mouseover="changeHover(true)" @mouseleave="changeHover(false)" :id="`comment-${comment.id}`">
		<div v-if="comment.isReply">
			<GradientLine lineStyle="vert" :overshoot="false" class="!h-14" />
		</div>
		<div class="flex flex-col gap-2">
			<img alt="Avatar" :class="`rounded-2xl border-2 h-14 min-w-14`" :src="comment.author.avatar || Logo"
				:style="`border-color: ${comment.author.color}`" @error="fixAvatar" />
		</div>
		<div class="flex flex-col w-full">
			<div class="flex text-xl justify-between items-center align-middle relative">
				<div class="text-primary">
					<span class="font-bold">{{ comment.author.nick || comment.author.name }}</span>
					<span class="text-light-gray text-base gap-2">&nbsp;@{{ comment.author.name }}
						&nbsp;&#8226;&nbsp;
						<!-- todo: replace STAFF with actual role name -->
						<span v-if="comment.author.staff" class="rounded py-[2px] px-2 font-medium"
							:style="{ backgroundColor: comment.author.color }">STAFF</span>
						<span v-if="comment.author.staff">&nbsp;&nbsp;&#8226;&nbsp;</span>
						{{ Formatting.formatDate(comment.time) }}
						-
						{{ commentTime + "" + (commentTime != "just now" ? " ago" : "") }}
						{{ comment.edited ? " (edited)" : "" }}
					</span>
				</div>
				<div class="bg-background-1 rounded-md hover:bg-background-2 cursor-pointer w-fit"
					v-if="comment.hovered">
					<PhDotsThree :size="24" @click="chngMoreActions" />
					<div class="absolute mt-1 h-fit flex flex-col bg-background-1 w-fit rounded-md"
						v-if="comment.moreActions">
						<span @click="commentAction(4)"
							class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-base rounded-sm px-2 hover:text-white hover:bg-gray py-1">
							<PhLink /> Link
						</span>
						<span v-if="!comment.isDeleted" @click="commentAction(5)"
							class="flex text-red cursor-pointer align-middle items-center gap-1 text-base rounded-sm px-2 hover:text-white hover:bg-gray py-1">
							<PhFlag /> Report
						</span>
					</div>
				</div>
			</div>

			<div v-if="(!comment.isEditing) && comment.isDeleted" class="flex text-lg w-5/6 italic">Comment was deleted
			</div>
			<!-- todo: fix up markdown for comments and not article (also remove comment-container) -->
			<div v-else-if="(!comment.isEditing) && !comment.isDeleted"
				class="flex flex-col text-lg w-5/6 overflow-hidden text-ellipsis relative comment-container">
				<MarkdownView :article="comment.renderedContent"
					:class="`${!comment.showMore ? 'imFading max-h-16' : ''} ${comment.hovered || comment.isEditing || comment.isReplying ? 'hovered' : ''}`" />
			</div>
			<NewComment v-if="!comment.isReplying && comment.isEditing && !comment.isDeleted && API.user.loggedIn"
				:loaded="!comment.isLoading" :commentId="comment.id" :extraSubmit="data => commentAction(2, data)"
				:commentContent="comment.content" />
			<span v-if="comment.content.length > MAX_COMMENT_LENGTH"
				class="text-accent text-base w-max hover:text-accent-soft cursor-pointer"
				@click="comment.showMore = !comment.showMore">
				{{ comment.showMore ? "Show less" : "Read more" }}
			</span>
			<div class="flex text-xl mt-2 justify-between gap-1 items-center align-middle">
				<div class="flex text-light-gray align-middle items-center gap-1 text-lg select-none">
					<PhArrowFatUp
						:class="!comment.isDeleted ? `cursor-pointer hover:text-white ${comment.vote == 1 ? 'text-accent' : ''}` : ''"
						:size="24"
						@click="() => comment.isDeleted ? false : commentAction(0, { type: comment.vote == 1 ? 0 : 1 })" />
					<span>{{
						Math.floor(comment.ups - comment.downs)
					}}</span>
					<PhArrowFatDown
						:class="!comment.isDeleted ? `cursor-pointer hover:text-white ${comment.vote == -1 ? 'text-accent' : ''}` : ''"
						:size="24"
						@click="() => comment.isDeleted ? false : commentAction(0, { type: comment.vote == -1 ? 0 : -1 })" />
				</div>
				<div class="flex" v-if="comment.hovered">
					<span v-if="(!comment.isReplying) && !comment.isEditing && !comment.isReply"
						@click="commentAction(1)"
						class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhArrowBendUpLeft /> Reply
					</span>
					<span v-if="(!comment.isEditing && !comment.isReplying) && comment.author.id == API.user.id"
						@click="commentAction(2)"
						class="flex text-light-gray cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhPencil /> Edit
					</span>
					<span
						v-if="(!comment.isEditing && !comment.isReplying) && (!comment.isDeleted ? (comment.author.id == API.user.id || API.user.staff) : false)"
						@click="commentAction(3)"
						class="flex text-red cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhTrash /> Delete
					</span>
					<span v-if="comment.isEditing" @click="commentAction(2)"
						class="flex text-red cursor-pointer align-middle items-center gap-1 text-lg rounded-sm px-2 hover:text-white">
						<PhTrash /> Cancel
					</span>
				</div>
			</div>
		</div>
	</div>

	<PopupOverlay :event="`popup-comment-${comment.id}-confirmation`">
		<template #content>{{ popup.content }}</template>
		<template #footer="{ ClosePopup }">
			<div class="flex justify-center gap-2">
				<Button type="success" @click="btnAction(ClosePopup, popup.clickYes)">Yes</Button>
				<Button type="error" @click="btnAction(ClosePopup, popup.clickNo)">No</Button>
			</div>
		</template>
	</PopupOverlay>

	<slot name="replyBox" v-if="comment.isReplying">
		<NewComment :commentParent="comment.id" :loaded="!comment.isLoading"
			:extraSubmit="data => commentAction(1, data)" />
	</slot>
	<slot name="replies">
	</slot>

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

/* Stupid fade effect for the read more */
.imFading::after {
	background-image: linear-gradient(180deg, transparent, var(--background-2));
	bottom: 0;
	content: "";
	display: block;
	height: 48px;
	left: 0;
	pointer-events: none;
	position: absolute;
	width: 100%;
}

.imFading.hovered::after {
	background-image: linear-gradient(180deg, transparent, var(--background-3));
}

// THIS IS TEMPORARY FUCK!!!!!!!!! - john
.comment-container .md-content p {
	margin-bottom: 0;
	word-wrap: break-word;
	word-break: break-word;
	white-space: normal;
	overflow-wrap: break-word;
}
</style>