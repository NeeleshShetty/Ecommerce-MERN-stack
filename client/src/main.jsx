import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		   <HelmetProvider>
		<Provider store={store}>
			<PayPalScriptProvider deferLoading={true}>
				<ToastContainer />
				<App />
			</PayPalScriptProvider>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);
