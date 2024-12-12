<script setup>
import Textbox from '@/components/textbox/Textbox.vue';
</script>

<template>
	<div>
		<h1 class="text-2xl font-medium pb-1">Edit summary (briefly describe your changes)</h1>
		<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
	</div>
	<div>
		<h1 class="text-xl font-medium pb-1">Article cover</h1>
		<div class="w-full h-[148px] bg-black"></div>
	</div>
	<div class="w-full flex flex-row gap-4">
		<div class="w-full">
			<h1 class="text-xl font-medium pb-1">Article title</h1>
			<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
		</div>
		<div class="w-full">
			<h1 class="text-xl font-medium pb-1">Article type</h1>
			<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
		</div>
		<div class="w-full">
			<h1 class="text-xl font-medium pb-1">Article date</h1>
			<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
		</div>
	</div>
	<div class="w-full flex flex-row gap-4">
		<div class="w-full">
			<h1 class="text-xl font-medium pb-1">Article description</h1>
			<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
		</div>
		<div class="w-full">
			<h1 class="text-xl font-medium pb-1">Article tags</h1>
			<Textbox placeholder-text="Insert some text..." :simple="true"></Textbox>
		</div>
	</div>
</template>

<style lang="scss"></style>