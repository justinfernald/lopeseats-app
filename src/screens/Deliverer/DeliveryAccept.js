import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
// import Button from "../../components/Button";
// import { store, actions } from "../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { getAcceptableOrder, timeSince, formatPrice, acceptDelivery, declineDelivery } from "../../assets/scripts/Util";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import Loading from "../Other/Loading";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivererStats: null,
            publicStats: null,
            order: null,
            timeLeft: null
        };
    }

    interval = null;

    componentDidMount() {
        this.fetchData(this.props.match.params.id);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async fetchData(id) {
        const timeAllowed = 600; // in seconds

        let returnedOrder = await getAcceptableOrder(this.props.apiToken, id);
        if (!returnedOrder.success) {
            this.props.history.replace("/app/deliverer");
            return;
        }

        // console.log(Date.now());
        // console.log(returnedOrder.msg.timeRequested)
        // console.log(timeAllowed - Math.floor((Date.now() - returnedOrder.msg.timeRequested) / 1000) + timeAllowed);

        this.setState({ timeLeft: timeAllowed - Math.floor((Date.now() - returnedOrder.msg.timeRequested) / 1000) })
        this.interval = setInterval(() => {
            if (this.state.timeLeft <= 0) {
                this.props.history.replace("/app/deliverer");
                clearInterval(this.interval);
                return;
            }
            this.setState((state) => ({ timeLeft: state.timeLeft - 1 }));
        }, 1000)
        this.setState({ order: returnedOrder.msg });
    }

    onAcceptClick = async () => {
        if (this.state.timeLeft <= 0) return;
        acceptDelivery(this.props.apiToken, this.state.order.orderId);
        this.props.history.goBack();
    }

    onDeclineClick = async () => {
        if (this.state.timeLeft <= 0) return;
        declineDelivery(this.props.apiToken, this.state.order.orderId);
        this.props.history.goBack();
    }

    render() {
        if (!this.state.order)
            return <Loading message="Order accept loading. Please Wait." />;
        return (
            <Screen
                appBar={{
                    title: "Delivery Accept", backBtn: true
                }}>
                <div className={css(styles.container)}>
                    <div className={css(styles.orderDetails)}>
                        <div className={css(styles.information)}>
                            <div className={css(styles.restaurantLogoContainer)}>
                                <img alt="" className={css(styles.restaurantLogo)} src={"https://lopeseat.com/REST/icons/PandaExpress_20190815.png"} />
                            </div>
                            <div className={css(styles.keyValue)}>
                                <div className={css(styles.key)}>
                                    Restaurant
                                </div>
                                <div className={css(styles.value)}>
                                    {this.state.order.restaurantName}
                                </div>
                            </div>
                            <div className={css(styles.keyValue)}>
                                <div className={css(styles.key)}>
                                    Order Placed
                                </div>
                                <div className={css(styles.value)}>
                                    {timeSince(this.state.order.timePlaced)} ago
                                </div>
                            </div>
                            <div className={css(styles.keyValue)}>
                                <div className={css(styles.key)}>
                                    Earning
                                </div>
                                <div className={css(styles.value)}>
                                    ${formatPrice(this.state.order.deliveryFee, false)}
                                </div>
                            </div>
                            <div className={css(styles.time)}>
                                <div className={css(styles.timeTitle)}>
                                    Time to accept
                            </div>
                                <div className={css(styles.timeLeft)}>{this.state.timeLeft} second{this.state.timeLeft === 1 ? "" : "s"}</div>
                            </div>
                        </div>

                    </div>
                    <div className={css(styles.choiceArea)}>
                        <div
                            className={
                                "ion-activatable " +
                                css(styles.choice, styles.accept)
                            } onClick={this.onAcceptClick}>
                            <IonIcon
                                icon={checkmarkCircleOutline}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    color: "#5cbd5c",
                                }}
                            />
                            <IonRippleEffect />
                        </div>
                        <div
                            className={
                                "ion-activatable " +
                                css(styles.choice, styles.decline)
                            } onClick={this.onDeclineClick}>
                            <IonIcon
                                icon={closeCircleOutline}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    color: "#fc3a3a",
                                }}
                            />
                            <IonRippleEffect />
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#f3f3f3",
        alignItems: "center",
    },
    orderDetails: {
        flex: 1,
        background: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        width: "100%",
    },
    information: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 7,
        height: "100%"
    },
    restaurantLogoContainer: {
        height: 150,
        width: 150,
        marginBottom: 7
    },
    restaurantLogo: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
    },
    keyValue: {
        display: "flex",
        justifyContent: "space-between",
        minWidth: 290,
        fontSize: "1.1em"
    },
    key: {

    },
    value: {

    },
    time: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    timeTitle: {
        marginTop: 7,
        fontSize: "1.2em"
    },
    timeLeft: {
        fontSize: "1.2em",
        fontWeight: 500
    },
    choiceArea: {
        minWidth: 300,
        height: 100,
        borderRadius: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0px 10px",
    },
    choice: {
        height: 80,
        width: 80,
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",
    },
    accept: {
        // background: "green",
    },
    decline: {
        // background: "red",
    },
});

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
});

export default connect(mapStateToProps)(IncomingOrders);
