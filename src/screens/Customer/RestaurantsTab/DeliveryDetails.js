import React from "react";
import Input from "../../../components/Input";
import {
    getBuildings,
} from "../../../assets/scripts/Util";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import Button from "../../../components/Button";
import { css, StyleSheet } from "aphrodite/no-important";

class DeliveryDetails extends React.Component {

    constructor(props) {
        super(props);
        this.addressRef = React.createRef(props.address);
        this.state = {
            search: this.props.address,
            searchResults: [],
            buildings: null
        };

        this.updateValue(this.props.address);
    }

    componentDidMount() {
    }

    async updateValue(value) {
        var search = value;
        var searchResults = [];

        var { buildings } = this.state;

        if (buildings == null) {
            buildings = await getBuildings();
        }

        for (var i = 0; i < buildings.length; i++) {
            if (!buildings[i].name) continue;
            if (!search) continue;
            if (buildings[i].name.toLowerCase().includes(search.toLowerCase())) {
                searchResults.push(buildings[i]);
            }
        }

        this.setState({ search, searchResults, buildings });
    }

    setValue(value) {
        this.addressRef.current.value = value;
        this.updateValue(value);
    }

    onNextStep = (address) => {
        store.dispatch(actions.setAddress(address));
        this.props.history.push("/app/restaurants/checkout");
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

export default connect(({ address }) => ({ address }))(DeliveryDetails)

const styles = StyleSheet.create({
    container: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    }
});