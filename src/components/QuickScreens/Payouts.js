/* eslint-disable eqeqeq */
import React from 'react';
import { getCompletedOrderList, formatPrice, getPayoutTotal, getPayoutStatus, requestPayout } from '../../assets/scripts/Util';

export default class Payouts extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            orders: null,
            payoutTotal: 0,
            loadingBox: false
        }
        this.fetchData();
    }

    async fetchData() {
        var orders = await getCompletedOrderList(this.props.apiToken);
        var payoutTotal = await getPayoutTotal(this.props.apiToken);
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            var payoutStatus = await getPayoutStatus(this.props.apiToken, order.id);
            order.status = payoutStatus.status;
            console.log(order);
        }
        payoutTotal = payoutTotal.total;
        this.setState({orders, payoutTotal});
    }

    async sendPayoutRequest() {
        await requestPayout(this.props.apiToken);
        this.setState({orders: null});
        this.fetchData();
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Incoming Orders</span>
                    </div>
                </div>

                {/* <div className="loadingBox"><img alt="Loading" src={require("../../assets/images/loading.gif")}></img></div> */}

                <div className="incomingOrderList">
                    {
                    this.state.orders == null ? "Loading" : 
                    this.state.orders.map((value, index) => {
                    var color = value.payoutReceived == 1 ? "#0a0" : "#f00";
                    return (
                    <div key={index} className="incomingOrder">
                        <div>
                            <div className="payoutStatus" style={{color: color}}>
                                Pay out {value.payoutReceived == 1 ? value.status : "not received"}
                                <br/>
                                ${formatPrice(value.delivery_fee/2)}
                            </div>
                        </div>
                        <div className="orderTitle">{value.restaurant_name}</div>
                        <div className="orderInfo">{value.address}</div>
                    </div>
                    )
                    })
                    }
                </div>

                <div className="cartFooter">
                    {/* {formatPrice(this.total)} */}
                    <div className="total">Available Payout<span className="price">${formatPrice(this.state.payoutTotal)}</span></div>
                    <button onClick={() => {if (this.state.payoutTotal > 0) this.sendPayoutRequest()}} className={"checkoutButton" + (this.state.payoutTotal == 0 ? " disabled" : "")}>Request Payout</button>
                </div>
            </div>
        );
    }

}