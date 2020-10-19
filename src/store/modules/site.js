import loacl from '@/util/local.js'
const site = {
	namespaced: true,
	state: () => ({
		pattern: 'production', //preview
		author: {
			name: '测试站点',
			image: '',
			subtitle: '测试副标题',
			description: '该测试站点描述说明，此为默认说明，演示用',
		},
		copyrightYear: new Date().getUTCFullYear(),
		detailDate: new Date(),
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
		menuList: [
			{
				'icon-class': 'fa fa-fw fa-home',
				path: '/',
				label: '首页',
			},
			{
				'icon-class': 'fa fa-fw fa-tags',
				path: '/tags',
				label: '标签',
			},
			{
				'icon-class': ' fa fa-fw fa-th',
				path: '/categories',
				label: '分类',
			},
			{
				'icon-class': 'fa fa-fw fa-archive',
				path: '/archives',
				label: '归档',
			},
		], //菜单
		navlist: [], //导航  分类
		links: [], // 第三方链接
		blogrolllist: [], // 友链
		QRlist: [], // 打赏
		isSearch: false, // 搜索功能
		L2DwidgetConfig: {},
		postCatalog: [],
	}),
	getters: {
		site_pattern(state) {
			return state.pattern
		},
		site_author(state) {
			return state.author
		},

		site_copyrightYear(state) {
			return parseInt(state.copyrightYear)
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
		getPostCatalog(state) {
			return state.postCatalog
		},
	},
	mutations: {
		setpattern(state, pattern) {
			state.pattern = pattern
		},
		setauthor(state, author) {
			if (author) {
				state.author = author
			}
		},
		setcopyrightYear(state, copyrightYear) {
			if (copyrightYear) {
				state.copyrightYear = copyrightYear
			}
		},
		setdetailDate(state, detailDate) {
			state.detailDate = detailDate
		},
		setmenuList(state, menuList) {
			if (menuList) {
				state.menuList = menuList
			}
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
			if (QRlist) {
				state.QRlist = QRlist
			}
		},
		setsiteBack(state, siteback) {
			if (siteback) {
				state.siteback = siteback
			}
		},
		sethead(state, head) {
			if (head) {
				state.head = head
			}
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
		setPostCatalog(state, catalog) {
			state.postCatalog = catalog
		},
	},
	actions: {
		// asynSetL2DwidgetConfig({ state, commit, rootState }) {},
	},
}

export default site
