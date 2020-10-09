<template>
	<transition name="fade-in">
		<div
			v-if="visible"
			@click.stop="handleClick"
			:style="{
				right: styleRight,
				bottom: styleBottom,
			}"
			class="backtop"
		>
			<i class="fa fa-arrow-up"></i>{{ percent }}%
		</div>
	</transition>
</template>

<script>
import throttle from '@/util/throttle.js'
	const cubic = value => Math.pow(value, 3);
	const easeInOutCubic = value => value < 0.5
		? cubic(value * 2) / 2
		: 1 - cubic((1 - value) * 2) / 2;
	export default {
		name: 'backtop',
		props: {
			visibilityHeight: {
				type: Number,
				default: 100
			},
			right: {
				type: Number,
				default: 40
			},
			bottom: {
				type: Number,
				default: 40
			}
		},
		data() {
			return {
				el: null,
				container: null,
				visible: false,
				percent: 0
			};
		},
		computed: {
			styleBottom() {
				return `${this.bottom}px`;
			},
			styleRight() {
				return `${this.right}px`;
			}
		},
		mounted() {
			this.init();
			//防抖
			// this.throttledScrollHandler = throttle(0, this.onScroll);
			// this.container.addEventListener('scroll', this.throttledScrollHandler);
			this.container.addEventListener('scroll', this.onScroll);
		},
		methods: {
			init() {
				this.container = document;
				this.el = document.documentElement;
			},
			onScroll() {
				let scrollTop = this.el.scrollTop
				let scrollHeight = this.el.scrollHeight
				let clientHeight = this.el.clientHeight
				let percent = scrollTop / (scrollHeight - clientHeight) * 100 | 0
				this.percent = percent > 100 ? 100 : percent
				this.visible = this.percent >= 2;
			},
			handleClick(e) {
				this.scrollToTop();
				this.$emit('click', e);
			},
			scrollToTop() {
				const el = this.el;
				const beginTime = Date.now();
				const beginValue = el.scrollTop;
				const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
				const frameFunc = () => {
					const progress = (Date.now() - beginTime) / 500;
					if (progress < 1) {
						el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
						rAF(frameFunc);
					} else {
						el.scrollTop = 0;
					}
				};
				rAF(frameFunc);
			},
		},
		beforeDestroy() {
			this.container.removeEventListener('scroll', this.throttledScrollHandler);
		}
	};
</script>
<style lang="scss">
	.backtop {
		position: fixed;
		cursor: pointer;
		font-size: 12px;
		text-align: center;
		padding: 0 6px;
		color: #fff;
		background-color: #222;
		z-index: 999999;
		opacity: 0.6;
		transition-property: bottom;
		transition-duration: 0.2s;
		transition-delay: 0s;
	}
</style>