import React from "react";
import { useHistory } from "react-router-dom";

import { css, StyleSheet } from "aphrodite/no-important";

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,

        minHeight: 200,
        maxHeight: 330,
        minWidth: 270,
        maxWidth: 450,
    },
    // if the card is animated
    motion: {
        flex: 1,
        // margin: "16px auto"
        // margin: 30
    },
    content: {
        background: "var(--ion-color-secondary-tint)", // default background is gray if image is not loaded
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",

        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    img: {
        position: "absolute",

        overflow: "hidden",
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
        color: "var(--ion-color-primary-contrast)",
    },
    title: {
        fontFamily: "Rubik",
        fontSize: "2em",

        marginBottom: 4,
    },
    tag: {
        display: "inline-block",

        margin: 16,
        padding: "6px 12px",
        borderRadius: 100,

        fontSize: "1.2em",
        fontWeight: 600,
        background: "var(--ion-color-primary)",
        color: "var(--ion-color-primary-contrast)",
    },
});

const Card = ({ title, description, img, ...props }) => {
    const history = useHistory();

    // other, less important card parameters
    // discount is a number between 0 and 100 and is null by
    // default
    const { url, tag, motion = false, image, onClick } = props;

    // when the card is clicked
    const handleClick = () => history.push(url);

    return (
        <div
            className={css(
                !motion ? styles.card : styles.motion,
                styles.content
            )}
            style={{ background: `url('${image}')` }}
            onClick={() => {
                if (onClick) onClick(history);
                if (url) handleClick();
            }}>
            {tag ? <h1 className={css(styles.tag)}>{tag}</h1> : null}
            <div className={css(styles.info)}>
                <h1 className={css(styles.title)}>{title}</h1>
                <p className={css(styles.desc)}>{description}</p>
            </div>
        </div>
    );
};

export default Card;
