import React from 'react';
import '../App.css';
import { getCart } from '../assets/scripts/Util';

export default class Cart extends React.Component  {

    items = [];
    subtotal = 0;

    constructor(props) {
        super(props);

        this.fetchData();
    }

    async fetchData() {
        this.items = await getCart(this.props.apiToken);
        console.log(this.items);

        for (var i = 0; i < this.items.length; i++) {
            this.subtotal += this.items[i].price * this.items[i].amount;
        }

        this.forceUpdate();
    }

    formatPrice(price) {
        var priceS = price.toString();
        if (!priceS.includes(".")) {
            return priceS + ".00";
        }
        if (priceS.length - priceS.indexOf(".") > 1) {
            return priceS + ("0").repeat(priceS.length - priceS.indexOf(".") - 1);
        }
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
                                            <span className="cartItemPrice">${this.formatPrice(value.price * value.amount)}</span>
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
                    <div className="subtotal">Subtotal<span className="price">${this.formatPrice(this.subtotal)}</span></div>
                    {/* Tax: 8.6% */}
                    <div className="subtotal">Tax & fees<span className="price">$2.00</span></div>
                    <div className="subtotal">Delivery Fee<span className="price">Free</span></div>
                    <div className="total">Total<span className="price">${this.formatPrice(this.subtotal + 2)}</span></div>
                    <button className="payButton">Pay Now</button>
                </div>
            </div>
        )
    };
}