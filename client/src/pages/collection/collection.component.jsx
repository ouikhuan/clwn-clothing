import React from 'react';
import {selectCollectionItem} from '../../redux/shop/shop.selectors';
import {connect} from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';
import {
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
  } from './collection.styles';

const CollectionPage = ({collection}) => {
    const {title,items} = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {
                    items.map( item => <CollectionItem key={item.id} item={item} /> )
                }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state,ownProps)=> ({
    collection: selectCollectionItem(ownProps.match.params.collectionId)(state)
});
export default connect(mapStateToProps)(CollectionPage);