import React from 'react';
import { getOrder, formatPrice, getOrderItems, updateOrderState, showErrors } from '../assets/scripts/Util';

export default class OrderScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: null,
            items: null
        };
        this.fetchData();
    }

    async fetchData() {
        var order = await getOrder(this.props.apiToken, this.props.orderId);
        var items = await getOrderItems(this.props.apiToken, this.props.orderId);
        console.log(order);
        console.log(items);
        this.setState({order, items});
    }

    async claimOrder() {
        var result = await updateOrderState(this.props.apiToken, this.props.orderId, "claimed");
        if (!result.success) {
            showErrors([result.msg]);
        } else {
            this.fetchData();
        }
    }

    async readyToPay() {
        
    }

    render() {
        if (this.state.order == null)
            return (<span>Loading</span>);

        
        var button = null;
        if (this.state.order.state === "unclaimed") {
            button = (<button className="checkoutButton" onClick={()=>this.claimOrder()}>Accept</button>);
        } else if (this.state.order.state === "claimed") {
            button = (<button className="checkoutButton" onClick={()=>this.readyToPay()}>Ready To Pay</button>);
        }
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">{this.state.order.restaurant_name}</span>
                    </div>
                </div>

                <div className="orderAddress">{this.state.order.address}</div>

                <div className="cartList">
                    {
                        this.state.items.map((value, index) => {
                            return (
                                <div className="cartItem" key={index}>
                                    <div className="imageHolder img-fill"><img alt="test" src={value.image}/></div>
                                    <div className="cartItemInfo">
                                        <div className="cartItemHeader">
                                        <span className="cartItemName">{value.name} x{value.amount}</span>
                                            <span className="cartItemPrice">${formatPrice(value.price * value.amount)}</span>
                                        </div>
                                        <div className="cartItemDescription">
                                            {value.comment}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="cartFooter">
                    {/* {formatPrice(this.total)} */}
                    <div className="total">Total<span className="price">${formatPrice(this.state.order.total)}</span></div>
                    {button}
                </div>
            </div>
        );
    }

}