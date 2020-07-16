import React, { Fragment } from "react";

import {
    registerAccount,
    addBackStep,
    setupBackEvent,
    loadState,
} from "../assets/scripts/Util";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import PersonalInformation from "./RegisterProcess/PersonalInformation";
import VerifyPhone from "./RegisterProcess/VerifyPhone";
import PhoneConfirm from "./RegisterProcess/PhoneConfirm";
import ForgotPassword from "./ForgotPassword";
import HomeScreen from "./HomeScreen";
import RestaurantsList from "./QuickScreens/RestaurantsList";
import RestaurantDetails from "./QuickScreens/RestaurantDetails";
import OrderTracker from "./QuickScreens/OrderTracker";
import IncomingOrders from "./QuickScreens/IncomingOrders";
import ActiveOrders from "./QuickScreens/ActiveOrders";
import Payouts from "./QuickScreens/Payouts";
import CheckoutScreen from "./OrderProcess/CheckoutScreen";
import DeliveryDetails from "./OrderProcess/DeliveryDetails";
import OrderScreen from "./DeliveryProcess/OrderScreen";
import PaymentScreen from "./DeliveryProcess/PaymentScreen";
import Cart from "./Cart";
import MessageScreen from "./MessageScreen";
import ItemOptions from "./OrderProcess/ItemOptions";
import DelivererPayment from "./DelivererScreens/DelivererPayment";

import { storeState, updateFBToken } from "../assets/scripts/Util";

export default class ScreenHandler extends React.Component {
    constructor(props) {
        super(props);
        this.noBack = false;

        this.state = {
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
        };

        setupBackEvent(this.backScreen);

        window.getScreenHandler = () => this;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    setScreenState = (screen, newState, addHistory = true) => {
        if (screen === this.state.screen) return;
        let screenHistory = this.state.screenHistory;
        if (addHistory) {
            screenHistory.push(screen);
            addBackStep();
        }
        console.log({
            newState,
        });
        this.setState((s) => ({
            ...s,
            ...newState,
        }));
        setTimeout(() => {
            this.setState((s) => ({
                ...s,
                screenHistory,
                screen,
            }));
        }, 10);
    };

    setScreen = (screen, addHistory = true) => {
        if (screen === this.state.screen) return;
        let screenHistory = this.state.screenHistory;
        if (addHistory) {
            screenHistory.push(screen);
            addBackStep();
        }
        this.setState((s) => ({
            ...s,
            screenHistory,
            screen,
        }));
    };

    backScreen = (setBack = true) => {
        if (!this.noBack) {
            if (setBack) {
                window.history.back();
                return;
            }
            let screenHistory = this.state.screenHistory;
            screenHistory.pop();
            if (screenHistory.length === 0) {
                screenHistory = [this.state.baseScreen];
            }
            this.setState({
                screenHistory: screenHistory,
                screen: [...screenHistory].pop(),
            });
        }
    };

    newHistory = (screen) => {
        this.noBack = true;
        for (let i = 0; i < this.state.screenHistory.length - 1; i++) {
            window.history.back();
        }

        this.setState({
            screenHistory: [screen],
            screen: screen,
            baseScreen: screen,
        });
        this.noBack = false;
    };

    render() {
        if (this.state.apiToken) storeState(this.state, "screenHandler");

        const Screens = {
            Login: (
                <LoginScreen
                    fbToken={this.props.fbToken}
                    apiToken={
                        loadState("screenHandler") &&
                        loadState("screenHandler").apiToken
                            ? loadState("screenHandler").apiToken
                            : undefined
                    }
                    formSwitch={() => this.setState({ screen: "Register" })}
                    onLogin={(apiToken) => {

                        this.newHistory("HomeScreen");

                        let newState = loadState("screenHandler");
                        if (newState && newState.screenHistory)
                            for (
                                let i = 1;
                                i < newState.screenHistory.length;
                                i++
                            ) {
                                addBackStep();
                            }
                        
                        newState.apiToken = apiToken;

                        this.setState(newState);
                        updateFBToken(this.props.fbToken, "web", apiToken);
                    }}
                    onNotConfirmed={(phone) => {
                        this.setState({
                            registerData: {
                                phone: phone,
                            },
                        });
                        this.newHistory("PhoneConfirm");
                    }}
                    onForgotPassword={() => {
                        this.setState({
                            // screen: "ForgotPassword"
                        });
                    }}
                />
            ),
            Register: (
                <RegisterScreen
                    formSwitch={() => this.setState({ screen: "Login" })}
                    proceedRegistration={(phone, password) => {
                        this.setState({
                            registerData: {
                                phone,
                                password,
                            },
                        });
                        this.setScreen("PersonalInformation");
                    }}
                />
            ),
            PersonalInformation: (
                <PersonalInformation
                    onNextStep={(
                        firstName,
                        lastName,
                        email,
                        studentNumber,
                        profileImage
                    ) => {
                        this.setState({
                            registerData: {
                                firstName,
                                lastName,
                                email,
                                studentNumber,
                                profileImage,
                                phone: this.state.registerData.phone,
                                password: this.state.registerData.password,
                            },
                        });
                        this.setScreen("VerifyPhone");
                    }}
                    onBackStep={() => {
                        this.backScreen();
                    }}
                />
            ),
            VerifyPhone: (
                <VerifyPhone
                    phone={this.state.registerData.phone}
                    onBackStep={() => {
                        this.backScreen();
                    }}
                    onNextStep={(phone) => {
                        this.setState({
                            registerData: {
                                phone,
                                firstName: this.state.registerData.firstName,
                                lastName: this.state.registerData.lastName,
                                email: this.state.registerData.email,
                                studentNumber: this.state.registerData
                                    .studentNumber,
                                profileImage: this.state.registerData
                                    .profileImage,
                                password: this.state.registerData.password,
                            },
                        });
                        this.newHistory("PhoneConfirm");
                        registerAccount(
                            phone,
                            this.state.registerData.firstName,
                            this.state.registerData.lastName,
                            this.state.registerData.email,
                            this.state.registerData.studentNumber,
                            this.state.registerData.password,
                            this.state.registerData.profileImage
                        );
                    }}
                />
            ),
            PhoneConfirm: (
                <PhoneConfirm
                    phone={this.state.registerData.phone}
                    onNextStep={() => {
                        this.newHistory("HomeScreen");
                    }}
                />
            ),
            ForgotPassword: <ForgotPassword />,
            HomeScreen: (
                <HomeScreen
                    tileNavigation={[
                        // Delivery Mode
                        [
                            "IncomingOrders",
                            "ActiveOrders",
                            "SwitchMode",
                            "Payouts",
                            "CompletedOrders",
                            "Profile",
                        ],
                        // Customer Mode
                        [
                            "RestaurantsList",
                            "RecentOrders",
                            "SwitchMode",
                            "OrderTracker",
                            "Updates",
                            "Profile",
                        ],
                    ]}
                    onMenuItemClick={(screen) => {
                        this.setScreen(screen);
                    }}
                    deliveryMode={this.state.deliveryMode}
                    switchModes={() => {
                        this.setState({
                            deliveryMode: !this.state.deliveryMode,
                        });
                        this.props.setTheme(!this.state.deliveryMode);
                    }}
                />
            ),
            RestaurantsList: (
                <RestaurantsList
                    onBack={this.backScreen}
                    openRestaurantScreen={(restaurant, menu) => {
                        this.setState({
                            currentRestaurant: restaurant,
                            currentMenu: menu,
                        });
                        this.setScreen("RestaurantDetails");
                    }}
                    onCartClick={() => {
                        this.setScreen("Cart");
                    }}
                />
            ),
            RestaurantDetails: (
                <RestaurantDetails
                    restaurantData={this.state.currentRestaurant}
                    menuData={this.state.currentMenu}
                    onBack={() => {
                        this.backScreen();
                    }}
                    openItem={(item) => {
                        this.setState({ openItem: item, editingItem: false });
                        this.setScreen("ItemOptions");
                    }}
                />
            ),
            ItemOptions: (
                <ItemOptions
                    restaurantData={this.state.currentRestaurant}
                    selectedItem={this.state.openItem}
                    editingItem={this.state.editingItem}
                    optionsChosen={this.state.optionsChosen}
                    instructions={this.state.instructions}
                    closeItem={() => {
                        if (this.state.editingItem)
                            this.backScreen();
                        else
                            this.setScreen("Cart", false);
                    }}
                    onBack={() => {
                        this.backScreen();
                    }}
                />
            ),
            Cart: (
                <Cart
                    onBack={this.backScreen}
                    apiToken={this.state.apiToken}
                    editItem={(item) => {
                        console.log("editing: ", item);
                        var optionsChosen = JSON.parse(item.options);
                        var items = JSON.parse(item.items);
                        var openItem = item;
                        for (var i = 0; i < optionsChosen.length; i++) {
                            var optionObj = optionsChosen[i];
                            for (var j = 0; j < items[i].options.length; j++) {
                                var option = items[i].options[j];
                                var cost = option.choices[optionObj[option.name]].cost;
                                if (cost > 0) {
                                    openItem.price -= cost;
                                }
                            }
                        }

                        var instructions = item.comment;
                        var editingItem = true;
                        this.setScreenState("ItemOptions", {
                            editingItem,
                            openItem,
                            optionsChosen,
                            instructions,
                        });
                    }}
                    onNextStep={() => {
                        this.setScreen("DeliveryDetails");
                    }}
                />
            ),
            DeliveryDetails: (
                <DeliveryDetails
                    address={this.state.address}
                    onBack={this.backScreen}
                    onNextStep={(address) => {
                        this.setState({ address });
                        this.setScreen("CheckoutScreen");
                    }}
                />
            ),
            CheckoutScreen: (
                <CheckoutScreen
                    address={this.props.address}
                    onBack={this.backScreen}
                    apiToken={this.state.apiToken}
                    paymentComplete={() => {
                        this.setScreen("HomeScreen");
                    }}
                />
            ),
            OrderTracker: (
                <OrderTracker
                    apiToken={this.state.apiToken}
                    messageListener={this.props.messageListener}
                    onBack={() => {
                        this.backScreen();
                    }}
                    onMessageClick={(orderId) => {
                        this.setState({
                            orderId,
                        });
                        this.setScreen("Message");
                    }}
                />
            ),
            Message: (
                <MessageScreen
                    messageListener={this.props.messageListener}
                    apiToken={this.state.apiToken}
                    orderId={this.state.orderId}
                    onBack={this.backScreen}
                />
            ),
            IncomingOrders: (
                <IncomingOrders
                    onBack={this.backScreen}
                    apiToken={this.state.apiToken}
                    openOrderScreen={(order) => {
                        this.setState({
                            currentOrder: order.id,
                        });
                        this.setScreen("OrderScreen");
                    }}
                />
            ),
            OrderScreen: (
                <OrderScreen
                    apiToken={this.state.apiToken}
                    onBack={this.backScreen}
                    orderId={this.state.currentOrder}
                    openPayment={(orderId) => {
                        this.setState({
                            currentOrder: orderId,
                        });
                        this.setScreen("PaymentScreen", false);
                    }}
                    completeOrder={() => {
                        this.setScreen("HomeScreen", false);
                    }}
                    onMessageClick={(orderId) => {
                        this.setState({
                            orderId,
                        });
                        this.setScreen("Message");
                    }}
                />
            ),
            PaymentScreen: (
                <PaymentScreen
                    apiToken={this.state.apiToken}
                    onBack={this.backScreen}
                    orderId={this.state.currentOrder}
                    onMessageClick={(orderId) => {
                        this.setState({
                            orderId,
                        });
                        this.setScreen("Message");
                    }}
                    paymentComplete={(orderId) => {
                        this.setState({
                            currentOrder: orderId,
                        });
                        this.setScreen("OrderScreen", false);
                    }}
                />
            ),
            ActiveOrders: (
                <ActiveOrders
                    onBack={this.backScreen}
                    apiToken={this.state.apiToken}
                    openOrderScreen={(order) => {
                        this.setState({
                            currentOrder: order.id,
                        });
                        this.setScreen("OrderScreen");
                    }}
                />
            ),
            Payouts: (
                <Payouts
                    onBack={this.backScreen}
                    apiToken={this.state.apiToken}
                />
            ),
            DelivererPayment: (
                <DelivererPayment
                    onBack={this.backScreen}
                    apiToken={this.state.apiToken}
                />
            ),
        };

        return <Fragment>{Screens[this.state.screen]}</Fragment>;
    }
}
