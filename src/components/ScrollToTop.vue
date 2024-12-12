<script setup>

// Hi, it's @thecodingguy
// There is probably a way better method to this madness.
// If there is, please refactor this. Otherwise, I'll probably fix it more later.
// Sorry for the jankness!
// 2024/07/10 5:46

import { onMounted, reactive } from 'vue';

import { PhCaretUp, PhCaretDown } from '@phosphor-icons/vue';

const react = reactive({
	prevPos: 0,
	currPos: 0,
	showReturnBtn: false
});

const getcurrPos = () => (window.scrollY || document.documentElement.scrollTop);

const handleScroll = (e) => {
	const currPos = getcurrPos();

	react.showReturnBtn = (currPos > 10 && !react.prevPos);
	react.currPos = currPos;
	react.prevPos = 0;
};

const scrollPos = (e) => {
	const currPos = getcurrPos();
	document.removeEventListener("scroll", handleScroll);
	e.target.removeEventListener("click", scrollPos)

	window.scrollTo({
		top: (!react.prevPos) ? 0 : react.prevPos,
		behavior: "smooth"
	});

	react.prevPos = currPos;

	setTimeout(() => { document.addEventListener("scroll", handleScroll); e.target.addEventListener("click", scrollPos); }, currPos);
};

onMounted(() => {
	document.addEventListener("scroll", handleScroll);
});

</script>

<template>
	<Transition name="fade">
		<div id="scrollTo" v-if="react.showReturnBtn"
			class="fixed bg-background-1 p-5 bottom-0 right-0 cursor-pointer z-50" @click="scrollPos">
			<Component :is="((react.prevPos == 0) ? PhCaretUp : PhCaretDown)" class="text-xl"></Component>
		</div>
	</Transition>
</template>

<style lang="scss">
#scrollTo {
	border-radius: 40px;
	right: 2em;
	bottom: 18px;
}
</style>