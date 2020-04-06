import {takeLatest,call,put,all} from 'redux-saga/effects';
import {shopActionTypes} from "./shop.types";
import {fectchCollectionSucssess,fetchCollectionFailure} from './shop.actions';
import {fireStore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

function* fetchCollectionsAsync() {
    try{
        const collectionRef = fireStore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot);
        yield put(fectchCollectionSucssess(collectionsMap));
    }catch(error){
        yield put(fetchCollectionFailure(error.message));
    }
 }

 function* onFetchCollectionsStart() {
   yield takeLatest(shopActionTypes.FETCH_COLLECTION_START,fetchCollectionsAsync);
 }

 export function* shopSagas(){
     yield all([
         call(onFetchCollectionsStart)
     ]);
 }