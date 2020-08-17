import React from "react";
import { useHistory } from "react-router-dom";

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
    const history = useHistory();

    // other, less important card parameters
    // discount is a number between 0 and 100 and is null by
    // default
    const { url, discount } = props;

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

export default Card;
