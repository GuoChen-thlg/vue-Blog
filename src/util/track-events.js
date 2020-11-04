import Beacon from '@/util/beacon'
export default {
	/**
	 * @name UVPV 固定名称不支持修改
	 * @desc UV、PV埋点
	 * @param {Object} context 当前上下文
	 */
	UVPV(context) {
		const {
			$route: { name, path },
		} = context
		// console.log('总访问量')
	},
	/**
	 * @name TONP 固定名称不支持修改
	 * @desc 页面停留时间埋点（Time on Page）
	 * @param {Object} context 当前上下文
	 * @param {Timestamp} et 进入页面时间
	 * @param {Timestamp} dt 离开页面时间
	 */
	TONP(context, { et, dt }) {
		const {
			$route: { name, path },
		} = context
		console.log(name, path)
		console.log(dt - et)
	},
	/**
	 * @name trace 埋点唯一标识ID（自定义）
	 * @param {Object} context 当前上下文
	 * @param {Object} args 剩余参数
	 */
	trace(context, msg, fun) {
		const {
			$route: { name, path },
		} = context
		// console.log({
		// 	name,
		// 	path,
		// })
	},
}
