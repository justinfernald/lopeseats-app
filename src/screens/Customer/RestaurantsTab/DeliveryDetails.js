import React from "react";
import Input from "../../../components/Input";
import {
    getBuildings, showErrors,
} from "../../../assets/scripts/Util";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import Button from "../../../components/Button";
import { css, StyleSheet } from "aphrodite/no-important";

class DeliveryDetails extends React.Component {
    constructor(props) {
        super(props);
        var address = props.address;
        if (props.address === null) address = "";
        this.addressRef = React.createRef(address);
        this.state = {
            search: address,
            searchResults: []
        };

        this.updateValue(address);
    }

    async updateValue(value) {
        var search = value;
        var searchResults = [];

        var { buildings } = this.props;

        if (buildings == null) {
            buildings = await getBuildings();
        }

        for (var i = 0; i < buildings.length; i++) {
            if (!buildings[i].name) continue;
            if (!search || buildings[i].name.toLowerCase().includes(search.toLowerCase())) {
                searchResults.push(buildings[i]);
            }
        }

        this.setState({ search, searchResults });
    }

    setValue(value) {
        this.addressRef.current.value = value;
        this.updateValue(value);
    }

    onNextStep = (address) => {
        if (this.state.searchResults.length > 0 && this.state.searchResults[0].name === address) {

            store.dispatch(actions.setAddress(address));
            if (this.state.searchResults[0].room_number)
                this.props.history.push("/app/restaurants/roomnumber");
            else {
                store.dispatch(actions.setRoomNumber(-1));
                this.props.history.push("/app/restaurants/checkout");
            }
        } else {
            showErrors(["Please select a building."]);
        }
    };

    render() {
        return (
            <Screen
                appBar={{
                    title: "Delivery Details", backBtn: true
                }}>
                <div
                    className={"deliveryFormContainer " + css(styles.container)} style={{ height: "100%" }}>
                    <div className="addressInput">
                        <Input
                            passedRef={this.addressRef}
                            placeholder="Address"
                            onChange={(e) => this.updateValue(e.target.value)}
                            defaultValue={this.props.address}
                        />
                    </div>

                    <div className="addrResults">
                        {this.state.searchResults.map((value, index) => {
                            return (
                                <div
                                    onClick={() => this.setValue(value.name)}
                                    key={index}
                                    className={
                                        "addrItem" +
                                        (value.name.toLowerCase() ===
                                            this.state.search.toLowerCase()
                                            ? " selected"
                                            : "")
                                    }>
                                    <span className="addrTitle">
                                        {value.name}
                                    </span>
                                    <span className="material-icons check">
                                        done
                                        </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="addrDoneBtn">
                        <Button onClick={() =>
                            this.onNextStep(this.addressRef.current.value)
                        }>
                            Done
                        </Button>
                    </div>
                </div>
            </Screen>
        );
    }
}

export default connect(({ address, buildings }) => ({ address, buildings }))(DeliveryDetails)

const styles = StyleSheet.create({
    container: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    }
});