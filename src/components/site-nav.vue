<template>
	<div :class="['site-nav']">
		<nav :class="[{ toggle: toggleKey }]">
			<ul class="nav-list">
				<template v-for="(menu, index) in menulist">
					<router-link class="item" :to="menu['path']" :key="index" tag="li">
						<i :class="[menu['icon-class']]"></i>
						{{ menu['label'] }}
					</router-link>
				</template>
				<li v-if="isSearch" class="item">
					<div  v-on:click="search()">
						<i class="fa fa-search fa-fw"></i> 搜索
					</div>
					<search-window :show="popupShow" @popupClose="popupClose" />
				</li>
			</ul>
		</nav>
		<span class="btn" @click="toggleNav"
			><i class="fa fa-list-ul" aria-hidden="true"></i
		></span>
	</div>
</template>

<script>
	import { menu } from '@/api/index'
	import Search from '@/components/search.vue'
	export default {
		name: 'site-nav',
		props: {
			menulist: {
				type: Array,
				required: true,

			},
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				toggleKey: false,
				popupShow: false
			}
		},
		methods: {
			toggleNav() {
				this.toggleKey = !this.toggleKey
			},
			search() {
				this.popupShow = true
				document.body.style.overflow = 'hidden'
			},
			popupClose() {
				this.popupShow = false
				document.body.style.overflow = 'initial'
			}
		},
		
		components: {
			'search-window': Search
		}
	}

</script>

<style lang='scss' scoped>
	@import '~@/assets/scss/global.config.scss';
	.site-nav {
		.nav-list {
			padding: 20px 0;
			font-size: 13px;
			// background-color: rgba($color: #fff, $alpha: .7);
			.item {
				height: 30px;
				padding: 5px 20px;
				line-height: initial;
				cursor: pointer;
				background-color: transparent;
				&:hover {
					opacity: 1;
					background: #f9f9f9;
					border-bottom-color: #fff;
					color: #222;
				}
				i {
					display: inline-block;
				}
				&.router-link-exact-active {
					background: #f9f9f9;
					border-bottom-color: #fff;
					position: relative;
					opacity: 1;
					color: #222;
					&::after {
						position: absolute;
						top: 50%;
						margin-top: -3px;
						right: 15px;
						width: 6px;
						height: 6px;
						background-color: #bbb;
						border-radius: 50%;
						content: ' ';
					}
				}
			}
		}
		.btn {
			display: none;
		}
	}

	@media screen and (max-width: 1024px) {
	}
	@media screen and (max-width: 1000px) {
		.site-nav {
			// position: relative;
			z-index: 90;
			nav {
				position: relative;
				z-index: 9;
				height: 0;
				overflow: hidden;
				&.toggle {
					height: 100%;
					animation: top_to_botton 0.5s;
				}
				.nav-list {
					.item {
						height: 40px;
					}
				}
			}
			.btn {
				position: absolute;
				z-index: 999;
				top: 60px;
				left: 20px;
				display: block;
				color: #999;
				font-size: 20px;
			}
		}
	}
	@media screen and (min-width: 768px) {
	}
	@media screen and (max-width: 375px) {
	}
</style>
