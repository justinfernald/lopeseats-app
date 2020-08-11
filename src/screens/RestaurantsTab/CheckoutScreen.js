import React from "react";
import "../../App.css";
import DropIn from "braintree-web-drop-in-react";
import {
    sendPayment,
    getCartPrices,
    formatPrice,
    getScreenState,
} from "../../assets/scripts/Util";
import LopesEatLogo from "../../assets/images/icon-384x384.png";
import Screen from "../../components/Screen";

export default class CheckoutScreen extends React.Component {
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

        var screenState = getScreenState();

        var prices = await getCartPrices(screenState.apiToken);
        this.fee = prices.delivery_fee;

        this.setState({
            clientToken,
        });
        this.forceUpdate();
    }

    async pay() {
        var screenState = getScreenState();

        if (this.instance.isPaymentMethodRequestable()) {
            const { nonce } = await this.instance.requestPaymentMethod();
            await sendPayment(nonce, screenState.address, screenState.apiToken);
            this.props.history.go(-(this.props.history.length - 2));
        }
    }

    render() {
        var dropin = !this.state.clientToken ? (<div className="loadingWrapper">
                    <img className="lopeImage" src={LopesEatLogo} alt="Logo" />
                    <div className="loadingText">
                        Loading payment authorization. One moment please
                    </div>
                </div>) : (<DropIn
                        options={{
                            authorization: this.state.clientToken,
                            paypal: true,
                            venmo: true,
                        }}
                        onInstance={(instance) => (this.instance = instance)}
                    />);
        return (
            <Screen appBar={{title:"Checkout", onBack:this.props.history.goBack}}>
                {dropin}
                <div
                    className="cartFooter"
                    style={{
                        position: "fixed",
                        bottom: 0,
                    }}>
                    <div className="total">
                        Delivery Fee
                        <span className="price">
                            ${formatPrice(this.fee)}
                        </span>
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
