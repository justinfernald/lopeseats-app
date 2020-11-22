import React from "react";

import { IonRouterOutlet, IonPage } from "@ionic/react";
import { Route, Switch } from "react-router-dom";
import RestaurantsList from "./RestaurantsList";
import RestaurantDetails from "./RestaurantDetails";
import DeliveryDetails from "./DeliveryDetails";
import CheckoutScreen from "./CheckoutScreen";
import Category from "./Category";
import DeliveryRoomNumber from "./DeliveryRoomNumber";

export default function RestaurantsRouter() {
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
                        path="/app/:tab(restaurants)/category/:id"
                        component={Category}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/address"
                        component={DeliveryDetails}
                    />
                    <Route
                        exact
                        path="/app/:tab(restaurants)/roomnumber"
                        component={DeliveryRoomNumber}
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
