import React, { Fragment } from "react";
import DropIn from "braintree-web-drop-in-react";
import {
    sendPayment,
    getCartPrices,
    formatPrice,
    showErrors,
} from "../../../assets/scripts/Util";
import LopesEatLogo from "../../../assets/images/icon-384x384.png";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { fetchBalances } from "../../../Redux/Thunks";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#eb1c34",
        },
    },
});

class CheckoutScreen extends React.Component {
    instance;

    constructor(props) {
        super(props);

        this.state = {
            clientToken: null,
            fee: 0,
            useBalance: false,
            useEarnings: false
        };

        this.balanceRef = React.createRef();
        this.earningsRef = React.createRef();
    }

    async componentDidMount() {
        store.dispatch(fetchBalances(this.props.apiToken));
        const response = await fetch(
            "https://lopeseat.com/REST/order/requestBraintreeToken.php"
        );
        const clientToken = await response.json();

        console.log(clientToken);

        var prices = await getCartPrices(this.props.apiToken);
        this.setState({
            clientToken,
            fee: prices.delivery_fee
        });
    }

    async pay() {
        var { balances } = this.props;
        var { useEarnings, useBalance, fee } = this.state;
        var needPayment = useBalance ? (balances[0] < fee) : (useEarnings ? (balances[1] < fee) : true);

        var result = null;

        if (needPayment) {
            if (!this.instance) return;
            if (this.instance.isPaymentMethodRequestable()) {
                const { nonce, type, details } = await this.instance.requestPaymentMethod();
                console.log(type);
                console.log(details.cardType);
                result = await sendPayment(nonce, this.props.address, this.props.apiToken, useBalance ? 1 : (useEarnings ? 2 : null), type, (type === "CreditCard") ? details.cardType : null);
            }
        } else {
            result = await sendPayment(null, this.props.address, this.props.apiToken, useBalance ? 1 : 2);
        }
        if (result && result.success) {
            this.props.history.push("/app/tracker");
            store.dispatch(actions.setHistorySize(0));
        } else {
            showErrors([result.msg]);
        }
    }

    checkboxChange = () => {
        this.setState({
            useBalance: this.balanceRef.current.checked,
            useEarnings: this.earningsRef.current.checked,
        });
    }

    render() {
        var { balances } = this.props;
        var { useEarnings, useBalance, fee } = this.state;

        var balance = balances[0] === undefined ? 0 : balances[0];
        var earnings = balances[1] === undefined ? 0 : balances[1];

        // If balance being used covers the payment, needPayment = false
        var needPayment = useBalance ? (balances[0] < fee) : (useEarnings ? (balances[1] < fee) : true);

        var dropin = (
            needPayment ?
                <DropIn
                    options={{
                        authorization: this.state.clientToken,
                        paypal: true,
                        venmo: true,
                    }}
                    onInstance={(instance) => (this.instance = instance)}
                />
                :
                <div className={css(styles.rowFlex)} style={{ margin: "20px" }}>All covered!</div>
        );

        var content = !this.state.clientToken ? (
            <div className="loadingWrapper">
                <img className="lopeImage" src={LopesEatLogo} alt="Logo" />
                <div className="loadingText">
                    Loading payment authorization. One moment please
                </div>
            </div>
        ) : (
                <Fragment>
                    <div className={css(styles.dropinContainer)}>
                        {dropin}
                    </div>
                    <div>
                        <div className={css(styles.useBalance)} style={{ display: balance === 0 ? "none" : "flex" }}>
                            <FormControlLabel
                                control={<Checkbox inputRef={this.balanceRef} />}
                                label="Use LopesEat balance to pay:"
                                labelPlacement="end"
                                onChange={this.checkboxChange}
                                disabled={useEarnings}
                            />
                            <span className={css(styles.vertAlign, useEarnings ? styles.disabled : null)}>{"$" + formatPrice(balance, false)}</span>
                        </div>
                        <div className={css(styles.useBalance)} style={{ display: earnings === 0 ? "none" : "flex" }}>
                            <FormControlLabel
                                control={<Checkbox inputRef={this.earningsRef} />}
                                label="Use Delivery earnings to pay:"
                                labelPlacement="end"
                                onChange={this.checkboxChange}
                                disabled={useBalance}
                            />
                            <span className={css(styles.vertAlign, useBalance ? styles.disabled : null)}>{"$" + formatPrice(earnings, false)}</span>
                        </div>
                    </div>
                </Fragment>
            );

        var prices = (
            (useEarnings || useBalance) ?
                needPayment ?
                    <Fragment>
                        <div className="total">
                            From {useEarnings ? "earnings" : "balance"}
                            <span className="price">${formatPrice(balances[useBalance ? 0 : 1])}</span>
                        </div>
                        <div className="total">
                            Through payment method
                    <span className="price">${formatPrice(fee - balances[useBalance ? 0 : 1])}</span>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className="total">
                            From {useEarnings ? "earnings" : "balance"}
                            <span className="price">${formatPrice(fee)}</span>
                        </div>
                    </Fragment>
                :
                <Fragment>
                    <div className="total">
                        Delivery Fee
                    <span className="price">${formatPrice(fee)}</span>
                    </div>
                </Fragment>
        );

        return (
            <Screen
                appBar={{
                    title: "Checkout", backBtn: true
                }}>
                <ThemeProvider theme={theme}>
                    <div className={css(styles.container)}>
                        {content}
                    </div>
                    <div className={css(styles.footer)}>
                        {prices}
                        <button
                            className="checkoutButton"
                            onClick={this.pay.bind(this)}>
                            Pay Now
                        </button>
                    </div>
                </ThemeProvider>
            </Screen>
        );
    }
}

export default connect(({ apiToken, address, balances }) => ({ apiToken, address, balances }))(
    CheckoutScreen
);

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "10px",
        flex: "1 1 auto"
    },
    dropinContainer: {
        minHeight: "50%",
        borderBottom: "1px solid grey"
    },
    useBalance: {
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 10px",
        margin: "10px 0"
    },
    vertAlign: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    rowFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    disabled: {
        opacity: 0.38
    },
    footer: {
        backgroundColor: "var(--primary)",
        width: "100%",
        padding: "15px 20px",
        borderRadius: "20px 20px 0 0",
        flex: "0 1 auto"
    }
});