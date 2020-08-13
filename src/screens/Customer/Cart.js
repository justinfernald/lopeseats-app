import React from "react";
import "../../App.css";
import {
    getCart,
    getCartPrices,
    formatPrice,
    removeCartItem,
} from "../../assets/scripts/Util";
import Screen from "../../components/Screen";
import { connect } from "react-redux";
import store, { actions } from "../../Redux";

class Cart extends React.Component {
    subtotal = 0;
    tax = 0;
    total = 0;
    fee = 0;

    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };

        this.fetchData();
    }

    async fetchData() {
        var items = await getCart(this.props.apiToken);
        if (items == null) items = [];
        this.setState({ items });
        console.log(this.items);

        var prices = await getCartPrices(this.props.apiToken);
        this.subtotal = prices.subtotal;
        this.total = prices.total;
        this.tax = prices.tax;
        this.fee = prices.delivery_fee;

        this.forceUpdate();
    }

    editItem = (item) => {
        console.log("editing: ", item);
        var optionsChosen = JSON.parse(item.options);
        var items = JSON.parse(item.items);
        var openItem = item;
        for (var i = 0; i < optionsChosen.length; i++) {
            var optionObj = optionsChosen[i];
            for (var j = 0; j < items[i].options.length; j++) {
                var option = items[i].options[j];
                var cost = option.choices[optionObj[option.name]].cost;
                if (cost > 0) {
                    openItem.price -= cost;
                }
            }
        }

        var instructions = item.comment;
        var editingItem = true;
        store.dispatch(actions.setItemDetails({
            editingItem,
            openItem,
            optionsChosen,
            instructions,
        }));
        this.props.history.push("/app/restaurants/item");
    };

    onNextStep = () => {
        this.props.history.push("/app/restaurants/address");
    };

    render() {
        return (
            <Screen
                appBar={{ title: "Cart", onBack: this.props.history.goBack }}>
                <div className="cartList">
                    {this.state.items.map((value, index) => {
                        var options = JSON.parse(value.options);
                        var optionStrings = [];
                        var j = 0;
                        for (var i = 0; i < options.length; i++) {
                            for (var k in options[i]) {
                                optionStrings[j] = k + ":   " + options[i][k];
                                optionStrings[j + 1] = <br key={j * 1000} />;
                                j += 2;
                            }
                        }
                        return (
                            <div className="cartItem" key={index}>
                                <div
                                    className="imageHolder img-fill"
                                    onClick={() => this.editItem(value)}>
                                    <img alt="test" src={value.image} />
                                </div>
                                <div
                                    className="cartItemInfo"
                                    onClick={() => this.editItem(value)}>
                                    <div className="cartItemHeader">
                                        <span className="cartItemName">
                                            {value.name}
                                        </span>
                                        <span className="cartItemPrice">
                                            $
                                            {formatPrice(
                                                value.price * value.amount
                                            )}
                                        </span>
                                    </div>
                                    <div className="cartItemDescription">
                                        x{value.amount}
                                        <br />
                                        {optionStrings}
                                        {value.comment}
                                    </div>
                                </div>
                                <div
                                    className="deleteBtn"
                                    onClick={() => {
                                        removeCartItem(
                                            this.props.apiToken,
                                            value.id
                                        );
                                        this.fetchData();
                                    }}>
                                    <div className="minus"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="cartFooter">
                    <div className="subtotal">
                        Subtotal
                        <span className="price">
                            ${formatPrice(this.subtotal)}
                        </span>
                    </div>
                    {/* Tax: 8.6% */}
                    <div className="subtotal">
                        Tax & fees
                        <span className="price">${formatPrice(this.tax)}</span>
                    </div>
                    <div className="total">
                        Total (Dining Dollars)
                        <span className="price">
                            ${formatPrice(this.total)}
                        </span>
                    </div>
                    <div className="total">
                        Delivery Fee
                        <span className="price">${formatPrice(this.fee)}</span>
                    </div>
                    <button
                        className="checkoutButton"
                        onClick={() => this.onNextStep()}>
                        Checkout
                    </button>
                </div>
            </Screen>
        );
    }
}

export default connect(({apiToken}) => ({apiToken}))(Cart);
