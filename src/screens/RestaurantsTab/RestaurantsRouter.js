import React from "react";

import { IonRouterOutlet } from "@ionic/react"
import { Route } from 'react-router-dom';
import RestaurantsList from "./RestaurantsList";
import RestaurantDetails from "./RestaurantDetails";
import ItemOptions from "./ItemOptions";
import Cart from "../Cart";
import DeliveryDetails from "./DeliveryDetails";
import CheckoutScreen from "./CheckoutScreen";

export default function RestaurantsRouter() {
    return (<IonRouterOutlet>
        <Route exact path="/app/restaurants" component={RestaurantsList}/>
        <Route exact path="/app/restaurants/details" component={RestaurantDetails}/>
        <Route exact path="/app/restaurants/item" component={ItemOptions}/>
        <Route exact path="/app/restaurants/cart" component={Cart}/>
        <Route exact path="/app/restaurants/address" component={DeliveryDetails}/>
        <Route exact path="/app/restaurants/checkout" component={CheckoutScreen}/>
    </IonRouterOutlet>);
}