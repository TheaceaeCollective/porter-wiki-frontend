import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import NewsView from '../views/news/NewsView.vue'
import BlogView from '@/views/blog/BlogView.vue'
import ArticleView from '../views/article/ArticleView.vue'
import oauthComplete from '../views/oauthComplete.vue'

const router = createRouter({
	history: import.meta.env.SSR
		? createMemoryHistory(import.meta.env.BASE_URL)
		: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/news',
			name: 'news',
			component: NewsView
		},
		{
			path: '/blog',
			name: 'blog',
			component: BlogView
		},
		{
			path: '/oauthComplete',
			name: 'oauthComplete',
			component: oauthComplete
		},
		{ // redirect everything else to article
			path: '/:pathMatch(.*)*',
			component: ArticleView
		}
	],
	scrollBehavior: (to, from, savedPosition) => {
		return { top: 0 }
	}
})

export default router;