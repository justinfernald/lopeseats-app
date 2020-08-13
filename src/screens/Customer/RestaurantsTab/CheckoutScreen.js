import React from "react";
import DropIn from "braintree-web-drop-in-react";
import {
    sendPayment,
    getCartPrices,
    formatPrice,
} from "../../../assets/scripts/Util";
import LopesEatLogo from "../../../assets/images/icon-384x384.png";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";

class CheckoutScreen extends React.Component {
    instance;
    fee = 0;

    state = {
        clientToken: null,
    };

    async componentDidMount() {
        const response = await fetch(
            "https://lopeseat.com/REST/requestToken.php"
        );
        const clientToken = await response.json();

        console.log(clientToken);

        var prices = await getCartPrices(this.props.apiToken);
        this.fee = prices.delivery_fee;

        this.setState({
            clientToken,
        });
        this.forceUpdate();
    }

    async pay() {
        if (this.instance.isPaymentMethodRequestable()) {
            const { nonce } = await this.instance.requestPaymentMethod();
            await sendPayment(nonce, this.props.address, this.props.apiToken);
            this.props.history.go(-(this.props.history.length - 2));
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
                    title: "Checkout",
                    onBack: this.props.history.goBack,
                }}>
                {dropin}
                <div
                    className="cartFooter"
                    style={{
                        position: "fixed",
                        bottom: 0,
                    }}>
                    <div className="total">
                        Delivery Fee
                        <span className="price">${formatPrice(this.fee)}</span>
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

export default connect(({apiToken, address}) => ({apiToken, address}))(CheckoutScreen);