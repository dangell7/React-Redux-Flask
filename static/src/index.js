import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Router, Redirect } from 'react-router-dom';
import history from './history';

import configureStore from './store/configureStore';
import routes from './routes';
import './style.scss';

require('expose-loader?$!expose-loader?jQuery!jquery');
require('bootstrap-webpack');

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
