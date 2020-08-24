import React from "react";
import { TextField, Button } from "@material-ui/core";
import MenuDropdown from "../../../components/Settings/MenuDropdown";
// import { StyleSheet } from "aphrodite/no-important";
import { store, actions } from "../../../Redux";
import { connect } from "react-redux";
import { showErrors } from "../../../assets/scripts/Util";
import { changePhoneNumber } from "../../../Redux/Thunks";

class ChangePhoneNumber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [false, false],
        };

        this.currPhoneRef = React.createRef();
        this.newPhoneRef = React.createRef();
    }

    async save() {
        if (
            this.currPhoneRef.current.value !==
            this.props.userDetails.phoneNumber + ""
        ) {
            showErrors(["Current phone number is incorrect"]);
            this.setState({ errors: [true, false] });
            return;
        }

        var success = await store.dispatch(
            changePhoneNumber(this.newPhoneRef.current.value)
        );

        if (!success.payload) {
            showErrors(["That phone number is already in use."]);
            this.setState({ errors: [false, true] });
            return;
        }

        this.setState({ errors: [false, false] });
        store.dispatch(actions.openOverlay());
    }

    render() {
        return (
            <MenuDropdown id="phone" title={"Phone Number"} height={"152px"}>
                <TextField
                    fullWidth
                    variant="filled"
                    color="primary"
                    id="currPhone"
                    label="Current Phone Number"
                    type="tel"
                    error={this.state.errors[0]}
                    inputRef={this.currPhoneRef}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    color="primary"
                    id="newPhone1"
                    label="New Phone Number"
                    type="tel"
                    error={this.state.errors[1]}
                    inputRef={this.newPhoneRef}
                />
                <Button
                    onClick={() => this.save()}
                    style={{ height: "40px", borderRadius: 0 }}
                    variant="contained"
                    color="secondary"
                    fullWidth>
                    Save
                </Button>
            </MenuDropdown>
        );
    }
}

export default connect(({ userDetails }) => ({ userDetails }))(
    ChangePhoneNumber
);

// const styles = StyleSheet.create({
//     button: {
//         margin: "5px",
//         width: "calc(100% - 10px)",
//         height: "46px",
//         padding: "0.5em 0",
//     },
// });
