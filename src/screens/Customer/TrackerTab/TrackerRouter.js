import React from "react";

import { IonRouterOutlet, IonPage } from "@ionic/react"
import { Route, Switch } from 'react-router-dom';
import OrderTracker from './OrderTracker';
import MessageScreen from './MessageScreen';
import TipCheckout from './TipCheckout';

import RerunScript from "../../../assets/scripts/RerunScript";

export default function TrackerRouter() {
    RerunScript();
    return (<IonPage id="tracker">
        <IonRouterOutlet>
            <Switch>
                <Route exact path="/app/tracker" component={OrderTracker} />
                <Route exact path="/app/tracker/message" component={MessageScreen} />
                <Route exact path="/app/tracker/tipCheckout" component={TipCheckout} />
            </Switch>
        </IonRouterOutlet>
    </IonPage>);
}