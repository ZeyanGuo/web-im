//工具函数代码

const utils = {};
import config from '../config';

utils.getFetch = (url) => {
	//此处将data转换成get形式
	return fetch(config.local+url,{//暂时使用跨域访问
		mode:"cors",
		credentials:'include',
		method:'GET',
	});
}


utils.postFetch = (url,data) => {
	data = JSON.stringify(data);
	return fetch(config.local+url,{//暂时使用跨域访问
		mode:"cors",
		credentials:'include',
		method:'POST',
		headers:{
			'Content-Type':'application/json;charset=utf-8'
		},
		body:data
	});
}

export default utils;