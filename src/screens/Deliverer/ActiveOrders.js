import React from "react";
import { getActiveOrderList, getAcceptableOrderWaiting } from "../../assets/scripts/Util";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Loading from "../Other/Loading";
import { timeSince } from "../../assets/scripts/Util";
import { IonRippleEffect } from "@ionic/react";
import { store, actions } from "../../Redux";

const OrderListItem = ({ order, onClick, acceptable }) => {
    if (acceptable) {
        return <div className={"ion-activatable " + css(styles.order)} onClick={onClick}>
            <div className={css(styles.customerName)}>{"Available Order"}</div>
            <div className={css(styles.orderInformation)}>
                <div>
                    <div className={css(styles.keyValuePair)}>
                        <div className={css(styles.key)}>Restaurant</div>
                        <div className={css(styles.value)}>
                            {order.restaurantName}
                        </div>
                    </div>
                </div>
            </div>
            <IonRippleEffect />
        </div>
    }
    return (
        <div className={"ion-activatable " + css(styles.order)} onClick={onClick}>
            <div className={css(styles.customerName)}>{order.customerName}</div>
            <div className={css(styles.orderInformation)}>
                <div>
                    <div className={css(styles.keyValuePair)}>
                        <div className={css(styles.key)}>Order Status</div>
                        <div className={css(styles.value)}>
                            {statusToString(order.orderState)}
                        </div>
                    </div>
                    <div className={css(styles.keyValuePair)}>
                        <div className={css(styles.key)}></div>
                        <div className={css(styles.value)}>
                            {timeSince(order[statusToTime(order.orderState)])} ago
                    </div>
                    </div>
                    <div className={css(styles.keyValuePair)}>
                        <div className={css(styles.key)}>Claimed Time</div>
                        <div className={css(styles.value)}>
                            {timeSince(order.timeClaimed)} ago
                    </div>
                    </div>
                    <div className={css(styles.keyValuePair)}>
                        <div className={css(styles.key)}>Destination</div>
                        <div className={css(styles.value)}>{order.address}</div>
                    </div>
                    <div className={css(styles.keyValuePair)}>
                        <div className={css(styles.key)}>Restaurant</div>
                        <div className={css(styles.value)}>
                            {order.restaurantName}
                        </div>
                    </div>
                </div>
            </div>
            <IonRippleEffect />
        </div>
    )
};
class ActiveOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
            acceptableOrders: null
        };

        this.fetchData();
    }

    componentDidMount() {
        this._isMounted = true;
        this.interval = setInterval(() => this.fetchData(), 1000);
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.interval);
    }

    async fetchData() {
        var orders = await getActiveOrderList(this.props.apiToken);
        var acceptableOrders = await getAcceptableOrderWaiting(this.props.apiToken);
        if (!acceptableOrders || !acceptableOrders.success) return;
        if (!orders.length) orders.length = 0;
        acceptableOrders = acceptableOrders.msg;
        if (!acceptableOrders.length) acceptableOrders.length = 0;
        let totalCount = orders.length + acceptableOrders.length;
        store.dispatch(actions.setActiveOrderCount(totalCount));
        if (totalCount === 0) this.props.history.push("/app/deliverer");
        if (!this._isMounted) return;
        this.setState({ orders, acceptableOrders });
    }

    openOrder(orderId, history) {
        history.push("/app/deliverer/orders/" + orderId);
    }

    openOrderAvaliable(orderId, history) {
        history.push("/app/deliverer/accept/" + orderId);
    }

    render() {
        if (!this.state.orders)
            return (
                <Loading message={"Your active orders loading. Please wait."} />
            );
        return (
            <Screen
                appBar={{
                    title: "Active Orders", backBtn: true
                }}>
                <div className={css(styles.orderList)}>
                    {this.state.acceptableOrders && this.state.acceptableOrders.length > 0 ? this.state.acceptableOrders.map((order, index) => (
                        <OrderListItem
                            key={index}
                            order={order}
                            acceptable
                            onClick={() => {
                                this.openOrderAvaliable(
                                    order.id,
                                    this.props.history
                                );
                            }}
                        />
                    )) : null}
                    {this.state.orders.map((order, index) => (
                        <OrderListItem
                            key={index}
                            order={order}
                            onClick={() => {
                                this.openOrder(
                                    order.orderId,
                                    this.props.history
                                );
                            }}
                        />
                    ))}
                </div>
            </Screen>
        );
    }
}

const statusToString = (status) => {
    const map = {
        claimed: "Claimed",
        "en route": "En Route",
        arrived: "Arrived",
    };

    return map[status];
};

const statusToTime = (status) => {
    const map = {
        claimed: "timeClaimed",
        "en route": "timeEnRoute",
        arrived: "timeArrived",
    };

    return map[status];
};

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
        position: "relative",
        borderRadius: 7,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        background: "#fff",
        padding: 10,
        marginBottom: 10,
        overflow: "hidden",
    },
    keyValuePair: {
        display: "flex",
        justifyContent: "space-between",
        minWidth: 230,
    },
    key: {
        marginRight: 14,
    },
    value: {
        marginLeft: 14,
    },
    customerName: {
        textAlign: "center",
        fontSize: "1.1em",
        fontWeight: 500,
    },
    orderInformation: {
        display: "flex",
        justifyContent: "center",
    },
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
