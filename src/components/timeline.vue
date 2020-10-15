<template>
	<section class="timelink">
		<div class="posts-collapse">
			<slot></slot>
			<div class="collection-title">
				<h1 class="archive-move">
					{{ title }}<small>{{ assistant }}</small>
				</h1>
			</div>
			<template v-for="(item, index) in datalist">
				<article :key="index">
					<router-link :to="item['path']" tag="header"
						><time>{{ new Date(item['lastDate']).toLocaleDateString() }}</time
						>{{ item['title'] }}</router-link
					>
				</article>
			</template>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'timelink',
		props: {
			title: {
				type: String,
				default: 'Redux'
			},
			assistant: {
				type: String,
			},
			datalist: {
				type: Array,
			}
		}
	}
</script>

<style lang='scss' >
	.timelink {
		.posts-collapse {
			position: relative;
			&::before {
				content: '';
				position: absolute;
				width: 4px;
				height: 100%;
				background: #f5f5f5;
				left: 2px;
				top: 20px;
			}
			.archive-move {
				position: relative;
				&::before {
					content: '';
					display: block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: #bbb;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			.collection-title {
				h1 {
					// position: relative;
					// padding: 0 25px;
					text-indent: 1em;
					small {
						color: #bbb;
						margin-left: 5px;
					}
					// &::before {
					// 	content: '';
					// 	display: block;
					// 	width: 8px;
					// 	height: 8px;
					// 	border-radius: 50%;
					// 	background-color: #bbb;
					// 	position: absolute;
					// 	top: 50%;
					// 	transform: translateY(-50%);
					// }
				}
			}
			article {
				margin: 30px 6px;
				padding: 25px;
				background-color: rgba(255, 255, 255, -0.2);
				box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
				header {
					cursor: pointer;
					position: relative;
					border-bottom: 1px dashed #ccc;
					margin-left: 15px;
					&::before {
						content: '';
						display: block;
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background-color: #bbb;
						position: absolute;
						left: -15px;
						top: 50%;
						transform: translateY(-50%);
					}
					&:hover {
						border-bottom-color: #666;
						&::before {
							background-color: #222;
						}
					}
					time {
						margin-right: 10px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>