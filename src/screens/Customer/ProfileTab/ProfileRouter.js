import React from "react";

import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import DepositMoney from "./DepositMoney";

export default function ProfileRouter() {
    return (
        <IonPage id="ProfileRouter">
            <IonRouterOutlet>
                <Route
                    exact
                    path="/app/:tab(profile)"
                    component={Profile}
                />
                <Route
                    exact
                    path="/app/:tab(profile)/deposit"
                    component={DepositMoney}
                />
            </IonRouterOutlet>
        </IonPage>
    );
}