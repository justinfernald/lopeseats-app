import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

import Card from "./Card";

const styles = StyleSheet.create({
    list: {
        padding: 16,
        paddingBottom: 0,
    },
});

const CardList = ({ cards, ...props }) => {
    return (
        <div className={css(styles.list)}>
            {/* TODO: maybe make this a virtual list later */}
            <h1 className={css(styles.title)}>NEAR YOU</h1>
            <div className={css(styles.cardList)}>
                {cards.map((card, index) => (
                    <Card {...card} key={index} />
                ))}
            </div>
        </div>
    );
};

export default CardList;
