<template>
	<div
		class="site-head"
		:style="{
			'background-image': site_head.isShow?`url(${site_head.back_img})`:'',
			'--back_color': site_head.back_color,
			'--active_back_color': site_head.active_back_color,
			'--color': site_head.color,
			'--active_color': site_head.active_color,
		}"
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
				'site_head'
			])
		}
	}
</script>

<style lang='scss' scoped>
	@import '~@/assets/scss/global.config.scss';
	.site-head {
		padding: 20px 0;
		text-align: center;
		background-size: 100%;
		color: var(--color);
		@include clear;
		background-color: var(--back_color);
		h3 {
			cursor: pointer;
			display: inline-block;
			background-color: rgba($color: #000000, $alpha: 0.2);
			padding: 5px;
			&:hover {
				color: var(--active_color);
				background-color: var(--active_back_color);
			}
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
			color: var(--color);
		}
	}
	@media screen and (max-width: 765px) {
	}
	@media screen and (max-width: 375px) {
	}
</style>