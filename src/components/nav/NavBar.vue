<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { PhList, PhX, PhGlobe, PhBell, PhMagnifyingGlass } from "@phosphor-icons/vue";

import API from "@/utils/API";

import WikiLogo from "@/components/WikiLogo.vue";
import NavBarButton from "./NavBarButton.vue";
import NavBarAccount from "./NavBarAccount.vue";
import Events from "@/utils/Events";

const isOpen = ref(false);

const togNav = (newValue) => { // pass newValue to force toggle
	if (!newValue) newValue = !isOpen.value;
	isOpen.value = newValue;
	document.body.classList[newValue ? "add" : "remove"]("overflow-hidden");
};

const router = useRouter();

const leftLinkList = [{
	route: "/",
	name: "Main Page",
}, {
	route: "/community/server/guidelines",
	name: "Staff Guidelines",
}, {
	route: "/wiki/contributing",
	name: "How to Contribute",
}, {
	route: "/wiki/about",
	name: "About Page",
}];

const rightLinkList = [{
	route: "/settings",
	name: "Settings"
}, {
	route: "/polls",
	name: "Polls"
}];

if (API.user.loggedIn) rightLinkList.push({
	route: "/settings",
	name: "Settings",
});

// we basically "hook" info the anchor click
// and if it's an internal link, we use the router
function openLink(e, url) {
	e.preventDefault();

	if (url.startsWith('/') || url.startsWith("#")) {
		router.push(url);
	} else {
		window.open(url, '_blank');
	}

	togNav(false);
}

onMounted(() => {

	window.addEventListener("keydown", (e) => {
		const inputFocused = e.target.tagName.toLowerCase() == 'input' || e.target.tagName.toLowerCase() == 'textarea';
		if (!inputFocused) {
			if (e.key == "q") togNav();
			else if (e.key == "l" && API.user.loggedIn) API.performLogout();
		};
	});
});
</script>

<template>
	<div class="w-screen h-16 fixed bg-background-3 z-40 pt-2 pb-14">
		<nav class="w-full z-10 px-2 xl:px-0">
			<div class="flex justify-between xl:w-content-width xl:mx-auto">
				<div class="flex items-center text-center gap-4">
					<NavBarButton @click="togNav(false)"
						:class="(isOpen ? 'is-open' : '') + ' relative overflow-hidden'">
						<Transition name="fade">
							<Component :is="(isOpen ? PhX : PhList)" :size="28" class="absolute"></Component>
						</Transition>
					</NavBarButton>
					<WikiLogo size="small" @click="router.push('/')" class="cursor-pointer" />
				</div>
				<div class="flex items-center text-center gap-4">
					<!-- TODO: add functionality to all of these cool buttons - john -->
					<PhMagnifyingGlass :size="28" class="hover:text-accent transition-colors cursor-pointer"
						@click="Events.Emit('searchoverlay')" />
					<div class="w-[2px] h-9 max-md:hidden bg-gray"></div>
					<div class="max-md:hidden flex gap-1">
						<NavBarButton first>
							<PhGlobe :size="28" />
						</NavBarButton>
						<!--if there ever gets anything added here, give it the 'middle' attribute-->
						<NavBarButton last>
							<PhBell :size="28" />
						</NavBarButton>
					</div>
				</div>
			</div>
		</nav>
		<Transition name="fade">
			<div v-if="isOpen" @click="togNav(false)"
				class="fixed -z-10 top-16 bg-background-1/50 h-full backdrop-blur-sm md:mx-4 w-screen md:w-layout-width rounded-t-2xl">
			</div>
		</Transition>
		<Transition name="slidedown-fade">
			<nav v-if="isOpen"
				class="fixed z-10 top-16 bg-background-1 md:mx-4 w-screen md:w-layout-width rounded-t-2xl">
				<div
					class="flex flex-col lg:flex-row gap-4 lg:gap-0 md:justify-between xl:w-content-width xl:mx-auto mx-auto px-2 xl:px-0 py-4 lg:py-2">
					<div class="flex flex-col lg:flex-row items-center text-center gap-4">
						<NavBarAccount />
						<a class="hover:text-accent text-lg font-light cursor-pointer" v-for="link in leftLinkList"
							@click="(e) => openLink(e, link.route)" :href="link.route">{{ link.name }}</a>
					</div>
					<div class="flex flex-col lg:flex-row items-center text-center gap-4">
						<a class="hover:text-accent text-lg font-light cursor-pointer" v-for="link in rightLinkList"
							@click="(e) => openLink(e, link.route)" :href="link.route">{{ link.name }}</a>
					</div>
				</div>
			</nav>
		</Transition>
	</div>
</template>

<style lang="scss">
.is-open {
	background: var(--background-nav-open);
}

.slidedown-fade-enter-active,
.slidedown-fade-leave-active {
	transition: opacity 0.15s ease-in-out, max-height 0.2s ease-in-out;
}

.slidedown-fade-enter-to,
.slidedown-fade-leave-from {
	overflow: hidden;
	max-height: 100vh;
	opacity: 1;

	@media screen and (min-width: 1024px) {
		max-height: var(--nav-height);
	}
}

.slidedown-fade-enter-from,
.slidedown-fade-leave-to {
	overflow: hidden;
	max-height: 100vh;
	opacity: 0;

	@media screen and (min-width: 1024px) {
		max-height: 0;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
