import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

import Card from "./Card";

const styles = StyleSheet.create({
    list: {
        display: "flex",
        flexDirection: "column",
        position: "relative",

        padding: 16,
        paddingBottom: 0,
    },
    cardList: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontFamily: "Rubik",
        fontWeight: 500,
        fontSize: "1.4em",

        marginBottom: 16,
    },
});

const CardList = ({ cards, ...props }) => {
    return (
        <div className={css(styles.list)}>
            {/* TODO: maybe make this a virtual list later */}
            <h1 className={css(styles.title)}>GIVE THIS A BETTER NAME</h1>
            <div className={css(styles.cardList)}>
                {cards.map((card, i) => (
                    <Card {...card} key={`cardlist-${i}`} />
                ))}
            </div>
        </div>
    );
};

export default CardList;
