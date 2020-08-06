import React from "react";

import { IonRouterOutlet } from "@ionic/react"
import { Route } from 'react-router-dom';
import OrderTracker from './OrderTracker';
import MessageScreen from './MessageScreen';

export default function TrackerRouter() {
    return (<IonRouterOutlet>
        <Route exact path="/app/tracker" component={OrderTracker}/>
        <Route exact path="/app/tracker/message" component={MessageScreen}/>
    </IonRouterOutlet>);
}