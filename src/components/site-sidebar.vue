<template>
	<div
		:class="['site-sidebar', { 'site-sidebar-fixed': isFixed }]"
		ref="site-sidebar"
		id="site-sidebar"
	>
		<ul class="nav" v-if="allShow">
			<li :class="['item', { active: tabInex == 'tab1' }]">
				<label for="tab1">
					文章目录
					<input
						type="radio"
						name="tab"
						id="tab1"
						value="tab1"
						v-model="tabInex"
					/>
				</label>
			</li>
			<li :class="['item', { active: tabInex == 'tab2' }]">
				<label for="tab2">
					站点概览
					<input
						type="radio"
						name="tab"
						id="tab2"
						value="tab2"
						v-model="tabInex"
					/>
				</label>
			</li>
		</ul>
		<section v-show="allShow ? tabInex == 'tab1' : false">
			<div
				:style="{
					'max-height':
						getinnerHeight > 0 ? getinnerHeight - offset + 'px' : 'auto',
				}"
			>
				文章目录
			</div>
		</section>
		<section v-show="allShow ? tabInex == 'tab2' : true">
			<div
				class="site-overview"
				:style="{
					'max-height':
						getinnerHeight > 0 ? getinnerHeight - offset + 'px' : 'auto',
				}"
			>
				<div class="site-author">
					<img class="author-image" :src="image" alt="" />
					<p class="author-name" v-text="name" />
					<p class="description" v-text="description" />
				</div>
				<nav
					class="site-state site-state-posts"
					v-if="navlist && navlist['length'] > 0"
				>
					<template v-for="(item, index) in navlist">
						<router-link
							:to="item['path']"
							:key="index"
							:class="['site-state-item', item['class']]"
							tag="div"
						>
							<span
								v-text="item['amount']"
								class="site-state-item-count"
							></span>
							<span v-text="item['label']" class="site-state-item-name"></span>
						</router-link>
					</template>
				</nav>
				<div class="links-of-author" v-if="links && links['length'] > 0">
					<template v-for="(item, index) in links">
						<router-link
							class="links-of-author-item"
							:to="item['path']"
							:key="index"
							:title="item['label']"
							target="_blank"
						>
							<span>
								<i :class="item['icon-class']"></i> {{ item['label'] }}
							</span>
						</router-link>
					</template>
				</div>
				<div
					class="links-of-blogroll"
					v-if="blogrolllist && blogrolllist['length'] > 0"
				>
					<div class="links-of-blogroll-title">
						<i class="fa fa-fw fa-link"></i> 友情链接
					</div>
					<ul class="links-of-blogroll-list">
						<template v-for="(item, index) in blogrolllist">
							<li :key="index" class="links-of-blogroll-item">
								<router-link
									:to="item['path']"
									:title="item['label']"
									target="_blank"
								>
									<span v-text="item['label']"></span>
								</router-link>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</section>
	</div>
</template>


<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'site-sidebar',
		props: {
			allShow: {
				type: Boolean,
				default: true
			},
			navlist: {
				type: Array,
			},
			links: {
				type: Array,
			},
			blogrolllist: {
				type: Array,
			}
		},
		data() {
			return {
				tabInex: 'tab1',
				offset: 122,
				isFixed: false,
				stitic_offsetTop: null
			}
		},
		mounted() {
			this.stitic_offsetTop = this.$refs['site-sidebar']['offsetTop']
			window.addEventListener('scroll', () => {
				this.isFixed = this.stitic_offsetTop + 166 <= document.documentElement.scrollTop
			})
		},
		computed: {
			...mapGetters('site', {
				name: 'site_author_name',
				image: 'site_author_image',
				description: 'site_description',
				site_Sidebar: 'site_Sidebar',
			}),
			...mapGetters('window', [
				'getinnerHeight'
			])
		}
	}
</script>

<style lang='scss' scoped>
	@import '~@/assets/scss/global.config.scss';
	.site-sidebar {
		width: 240px;
		padding: 20px 10px;
		@include bacgstyle;
		.nav {
			display: flex;
			justify-content: center;
			margin: 0 0 20px;
			.item {
				label {
					padding: 5px;
					cursor: pointer;
				}
				input[type='radio'] {
					display: none;
				}
			}
			.item.active {
				color: salmon;
				border-bottom: 2px solid salmon;
			}
		}
		section {
			.site-overview {
				overflow-y: auto;
				overflow-x: hidden;
				.site-author {
					text-align: center;
					.author-image {
						display: block;
						margin: 0 auto;
						padding: 2px;
						max-width: 120px;
						height: auto;
						border-radius: 80px;
						border: 1px solid #eee;
						transition: transform 1s ease-out;
						&:hover {
							transform: rotateZ(360deg);
						}
					}
					.author-name {
						color: #222;
						font-size: 14px;
						font-weight: 600;
						margin: 0;
					}
					.description {
						color: #999;
						font-size: 13px;
						margin-bottom: 20px;
					}
				}
				.site-state {
					display: flex;
					justify-content: center;
					.site-state-item {
						border-right: 1px solid #eee;
						line-height: 1;
						text-align: center;
						padding: 3px 5px;
						color: #555;
						cursor: pointer;
						span {
							display: block;
						}
						.site-state-item-count {
							color: inherit;
							font-weight: 600;
							font-size: 16px;
						}
						.site-state-item-name {
							font-size: 13px;
							color: #999;
						}
					}
					.site-state-item:last-child {
						border-right: none;
					}
				}
				.links-of-author {
					display: flex;
					flex-wrap: wrap;
					margin-top: 20px;
					.links-of-author-item {
						display: block;
						width: 50%;
						padding: 0px 5px;
						color: #555;
						&:hover {
							background-color: #eee;
							border-radius: 4px;
						}
					}
				}
				.links-of-blogroll {
					text-align: center;
					margin-top: 20px;
					border-top: 1px dotted #ccc;
					padding: 3px 0 0;
					.links-of-blogroll-title {
						font-size: 14px;
						font-weight: 600;
					}
					.links-of-blogroll-list {
						text-align: center;
						.links-of-blogroll-item {
							a {
								cursor: pointer;
								color: #555;
								span {
									font-size: 13px;
									border-bottom: 1px solid #555;
								}
								&:hover {
									color: #222;
								}
							}
						}
					}
				}
			}
		}
	}
	.site-sidebar-fixed {
		position: fixed;
		top: 12px;
	}
</style>