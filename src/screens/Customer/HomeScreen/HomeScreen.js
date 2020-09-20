import React, { useEffect, useState } from "react";

import Screen from "../../../components/Screen";

import CardList from "./CardList";
import Carousel from "./Carousel";

import { getScrollCards, getCarouselCards, getHomeMessage } from "../../../assets/scripts/Util";

const HomeScreen = () => {
    const [cardState, setCardState] = useState({
        scroll: [],
        carousel: [],
        message: ""
    });

    useEffect(() => {
        let isSubscribed = true;
        Promise.all([getCarouselCards(), getScrollCards(), getHomeMessage()]).then(
            ([responseCarouselCards, responseScrollCards, responseMessage]) => {
                if (isSubscribed) {
                    setCardState({
                        scroll: responseScrollCards.msg,
                        carousel: responseCarouselCards.msg,
                        message: responseMessage
                    });
                }
            }
        );
        return () => isSubscribed = false;
    }, []);

    return (
        <Screen appBar={{ title: "Dining Deals" }}>
            <div>
                <Carousel cards={cardState.carousel} />
                <CardList cards={cardState.scroll} />
                <div style={{textAlign: "center"}} dangerouslySetInnerHTML={{__html: cardState.message}} />
            </div>
        </Screen>
    );
};

export default HomeScreen;
