import React from 'react';
import { getCompletedOrderList, formatPrice } from '../../assets/scripts/Util';

export default class Payouts extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            orders: null
        }
        this.fetchData();
    }

    async fetchData() {
        var orders = await getCompletedOrderList(this.props.apiToken);
        console.log(this.props.apiToken + " " + orders);
        this.setState({orders});
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

                <div className="incomingOrderList">
                    {
                    this.state.orders == null ? "Loading" : 
                    this.state.orders.map((value, index) => {
                    var color = value.payoutReceived == 1 ? "#0a0" : "#f00";
                    return (
                    <div key={index} className="incomingOrder">
                        <div>
                            <div className="payoutStatus" style={{color: color}}>
                                Pay out {value.payoutReceived == 1 ? "" : "not "}received
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
            </div>
        );
    }

}