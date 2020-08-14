import React from "react";
import ScreenHandler from "./screens/ScreenHandler";

import "./App.css";
import "./Theme.css";

import firebase from "firebase/app";
import "firebase/messaging";
import MessageListener from "./assets/scripts/MessageListener";
import LopesEatLogo from "./assets/images/icon-384x384.png";
import { actions, store } from "./Redux";

import { isPlatform, IonApp } from "@ionic/react";
import {
    Capacitor,
    Plugins,
    // PushNotification,
    // PushNotificationToken,
    // PushNotificationActionPerformed,
} from "@capacitor/core";
const { PushNotifications } = Plugins;

class App extends React.Component {
    messageListener = new MessageListener();

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: false,
            fbToken: null,
            fbPlatform: null,
        };
    }

    setTheme(darkTheme) {
        this.setState({ darkTheme });
    }

    render() {
        return (
            <IonApp>
                <div
                    className={
                        "App " + (this.state.darkTheme ? "dark" : "light")
                    }>
                    {this.state.fbToken ? (
                        <ScreenHandler
                            fbToken={this.state.fbToken}
                            fbPlatform={this.state.fbPlatform}
                            messageListener={this.messageListener}
                            setTheme={(theme) => this.setTheme(theme)}
                        />
                    ) : (
                        <div className="loadingWrapper">
                            <img
                                className="lopeImage"
                                src={LopesEatLogo}
                                alt="Logo"
                            />
                            <div className="loadingText">
                                App loading. One moment please.
                            </div>
                        </div>
                    )}
                </div>
            </IonApp>
        );
    }

    setToken(token, platform) {
        store.dispatch(actions.setFBToken(token));
        store.dispatch(actions.setFBPlatform(platform));
        this.setState({fbToken: token, fbPlatform: platform});
    }

    componentDidMount() {
        console.log("mount");
        if (Capacitor.isPluginAvailable("PushNotifications")) {
            PushNotifications.register();
            PushNotifications.addListener("registration", async (token) => {
                console.log("Push registration success, token: " + token.value);
                this.setToken(token.value, isPlatform("ios") ? "ios" : "and");
            });

            PushNotifications.addListener("registrationError", (error) => {
                console.error(
                    "Error on registration: " + JSON.stringify(error)
                );
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
        }

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

                    return token;
                })
                .then(function (token) {
                    app.setToken(token, "web");
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
