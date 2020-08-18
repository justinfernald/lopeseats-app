import React from "react";
import { getActiveOrderList } from "../../assets/scripts/Util";
import { connect } from "react-redux";
class ActiveOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
        };
        console.log(props);
        this.fetchData();
    }

    async fetchData() {
        var orders = await getActiveOrderList(this.props.apiToken);
        console.log(this.props.apiToken + " " + orders);
        this.setState({ orders });
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <div className="restaurantTop">
                    <div className="header">
                        <i
                            className="icon material-icons-round"
                            onClick={this.props.onBack}>
                            arrow_back_ios
                        </i>
                        <span className="screenTitle">Active Orders</span>
                    </div>
                </div>

                <div className="incomingOrderList">
                    {this.state.orders == null
                        ? "Loading"
                        : this.state.orders.map((value, index) => {
                              return (
                                  <div
                                      onClick={async () =>
                                          this.props.openOrderScreen(value)
                                      }
                                      key={index}
                                      className="incomingOrder">
                                      <div className="orderTitle">
                                          {value.restaurant_name}
                                      </div>
                                      <div className="orderInfo">
                                          {value.address}
                                      </div>
                                  </div>
                              );
                          })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
    deliveryStartingTime,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
    deliveryStartingTime,
});

export default connect(mapStateToProps)(ActiveOrders);
