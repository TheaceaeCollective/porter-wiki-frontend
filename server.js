import fs from 'node:fs/promises'
import express from 'express'
import AppConfig from "./src/utils/Config.js";

const isProduction = process.env.IS_PROD.toString() == "true";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const genDT = () => { const pZ = (i) => { return `${(i < 10) ? "0": ""}${i}` }; const currently = new Date(); return `${pZ(currently.getFullYear())}` + "/" + `${pZ(currently.getMonth() + 1)}` + "/" + `${pZ(currently.getDate())}` + " " + `${pZ(currently.getHours())}` + ":" + `${pZ(currently.getMinutes())}` + ":" + `${pZ(currently.getSeconds())}`; };
const log = (c) => console.log(genDT() + "  |  " + c);

log(`Starting ${AppConfig.siteName} Server...`);
log(`Settings: port: ${port} - env: ${isProduction ? "prod" : "dev"}`);

let templateHtml;
let ssrManifest;

try {
	// Cached production assets
	templateHtml = isProduction
		? await fs.readFile("./dist/client/index.html", "utf-8")
		: "";
	ssrManifest = isProduction
		? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
		: undefined;
} catch {
	console.log("Failed to load either client index.html or .vite/ssr-manifest -- please build client first!");
	process.exit(1);
};

const app = express();

// Add Vite & respective production middlewares
let vite;
if (!isProduction) {
	const { createServer } = await import("vite");
	vite = await createServer({
		server: { middlewareMode: true },
		appType: "custom",
		base
	});
	app.use(vite.middlewares);
} else {
	const compression = (await import("compression")).default;
	const sirv = (await import("sirv")).default;
	app.use(compression());
	app.use(base, sirv("./dist/client", { extensions: [] }));
};

app.use("*", async (req, res) => {
	try {
		const url = req.originalUrl.replace(base, "")

		let template
		let render
		if (!isProduction) {
			// Always read fresh template in development
			template = await fs.readFile("./index.html", "utf-8");
			template = await vite.transformIndexHtml(url, template);
			render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
		} else {
			template = templateHtml;
			render = (await import("./dist/server/entry-server.js")).render;
		};
		const rendered = await render({ url, isProduction });

		let renderedHead = rendered.head ?? "";
		renderedHead = renderedHead + rendered.unHead.headTags;

		const html = template
			.replace(`<!--app-head-->`, renderedHead ?? "")
			.replace(`<!--app-html-->`, rendered.html ?? "");

		res.status(200).set({ "Content-Type": "text/html" }).send(html);
	} catch (e) {
		vite?.ssrFixStacktrace(e);

		log("An error was encountered - " + e.message);
		console.log(e.stack);

		let errorCss = `body { background-color: #45283d; color: #fff; font-family: Arial, Helvetica, sans-serif; } a { color: #f06c9b; text-decoration: none; } a:hover { color: #f9c4d7; text-decoration: underline; } #error { border-left: 2px solid #dd0000; background-color: #281824; padding: 12px 16px; font-size: 18px; text-align: center; line-height: 27px; }`;
		let errorHtml = `<div id="error">Uh-oh. A fatal error was encountered while loading Porter Robinson Wiki.<br><br>Please report to the developers on our <a href="https://discord.gg/nUeRyRtDYC">Discord</a>.</div>`;
		res.status(500).end(
			`<!DOCTYPE html><html><head><style>${errorCss}</style><title>Error | Porter Robinsin Wiki</title></head><body>${errorHtml}</body></html>`
		);
	}
})

// Start http server
app.listen(port, () => {
	log(`Server started at http://localhost:${port}`);
})