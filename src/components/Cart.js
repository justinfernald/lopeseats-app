import React from 'react';
import '../App.css';
import { getCart } from '../assets/scripts/Util';

export default class Cart extends React.Component  {

    items = [];

    constructor(props) {
        super(props);

        this.fetchData();
    }

    async fetchData() {
        this.items = await getCart();
        console.log(this.items);

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
                                <div className="cartItem">
                                    <div className="imageHolder img-fill"><img alt="test" src={require("../assets/images/burger.png")}/></div>
                                    <div className="cartItemInfo">
                                        <div className="cartItemHeader">
                                        <span className="cartItemName">{value.name}</span>
                                            <span className="cartItemPrice">$4.99</span>
                                        </div>
                                        <div className="cartItemDescription">
                                            With cheese sauce<br/>
                                            x10
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="cartItem">
                        <div className="imageHolder img-fill"><img alt="test" src={require("../assets/images/burger.png")}/></div>
                        <div className="cartItemInfo">
                            <div className="cartItemHeader">
                                <span className="cartItemName">Burger</span>
                                <span className="cartItemPrice">$4.99</span>
                            </div>
                            <div className="cartItemDescription">
                                With cheese sauce<br/>
                                x10
                            </div>
                        </div>
                    </div>
                    <div className="cartItem">
                        <div className="imageHolder img-fill"><img alt="test" src={require("../assets/images/burger.png")}/></div>
                        <div className="cartItemInfo">
                            <div className="cartItemHeader">
                                <span className="cartItemName">Burger</span>
                                <span className="cartItemPrice">$4.99</span>
                            </div>
                            <div className="cartItemDescription">
                                With cheese sauce<br/>
                                x10
                            </div>
                        </div>
                    </div>
                    <div className="cartItem">
                        <div className="imageHolder img-fill"><img alt="test" src={require("../assets/images/burger.png")}/></div>
                        <div className="cartItemInfo">
                            <div className="cartItemHeader">
                                <span className="cartItemName">Burger</span>
                                <span className="cartItemPrice">$4.99</span>
                            </div>
                            <div className="cartItemDescription">
                                With cheese sauce<br/>
                                x10
                            </div>
                        </div>
                    </div>
                    <div className="cartItem">
                        <div className="imageHolder img-fill"><img alt="test" src={require("../assets/images/burger.png")}/></div>
                        <div className="cartItemInfo">
                            <div className="cartItemHeader">
                                <span className="cartItemName">Burger</span>
                                <span className="cartItemPrice">$4.99</span>
                            </div>
                            <div className="cartItemDescription">
                                With cheese sauce<br/>
                                x10
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cartFooter">
                    <div className="subtotal">Subtotal<span className="price">$93.40</span></div>
                    <div className="subtotal">Tax & fees<span className="price">$2.00</span></div>
                    <div className="subtotal">Delivery Fee<span className="price">Free</span></div>
                    <div className="total">Total<span className="price">$95.40</span></div>
                    <button className="payButton">Pay Now</button>
                </div>
            </div>
        )
    };
}