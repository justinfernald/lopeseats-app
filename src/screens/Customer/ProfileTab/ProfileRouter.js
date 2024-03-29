import React from "react";

import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import DepositMoney from "./DepositMoney";
import FriendsPhone from "./FriendsPhone";
import DepositCheckout from "./DepositCheckout";
import ContactUs from "./ContactUs"

export default function ProfileRouter() {
    return (
        <IonPage id="ProfileRouter">
            <IonRouterOutlet>
                <Switch>
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
                    <Route
                        exact
                        path="/app/:tab(profile)/friendsInfo"
                        component={FriendsPhone}
                    />
                    <Route
                        exact
                        path="/app/:tab(profile)/depositCheckout"
                        component={DepositCheckout}
                    />
                    <Route
                        exact
                        path="/app/:tab(profile)/contact"
                        component={ContactUs}
                    />
                </Switch>
            </IonRouterOutlet>
        </IonPage>
    );
}