import React from "react";

import { setupBackEvent, loadState } from "../assets/scripts/Util";

import LoginScreen from "./Authentication/LoginScreen";
import RegisterRouter from "./Authentication/RegisterProcess/RegisterRouter";

import {
    // updateFBToken,
    getOrder,
    getActiveOrderList,
} from "../assets/scripts/Util";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import TabScreen from "./TabScreen";
import { connect } from "react-redux";
import history from "../history";
import RerunScript from "../assets/scripts/RerunScript";

class ScreenHandler extends React.Component {
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
                deliveryMode: false,
                openItem: null,
                editingItem: false,
                optionsChosen: [],
                instructions: null,
                actionBtn: null,
                actionBtnUpdated: false,
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

    componentDidMount() { }

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
            if (orderList.length === 0) {
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
                    default:
                        break;
                }
            }
        } else {
            var order = await getOrder(this.props.apiToken);
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
        if (!this.state.actionBtnUpdated) this.loadActionBtnData();

        return (
            <IonReactRouter history={history}>
                <IonRouterOutlet>
                    <Switch>
                        <Route exact path="/login" component={LoginScreen} />
                        <Route path="/register" component={RegisterRouter} />
                        <Route path="/app" component={TabScreen} />
                        <Redirect exact from="/" to="/login" />
                    </Switch>
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }
}

const mapStateToProps = ({ apiToken }) => ({
    apiToken,
});

export default connect(mapStateToProps)(ScreenHandler);
