import React from "react";
// import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import { getActiveOrder } from "../../assets/scripts/Util";
import Screen from "../../components/Screen";
import Loading from "../Other/Loading";

class SelectedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
        };
        this.fetchData();
    }

    async fetchData() {
        var order = await getActiveOrder(
            this.props.apiToken,
            this.props.match.params.id
        );
        this.setState({ order });
        console.log(order);
    }

    render() {
        // customer name
        // all delivery status details
        // restaurant
        // drop off location
        // order items
        // customer message button
        // status changer button
        // final payment screen button
        if (!this.state.order)
            return (
                <Loading message={"Your active orders loading. Please wait."} />
            );
        return (
            <Screen
                appBar={{
                    title: "Order",
                    onBack: this.props.history.goBack,
                }}></Screen>
        );
    }
}

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
    deliveryStartingTime,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
    deliveryStartingTime,
});

export default connect(mapStateToProps)(SelectedOrder);
