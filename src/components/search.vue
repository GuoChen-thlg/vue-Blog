<template>
	<section v-if="show" class="search-back">
		<div class="search-window">
			<header>
				<span class="search-icon"><i class="fa fa-search"></i> </span>
				<div class="search-input-wrapper">
					<input type="text" v-model="search_word" placeholder="搜索..." />
				</div>
				<span class="popup-btn-close" @click="popupClose">
					<i class="fa fa-times-circle"></i>
				</span>
			</header>
			<div class="search-result" id="search-result">
				<ul>
					<template v-for="(item, index) in data">
						<router-link :key="index" :to="item.path" tag="li">
							<h4>{{ item.title }}</h4>
						</router-link>
					</template>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
	import { search } from '@/api'
	export default {
		name: 'search',
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				search_word: '',
				data: []
			}
		},
		created(){
			this.search_word=''
			this.data=[]
		},
		watch: {
			'search_word': function () {
				this.search_word ? search({ search_word: this.search_word }).then(res => {
					this.data = res.code == 200 ? res.data : []
				}) : null
			},

			$route(){
				this.popupClose()
			}
		},
		methods: {
			popupClose() {
				this.$emit('popupClose')
			}
		},

	}
</script>

<style lang='scss'>
	.search-back {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
		background-color: rgba($color: #000000, $alpha: 0.4);
		.search-window {
			position: relative;
			z-index: 9999;
			width: 60%;
			height: 80%;
			background-color: white;
			margin: 80px auto 0;
			border-radius: 5px;
			header {
				display: flex;
				padding: 5px;
				height: 36px;
				background: #f5f5f5;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;

				.search-icon,
				.popup-btn-close {
					display: block;
					width: 36px;
					height: 26px;
					padding: 0 9px;
					font-size: 18px;
				}
				.search-input-wrapper {
					flex-grow: 1;
					input {
						width: 100%;
						padding: 5px;
						outline: none;
						border: none;
					}
				}
			}
			.search-result {
				overflow: auto;
				position: relative;
				padding: 5px 25px;
				height: calc(100% - 55px);
				background-color: #fff;
			}
		}
	}
	@media screen and (max-width: 1000px) {
		.search-back {
			.search-window {
				margin: 150px auto 0;
				width: 90%;
				height: 65%;
			}
		}
	}
</style>