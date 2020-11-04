<template>
	<layout class_name="categories">
		<main v-show="flag">
			<header>
				<h1>分类</h1>
			</header>
			<div class="post-body">
				<div class="category-all-page">
					<div class="category-all-title">目前共计 {{ sum }} 个分类</div>
					<div class="category-all">
						<ul class="category-list">
							<template v-for="(item, index) in categoryList">
								<router-link
									class="category-list-item"
									:key="index"
									:to="item['path']"
									tag="li"
								>
									<span
										class="category-list-text"
										v-text="item['label']"
									/><span class="category-list-count" v-text="item['count']" />
									<ul class="category-list-child" v-if="item['child']">
										<template v-for="(item, index) in item['child']">
											<router-link
												class="category-list-item"
												:key="index"
												:to="item['path']"
												tag="li"
											>
												<span
													class="category-list-text"
													v-text="item['label']"
												/><span
													class="category-list-count"
													v-text="item['count']"
												/>
											</router-link>
										</template>
									</ul>
								</router-link>
							</template>
						</ul>
					</div>
				</div>
			</div>
		</main>
		<main v-if="!flag">
			<timeline :title="$route.params.class" assistant="分类" :datalist="list"> </timeline>
		</main>
	</layout>
</template>

<script>
	// @ is an alias to /src
	import Layout from '@/components/layout.vue'
	import Posts from '@/components/posts.vue'
	import Timeline from '@/components/timeline.vue'
	import { getCategoryList, getCategory } from '@/api/index'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Categories',
		data() {
			return {
				flag: true,
				sum: 0,
				categoryList: [
					{
						path: '/categories/js',
						label: 'js',
						count: 8,
						child: [
							{
								path: '/categories/js',
								label: 'js',
								count: 8,
							}
						]
					},
				],
				list: [
					{
						title: '测试文章2',
						path: '/post/test',
						lastDate: '2020-09-22'
					},
				]


			}
		},
		mounted() {
			this.analysisRoute(this.$route)
			this.init()
		},
		methods: {
			init() {
				getCategoryList().then(res => {
					if (res && res.code == 200) {
						this.sum = res.data.total
						this.categoryList = res.data.categoryList
					}
				})
			},
			requestCategories(label) {
				getCategory(
					{ category: label }
				).then(res => {
					if (res.code === 200) {
						this.list = res.data.posts
					}
				})
			},
			analysisRoute(route) {
				let label = route.params.class
				if (label) {
					this.flag = false
					this.requestCategories(label)
				} else {
					this.flag = true
				}
			}

		},
		watch: {
			$route(to, from) {
				this.analysisRoute(to)
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
			// 'sitehead': SiteHead,
			// 'sitenav': SiteNav,
			// 'sitesidebar': SiteSidebar,
			'layout': Layout,
			'timeline': Timeline
		}
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/global.config.scss';
	.categories {
		main {
			@include bacgstyle;
			h1 {
				text-align: center;
				word-break: break-word;
				font-weight: 400;
			}
			.category-all-page {
				.category-all-title {
					text-align: center;
				}
				.category-all {
					font-size: 14px;
					.category-list {
						padding-left: 10px;
						.category-list-item {
							list-style: circle;
							&:hover {
								color: #222;
							}
							.category-list-text {
								border-bottom: 1px solid #555;
								cursor: pointer;
								padding: 2px 5px;
							}
							.category-list-count {
								cursor: pointer;
								&::before {
									content: '(';
								}
								&::after {
									content: ')';
								}
							}
							.category-list-child {
								padding-left: 15px;
							}
						}
					}
				}
			}
		}
	}
</style>
