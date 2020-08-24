import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
// import Button from "../../components/Button";
// import { store, actions } from "../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { getAcceptableOrder } from "../../assets/scripts/Util";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
// import Loading from "../Other/Loading";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivererStats: null,
            publicStats: null,
        };

        this.fetchData(props.match.params.id);
    }

    async fetchData(id) {
        getAcceptableOrder(id);
    }

    acceptOrder() {}

    render() {
        // if ()
        //     return <Loading message="Order accept loading. Please Wait." />;
        return (
            <Screen
                appBar={{
                    title: "Delivery Accept",
                    onBack: this.props.history.goBack,
                }}>
                <div className={css(styles.container)}>
                    <div className={css(styles.orderDetails)}>
                        Information about order here
                    </div>
                    <div className={css(styles.choiceArea)}>
                        <div
                            className={
                                "ion-activatable " +
                                css(styles.choice, styles.accept)
                            }>
                            <IonIcon
                                icon={checkmarkCircleOutline}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    color: "#5cbd5c",
                                }}
                            />
                            <IonRippleEffect />
                        </div>
                        <div
                            className={
                                "ion-activatable " +
                                css(styles.choice, styles.decline)
                            }>
                            <IonIcon
                                icon={closeCircleOutline}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    color: "#fc3a3a",
                                }}
                            />
                            <IonRippleEffect />
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#f3f3f3",
        alignItems: "center",
    },
    orderDetails: {
        flex: 1,
        background: "#fff",
        borderRadius: 10,
        marginBottom: 15,
        width: "100%",
    },
    choiceArea: {
        minWidth: 300,
        height: 100,
        borderRadius: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0px 10px",
    },
    choice: {
        height: 80,
        width: 80,
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",
    },
    accept: {
        // background: "green",
    },
    decline: {
        // background: "red",
    },
});

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
});

export default connect(mapStateToProps)(IncomingOrders);
