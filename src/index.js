import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux';
import routes from './routes.js';

const dest = document.getElementById('root');

Page = routes(store.getStore().loginStatu);

ReactDom.render(
	<Provider store={store}>
		<Page />
	</Provider>,
	dest
);
