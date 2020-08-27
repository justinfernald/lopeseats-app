import React from "react";
import { TextField, Button } from "@material-ui/core";
import MenuDropdown from "../../../components/Settings/MenuDropdown";
import { store, actions } from "../../../Redux";
import { connect } from "react-redux";
import { showErrors } from "../../../assets/scripts/Util";
import { changePassword } from "../../../Redux/Thunks";

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [false, false, false],
        };

        this.currPassRef = React.createRef();
        this.newPassRef1 = React.createRef();
        this.newPassRef2 = React.createRef();
    }

    async save() {
        if (this.newPassRef1.current.value !== this.newPassRef2.current.value) {
            showErrors(["New passwords do no match"]);
            this.setState({ errors: [false, true, true] });
            return;
        }

        var { payload } = await store.dispatch(
            changePassword({
                currPassword: this.currPassRef.current.value,
                newPassword: this.newPassRef1.current.value,
            })
        );

        var { success, msg } = payload;

        if (!success) {
            showErrors([msg]);
            this.setState({ errors: [true, false, false] });
            return;
        }

        this.setState({ errors: [false, false, false] });
        this.currPassRef.current.value = "";
        this.newPassRef1.current.value = "";
        this.newPassRef2.current.value = "";
        showErrors(["Your password has been updated."]);
        store.dispatch(actions.closeAllMenus());
    }

    render() {
        return (
            <MenuDropdown id="password" title={"Password"} height={"208px"}>
                <TextField
                    fullWidth
                    variant="filled"
                    color="primary"
                    id="currPass"
                    label="Current Password"
                    type="password"
                    error={this.state.errors[0]}
                    inputRef={this.currPassRef}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    color="primary"
                    id="newPass1"
                    label="New Password"
                    type="password"
                    error={this.state.errors[1]}
                    inputRef={this.newPassRef1}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    color="primary"
                    id="newPass2"
                    label="Confirm New Password"
                    type="password"
                    error={this.state.errors[2]}
                    inputRef={this.newPassRef2}
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

export default connect(({ userDetails }) => ({ userDetails }))(ChangePassword);

// const styles = StyleSheet.create({
//     button: {
//         margin: "5px",
//         width: "calc(100% - 10px)",
//         height: "46px",
//         padding: "0.5em 0",
//     },
// });
