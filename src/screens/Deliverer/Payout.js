import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import { css, StyleSheet } from "aphrodite/no-important";
import { formatPrice, getPayoutTotal } from "../../assets/scripts/Util";

class Payout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payoutTotal: null,
        };

        this.fetchData();
    }

    async fetchData() {
        const { total } = await getPayoutTotal(this.props.apiToken);
        this.setState({ payoutTotal: total });
    }

    render() {
        // if (!this.state.delivererStats || !this.state.publicStats)
        //     return <Loading message="Payout report loading. Please Wait." />;
        if (!this.state.payoutTotal) return null;
        return (
            <Screen
                appBar={{
                    title: "Delivery Payout",
                    onBack: this.props.history.goBack,
                }}>
                <div className={css(styles.container)}>
                    {/* 
                        Amount you have earned
                        Cashout button
                     */}
                    <div className={css(styles.informationContainer)}>
                        <div className={css(styles.keyValue)}>
                            <div className={css(styles.key)}>Amount Earned</div>
                            <div className={css(styles.value)}>
                                ${formatPrice(this.state.payoutTotal, false)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.payoutFinish}>FINISH PAYOUT</div>
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
