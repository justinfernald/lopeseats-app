import React from "react";
import { connect } from "react-redux";

import { IonPage, IonTabs, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
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
                        component={IncomingOrders}
                        exact
                    />
                    <Route
                        path="/app/:tab(tracker)"
                        component={TrackerRouter}
                    />
                    <Route
                        path="/app/:tab(profile)"
                        component={Profile}
                        exact
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
                    <IonTabButton tab="delivery" href="/app/deliverer">
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
        </IonPage>
    );

const mapStateToProps = ({ apiToken }) => ({
    apiToken,
});

export default connect(mapStateToProps)(MainScreen);
