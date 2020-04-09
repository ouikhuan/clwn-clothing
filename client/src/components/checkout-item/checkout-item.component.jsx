import React from 'react';
import {connect} from 'react-redux';
import {clearItemFromCart,removeItem,addItem} from '../../redux/cart/cart.actions';
import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
  } from './checkout-item.styles';

const CheckoutItem = ({cartItem,clearItem,addItem,removeItem})=> {
    const {imageUrl,name,price,quantity} = cartItem;
    return (<CheckoutItemContainer>
    <ImageContainer>
        <img alt="item" src={imageUrl}/>
        </ImageContainer>
    <TextContainer>{name}</TextContainer>
    <QuantityContainer>
        <span className="arrow" onClick={()=>removeItem(cartItem)}>&#10094;</span>
        <span className='value'>{quantity}</span>
        <span className="arrow" onClick={()=>addItem(cartItem)}>&#10095;</span>
    </QuantityContainer>
    <TextContainer className='price'>{price}</TextContainer>
    <RemoveButtonContainer onClick={()=>clearItem(cartItem)} >&#10005;</RemoveButtonContainer>
    </CheckoutItemContainer>)
}

const mapDispatchToProps = dispatch => ({
    clearItem: (item) => dispatch(clearItemFromCart(item)),
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null,mapDispatchToProps)(CheckoutItem);