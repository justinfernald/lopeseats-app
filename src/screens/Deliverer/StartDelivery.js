import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import { store, actions } from "../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { getDelivererStats, getPublicStats } from "../../assets/scripts/Util";
import Loading from "../Other/Loading";
import { Line } from "react-chartjs-2";

const chartOptions = {
    title: {
        display: true,
        text: "Deliveries Per 30 Minutes (Past 24 Hours)",
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        displayColors: false,
        callbacks: {
            title: ([{ label }]) => {
                let date = new Date(label);
                let dateString = date.toLocaleDateString() + "\n";
                let hours = date.getHours();
                let minutes = date.getMinutes();

                const getTimeString = (hours, minutes) => {
                    if (minutes >= 60) {
                        minutes -= 60;
                        hours++;
                    }
                    if (hours >= 24) {
                        hours -= 24;
                    }
                    let hourString = hours;
                    let minuteString = minutes + "";
                    let midday = "AM";
                    // AM: 0-11
                    // PM: 12-23
                    if (hours >= 12) {
                        if (hours !== 12) {
                            hourString = hours - 12;
                        }
                        midday = "PM";
                    }
                    if (hours === 0) hourString = 12;
                    if (minuteString.length < 2)
                        minuteString = "0" + minuteString;
                    return `${hourString}:${minuteString} ${midday}`;
                };

                return (
                    dateString +
                    getTimeString(hours, minutes) +
                    " - " +
                    getTimeString(hours, minutes + 30)
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
                gridLines: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 6,
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
};

const dataFormat = {
    label: "Deliveries",
    pointRadius: 0,
    backgroundColor: "rgba(249, 124, 124, .5)",
    borderColor: "rgba(237, 51, 72, .5)",
    steppedLine: "middle",
};

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
        return output;
    }

    toggleDeliveringState = () => {
        store.dispatch(actions.setDeliveryMode(!this.props.deliveryModeActive));
    };

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
                                        ...dataFormat,
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
                            options={chartOptions}
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
                <div className={css(styles.currentTime)}>
                    {this.props.deliveryModeActive ? (
                        <>
                            <div>Current Time Active</div>
                            <div className={css(styles.activeTime)}>
                                2:45:23
                            </div>
                        </>
                    ) : null}
                </div>
                <Button
                    onClick={this.toggleDeliveringState}
                    style={styles.button}
                    secondary={!this.props.deliveryModeActive}>
                    {this.props.deliveryModeActive
                        ? "Stop Delivering"
                        : "Start Delivering"}
                </Button>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    stats: {
        padding: 10,
        background: "#f0f0f0",
        margin: 10,
        flex: 1,
        borderRadius: 7,
        display: "flex",
        flexDirection: "column",
    },

    stat: {
        margin: "0 10px 3px",
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
        margin: "4px 0",
        borderRadius: 7,
        border: "1px solid #444",
    },
    button: {
        margin: 15,
        marginBottom: 25,
    },
    currentTime: {
        height: 24,
        display: "flex",
        justifyContent: "center",
        fontSize: "1.2em",
    },
    activeTime: {
        marginLeft: 9,
        width: 70,
        textAlign: "right",
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
