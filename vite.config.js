import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview}) => {
	const build = {
		bourcemap: true,
		checkSizeWarningLimit: 10000,
		modulePreload: {
			resolveDependencies: (url, deps, context) => {
				return [];
			}
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					// To see what modules are big, look at the sizes using:
					// if (id.includes("node_modules")) return id.toString().split("node_modules/")[1].split("/")[0].toString();

					const bigBois = [ "@phosphor-icons" ];
					if (bigBois.some(n => id.includes(`node_modules/${n}`))) return id.toString().split("node_modules/")[1].split("/")[0].toString();
				},
			}
		}
	};
	const plugins = [
		vue() // Vue plugin
	];
	const resolve = {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'vue/server-renderer': path.resolve(__dirname, 'node_modules', '@vue', 'server-renderer', 'dist', 'server-renderer.esm-bundler.js'),
			'vue': path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.esm-bundler.js'),
		}
	};
	return {
		build,
		plugins,
		resolve,
		ssr: ["build"].includes(command)
	};
})