import {shopActionTypes} from './shop.types';

export const updateCollections = (collectionMap)=>({
    type:shopActionTypes.UPDATE_COLLECTIONS,
    payload:collectionMap
})