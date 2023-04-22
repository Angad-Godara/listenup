// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu1ei4KeDp0tKPnBeI4z1YuNUc7qZvQBY",
    authDomain: "spotify-clone-8e736.firebaseapp.com",
    projectId: "spotify-clone-8e736",
    storageBucket: "spotify-clone-8e736.appspot.com",
    messagingSenderId: "143538403328",
    appId: "1:143538403328:web:a8dfbe31ae04eee0ab40e5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app)
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export { auth, googleProvider, githubProvider, facebookProvider, twitterProvider, storage }
export default db;