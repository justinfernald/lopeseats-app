import React from "react";

import { IonRouterOutlet, IonPage } from "@ionic/react";
import { Route, Switch } from "react-router-dom";
import RestaurantsList from "./RestaurantsList";
import RestaurantDetails from "./RestaurantDetails";
import ItemOptions from "./ItemOptions";
import Cart from "../Cart";
import DeliveryDetails from "./DeliveryDetails";
import CheckoutScreen from "./CheckoutScreen";
import RerunScript from "../../../assets/scripts/RerunScript";

export default function RestaurantsRouter() {
    RerunScript();
    return (
        <IonPage id="restaurants">
            <IonRouterOutlet>
                <Switch>
                    <Route
                        exact
                        path="/app/:tab(restaurants)"
                        component={RestaurantsList}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/details"
                        component={RestaurantDetails}
                    />
                    <Route
                        exact
                        path="/app/restaurants/details/:id"
                        component={RestaurantDetails}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/item"
                        component={ItemOptions}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/cart"
                        component={Cart}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/address"
                        component={DeliveryDetails}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/checkout"
                        component={CheckoutScreen}
                    />
                </Switch>
            </IonRouterOutlet>
        </IonPage>
    );
}
