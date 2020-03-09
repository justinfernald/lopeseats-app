import React, {Fragment} from 'react';

import {registerAccount, addBackStep, setupBackEvent, loadState} from '../assets/scripts/Util';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import PersonalInformation from './RegisterProcess/PersonalInformation';
import VerifyPhone from './RegisterProcess/VerifyPhone';
import PhoneConfirm from './RegisterProcess/PhoneConfirm';
import ForgotPassword from './ForgotPassword';
import HomeScreen from './HomeScreen';
import RestaurantsList from './QuickScreens/RestaurantsList';
import RestaurantDetails from './QuickScreens/RestaurantDetails';
import OrderTracker from './QuickScreens/OrderTracker';
import IncomingOrders from './QuickScreens/IncomingOrders';
import ActiveOrders from './QuickScreens/ActiveOrders';
import CheckoutScreen from './OrderProcess/CheckoutScreen';
import DeliveryDetails from './OrderProcess/DeliveryDetails';
import OrderScreen from './DeliveryProcess/OrderScreen';
import PaymentScreen from './DeliveryProcess/PaymentScreen';
import Cart from './Cart';
import MessageScreen from './MessageScreen';
import {storeState} from '../assets/scripts/Util';

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
            // screen: "HomeScreen",
            baseScreen: "Login",
            screenHistory: ["Login"],
            deliveryMode: false
        };

        setupBackEvent(this.backScreen);

        window.getScreenHandler = () => this;
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    setScreen = (screen, addHistory = true) => {
        if (screen === this.state.screen) return;
        let screenHistory = this.state.screenHistory;
        if (addHistory) {
            screenHistory.push(screen);
            addBackStep();
        }
        this.setState({
            screenHistory: screenHistory,
            screen: screen,
        });
    }
    
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
                screen: [...screenHistory].pop()
            });
            
        }
    }

    newHistory = screen => {
        this.noBack = true;
        for (let i = 0; i < this.state.screenHistory.length - 1; i++) {
            window.history.back();
        }

        this.setState({
            screenHistory: [screen],
            screen: screen,
            baseScreen: screen
        })
        this.noBack = false;
    }

    render() {
        if (this.state.apiToken)
            storeState(this.state, "screenHandler");
        
        const Screens = {
            Login: <LoginScreen fbToken={this.props.fbToken} apiToken={(loadState("screenHandler") && loadState("screenHandler").apiToken) ? loadState("screenHandler").apiToken : undefined} formSwitch={() => this.setState({screen: "Register"})}
            onLogin={
                apiToken => {
                    this.newHistory("HomeScreen");

                    let newState = loadState("screenHandler");
                    if (newState && newState.screenHistory)
                    for (let i = 1; i < newState.screenHistory.length; i++) {
                        addBackStep();
                    }

                    this.setState(newState);
                    this.setState({
                        apiToken: apiToken
                    });
                }
            }
            onNotConfirmed={
                phone => {
                    this.setState({
                        registerData: {
                            phone: phone
                        }
                    });
                    this.newHistory("PhoneConfirm");
                }
            }
            onForgotPassword={
                () => {
                    this.setState({
                        // screen: "ForgotPassword"
                    })
                }
            }/>,
            Register: <RegisterScreen 
            formSwitch={
                () => this.setState({screen: "Login"})
            }
            proceedRegistration={
                (phone, password) => {
                    this.setState({
                        registerData: {
                            phone, password
                        },
                    });
                    this.setScreen("PersonalInformation");
                }
            }/>,
            PersonalInformation: <PersonalInformation
            onNextStep={
                (firstName, lastName, email, studentNumber, profileImage) => {
                    this.setState({
                        registerData: {
                            firstName, lastName, email, studentNumber, profileImage,
                            phone: this.state.registerData.phone,
                            password: this.state.registerData.password
                        }
                    });
                    this.setScreen("VerifyPhone");
                }
            }
            onBackStep={
                () => {
                    this.backScreen();
                }
            }
            />,
            VerifyPhone: <VerifyPhone phone={this.state.registerData.phone}

            onBackStep={
                () => {
                    this.backScreen();
                }
            }

            onNextStep={
                phone => {
                    this.setState({
                        registerData: {
                            phone,
                            firstName: this.state.registerData.firstName,
                            lastName: this.state.registerData.lastName,
                            email: this.state.registerData.email,
                            studentNumber: this.state.registerData.studentNumber,
                            profileImage: this.state.registerData.profileImage,
                            password: this.state.registerData.password
                        }
                    });
                    this.newHistory("PhoneConfirm");
                    registerAccount(phone, this.state.registerData.firstName, this.state.registerData.lastName, this.state.registerData.email, this.state.registerData.studentNumber, this.state.registerData.password, this.state.registerData.profileImage);
                }
            }/>,
            PhoneConfirm: <PhoneConfirm phone={this.state.registerData.phone} onNextStep={
                () => {
                    this.newHistory("HomeScreen");
                }
            }/>,
            ForgotPassword: <ForgotPassword />,
            HomeScreen: <HomeScreen
            tileNavigation={[
                // Delivery Mode
                ["IncomingOrders", "ActiveOrders", "SwitchMode", "LeaderBoard", "CompletedOrders", "Profile"]
                // Customer Mode
                ,["RestaurantsList", "RecentOrders", "SwitchMode", "OrderTracker", "Updates", "Profile"]]}
            onMenuItemClick={
                screen => {
                    this.setScreen(screen);
                }
            }
            deliveryMode={this.state.deliveryMode}
            switchModes={() => this.setState({deliveryMode: !this.state.deliveryMode})}
            />,
            RestaurantsList: <RestaurantsList onBack={this.backScreen} 
            openRestaurantScreen={
                (restaurant, menu) => {
                    this.setState({
                        currentRestaurant: restaurant,
                        currentMenu: menu
                    })
                    this.setScreen("RestaurantDetails");
                }
            }
            onCartClick={()=>{this.setScreen("Cart")}}
            />,
            RestaurantDetails: <RestaurantDetails restaurantData={this.state.currentRestaurant} menuData={this.state.currentMenu}
            onBack={()=> {
                this.backScreen();
            }}/>,
            Cart: <Cart onBack={this.backScreen} apiToken={this.state.apiToken}
            onNextStep={() => {
                this.setScreen("DeliveryDetails");
            }}
            />,
            DeliveryDetails: <DeliveryDetails address={this.state.address} onBack={this.backScreen}
            onNextStep={(address) => {
                this.setState({address});
                this.setScreen("CheckoutScreen");
            }}
            />,
            CheckoutScreen: <CheckoutScreen address={this.props.address} onBack={this.backScreen} apiToken={this.state.apiToken}
            paymentComplete={() => {
                this.setScreen("HomeScreen");
            }}
            />,
            OrderTracker: <OrderTracker apiToken={this.state.apiToken} messageListener={this.props.messageListener}
            onBack={()=> {
                this.backScreen();
            }}
            onMessageClick={(orderId) => {
                this.setState({
                    orderId
                });
                this.setScreen("Message");
            }}/>,
            Message: <MessageScreen messageListener={this.props.messageListener} apiToken={this.state.apiToken} orderId={this.state.orderId} onBack={this.backScreen}/>,
            IncomingOrders: <IncomingOrders onBack={this.backScreen} apiToken={this.state.apiToken} openOrderScreen={(order) => {
                this.setState({
                    currentOrder: order.id
                });
                this.setScreen("OrderScreen");
            }}/>,
            OrderScreen: <OrderScreen apiToken={this.state.apiToken} onBack={this.backScreen} orderId={this.state.currentOrder}
            openPayment={(orderId) => {
                this.setState({
                    currentOrder: orderId
                });
                this.setScreen("PaymentScreen", false);
            }}
            completeOrder={() => {
                this.setScreen("HomeScreen", false);
            }}
            onMessageClick={(orderId) => {
                this.setState({
                    orderId
                });
                this.setScreen("Message");
            }}/>,
            PaymentScreen: <PaymentScreen apiToken={this.state.apiToken} onBack={this.backScreen} orderId={this.state.currentOrder}
            onMessageClick={(orderId) => {
                this.setState({
                    orderId
                });
                this.setScreen("Message");
            }}
            paymentComplete={(orderId) => {
                this.setState({
                    currentOrder: orderId
                });
                this.setScreen("OrderScreen", false);
            }}/>,
            ActiveOrders: <ActiveOrders onBack={this.backScreen} apiToken={this.state.apiToken} openOrderScreen={(order) => {
                this.setState({
                    currentOrder: order.id
                });
                this.setScreen("OrderScreen");
            }}/>
        }

        return (
            <Fragment>{Screens[this.state.screen]}</Fragment>
        );
    }
}