import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectionShopCollectionsForPreview } from "../../redux/shop/shop.selectors";
import CollectionPreview from '../collection-preview/collection-preivew.component';

const CollectionOverView = ({collections})=> (
    <div className="collection-overview">
        {collections.map(({id,...otherCollectionsProps})=>(
            <CollectionPreview key={id} {...otherCollectionsProps} />
        ))}
    </div>
)


const mapStateToProps = createStructuredSelector({
    collections:selectionShopCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionOverView);