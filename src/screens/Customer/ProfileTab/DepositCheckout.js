import React from "react";
import {
    sendDepositPayment,
} from "../../../assets/scripts/Util";
import LopesEatLogo from "../../../assets/images/icon-384x384.png";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { fetchBalances } from "../../../Redux/Thunks";
import {Braintree} from 'capacitor-braintree-dropin';
import Checkout from '../../../components/Checkout';
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
        const response = await fetch(
            "https://lopeseat.com/REST/order/requestBraintreeToken.php"
        );
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
        var { amount, toFriend, friendsPhone } = this.props.depositData;
        var { nonce } = payment;

        // await sendDepositPayment(nonce, amount, toFriend ? friendsPhone : null, this.props.apiToken);

        store.dispatch(fetchBalances(this.props.apiToken));

        this.props.history.push("/app/profile");
        store.dispatch(actions.setHistorySize(0));
    }

    render() {
        return <Checkout total={this.props.depositData.amount} submitPayment={this.pay}/>;

        var dropin = !this.state.clientToken ? (
            <div className="loadingWrapper">
                <img className="lopeImage" src={LopesEatLogo} alt="Logo" />
                <div className="loadingText">
                    Loading payment authorization. One moment please
                </div>
            </div>
        ) : (
            <div onClick={() => this.getPayment()}>Test</div>
            // TODO web braintree implementation
            // <DropIn
            //     options={{
            //         authorization: this.state.clientToken,
            //         paypal: true,
            //     }}
            //     onInstance={(instance) => {this.instance = instance;}}
            // />
        );
        return (
            <Screen
                appBar={{
                    title: "Checkout", backBtn: true
                }}>
                <div style={{padding: "20px 10px 0 10px"}}>
                    {dropin}
                </div>
                <div
                    className="cartFooter"
                    style={{
                        position: "fixed",
                        bottom: 0,
                    }}>
                    <div className="total">
                        Total
                        <span className="price">${this.props.depositData.amount}</span>
                    </div>
                    <button
                        className="checkoutButton"
                        onClick={this.pay.bind(this)}>
                        Pay Now
                    </button>
                </div>
            </Screen>
        );
    }
}

export default connect(({ apiToken, depositData }) => ({ apiToken, depositData }))(
    DepositCheckout
);
