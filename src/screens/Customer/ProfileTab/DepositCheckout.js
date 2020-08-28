import React from "react";
import DropIn from "braintree-web-drop-in-react";
import {
    sendDepositPayment,
} from "../../../assets/scripts/Util";
import LopesEatLogo from "../../../assets/images/icon-384x384.png";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";

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
    }

    async pay() {
        var { amount, toFriend, friendsPhone } = this.props.depositData;
        if (!this.instance) return;
        if (this.instance.isPaymentMethodRequestable()) {
            const { nonce } = await this.instance.requestPaymentMethod();
            await sendDepositPayment(nonce, amount, toFriend ? friendsPhone : null, this.props.apiToken);
            this.props.history.push("/app/home");
            // this.props.history.go(-(this.props.history.length - 2));
        }
    }

    render() {
        var dropin = !this.state.clientToken ? (
            <div className="loadingWrapper">
                <img className="lopeImage" src={LopesEatLogo} alt="Logo" />
                <div className="loadingText">
                    Loading payment authorization. One moment please
                </div>
            </div>
        ) : (
            <DropIn
                options={{
                    authorization: this.state.clientToken,
                    paypal: true,
                    venmo: true,
                }}
                onInstance={(instance) => (this.instance = instance)}
            />
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
