import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCpuB_rVhXuM_QHiVPOkmUEOqcQaUFW08Q",
    authDomain: "clwn-db-f007b.firebaseapp.com",
    databaseURL: "https://clwn-db-f007b.firebaseio.com",
    projectId: "clwn-db-f007b",
    storageBucket: "clwn-db-f007b.appspot.com",
    messagingSenderId: "709159993137",
    appId: "1:709159993137:web:2ce2871555d7dfb82a7a10"
  };


firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({'prompt':'select_account'});

export const auth = firebase.auth();
export const fireStore = firebase.firestore;
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
export default firebase;
