//initial login reducer
import {types} from '../types';
import { browserHistory } from 'react-router';
const initState = {
	userInfo:{},
	location:'/'
}
const {LOGIN,LOGOUT,REDIRECTTOLOGIN,REDIRECTTOMAIN} = types;
const loginReducer = (status=initState,action)=>{
	switch(action.type){
		case LOGIN:{
			//do some login methods
			return {
				location:'/main',
				userInfo:action.userInfo
			}
		} break;
		case LOGOUT:{
			//do some logout methods
			return {
				location:'/login',
				userInfo:{
				},
			}
		} break;
		case REDIRECTTOLOGIN:{
			return {
				location:'/login',
				userInfo:action.userInfo
			}
		}
		case REDIRECTTOMAIN:{
			return {
				location:'/main',
				userInfo:action.userInfo
			}
		}
		default:{
			return status;
		}
	}
}

export default loginReducer;