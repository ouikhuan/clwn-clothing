import {shopActionTypes} from './shop.types';
import { fireStore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

export const fectchCollectionSucssess = (collectionMap)=>({
    type:shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload:collectionMap
})

export const fetchCollectionsStart = ()=>({
    type:shopActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionFailure = ({errorMessage})=>({
    type:shopActionTypes.FETCH_COLLECTION_FAILURE,
    payload:errorMessage
})

export const fetchCollectionStartAsync = ()=> {
    return dispatch => {
        const collectionRef = fireStore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef.get().then(snapShot => {
            dispatch(fectchCollectionSucssess(convertCollectionsSnapshotToMap(snapShot)));
        }).catch(errorMessage =>  dispatch(fetchCollectionFailure(errorMessage)));
    }
}