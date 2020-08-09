import React from "react";

import {
    // registerAccount,
    // addBackStep,
    setupBackEvent,
    loadState,
    getScreenState,
} from "./assets/scripts/Util";

import HomeScreen from "./screens/HomeScreen";
import RestaurantsRouter from "./screens/RestaurantsTab/RestaurantsRouter";
import OrderTracker from "./screens/TrackerTab/OrderTracker";
import OrderScreen from "./screens/DeliveryProcess/OrderScreen";
import Profile from "./screens/QuickScreens/Profile";
import LoginScreen from "./screens/LoginScreen";
import RegisterRouter from "./screens/RegisterProcess/RegisterRouter";
import DelivererOrder from "./screens/DelivererScreens/DelivererOrder";
import DelivererPayment from "./screens/DelivererScreens/DelivererPayment";

import {
    storeState,
    // updateFBToken,
    getOrder,
    getActiveOrderList,
} from "./assets/scripts/Util";
import {
    IonRouterOutlet,
    IonApp,
    IonTabs,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonIcon,
    // IonLabel,
} from "@ionic/react";
import { restaurant, search, repeatSharp, person } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import TrackerRouter from "./screens/TrackerTab/TrackerRouter";

const mainScreen = (props) =>
    !getScreenState().apiToken ? (
        <Redirect
            to={{
                pathname: "/login",
                state: {
                    from: props.location,
                },
            }}
        />
    ) : (
        // <IonPage id="app">
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/app/:tab(home)" component={HomeScreen} exact />
                <Route path="/app/restaurants" component={RestaurantsRouter} />
                <Route
                    path="/app/:tab(delivery)"
                    component={OrderScreen}
                    exact
                />
                <Route path="/app/:tab(tracker)" component={TrackerRouter} />
                <Route path="/app/:tab(profile)" component={Profile} exact />
                <Route
                    path="/app/deliverer/order"
                    component={DelivererOrder}
                    exact
                />
                <Route
                    path="/app/deliverer/payment"
                    component={DelivererPayment}
                    exact
                />
                <Redirect from="/app/" to="/app/home" exact />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon
                        icon={restaurant}
                        style={{ width: "100%", height: "50%" }}
                    />
                </IonTabButton>
                <IonTabButton tab="restaurants" href="/app/restaurants">
                    <IonIcon
                        icon={search}
                        style={{ width: "100%", height: "53%" }}
                    />
                </IonTabButton>
                <IonTabButton tab="delivery" href="/app/delivery">
                    <IonIcon
                        icon={repeatSharp}
                        style={{ width: "100%", height: "65%" }}
                    />
                </IonTabButton>
                <IonTabButton tab="tracker" href="/app/tracker">
                    <i
                        className="material-icons-round"
                        style={{
                            width: "100%",
                            height: "50%",
                            fontSize: "1.9em",
                        }}>
                        track_changes
                    </i>
                </IonTabButton>
                <IonTabButton tab="profile" href="/app/profile">
                    <IonIcon
                        icon={person}
                        style={{ width: "100%", height: "50%" }}
                    />
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
        //</IonPage>
    );

export default class ScreenHandler extends React.Component {
    constructor(props) {
        super(props);
        this.noBack = false;

        this.state = loadState("screenHandler");

        if (this.state == null) {
            this.state = {
                stateLoaded: false,
                registerData: {
                    phone: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    studentNumber: "",
                    profileImage: "",
                },
                apiToken: null,
                orderId: -1,
                address: "",
                currentRestaurant: null,
                currentMenu: null,
                currentOrder: -1,
                // screen: "Login",
                // screen: "DelivererPayment",
                // baseScreen: "Login",
                // screenHistory: ["Login"],
                // screenHistory: ["Login", "DelivererPayment"],
                deliveryMode: false,
                openItem: null,
                editingItem: false,
                optionsChosen: [],
                instructions: null,
                actionBtn: null,
                actionBtnUpdated: false,
                fbToken: props.fbToken,
                redirectTo: null,
            };
        }

        this.state.messageListener = props.messageListener;

        setupBackEvent(this.backScreen);

        window.getScreenHandler = () => this;
    }

    getMessageListener() {
        return this.props.messageListener;
    }

    componentDidMount() {}

    async loadActionBtnData() {
        var actionBtn = await this.getActionBtn();
        var actionBtnUpdated = true;
        this.setState({ actionBtn, actionBtnUpdated });
    }

    toggleMode = () => {
        this.setState({
            deliveryMode: !this.state.deliveryMode,
            actionBtnUpdated: false,
        });
        this.props.setTheme(!this.state.deliveryMode);
    };

    getActionBtn = async () => {
        if (this.state.deliveryMode) {
            var orderList = await getActiveOrderList(this.state.apiToken);
            if (orderList.length == 0) {
                return {
                    text: "Start Delivery",
                    action: () => this.setScreen("ActiveOrders"),
                };
            } else {
                var mainOrder = orderList[0];
                for (var i = 0; i < orderList.length; i++) {
                    if (
                        Date.parse(orderList[i].placed) <
                        Date.parse(mainOrder.placed)
                    ) {
                        mainOrder = orderList[i];
                    }
                }

                // getActiveOrderList still sends "completed" orders. Needs to be fixed...
                switch (mainOrder.state) {
                    case "claimed":
                        return { text: "Pick up food", action: null };
                    case "en route":
                        return {
                            text: "Notify customer of arrival",
                            action: null,
                        };
                    case "arrived":
                        return { text: "Complete order", action: null };
                }
            }
        } else {
            var order = await getOrder(this.state.apiToken);
            if (order == null) {
                return {
                    text: "Place order",
                    action: () => this.setScreen("RestaurantsList"),
                };
            } else {
                return {
                    text: "Message Deliverer",
                    action: () => this.setScreen("Message"),
                };
            }
        }
        return null;
    };

    render() {
        if (this.state.apiToken) storeState(this.state, "screenHandler");
        if (!this.state.actionBtnUpdated) this.loadActionBtnData();

        return (
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterRouter} />
                    <Route path="/app" component={mainScreen} />
                    <Redirect exact from="/" to="/login" />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }
}
