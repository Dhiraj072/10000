import React, { useEffect } from 'react';
import './App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCVE2rr3ae44QHLUbKSFGn6N7_k8_hvsAY",
  authDomain: "project-10000-hours-test.firebaseapp.com",
  databaseURL: "https://project-10000-hours-test.firebaseio.com",
  projectId: "project-10000-hours-test",
  storageBucket: "",
  messagingSenderId: "1083693791334",
  appId: "1:1083693791334:web:0ff2932d4c7f3c42"
};

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
  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        console.log('Signed in ', user);
      }
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </header>
    </div>
  );
}

export default App;
