<template>
	<div
		id="app"
		:style="{
			'background-image': site_back.isShow ? `url(${site_back.back_img})` : '',
			'--back_color': site_back.back_color,
		}"
	>
		<div class="main">
			<!-- <transition name="animat"> -->
			<router-view />
			<!-- </transition> -->
		</div>

		<footer>
			<div class="copyright">
				&copy;&ensp;
				{{
					new Date().getFullYear() > site_copyrightYear
						? `${site_copyrightYear} ~ ${new Date().getFullYear()} `
						: site_copyrightYear
				}}&ensp;{{ site_author_name }}&ensp;
				<span class="with-love"><i class="fa fa-heart"></i> </span>
				<span class="post-meta-divider">|</span>
				<span class="post-meta-item-icon"
					><i class="fa fa-area-chart"></i> </span
				>&ensp; 网站文字总数: &ensp;共&ensp; {{ numberofwords }} &ensp;字
			</div>
			<div class="date-distance">
				<span class="timeDate">网站已运行&ensp;{{ date['day'] }}&ensp;天</span
				><span class="times"
					>&ensp;{{ date['HH'] }}&ensp;小时&ensp;{{
						date['MM']
					}}&ensp;分&ensp;{{ date['ss'] }}&ensp;秒</span
				>
			</div>
			<div class="busuanzi-count">
				<span class="site-uv">
					<i class="fa fa-user"></i>&ensp;访问人数&ensp;
					<span class="busuanzi-value" id="busuanzi_value_site_uv"></span>
				</span>
				<span class="post-meta-divider">|</span>
				<span class="site-pv">
					<i class="fa fa-eye"></i>&ensp;总访问量&ensp;
					<span class="busuanzi-value" id="busuanzi_value_site_pv"></span
					>&ensp;次</span
				>
			</div>
		</footer>
		<div class="third-party-plug-in">
			<!-- <aplayer :music="music" /> -->
			<vueCanvasNest v-if="CanvasNest.isShow" :config="CanvasNest" />
		</div>
		<backtop />
	</div>
</template>
<script>
	import { mapGetters, mapMutations } from 'vuex'
	import BackTop from '@/components/backtop.vue'
	import { siteInit } from '@/api/index'
	import aplayer from 'vue-aplayer'
	import throttle from '@/util/throttle.js'
	import vueCanvasNest from 'vue-canvas-nest'
	export default {
		name: 'app',
		data() {
			return {
				numberofwords: '',
				date: {
					day: '00',
					HH: '00',
					MM: '00',
					ss: '00'
				},
				CanvasNest: {
					isShow: false,
					color: 'red',
					opacity: 0.7,
					zIndex: -1,
					count: 99,
				}
			}
		},
		created() {
			let pattern = this.$route.query.pattern
			if (pattern && pattern === "preview") {
				window.addEventListener('message', (e) => {
					if (e.data.type === 'previewPatternData') {
						const config = e.data.data
						// 背景粒子
						this.CanvasNest = { ...config.CanvasNest, color: /rgb\(.*\)/.test(config.CanvasNest.color) ? /(\s?\d{1,3}\s?\,?){3}/g.exec(config.CanvasNest.color)[0] : '0,0,255' }
						// 看板娘
						this.setL2DwidgetConfig({
							Config: config.L2Dwidget,
							callback: () => {
								this.renderLive2dw()
							}
						})
						//头部样式
						this.sethead(config.head)
						// 站点背景图
						this.setsiteBack(config.site)
						this.setSidebar(config.sidebar)
					}
				})
			}
		},
		mounted() {
			// const _this = this
			// 计时器
			setInterval(this.createtime, 250)
			this.resize()
			this.requestSite()
			this.monitorMouse()
			let pattern = this.$router.history.current.query.pattern || 'production'
			this.setpattern(pattern)
		},
		methods: {
			...mapMutations('window', [
				'setinnerHeight',
				'setinnerWidth',
				'setMouse'
			]),
			...mapMutations('site', [
				'setpattern',
				'setauthor',
				'setdescription',
				'setcopyrightYear',
				'setdetailDate',
				'setmenuList',
				'setnavlist',
				'setlinks',
				'setblogrolllist',
				'setQrlist',
				'setsiteBack',
				'sethead',
				'setL2DwidgetConfig',
				'setSidebar',

			]),
			/**
			 * 看板娘
			 */
			renderLive2dw() {
				if (this.siteL2DwidgetConfig.isRender) {
					setTimeout(() => {
						window.L2Dwidget.init({
							pluginRootPath: '/live2dw/', //插件根目录路径
							pluginJsPath: '/live2dw/lib/', //插件JS路径
							...this.siteL2DwidgetConfig
						})
					}, 1000)
				}
			},
			/**
			 * 站点配置数据获取
			 * 初始化
			 */
			requestSite() {
				siteInit().then(res => {
					if (res && res.code === 200) {
						this.setauthor(res.data.author)
						this.setdescription(res.data.description)
						this.setcopyrightYear(res.data.copyrightYear)
						this.setdetailDate(res.data.detailDate)
						this.setmenuList(res.data.menuList)
						this.setnavlist(res.data.navlist)
						this.setlinks(res.data.links)
						this.setblogrolllist(res.data.blogrolllist)//设置友情链接列表
						this.setQrlist(res.data.rewardQR)//打赏
						this.setbackImageUrl(res.data.backImageUrl)
						// this.sethead(res.data.headImageUrl)
						this.numberofwords = res.data.numberofwords//网站总字数
					}
				})
			},
			/**
			 * 站点底部计时器
			 */
			createtime() {
				let n = new Date(this.site_detailDate || this.site_copyrightYear);
				let now = new Date
				now.setTime(now.getTime() + 250)
				let days = (now - n) / 1e3 / 60 / 60 / 24
				let dnum = Math.floor(days)
				let hours = (now - n) / 1e3 / 60 / 60 - 24 * dnum
				let hnum = Math.floor(hours)
				1 == String(hnum).length && (hnum = "0" + hnum)
				let minutes = (now - n) / 1e3 / 60 - 1440 * dnum - 60 * hnum
				let mnum = Math.floor(minutes)
				1 == String(mnum).length && (mnum = "0" + mnum)
				let seconds = (now - n) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum
				let snum = Math.round(seconds)
				1 == String(snum).length && (snum = "0" + snum)
				this['date']['day'] = dnum
				this['date']['HH'] = hnum
				this['date']['MM'] = mnum
				this['date']['ss'] = snum
			},
			/**
			 * 窗口大小监测
			 */
			resize() {
				window.addEventListener('resize', () => {
					this.setinnerHeight(window.innerHeight)
					this.setinnerWidth(window.innerWidth)
				})
			},
			/**
			 * 鼠标位置
			 */
			monitorMouse() {
				throttle
				window.addEventListener('mousemove', throttle(500, (event) => {
					this.setMouse({ x: event.clientX, y: event.clientY })
				}), false)
			}
		},
		watch: {
			'getMouseX': function () {
				// console.log(this.getMouseX);
			}
		},
		computed: {
			...mapGetters('site', [
				'site_pattern',
				'site_author_name',
				'site_copyrightYear',
				'site_detailDate',
				'site_back',
				'siteL2DwidgetConfig',

			]),
			...mapGetters('window', [
				'getMouseX'
			])
		},
		components: {
			'backtop': BackTop,
			vueCanvasNest,
			aplayer
		},
	}



</script>
<style lang="scss">
	@import '~@/assets/scss/global.config.scss';
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	html {
		font-size: calc(100vw / 375);
		body {
			line-height: 2;
			color: #555;
		}
	}
	ol,
	ul,
	li {
		list-style: none;
	}
	p {
		margin: 0 0 20px;
	}
	a {
		text-decoration-line: none;
		color: #555;
		&:link {
			color: #555;
		}
		// &:visited {
		// 	color: #999;
		// }
		&:hover {
			color: #222;
			background-color: transparent;
		}
		// &:active {
		// 	color: #222;
		// }
	}
	@import '~@/assets/scss/patternStyle.scss';
</style>
<style lang="scss">
	@import '~@/assets/scss/global.config.scss';
	#app {
		position: relative;
		z-index: 0;
		background-color: var(--back_color);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: 50% 50%;
		background-size: 100% 100%;
		min-height: 450px;
		.main {
			position: relative;
			z-index: 2;
			min-height: calc(100vh - 124px);
			// .animat-enter {
			// 	// background-color: red;
			// }
			// .animat-enter-active {
			// 	// animation: lightSpeedOutRight 0.5;
			// }
			// .animat-enter-to {
			// 	// background-color: red;
			// }
			// .animat-leave {
			// 	// background-color: red;
			// }
			// .animat-leave-active {
			// 	// animation-name: animate__zoomOutDown;
			// }
			// .animat-leave-to {
			// 	// background-color: red;
			// }
		}
		& > footer {
			position: relative;
			z-index: 500;
			text-align: center;
			color: #999;
			font-size: 14px;
			padding: 20px;
			// background-color: #eeeeee;
			.copyright {
				.with-love {
					color: red;
					display: inline-block;
					margin: 0 5px;
					animation: iconAnimate 1.33s ease-in-out infinite;
				}
			}
			.post-meta-divider {
				margin: 0 0.5em;
			}
		}
	}
	@keyframes iconAnimate {
		0%,
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1);
		}
		10%,
		30% {
			-webkit-transform: scale(0.9);
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			-o-transform: scale(0.9);
			transform: scale(0.9);
		}
		20%,
		40%,
		50%,
		60%,
		70%,
		80% {
			-webkit-transform: scale(1.1);
			-moz-transform: scale(1.1);
			-ms-transform: scale(1.1);
			-o-transform: scale(1.1);
			transform: scale(1.1);
		}
	}
</style>