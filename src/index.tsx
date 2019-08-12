import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const initFirebaseAndRenderApp = () => {
    if (firebase.apps.length < 1)
        setTimeout(() => { initFirebaseAndRenderApp() }, 100); 
    else
        ReactDOM.render(<App />, document.getElementById('root'));
}

initFirebaseAndRenderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
