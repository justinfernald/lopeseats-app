import React, { useEffect, useState } from "react";

import Screen from "../../../components/Screen";

import CardList from "./CardList";
import Carousel from "./Carousel";

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
            </div>
        </Screen>
    );
};

export default HomeScreen;
