import React from "react";

import { IonRouterOutlet } from "@ionic/react"
import { Route } from 'react-router-dom';
import RestaurantsList from "./RestaurantsList";
import RestaurantDetails from "./RestaurantDetails";
import ItemOptions from "./ItemOptions";

export default function RestaurantsRouter() {
    return (<IonRouterOutlet>
        <Route exact path="/app/restaurants" component={RestaurantsList}/>
        <Route exact path="/app/restaurants/details" component={RestaurantDetails}/>
        <Route exact path="/app/restaurants/item" component={ItemOptions}/>
    </IonRouterOutlet>);
}