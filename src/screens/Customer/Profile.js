import React from "react";
import Screen from "../../components/Screen";
import ImageUploader from "../Authentication/RegisterProcess/ImageUploader";
import { connect } from "react-redux";
import { store, actions } from "../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonGrid, IonRow, IonCol, IonItem, IonList, IonNote, IonLabel } from '@ionic/react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Screen
            appBar={{
                title: "Profile",
                onBack: this.props.history.goBack,
            }}>
                <div className={css(styles.headerSection)}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size={4}>
                                <div className={css(styles.imageContainer)}><ImageUploader image={this.props.profileImage} onUpload={image => store.dispatch(actions.setProfileImage(image))}/></div>
                            </IonCol>
                            <IonCol size={8}>
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
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
headerSection: {
    height: "150px"
},
imageContainer: {
    padding: "10px"
},
balanceSection: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
},
headerText: {
    fontSize: "1.3em",
    fontWeight: "500",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
},
balanceAmount: {
    color: "#22aa22"
}
});

export default connect(({profileImage}) => ({profileImage}))(Profile);