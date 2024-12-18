<script setup>
import { toRefs } from 'vue';

import { PhTextBolder, PhTextItalic, PhTextH, PhTextUnderline, PhTextStrikethrough, PhListBullets, PhListNumbers, PhListChecks, PhQuotes, PhCodeSimple, PhHighlighter, PhSelection, PhGridFour, PhLinkSimple, PhImage, PhPaperPlaneRight, PhX } from '@phosphor-icons/vue';

import TextboxIcon from './TextboxIcon.vue';

const props = defineProps({
	isEditor: {
		type: Boolean,
		default: false
	},
	isReply: {
		type: Boolean,
		default: false
	},
	beDisabled: {
		type: Boolean,
		default: false
	},
	submitIcon: {
		type: Object,
		default: PhPaperPlaneRight
	},
	submitIconClasses: {
		type: String,
		default: "",
		required: false
	},
	handleInput: {
		type: Function,
		default: () => { }
	},
	handleKeydown: {
		type: Function,
		default: () => { }
	},
	handleSubmit: {
		type: Function,
		default: () => { }
	},
	handleCancel: {
		type: Function,
		default: () => { }
	},
	placeholderText: {
		type: String,
		default: "Press enter to submit. Use shift+enter to make a new line."
	},
	boxName: {
		type: String
	},
	value: {
		type: String,
		default: null
	},
	simple: {
		type: Boolean,
		default: false
	}
});

const { handleInput, handleKeydown, handleSubmit, placeholderText, beDisabled, boxName, value, simple } = toRefs(props);
</script>

<template>
	<div class="h-auto w-full flex flex-col rounded-xl bg-background-1 p-2 gap-2">
		<div class="w-full flex gap-2">
			<textarea
				class="h-10 w-full resize-none overflow-hidden rounded-lg bg-background-1 px-3 py-1 text-lg outline-none ring-background-4 focus:ring-2"
				:placeholder="placeholderText" @input="handleInput" @keydown="handleKeydown" :disabled="beDisabled"
				:id="`${boxName}-textbox`" :value="value" />

			<button v-if="!simple"
				:class='"m-auto flex size-10 items-center justify-center rounded-lg bg-background-3 p-1 cursor-" + `${beDisabled ? "deny" : "pointer"}`'
				id="submit" @click="handleSubmit" :disabled="beDisabled">
				<Component :is="submitIcon" :size="20" :disabled="beDisabled" :class="submitIconClasses"></Component>
			</button>
			<button v-if="isReply && !simple"
				:class='"m-auto flex size-10 items-center justify-center rounded-lg bg-background-3 p-1 cursor-" + `${beDisabled ? "deny" : "pointer"}`'
				id="cancel" @click="handleCancel" :disabled="beDisabled">
				<Component :is="PhX" :size="20" :disabled="beDisabled" :class="submitIconClasses"></Component>
			</button>
		</div>
		<div v-if="!simple" class="max-w-fit flex flex-wrap px-2 gap-2 bg-background-3 rounded-lg py-2">
			<div id="formatting" class="w-auto flex gap-3">
				<TextboxIcon :icon="PhTextBolder" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextItalic" :disabled="beDisabled" />
				<TextboxIcon v-if="isEditor" :icon="PhTextH" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextUnderline" :disabled="beDisabled" />
				<TextboxIcon :icon="PhTextStrikethrough" :disabled="beDisabled" />
			</div>
			<div class="h-auto w-0.5" style="background: rgba(255, 255, 255, 15%);"></div>
			<div id="list" class="w-auto flex gap-3">
				<TextboxIcon :icon="PhListBullets" :disabled="beDisabled" />
				<TextboxIcon :icon="PhListNumbers" :disabled="beDisabled" />
				<TextboxIcon v-if="isEditor" :icon="PhListChecks" :disabled="beDisabled" />
			</div>
			<div class="h-auto w-0.5" style="background: rgba(255, 255, 255, 15%);"></div>
			<div id="misc" class="w-auto flex gap-3">
				<TextboxIcon :icon="PhQuotes" :disabled="beDisabled" />
				<TextboxIcon v-if="isEditor" :icon="PhCodeSimple" :disabled="beDisabled" />
				<TextboxIcon v-if="isEditor" :icon="PhHighlighter" :disabled="beDisabled" />
				<TextboxIcon :icon="PhSelection" :disabled="beDisabled" />
				<TextboxIcon v-if="isEditor" :icon="PhGridFour" :disabled="beDisabled" />
				<TextboxIcon :icon="PhLinkSimple" :disabled="beDisabled" />
				<TextboxIcon :icon="PhImage" :disabled="beDisabled" />
			</div>
		</div>
	</div>
</template>