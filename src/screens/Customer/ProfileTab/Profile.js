import React from "react";
import Screen from "../../../components/Screen";
import ImageUploader from "../../Authentication/RegisterProcess/ImageUploader";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonGrid, IonRow, IonCol, IonContent, IonList, IonNote, IonLabel, IonItemDivider } from '@ionic/react';
import ClickThrough from "../../../components/Settings/ClickThrough";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Screen
            appBar={{
                title: "Profile"
            }}>
                <div className={css(styles.headerSection)}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size={3}>
                                <div className={css(styles.imageContainer)}><ImageUploader image={this.props.profileImage} onUpload={image => store.dispatch(actions.setProfileImage(image))}/></div>
                            </IonCol>
                            <IonCol size={9}>
                                <div className={css(styles.balanceSection)}>
                                    <div className={css(styles.headerText)}>
                                        <span>Dining Dollars:</span>
                                        <span className={css(styles.balanceAmount)}>$420</span>
                                    </div>
                                    <div className={css(styles.headerText)}>
                                        <span>LopesEat Balance:</span>
                                        <span className={css(styles.balanceAmount)}>$420</span>
                                    </div>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                <div className={css(styles.sectionTitle)}>Account Settings</div>
                <ClickThrough>Phone Number</ClickThrough>
                <div className={css(styles.spacer)}/>
                <ClickThrough>Password</ClickThrough>
                <div className={css(styles.sectionTitle)}>Delivery</div>
                <ClickThrough>Become a Runner</ClickThrough>
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
    padding: "5px"
},
balanceSection: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
},
headerText: {
    fontSize: "1.4em",
    fontWeight: "500",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
},
balanceAmount: {
    color: "#22aa22"
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
}
});

export default connect(({profileImage}) => ({profileImage}))(Profile);