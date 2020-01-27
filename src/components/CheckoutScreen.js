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
        const {nonce} = await this.instance.requestPaymentMethod();
        await sendPayment(nonce, "testAddress", this.props.apiToken);
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
                            <span className="screenTitle">Cart</span>
                        </div>
                    </div>
                    <DropIn
                        options = {{authorization: this.state.clientToken}}
                        onInstance={instance => (this.instance = instance)}
                        card
                        paypal
                        venmo
                    />
                    <button className="payButton" onClick={this.pay.bind(this)}>Pay Now</button>
                </div>
            );
        }
    }

}