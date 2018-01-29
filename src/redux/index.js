//处理中间件和reducer，创建store
import reducer from './modules/reducer';
import {createStore} from 'redux';

export default createStore(reducer);
