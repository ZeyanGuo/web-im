//处理中间件和reducer，创建store
//middleware
import thunk from 'redux-thunk';

//others
import { createStore,combineReducers,applyMiddleware } from 'redux';
import loginReducer from './login/reducer';
import mainReducer from './main/reducer';
 
const reducer = combineReducers({
	loginReducer,
	mainReducer
	//more other reducers
});
export default createStore(reducer,applyMiddleware(thunk));
