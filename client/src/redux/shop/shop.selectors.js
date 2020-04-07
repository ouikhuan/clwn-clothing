import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectionShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections?Object.keys(collections).map( key=> collections[key]):[]
);

export const selectCollectionItem = shopParamURL => createSelector(
    [selectShopCollections],
    collections => collections?collections[shopParamURL]:null
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);
