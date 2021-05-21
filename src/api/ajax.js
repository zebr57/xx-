import axios from 'axios'
import qs from 'qs'

// axios全局设置
axios.defaults.withCredentials = false
axios.defaults.crossDomain = true

const baseUrl = ''

export default function ajax(url, params={}, type='GET', extra_config){
	url = baseUrl + url
	let promise
	let headers = {'X-Requested-With': 'XMLHttpRequest', ...extra_config}

	//获取保存在本地的token
	const token = localStorage.getItem('token');
	if(token) headers.Authorization = `Bearer ${token}` 

	return new Promise((resolve, reject)=>{
		if ('GET' === type) {
			// 发起 GET 请求
			let paramStr = qs.stringify(params, {arrayFormat: 'repeat'})
			promise = axios.get(url + '?' + paramStr)
		} else if('POST' === type){
			// 发起 POST 请求
			promise = axios.post(url, params)
		} else if ('PUT' === type) {
			// 发起 PUT 请求
			promise = axios.put(url, params, { headers });
		} else if ("PATCH" === type) {
			// 发起 patch 请求
			promise = axios.patch(url, params,{ headers });
		} else if ("DELETE" === type) {
			// 发起 delete 请求
			promise = axios.delete(url, { headers });
		}
		promise.then(response => {
			resolve(response)
		}).catch(error => {
			// 可以根据错误信息做一些相关操作
			// if(code == 5001) { 登录过期 }
			reject(error)
		})
	})
	
}