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
		head: {
			back_color: '#fff',
			active_back_color: '#e6e3e3',
			color: '#000',
			active_color: '#000',
			back_img: '',
		},
		sidebar: {
			back_color: '#ffffff',
			active_back_color: '',
			main_color: '#303133',
			active_main_color: '#409EFF',
			minor_color: '',
			active_minor_color: '',
		},
		siteback: { back_color: '#eeeeee', isShow: true, back_img: '' },
		menuList: [], //菜单
		navlist: [], //导航  分类
		links: [], // 第三方链接
		blogrolllist: [], // 友链
		QRlist: [], // 打赏
		isSearch: false, // 搜索功能
		L2DwidgetConfig: {},
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
		site_back(state) {
			return state.siteback
		},
		site_head(state) {
			return state.head
		},
		siteL2DwidgetConfig(state) {
			return state.L2DwidgetConfig
		},
		site_Sidebar(state) {
			return state.sidebar
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
		setsiteBack(state, siteback) {
			console.log(siteback)
			state.siteback = siteback
		},
		sethead(state, head) {
			state.head = head
		},
		setL2DwidgetConfig(state, { Config, callback }) {
			const newconfig = {
				...Config,
				pluginModelPath: `/live2d-widget-model-${Config.modelName}/assets/`,
				model: {
					scale: Config.model.scale,
					jsonPath: `/live2dw/live2d-widget-model-${Config.modelName}/assets/${Config.modelName}.model.json`,
				},
			}
			state.L2DwidgetConfig = JSON.parse(JSON.stringify(newconfig))
			callback()
		},
		setSidebar(state, sidebar) {
			state.sidebar = sidebar
		},
	},
	actions: {
		// asynSetL2DwidgetConfig({ state, commit, rootState }) {},
	},
}

export default site
