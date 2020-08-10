import React from "react";
import { getIncomingOrderList, parseDate } from "../../assets/scripts/Util";
import { Redirect } from "react-router";

export default class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
        };
        this.fetchData();
    }

    async fetchData() {
        var orders = await getIncomingOrderList(this.props.apiToken);
        console.log(this.props.apiToken + " " + orders);
        this.setState({ orders });
    }

    render() {
        console.log(this.state.orders);
        if (this.state.orders && !this.state.orders.success)
            return <Redirect to="/app/home" />;
        return (
            <div className="flexDisplay fillHeight incomingOrders">
                <div className="restaurantTop">
                    <div className="header">
                        <i
                            className="icon material-icons-round"
                            onClick={this.props.onBack}>
                            arrow_back_ios
                        </i>
                        <span className="screenTitle">Incoming Orders</span>
                    </div>
                </div>

                <div className="incomingOrderList">
                    {this.state.orders == null
                        ? "Loading"
                        : this.state.orders.map((value, index) => {
                              return (
                                  // <div onClick={async () => this.props.openOrderScreen(value)} key={index} className="incomingOrder">
                                  //     <div className="orderTitle">{value.restaurant_name}</div>
                                  //     <div className="orderInfo">{value.address}</div>
                                  // </div>

                                  <div
                                      onClick={async () =>
                                          this.props.openOrderScreen(value)
                                      }
                                      key={index}
                                      className="incomingOrder">
                                      <div className="incomingOrderHead">
                                          <div className="orderTitle">
                                              {value.restaurant_name}
                                          </div>
                                          <div className="orderTime">
                                              {parseDate(value.placed)}
                                          </div>
                                      </div>
                                      <div className="orderInfo">
                                          <div>
                                              <span>Deliver To:</span>
                                              <span>{value.address}</span>
                                          </div>
                                          <div>
                                              <span>Price:</span>
                                              <span>${value.total}</span>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                </div>
            </div>
        );
    }
}
