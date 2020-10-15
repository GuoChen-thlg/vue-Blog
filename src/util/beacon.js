// UV、PV埋点 VV IP
import local from './local'
const Beacon = {
	/**
	 * 网站浏览量   （单个页面）
     * 
     * */
	PV: () => {
		navigator.sendBeacon('/api/trace/pv', {
			path: '',
			duration: '',
		})
	},
	/**
	 * 独立访客数 （单日访问）
     * 本地存储
	 */
	UV: () => {
		navigator.sendBeacon('/api/trace/uv', {})
	},
	/**
	 * 访客的访问次数 （单次会话）
     * 会话存储
	 */
	VV: () => {
		navigator.sendBeacon('/api/trace/vv', {})
	},
	/**
	 * 独立IP数 （单一IP）
	 */
	IP: () => {
		navigator.sendBeacon('/api/trace/ip')
	},
}

export default Beacon