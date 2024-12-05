<script setup>
import { reactive, ref } from 'vue';
import { PhCheckFat } from '@phosphor-icons/vue';

import Events from '@/utils/Events';
import ActiveComponents from '@/utils/ActiveComponents';
import Button from '@/components/Button.vue';

const props = defineProps({
	event: {
		type: String,
		required: true
	}
});

const popupContent = ref();

const popupReact = reactive({
	open: false,
});

Events.Register(props.event, () => {
	popupReact.open = true;
	document.body.classList.add("overflow-hidden");
	ActiveComponents.open(props.event);
});

Events.Register(props.event + "-close", () => {
	ClosePopup(true);
	Events.Emit(props.event + "-closeComplete");
});

function ClosePopup(fromEmitted, event) {
	if (!fromEmitted && event) {
		if (!event.target.classList.contains("backdrop-blur")) return;
	};
	if (fromEmitted != true) return ActiveComponents.close();
	popupReact.open = false;
	document.body.classList.remove("overflow-hidden");
}
</script>

<template>
	<Transition name="overlay">
		<div class="z-50 flex fixed inset-0 justify-center items-center min-w-screen min-h-screen top-0 py-24 bg-opacity-25 backdrop-blur overflow-y-scroll"
			v-if="popupReact.open" @click="e => ClosePopup(null, e)">
			<div class="z-0 max-w-4xl bg-background-1 bg-opacity-90 backdrop-blur theShadow rounded-xl flex flex-col p-5 gap-1"
				ref="popupContent">
				<slot name="title" :ClosePopup="ClosePopup"></slot>
				<div class="flex grow">
					<div class="justify-center text-lg w-full flex mb-3 whitespace-pre text-wrap text-center">
						<slot name="content">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
								irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
								pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
								deserunt mollit anim id est laborum.
							</p>
						</slot>
					</div>
				</div>
				<slot name="footer" :ClosePopup="ClosePopup">
					<div class="flex justify-center gap-2">
						<Button @click="ClosePopup">Ok
							<PhCheckFat :size="18" weight="fill" />
						</Button>
					</div>
				</slot>
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
