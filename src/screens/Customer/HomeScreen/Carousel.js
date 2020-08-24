import React, { useState } from "react";
import { Frame, Page } from "framer";
import Measure from "react-measure";
import { css, StyleSheet } from "aphrodite/no-important";

import Card from "./Card";

// In framer motion, these are basically the different states of your animation
// you can play around with these values until you get the animation you want
/* const variants = {
    enter: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: direction => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
}; */

const styles = StyleSheet.create({
    carousel: {
        display: "flex",

        position: "relative",
        height: 250,
    },
    card: {
        // margin: 10
    },
});

const Carousel = ({ cards, ...props }) => {
    const [size, setSize] = useState({ width: -1, height: -1 });

    const { width, height } = size;

    return (
        <Measure bounds onResize={({ bounds }) => setSize(bounds)}>
            {({ measureRef }) => (
                <div
                    ref={measureRef}
                    className={css(styles.carousel)}
                    style={{ opacity: cards.length ? 1 : 0 }}>
                    <Page
                        width={width}
                        height={height}
                        defaultEffect="coverflow"
                        gap={16} // controls the gap between the cards
                        padding={32} // controls the spacingg between the card and the edge of the screen
                    >
                        {cards.map((card, i) => (
                            <Frame
                                key={`card=${i}`}
                                style={{ backgroundColor: "transparent" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        height: "100%",
                                    }}>
                                    <Card motion {...card} />
                                </div>
                            </Frame>
                        ))}
                    </Page>
                </div>
            )}
        </Measure>
    );
};

export default Carousel;
