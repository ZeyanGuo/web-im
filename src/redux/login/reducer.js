//initial login reducer
import {types} from '../types';
import { browserHistory } from 'react-router';
const initState = {
	userInfo:{},
	location:'/'
}
const {LOGIN,LOGOUT,REDIRECTTOLOGIN,REDIRECTTOMAIN,CHANGEUSERIMG,CHANGEBASEINFO} = types;
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
		} break;
		case REDIRECTTOMAIN:{

			return {
				location:'/main',
				userInfo:{
					id:action.userInfo.id,
					account:action.userInfo.account,
					baseInfo:action.userInfo.baseInfo,
					ws:action.userInfo.ws
				}
			}
		} break;
		case CHANGEUSERIMG:{
			let baseInfo = status.userInfo.baseInfo;
			let data = {
				location:status.location,
				userInfo:{
					id:status.userInfo.id,
					account:status.userInfo.account,
					baseInfo:{
						email:baseInfo.email,
						phone: baseInfo.phone,
						name: baseInfo.name,
						gender: baseInfo.gender,
						headImg: action.url
					},
					ws:status.userInfo.ws
				}
			};
			return data;
		} break;
		case CHANGEBASEINFO:{
			let baseInfo = status.userInfo.baseInfo;
			let data = {
				location:status.location,
				userInfo:{
					id:status.userInfo.id,
					account:status.userInfo.account,
					baseInfo:{
						email:baseInfo.email,
						phone: baseInfo.phone,
						name: action.info.name,
						gender: action.info.gender,
						headImg: baseInfo.headImg
					},
					ws:status.userInfo.ws
				}
			};
			return data;
		} break;
		default:{
			return status;
		}
	}
}

export default loginReducer;