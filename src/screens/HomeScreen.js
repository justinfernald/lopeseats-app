import React from "react";
import { IonPage } from "@ionic/react";
import Screen from "../components/Screen";

// import LopesWayImage from '../assets/images/gcu-lopesway.jpg';
// import {Link, BrowserRouter} from 'react-router-dom';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };

        this.tiles = [
            // Delivery Mode
            [
                {
                    title: "Incoming Orders",
                    icon: "restaurant",
                },
                {
                    title: "Active Orders",
                    icon: "timer",
                },
                {
                    title: "Ordering Mode",
                    // icon: "fastfood"
                    icon: "local_shipping",
                },
                {
                    title: "Payouts",
                    icon: "track_changes",
                },
                {
                    title: "Completed Orders",
                    icon: "update",
                },
                {
                    title: "Profile",
                    icon: "person",
                },
            ],
            //Customer Mode
            [
                {
                    title: "Restaurants",
                    icon: "restaurant",
                },
                {
                    title: "Recent Orders",
                    icon: "timer",
                },
                {
                    title: "Delivery Mode",
                    // icon: "fastfood"
                    icon: "local_shipping",
                },
                {
                    title: "Order Tracker",
                    icon: "track_changes",
                },
                {
                    title: "Dining Updates",
                    icon: "update",
                },
                {
                    title: "Profile",
                    icon: "person",
                },
            ],
        ];
    }

    componentDidMount() {}

    componentWillUnmount() {}

    changeScreen(screen) {
        if (screen === "SwitchMode") {
            this.props.switchModes();
        } else this.props.onMenuItemClick(screen);
    }

    render() {
        return (
            <Screen>
                <div
                    className="flexDisplay fillHeight homeScreen"
                    style={{
                        position: "absolute",
                        width: "100%",
                        background: "white",
                    }}>
                    <div className="flex img-fill bg-img">
                        {/* <img  alt="Lopes Way" src={LopesWayImage}/>
                        <div className="imageGradient"></div> */}
                        <div className="mainDisplayText">
                            <div className="subHeading">
                                {this.props.deliveryMode
                                    ? "Deliver for"
                                    : "Welcome to"}
                            </div>
                            <div className="heading">LopesEat</div>
                        </div>
                        {this.props.actionBtn == null || (
                            <div
                                className="homeFuncBtn"
                                onClick={() => this.props.actionBtn.action()}>
                                {this.props.actionBtn.text}
                            </div>
                        )}
                    </div>
                    <div className="screenTiles">
                        {this.tiles[this.props.deliveryMode ? 0 : 1].map(
                            (value, index) => {
                                return (
                                    <div
                                        className={"screenTile"}
                                        key={index}
                                        onClick={() => {
                                            this.changeScreen(
                                                this.props.tileNavigation[
                                                    this.props.deliveryMode
                                                        ? 0
                                                        : 1
                                                ][index]
                                            );
                                        }}>
                                        <div className="iconTile">
                                            <i className="material-icons-round">
                                                {value.icon}
                                            </i>
                                        </div>
                                        <div>{value.title}</div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </Screen>
        );
    }
}
