import React from 'react';
import {connect} from 'react-redux';
import {CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer} from "./collection-item.styles";

import {addItem} from '../../redux/cart/cart.actions';

const CollectionItem = ({item,addItem})=> {
    const {name,imageUrl,price} = item;
    return (
        <CollectionItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={()=>addItem(item)} inverted>ADD TO CART</AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item=> dispatch(addItem(item))
});

export default React.memo(connect(null,mapDispatchToProps)(CollectionItem));