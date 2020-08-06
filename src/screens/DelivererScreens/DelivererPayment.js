import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import {
    getProfileImage,
    getProfileData,
    getBarcodeData,
    getScreenState,
} from "../../assets/scripts/Util";

export default class DeliveryPayment extends React.Component {
    constructor(props) {
        super(props);
        getProfileImage(getScreenState().apiToken).then((profileImage) => {
            this.setState({ profileImage });
        });
        getProfileData(getScreenState().apiToken).then((profileData) => {
            this.setState({ ...profileData });
        });
        getBarcodeData("20552343").then((barcodeData) => {
            this.setState({ barcodeData });
        });
        this.barcodeContainerRef = React.createRef();
        this.state = { profileImage: null, barcodeData: null };
    }

    updateDimensions() {
        let parent = this.barcodeContainerRef.current.firstElementChild;
        let child = parent.firstElementChild;
        if (!child) return;
        child.style.transform = `scaleX(calc(${parent.clientWidth} / ${child.clientWidth})) scaleY(calc(${parent.clientHeight} / ${child.clientHeight}))`;
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        let offset = 0;

        // let rects = document.querySelector("#barcode > g").children;
        let animation = () => {
            let parent = this.barcodeContainerRef.current.firstElementChild;
            let child = parent.firstElementChild;
            if (!child) return;
            let rects = child.children;
            for (let i = 0; i < rects.length; i++) {
                let rect = rects[i];
                let color = "" + Math.round(Math.sin((offset + i) * 0.5) * 40);
                for (let j = 0; j < 2 - color.length; j++) {
                    color = "0" + color;
                }
                rect.style.background = "#" + color + color + color;
            }
            offset++;
            this.barcodeContainerRef.current.style.background =
                "linear-gradient(" +
                offset * 10 +
                "deg, rgba(255,0,0,1) 0%, rgba(193,184,4,1) 25%, rgba(121,9,92,1) 50%, rgba(255,149,0,1) 75%, rgba(0,212,255,1) 100%)";
        };
        animation();
        this.interval = setInterval(animation, 120);
    }

    componentDidUpdate() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
        clearInterval(this.interval);
    }

    render() {
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
                                    alt="Profile"
                                />
                            ) : null}
                        </div>
                        <div
                            ref={this.barcodeContainerRef}
                            className={css(styles.barcodeContainer)}>
                            <div
                                className={"barcode " + css(styles.barcode)}
                                dangerouslySetInnerHTML={{
                                    __html: this.state.barcodeData,
                                }}></div>
                        </div>
                        <div>
                            <span className={css(styles.delivererName)}>
                                {this.state.name}
                            </span>
                        </div>
                        {/* <div>
                            Customer
                            <span className="customerName">Will Garrett</span>
                        </div> */}
                    </div>
                    <div className={css(styles.paymentBox)}>
                        <div>
                            <div className={css(styles.row)}>
                                <span className={css(styles.label)}>
                                    Customer
                                </span>
                                <span className={css(styles.value)}>
                                    John Doe
                                </span>
                            </div>
                            <div className={css(styles.row)}>
                                <span className={css(styles.label)}>
                                    Subtotal
                                </span>
                                <span className={css(styles.value)}>$5.54</span>
                            </div>
                            <div className={css(styles.row)}>
                                <span className={css(styles.label)}>
                                    Tax & Fees
                                </span>
                                <span className={css(styles.value)}>$0.56</span>
                            </div>
                            <div className={css(styles.row)}>
                                <span
                                    className={css(
                                        styles.label,
                                        styles.emphasis
                                    )}>
                                    Total
                                </span>
                                <span
                                    className={css(
                                        styles.value,
                                        styles.emphasis
                                    )}>
                                    $6.10
                                </span>
                            </div>
                        </div>
                        <div className={css(styles.completeButton)}>
                            Finish Button
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
        overflow: "auto",
    },
    screenMessage: {
        color: "white",
        fontSize: "1.5em",
        textAlign: "center",
    },

    informationBox: {
        background: "#333",
        margin: 10,
        borderRadius: 10,
        // flex: 1,
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

    barcode: {
        width: "100%",
        height: "100%",
    },

    barcodeContainer: {
        margin: "8px 0",
        background: "white",
        height: 60,
        width: "80%",
        padding: 9,
        borderRadius: 5,
    },

    delivererName: {
        fontSize: "1.4em",
        fontWeight: 500,
        color: "white",
    },

    paymentBox: {
        background: "#333",
        margin: 10,
        marginBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1,
        // flexBasis: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 25,
        color: "white",
        fontSize: "1.2em",
    },

    row: { display: "flex", justifyContent: "space-between" },

    label: {},

    value: {
        color: "#999",
    },

    emphasis: {
        fontWeight: 500,
    },

    completeButton: {
        position: "relative",
        background: "var(--primary)",
        textAlign: "center",
        height: 56,
        width: "80%",
        left: "50%",
        marginTop: 10,
        paddingTop: 13,
        transform: "translateX(-50%)",
        borderRadius: 28,
    },
});
