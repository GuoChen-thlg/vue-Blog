import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/tags/:label?',
		name: 'Tags',
		component: () => import('@/views/Tags.vue'),
	},
	{
		path: '/categories/:class?',
		name: 'Categories',
		component: () => import('@/views/Categories.vue'),
	},
	{
		path: '/archives',
		name: 'Archives',
		component: () => import('@/views/Archives.vue'),
	},
	{
		path: '/post/test',
		name: 'Post',
		component: () => import('@/views/Post.vue'),
	},
	// {
	// 	path: '/404',
	// 	name: '404',
	// 	component: () => import('@/views/404.vue'),
	// },
	// {
	// 	path: '*',
	// 	redirect: '/404',
	// },
]

const router = new VueRouter({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
	routes,
})

export default router
