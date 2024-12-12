<script setup>
import Textbox from '@/components/textbox/Textbox.vue';
</script>

<template>
	<div>
		<h1 class="text-2xl font-medium pb-1">Edit summary (briefly describe your changes)</h1>
		<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
	</div>
	<div>
		<Textbox placeholder-text="Insert some text..." :is-editor="true"></Textbox>
	</div>
	<div>
		Page goes here.
	</div>
</template>

<style lang="scss"></style>