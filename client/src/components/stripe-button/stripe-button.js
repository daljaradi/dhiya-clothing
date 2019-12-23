import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100;
    const publishableKey= 'pk_test_CJaxAD8nFADvhao8eA6f6q0Y00zrOHc8xD';

    
    const onToken = token => {
        console.log(token);
        alert('Payment was successful!');
       // axios({
        //    url: 'payment',
           // method: 'post',
           // data:{
           //     amount: priceForStripe,
          //      token
         //   }
       // }).then(response => {
            alert('Payment successful')
       // }).catch( error => {
       //     console.log('Payment error:', JSON.parse(error));
        //    alert('There was an issue with your payment.');
      //  });
    };

    return (
        <StripeCheckout
            lable='Pay Now'
            name ='Jaradi Co LLC'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;



