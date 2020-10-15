import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: '',
		},
	},
	{
		path: '/tags/:label?',
		name: 'Tags',
		component: () => import('@/views/Tags.vue'),
		meta: {
			title: '',
		},
	},
	{
		path: '/categories/:class?',
		name: 'Categories',
		component: () => import('@/views/Categories.vue'),
		meta: {
			title: '',
		},
	},
	{
		path: '/archives',
		name: 'Archives',
		component: () => import('@/views/Archives.vue'),
		meta: {
			title: '',
		},
	},
	{
		path: '/post/:title',
		name: 'Post',
		component: () => import('@/views/Post.vue'),
		meta: {
			title: '',
		},
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404.vue'),
		meta: {
			title: '',
		},
	},
	{
		path: '*',
		redirect: '/404',
	},
]

const router = new VueRouter({
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
	routes,
})
router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	next()
})

export default router
