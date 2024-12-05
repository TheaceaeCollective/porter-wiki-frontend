<script setup>
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
</script>

<template>
    <div class="nav-search-bar flex w-80 h-12 p-3 rounded-lg bg-background-2">
		<PhMagnifyingGlass :size="24" />
        <input type="text" placeholder="Search the Wiki..." />
    </div>
</template>

<style>
.nav-search-bar {
	> input {
		background: none;
		outline: none;
		padding: 0 0 0 8px;
		width: 100%;
	}
}
</style>