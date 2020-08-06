import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import {
    getProfileImage,
    getBarcodeData,
    getScreenState,
} from "../../assets/scripts/Util";

export default class DeliveryPayment extends React.Component {
    constructor(props) {
        super(props);
        getProfileImage(getScreenState().apiToken).then((profileImage) => {
            this.setState({ profileImage });
        });
        getBarcodeData("20552343").then((barcodeData) => {
            this.setState({ barcodeData });
        });
        this.barcodeContainerRef = React.createRef();
        this.state = { profileImage: null, barcodeData: null };
    }

    updateDimensions() {
        let parent = this.barcodeContainerRef.current;
        if (!parent) return;
        let child = parent.firstElementChild;
        if (!child) return;
        console.log(child);
        child.style.transform = `scaleX(calc(${parent.clientWidth} / ${child.clientWidth})) scaleY(calc(${parent.clientHeight} / ${child.clientHeight}))`;
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        this.updateDimensions();
        return (
            <div className="flexDisplay fillHeight dark">
                <div className={"restaurantTop " + css(styles.white)}>
                    <div className="header dark">
                        <i
                            className="icon material-icons-round"
                            onClick={this.props.onBack}>
                            arrow_back_ios
                        </i>
                        <span className="screenTitle">Check Out</span>
                    </div>
                </div>
                <div className={css(styles.content)}>
                    <div className={css(styles.screenMessage)}>
                        Align Barcode to Reader
                    </div>
                    <div className={css(styles.informationBox)}>
                        <div className={css(styles.profileImageWrap)}>
                            {this.state.profileImage ? (
                                <img
                                    className={css(styles.profileImage)}
                                    src={this.state.profileImage}
                                    alt="Profile Image"
                                />
                            ) : null}
                        </div>
                        <div
                            ref={this.barcodeContainerRef}
                            className={
                                "barcodeContainer " +
                                css(styles.barcodeContainer)
                            }
                            dangerouslySetInnerHTML={{
                                __html: this.state.barcodeData,
                            }}></div>
                        <div>
                            Deliverer
                            <span className="delivererName">
                                Justin Fernald
                            </span>
                        </div>
                        <div>
                            Customer
                            <span className="customerName">Will Garrett</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    screenMessage: {
        color: "white",
        fontSize: "2em",
        textAlign: "center",
    },

    informationBox: {
        background: "#333",
        margin: 10,
        borderRadius: 10,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
    },

    profileImageWrap: {
        position: "relative",
        paddingTop: "50%",
        width: "50%",
        // background: "white",
    },

    profileImage: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderRadius: 10,
    },

    barcodeContainer: {
        margin: "8px 0",
        height: 50,
        width: "80%",
        background: "white",
        // padding: 5,
    },

    barcode: {},
});
