import firebase from 'firebase';
import { ISkill } from '../common/types';

export let config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

if (process.env.NODE_ENV === "production") {
    fetch('/__/firebase/init.json').then(async response => {
        await response.json().then(async (res) => {
            firebase.initializeApp(res);
        })
    });
} else {
    firebase.initializeApp(config);
}

const getUserId = (): string => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
        return user.uid;
    }
    throw new Error("Not logged in");
}

export const signInAnonymously = () => {
    firebase.auth().signInAnonymously();
}

export const logOut = () => {
    firebase.auth().signOut();
}

export const addSkill = async (skill: ISkill) => {
    await firebase.database().ref(`users/${getUserId()}/skills`).push(skill)
}

export const getSkills = async (): Promise<[string, ISkill][]> => {
    return await firebase.database().ref(`users/${getUserId()}/skills`)
    .once('value')
    .then((res) => {
        return res.val() 
        ? Promise.resolve(Object.entries(res.val() as { [key: string]: ISkill }))
        : Promise.resolve([])
    }).catch((err) => {
        return Promise.reject("Error getting skills" + err);
    });
}

export const removeSkill = async (skillId: string): Promise<string> => {
    return await firebase.database().ref(`users/${getUserId()}/skills/${skillId}`).remove()
    .then((res) => Promise.resolve("Success " + res.val()))
    .catch((err) => Promise.resolve("Error " + err))
}

export const updateSkill = async (skillId: string, skill: ISkill) => {
    await firebase.database().ref(`users/${getUserId()}/skills/${skillId}`).update(skill)
}
