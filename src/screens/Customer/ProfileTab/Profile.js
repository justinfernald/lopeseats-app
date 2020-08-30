import React, { Fragment } from "react";
import Screen from "../../../components/Screen";
import ImageUploader from "../../Authentication/RegisterProcess/ImageUploader";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { setProfileImage } from "../../../Redux/Thunks";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonIcon } from '@ionic/react';
import ClickThrough from "../../../components/Settings/ClickThrough";
import BalanceDisplay from "../../../components/Settings/BalanceDisplay";
import { fetchBalances } from "../../../Redux/Thunks";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ChangePhoneNumber from "./ChangePhoneNumber";
import ChangePassword from "./ChangePassword";
import ApplyToDeliver from "./ApplyToDeliver";

import { logOutOutline } from "ionicons/icons";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#eb1c34",
    },
  },
});

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        store.dispatch(fetchBalances(this.props.apiToken));
    }

    logout() {
        this.props.history.push("/");
        store.dispatch(actions.reset());
    }

    goTo(page) {
        return () => this.props.history.push(page);
    }

    render() {
        var balanceLoaded = this.props.balances && this.props.balances.length > 0;

        var { userDetails, balances, profileImage, apiToken } = this.props;

        var { isDeliverer } = userDetails;

        var earnings = (
            isDeliverer ? (
                <Fragment>
                    <div className={css(styles.vSpacer)}/>
                    <BalanceDisplay title="Earnings" balances={balances} loading={!balanceLoaded} index={1}/>
                </Fragment>
            ):null
        );

        var deliverySection = (
            isDeliverer ? (
                <Fragment>
                    <ClickThrough onClick={this.goTo("/app/deliverer/payout")}>Withdraw earnings</ClickThrough>
                </Fragment>
            ):(
                <Fragment>
                    <ApplyToDeliver/>
                </Fragment>
            )
        );

        return (
            <Screen
            appBar={{
                title: "Profile",
                icon: (<IonIcon icon={logOutOutline}/>),
                onIconClick: () => this.logout()
            }}>
                <ThemeProvider theme={theme}>
                    <div className={css(styles.headerSection)}>
                        <div className={css(styles.imageContainer)}>
                            <ImageUploader editBar image={profileImage} onUpload={image => store.dispatch(setProfileImage({apiToken, image}))}/>
                        </div>
                        <div className={css(styles.vSpacer)}/>
                        <div className={css(styles.balanceSection)}>
                            <BalanceDisplay title="Balance" balances={balances} loading={!balanceLoaded} index={0}/>
                            {earnings}
                        </div>
                    </div>

                    <div className={css(styles.settingsSection)}>
                        <div className={css(styles.sectionTitle)}>Account Settings</div>
                        <ChangePhoneNumber/>
                        <div className={css(styles.spacer)}/>
                        <ChangePassword/>
                        <div className={css(styles.spacer)}/>
                        <ClickThrough onClick={this.goTo("/app/profile/deposit")}>Add money or send gift</ClickThrough>
                        <div className={css(styles.sectionTitle)}>Delivery</div>
                        {deliverySection}
                        {/* <ClickThrough>Become a Runner</ClickThrough> */}
                    </div>
                </ThemeProvider>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
spacer: {
    width: "calc(100% - 20px)",
    height: "1px",
    marginLeft: "10px",
    backgroundColor: "#ccc"
},
vSpacer: {
    width: "1px",
    height: "100%",
    backgroundColor: "#cccccc"
},
headerSection: {
    height: "120px",
    display: "flex",
    flexDirection: "row"
},
settingsSection: {
    width: "100%"
},
imageContainer: {
    padding: "10px",
    height: "120px",
    width: "120px"
},
balanceSection: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "calc(100% - 120px)",
},
flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
},
sectionTitle: {
    backgroundColor: "#f2f2f2",
    fontSize: "1.4em",
    height: "2em",
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10px",
    fontWeight: 500
},
userName: {
    fontWeight: 500,
    marginLeft: "10px"
},
dropdownInput: {
    width: "100%",
    // margin: "10px",
}
});

export default connect(({userDetails, profileImage, apiToken, balances}) => ({userDetails, profileImage, apiToken, balances}))(Profile);