import React, {Fragment} from 'react';

import {registerAccount, addBackStep, setupBackEvent} from '../assets/scripts/Util';

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
import CheckoutScreen from './OrderProcess/CheckoutScreen';
import DeliveryDetails from './OrderProcess/DeliveryDetails';
import Cart from './Cart';
import MessageScreen from './MessageScreen';


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
            apiToken: "5e2d29af1bb1f",
            address: "",
            currentRestaurant: null,
            currentMenu: null,
            screen: "HomeScreen",
            baseScreen: "Login",
            screenHistory: ["Login"]
        };

        setupBackEvent(this.backScreen);
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
        console.log("thing: ", this.state.screenHistory);
        for (let i = 0; i < this.state.screenHistory.length - 1; i++) {
            console.log(i + 1);
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
        const Screens = {
            Login: <LoginScreen fbToken={this.props.fbToken} formSwitch={() => this.setState({screen: "Register"})}
            onLogin={
                apiToken => {
                    this.newHistory("HomeScreen");
                    this.setState({
                        apiToken: apiToken
                    });
                    // this.setState({
                    //     screen: "HomeScreen"
                    // })
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
                    // this.setState({
                    //     screen: "Register"
                    // })
                }
            }
            />,
            VerifyPhone: <VerifyPhone phone={this.state.registerData.phone}

            onBackStep={
                () => {
                    this.backScreen();
                }
                // () => this.setState({
                //     screen: "PersonalInformation"
                // })
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
                    // this.setState({
                    //     screen: "HomeScreen"
                    // });
                }
            }/>,
            ForgotPassword: <ForgotPassword />,
            HomeScreen: <HomeScreen tileNavigation={["RestaurantsList", "QuickMeals", "RecentOrders", "OrderTracker", "Updates", "Profile"]}
            onMenuItemClick={
                screen => {
                    this.setScreen(screen);
                    // this.setState({
                    //     screen: screen
                    // });
                }
            }
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
            OrderTracker: <OrderTracker apiToken={this.state.apiToken} stateListener={this.props.stateListener}
            onBack={()=> {
                this.backScreen();
            }}
            onMessageClick={() => {this.setScreen("Message")}}/>,
            Message: <MessageScreen onBack={this.backScreen}/>,
        }
        console.log(this.state);
        console.log("token: " + this.props.fbToken);
        return (
            <Fragment>{Screens[this.state.screen]}</Fragment>
        );
    }
}