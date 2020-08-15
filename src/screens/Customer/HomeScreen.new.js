import React from "react";
// import { motion } from "framer-motion"; // animation library

import Screen from "../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";

const cardStyles = StyleSheet.create({
    card: {
        background: "var(--ion-color-secondary-tint)",
        borderRadius: 10,
        margin: "16px auto",
        position: "relative",
        overflow: "hidden",

        minHeight: 200,
        maxHeight: 330,
        minWidth: 270,
        maxWidth: 450,

        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    img: {
        position: "absolute",

        overflow: "hidden"
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        bottom: 0,
        width: "100%",

        padding: 8,
        backdropFilter: "blur(10px) grayscale(0.2) contrast(0.7)",
        color: "var(--ion-color-primary-contrast)"
    },
    title: {
        fontFamily: "Rubik",
        fontSize: "2em",

        marginBottom: 4
    },
    discount: {
        display: "inline-block",

        margin: 16,
        padding: "6px 12px",
        borderRadius: 100,

        fontSize: "1.2em",
        fontWeight: 600,
        background: "var(--ion-color-primary)",
        color: "var(--ion-color-primary-contrast)"
    }
});

const Card = ({ title, desc, img, ...props }) => {
    // other, less important card parameters
    // discount is a number between 0 and 100 and is null by
    // default
    const { url, discount, history } = props;

    // when the card is clicked
    const handleClick = () => history.push(url);

    // comment this out when the api returns the image
    img = "https://source.unsplash.com/random";

    return (
        <div
            className={css(cardStyles.card)}
            style={{ background: `url('${img}')` }}
            onClick={handleClick}
        >
            {discount && (
                <h1 className={css(cardStyles.discount)}>-{discount}%</h1>
            )}
            <div className={css(cardStyles.info)}>
                <h1 className={css(cardStyles.title)}>{title}</h1>
                <p className={css(cardStyles.desc)}>{desc}</p>
            </div>
        </div>
    );
};

const homeStyles = StyleSheet.create({
    root: {
        display: "flex"
    },
    cardCaroussel: {
        flex: 1
    },
    cardList: {
        flex: 2,
        padding: "0px 16px"
    }
});

const exampleCards = Array.from({ length: 10 }, () => ({
    title: "Example Card Title",
    desc: "Example card description. Write whatever here",
    discount: 30, // -> -30%
    url: "/app/deliverer"
}));

const HomeScreen = ({ history, ...props }) => {
    return (
        <Screen appBar={{ title: "Dining Updates" }}>
            <div className={css(homeStyles.cardCaroussel)}></div>

            {/* TODO: maybe make this a virtual list later */}
            <div className={css(homeStyles.cardList)}>
                {exampleCards.map(card => (
                    <Card {...card} history={history} />
                ))}
            </div>
        </Screen>
    );
};

export default HomeScreen;
