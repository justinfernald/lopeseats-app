import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

export default class BalanceDisplay extends React.Component<{
    title: string,
    balances: Array<number>,
    loading: boolean,
    index: number
}> {
    render() {
        let { balances, loading, index, title } = this.props;
        var content = loading ? (
            <span className={css(styles.balanceAmount)}>...</span>
        ) : (
            <span className={css(styles.balanceAmount)}>${balances[index]}</span>
        );
        return (
            <div className={css(styles.headerText)}>
                <span className={css(styles.balanceTitle)}>{title}</span>
                <div className={css(styles.balanceContainer)}>
                    {content}
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
        justifyContent: "space-between",
        padding: "10px 0",
        margin: "0 10px"
    },
    balanceContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    balanceAmount: {
        color: "#22aa22",
        padding: "1px 7px 2px",
        textAlign: "center",
        verticalAlign: "middle",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "1.5em",
        backgroundColor: "#eee"
    },
});