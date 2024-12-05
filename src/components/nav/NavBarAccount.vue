<script setup>
import Formatting from '@/utils/Formatting';
import API from '@/utils/API';
import Events from '@/utils/Events';

function onClick(e) {
	e.preventDefault();

	// Check if logged in
	if (API.user.loggedIn) {
		Events.Emit('profile-overlay', API.user.id)
	} else {
		API.performLogin();
	};
}

</script>

<template>
	<div class="w-64 h-12 rounded-lg flex bg-background-3 cursor-pointer" @click="onClick">
		<img :class="`rounded-lg border-2`" :src="API.user.avatar" :style="`border-color: ${API.user.color}`" alt="avatar" />
		<div class="flex flex-col pl-2 text-left justify-center">
			<p class="text-lg leading-none font-medium">{{ API.user.username }}</p>
			<span class="text-sm leading-none opacity-75">
				{{ API.user.loggedIn ? `Joined ${Formatting.formatDate(API.user.join, { month: "short" })} •
				${API.user.comments} comments` : "Log in to access more features..." }}</span>
		</div>
	</div>
</template>