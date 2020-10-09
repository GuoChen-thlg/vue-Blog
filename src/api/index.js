import { request as axios } from '../util/request'
/**
 * @description 得到站点初始化信息
 * 
 * @returns 
 */
export function siteInit() {
	return axios({
		flag: 'siteInit',
		url: '/api/site/init',
		method: 'GET',
	})
}
// 帖子列表
export function getPostPist() {
	return axios({
		flag: 'getPostPist',
		url: '/api/site/postlist',
		method: 'GET',
	})
}
// 帖子
export function getPost() {
	return axios({
		flag: 'getPost',
		url: '/api/post',
		method: 'GET',
		// params?
	})
}
// 标签
export function getTags(){
	return axios({
		flag: 'getTags',
		url: '/api/tags',
		method: 'GET',
	})
}
// 分类
export function getCategory() {
	return axios({
		flag:'',
		url: '/api/category',
		method: 'GET',
	})
}