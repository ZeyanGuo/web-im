//initial actions
import {LOGIN,LOGOUT} from './types';

export const login=(userInfo) => {
	return {
		type:LOGIN,
		userInfo
	};
}
export const logout=(userInfo) => {
	return {
		type:LOGOUT,
		userInfo
	}
}

