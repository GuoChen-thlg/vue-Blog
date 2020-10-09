import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/global.scss'
// https://fontawesome.com/v4.7.0/get-started/ 字体网站
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

// HTML5 music player
import vueAplayer from 'vue-aplayer'
// import 'APlayer/dist/APlayer.min.css';




Vue.use(vueAplayer)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: function(h) {
		return h(App)
	},
}).$mount('#app')
