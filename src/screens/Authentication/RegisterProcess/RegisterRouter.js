import React from "react";

import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import RegisterScreen from "../../Authentication/RegisterScreen";
import PersonalInformation from "./PersonalInformation";
import VerifyPhone from "./VerifyPhone";
import PhoneComirm from "./PhoneConfirm";

export default function RegisterRouter() {
    return (
        <IonRouterOutlet>
            <Route exact path="/register" component={RegisterScreen} />
            <Route
                exact
                path="/register/info"
                component={PersonalInformation}
            />
            <Route exact path="/register/verify" component={VerifyPhone} />
            <Route exact path="/register/confirm" component={PhoneComirm} />
        </IonRouterOutlet>
    );
}
