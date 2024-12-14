<script setup>
import FooterLink from "./FooterLink.vue";

import SiteDisclaimer from "../SiteDisclaimer.vue";
</script>

<template>
	<div class="w-full relative mt-4 flex h-24 flex-col rounded-t-2xl bg-background-3">
		<div class="w-full h-4 bg-background-1">
			<div class="w-full h-4 bg-background-2 rounded-b-2xl"></div>
		</div>
		<div class="w-full h-16 relative bg-background-1 flex items-center">
			<a href="https://theaceae.org/" target="_blank"
				class="absolute left-1 max-md:bottom-16 flex items-center hover:bg-background-3 p-1 rounded transition">
				<img src="https://raw.githubusercontent.com/theaceaecollective/.github/refs/heads/main/maintainedby.png"
					alt="Big Theaceae Logo" class="md:h-12 h-9" />
			</a>
			<div class="mx-auto text-center">
				<p class="flex text-xl justify-center gap-2">
					<FooterLink url="/legal/terms" text="Terms" />
					<span class="relative bottom-0.5 text-xl">&bull;</span>
					<FooterLink url="/legal/privacy" text="Privacy" />
					<span class="relative bottom-0.5 text-xl">&bull;</span>
					<FooterLink url="https://github.com/theaceaecollective/porter-wiki-frontend" text="GitHub" />
					<span class="relative bottom-0.5 text-xl">&bull;</span>
					<FooterLink url="https://discord.gg/nUeRyRtDYC" text="Discord" />
				</p>
				<p class="text-lg">
					<FooterLink url="https://github.com/theaceaecollective/porter-wiki-frontend"
						text="Theaceae Collective" />
					with the contribution of
					<FooterLink url="https://github.com/theaceaecollective/porter-wiki-frontend/graphs/contributors"
						text="others" />.
				</p>
			</div>
		</div>
	</div>
	<SiteDisclaimer /> <!-- remove once we are in beta -->
</template>


<style></style>