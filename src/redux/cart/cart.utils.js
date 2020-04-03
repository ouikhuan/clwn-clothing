export const addItemToCart = (cartItems,cartItemsToAdd) => {
    const cartItemExisting = cartItems.find(cartItem => cartItem.id === cartItemsToAdd.id );

    if(cartItemExisting){
        return cartItems.map(cartItem => cartItem.id === cartItemsToAdd.id ? {...cartItem,quantity:cartItem.quantity+1}:cartItem );
    }

    return [...cartItems,{...cartItemsToAdd,quantity:1}];
}

export const removeItem = (cartItems,cartItemsToRemove) => {
    const cartItemExisting = cartItems.find(cartItem => cartItem.id === cartItemsToRemove.id );

    if(cartItemExisting.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemsToRemove.id);
    }

    return cartItems.map(cartItem => cartItem.id === cartItemsToRemove.id ? {...cartItem,quantity:cartItem.quantity-1}:cartItem);
}