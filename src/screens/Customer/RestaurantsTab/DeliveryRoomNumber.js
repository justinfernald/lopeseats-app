import React from "react";
import Input from "../../../components/Input";
import {
    getBuildings, showErrors,
} from "../../../assets/scripts/Util";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import Button from "../../../components/Button";
import { css, StyleSheet } from "aphrodite-jss";

class DeliveryRoomNumber extends React.Component {
    constructor(props) {
        super(props);

        this.roomInputRef = React.createRef();
        this.state = {
            roomNumber: this.props.roomNumber,
            invalid: !(parseInt(this.props.roomNumber) >= 100 && parseInt(this.props.roomNumber) < 700)
        }
    }

    updateValue(e) {
        e.target.value = [...e.target.value].filter(x => !isNaN(parseInt(x))).join("")
        let roomNumber = e.target.value
        this.setState({ roomNumber: String(roomNumber), invalid: !(parseInt(roomNumber) >= 100 && parseInt(roomNumber) < 700) });
    }

    onNextStep = () => {
        if (!this.state.invalid) {
            store.dispatch(actions.setRoomNumber(this.state.roomNumber));
            this.props.history.push("/app/restaurants/checkout");
        } else {
            showErrors(["Enter a valid room number"])
        }
    };

    render() {
        return (
            <Screen
                appBar={{
                    title: "Delivery Room Number", backBtn: true
                }}>
                <div
                    className={"deliveryFormContainer " + css(styles.container)} style={{ height: "100%" }}>
                    <div className="addressInput">
                        <Input
                            className={css(this.state.invalid && styles.roomInvalid)}
                            passedRef={this.roomInputRef}
                            placeholder="217"
                            onChange={(e) => this.updateValue(e)}
                            defaultValue={this.state.roomNumber !== -1 ? this.state.roomNumber : ""}
                        />
                    </div>

                    <div className="addrResults">

                    </div>
                    <div className="addrDoneBtn">
                        <Button onClick={() =>
                            this.onNextStep()
                        }>
                            Done
                        </Button>
                    </div>
                </div>
            </Screen>
        );
    }
}

export default connect(({ roomNumber }) => ({ roomNumber }))(DeliveryRoomNumber)

const styles = StyleSheet.create({
    container: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    roomInput: {

    },
    roomInvalid: {
        color: "red",
        "&>input": {
            color: "red !important",
        }
    }
});