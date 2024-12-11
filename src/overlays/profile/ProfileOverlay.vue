<script setup>
import { reactive, ref } from "vue";
import { PhGithubLogo, PhCoffee, PhDiscordLogo } from "@phosphor-icons/vue";
import Events from "@/utils/Events";
import ActiveComponents from "@/utils/ActiveComponents";
import API from "@/utils/API";

import Toast from "@/utils/Toast";
import GradientLine from "@/components/GradientLine.vue";
import GrayLine from "@/components/GrayLine.vue";
import TitleBar from "../TitleBar.vue";
import PopupOverlay from "../popup/PopupOverlay.vue";
import Button from "@/components/Button.vue";
import ProfileComment from "./ProfileComment.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Formatting from "@/utils/Formatting";

const content = ref();

const react = reactive({
	open: false,
	user: {},
});

const CacheSystem = {
	users: {},
	refresh: 15, // In seconds
};

const userStatistics = [
	{
		label: "Join Date",
		value: Formatting.formatDate(API.user.join, { month: "short" }),
	},
	{
		label: "Articles Written",
		value: "???",
	},
	{
		label: "Comments",
		value: API.user.comments,
	},
];
Events.Register("profile-overlay", (userID) => {
	let toRefresh = true;
	if (CacheSystem[userID]) {
		if (
			Date.now() <
			CacheSystem[userID].refreshedAt + CacheSystem.refresh * 1000
		)
			toRefresh = false;
	}
	console.log(
		"looking up user using cache? " +
		(CacheSystem[userID] !== undefined ? "yes" : "no")
	);
	if (toRefresh) {
		let profileData = API.get(`/profile/${userID}`);
		CacheSystem[userID] = {
			data: profileData,
			refreshedAt: Date.now(),
		};
		react.user = profileData;
	}
	react.open = true;
	ActiveComponents.open("profile-overlay");
});

Events.Register("profile-overlay-close", () => {
	Close(null);
});

function Close(e) {
	if (e && content?.value?.contains(e.target)) return;

	react.open = false;
	react.user = {};
}


// temporary function - john
function wipToast() {
	Toast.showToast("That feature is not implemented yet but will be soon!", { type: "error" })
}

// logs out then closes the popup - john
function logOut(ClosePopup) {
	if (API.user.loggedIn) {
		API.performLogout();
		ClosePopup();
	}
}
</script>

<template>
	<!--todo: use comment component and current design.
grab data from backend(comments, articles written, join date, etc)
connections MAY need to be removed since it requires a backend update
the about me is custom.need to communicate with backend - john-->

	<Transition name="overlay">
		<div class="z-50 flex fixed justify-center items-center w-screen h-screen top-0 py-24 bg-opacity-25 backdrop-blur overflow-y-scroll"
			@click="Close" v-if="react.open">
			<div class="z-0 w-content-width min-h-full bg-background-1 bg-opacity-90 backdrop-blur theShadow rounded-xl flex flex-col p-5 gap-1"
				ref="content">
				<TitleBar title="Profile View" :close="Close" />
				<ProfileCard :user="API.user" />
				<div class="grid grid-cols-4 gap-8">
					<div class="col-span-3 flex flex-col gap-4">
						<div class="flex flex-row gap-2">
							<span>Comments</span>
							<span>Polls</span>
						</div>
						<GradientLine :overshoot="false" />
						<div class="flex flex-row gap-4">
							<span>Sort by</span>
							<div class="flex flex-row gap-2">
								<span>New</span>
								<span>Old</span>
							</div>
						</div>
						<div class="flex flex-col gap-4 overflow-auto">
							<ProfileComment />
							<ProfileComment />
						</div>
					</div>
					<div class="col-span-1">
						<div class="flex flex-col gap-2">
							<div class="flex flex-row items-center justify-between">
								<span class="justify text-2xl font-semibold">About Me</span>
								<span>Edit</span>
							</div>
							<GradientLine :overshoot="false" />
							<span class="text-xl leading-6 font-light">Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Velit
								quisquam laudantium architecto dolor ipsam temporibus officia
								porro reiciendis eaque totam necessitatibus fugiat quae non
								delectus sapiente omnis enim, nemo officiis!</span>
							<GrayLine :overshoot="false" />
							<div class="flex flex-col gap-1" v-for="statistic in userStatistics">
								<span class="text-lg font-medium leading-4">{{
									statistic.label
								}}</span>
								<span class="text-base light leading-4 opacity-70">{{
									statistic.value
								}}</span>
							</div>
							<div class="flex flex-col gap-1">
								<span class="text-lg font-medium leading-4">Connections</span>
								<div class="flex flex-row items-center gap-1">
									<a href="#">
										<PhDiscordLogo :size="24"
											class="text-white text-opacity-70 hover:text-opacity-90" />
									</a>
									<a href="#">
										<PhGithubLogo :size="24"
											class="text-white text-opacity-70 hover:text-opacity-90" />
									</a>
									<a href="#">
										<PhCoffee :size="24" class="text-white text-opacity-70 hover:text-opacity-90" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<p class="text-lg text-red bottom-0 justify-center mx-auto cursor-pointer" @click="wipToast">
					Report Profile
				</p>
			</div>
		</div>
	</Transition>

	<PopupOverlay event="popup-logout">
		<template #content>Are you very sure you want to logout?</template>
		<template #footer="{ ClosePopup }">
			<div class="flex justify-center gap-2">
				<Button type="success" @click="logOut(ClosePopup)">Yes</Button>
				<Button type="error" @click="ClosePopup">Cancel</Button>
			</div>
		</template>
	</PopupOverlay>
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