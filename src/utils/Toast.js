import { toast } from 'vue3-toastify';

const toastSettings = {
	theme: "dark",
	type: "default",
	transition: "slide",
	newestOnTop: false,
	clearOnUrlChange: false,
	dangerouslyHTMLString: false,
	colored: true
};

import { PhCheckCircle, PhInfo, PhWarning, PhX } from '@phosphor-icons/vue';


export default class Toast {
	static showToast = (data, moreSettings) => {
		let icon = "";
		if (moreSettings.type == "success") icon = PhCheckCircle;
		else if (moreSettings.type == "error") icon = PhX;
		else if (moreSettings.type == "warning") icon = PhWarning;
		else if (moreSettings.type == "info") icon = PhInfo;

		if (icon) toastSettings.icon = icon;
		toast(data, { ...toastSettings, ...moreSettings });
	};
}