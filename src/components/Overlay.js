import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { store, actions } from "../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonBackdrop } from '@ionic/react';
import ConfirmPhone from './Settings/ConfirmPhone';

class Overlay extends React.Component {

    // The animation code is really bad so I want to change to React Motion at some point

    closeOverlay() {
        console.log("close");
        store.dispatch(actions.closeOverlay());
    }

    onNextStep = () => {
        this.closeOverlay();
        store.dispatch(actions.closeAllMenus());
    }

    render() {
        var { overlayEnabled } = this.props;
        return (
            <Fragment>
                <IonBackdrop onIonBackdropTap={this.closeOverlay} className={overlayEnabled ? css(styles.backdrop) : css(styles.backdrop,styles.backdropDisabled)}/>
                <div className={css(styles.overlayWrapper)}>
                    <div className={css(styles.centerDiv)}>
                        <div className={css(styles.contentWrapper,!overlayEnabled ? styles.contentWrapperDisabled : null)}>
                            We sent a code to your new phone number. Please enter it below.
                            <ConfirmPhone phoneNumber="5052397396" onNextStep={this.onNextStep}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}

const cardHeight = "200px";
const cardWidth = 'calc(100% - 50px)';

export default connect(({overlayEnabled}) => ({overlayEnabled}))(Overlay);

var styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "black",
        opacity: 0.5,
        transition: "opacity 0.5s",
        height: "100%"
    },
    backdropDisabled: {
        opacity: 0,
        height: 0,
    },
    overlayWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    contentWrapper: {
        textAlign: "center",
        zIndex: 3,
        width: cardWidth,
        height: cardHeight,
        margin: "0 25px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "width 0.3s ease, height 0.3s ease 0.3s"
    },
    contentWrapperDisabled: {
        width: 0,
        height: 0,
        padding: "0",
    },
    centerDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
});