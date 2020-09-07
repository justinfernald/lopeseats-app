import React, { useEffect, useState } from "react";

import Screen from "../../../components/Screen";

import CardList from "./CardList";
import Carousel from "./Carousel";
import { StyleSheet, css } from "aphrodite/no-important";

import { getScrollCards, getCarouselCards } from "../../../assets/scripts/Util";

const HomeScreen = () => {
    const [cardState, setCardState] = useState({
        scroll: [],
        carousel: [],
    });

    useEffect(() => {
        Promise.all([getCarouselCards(), getScrollCards()]).then(
            ([responseCarouselCards, responseScrollCards]) =>
                setCardState({
                    scroll: responseScrollCards.msg,
                    carousel: responseCarouselCards.msg,
                })
        );
    }, []);

    return (
        <Screen appBar={{ title: "Dining Deals" }}>
            <div>
                <Carousel cards={cardState.carousel} />
                <CardList cards={cardState.scroll} />
                <div className={css(styles.disclaimer)}>
                    This app is currently in Beta. If you run into any issue contact (lopeseat@lopeseat.com) and we try solve any problems. If there is detected misuse of this app your access of the app will be removed.
                </div>
            </div>
        </Screen>
    );
};

const styles = StyleSheet.create({
    disclaimer: {
        color: "#666",
        fontSize: ".8em",
        padding: 5
    }
})

export default HomeScreen;
