import React from "react";
import {} from "../../assets/scripts/Util";
import Screen from "../../components/Screen";

export default class SelectedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
        };
        this.fetchData();
    }

    async fetchData() {
        console.log(this.props.match.params.id);
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
        return (
            <Screen
                appBar={{
                    title: "Order",
                    onBack: this.props.history.goBack,
                }}></Screen>
        );
    }
}
