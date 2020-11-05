import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import {
    getActiveOrder,
    formatPrice,
    timeSince,
    updateOrderState,
    postToAPI,
} from "../../assets/scripts/Util";
import Screen from "../../components/Screen";
import { IonIcon, IonSpinner, IonRippleEffect } from "@ionic/react";
import { cardOutline } from "ionicons/icons";
import Button from "../../components/Button";
import BlackMessageIcon from "../../assets/images/messages-black.svg";
import { store, actions } from "../../Redux";

const OrderItem = ({ item }) => (
    <div className={css(styles.orderItem)}>
        <div className={css(styles.itemTopInformation)}>
            <div className={css(styles.itemTopInformationLeft)}>
                <div className={"img-fill " + css(styles.itemImage)}>
                    <img src={item.image} alt={"Item"} />
                </div>
                <div className={css(styles.itemName)}>{item.name}</div>
            </div>
            <div className={css(styles.itemCost)}>
                ${formatPrice(item.price, false)}
            </div>
        </div>
        <div className={css(styles.subItems)}>
            {item.items.map((subItem, subIndex) => item.options[subIndex] ? (
                <SubItem
                    options={Object.entries(item.options[subIndex])}
                    subItem={subItem}
                    key={subIndex}
                    meal={item.items.length > 1}
                />
            ) : null)}
        </div>
    </div>
);

const SubItem = ({ options, subItem, meal }) => (
    <div className={css(styles.subItem)}>
        {meal ? (
            <div className={css(styles.subItemName)}>{subItem.name}</div>
        ) : null}
        <div className={css(styles.subItemOptions)}>
            {options.map(([optionKey, optionValue], optionIndex) => (
                <div key={optionIndex} className={css(styles.subItemOption)}>
                    <div className={css(styles.subItemOptionKey)}>
                        {optionKey}
                    </div>
                    <div className={css(styles.subItemOptionValue)}>
                        {optionValue}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const orderStates = [
    "unclaimed",
    "claimed",
    "en route",
    "arrived",
    "completed",
    "cancelled",
];
class SelectedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
        };
        this.fetchData();
    }

    async fetchData() {
        var order = await getActiveOrder(
            this.props.apiToken,
            this.props.match.params.id
        );
        if (!order.success) {
            this.props.history.goBack();
            return;
        }
        this.setState({ order: order.msg });
    }

    changeStatus = async () => {
        const nextState =
            orderStates[orderStates.indexOf(this.state.order.orderState) + 1];
        if (
            (
                await updateOrderState(
                    this.props.apiToken,
                    this.state.order.orderId,
                    nextState
                )
            ).success
        ) {
            this.setState({
                order: { ...this.state.order, orderState: nextState },
            });
            this.fetchData();

            const activeOrderCountResponse = await postToAPI("/order/getActiveOrderCount.php",
                {
                    apiToken: this.props.apiToken,
                }
            );

            if (activeOrderCountResponse.success) {
                store.dispatch(
                    actions.setActiveOrderCount(activeOrderCountResponse.msg)
                );
            } else {
                store.dispatch(actions.setActiveOrderCount(0));
            }
        }
    };

    render() {
        // customer name
        // all delivery status details
        // restaurant
        // drop off location
        // order items
        // customer message button
        // status changer button
        // final payment screen button
        const { order } = this.state;
        return (
            <Screen
                appBar={{
                    title: "Order",
                    backBtn: true,
                    icon: <div className={css(styles.messageButton)} />,
                    onIconClick: () => {
                        store.dispatch(
                            actions.setMessageOrderId(this.state.order.orderId)
                        );
                        this.props.history.push("/app/deliverer/message");
                    },
                }}>
                {!this.state.order ? (
                    <div className={css(styles.spinner)}>
                        <IonSpinner color="primary" />
                    </div>
                ) : (
                        <div className={css(styles.container)}>
                            <div className={css(styles.content)}>
                                <div className={css(styles.customerName)}>
                                    {order.customerName}
                                </div>
                                <div className={css(styles.locationContainer)}>
                                    <div className={css(styles.keyValuePair)}>
                                        <div className={css(styles.key)}>
                                            Destination
                                    </div>
                                        <div className={css(styles.value)}>
                                            {order.address}
                                        </div>
                                    </div>
                                    <div className={css(styles.keyValuePair)}>
                                        <div className={css(styles.key)}>
                                            Restaurant
                                    </div>
                                        <div className={css(styles.value)}>
                                            {order.restaurantName}
                                        </div>
                                    </div>
                                </div>
                                <div className={css(styles.deliveryStatuses)}>
                                    <div
                                        className={css(
                                            styles.deliveryStatusesTitle
                                        )}>
                                        Delivery Status
                                </div>
                                    <div className={css(styles.timeKeyValuePair)}>
                                        <div className={css(styles.timeKey)}>
                                            Placed
                                    </div>
                                        <div className={css(styles.timeValue)}>
                                            {timeSince(order.timePlaced) + " ago"}
                                        </div>
                                    </div>
                                    <div className={css(styles.timeKeyValuePair)}>
                                        <div className={css(styles.timeKey)}>
                                            Claimed
                                    </div>
                                        <div className={css(styles.timeValue)}>
                                            {timeSince(order.timeClaimed) + " ago"}
                                        </div>
                                    </div>
                                    <div className={css(styles.timeKeyValuePair)}>
                                        <div className={css(styles.timeKey)}>
                                            En Route
                                    </div>
                                        <div className={css(styles.timeValue)}>
                                            {order.timeEnRoute
                                                ? timeSince(order.timeEnRoute) +
                                                " ago"
                                                : "Pending"}
                                        </div>
                                    </div>
                                    <div className={css(styles.timeKeyValuePair)}>
                                        <div className={css(styles.timeKey)}>
                                            Arrived
                                    </div>
                                        <div className={css(styles.timeValue)}>
                                            {order.timeArrived
                                                ? timeSince(order.timeArrived) +
                                                " ago"
                                                : "Pending"}
                                        </div>
                                    </div>
                                </div>
                                <div className={css(styles.orderItems)}>
                                    {order.items.map((item, index) => (
                                        <OrderItem item={item} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className={css(styles.buttonContainer)}>
                                <Button
                                    style={styles.statusChangeButton}
                                    onClick={this.changeStatus}>
                                    Change Status to {nextStatus[order.orderState]}
                                </Button>
                                <div
                                    onClick={() => {
                                        store.dispatch(
                                            actions.setMessageOrderId(
                                                this.state.order.orderId
                                            )
                                        );
                                        this.props.history.push(
                                            "/app/deliverer/payment/" +
                                            this.state.order.orderId,
                                            { order: this.state.order }
                                        );
                                    }}
                                    className={
                                        "ion-activatable " +
                                        css(styles.paymentButton)
                                    }>
                                    <IonIcon
                                        icon={cardOutline}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            color: "#fff",
                                        }}
                                    />
                                    <IonRippleEffect />
                                </div>
                            </div>
                        </div>
                    )}
            </Screen>
        );
    }
}

const nextStatus = {
    claimed: "En Route",
    "en route": "Arrived",
    arrived: "Completed",
};

const styles = StyleSheet.create({
    spinner: {
        paddingTop: 15,
        display: "flex",
        justifyContent: "center",
    },
    container: {
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 10,
    },
    content: {
        flex: 1,
    },
    customerName: {
        fontSize: "1.3em",
        fontWeight: 500,
        textAlign: "center",
    },
    locationContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "1.5px solid #bbb",
        paddingBottom: 10,
        marginBottom: 14,
    },
    keyValuePair: {
        display: "flex",
        justifyContent: "space-between",
        minWidth: 272,
        fontSize: "1.2em",
    },
    key: {
        marginRight: 14,
    },
    value: {
        marginLeft: 14,
    },
    deliveryStatuses: {
        borderRadius: 7,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        marginBottom: 10,
        background: "#fff",
        overflow: "hidden",
        fontSize: "1.1em",
        padding: "7px 30px",
    },
    deliveryStatusesTitle: {
        fontSize: "1.2em",
        fontWeight: 500,
        textAlign: "center",
        borderBottom: "1px solid #ddd",
        paddingBottom: 6,
        marginBottom: 6,
    },
    timeKeyValuePair: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 3,
    },
    timeKey: {},
    timeValue: {},
    orderItems: {},
    orderItem: {
        minHeight: 60,
        borderRadius: 7,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        marginBottom: 10,
        background: "#fff",
        overflow: "hidden",
    },
    itemTopInformation: {
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
    },
    itemTopInformationLeft: {
        display: "flex",
    },
    itemImage: {
        height: "100%",
        width: 60,
        marginRight: 10,
    },
    itemName: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        fontSize: "1.1em",
    },
    itemCost: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        marginRight: 10,
        fontSize: "1.1em",
    },
    subItems: {
        padding: "7px 30px",
    },
    subItem: {},
    subItemName: {
        fontWeight: 500,
        marginBottom: 2,
        borderBottom: "1px solid #ccc",
        paddingBottom: 5,
    },
    subItemOptions: {
        padding: "0 10px",
    },
    subItemOption: {
        display: "flex",
        justifyContent: "space-between",
    },
    subItemOptionKey: {},
    subItemOptionValue: {},
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        fontSize: ".7em",

    },
    statusChangeButton: {
        flex: 1,
    },
    messageButton: {
        background: `url(${BlackMessageIcon})`,
        backgroundSize: "cover",
        width: 30,
        height: 28,
    },
    paymentButton: {
        marginLeft: 10,
        height: 53.8,
        width: 53.8,
        padding: 11,
        borderRadius: "50%",
        background: "#32ba36",
        position: "relative",
        overflow: "hidden",
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

export default connect(mapStateToProps)(SelectedOrder);
