const window = {
	namespaced: true,
	state: {
		innerHeight: document.documentElement.clientHeight,
		innerWidth: -1,
		scrollTop: 0,
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
		getscrollTop(state) {
			return state.scrollTop
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
		setscrollTop(state, top) {
			state.scrollTop = top
		},
	},
	actions: {
		axynsetinnerHeight({ state, commit, rootState }) {},
	},
}
export default window
