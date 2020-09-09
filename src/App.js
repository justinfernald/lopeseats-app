import history from "./history";
import React, { Fragment } from "react";
import ScreenHandler from "./screens/ScreenHandler";

import "./App.css";
import "./Theme.css";

import firebase from "firebase/app";
import "firebase/messaging";
import MessageListener from "./assets/scripts/MessageListener";
import startScript from "./assets/scripts/StartupScript";
// import LopesEatLogo from "./assets/images/icon-384x384.png";
import { actions, store } from "./Redux";

import { connect } from "react-redux";

import Overlay from "./components/Overlay";

import { updateFBToken } from "./assets/scripts/Util";

import { isPlatform, IonApp } from "@ionic/react";
import {
    Capacitor,
    Plugins,
    // PushNotification,
    // PushNotificationToken,
    // PushNotificationActionPerformed,
} from "@capacitor/core";
import RerunScript from "./assets/scripts/RerunScript";

const { PushNotifications, App: PApp, LocalNotifications } = Plugins;

class App extends React.Component {
    messageListener = new MessageListener();

    notificationList = {};

    constructor(props) {
        super(props);
        startScript(props);
        this.state = {
            darkTheme: false,
        };
    }

    setTheme(darkTheme) {
        this.setState({ darkTheme });
    }

    onMount() {
        if (!this.props.deliveryModeActive) return;
        this.interval = setInterval(() => RerunScript(), 10 * 1000)
    }

    componentDidUpdate() {
        clearInterval(this.interval);
        if (!this.props.deliveryModeActive) return;
        this.interval = setInterval(() => RerunScript(), 10 * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <IonApp>
                <div
                    className={
                        "App " + (this.state.darkTheme ? "dark" : "light")
                    }>
                    <Fragment>
                        <Overlay />
                        <ScreenHandler
                            messageListener={this.messageListener}
                            setTheme={(theme) => this.setTheme(theme)}
                        />
                    </Fragment>
                </div>
            </IonApp>
        );
    }

    setToken(token, platform) {
        store.dispatch(actions.setFBToken(token));
        store.dispatch(actions.setFBPlatform(platform));
        if (this.props.apiToken)
            updateFBToken(token, platform, this.props.apiToken);
    }

    componentDidMount() {
        this.onMount()
        history.listen((_location, action) => {
            if (action === "PUSH") {
                store.dispatch(actions.addHistorySize(1));
            } else if (action === "POP") {
                store.dispatch(actions.addHistorySize(-1));
            }
        })

        // Native START
        if (Capacitor.isNative) {
            PApp.addListener("backButton", (e) => {
                history.goBack();

                const exitPaths = [
                    "/app/home",
                    "/app/restaurants",
                    "/app/deliverer",
                    "/app/tracker",
                    "/app/profile",
                    "/app/login",
                ];
                if (exitPaths.includes(window.location.pathname)) {
                    if (navigator.app) navigator.app.exitApp();
                    else if (navigator.device) navigator.device.exitApp();
                    else PApp.exitApp();
                }
            });
        }

        // // Notifications // //



        const stateToURL = {
            "deliverer_request": "app/deliverer/accept/",
            "expired_request": "app/deliverer",
            "order_update": "app/tracker/",
        }

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

            // For notifications in the foreground
            PushNotifications.addListener(
                "pushNotificationReceived",
                (notification) => {
                    // let notif = this.state.notifications || [];
                    // notif.push({
                    //     id: notification.id,
                    //     title: notification.title,
                    //     body: notification.body,
                    // });
                    // this.setState({
                    //     notifications: notif,
                    // });

                    const id = Math.floor(Math.random() * 100000000);
                    this.notificationList[id] = notification.data.state;

                    LocalNotifications.schedule({ // From capacitor
                        notifications: [
                            {
                                id,
                                schedule: { at: new Date(Date.now() + 100) },
                                title: notification.title,
                                body: notification.body,
                                iconColor: "#eb1c34",
                                channelId: "pop-notifications",
                            }
                        ]
                    });

                    // notification.
                    console.log("recieved: " + JSON.stringify(notification, null, 4));
                    console.log("----04:13----");
                }
            );

            // This is here to make it so the notification will pop on screen to local notifications
            LocalNotifications.createChannel({
                description: "LopesEat Notification Channel",
                id: 'pop-notifications',
                importance: 5,
                lightColor: "#FF0000",
                lights: true,
                name: "LopesEat",
                // sound?: string,
                vibration: true,
                visibility: 1,
            });

            PushNotifications.createChannel({
                description: "LopesEat Notification Channel",
                id: 'pop-notifications',
                importance: 5,
                lightColor: "#FF0000",
                lights: true,
                name: "LopesEat",
                // sound?: string,
                vibration: true,
                visibility: 1,
            });

            PushNotifications.addListener(
                "pushNotificationActionPerformed",
                ({ notification }) => {
                    // let notif = this.state.notifications;
                    // notif.push({
                    //     id: notification.notification.data.id,
                    //     title: notification.notification.data.title,
                    //     body: notification.notification.data.body,
                    // });
                    // this.setState({
                    //     notifications: notif,
                    // });

                    console.log("push action: " + JSON.stringify(notification, null, 4));
                    console.log(JSON.stringify(this.notificationList[notification.id], null, 4));

                    const [state, id] = this.notificationList[notification.id].split("/");
                    const url = stateToURL[state] ? stateToURL[state] + id : "app/home";

                    console.log(url);
                    // this.setState({location: "/" + url})
                    window.history.pushState(null, state, url)
                }
            );

            LocalNotifications.addListener(
                "localNotificationActionPerformed",
                ({ notification }) => {
                    console.log("local action: " + JSON.stringify(notification, null, 4));
                    console.log(JSON.stringify(this.notificationList[notification.id], null, 4));

                    const [state, id] = this.notificationList[notification.id].split("/");
                    const url = stateToURL[state] ? stateToURL[state] + id : "app/home";

                    console.log(url);
                    // this.setState({location: "/" + url})
                    window.history.pushState(null, state, url)
                }
            );
        }
        // Native END

        // PWA START
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

            Notification.requestPermission()
                .then(() => {
                    console.log("Permission " + Notification.permission);
                    var token = messaging.getToken();

                    return token;
                })
                .then((token) => {
                    console.log(token);
                    app.setToken(token, "web");
                })
                .catch((err) => {
                    console.log(err);
                    app.setState({ bypassToken: true });
                });

            console.log(messaging);

            // firebase.notifications().onNotification((notification) => {
            //     console.log('[firebase-messaging-sw.js] Received foreground message ', notification);

            //     const notification = new Notification(payload.notification.title, {
            //         body: payload.notification.body,
            //         requireInteraction: true,
            //     });

            //     notification.onclick = () => {
            //         console.log("pwa notification click: ", payload)

            //         const [state, id] = payload.data.state.split("/");
            //         const url = stateToURL[state] ? stateToURL[state] + id : "app/home";
            //         console.log(url);
            //         this.props.history.push("/" + url);
            //     }
            // });

            // PWA END
        }
    }
}

export default connect(({ apiToken, overlay, overlayEnabled }) => ({
    apiToken,
    overlay,
    overlayEnabled
}))(App);
