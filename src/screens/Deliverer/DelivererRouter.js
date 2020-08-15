import React from "react";

import { IonRouterOutlet, IonPage } from "@ionic/react";
import { Route } from "react-router-dom";
import StartDelivery from "./StartDelivery";
import DeliveryAccept from "./DeliveryAccept";

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
                    path="/app/:tab(deliverer)/accept/:id"
                    component={DeliveryAccept}
                />
            </IonRouterOutlet>
        </IonPage>
    );
}
