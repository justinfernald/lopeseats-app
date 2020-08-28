import React from "react";
import Input from "../../../components/Input";
import {
    getBuildings,
} from "../../../assets/scripts/Util";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";

class DeliveryDetails extends React.Component {
    buildings = null;

    constructor(props) {
        super(props);
        this.addressRef = React.createRef(props.address);
        this.state = {
            search: "",
            searchResults: [],
        };
    }

    componentDidMount() {}

    async updateValue(e) {
        console.log(e);
        var search = e.target.value;
        var searchResults = [];

        if (this.buildings == null) {
            this.buildings = await getBuildings();
        }

        for (var i = 0; i < this.buildings.length; i++) {
            if (
                this.buildings[i].name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) {
                searchResults.push(this.buildings[i]);
            }
        }

        this.setState({ search, searchResults });
    }

    setValue(value) {
        this.addressRef.current.value = value;
        var obj = { target: { value } };
        this.updateValue(obj);
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
                    className="deliveryFormContainer flex alignCenter">
                    <div className="addressInput">
                        <Input
                            passedRef={this.addressRef}
                            placeholder="Address"
                            onChange={(e) => this.updateValue(e)}
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
                    <button
                        className="doneButton"
                        onClick={() =>
                            this.onNextStep(this.addressRef.current.value)
                        }>
                        DONE
                    </button>
                </div>
            </Screen>
        );
    }
}

export default connect(({address}) => ({address}))(DeliveryDetails)