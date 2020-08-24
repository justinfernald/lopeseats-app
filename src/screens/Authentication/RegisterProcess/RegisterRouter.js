import React from "react";

import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import RegisterScreen from "../../Authentication/RegisterScreen";
import PersonalInformation from "./PersonalInformation";
import VerifyPhone from "./VerifyPhone";
import PhoneComirm from "./PhoneConfirm";
import { IonPage } from "@ionic/react";
import AgreeToTerms from "./AgreeToTerms";

export default function RegisterRouter() {
    return (
        <IonPage>
            <IonRouterOutlet>
                <Route exact path="/register" component={RegisterScreen} />
                <Route
                    exact
                    path="/register/info"
                    component={PersonalInformation}
                />
                <Route exact path="/register/verify" component={VerifyPhone} />
                <Route exact path="/register/agree" component={AgreeToTerms} />
                <Route exact path="/register/confirm" component={PhoneComirm} />
            </IonRouterOutlet>
        </IonPage>
    );
}
