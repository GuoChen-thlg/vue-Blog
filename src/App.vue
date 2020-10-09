<template>
	<div id="app" :style="{ 'background-image': `url(${site_back_image_url})` }">
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
			<vueCanvasNest
				:config="{
					color: '0,0,0',
					opacity: 0.7,
					zIndex: -1,
					count: 99,
				}"
			/>
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
			}
		},
		created() {
			let pattern = this.$route.query.pattern
			if (pattern && pattern === "preview") {
				window.addEventListener('message', (e) => {
					if (e.data.type === 'previewPatternData') {
						const config = e.data.data
						this.setL2DwidgetConfig(config.L2Dwidget)
						// console.log(config.L2Dwidget);
					}
				})

			}
			setTimeout(() => {
				window.L2Dwidget.init({
					pluginRootPath: '/live2dw/', //插件根目录路径
					pluginJsPath: '/live2dw/lib/', //插件JS路径
					...this.siteL2DwidgetConfig
				})
			console.dir(window.L2Dwidget);
			}, 10000)
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
				'setbackImageUrl',
				'setheadImageUrl',
				'setL2DwidgetConfig',

			]),
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
						this.setheadImageUrl(res.data.headImageUrl)
						this.numberofwords = res.data.numberofwords//网站总字数
					}
				})
			},
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
			resize() {
				window.addEventListener('resize', () => {
					this.setinnerHeight(window.innerHeight)
					this.setinnerWidth(window.innerWidth)
				})
			},
			monitorMouse() {
				throttle
				window.addEventListener('mousemove', throttle(500, (event) => {
					this.setMouse({ x: event.clientX, y: event.clientY })
				}), false)
			}
		},
		watch: {
			'getMouseX': function () {
				// console.log(this);
			}
		},
		computed: {
			...mapGetters('site', [
				'site_pattern',
				'site_author_name',
				'site_copyrightYear',
				'site_detailDate',
				'site_back_image_url',
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
		background-color: #eeeeee;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: 50% 50%;
		background-size: 100% 100%;
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