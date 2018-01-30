//initial login reducer
import {LOGIN,LOGOUT} from './types';

const initState = {
	userInfo:{},
	loginStatu:'LOGOUT'
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
		} break;
		default:{
			return status;
		}
	}
}

export default loginReducer;