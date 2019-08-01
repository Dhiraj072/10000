import firebase from 'firebase';
import { ISkill } from '../common/types';

export const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config);

export const addSkillToFirebase = async (skill: ISkill) => {
    const uid = process.env.NODE_ENV === 'test' ? '12345' : firebase.auth().currentUser!.uid;
    if (uid !== null) {
        console.log('Adding skill for uid', skill, uid)
        await firebase.database().ref(`users/${uid}/skills`).push(skill)
        .then((res) => { 
            console.log('done')
        }).catch((err) => { 
            console.log('error', err)
        });
    } else {
        throw new Error("Not logged in");
    }
}

export default { addSkillToFirebase };