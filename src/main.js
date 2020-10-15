import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VTrack from 'v-track'
import trackEvents from './util/track-events'
import './util/date'
Vue.use(VTrack, {
	trackEvents, // 埋点事件对象
	trackEnable: {
		UVPV: true, // 是否开启UVPV统计，v0.8.3新增routeUpdate，即在当前路由参数发生改变时埋点，默认为false
		TONP: true, // 是否开启页面停留时长统计，默认为false
	},
})
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
