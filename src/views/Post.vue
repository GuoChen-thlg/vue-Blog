<template>
	<layout class_name="post">
		<main>
			<article class="post">
				<div class="post-block">
					<postheader :post="post" />
					<div class="post-body">
						<MarkdownPreview />
					</div>
					<div class="end">
						<p>
							-------------本文结束<i class="fa fa-paw"></i
							>感谢您的阅读-------------
						</p>
					</div>
					<div class="give-reward" v-if="site_QRlist.length > 0">
						<p>坚持原创技术分享，您的支持将鼓励我继续创作！</p>
						<button @click="isQR = !isQR"><span>打赏</span></button>
						<div class="QR" v-show="isQR">
							<template v-for="(item, index) in site_QRlist">
								<div class="item" :key="index">
									<div>
										<img :src="item['imgurl']" :alt="`${item['label']}`" />
									</div>
									<p v-text="item['label']" />
								</div>
							</template>
						</div>
					</div>
					<div class="copyright" v-if="copyright['license']">
						<div>
							<p><strong>本文作者：</strong>{{ copyright['author'] }}</p>
							<p>
								<strong>本文链接：</strong
								><a
									:href="copyright['posturl']"
									target="_blank"
									:title="post['title']"
									>{{ copyright['posturl'] }}</a
								>
							</p>
							<p>
								<strong>版权声明： </strong>本博客所有文章除特别声明外，均采用
								<a
									:href="copyright['license']['url']"
									v-text="copyright['license']['name']"
								/>
								许可协议。转载请注明出处！
							</p>
						</div>
					</div>
					<footer>
						<div class="post-tags" v-if="post['meta']">
							<template
								v-for="(item, index) in post['meta']['classify']['value']"
							>
								<router-link :key="index" :to="item['path']"
									><i class="fa fa-tag"></i>&ensp;{{ item['value'] }}
								</router-link>
							</template>
						</div>
						<div class="post-nav" v-if="post['brother']">
							<div class="item lastPost">
								<router-link
									v-if="post['brother']['lastPost']"
									:to="post['brother']['lastPost']['path']"
									><i class="fa fa-chevron-left"></i>&ensp;
									{{ post['brother']['lastPost']['title'] }}
								</router-link>
							</div>
							<div class="item nextPost">
								<router-link
									v-if="post['brother']['nextPost']"
									:to="post['brother']['nextPost']['path']"
								>
									{{ post['brother']['nextPost']['title'] }}&ensp;<i
										class="fa fa-chevron-right"
									></i>
								</router-link>
							</div>
						</div>
					</footer>
				</div>
			</article>
		</main>
	</layout>
</template>

<script>
	import { MarkdownPreview } from 'vue-meditor'
	import Layout from '@/components/layout.vue'
	import PostHeader from '@/components/post-header'
	import { mapGetters } from 'vuex'
	import { getPost } from '@/api'
	export default {
		name: 'Post',
		data() {
			return {
				post: {},
				isQR: false,
				copyright: {}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				getPost().then(res => {
					if (res.code === 200) {
						this.post = res.data.post
						this.copyright = res.copyright
					}
				})

			}
		},
		computed: {
			...mapGetters('site', [
				'site_pattern',
				'site_QRlist'
			]),
		},
		components: {
			'layout': Layout,
			'postheader': PostHeader,
			MarkdownPreview
		}
	}
</script>

<style lang='scss' scoped>
	@import '~@/assets/scss/global.config.scss';
	div.post {
		main {
			@include bacgstyle;
			article {
				// padding: 25px;
				margin: 60px 40px 40px;
				.post-block {
					.post-body {
						color: #555;
						padding: 20px;
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
					.end {
						text-align: center;
						color: #ccc;
						font-size: 13px;
					}
					.give-reward {
						text-align: center;
						margin: 20px auto;
						button {
							cursor: pointer;
							border: 0;
							outline: 0;
							border-radius: 5px;
							padding: 0;
							margin: 0;
							letter-spacing: normal;
							text-indent: 0;
							text-shadow: none;
							span {
								display: inline-block;
								width: 80px;
								height: 35px;
								line-height: 35px;
								border-radius: 5px;
								color: #fff;
								font-weight: 400;
								font-style: normal;
								font-variant: normal;
								font-stretch: normal;
								font-size: 18px;
								font-family: 'Microsoft Yahei';
								background: #f44336;
							}
						}
						.QR {
							.item {
								display: inline-block;
								img {
									width: 180px;
									max-width: 180px;
									margin: 0.8em 2em 0;
								}
							}
						}
					}
					.copyright {
						border-left: 3px solid red;
						font-size: 14px;
						background-color: #f9f9f9;
						div {
							margin-left: 15px;
							p {
								margin: 0;
								color: #999;
								a {
									color: #999;
									border-bottom: 1px solid #999;
									word-break: break-all;
									&:hover {
										color: #222;
										border-bottom-color: #222;
									}
								}
							}
						}
					}
					footer {
						.post-tags {
							text-align: center;
							margin-top: 40px;
							a {
								color: #999;
								border-bottom: 1px solid #999;
								margin-right: 10px;
								&:hover {
									color: #222;
									border-bottom-color: #222;
								}
							}
						}
						.post-nav {
							display: flex;
							justify-content: space-between;
							margin-top: 15px;
							border-top: 1px solid #eee;
							.item {
								padding-top: 10px;
								a {
									color: #555;
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
	}

	@media screen and (max-width: 1000px) {
		div.post {
			main {
				article {
					margin: 60px 0 40px;
					.post-block {
						.post-body {
							padding: 0;
						}
					}
				}
			}
		}
	}
</style>


