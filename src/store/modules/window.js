const window = {
	namespaced: true,
	state: {
		innerHeight: document.documentElement.clientHeight,
		innerWidth: -1,
		mouse: {
			x: 0,
			y: 0,
		},
	},
	getters: {
		getinnerHeight(state) {
			return state.innerHeight
		},
		getinnerWidth(state) {
			return state.innerWidth
		},
		getMouseX(state) {
			return state.mouse.x
		},
		getMouseY(state) {
			return state.mouse.y
		},
	},
	mutations: {
		setinnerHeight(state, newinnerHeight) {
			state.innerHeight = newinnerHeight
		},
		setinnerWidth(state, newinnerWidth) {
			state.innerWidth = newinnerWidth
		},
		setMouse(state, mouse) {
			state.mouse.x = mouse.x
			state.mouse.y = mouse.y
		},
	},
	actions: {
		axynsetinnerHeight({ state, commit, rootState }) {},
	},
}
export default window
