import React, { useEffect, useState } from "react";

import Screen from "../../../components/Screen";

import CardList from "./CardList";
import Carousel from "./Carousel";

import { getScrollCards, getCarouselCards } from "../../../assets/scripts/Util";

// generate some dummy data to display cards
const exampleCards = Array.from({ length: 10 }, () => ({
    title: "Example Card Title",
    description: "Example card description. Write whatever here",
    tag: "how are you",
    url: "/app/restaurants",
    image: "https://source.unsplash.com/random",
    onClick: () => console.log("hi there"),
}));

const HomeScreen = () => {
    const [cardState, setCardState] = useState({
        scroll: [],
        carousel: [],
        populated: false,
    });

    useEffect(async () => {
        if (!cardState.populated) {
            console.log("hi");
            const [
                responseCarouselCards,
                responseScrollCards,
            ] = await Promise.all([getCarouselCards(), getScrollCards()]);
            setCardState({
                scroll: responseScrollCards.msg.map((card) => ({
                    title: card.title,
                    description: card.description,
                    tag: card.tag,
                    image: card.image,
                    url: card.url,
                })),
                carousel: responseCarouselCards.msg.map((card) => ({
                    title: card.title,
                    description: card.description,
                    tag: card.tag,
                    image: card.image,
                    url: card.url,
                })),
            });
        }
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
