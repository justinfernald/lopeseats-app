import React from 'react';
import '../../App.css';
import { getOrder } from '../../assets/scripts/Util';

export default class OrderTracker extends React.Component {

    listenerId;

    constructor(props) {
        super(props);

        this.orderStates = ["unclaimed", "claimed", "en route", "arrived", "completed"];

        this.state = {
            order: null,
            orderState: "unclaimed",
            placed: null,
            claimed: null,
            enroute: null,
            arrived: null,
            wait: 45
        };

        this.fetchData();
    }

    componentDidMount() {
        this.listenerId = this.props.messageListener.addListener(() => {this.fetchData()});
    }

    componentWillUnmount() {
        this.props.messageListener.removeListener(this.listenerId);
    }

    makePHXTime(date) {
        return new Date(date.toLocaleString("en-US", {timeZone: "America/Phoenix"}));
    }

    parseDate(dateString) {
        if (dateString == null)
            return null;
        var t = dateString.split(/[- :]/);
        var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        return this.formatTime(this.makePHXTime(d));
    }

    formatTime(date) {
        var hours = date.getHours();
        var suffix = hours > 12 ? "PM" : "AM";
        hours = hours == 0 ? 12 : hours > 12 ? hours - 12 : hours;
        var minutes = date.getMinutes();
        var minuteString = minutes == 0 ? "00" : minutes < 10 ? "0" + minutes.toString() : minutes;
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
            var wait = this.order.wait.toString();
            wait = wait.substring(0, wait.indexOf("."));

            this.setState({
                order,
                orderState,
                placed,
                claimed,
                enroute,
                arrived,
                wait
            })
        }

        this.forceUpdate();
    }

    render() {
        var index = this.orderStates.indexOf(this.state.orderState);

        var content;
        var footer;

        if (this.order != null) {
            content = (
                <div className="flexDisplayRow" style={{height: "90%"}}>
                    <div className="flexDisplay trackerItems">
                        <div className="trackerText">
                            Sent Request
                            <div className="trackerSubText">{this.state.placed}</div>
                        </div>
                        
                        <div className={"trackerImage trackerConfirmed" + (index >= 1 ? " trackerActive" : "")}></div>
                        <div className="trackerText">
                            En Route
                            <div className="trackerSubText" style={ index >= 2 ? {} : {display: "none"}}>{this.state.enroute}</div>
                        </div>
                        <div className={"trackerImage trackerArrived" + (index >= 3 ? " trackerActive" : "")}></div>
                    </div>
                    <div className="trackerBarVert">
                        <div className="progressDot trackerActive"></div> {/* Sent request */}
                        <div className={"progressLine" + (index >= 1 ? " trackerActive" : "")}></div> {/* Claimed */}
                        <div className={"progressDot" + (index >= 1 ? " trackerActive" : "")}></div>
                        <div className={"progressLine" + (index >= 2 ? " trackerActive" : "")}></div> {/* En Route */}
                        <div className={"progressDot" + (index >= 2 ? " trackerActive" : "")}></div>
                        <div className={"progressLine" + (index >= 3 ? " trackerActive" : "")}></div> {/* Arrived */}
                        <div className={"progressDot" + (index >= 3 ? " trackerActive" : "")}></div>
                    </div>
                    <div className="flexDisplay trackerItems">
                        <div className="trackerImage trackerSentRequest trackerActive"></div>
                        <div className="trackerText">
                            Order Claimed
                            <div className="trackerSubText" style={ index >= 1 ? {} : {display: "none"}}>{this.state.claimed}</div>
                        </div>
                        <div className={"trackerImage trackerEnroute" + (index >= 2 ? " trackerActive" : "")}></div>
                        <div className="trackerText">
                            Arrived
                            <div className="trackerSubText" style={ index >= 3 ? {} : {display: "none"}}>{this.state.arrived}</div>
                        </div>
                    </div>
                </div>);

            footer = (
            <div className="orderTrackerFooter">
                Arriving in {this.state.wait} minutes
                <div className="messageButton" onClick={() => this.props.onMessageClick(this.state.order)}></div>
            </div>);
        } else {
            content = (<div className="noCurrentOrder">
                No active order
            </div>);
        }
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Order Tracker</span>
                    </div>
                </div>

                {content}

                {footer}
            </div>
        );
    }

}