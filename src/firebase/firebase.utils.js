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
export const fireStore = firebase.firestore();

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const userRef = fireStore.doc(`users/${userAuth.uid}`);
    const shapShot = await userRef.get();
    if(!shapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

         try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = fireStore.collection(collectionKey);
    const batch = fireStore.batch();
    objectsToAdd.forEach(obj=>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    return await batch.commit();
}


export const convertCollectionsSnapshotToMap =  collections => {
    const transformedCollection = collections.docs.map(doc=>{
        const {items,title} = doc.data();
        return {
            routeName : encodeURI(title.toLowerCase()),
            id:doc.id,
            items,
            title
        }
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
}

export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
export default firebase;
