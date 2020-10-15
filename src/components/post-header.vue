<template>
	<header class="post-header">
		<router-link
			v-if="titleLink"
			:to="post['path']"
			v-text="post['title']"
			tag="h1"
			class="post-title"
		/>
		<h1 v-else class="post-title the-link" v-text="post['title']" />
		<div class="post-meta" v-if="post['meta']">
			<span class="post-time" v-if="post['meta']['firstDate']">
				<span class="post-meta-item-icon"
					><i :class="post['meta']['firstDate']['icon-class']"></i
				></span>
				<span
					class="post-meta-item-text"
					v-text="post['meta']['firstDate']['label']"
				></span>
				<time
					:title="post['meta']['firstDate']['label']"
					v-text="post['meta']['firstDate']['value']"
				></time>
			</span>
			<span class="post-category" v-if="post['meta']['classify']">
				<span class="post-meta-divider">|</span>
				<span class="post-meta-item-icon"
					><i :class="post['meta']['classify']['icon-class']"></i
				></span>
				<span
					class="post-meta-item-text"
					v-text="post['meta']['classify']['label']"
				></span>
				<span>
					<template v-for="(item, index) in post['meta']['classify']['value']">
						<router-link
							:key="index"
							:to="item['path']"
							v-text="item['value']"
						></router-link
						>{{ index === 0 ? '' : '，' }}
					</template>
				</span>
			</span>
			<span class="post-comments-count" v-if="post['meta']['comment']">
				<span class="post-meta-divider">|</span>
				<span class="post-meta-item-icon">
					<i :class="post['meta']['comment']['icon-class']"></i>
				</span>
				&ensp;
				<router-link
					:to="post['meta']['comment']['path']"
					v-text="post['meta']['comment']['value']"
				></router-link>
			</span>
			<span class="post-heat-count" v-if="post['meta']['heat']">
				<span class="post-meta-divider">|</span>
				<span class="post-meta-item-icon">
					<i :class="post['meta']['heat']['icon-class']"></i>
				</span>
				&ensp;
				<span
					class="post-meta-item-text"
					v-text="post['meta']['heat']['label']"
				></span>
				&ensp;
				<span
					class="post-meta-item-text"
					v-text="post['meta']['heat']['value']"
				></span>
				&#8451;
			</span>
			<div class="post-wordcount">
				<span class="post-meta-item-icon"
					><i :class="post['meta']['word-count']['icon-class']"></i
				></span>
				<span
					class="post-meta-item-text"
					v-text="post['meta']['word-count']['label']"
				></span>
				<span v-text="post['meta']['word-count']['value']"></span>
				<span class="post-meta-divider">|</span>
				<span class="post-meta-item-icon"
					><i :class="post['meta']['duration']['icon-class']"></i
				></span>
				<span
					class="post-meta-item-text"
					v-text="post['meta']['duration']['label']"
				></span>
				<span v-text="post['meta']['duration']['value']"></span>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'postheader',
		props: {
			post: {
				type: Object,
			},
			titleLink: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang='scss'>
	header.post-header {
		position: relative;
		text-align: center;
		font-size: 16px;
		z-index: 8;
		.post-title {
			position: relative;
			cursor: pointer;
			display: inline-block;
			color: #555;
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 2px;
				bottom: 0;
				left: 0;
				background-color: #000;
				visibility: visible;
				transform: scaleX(0);
				transition-duration: 0.2s;
				transition-delay: 0s;
			}
			&:hover::after {
				transform: scaleX(1);
			}
			&.the-link {
				cursor: initial;
				&::after {
					display: none;
				}
			}
		}
		.post-meta {
			margin: 3px 0 60px;
			font-size: 12px;
			color: #999;
			span {
				margin: 0 0.1em;
			}
			a {
				border-bottom: 1px solid #999;
				color: #555;
			}
			.post-meta-item-icon {
				margin-right: 3px;
			}
			.post-meta-divider {
				margin: 0 0.5em;
			}
		}
	}
</style>