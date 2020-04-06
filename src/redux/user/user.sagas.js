import {all,call,takeLatest,put} from 'redux-saga/effects';
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpFailure,
    signUpSuccess
} from './user.actions';
import UserActionTypes from "./user.types";
import {auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser} from '../../firebase/firebase.utils';



export function* getSnapshotFromUserAuth(userAuth,additionalData) {
    try {
      const userRef = yield call(createUserProfileDocument,userAuth,additionalData);
      const userSnapshot = yield userRef.get();
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
      yield put(signInFailure(error));
    }
}

function* signInWithGoogle() {

    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error));
    }

}

function* signInWithEmail({payload:{email,password}}) {
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);

    }catch(error){
        yield put(signInFailure(error));
    }
 }

 function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        signInFailure(error);
    }

}

function* userSignout(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error));
    }

}

function* userSignup({payload:{email,password,displayName}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccess({user,additionalData:{displayName}}));

    }catch(error){
        yield put(signUpFailure(error));
    }
}

function* signInAfterSignup({payload:{user,additionalData}}){
    yield getSnapshotFromUserAuth(user,additionalData);
}

function* onGoogleUserSignInStart() {
   yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START,signInWithGoogle);
}


function* onEmailUserSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START,signInWithEmail);
}


function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}


function* onUserSignout(){
    yield takeLatest(UserActionTypes.SIGNOUT_START,userSignout);
}


function* onUserSignup(){
    yield takeLatest(UserActionTypes.SIGNUP_START,userSignup);
}


function* onUserSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGNUP_SUCCESS,signInAfterSignup);
}


export function* userSagas(){
    yield all([
        call(onGoogleUserSignInStart),
        call(onEmailUserSignInStart),
        call(onCheckUserSession),
        call(onUserSignout),
        call(onUserSignup),
        call(onUserSignUpSuccess)
    ]);
}