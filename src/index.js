import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux';
import routes from './routes.js';

const dest = document.getElementById('root');
console.log(dest);
let Page = routes(store.getState().loginReducer.loginStatu);

console.log(store.getState().loginReducer.loginStatu);

	

ReactDOM.render(
	<Provider store={store}>
		<Page />
	</Provider>,
	dest
);

if (module.hot) {
	module.hot.accept()
}