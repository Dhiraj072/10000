import React, { useEffect, useState } from 'react';
import './App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { User } from 'firebase';
import { Dashboard } from './components/dashboard/Dashboard';
import { H1, H2 } from '@blueprintjs/core';


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
        <H1>10000</H1>
        <H2>Build your skills</H2>
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
    