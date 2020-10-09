<template>
	<section v-if="overallPage > 1">
		<nav
			class="pagination"
			v-if="overallPage > 1 && overallPage < threshold + 1"
		>
			<span
				v-if="presentPage != 1"
				:class="['btn']"
				@click="pagingFun(presentPage - 1)"
				><i class="fa fa-angle-left"></i
			></span>
			<template
				v-for="i in [
					...Array.from({ length: overallPage + 1 }, (v, k) => k),
				].slice(1)"
			>
				<span
					:class="['btn', { current: i == presentPage }]"
					:key="i"
					v-text="i"
					@click="pagingFun(i)"
				/>
			</template>
			<span
				v-if="presentPage != overallPage"
				:class="['btn']"
				@click="pagingFun(presentPage + 1)"
				><i class="fa fa-angle-right"></i
			></span>
		</nav>
		<nav v-else class="pagination">
			<span
				v-if="presentPage != 1"
				:class="['btn']"
				@click="pagingFun(presentPage - 1)"
				><i class="fa fa-angle-left"></i
			></span>
			<template v-if="presentPage > threshold">
				<template
					v-for="i in [
						...Array.from({ length: threshold - 3 }, (v, k) => k),
					].slice(1)"
				>
					<span
						:class="['btn', { current: i == presentPage }]"
						:key="i"
						v-text="i"
						@click="pagingFun(i)"
					/>
				</template>
				<span :class="['btn', 'ellipsis']" v-text="'...'" />
				<span
					:class="['btn', { current: presentPage - 1 == presentPage }]"
					v-text="presentPage - 1"
					@click="pagingFun(presentPage - 1)"
				/>
				<span
					:class="['btn', 'current']"
					v-text="presentPage"
					@click="pagingFun(presentPage)"
				/>
				<span
					v-if="presentPage < overallPage"
					:class="['btn', { current: presentPage + 1 == presentPage }]"
					v-text="presentPage + 1"
					@click="pagingFun(presentPage + 1)"
				/>
				<span
					v-if="presentPage + 1 < overallPage"
					:class="['btn', 'ellipsis']"
					v-text="'...'"
				/>
			</template>
			<template v-else>
				<template
					v-for="i in [
						...Array.from({ length: threshold + 1 }, (v, k) => k),
					].slice(1)"
				>
					<span
						:class="['btn', { current: i == presentPage }]"
						:key="i"
						v-text="i"
						@click="pagingFun(i)"
					/>
				</template>
				<span
					v-if="threshold < overallPage"
					:class="['btn', 'ellipsis']"
					v-text="'...'"
				/>
			</template>
			<span
				v-if="presentPage < overallPage"
				:class="['btn']"
				@click="pagingFun(presentPage + 1)"
				><i class="fa fa-angle-right"></i
			></span>
		</nav>
	</section>
</template>

<script>
	export default {
		name: 'pagination',
		props: {
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
				if (num != this.presentPage) {
					this.$emit('upDataPaging', num)
				}
			}
		},
	}
</script>

<style  lang='scss' >
	@import '~@/assets/scss/global.config.scss';
	.pagination {
		@include bacgstyle;
		margin: 12px 0 0;
		border-top: initial;
		padding: 10px 0;
		border-radius: initial;
		text-align: center;
		.btn {
			display: inline-block;
			padding: 0 11px;
			margin: 0 10px;
			cursor: pointer;
			&:hover {
				background: #cccccc6b;
			}
		}
		.ellipsis {
			cursor: initial;
			&:hover {
				background: rgba($color: #fff, $alpha: 0);
			}
		}
		.current {
			color: #fff;
			background: #ccc;
			border-top-color: #ccc;
		}
	}
</style>