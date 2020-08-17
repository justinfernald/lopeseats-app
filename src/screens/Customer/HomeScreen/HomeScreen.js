import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // animation library

import Screen from "../../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";

import CardList from "./CardList";
import Carousel from "./Carousel";

const styles = StyleSheet.create({
    root: {
        display: "flex"
    },
    cardCaroussel: {
        flex: 1
    },
    cardList: {
        flex: 2,
        padding: "0px 16px"
    },
    title: {
        fontSize: "1em",
        fontWeight: 700,
        fontFamily: "Rubik"
    }
});

// generate some dummy data to display cards
const exampleCards = Array.from({ length: 10 }, () => ({
    title: "Example Card Title",
    desc: "Example card description. Write whatever here",
    discount: 30, // -> -30%
    url: "/app/deliverer"
}));

const HomeScreen = ({ history, ...props }) => {
    return (
        <Screen appBar={{ title: "Dining Updates" }}>
            <div className={css(styles.cardCaroussel)}>
                <Carousel cards={exampleCards} />
            </div>

            <CardList cards={exampleCards} />
        </Screen>
    );
};

export default HomeScreen;
