export default {
	get(name) {
		JSON.parse(window.localStorage.getItem(name))
	},
	set(name, value) {
		window.localStorage.setItem(name, JSON.stringify(value))
	},
	remoer(name) {
		window.localStorage.removeItem(name)
	},
	clear() {
		window.localStorage.clear()
	},
	has(name) {
		return window.localStorage.getItem(name) === null
	},
}
