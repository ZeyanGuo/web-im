//处理中间件和reducer，创建store
//middleware
import thunk from 'redux-thunk';

//others
import { createStore,combineReducers,applyMiddleware } from 'redux';
import loginReducer from './login/reducer';
 
const reducer = combineReducers({
	loginReducer
	//more other reducers
});
export default createStore(reducer,applyMiddleware(thunk));
