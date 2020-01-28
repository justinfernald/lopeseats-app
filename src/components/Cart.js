import React from 'react';
import '../App.css';
import { getCart, getCartPrices, formatPrice } from '../assets/scripts/Util';

export default class Cart extends React.Component  {

    items = [];
    subtotal = 0;
    tax = 0;
    total = 0;
    fee = 0;

    constructor(props) {
        super(props);

        this.fetchData();
    }

    async fetchData() {
        this.items = await getCart(this.props.apiToken);
        console.log(this.items);

        var prices = await getCartPrices(this.props.apiToken);
        this.subtotal = prices.subtotal;
        this.total = prices.total;
        this.tax = prices.tax;
        this.fee = prices.delivery_fee;

        this.forceUpdate();
    }

    render () {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Cart</span>
                    </div>
                </div>

                <div className="cartList">
                    {
                        this.items.map((value, index) => {
                            return (
                                <div className="cartItem" key={index}>
                                    <div className="imageHolder img-fill"><img alt="test" src={value.image}/></div>
                                    <div className="cartItemInfo">
                                        <div className="cartItemHeader">
                                        <span className="cartItemName">{value.name}</span>
                                            <span className="cartItemPrice">${formatPrice(value.price * value.amount)}</span>
                                        </div>
                                        <div className="cartItemDescription">
                                            {value.comment}<br/>
                                            x{value.amount}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="cartFooter">
                    
                    <div className="subtotal">Subtotal<span className="price">${formatPrice(this.subtotal)}</span></div>
                    {/* Tax: 8.6% */}
                    <div className="subtotal">Tax & fees<span className="price">${formatPrice(this.tax)}</span></div>
                    <div className="total">Total (Dining Dollars)<span className="price">${formatPrice(this.total)}</span></div>
                    <div className="total">Delivery Fee<span className="price">${formatPrice(this.fee)}</span></div>
                    <button className="checkoutButton" onClick={()=>this.props.onNextStep()}>Checkout</button>
                </div>
            </div>
        )
    };
}