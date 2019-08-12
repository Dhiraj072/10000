import React, { useEffect, useState } from 'react';
import './App.css';
import 'typeface-roboto';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { User } from 'firebase';
import { Dashboard } from './components/dashboard/Dashboard';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { signInAnonymously } from './firebase/firebase';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google as providers.
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
      <Container>
        <Box paddingTop={4}>
          <Typography variant="h3">10000</Typography>
          <Typography variant="h5">Build your skills</Typography>
        </Box>
        <Box paddingTop={2}>
        {
          user ?
          <Dashboard/>
          :
          <Box textAlign="center">
                <Button variant="outlined" color="primary" onClick={signInAnonymously} >Continue as Guest</Button>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </Box>
        }
        </Box>
      </Container>
      );
    }
    
  export default App;
    