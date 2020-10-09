<template>
	<layout class_name="tags">
		<main v-show="flag">
			<h1>标签</h1>
			<div class="post-body">
				<div class="tag-cloud">
					<div class="tag-cloud-title">目前共计 1 个标签</div>
					<div class="tag-cloud-tags">
						<template v-for="(item, index) in tags">
							<router-link
								class="item"
								:key="index"
								:to="item['path']"
								v-text="item['label']"
								:style="item['style']"
							/>
						</template>
					</div>
				</div>
			</div>
		</main>
		<main v-if="!flag">
			<timeline title="React" assistant="标签" :datalist="list"> </timeline>
		</main>
	</layout>
</template>

<script>
	// @ is an alias to /src
	import Layout from '@/components/layout.vue'
	import Timeline from '@/components/timeline.vue'
	import { getTags } from '@/api/index'
	import { mapGetters } from 'vuex'
	import axios from 'axios'
	export default {
		name: 'Tags',
		data() {
			return {
				tags: [],
				flag: true,
				list: []
			}
		},
		mounted() {
			this.analysisRoute(this.$route)
			this.init()
		},
		methods: {
			init() {
				getTags().then(res => {
					if (res.code === 200) {
						this.tags = res.data.tags
					}
				})
			},
			requestTag(tag) {
				console.log(tag);
			},
			analysisRoute(route) {
				let label = route.params.label
				if (label) {
					this.flag = false
					this.requestTag(label)
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
			'layout': Layout,
			'timeline': Timeline,
		}
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/global.config.scss';
	.tags {
		main {
			@include bacgstyle;
			h1 {
				text-align: center;
				word-break: break-word;
				font-weight: 400;
			}
			.tag-cloud {
				.tag-cloud-title {
					text-align: center;
					color: #555;
				}
				.tag-cloud-tags {
					text-align: center;
					.item {
						margin: 10px;
						border-bottom: 1px solid #222;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>
