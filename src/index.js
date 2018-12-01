import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

//cookies
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(<CookiesProvider><BrowserRouter><App /></BrowserRouter></CookiesProvider>, document.getElementById('root'));

serviceWorker.register();

