import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import { IonButton } from "@ionic/react";
import Button from "../../components/Button";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
        };
    }

    render() {
        return (
            <Screen
                appBar={{
                    title: "Delivery Mode",
                    onBack: this.props.history.goBack,
                }}>
                Delivery Count: Rating: Average Delivery Time: Amount Earned:
                <IonButton>Start Delivering</IonButton>
                <Button>Start Delivering</Button>
            </Screen>
        );
    }
}

const mapStateToProps = ({ apiToken, userDetails: { isDeliverer } }) => ({
    apiToken,
    isDeliverer,
});

export default connect(mapStateToProps)(IncomingOrders);
