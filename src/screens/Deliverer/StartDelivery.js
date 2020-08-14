import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import { store, actions } from "../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
        };
    }

    startDelivering() {
        store.dispatch(actions.setDeliveryMode(true));
    }

    render() {
        return (
            <Screen
                appBar={{
                    title: "Delivery Mode",
                    onBack: this.props.history.goBack,
                }}>
                <div className={css(styles.stats)}>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Delivery Count
                        </div>
                        <div className={css(styles.statValue)}>placeholder</div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>Rating</div>
                        <div className={css(styles.statValue)}>placeholder</div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Average Delivery Time
                        </div>
                        <div className={css(styles.statValue)}>placeholder</div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>Amount Earned</div>
                        <div className={css(styles.statValue)}>placeholder</div>
                    </div>
                    <div className={css(styles.chart)}>Chart Here?</div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Active Deliverers
                        </div>
                        <div className={css(styles.statValue)}>27</div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Orders per Hour
                        </div>
                        <div className={css(styles.statValue)}>53</div>
                    </div>
                </div>
                <Button onClick={this.startDelivering} style={styles.button}>
                    Start Delivering
                </Button>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    stats: {
        padding: 30,
        background: "#f0f0f0",
        margin: 10,
        flex: 1,
        borderRadius: 7,
        display: "flex",
        flexDirection: "column",
    },

    stat: {
        marginBottom: 3,
        display: "flex",
        justifyContent: "space-between",
        fontSize: "1.3em",
    },
    statKey: {
        fontWeight: 500,
    },
    statValue: {
        fontWeight: 400,
    },
    chart: {
        flex: 1,
        background: "#fff",
        margin: 15,
        borderRadius: 7,
    },
    button: {
        margin: 15,
        marginBottom: 25,
    },
});

const mapStateToProps = ({
    apiToken,
    userDetails: { isDeliverer },
    deliveryModeActive,
}) => ({
    apiToken,
    isDeliverer,
    deliveryModeActive,
});

export default connect(mapStateToProps)(IncomingOrders);
