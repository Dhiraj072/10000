import React, { useEffect, useState } from 'react';
import './App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { User } from 'firebase';
import { Dashboard } from './components/dashboard/Dashboard';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_API_KEY);
firebase.initializeApp(config);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://project-10000-hours-test.firebaseapp.com',
  privacyPolicyUrl: 'https://project-10000-hours-test.firebaseapp.com'
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        setUser(user);
      }
      )
    })
    return (
      <div className="App">
      <header className="App-header">
      {
        user ?
        <Dashboard/>
        :
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      }
      </header>
      </div>
      );
    }
    
    export default App;
    