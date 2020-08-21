import React from "react";
import { TextField, Button } from '@material-ui/core';
import MenuDropdown from "../../../components/Settings/MenuDropdown";
import { StyleSheet } from "aphrodite/no-important";

export default class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.currPhoneRef = React.createRef();
        this.newPhone1Ref = React.createRef();
        this.newPhone2Ref = React.createRef();
    }

    save() {
        
    }

    render() {
        return (
            <MenuDropdown title={"Phone Number"} height={"208px"}>
                <TextField 
                    fullWidth
                    variant="filled" 
                    color="primary"
                    id="currPhone" 
                    label="Current Phone Number"
                    type="tel"
                />
                <TextField 
                    fullWidth
                    variant="filled" 
                    color="primary"
                    id="newPhone1"
                    label="New Phone Number"
                    type="tel"
                />
                <TextField 
                    fullWidth
                    variant="filled" 
                    color="primary"
                    id="newPhone2" 
                    label="Confirm Phone Number"
                    type="tel"
                />
                <Button onClick={this.save} style={{height: "40px", borderRadius: 0}} variant="contained" color="secondary" fullWidth>
                    Save
                </Button>
            </MenuDropdown>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        margin: "5px",
        width: "calc(100% - 10px)",
        height: "46px",
        padding: "0.5em 0"
    }
});