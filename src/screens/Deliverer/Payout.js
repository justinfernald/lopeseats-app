import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
// import Button from "../../components/Button";
import { css, StyleSheet } from "aphrodite/no-important";
import { formatPrice, getPayoutTotal, getPreviousPayouts, parseDate, requestPayout } from "../../assets/scripts/Util";
import Button from "../../components/Button";
import { CircularProgress } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#eb1c34",
    },
    secondary: {
      main: "#000",
    },
  },
});

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class Payout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payoutTotal: 0,
            payouts: null
        };

        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        var { total } = await getPayoutTotal(this.props.apiToken);
        var payouts = await getPreviousPayouts(this.props.apiToken);
        this.setState({ payoutTotal: total, payouts });
    }

    formatDate(date) {
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    sendPayoutRequest = async () => {
        this.setState({
            payouts: null
        });
        await requestPayout(this.props.apiToken);
        this.fetchData();
    }

    render() {
        // if (!this.state.delivererStats || !this.state.publicStats)
        //     return <Loading message="Payout report loading. Please Wait." />;
        // if (this.state.payoutTotal == null) return <Loading message="Payout report loading. Please Wait." />;

        var { payouts, payoutTotal } = this.state;

        return (
            <ThemeProvider theme={theme}>
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
                                    ${formatPrice(payoutTotal, false)}
                                </div>
                            </div>
                        </div>

                        <div className={css(styles.previousPayouts)}>
                            {!payouts ? 
                            <div className={css(styles.loading)}>
                                <CircularProgress/>
                            </div>:
                            payouts.map((value, index) => {
                                var color = value.status === "SUCCESS" ? "#32ba36" : "#ff9900";
                                return (
                                <div className={css(styles.payoutCard)} key={index}>
                                    <div className={css(styles.payoutAmount)}>${formatPrice(value.amount, false)}</div>
                                    <div className={css(styles.payoutInfo)}>
                                        <div style={{color: "#666"}}>{this.formatDate(parseDate(value.time, false))}</div>
                                        <div style={{color: color}}>{value.status}</div>
                                    </div>
                                </div>
                                )
                            })
                            }
                        </div>

                        <div className={css(styles.btnContainer)}>
                            <Button disabled={payoutTotal===0} onClick={this.sendPayoutRequest}>Request Payout</Button>
                        </div>
                    </div>
                </Screen>
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        marginTop: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    btnContainer: {
        flex: "0 1 78px"
    },
    container: {
        background: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 10,
        maxHeight: "100%"
    },
    informationContainer: {
        background: "#fff",
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: "0 1 auto"
    },
    keyValue: {
        display: "flex",
        justifyContent: "space-between",
    },
    key: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    value: {
        fontSize: "1.3em"
    },
    previousPayouts: {
        height: "100%",
        padding: "10px 0",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto"
    },
    payoutCard: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: "7px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "10px",
    },
    payoutAmount: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "1.7em"
    },
    payoutInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "right"
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
