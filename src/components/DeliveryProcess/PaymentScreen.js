import React from 'react';
import Barcode from 'react-barcode';
import { getOrderPaymentInfo, updateOrderState } from '../../assets/scripts/Util';

export default class PaymentScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: "20552343",
            image: null
        };
        this.fetchData();
    }

    async fetchData() {
        var data = await getOrderPaymentInfo(this.props.apiToken, this.props.orderId);
        console.log(data);
        this.setState({
            studentId: data.student_id,
            image: data.deliverer_image
        });
    }

    async paymentComplete() {
        await updateOrderState(this.props.apiToken, this.props.orderId, "en route");
        this.props.paymentComplete(this.props.orderId);
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        {/* <span className="screenTitle">{this.state.order.restaurant_name}</span> */}
                        <img className="paymentLogo" src={require("../../assets/images/lopeseatboxlogo.png")}></img>
                    </div>
                </div>

                <div className="paymentContent">
                    <img className="delivererImage" src={this.state.image}></img>
                    {/*<div className="barcodeContainer"><Barcode value={this.state.studentId} displayValue={false}></Barcode></div>*/}
                </div>

                <div className="cartFooter">
                    <button className="checkoutButton" onClick={()=>this.paymentComplete()}>Payment Complete</button>
                    <div className="messageButton" onClick={() => this.props.onMessageClick(this.props.orderId)}></div>
                </div>
            </div>
        );
    }

}