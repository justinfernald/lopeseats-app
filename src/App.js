import React from "react";
import ScreenHandler from "./components/ScreenHandler";
import "./App.css";
import firebase from "firebase/app";
import "firebase/messaging";
import MessageListener from "./MessageListener";

// capacitor plugin to pull into native tooling
// import { Plugins } from '@capacitor/core';
// const { Device, Modals } = Plugins;
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
} from "@capacitor/core";
const { PushNotifications } = Plugins;

class App extends React.Component {
    // constructor(props) {
    //   super(props);
    //   window.getApp = () => this;
    // }

    fbToken = "";
    messageListener = new MessageListener();

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: false,
        };
    }

    setTheme(darkTheme) {
        this.setState({ darkTheme });
    }

    render() {
        return (
            <div className={"App " + (this.state.darkTheme ? "dark" : "light")}>
                <ScreenHandler
                    fbToken={this.fbToken}
                    messageListener={this.messageListener}
                    setTheme={(theme) => this.setTheme(theme)}
                />
            </div>
        );
    }

    setToken(token) {
        this.fbToken = token;
        console.log(token);
        this.forceUpdate();
    }

    componentDidMount() {
        console.log("mount");
        PushNotifications.register();
        PushNotifications.addListener("registration", (token) => {
            alert("Push registration success, token: " + token.value);
        });

        PushNotifications.addListener("registrationError", (error) => {
            alert("Error on registration: " + JSON.stringify(error));
        });

        PushNotifications.addListener(
            "pushNotificationReceived",
            (notification) => {
                let notif = this.state.notifications;
                notif.push({
                    id: notification.id,
                    title: notification.title,
                    body: notification.body,
                });
                this.setState({
                    notifications: notif,
                });
            }
        );

        PushNotifications.addListener(
            "pushNotificationActionPerformed",
            (notification) => {
                let notif = this.state.notifications;
                notif.push({
                    id: notification.notification.data.id,
                    title: notification.notification.data.title,
                    body: notification.notification.data.body,
                });
                this.setState({
                    notifications: notif,
                });
            }
        );

        if (firebase.messaging.isSupported()) {
            var firebaseConfig = {
                apiKey: "AIzaSyBIOzolcjUlgx5x5ca3zCg3DBPwYftV-kY",
                authDomain: "test-96cdc.firebaseapp.com",
                databaseURL: "https://test-96cdc.firebaseio.com",
                projectId: "test-96cdc",
                storageBucket: "test-96cdc.appspot.com",
                messagingSenderId: "890647037957",
                appId: "1:890647037957:web:9bf7066436852592d3346c",
            };
            firebase.initializeApp(firebaseConfig);

            var app = this;

            const messaging = firebase.messaging();
            messaging.usePublicVapidKey(
                "BMJ-dBS0EPnykDWroTRbq8rcNq6Yh2NHHLxAAerrZQk67sdvDlbOTY_WR-4cyoxjeMN6JlHsDP6sohMKu8ap784"
            );
            console.log("Requesting permission");
            Notification.requestPermission()
                .then(function () {
                    console.log("Permission " + Notification.permission);
                    var token = messaging.getToken();
                    console.log(token);
                    return token;
                })
                .then(function (token) {
                    console.log(token);
                    app.setToken(token);
                })
                .catch(function (err) {
                    console.log(err);
                });

            messaging.onMessage((payload) => {
                console.log("Message received. ", payload);
                this.messageListener.messageReceived(payload.data);
            });
        }
    }
}

export default App;
