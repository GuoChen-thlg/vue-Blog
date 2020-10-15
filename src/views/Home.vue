<template>
	<!-- <div class="home outer">
		<div class="brand">
			<aside>
				<sitehead />
				<sitenav :menulist="site_menuList" />
			</aside>
			<sitesidebar
				:allShow="false"
				:navlist="site_navlist"
				:links="site_links"
				:blogrolllist="site_blogrolllist"
			/>
		</div>
		<main>
			<posts
				:postlist="postlist"
				:presentPage="presentPage"
				:overallPage="overallPage"
				@upDataPaging="pagingFun"
			/>
		</main>
	</div> -->
	<layout class_name="home" :site_sidebar_all_show="false">
		<main>
			<posts
				:postlist="postlist"
				:presentPage="presentPage"
				:overallPage="overallPage"
				@upDataPaging="pagingFun"
			/>
		</main>
	</layout>
</template>

<script>
	// @ is an alias to /src
	import Posts from '@/components/posts.vue'
	import Layout from '@/components/layout.vue'
	import { siteInit, getPostList } from '@/api/index'
	import axios from 'axios'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Home',
		data() {
			return {
				postlist: [],
				presentPage: 1,
				overallPage: 1,
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				axios.all([getPostList()]).then(
					axios.spread((res) => {
						if (res.code === 200) {
							this.postlist = res.data['postList']
							this.presentPage = res.data['presentPage']
							this.overallPage = res.data['overallPage']
						}
					})
				)
			},
			pagingFun(pagenum) {
				// getPostList()
				this.presentPage = pagenum
				console.log(pagenum);
			}

		},
		computed: {
			...mapGetters('site', [
				'site_pattern',
				'site_navlist',
				'site_links',
				'site_menuList',
				'site_blogrolllist'
			]),
		},
		components: {
			'posts': Posts,
			'layout': Layout
		}
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/global.config.scss';
	.home {
		.brand {
		}
		main {
			background-color: rgba(255, 255, 255, -0.2);
			box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
		}
	}
	@media screen and (max-width: 1024px) {
	}
	@media screen and (max-width: 1000px) {
	}
	@media screen and (min-width: 768px) {
	}
	@media screen and (max-width: 375px) {
	}
</style>
