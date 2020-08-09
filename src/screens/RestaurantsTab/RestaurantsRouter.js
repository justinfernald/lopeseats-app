import React from "react";

import { IonRouterOutlet, IonPage } from "@ionic/react";
import { Route } from "react-router-dom";
import RestaurantsList from "./RestaurantsList";
import RestaurantDetails from "./RestaurantDetails";
import ItemOptions from "./ItemOptions";
import Cart from "../Cart";
import DeliveryDetails from "./DeliveryDetails";
import CheckoutScreen from "./CheckoutScreen";

export default function RestaurantsRouter() {
    return (
        <IonPage id="restaurants">
            <IonRouterOutlet>
                <Route
                    exact
                    path="/app/:tab(restaurants)"
                    component={RestaurantsList}
                />
                <Route
                    exact
                    path="/app/:tab(restaurants)/details"
                    component={RestaurantDetails}
                    exact
                />
                {/* <Route
                    exact
                    path="/app/restaurants/details/:id"
                    component={RestaurantDetails}
                    exact
                /> */}
                <Route
                    exact
                    path="/app/:tab(restaurants)/item"
                    component={ItemOptions}
                />
                <Route exact path="/app/:tab(restaurants)/cart" component={Cart} />
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
            </IonRouterOutlet>
        </IonPage>
    );
}
