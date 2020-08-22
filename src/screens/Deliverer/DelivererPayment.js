import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import {
    getProfileImage,
    getBarcodeData,
    getActiveOrder,
    formatPrice,
} from "../../assets/scripts/Util";
import { connect } from "react-redux";
import Screen from "../../components/Screen";

class DelivererPayment extends React.Component {
    constructor(props) {
        super(props);

        this.barcodeContainerRef = React.createRef();
        this.state = {
            profileImage: null,
            barcodeData: null,
            order: null,
            showBarcode: false,
        };

        console.log(props);
        if (this.props.history.state && this.props.history.state.order) {
            this.state.order = this.props.history.state.order;
            this.fetchData();
        } else {
            this.fetchData(this.props.match.params.id);
        }
    }

    async fetchData(id) {
        if (id) {
            const [profileImage, barcodeData, order] = await Promise.all([
                getProfileImage(this.props.apiToken),
                getBarcodeData("20552343"),
                getActiveOrder(this.props.apiToken, id),
            ]);

            if (order.success)
                this.setState({ profileImage, barcodeData, order: order.msg });
            else this.props.history.goBack();
        } else {
            const [profileImage, barcodeData] = await Promise.all([
                getProfileImage(this.props.apiToken),
                getBarcodeData("20552343"),
            ]);

            this.setState({ profileImage, barcodeData });
        }
    }

    updateDimensions() {
        if (!this.state.showBarcode) return;
        const updateSize = () => {
            let parent = this.barcodeContainerRef.current.firstElementChild;
            let child = parent.firstElementChild;
            if (!child) return;
            child.style.transform = `scaleX(calc(${parent.clientWidth} / ${child.clientWidth})) scaleY(calc(${parent.clientHeight} / ${child.clientHeight}))`;
        };
        updateSize();
        setTimeout(updateSize, 1);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        let offset = 0;

        // let rects = document.querySelector("#barcode > g").children;
        let animation = () => {
            if (!this.state.showBarcode) return;
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
        console.log("didupdate");
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
        clearInterval(this.interval);
    }

    render() {
        console.log(this.state);
        console.log("didrender");
        return (
            <Screen
                appBar={{
                    title: "Check Out",
                    onBack: this.props.history.goBack,
                }}>
                <div className={css(styles.content)}>
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
                            className={css(styles.barcodeContainer)}
                            style={
                                this.state.showBarcode
                                    ? null
                                    : { background: "transparent" }
                            }>
                            {this.state.showBarcode ? (
                                <div
                                    className={"barcode " + css(styles.barcode)}
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.barcodeData,
                                    }}></div>
                            ) : null}
                        </div>
                        <div>
                            <span className={css(styles.delivererName)}>
                                {this.props.userDetails.name}
                            </span>
                        </div>
                        <div
                            className={css(
                                styles.holdDownZone,
                                this.state.showBarcode
                                    ? styles.holdDownZoneActive
                                    : null
                            )}
                            onTouchStart={() =>
                                this.setState({ showBarcode: true })
                            }
                            onTouchEnd={() =>
                                this.setState({ showBarcode: false })
                            }>
                            <span className={css(styles.holdDownText)}>
                                Hold down to show Barcode
                            </span>
                        </div>
                    </div>
                    <div className={css(styles.paymentBox)}>
                        <div>
                            <div className={css(styles.row)}>
                                <span className={css(styles.label)}>
                                    Customer
                                </span>
                                <span className={css(styles.value)}>
                                    {this.state.order
                                        ? this.state.order.customerName
                                        : null}
                                </span>
                            </div>
                            <div className={css(styles.row)}>
                                <span className={css(styles.label)}>
                                    Subtotal
                                </span>
                                <span className={css(styles.value)}>
                                    {this.state.order
                                        ? "$" +
                                          formatPrice(
                                              this.state.order.totalPrice,
                                              false
                                          )
                                        : null}
                                </span>
                            </div>
                            <div className={css(styles.row)}>
                                <span className={css(styles.label)}>Tax</span>
                                <span className={css(styles.value)}>
                                    {this.state.order
                                        ? "$" +
                                          formatPrice(
                                              this.state.order.totalPrice,
                                              false
                                          )
                                        : null}
                                </span>
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
                                    {this.state.order
                                        ? "$" +
                                          formatPrice(
                                              this.state.order.totalPrice,
                                              false
                                          )
                                        : null}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "auto",
        paddingTop: 3,
    },

    dark: {
        color: "white",
        background: "#333",
    },

    informationBox: {
        background: "#fff",
        margin: 10,
        borderRadius: 10,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        boxShadow: "0px 0px 15px 0px rgba(25, 25, 25, 0.2)",
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
        color: "black",
    },

    holdDownZone: {
        marginTop: 10,
        flex: 1,
        minHeight: 100,
        width: "100%",
        borderRadius: 5,
        background: "var(--secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "#00000075 0px 0px 10px 0px",
        transition: "0.4s ease-in-out",
    },

    holdDownZoneActive: {
        boxShadow: "#000000cc 0px 0px 10px 0px",
        transform: "scale(1.1)",
    },

    holdDownText: {
        fontSize: "1.2em",
        fontWeight: 500,
    },

    paymentBox: {
        background: "#fff",
        margin: 10,
        marginBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 25,
        color: "black",
        fontSize: "1.2em",
        boxShadow: "0px 0px 15px 0px rgba(25, 25, 25, 0.2)",
    },

    row: { display: "flex", justifyContent: "space-between" },

    label: {},

    value: {
        color: "#888",
    },

    valueDark: {
        color: "#999",
    },

    emphasis: {
        fontWeight: 500,
    },
});

export default connect(({ apiToken, userDetails }) => ({
    apiToken,
    userDetails,
}))(DelivererPayment);
