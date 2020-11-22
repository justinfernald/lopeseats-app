import React, { Fragment } from "react";
import "../../App.css";
import {
    getCart,
    getCartPrices,
    formatPrice,
    removeCartItem,
} from "../../assets/scripts/Util";
import Screen from "../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../Redux";
import { StyleSheet, css } from "aphrodite/no-important";
import ItemOptions from "./RestaurantsTab/ItemOptions";
import Button from "../../components/Button";

class Cart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            fee: 0,
            needPayment: false,
            canOrder: true,
            msg: ""
        };
    }

    async fetchData() {
        var items = await getCart(this.props.apiToken);
        if (items == null) items = [];

        var prices = await getCartPrices(this.props.apiToken);

        console.log(this.items);
        this.setState({
            items,
            subtotal: prices.subtotal,
            total: prices.total,
            tax: prices.tax,
            fee: prices.delivery_fee,
            needPayment: prices.need_payment,
            // canOrder: true,
            canOrder: prices.can_order,
            msg: prices.msg
        });
    }

    componentDidMount() {
        this.fetchData();
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
            instructions
        }));
        store.dispatch(actions.setItemModalOpen(true));
    };

    onNextStep = () => {
        if (this.state.items.length !== 0 && this.state.canOrder) {
            this.props.history.push("/app/restaurants/address");
        }
    };

    render() {
        if (!this.state.items.map)
            return;
        return (
            <Screen
                appBar={{ title: "Cart" }}>
                <ItemOptions onClose={() => this.fetchData()} />
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
                                            ${formatPrice(value.price)}
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
                    {/* <div className={css(styles.discl)}>
                        <span className="material-icons-outlined" style={{ marginRight: "10px" }}>
                            info
                        </span>
                        <span style={{ textAlign: "left" }}>
                            Total is only an estimate. The restaurants prices may vary slightly.
                        </span>
                    </div> */}
                    <div className="subtotal">
                        Subtotal
                        <span className="price">
                            ${formatPrice(this.state.subtotal)}
                        </span>
                    </div>
                    {/* Tax: 8.6% */}
                    <div className="subtotal">
                        Tax & fees
                        <span className="price">${formatPrice(this.state.tax)}</span>
                    </div>

                    {this.state.needPayment ?
                        <Fragment>
                            <div className="total">
                                Delivery Fee
                            <span className="price">${formatPrice(this.state.fee)}</span>
                            </div>

                            <div className="total">
                                Total
                            <span className="price">
                                    ${formatPrice(this.state.total)}
                                </span>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="total">
                                Total (Dining Dollars)
                            <span className="price">
                                    ${formatPrice(this.state.total)}
                                </span>
                            </div>

                            <div className="total">
                                Delivery Fee
                            <span className="price">${formatPrice(this.state.fee)}</span>
                            </div>
                        </Fragment>
                    }

                    {
                        !this.state.canOrder ?
                            <div className={css(styles.discl)}>
                                <span className="material-icons-outlined" style={{ marginRight: "10px" }}>
                                    info
                        </span>
                                <span style={{ textAlign: "left" }}>
                                    {this.state.msg}
                                </span>
                            </div>
                            :
                            ""
                    }
                    <Button
                        disabled={(this.state.items.length === 0 || !this.state.canOrder)}
                        onClick={() => this.onNextStep()}>
                        Checkout
                    </Button>
                </div>
            </Screen>
        );
    }
}

export default connect(({ apiToken, cartItems }) => ({ apiToken, cartItems }))(Cart);

const styles = StyleSheet.create({
    discl: {
        color: "black",
        margin: "5px 0 10px 0",
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        fontSize: "0.8em"
    }
});