import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

//Ant Design Stylesheet
import 'antd/dist/antd.css';

//Custom Stylesheet
import './index.css';

Sentry.init({dsn: "https://b45d15921c2048e4acc3f58ef9cf3fa1@o381895.ingest.sentry.io/5209970"});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
