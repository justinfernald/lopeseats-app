import React from 'react';
import MenuDropdown from "../../../components/Settings/MenuDropdown";
import { StyleSheet, css } from "aphrodite/no-important";
import { store, actions } from "../../../Redux";
import { Button } from "@material-ui/core";
import { applyToDeliver, showErrors } from '../../../assets/scripts/Util';
import { connect } from "react-redux";

class ApplyToDeliver extends React.Component {

    async sendForm() {
        await applyToDeliver(this.props.apiToken);
        store.dispatch(actions.closeAllMenus());
        showErrors(["Please check your email for the form."]);
    }

    render() {
        return (
            <MenuDropdown id="applyToDeliver" title={"Become a Runner"} height={"200px"}>
                <div className={css(styles.container)}>
                    Thank you for your interest in LopesEat! We just need a form filled out from you to get started.
                    
                    <Button
                        onClick={() => this.sendForm()}
                        style={{ height: "40px", borderRadius: 0 }}
                        variant="contained"
                        color="secondary"
                        fullWidth>
                        Send me the form
                    </Button>
                </div>
            </MenuDropdown>
        );
    }

}

export default connect(({apiToken}) => ({apiToken}))(ApplyToDeliver);

const styles = StyleSheet.create({
    container: {
        padding: "10px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%"
    }
});