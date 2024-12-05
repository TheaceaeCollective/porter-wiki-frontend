<script setup>
import Events from '@/utils/Events';

import LoadingImage from '../LoadingImage.vue';
import PopupOverlay from '@/overlays/popup/PopupOverlay.vue';
import TitleBar from '@/overlays/TitleBar.vue';

const pictureID = Math.floor((Date.now() / 3) * Math.random());

const props = defineProps({
	url: String,
	alt: String
});

let altTrimmed = props.alt;
let extraClasses = "";

var left = altTrimmed.endsWith("<");
var right = altTrimmed.endsWith(">");

if (left || right) {
	altTrimmed = altTrimmed.substring(0, altTrimmed.length - 1).trimEnd();

	extraClasses = "lg:ml-2 ";

	if (left)
		extraClasses += "lg:float-left";
	else
		extraClasses += "lg:float-right"
}


const openModal = () => {
	Events.Emit(`popup-image-${pictureID}`);
};

// Events.Register(`popup-image-${pictureID}-close`, () => {
// });

</script>

<template>
	<div :class="'flex flex-col gap-2 ' + extraClasses">
		<LoadingImage :src="url" class="rounded-xl cursor-pointer" @click="openModal" />
		<p class="text-light-gray text-center">{{ altTrimmed }}</p>
	</div>

	<PopupOverlay :event="`popup-image-${pictureID}`">
		<template #title="{ ClosePopup }">
			<TitleBar :close="ClosePopup" :titleStyle="2" />
		</template>
		<template #content>
			<div class="flex flex-col gap-1 justify-center items-center">
				<LoadingImage :src="url" class="rounded-xl" />
				<p class="text-light-gray text-center">{{ altTrimmed }}</p>
			</div>
		</template>
		<template #footer>
			<div></div>
		</template>
	</PopupOverlay>
</template>