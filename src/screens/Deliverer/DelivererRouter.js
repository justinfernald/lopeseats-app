import React from "react";

import { IonRouterOutlet, IonPage } from "@ionic/react";
import { Route } from "react-router-dom";
import StartDelivery from "./StartDelivery";
import DeliveryAccept from "./DeliveryAccept";
import ActiveOrders from "./ActiveOrders";
import SelectedOrder from "./SelectedOrder";
import Payout from "./Payout";
import DelivererPayment from "./DelivererPayment";
import MessageScreen from "../Customer/TrackerTab/MessageScreen";

export default function DelivererRouter() {
    return (
        <IonPage id="deliverer">
            <IonRouterOutlet>
                <Route
                    exact
                    path="/app/:tab(deliverer)"
                    component={StartDelivery}
                />
                <Route
                    exact
                    path="/app/:tab(deliverer)/payout"
                    component={Payout}
                />
                <Route
                    exact
                    path="/app/:tab(deliverer)/message"
                    component={MessageScreen}
                />
                <Route
                    exact
                    path="/app/:tab(deliverer)/payment/:id"
                    component={DelivererPayment}
                />
                <Route
                    exact
                    path="/app/:tab(deliverer)/activeOrders"
                    component={ActiveOrders}
                />
                <Route
                    exact
                    path="/app/:tab(deliverer)/orders/:id"
                    component={SelectedOrder}
                />
                <Route
                    exact
                    path="/app/:tab(deliverer)/accept/:id"
                    component={DeliveryAccept}
                />
            </IonRouterOutlet>
        </IonPage>
    );
}
