//initial login reducer
import {types} from '../types';
import { browserHistory } from 'react-router'
const initState = {
	userInfo:{},
	loginStatu:'LOGOUT',
	location:'/'
}
const {LOGIN,LOGOUT,REDIRECTTOLOGIN} = types;
const loginReducer = (status=initState,action)=>{
	switch(action.type){
		case LOGIN:{
			//do some login methods
			return {
				location:'/main',
				userInfo:{

				},
				loginStatu:LOGIN
			}
		} break;
		case LOGOUT:{
			//do some logout methods
			return {
				location:'/login',
				userInfo:{

				},
				loginStatu:LOGOUT
			}
		} break;
		case REDIRECTTOLOGIN:{
			return {
				location:'/login',
				userInfo:action.userInfo,
				loginStatu:action.loginStatu
			}
		}
		default:{
			return status;
		}
	}
}

export default loginReducer;