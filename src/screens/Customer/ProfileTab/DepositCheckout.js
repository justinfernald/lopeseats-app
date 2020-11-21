import React from "react";
// import {
//     sendDepositPayment,
// } from "../../../assets/scripts/Util";
// import LopesEatLogo from "../../../assets/images/icon-384x384.png";
// import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { fetchBalances } from "../../../Redux/Thunks";
import { Braintree } from 'capacitor-braintree-dropin';
import Checkout from '../../../components/Checkout';
import { requestBraintreeToken, sendDepositPayment } from '../../../assets/scripts/Util';
// import {
//     Capacitor,
//     Plugins,
// } from "@capacitor/core";

// const { App: PApp, BraintreePlugin } = Plugins;

class DepositCheckout extends React.Component {
    instance;

    constructor(props) {
        super(props);

        this.state = {
            clientToken: null
        };
    }

    async componentDidMount() {
        const response = await requestBraintreeToken()
        const clientToken = await response.json();

        console.log(clientToken);

        this.setState({
            clientToken
        });

        this.braintree = new Braintree();
        this.braintree.setToken({
            token: clientToken
        }).catch((error) => {
            console.log(error);
        });
    }

    getPayment = () => {
        var { amount } = this.props.depositData;

        this.braintree.showDropIn({
            amount
        }).then(
            (payment) => {
                console.log("Payment: ");
                console.log(JSON.stringify(payment));
            }).catch((error) => {
                console.log(error);
            });
    }

    pay = async (payment) => {
        if (!payment) return;
        var { amount, toFriend, friendsPhone } = this.props.depositData;
        var { nonce } = payment;

        var result = await sendDepositPayment(nonce, amount, toFriend ? friendsPhone : null, this.props.apiToken);

        if (result.success) {
            store.dispatch(fetchBalances(this.props.apiToken));

            this.props.history.push("/app/profile");
            store.dispatch(actions.setHistorySize(0));
        }
    }

    render() {
        return <Checkout total={this.props.depositData.amount} submitPayment={this.pay} />;
    }
}

export default connect(({ apiToken, depositData }) => ({ apiToken, depositData }))(
    DepositCheckout
);
