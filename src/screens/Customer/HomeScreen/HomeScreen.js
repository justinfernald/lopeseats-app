import React from "react";

import Screen from "../../../components/Screen";

import CardList from "./CardList";
import Carousel from "./Carousel";

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
    return (
        <Screen appBar={{ title: "Dining Deals" }}>
            <div>
                <Carousel cards={exampleCards} />
                <CardList cards={exampleCards} />
            </div>
        </Screen>
    );
};

export default HomeScreen;
