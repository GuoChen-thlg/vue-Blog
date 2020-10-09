import Vue from 'vue'
import Vuex from 'vuex'
import site from './modules/site'
import window from './modules/window'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		site,
		window,
	},
})
