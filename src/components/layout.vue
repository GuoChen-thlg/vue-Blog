<template>
	<div :class="['outer', 'layout', class_name]">
		<div class="brand">
			<aside>
				<sitehead />
				<sitenav :menulist="site_menuList" :isSearch='site_isSearch' />
			</aside>
			<sitesidebar
				:allShow="site_sidebar_all_show"
				:navlist="site_navlist"
				:links="site_links"
				:blogrolllist="site_blogrolllist"
			/>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	// @ is an alias to /src
	import SiteHead from '@/components/site-head.vue'
	import SiteNav from '@/components/site-nav.vue'
	import SiteSidebar from '@/components/site-sidebar.vue'
	// import { getPostList } from '@/api/index'
	import { mapGetters } from 'vuex'
	export default {
		name: 'layout',
		props: {
			class_name: {
				type: String,
				default: ''
			},
			'site_sidebar_all_show': {
				type: Boolean,
				default: false
			}
		},
		mounted() {
		},
		computed: {
			...mapGetters('site', [
				'site_navlist',
				'site_links',
				'site_menuList',
				'site_blogrolllist',
				'site_isSearch'
			]),
		},
		components: {
			'sitehead': SiteHead,
			'sitenav': SiteNav,
			'sitesidebar': SiteSidebar
		}
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/global.config.scss';
	.layout {
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
