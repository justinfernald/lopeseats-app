import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
// import Button from "../../components/Button";
import { css, StyleSheet } from "aphrodite/no-important";
import { formatPrice, getPayoutTotal } from "../../assets/scripts/Util";
import Loading from "../Other/Loading";
import Button from "../../components/Button";

class Payout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payoutTotal: null,
        };

        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        var { total } = await getPayoutTotal(this.props.apiToken);
        this.setState({ payoutTotal: total });
    }

    render() {
        // if (!this.state.delivererStats || !this.state.publicStats)
        //     return <Loading message="Payout report loading. Please Wait." />;
        if (this.state.payoutTotal == null) return <Loading message="Payout report loading. Please Wait." />;
        return (
            <Screen
                appBar={{
                    title: "Delivery Payout", backBtn: true
                }}>
                <div className={css(styles.container)}>
                    {/* 
                        Amount you have earned
                        Cashout button
                     */}

                    <div className={css(styles.informationContainer)}>
                        <div className={css(styles.keyValue)}>
                            <div className={css(styles.key)}>Available earnings</div>
                            <div className={css(styles.value)}>
                                ${formatPrice(this.state.payoutTotal, false)}
                            </div>
                        </div>
                    </div>

                    <div className={css(styles.previousPayouts)}>
                        <div className={css(styles.payoutCard)}>
                            <div className={css(styles.payoutAmount)}>$43.12</div>
                            <div className={css(styles.payoutInfo)}>
                                <div style={{color: "#666"}}>8/26/20</div>
                                <div style={{color: "#de8500"}}>Pending</div>
                            </div>
                        </div>
                    </div>

                     <div className={css(styles.btnContainer)}>
                        <Button>Request Payout</Button>
                    </div>
                </div>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        background: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 10,
    },
    informationContainer: {
        background: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    keyValue: {
        display: "flex",
        justifyContent: "space-between",
    },
    key: {},
    value: {},
    previousPayouts: {
        height: "100%",
        padding: "10px 0",
        overflowY: "scroll"
    },
    payoutCard: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: "7px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px"
    },
    payoutAmount: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "1.7em",
        color: "#de8500"
    },
    payoutInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
});

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
    deliveryStartingTime,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
    deliveryStartingTime,
});

export default connect(mapStateToProps)(Payout);
