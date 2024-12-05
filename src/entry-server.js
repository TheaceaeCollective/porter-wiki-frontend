import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { renderSSRHead } from '@unhead/ssr';

import AppConfig from './utils/Config.js';
import MetaTagsController from './utils/MetaTagsController.js';

const getData = async(endpoint) => {
	return fetch(AppConfig.backendURL + endpoint, {
		method: 'GET'
	}).then(async response => {
		let responseData;
		try { if (responseData == null) responseData = (typeof response.json == "function") ? await response.json() : null; } catch { };
		try { if (responseData == null) responseData = (typeof response.text == "function") ? await response.text() : null; } catch { };
		return { status: response.status, data: responseData || {} };
	}).catch(async response => { return { status: response.status, data: (typeof response.text == "function" ? await response.text() : response) } });
};

export async function render(config) {
	const { app, head } = createApp(config);

	// <head>
	await head.resolveTags();

	let metaUse = MetaTagsController.getMeta("/" + config.url);

	try {
		if (!metaUse) {
			let articleUrl = `/articles/${config.url}`;
			let articleData = await getData(articleUrl);
			if (articleData.data?.meta && !MetaTagsController.getMeta(config.url)) MetaTagsController.setMeta(config.url, articleData.data, true);
			metaUse = MetaTagsController.getMeta(config.url);
		};
	} catch (Ex) { console.log("Error while getting article data: " + Ex.message); };
	if (!metaUse) metaUse = MetaTagsController.getMeta("default");
	
	head.push(metaUse);

	const unHead = await renderSSRHead(head);

	// Rest of HTML
	const ctx = {};
	const html = await renderToString(app, ctx);

	return { html, unHead, metaUse };
}