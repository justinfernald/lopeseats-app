import React from "react";
import { getIncomingOrderList, parseDate } from "../../assets/scripts/Util";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Loading from "../Other/Loading";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
        };
        this.fetchData();
    }

    async fetchData() {
        var orders = await getIncomingOrderList(this.props.apiToken);
        if (orders.success === false) this.props.history.push("/app/home");
        else this.setState({ orders });
    }

    render() {
        if (!this.state.orders) {
            return <Loading message="Orders loading" />;
        }

        return (
            <Screen
                appBar={{
                    title: "Incoming Orders", backBtn: true
                }}>
                <div className="incomingOrderList">
                    {this.state.orders == null
                        ? "Loading"
                        : this.state.orders.map((value, index) => (
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
                          ))}
                </div>
            </Screen>
        );
    }
}

const mapStateToProps = ({ apiToken, userDetails: { isDeliverer } }) => ({
    apiToken,
    isDeliverer,
});

export default connect(mapStateToProps)(IncomingOrders);
