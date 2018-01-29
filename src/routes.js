//this is the router, it control the website to show.
import containers from './containers';
import types from './redux/modules/types';
export default (status) => {
	switch(status){
		case types.LOGIN:{
			return containers.main;
		} break;
		case types.LOGOUT:{
			return containers.login;
		}
		default{
			return containers.error;
		}
	}
}