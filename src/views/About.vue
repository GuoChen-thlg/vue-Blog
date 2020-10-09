<template>
	<layout class_name="about">
		<main>
			<!-- <timeline> </timeline> -->
		</main>
	</layout>
</template>

<script>
	// @ is an alias to /src
	import Layout from '@/components/layout.vue'
	import Timeline from '@/components/timeline.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'about',
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

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
			'layout': Layout,
			'timeline': Timeline
		}
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/global.config.scss';
	.about {
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
