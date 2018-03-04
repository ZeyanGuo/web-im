import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux';
import App from './containers';

const dest = document.getElementById('root');
	
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	dest
);

//模块热替换代码，生产环境禁止
if (module.hot) {
	module.hot.accept()
}