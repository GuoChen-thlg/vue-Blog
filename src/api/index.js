import { request as axios } from '../util/request'
/**
 * @description 得到站点初始化信息
 *
 * @returns
 */
export function siteInit() {
	return axios({
		flag: 'siteInit',
		url: '/api/siteInit',
		method: 'GET',
	})
}
// 帖子列表
export function getPostList() {
	return axios({
		flag: 'getPostPist',
		url: '/api/postlist',
		method: 'GET',
	})
}
// 帖子
export function getPost(params) {
	return axios({
		flag: 'getPost',
		url: '/api/queryPost',
		method: 'GET',
		params,
	})
}
// 标签列表
export function getTagsList() {
	return axios({
		flag: 'getTagsList',
		url: '/api/tagslist',
		method: 'GET',
	})
}
// 标签
export function getTags(params) {
	return axios({
		flag: 'getTags',
		url: '/api/tag',
		method: 'GET',
		params,
	})
}
// 分类列表
export function getCategoryList() {
	return axios({
		flag: 'getCategoryList',
		url: '/api/categorylist',
		method: 'GET',
	})
}
// 分类
export function getCategory(params) {
	return axios({
		flag: 'getCategory',
		url: '/api/category',
		method: 'GET',
		params,
	})
}
export function search(data) {
	return axios({
		flag: 'search',
		url: '/api/search',
		method: 'POST',
		data,
	})
}
