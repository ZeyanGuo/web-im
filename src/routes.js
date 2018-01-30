//this is the router, it control the website to show.
import * as containers from './containers';
import * as types from './redux/modules/types';
export default (status) => {
	switch(status){
		case types.LOGIN:{
			return containers.main;
		} break;
		case types.LOGOUT:{
			console.log(containers);
			return containers.login;
		} break;
		default :{
			return null;
		}
	}
}