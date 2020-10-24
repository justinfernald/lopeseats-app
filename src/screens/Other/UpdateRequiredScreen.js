import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import { IonPage, isPlatform } from "@ionic/react";
import { StyleSheet, css } from "aphrodite/no-important";
import googlePlay from "../../assets/images/google-play-badge.png";
import appStore from "../../assets/images/app-store-badge.svg";
import logo from "../../assets/images/lopeseatboxlogo.png";

class UpdateRequiredScreen extends React.Component {

    componentDidMount() {
        if (!this.props.updateRequired) {
            history.push("/login");
        }
    }

    render() {
        return (
            <IonPage style={{ height: "100%" }}>
                <div>
                    <img className={css(styles.logo)} src={logo} alt="Logo" />
                </div>
                <div className={css(styles.wrapper)}>
                    <div className={css(styles.info)}>An update is available. Please download it from the link below.</div>
                    <div>
                        {isPlatform("ios") ?
                            <a href="https://apps.apple.com/us/app/id1530493472"><img className={css(styles.imgApple)} src={appStore} alt="App Store" /></a>
                            :
                            <a href="https://play.google.com/store/apps/details?id=com.lopeseat.app"><img className={css(styles.img)} src={googlePlay} alt="Google Play" /></a>
                        }
                    </div>
                </div>
            </IonPage>
        );
    }

}

var styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    info: {
        width: "100%",
        padding: "0 15px",
        textAlign: "center",
        marginBottom: "20px",
        fontWeight: "500"
    },
    logo: {
        width: "100%",
        marginBottom: "50px"
    },
    img: {
        width: "80%",
        margin: "0 10%"
    },
    imgApple: {
        width: "70%",
        margin: "0 15%"
    }
});

export default connect(({ updateRequired }) => ({ updateRequired }))(UpdateRequiredScreen);