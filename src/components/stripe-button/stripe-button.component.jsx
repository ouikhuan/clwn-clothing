import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100;

    const onToken = (token) => {
        console.log(token);
        alert('Payment successful');
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