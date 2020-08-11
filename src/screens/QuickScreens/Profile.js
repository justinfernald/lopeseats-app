import React from "react";
import Screen from "../../components/Screen";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Screen
                appBar={{
                    title: "Profile",
                    onBack: this.props.history.goBack,
                }}></Screen>
        );
    }
}
