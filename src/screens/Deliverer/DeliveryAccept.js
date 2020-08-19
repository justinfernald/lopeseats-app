import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
// import Button from "../../components/Button";
// import { store, actions } from "../../Redux";
// import { css, StyleSheet } from "aphrodite/no-important";
// import { getDelivererStats, getPublicStats } from "../../assets/scripts/Util";
// import Loading from "../Other/Loading";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivererStats: null,
            publicStats: null,
        };

        this.fetchData();
        console.log("id: " + props.match.params.id);
    }

    async fetchData() {}

    acceptOrder() {}

    render() {
        // if ()
        //     return <Loading message="Order accept loading. Please Wait." />;
        return (
            <Screen
                appBar={{
                    title: "Delivery Accept",
                    onBack: this.props.history.goBack,
                }}></Screen>
        );
    }
}

// const styles = StyleSheet.create({});

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
