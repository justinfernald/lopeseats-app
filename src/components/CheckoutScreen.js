import React from 'react';
import '../App.css';
import DropIn from "braintree-web-drop-in-react";
import {sendPayment} from "../assets/scripts/Util";

export default class CheckoutScreen extends React.Component {

    instance;

    state = {
        clientToken: null
    }

    async componentDidMount() {
        const response = await fetch("https://lopeseat.com/REST/requestToken.php");
        const clientToken = await response.json();

        console.log(clientToken);

        this.setState({
            clientToken
        });
        this.forceUpdate();
    }

    async pay() {
        if (this.instance.isPaymentMethodRequestable()) {
            const {nonce} = await this.instance.requestPaymentMethod();
            await sendPayment(nonce, "testAddress", this.props.apiToken);
            this.props.paymentComplete();
        }
    }

    render() {
        if (!this.state.clientToken) {
            return (
                <div>
                  <h1>Loading...</h1>
                </div>
              );
        } else {
            return (
                <div className="flexDisplay fillHeight">             
                    <div className="restaurantTop">
                        <div className="header">
                            <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                            <span className="screenTitle">Checkout</span>
                        </div>
                    </div>
                    <DropIn
                        options = {{
                            authorization: this.state.clientToken,
                            paypal: true,
                            venmo: true
                        }}
                        onInstance={instance => (this.instance = instance)}
                    />
                    <div className="cartFooter" style={{
                        position: "fixed",
                        bottom: 0
                    }}>
                        <div className="total">Delivery Fee<span className="price">$3.99</span></div>
                        <button className="checkoutButton" onClick={this.pay.bind(this)}>Pay Now</button>
                    </div>
                </div>
            );
        }
    }

}