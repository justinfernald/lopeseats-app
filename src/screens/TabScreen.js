import React from "react";
import { connect } from "react-redux";

import {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";

import HomeScreen from "./Customer/HomeScreen/HomeScreen"; // temp import for testing new layout. TODO: change to "./Customer/HomeScreen"
import RestaurantsRouter from "./Customer/RestaurantsTab/RestaurantsRouter";
import DelivererOrder from "./Deliverer/DelivererOrder";
import DelivererPayment from "./Deliverer/DelivererPayment";
import TrackerRouter from "./Customer/TrackerTab/TrackerRouter";

import { restaurant, search, person } from "ionicons/icons";
import DelivererRouter from "./Deliverer/DelivererRouter";
import ProfileRouter from "./Customer/ProfileTab/ProfileRouter";

const MainScreen = (props) =>
    !props.apiToken ? (
        <Redirect
            to={{
                pathname: "/login",
                state: {
                    from: props.location,
                },
            }}
        />
    ) : (
            <IonPage id="app">
                <IonTabs>
                    <IonRouterOutlet>
                        <Route
                            path="/app/:tab(home)"
                            component={HomeScreen}
                            exact
                        />
                        <Route
                            path="/app/:tab(restaurants)"
                            component={RestaurantsRouter}
                        />
                        <Route
                            path="/app/:tab(deliverer)"
                            component={DelivererRouter}
                        />
                        <Route
                            path="/app/:tab(tracker)"
                            component={TrackerRouter}
                        />
                        <Route
                            path="/app/:tab(profile)"
                            component={ProfileRouter}
                        />
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
                        <Redirect from="/app" to="/app/home" exact />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom" mode="md">
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
                        {props.isDeliverer ? (
                            <IonTabButton tab="delivery" href="/app/deliverer">
                                {props.activeOrderCount ? (
                                    <div
                                        style={{
                                            position: "absolute",
                                            background: "var(--secondary)",
                                            padding: "0px 4px",
                                            minWidth: 24,
                                            textAlign: "center",
                                            borderRadius: "30px",
                                            color: "white",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            top: "3px",
                                            right: "3px",
                                        }}>
                                        {props.activeOrderCount}
                                    </div>
                                ) : null}
                                <div
                                    style={{
                                        ...{
                                            border: "2px solid transparent",
                                            position: "absolute",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            transform: "translateY(1px)",
                                            transition: "0.4s ease-in-out",
                                        },
                                        ...(props.deliveryModeActive
                                            ? {
                                                border:
                                                    "2px solid var(--secondary)",
                                            }
                                            : null),
                                    }}></div>
                                <i
                                    className="material-icons-round"
                                    style={{
                                        width: "100%",
                                        height: "50%",
                                        fontSize: "1.9em",
                                    }}>
                                    local_shipping
                            </i>
                            </IonTabButton>
                        ) : null}
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
            </IonPage>
        );

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
    activeOrderCount,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
    activeOrderCount,
});

export default connect(mapStateToProps)(MainScreen);
