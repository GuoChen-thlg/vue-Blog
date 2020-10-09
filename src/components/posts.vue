<template>
	<section class="posts">
		<template v-for="(post, index) in postlist">
			<article :key="index">
				<div class="post-block">
					<postheader :titleLink="true" :post="post" />
					<div class="post-body" v-html="post['digest']"></div>
					<div class="post-button">
						<router-link
							class="btn"
							:to="post['path']"
							v-text="'阅读全文 »'"
						></router-link>
					</div>
					<!-- <footer>

					</footer> -->
				</div>
			</article>
		</template>
		<pagination
			:presentPage="presentPage"
			:overallPage="overallPage"
			:threshold="threshold"
			@upDataPaging="pagingFun"
		/>
	</section>
</template>

<script>
	import PostHeader from '@/components/post-header'
	import Pagination from '@/components/pagination'
	export default {
		name: 'posts',
		props: {
			postlist: {
				type: Array,
				default: [
					{
						title: '扁平数组与树状结构的转换',
						meta: {
							firstDate: {
								'icon-class': 'fa fa-calendar-o',
								label: '发表于',
								value: '2020-09-22'
							},

							lastDate: {
								'icon-class': '',
								label: '',
								value: '2020-09-22'
							},
							classify: {
								'icon-class': 'fa fa-folder-o',
								label: '分类于',
								value: [{
									path: '/sad/ads',
									value: 'JS'
								},
								{
									path: '/sad/ads',
									value: 'JS'
								}
								]
							},
							label: {
								'icon-class': '',
								label: '标签',
								value: [{
									path: '/js',
									value: 'JS'
								},
								{
									path: '/javascript',
									value: 'javascript'
								}
								]
							},
							'word-count': {
								'icon-class': 'fa fa-file-word-o',
								label: '字数统计:',
								value: '400'
							},
							duration: {
								'icon-class': 'fa fa-clock-o',
								label: '阅读时长 ≈',
								value: '2'
							},
							heat: {
								'icon-class': 'fa fa-thermometer',
								label: '热度',
								value: '400'
							},
							comment: {
								'icon-class': 'fa fa-comment-o',
								label: '评论',
								value: '400',
								path: ''
							},

						},
						path: '/asd/asdsa',
						digest: '<p>我们在使用后台传过来的数据的时候，有时候我们会得到树状结构的数据，虽然有时候，后端会处理掉，但，毕竟我们也可以在前端给它处理一下，一方面也锻炼一下脑子，天天写页面都没思考能力了。</p>'
					}]
			},
			presentPage: {// 当前页码
				type: Number,
				default: 1,
			},
			overallPage: {// 总页数
				type: Number,
				default: 1,
			},
			threshold: {//阈值
				type: Number,
				default: 7,
			},
		},
		methods: {
			pagingFun(num) {
				this.$emit('upDataPaging', num)
			}
		},
		components: {
			'postheader': PostHeader,
			'pagination': Pagination
		}
	}
</script>

<style lang='scss' scoped>
	@import '~@/assets/scss/global.config.scss';
	.posts {
		article {
			margin-top: 60px;
			margin-bottom: 60px;
			padding: 25px;
			@include bacgstyle;
			.post-block {
				.post-body {
					color: #555;
				}
				.post-button {
					margin-top: 40px;
					text-align: center;
					.btn {
						display: inline-block;
						padding: 0 20px;
						color: #555;
						background: #fff;
						border: 2px solid #555;
						border-radius: 2px;
						transition-duration: 0.2s;
						transition-delay: 0s;
						line-height: 2;
						&:hover {
							border-color: #222;
							color: #fff;
							background: #222;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 1000px) {
		.posts {
			article {
				margin-top: 0;
			}
		}
	}
</style>