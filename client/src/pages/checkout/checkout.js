import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

import { selectCartItems, selectCartTotal } from '../../components/redux/cart/cart.selectors'; 
import CheckoutItem from '../../components/checkout-item/checkout-item';



import './checkout.scss';

const CheckoutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Discription</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => 
            <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
        <div className='total'>
            <span>Total: ${total}</span>
        </div>
        <div className='test-warning'>
        Please, use the following credit card info for testing: 
        <br/>
        4242 4242 4242 4242 - EX:01/20 CVV:123

        </div>
        <StripeCheckoutButton price={total}/>
    </div>
)
    
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})


export default connect(mapStateToProps)(CheckoutPage);