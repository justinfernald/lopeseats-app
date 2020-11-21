import React, { Fragment } from "react";
import { Braintree, DropInResult } from 'capacitor-braintree-dropin';
import { store, /*actions*/ } from "../Redux";
import { fetchBalances } from "../Redux/Thunks";
import { connect } from "react-redux";
import Screen from "./Screen";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { css, StyleSheet } from "aphrodite/no-important";
import { formatPrice, requestBraintreeToken } from "../assets/scripts/Util";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Button from "../components/Button";

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

class PaymentMethodSelection extends React.Component<{ paymentUpdate: (payment: DropInResult) => void, total: number }, { payment: DropInResult | null, clientToken: string | null }> {
    braintree: Braintree;

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
        const clientToken = await requestBraintreeToken((store.getState() as any).apiToken);

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
                if (!payment.cancelled) {
                    this.setState({ payment });
                    paymentUpdate(payment);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    getPaymentText = () => {
        if (this.state.payment == null)
            return "Select method";
        else if (this.state.payment.card) {
            var { card } = this.state.payment;
            return this.state.payment.type + " ending .." + card.lastTwo;
        } else
            return this.state.payment.type;

    }

    render() {
        return (
            <div className={css(styles.paymentSelection)} onClick={this.selectPayment}>
                <span className={css(styles.centerContainer)}>
                    Payment
                </span>
                <span className={css(styles.rowFlex)}>
                    <span className={css(styles.centerContainer)}>
                        {this.getPaymentText()}
                    </span>
                    <span style={{ fontSize: "1.7em" }} className={css(styles.centerContainer) + " material-icons"}>
                        keyboard_arrow_right
                    </span>
                </span>
            </div>
        );
    }

}

class TipSelection extends React.Component<{ onChange?: (value: number) => void }, { tipAmount: number, selectedIndex: number, options: Array<number> }> {

    constructor(props: any) {
        super(props);

        this.state = {
            tipAmount: 1,
            selectedIndex: 0,
            options: [1, 2, 3]
        };
    }

    onChange = (value: number) => {
        if (this.props.onChange) {
            this.props.onChange(value == -1 ? this.state.tipAmount : value);
        }
    }

    onInputChange = (e: any) => {
        var newValue = e.target.value;
        if (!/^\+?(0?|[1-9]\d{0,2})$/.test(e.target.value)) {
            newValue = this.state.tipAmount;
        }

        e.target.value = newValue;

        if (newValue.length == 0)
            newValue = 0;

        newValue = parseInt(newValue);
        this.setState({ tipAmount: newValue });
        this.onChange(newValue);
    }

    selectIndex = (value: number, index: number) => {
        this.setState({ selectedIndex: index });
        this.onChange(value);
    }

    drawButton = (value: number, index: number) => {
        return <span key={index}
            className={css(styles.tipAmount, index == this.state.selectedIndex ? styles.tipSelected : null)}
            onClick={() => this.selectIndex(value, index)}>
            {value == -1 ? "Custom" : index == -1 ? "No Tip" : "$" + value}
        </span>;
    }

    render() {
        return (<div>
            <div className={css(styles.title)}>
                Add A Tip
            </div>
            <div className={css(styles.tipSelection)}>
                {this.drawButton(0, -1)}
                {this.state.options.map(this.drawButton)}
                {this.drawButton(-1, this.state.options.length)}
            </div>
            <div className={css(styles.customTip, this.state.selectedIndex == this.state.options.length ? null : styles.customTipClosed)}>
                <span className={css(styles.centerContainer)}>Enter Amount:</span>
                <span>
                    $<input onChange={this.onInputChange} className={css(styles.input)} type="number" defaultValue={1} />
                </span>
            </div>
        </div>);
    }

}

type propType = {
    total: number,
    canUseTip?: boolean,
    canUseBalances?: boolean,
    balances?: any,
    submitPayment: (payment: DropInResult | null, extra: { useBalance: boolean, useEarnings: boolean, neededPayment: boolean, tip: number }) => void
};

type stateType = {
    clientToken: string | null,
    payment: DropInResult | null,
    useBalance: boolean,
    useEarnings: boolean,
    balance: number,
    earnings: number,
    tip: number
};

class Checkout extends React.Component<propType, stateType> {

    balanceRef: React.RefObject<HTMLInputElement>;
    earningsRef: React.RefObject<HTMLInputElement>;

    constructor(props: propType) {
        super(props);
        var { balances } = props;

        this.state = {
            clientToken: null,
            payment: null,
            useBalance: false,
            useEarnings: false,
            balance: balances[0] === undefined ? 0 : balances[0],
            earnings: balances[1] === undefined ? 0 : balances[1],
            tip: 0
        }

        this.balanceRef = React.createRef();
        this.earningsRef = React.createRef();

        // Load balance and earning into redux
        store.dispatch(fetchBalances());
    }

    getBalanceAmount(): number {
        var { useEarnings, useBalance, balance, earnings } = this.state;
        return useBalance ? balance : useEarnings ? earnings : 0;
    }

    // Returns total amount needed for payment if earnings/balance doesn't cover the full price or isn't used
    getPaymentTotal() {
        var total = this.props.total + this.state.tip;
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

        if (!this.props.canUseBalances || (balance == 0 && earnings == 0)) return "";

        return (
            <Fragment>

                <div>
                    <div className={css(styles.title)}>
                        Additional Payment Options
                    </div>

                    <div className={css(styles.useBalance)}
                        style={{ display: balance === 0 ? "none" : "flex" }}>
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
                <div className={css(styles.spacer)} />
            </Fragment>
        );
    }

    paymentUpdate = (payment: DropInResult) => {
        this.setState({ payment });
    }

    submitPayment = () => {
        var { payment, useBalance, useEarnings, tip } = this.state;
        this.props.submitPayment(payment, { useBalance, useEarnings, neededPayment: this.getPaymentTotal() > 0, tip });
    }

    render() {
        var total = this.getPaymentTotal();

        return (
            <Screen
                appBar={{
                    title: "Checkout", backBtn: true
                }}>
                <ThemeProvider theme={theme}>
                    <div className={css(styles.container)}>
                        <PaymentMethodSelection paymentUpdate={this.paymentUpdate} total={total} />
                        <div className={css(styles.spacer)} />
                        {this.renderBalanceSelection()}
                        {this.props.canUseTip ? <TipSelection onChange={(tip: number) => { this.setState({ tip }); console.log(tip) }} /> : ""}

                        <Button
                            onClick={this.submitPayment}
                            rightText={"$" + formatPrice(total, false)}
                        >
                            Pay Now
                        </Button>
                    </div>
                    <div className={css(styles.footer)}>
                    </div>
                </ThemeProvider>
            </Screen>
        );
    }

}

export default connect(({ balances }: any) => ({ balances: balances }))(Checkout);

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1.1em",
        marginBottom: "20px"
    },
    spacer: {
        width: "calc(100% - 20px)",
        height: "1px",
        marginLeft: "10px",
        backgroundColor: "#ccc",
        marginBottom: "15px"
    },
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
        flexDirection: "row"
    },
    disabled: {
        opacity: 0.38
    },
    footer: {
        padding: "15px 20px"
    },
    paymentSelection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px 20px"
    },
    paymentInfo: {
        display: "flex",
        flexDirection: "row"
    },
    centerContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    tipSelection: {
        display: "grid",
        gridTemplateColumns: "20% 20% 20% 20% 20%",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "5px",
        overflow: "hidden"
    },
    tipAmount: {
        height: "50px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRight: "1px solid black"
    },
    tipSelected: {
        backgroundColor: "#515151",
        color: "white"
    },
    customTip: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "calc(100%-12px)",
        height: "50px",
        padding: "5px 10px",
        margin: "0 6px 30px 6px",
        border: "1px solid black",
        borderTop: "none",
        borderRadius: "0 0 5px 5px",
        fontSize: "1.1em",
        overflow: "hidden",
        transition: "height 0.3s, padding 0.3s, border 0.3s"
    },
    customTipClosed: {
        height: 0,
        padding: "0 10px",
        borderBottom: 0
    },
    input: {
        width: "50px",
        height: "100%",
        textAlign: "center",
        backgroundColor: "#bbb",
        marginLeft: "5px"
    }
});