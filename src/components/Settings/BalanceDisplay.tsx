import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

export default class BalanceDisplay extends React.Component<{
    title: string,
    amount: string
}> {
    render() {
        return (
            <div className={css(styles.headerText)}>
                <span className={css(styles.balanceTitle)}>{this.props.title}</span>
                <div className={css(styles.balanceContainer)}>
                    <span className={css(styles.balanceAmount)}>${this.props.amount}</span>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    balanceTitle: {
        textAlign: "center"
    },
    headerText: {
        fontSize: "1.4em",
        fontWeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        margin: "0 10px"
    },
    balanceContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    balanceAmount: {
        color: "#22aa22",
        width: "3.7em",
        height: "3.7em",
        textAlign: "center",
        verticalAlign: "middle",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "1.85em",
        backgroundColor: "#eee"
    },
});