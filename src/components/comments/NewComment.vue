<script setup>
import { nextTick, ref, shallowRef, watch, inject, toRefs, onMounted } from 'vue';
import { PhPaperPlaneTilt, PhXCircle, PhCheckCircle, PhArrowClockwise } from '@phosphor-icons/vue';

import API from '@/utils/API';
import Toast from '@/utils/Toast';
import Textbox from '../textbox/Textbox.vue';

import GradientLine from '../GradientLine.vue';

const props = defineProps({
	error: {
		type: Boolean,
		default: false
	},
	loaded: {
		type: Boolean,
		default: false
	},
	commentId: {
		type: String,
		default: null
	},
	commentParent: {
		type: String,
		default: null
	},
	commentContent: {
		type: String,
		default: null
	},
	extraSubmit: {
		type: Function,
		default: () => { },
		required: false
	}
});

const { error, loaded, commentParent, commentId, commentContent } = toRefs(props);
const commentSystem = inject("commentSystem");

const knownStates = {
	NORMAL: { icon: PhPaperPlaneTilt, spin: false },
	SUBMITTING: { icon: PhArrowClockwise, spin: true },
	OK: { icon: PhCheckCircle, spin: false },
	ERROR: { icon: PhXCircle, spin: false },
};

const beDisabled = ref(false);

const submitIconClasses = ref("");
const currentState = shallowRef(knownStates.NORMAL);
const previousState = shallowRef(knownStates.NORMAL);

// shift+tab handling
const handleKeydown = (e) => {
	if (e.keyCode === 13 && e.shiftKey) {
		textareaHeight(e);
	}
	else if (e.keyCode === 13) { // if da user press enter it should SUBMIT
		submitComment();
		e.preventDefault();
	}
};

const handleInput = (e) => {
	textareaHeight(e);
};

const textareaHeight = (e) => {
	e.target.style.height = "";
	e.target.style.height = e.target.scrollHeight + "px";
};

const updateTextbox = () => {
	nextTick(() => {
		submitIconClasses.value = submitIconClasses.value.replace("spin-spin-spin", "");
		if (currentState.value == knownStates.SUBMITTING) {
			submitIconClasses.value = "spin-spin-spin";
		};
	});
};
const updateState = (newState) => {
	previousState.value = currentState.value;
	currentState.value = newState;
};

let commentAction = "post";
if (commentParent.value != null) commentAction = "reply";
else if (commentId.value != null) commentAction = "edit";

let commentBox;
onMounted(() => {
	commentBox = document.getElementById(`${commentAction}comment-textbox`);
	if (commentAction != "post") {
		commentBox.focus();
	};

	const watchThing = () => {
		if (error.value) beDisabled.value = true;
		else if (!API.user.loggedIn) beDisabled.value = true;
	};
	watchThing();

	watch(API.user, watchThing);
	watch(error, watchThing);
});

const handleCancel = () => {
	if (!API.user.loggedIn) return;

	if (beDisabled.value) return;

	props.extraSubmit({ isReplying: false });
};

const submitComment = () => {
	if (!API.user.loggedIn) return;

	if (beDisabled.value) return;
	if (currentState.value != knownStates.NORMAL) return;

	updateState(knownStates.SUBMITTING);
	beDisabled.value = true;
	updateTextbox();

	const finishUp = (type, msg) => {
		let errStart = "Failed to post your comment!";
		if (commentAction == "reply") errStart = "Failed to post your reply!";
		else if (commentAction == "edit") errStart = "Failed to edit your comment!";

		if (type == "error" || (type != "error" && msg))
			Toast.showToast(type == "error" ? `${errStart} ${msg}` : msg, { type: type == "error" ? "error" : "success" });

		updateState(knownStates[type == "error" ? "ERROR" : "OK"]);
		beDisabled.value = true;
		updateTextbox();

		setTimeout(() => {
			updateState(knownStates.NORMAL);
			beDisabled.value = false;
			updateTextbox();
		}, 1000);
	};

	let commentBoxText = commentBox.value;
	commentBoxText = commentBoxText?.trim();
	if (!commentBoxText) return finishUp("error", "Please enter some text and try again...");

	let currentTime = Math.floor(Date.now() / 1000);
	let newComment = { content: commentBoxText };
	if (commentAction == "edit") {
		let commentIndex = commentSystem.value.cache.findIndex(c => c.id === commentId.value);
		if (commentIndex == null || commentIndex == undefined) return;

		let ogContent = commentContent.value;
		let ogEdited = commentSystem.value.cache[commentIndex].edited;

		props.extraSubmit({ content: newComment.content, isEditing: false, isLoading: true, edited: true });

		API.patch(`/comments/${commentId.value}`, { content: newComment.content }).then(res => {
			if (res.status != 200 && res.status != 201) {
				// Restore original data
				props.extraSubmit({ content: ogContent, isEditing: true, isLoading: false, edited: ogEdited });

				finishUp("error", "Please try again.");
			} else {
				props.extraSubmit({ content: newComment.content, isEditing: false, isLoading: false, edited: true });
				commentBox.value = "";

				finishUp("success");
			}
		});
	} else {
		newComment = {
			...newComment,
			id: currentTime,
			time: currentTime,
			author: {
				id: API.user.id,
				name: API.user.username,
				nick: API.user.nickname,
				avatar: API.user.avatar,
				color: API.user.color,
				staff: API.user.staff,
				position: API.user.position
			},
			ups: 0,
			downs: 0,
			isLoading: true,
			showMore: true,

			parent: commentParent
		};
		commentSystem.value.cache.unshift(newComment); // Add comment to the cache

		if (commentAction == "reply")
			props.extraSubmit({ isReplying: false });

		API.post(commentSystem.value.path, { content: newComment.content, replyingto: commentParent.value }).then(res => {
			if (res.status != 200 && res.status != 201) {
				// Restore original data
				commentSystem.value.cache = commentSystem.value.cache.filter(c => { return c.id !== currentTime });

				if (commentAction == "reply")
					props.extraSubmit({ isReplying: true });

				finishUp("error", "Please try again.");
			} else {
				newComment = { ...newComment, ...res.data, isLoading: false, vote: 1 };
				commentSystem.value.cache = commentSystem.value.cache.filter(c => { return c.id !== currentTime });
				commentSystem.value.cache.unshift(newComment);
				commentBox.value = "";

				API.user.comments++;
				finishUp("success");
			}
		});
	};

	return;
};

</script>

<template>
	<div
		:class="`${commentParent != null ? 'w-full max-w-screen-lg min-h-24 gap-3 py-0 m-auto pl-5 flex relative mt-3' : ''}`">
		<div v-if="commentParent != null">
			<GradientLine lineStyle="vert" :overshoot="false" class="!h-14" />
		</div>
		<div class="new-comment w-full">
			<div class="w-full rounded flex gap-3">
				<img v-if="commentParent == null && commentId == null" class="rounded-xl object-fill max-h-24 my-auto"
					:src="API.user.avatar" alt="avatar" />
				<Textbox :box-name="`${commentAction}comment`" :be-disabled="beDisabled" :handleInput="handleInput"
					:handleKeydown="handleKeydown" :handleSubmit="submitComment" :handleCancel="handleCancel"
					:submitIcon="currentState.icon" :submitIconClasses="submitIconClasses"
					:placeholderText="API.user.loggedIn ? `Press enter to ${commentAction}. Use shift+enter to make a new line.` : `Please login to comment.`"
					:value="commentContent" :isReply="commentParent != null">
				</Textbox>
			</div>
		</div>
	</div>
</template>