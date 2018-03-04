//initial actions
import {types} from './types';
import utils from '../utils';

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



const checkUser=(info,history) => {
	return (dispatch)=>{
		return utils.getFetch('/methods/checkUserByCookie.json')
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			if(data.result.login){
				//means has the user.
				if(info&&info.from == 'main'){//在登录的情况下后退到login，则进行重定向
					history.push('/main');
				}
				else{
					dispatch(redirectToMain({
						id:data.result.user.id,
						username:data.result.username
					}));
				}
			}
			else{
				//router to the login Page
				if(info&&info.from == 'login'){//在未登录的情况下后退到main，则进行重定向
					history.push('/login')
				}
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
