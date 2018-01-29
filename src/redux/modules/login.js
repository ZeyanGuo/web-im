//initial login reducer
import {LOGIN,LOGOUT} from './types';

const initState = {
	login:{
		userInfo:{},
		loginStatu:'LOGOUT'
	}
}

const loginReducer = (status=initState,action)=>{
	switch(action.type){
		case LOGIN:{
			//do some login methods
			return {
				userInfo:{

				},
				loginStatu:LOGIN
			}
		} break;
		case LOGOUT:{
			//do some logout methods
			return {
				userInfo:{

				},
				loginStatu:LOGOUT
			}
		}
	}
}

export default loginReducer;