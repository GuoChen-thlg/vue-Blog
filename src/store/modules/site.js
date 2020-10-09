import loacl from '@/util/local.js'
const site = {
	namespaced: true,
	state: () => ({
		pattern: 'production', //preview
		author: {
			name: '测试站点',
			image: 'https://thlg.ml/images/tx.jpg',
			subtitle: '测试副标题',
		},
		description: '该测试站点描述说明，此为默认说明，演示用',
		copyrightYear: '2020',
		detailDate: '03/20/2020 00:00:00',
		headImageUrl: 'https://thlg.ml/images/blogHead2.jpg',
		backImageUrl: 'https://thlg.ml/images/background2.jpg',
		menuList: [], //菜单
		navlist: [], //导航  分类
		links: [], // 第三方链接
		blogrolllist: [], // 友链
		QRlist: [], // 打赏
		isSearch: false, // 搜索功能
		L2DwidgetConfig: {
			pluginModelPath: '/live2d-widget-model-koharu/assets/',
			tagMode: false,
			debug: false,
			model: {
				jsonPath:
					'/live2dw/live2d-widget-model-koharu/assets/koharu.model.json',
			},
			display: { position: 'right', width: 150, height: 300 }, //调整大小,和位置
			mobile: { show: true }, //要不要盯着你的鼠标看
			log: false,
		},
	}),
	getters: {
		site_pattern(state) {
			return state.pattern
		},
		site_author_name(state) {
			return state.author.name
		},
		site_author_image(state) {
			return state.author.image
		},
		site_author_subtitle(state) {
			return state.author.subtitle
		},
		site_description(state) {
			return state.description
		},
		site_copyrightYear(state) {
			return state.copyrightYear | 0
		},
		site_detailDate(state) {
			return state.detailDate
		},
		site_menuList(state) {
			return state.menuList
		},
		site_navlist(state) {
			return state.navlist
		},
		site_links(state) {
			return state.links
		},
		site_blogrolllist(state) {
			return state.blogrolllist
		},
		site_isSearch(state) {
			return state.isSearch
		},
		site_QRlist(state) {
			return state.QRlist
		},
		site_back_image_url(state) {
			return state.backImageUrl
		},
		site_head_image_url(state) {
			return state.headImageUrl
		},
		siteL2DwidgetConfig(state) {
			return state.L2DwidgetConfig
		},
	},
	mutations: {
		setpattern(state, pattern) {
			state.pattern = pattern
		},
		setauthor(state, author) {
			state.author = author
		},
		setdescription(state, description) {
			state.description = description
		},
		setcopyrightYear(state, copyrightYear) {
			state.copyrightYear = copyrightYear
		},
		setdetailDate(state, detailDate) {
			state.detailDate = detailDate
		},
		setmenuList(state, menuList) {
			state.menuList = menuList
		},
		setnavlist(state, navlist) {
			state.navlist = navlist
		},
		setlinks(state, links) {
			state.links = links
		},
		setblogrolllist(state, blogrolllist) {
			state.blogrolllist = blogrolllist
		},
		setisSearch(state, isSearch) {
			state.isSearch = isSearch
		},
		setQrlist(state, QRlist) {
			state.QRlist = QRlist
		},
		setbackImageUrl(state, backImageUrl) {
			state.backImageUrl = backImageUrl
		},
		setheadImageUrl(state, headImageUrl) {
			state.headImageUrl = headImageUrl
		},
		setL2DwidgetConfig(state, Config) {
			console.log(Config);
			const config = {
				...Config,
				pluginModelPath: `/live2d-widget-model-${Config.modelName}/assets/`,
				model: {
					scale: Config.model.scale,
					jsonPath:`/live2d-widget-model-${Config.modelName}/assets/${Config.modelName}.model.json`
				}
			}
			state.L2DwidgetConfig = JSON.parse(JSON.stringify(config))
		},
	},
	actions: {},
}

export default site
