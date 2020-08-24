import React from "react";
import Screen from "../../../components/Screen";
import ImageUploader from "../../Authentication/RegisterProcess/ImageUploader";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { setProfileImage } from "../../../Redux/Thunks";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import ClickThrough from "../../../components/Settings/ClickThrough";
import BalanceDisplay from "../../../components/Settings/BalanceDisplay";
import { fetchBalances } from "../../../Redux/Thunks";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ChangePhoneNumber from "./ChangePhoneNumber";
import ChangePassword from "./ChangePassword";

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

        store.dispatch(fetchBalances(this.props.apiToken));
    }

    render() {
        var balanceLoaded = this.props.balances && this.props.balances.length > 0;

        var { balances, profileImage, apiToken } = this.props;

        return (
            <Screen
            appBar={{
                title: "Profile"
            }}>
                <ThemeProvider theme={theme}>
                    <div className={css(styles.headerSection)}>
                        <IonGrid style={{height: "100%"}}>
                            <IonRow style={{height: "100%"}}>
                                <IonCol size={4} style={{height: "100%"}} style={styles.flexColumn}>
                                    <div className={css(styles.imageContainer)}>
                                        <ImageUploader image={profileImage} onUpload={image => store.dispatch(setProfileImage({apiToken, image}))}/>
                                    </div>
                                </IonCol>
                                <IonCol size={8}>
                                    <div className={css(styles.balanceSection)}>
                                        <BalanceDisplay title="LopesEat Balance" balances={balances} loading={!balanceLoaded} index={0}/>
                                        <BalanceDisplay title="Delivery Balance" balances={balances} loading={!balanceLoaded} index={1}/>
                                    </div> 
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>

                    <div className={css(styles.sectionTitle)}>Account Settings</div>
                    <ChangePhoneNumber/>
                    <div className={css(styles.spacer)}/>
                    <ChangePassword/>
                    <div className={css(styles.sectionTitle)}>Delivery</div>
                    <ClickThrough>Become a Runner</ClickThrough>
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
headerSection: {
    height: "120px"
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
    justifyContent: "space-evenly"
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

export default connect(({profileImage, apiToken, balances}) => ({profileImage, apiToken, balances}))(Profile);