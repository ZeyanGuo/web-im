//initial actions
import {types} from './types';
import config from '../config';

const login=(userInfo) => {
	return {
		type:types.LOGIN,
		userInfo
	};
}
const logout=(userInfo) => {
	return {
		type:types.LOGOUT,
		userInfo
	}
}

const redirectToMain = (userInfo) => {
	return {
		type:types.REDIRECTTOMAIN,
		userInfo
	}
}

const redirectToLogin = (userInfo) => {
	return {
		type:types.REDIRECTTOLOGIN,
		userInfo
	}
}

const checkUser=() => {
	return (dispatch)=>{
		return fetch(config.local+'/methods/checkUserByCookie.json',{
			mode: "cors",
			credentials: 'include'
		})
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			if(data.result){
				//means has the user.
			}
			else{
				//router to the login Page
				dispatch(redirectToLogin({}));
			}
		});
	}
} 

export default {
	login:login,
	logout:logout,
	redirectToMain:redirectToMain,
	redirectToLogin:redirectToLogin,
	checkUser:checkUser
}
