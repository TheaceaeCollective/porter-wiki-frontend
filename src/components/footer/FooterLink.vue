<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
	url: {
		type: String,
		default: null
	},
	text: {
		type: String,
		default: null
	}
});

const router = useRouter();

function openLink(e, url) {
	e.preventDefault();

	url.endsWith('/') ? url.slice(0, -1) : url

	if (url.startsWith('/')) {
		router.push(url);
	} else {
		window.open(url, '_blank');
	}
}

</script>

<template>
	<a :href="url" class="hover:text-accent text-lg font-light cursor-pointer" @click="(e) => openLink(e, url)">
		{{ text || url }}
	</a>
</template>