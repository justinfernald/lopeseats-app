import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { CookiesProvider } from "react-cookie";
import { store, persistor } from "./Redux";
import { PersistGate } from "redux-persist/integration/react";
import { setupConfig } from "@ionic/react";

setupConfig({
    hardwareBackButton: false,
    animated: true,
    mode: 'md'
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
