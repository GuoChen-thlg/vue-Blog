<template>
	<div
		class="site-head"
		:style="{ 'background-image': `url(${site_head_image_url})` }"
	>
		<router-link to="/" tag="h3">{{ site_author_name }}</router-link>
		<p>{{ site_author_subtitle }}</p>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'site-head',
		computed: {
			...mapGetters('site', [
				'site_author_name',
				'site_author_subtitle',
				'site_head_image_url'
			])
		}
	}
</script>

<style lang='scss' scoped>
	@import '~@/assets/scss/global.config.scss';
	.site-head {
		padding: 20px 0;
		text-align: center;
		background-color: #fafafa;
		background-size: 100%;
		@include clear;
		h3 {
			cursor: pointer;
			display: inline-block;
			background-color: rgba($color: #000000, $alpha: 0.2);
			padding: 5px;
		}
		p {
			margin: 5px 8px 0;
		}
	}
	@media screen and (max-width: 1024px) {
	}
	@media screen and (max-width: 1000px) {
		.site-head {
			position: relative;
			z-index: 20;
			width: 100%;
			background-image: initial;
			background-color: rgba($color: #fff, $alpha: 1);
			color: #555;
		}
	}
	@media screen and (max-width: 765px) {
	}
	@media screen and (max-width: 375px) {
	}
</style>