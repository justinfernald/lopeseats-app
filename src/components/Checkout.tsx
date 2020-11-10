import React from "react";
import { Braintree, DropInResult } from 'capacitor-braintree-dropin';
import { store, /*actions*/ } from "../Redux";
import { fetchBalances } from "../Redux/Thunks";
import { connect } from "react-redux";
import Screen from "./Screen";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { css, StyleSheet } from "aphrodite/no-important";
import { formatPrice } from "../assets/scripts/Util";
import { Checkbox, FormControlLabel } from "@material-ui/core";

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

class PaymentMethodSelection extends React.Component<{paymentUpdate: (payment:DropInResult) => void, total:number},{payment: DropInResult|null, clientToken: string|null}> {    
    braintree:Braintree;

    constructor(props: any) {
        super(props);

        this.state = {
            payment: null,
            clientToken: null
        }

        this.braintree = new Braintree();
    }

    componentDidMount = async () => {
        // Get token for payment processing
        const response = await fetch(
            "https://lopeseat.com/REST/order/requestBraintreeToken.php"
        );
        const clientToken = await response.json();

        this.setState({
            clientToken
        });

        // Initialize braintree api for payments
        this.braintree.setToken({
            token: clientToken
        }).catch((error) => {
            console.log(error);
        });
    }

    selectPayment = () => {
        var { total, paymentUpdate } = this.props;
        
        this.braintree.showDropIn({
            amount: total.toString()
        }).then(
            (payment) => {
                console.log("Payment: ");
                console.log(JSON.stringify(payment));
                this.setState({payment});
                paymentUpdate(payment);
            }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div onClick={this.selectPayment}>
                Select payment method.
            </div>
        );
    }

}

type propType = {
    total: number,
    canUseBalances?: boolean,
    balances?: any,
    submitPayment: (payment: DropInResult|null, useBalance: boolean, useEarnings: boolean) => void
};

type stateType = {
    clientToken: string|null,
    payment: DropInResult|null,
    useBalance: boolean,
    useEarnings: boolean,
    balance: number,
    earnings: number
};

class Checkout extends React.Component<propType, stateType> {

    balanceRef:React.RefObject<HTMLInputElement>;
    earningsRef:React.RefObject<HTMLInputElement>;

    constructor(props: propType) {
        super(props);
        var { balances, /*total*/ } = props;

        this.state = {
            clientToken: null,
            payment: null,
            useBalance: false,
            useEarnings: false,
            balance: balances[0] === undefined ? 0 : balances[0],
            earnings: balances[1] === undefined ? 0 : balances[1]
        }

        this.balanceRef = React.createRef();
        this.earningsRef = React.createRef();

        // Load balance and earning into redux
        store.dispatch(fetchBalances());
    }

    getBalanceAmount():number {
        var { useEarnings, useBalance, balance, earnings } = this.state;
        return useBalance ? balance : useEarnings ? earnings : 0;
    }

    // Returns total amount needed for payment if earnings/balance doesn't cover the full price or isn't used
    getPaymentTotal() {
        var { total } = this.props;
        return this.getBalanceAmount() > total ? 0 : total - this.getBalanceAmount();
    }

    checkboxChange = () => {
        this.setState({
            useBalance: this.balanceRef.current ? this.balanceRef.current.checked : false,
            useEarnings: this.earningsRef.current ? this.earningsRef.current.checked : false
        });
    }

    // Returns checkboxes for using balance/earnings
    renderBalanceSelection() {
        var { useEarnings, useBalance, balance, earnings } = this.state;

        if (!this.props.canUseBalances) return "";

        return (
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
        );
    }

    paymentUpdate = (payment: DropInResult) => {
        this.setState({payment});
    }

    submitPayment = () => {
        var { payment, useBalance, useEarnings } = this.state;
        this.props.submitPayment(payment, useBalance, useEarnings);
    }

    render() {
        var total = this.getPaymentTotal();

        return (
            <Screen
                appBar={{
                    title: "Checkout", backBtn: true
                }}>
                <ThemeProvider theme={theme}>
                    <div>
                        <PaymentMethodSelection paymentUpdate={this.paymentUpdate} total={total}/>
                    </div>

                    <div className={css(styles.container)}>
                        {this.renderBalanceSelection()}
                    </div>
                    <div className={css(styles.footer)}>
                        <div className="total">
                            Total
                        <span className="price">
                            ${formatPrice(total)}
                        </span>
                    </div>

                    <button
                        className="checkoutButton"
                        onClick={this.submitPayment}>
                        Pay Now
                    </button>
                    </div>
                </ThemeProvider>
            </Screen>
        );
    }

}

export default connect(({balances}:any) => ({balances: balances}))(Checkout);

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
        backgroundColor: "#fff",
        width: "100%",
        padding: "15px 20px",
        borderRadius: "20px 20px 0 0",
        flex: "0 1 auto",
        boxShadow: "0px -2px 13px 0px #bdbdbd9e"

    }
});