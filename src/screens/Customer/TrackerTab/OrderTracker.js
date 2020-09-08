import React from "react";
import {
    getOrder,
    getMessageListener,
    getTippableOrder,
} from "../../../assets/scripts/Util";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import SendTip from "./SendTip";
import Button from "../../../components/Button";
import { css, StyleSheet } from "aphrodite/no-important";

class OrderTracker extends React.Component {
    listenerId;

    constructor(props) {
        super(props);

        this.orderStates = [
            "unclaimed",
            "claimed",
            "en route",
            "arrived",
            "completed",
        ];

        this.state = {
            order: null,
            orderState: "unclaimed",
            placed: null,
            claimed: null,
            enroute: null,
            arrived: null,
            wait: 45,
            tippableOrder: null
        };
    }

    componentDidMount() {
        this.fetchData();
        this.listenerId = getMessageListener().addListener(() => {
            this.fetchData();
        });
    }

    componentWillUnmount() {
        getMessageListener().removeListener(this.listenerId);
    }

    makePHXTime(date) {
        return new Date(
            date.toLocaleString("en-US", { timeZone: "America/Phoenix" })
        );
    }

    parseDate(dateString) {
        if (dateString == null) return null;
        var t = dateString.split(/[- :]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        return this.formatTime(this.makePHXTime(d));
    }

    formatTime(date) {
        var hours = date.getHours();
        var suffix = hours > 12 ? "PM" : "AM";
        // eslint-disable-next-line eqeqeq
        hours = hours == 0 ? 12 : hours > 12 ? hours - 12 : hours;
        var minutes = date.getMinutes();
        var minuteString =
            // eslint-disable-next-line eqeqeq
            minutes == 0
                ? "00"
                : minutes < 10
                    ? "0" + minutes.toString()
                    : minutes;
        return hours + ":" + minuteString + suffix;
    }

    async fetchData() {
        this.order = await getOrder(this.props.apiToken);
        console.log(this.order);

        if (this.order != null) {
            var order = this.order.id;
            var orderState = this.order.state;
            var placed = this.parseDate(this.order.placed);
            var claimed = this.parseDate(this.order.claimed);
            var enroute = this.parseDate(this.order.en_route);
            var arrived = this.parseDate(this.order.arrived);
            var wait = this.order.wait ? this.order.wait.toString() : 30 + "";
            wait = wait.substring(0, wait.indexOf("."));

            this.setState({
                order,
                orderState,
                placed,
                claimed,
                enroute,
                arrived,
                wait,
            });
        } else {
            var tippableOrder = await getTippableOrder(this.props.apiToken);
            if (tippableOrder !== null) {
                this.setState({
                    tippableOrder
                });
            }
        }
    }

    onMessageClick = (orderId) => {
        store.dispatch(actions.setMessageOrderId(orderId))
        this.props.history.push("/app/tracker/message");
    };

    render() {
        var index = this.orderStates.indexOf(this.state.orderState);

        var content;
        var footer;

        if (this.order != null) {
            content = (
                <div className="flexDisplayRow" style={{ height: "90%", flex: "1 1 auto" }}>
                    <div className="flexDisplay trackerItems">
                        <div className="trackerText">
                            Sent Request
                            <div className="trackerSubText">
                                {this.state.placed}
                            </div>
                        </div>

                        <div
                            className={
                                "trackerImage trackerConfirmed" +
                                (index >= 1 ? " trackerActive" : "")
                            }></div>
                        <div className="trackerText">
                            En Route
                            <div
                                className="trackerSubText"
                                style={index >= 2 ? {} : { display: "none" }}>
                                {this.state.enroute}
                            </div>
                        </div>
                        <div
                            className={
                                "trackerImage trackerArrived" +
                                (index >= 3 ? " trackerActive" : "")
                            }></div>
                    </div>
                    <div className="trackerBarVert">
                        <div className="progressDot trackerActive"></div>{" "}
                        {/* Sent request */}
                        <div
                            className={
                                "progressLine" +
                                (index >= 1 ? " trackerActive" : "")
                            }></div>{" "}
                        {/* Claimed */}
                        <div
                            className={
                                "progressDot" +
                                (index >= 1 ? " trackerActive" : "")
                            }></div>
                        <div
                            className={
                                "progressLine" +
                                (index >= 2 ? " trackerActive" : "")
                            }></div>{" "}
                        {/* En Route */}
                        <div
                            className={
                                "progressDot" +
                                (index >= 2 ? " trackerActive" : "")
                            }></div>
                        <div
                            className={
                                "progressLine" +
                                (index >= 3 ? " trackerActive" : "")
                            }></div>{" "}
                        {/* Arrived */}
                        <div
                            className={
                                "progressDot" +
                                (index >= 3 ? " trackerActive" : "")
                            }></div>
                    </div>
                    <div className="flexDisplay trackerItems">
                        <div className="trackerImage trackerSentRequest trackerActive"></div>
                        <div className="trackerText">
                            Order Claimed
                            <div
                                className="trackerSubText"
                                style={index >= 1 ? {} : { display: "none" }}>
                                {this.state.claimed}
                            </div>
                        </div>
                        <div
                            className={
                                "trackerImage trackerEnroute" +
                                (index >= 2 ? " trackerActive" : "")
                            }></div>
                        <div className="trackerText">
                            Arrived
                            <div
                                className="trackerSubText"
                                style={index >= 3 ? {} : { display: "none" }}>
                                {this.state.arrived}
                            </div>
                        </div>
                    </div>
                </div>
            );

            footer = (
                // <div className="orderTrackerFooter">
                //     {this.state.wait > 1 ? `Arriving in ${this.state.wait} minutes` : "Arriving soon"}

                this.state.orderState === "unclaimed"
                    ?
                    "" :
                    <div>
                        <Button margin={10} style={styles.button} onClick={() => this.onMessageClick(this.state.order)}>Messages<div
                            className="messageButton"
                        ></div></Button>

                    </div>
                // </div>
            );
        } else if (this.state.tippableOrder !== null) {
            content = <SendTip order={this.state.tippableOrder} onNextStep={() => this.setState({ tippableOrder: null })} />
        } else if (this.props.tipped) {
            content = <div className="noCurrentOrder">Thank you for tipping your runner! Enjoy your food</div>;
        } else {
            content = <div className="noCurrentOrder">No active order</div>;
        }
        return (
            <Screen
                appBar={{
                    title: "Order Tracker"
                }}>
                {content}
                {footer}
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        background: "#d40505"
    }
})

export default connect(({ apiToken, tipped }) => ({ apiToken, tipped }))(OrderTracker);