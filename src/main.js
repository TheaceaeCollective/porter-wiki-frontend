import { createSSRApp } from "vue";
import App from "./App.vue";
import router from "./router";

import './assets/style/main.scss';
import './assets/style/tailwind.css';

// Plugin import
// -- Cookies
import VueCookies from 'vue-cookies'
// -- Toastify
import 'vue3-toastify/dist/index.css';
// -- Overlay Scrollbars (Vue)
// import 'overlayscrollbars/overlayscrollbars.css';
// -- Vue Unhead?
import { createHead } from '@unhead/vue';

export function createApp(config) {
	let isProduction = config?.isProduction ?? true; // assume we are always in production unless otherwise.

	const app = createSSRApp(App);

	// Plugin config
	// -- Cookies
	// default options config: { expires: '1d', path: '/', domain: '', secure: '',
	// sameSite: 'Lax' , partitioned: false}
	app.use(VueCookies, {expires: '7d', path: '/'});

	// -- Vue-Router
	app.use(router);

	// -- Vue Unhead
	const head = createHead();
	app.use(head);

	return { app, router, head };
};