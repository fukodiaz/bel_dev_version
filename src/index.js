import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import ErrorBoundry from './components/error-boundry';
import {BelgoServiceProvider} from './components/belgo-service-context';
import App from './components/app';

import store from './store';
import BelgoService from './services/belgo-service';

const belgoService = new BelgoService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<BelgoServiceProvider value={belgoService}>
				<Router>
					<App />
				</Router>
			</BelgoServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root'));