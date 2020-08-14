import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import { store, actions } from "../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { getDelivererStats, getPublicStats } from "../../assets/scripts/Util";
import Loading from "../Other/Loading";
import { Line, Bar } from "react-chartjs-2";

class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivererStats: null,
            publicStats: null,
        };

        this.fetchData();
    }

    async fetchData() {
        const [delivererStats, publicStats] = (
            await Promise.all([
                getDelivererStats(this.props.apiToken),
                getPublicStats(),
            ])
        ).map((data) => data.msg);

        this.setState({ delivererStats, publicStats });
    }

    setupHistogramData(data) {
        const starting = 24 * 60 * 60 * 1000;
        const offset = 0.5 * 60 * 60 * 1000;
        const currentTime = Date.now();

        let output = [];

        const getDataValue = (time) => {
            const foundPoint = data.find(
                (dataPoint) =>
                    dataPoint.t >= time && dataPoint.t < time + offset
            );
            if (foundPoint) return foundPoint.y;
            return 0;
        };

        for (
            let t = Math.floor((currentTime - starting) / offset) * offset;
            t < currentTime;
            t += offset
        ) {
            output.push({ t: new Date(t), y: getDataValue(t) });
        }
        console.log(output);
        return output;
    }

    startDelivering() {
        store.dispatch(actions.setDeliveryMode(true));
    }

    render() {
        if (!this.state.delivererStats || !this.state.publicStats)
            return <Loading message="Delivery report loading. Please Wait." />;
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
                        <div className={css(styles.statValue)}>
                            {this.state.delivererStats.deliveryCount}
                        </div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>Rating</div>
                        <div className={css(styles.statValue)}>
                            {this.state.delivererStats.averageRating || "N/A"}
                        </div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Average Delivery Time
                        </div>
                        <div className={css(styles.statValue)}>
                            {this.state.delivererStats.averageDeliveryTime ||
                                "N/A"}
                        </div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>Amount Earned</div>
                        <div className={css(styles.statValue)}>
                            {this.state.delivererStats.amountEarned || 0}
                        </div>
                    </div>
                    <div className={css(styles.chart)}>
                        <Line
                            data={{
                                datasets: [
                                    {
                                        label: "Deliveries",
                                        pointRadius: 0,
                                        backgroundColor:
                                            "rgba(249, 124, 124, .5)",
                                        borderColor: "rgba(237, 51, 72, .5)",
                                        data: this.setupHistogramData(
                                            this.state.publicStats.histogramData.map(
                                                ({ time, occurances: y }) => ({
                                                    t: time * 1000,
                                                    y,
                                                })
                                            )
                                        ),
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                tooltips: {
                                    mode: "index",
                                    intersect: false,
                                    displayColors: false,
                                    callbacks: {
                                        // fix later to make the AM and PM work for hour 12
                                        title: ([{ label }]) => {
                                            let date = new Date(label);
                                            let dateString =
                                                date.toLocaleDateString() +
                                                "\n";
                                            let hours = date.getHours();
                                            let minutes = date.getMinutes();
                                            let past12 = hours > 12;
                                            if (past12) hours -= 12;
                                            if (hours == 0) hours = 12;
                                            let minutesString = minutes;
                                            if (minutes < 10)
                                                minutesString = "0" + minutes;
                                            let timeStringStart =
                                                hours +
                                                ":" +
                                                minutesString +
                                                " " +
                                                (past12 ? "PM" : "AM");
                                            minutes += 30;
                                            if (minutes >= 60) {
                                                minutes -= 60;
                                                hours++;
                                            }
                                            minutesString = minutes;
                                            if (minutes < 10)
                                                minutesString = "0" + minutes;
                                            past12 = hours > 12;
                                            if (past12) hours -= 12;
                                            if (hours == 0) hours = 12;
                                            let timeStringEnd =
                                                hours +
                                                ":" +
                                                minutesString +
                                                " " +
                                                (past12 ? "PM" : "AM");
                                            return (
                                                dateString +
                                                timeStringStart +
                                                " - " +
                                                timeStringEnd
                                            );
                                        },
                                    },
                                },
                                legend: {
                                    display: false,
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            type: "time",
                                            time: {
                                                unit: "hour",
                                            },
                                        },
                                    ],
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                                callback: (value) => {
                                                    if (value % 1 === 0) {
                                                        return value;
                                                    }
                                                },
                                            },
                                        },
                                    ],
                                },
                            }}
                        />
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Active Deliverers
                        </div>
                        <div className={css(styles.statValue)}>
                            {this.state.publicStats.activeDeliveries}
                        </div>
                    </div>
                    <div className={css(styles.stat)}>
                        <div className={css(styles.statKey)}>
                            Orders per Hour
                        </div>
                        <div className={css(styles.statValue)}>
                            {this.state.publicStats.orderInHour}
                        </div>
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
