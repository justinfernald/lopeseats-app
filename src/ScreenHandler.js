import React, { Fragment } from "react";

import {
    registerAccount,
    addBackStep,
    setupBackEvent,
    loadState,
} from "./assets/scripts/Util";

import HomeScreen from "./screens/HomeScreen";
import RestaurantsList from "./screens/QuickScreens/RestaurantsList";
import OrderTracker from "./screens/QuickScreens/OrderTracker";
import OrderScreen from "./screens/DeliveryProcess/OrderScreen";
import Profile from "./screens/QuickScreens/Profile";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PersonalInformation from "./screens/RegisterProcess/PersonalInformation";
import VerifyPhone from "./screens/RegisterProcess/VerifyPhone";
import RegisterProcess from "./screens/RegisterProcess/RegisterProcess";

import { storeState, updateFBToken, getOrder, getActiveOrderList } from "./assets/scripts/Util";
import { IonRouterOutlet, IonApp, IonTabs, IonPage, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { restaurant, search, repeatSharp, person } from "ionicons/icons";
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

const mainScreen = () => (
    <IonPage id="app">
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/app/:tab(home)" component={HomeScreen} exact/>
                <Route path="/app/:tab(restaurants)" component={RestaurantsList} exact/>
                <Route path="/app/:tab(delivery)" component={OrderScreen} exact/>
                <Route path="/app/:tab(tracker)" component={OrderTracker} exact/>
                <Route path="/app/:tab(profile)" component={Profile} exact/>
                <Redirect from="/app/" to="/app/home" exact/>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon icon={restaurant} style={{width: "100%", height: "50%"}}/>
                </IonTabButton>
                <IonTabButton tab="restaurants" href="/app/restaurants">
                    <IonIcon icon={search} style={{width: "100%", height: "53%"}}/>
                </IonTabButton>
                <IonTabButton tab="delivery" href="/app/delivery">
                    <IonIcon icon={repeatSharp} style={{width: "100%", height: "65%"}}/>
                </IonTabButton>
                <IonTabButton tab="tracker" href="/app/tracker">
                    <i className="material-icons-round" style={{width: "100%", height: "50%", fontSize: "1.9em"}}>track_changes</i>
                </IonTabButton>
                <IonTabButton tab="profile" href="/app/profile">
                    <IonIcon icon={person} style={{width: "100%", height: "50%"}}/>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    </IonPage>);

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
                apiToken: "",
                orderId: -1,
                address: "",
                currentRestaurant: null,
                currentMenu: null,
                currentOrder: -1,
                screen: "Login",
                // screen: "DelivererPayment",
                baseScreen: "Login",
                screenHistory: ["Login"],
                // screenHistory: ["Login", "DelivererPayment"],
                deliveryMode: false,
                openItem: null,
                editingItem: false,
                optionsChosen: [],
                instructions: null,
                actionBtn: null,
                actionBtnUpdated: false,
                fbToken: props.fbToken,
                redirectTo: null
            };
        }

        setupBackEvent(this.backScreen);

        window.getScreenHandler = () => this;
    }

    componentDidMount() {
    }

    async loadActionBtnData() {
        var actionBtn = await this.getActionBtn();
        var actionBtnUpdated = true;
        this.setState({actionBtn, actionBtnUpdated});
    }

    toggleMode = () => {
        this.setState({
            deliveryMode: !this.state.deliveryMode,
            actionBtnUpdated: false
        });
        this.props.setTheme(!this.state.deliveryMode);
    };

    getActionBtn = async () => {
        if (this.state.deliveryMode) {
            var orderList = await getActiveOrderList(this.state.apiToken);
            if (orderList.length == 0) {
                return {text: "Start Delivery", action: () => this.setScreen("ActiveOrders")};
            } else {
                var mainOrder = orderList[0];
                for (var i = 0; i < orderList.length; i++) {
                    if (Date.parse(orderList[i].placed) < Date.parse(mainOrder.placed)) {
                        mainOrder = orderList[i];
                    }
                }

                // getActiveOrderList still sends "completed" orders. Needs to be fixed...
                switch(mainOrder.state) {
                    case "claimed":
                        return {text: "Pick up food", action: null};
                    case "en route":
                        return {text: "Notify customer of arrival", action: null};
                    case "arrived":
                        return {text: "Complete order", action: null};
                }
            }
        } else {
            var order = await getOrder(this.state.apiToken);
            if (order == null) {
                return {text: "Place order", action: () => this.setScreen("RestaurantsList")}
            } else {
                return {text: "Message Deliverer", action: () => this.setScreen("Message")}
            }
        }
        return null;
    }

    render() {
        if (this.state.apiToken) storeState(this.state, "screenHandler");
        if (!this.state.actionBtnUpdated) this.loadActionBtnData();

        return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/login" component={LoginScreen}/>
                    <Route path="/register" component={RegisterProcess}/>
                    <Route path="/app" component={mainScreen}/>
                    <Redirect exact from="/" to="/login"/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
        );
    }
}