import React from "react";
import { getActiveOrderList } from "../../assets/scripts/Util";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Loading from "../Other/Loading";
import { sleep } from "../../assets/scripts/Util";

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
        await sleep(1000);
        this.setState({ orders });
    }

    render() {
        if (!this.state.orders)
            return (
                <Loading message={"Your active orders loading. Please wait."} />
            );
        return (
            <Screen
                appBar={{
                    title: "Active Orders",
                    onBack: this.props.history.goBack,
                }}>
                <div className={css(styles.orderList)}>
                    {this.state.orders.map((value, index) => {
                        console.log(value);
                        // customer name
                        // current status
                        // time of status
                        // time of claimed order
                        // restaurant
                        // destination

                        return (
                            <div key={index} className={css(styles.order)}>
                                <div>
                                    <div>{value.user_id}</div>
                                </div>
                                <div>
                                    <div
                                        className={css(styles.restaurantTitle)}>
                                        {value.restaurant_name}
                                    </div>
                                    <div className={css(styles.address)}>
                                        {value.address}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    orderList: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 9,
        color: "#000",
        background: "#f6f6f6",
    },
    order: {
        height: 150,
        borderRadius: 7,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        background: "#fff",
    },
    restaurantTitle: {},
    address: {},
});

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
