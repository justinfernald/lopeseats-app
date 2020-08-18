import React from "react";

import Screen from "../../../components/Screen";

import CardList from "./CardList";
import Carousel from "./Carousel";

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
            <div>
                <Carousel cards={exampleCards} />
                <CardList cards={exampleCards} />
            </div>
        </Screen>
    );
};

export default HomeScreen;
