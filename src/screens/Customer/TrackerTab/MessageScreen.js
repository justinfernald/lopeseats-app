import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
    getMessages,
    sendMessage,
    getMessageListener,
} from "../../../assets/scripts/Util";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";

class MessageScreen extends React.Component {
    timeAgo;
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    constructor(props) {
        super(props);

        this.state = {
            selfId: -1,
            selfName: "",
            otherId: -1,
            otherName: "",
            messages: [],
        };
        this.messageRef = React.createRef();
        TimeAgo.addLocale(en);
        this.timeAgo = new TimeAgo("en-US");
        this.fetchData();
    }

    componentDidMount() {
        this.listenerId = getMessageListener().addListener(() => {
            this.fetchData();
        });
    }

    componentWillUnmount() {
        getMessageListener().removeListener(this.listenerId);
    }

    async fetchData() {
        var data = await getMessages(
            this.props.apiToken,
            this.props.messageOrderId
        );
        console.log(data);

        if (data.success !== false) {
            var selfId = data.selfId;
            var selfName = data.selfName;
            var otherId = data.otherId;
            var otherName = data.otherName;
            var messages = data.messages;
            this.setState({
                selfId,
                selfName,
                otherId,
                otherName,
                messages,
            });

            this.forceUpdate();
            this.messageEnd.scrollIntoView();
        }
    }

    makePHXTime(date) {
        return new Date(
            date.toLocaleString("en-US", { timeZone: "America/Phoenix" })
        );
    }

    parseDate(dateString) {
        var t = dateString.split(/[- :]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        return this.makePHXTime(d);
    }

    formatDate(date) {
        var hours = date.getHours();
        var suffix = hours > 12 ? "PM" : "AM";
        hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        var minutes = date.getMinutes();

        var minuteString =
            minutes === 0
                ? "00"
                : minutes < 10
                ? "0" + minutes.toString()
                : minutes;
        return hours + ":" + minuteString + suffix;
    }

    render() {
        var messagesJSX = [];

        var prevMessage = null;
        for (var i = 0; i < this.state.messages.length; i++) {
            var message = this.state.messages[i];
            var className =
                "messageContainer" +
                (message.sender === this.state.selfId ? " right" : "");
            var date = this.parseDate(message.time);
            if (prevMessage != null) {
                if (
                    // eslint-disable-next-line eqeqeq
                    date.getDate() != this.parseDate(prevMessage.time).getDate()
                ) {
                    messagesJSX.push(
                        <div className="newDayLine" key={i * 2}>
                            <span className="horizontalLine"></span>
                            {new Date().getDate() === date.getDate()
                                ? "Today"
                                : this.days[date.getDay()]}
                            <span className="horizontalLine"></span>
                        </div>
                    );
                }
            }
            messagesJSX.push(
                <div className={className} key={i * 2 + 1}>
                    <div className="messageChunk">
                        <div className="messageInfo">
                            {this.formatDate(date)}
                        </div>
                        <div className="messageBubble">{message.message}</div>
                    </div>
                </div>
            );
            prevMessage = message;
        }

        messagesJSX.push(
            <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                    this.messageEnd = el;
                }}
                key={this.state.messages.length * 2}></div>
        );

        return (
            <Screen
                appBar={{
                    title: this.state.otherName, backBtn: true
                }}>
                <span className="horizontalLine"></span>

                <div className="messageScroll">{messagesJSX}</div>

                <span
                    className="horizontalLine"
                    style={{ position: "absolute", bottom: "3.5em" }}></span>
                <div className="messageBox">
                    <div className="messageBoxContainer">
                        <input
                            className="messageInput"
                            ref={this.messageRef}
                            type="text"
                            placeholder={
                                "Message " + this.state.otherName
                            }></input>
                    </div>
                    <div
                        className="sendMessage"
                        onClick={() => {
                            sendMessage(
                                this.props.apiToken,
                                this.props.messageOrderId,
                                this.messageRef.current.value
                            );
                            this.messageRef.current.value = "";
                            this.fetchData();
                        }}>
                        <i className="material-icons-round">send</i>
                    </div>
                </div>
            </Screen>
        );
    }
}

export default connect(({ messageOrderId, apiToken }) => ({
    messageOrderId,
    apiToken,
}))(MessageScreen);
