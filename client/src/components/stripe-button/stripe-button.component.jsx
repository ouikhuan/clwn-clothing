import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100;

    const onToken = (token) => {
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token,
            }
        }).then(response=>{
            alert('Payment successful');
        }).catch(error => {
            console.log('Error',error);
            alert('There was an issue in your payment, please use the test credit card we provided');
        });
    }


    return (
            <StripeCheckout
                label='Pay Now'
                name="CLWN CLOTHING Ltd."
                description={`your total is $${price}`}
                image='https://svgshare.com/i/CUz.svg'
                stripeKey='pk_test_ECNKr5GBSzfGTaWPZO5me5xn00AuUQCewd'
                amount={priceForStripe}
                panelLabel='Pay Now'
                shippingAddress
                billingAddress
                token={onToken}
            />
    )
}

export default StripeCheckoutButton;