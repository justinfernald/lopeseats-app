import React from "react";
import HoursList from "../../components/HoursList";
import { getScreenState, setScreenState } from "../../assets/scripts/Util";

import Screen from "../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";

export default class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);

        // let options = [
        //     {
        //         id: 4,
        //         choices: [[]],
        //     },
        // ];

        this.state = {
            selectedItem: null,
            optionsChosen: [],
            instructions: null,
        };

        var screenState = getScreenState();
        this.restaurantData.hours = screenState.currentRestaurant.hours;
        this.restaurantData.food = screenState.currentMenu;
    }

    restaurantData = {};

    componentDidMount() {}

    componentWillUnmount() {}

    formatTime(time) {
        let splitTime = time.split(":");
        let hourTime = parseInt(splitTime[0]);
        if (hourTime > 12) {
            return hourTime - 12 + ":" + splitTime[1] + " PM";
        }
        return hourTime + ":" + splitTime[1] + " AM";
    }

    makePHXTime(date) {
        return new Date(
            date.toLocaleString("en-US", { timeZone: "America/Phoenix" })
        );
    }

    openItem = (item) => {
        console.log(item);
        // this.setState({
        //     selectedItem: item
        // });
        setScreenState({ openItem: item, editingItem: false });
        this.props.history.push("/app/restaurants/item");
    };

    render() {
        var screenState = getScreenState();
        return (
            <Screen
                appBar={{
                    title: screenState.currentRestaurant.name,
                    splash: screenState.currentRestaurant.banner,
                    onBack: this.props.history.goBack,
                }}
                ionPage>
                <div className={css(styles.contentWrapper)}>
                    <div className="restaurantInfo">
                        <div className="restaurantDescription">
                            {screenState.currentRestaurant.description}
                        </div>
                    </div>
                    <div className="restaurantFood">
                        <div className="featuredMenu">
                            <div className="title">Popular Options</div>
                            <div className="scrollArea">
                                <div className="scrollCapFill"></div>
                                {this.restaurantData.food
                                    .filter((x) => x.featured)
                                    .map((x, index) => (
                                        <div
                                            key={index}
                                            className="featuredFoodItem"
                                            onClick={() => this.openItem(x)}
                                            style={{
                                                backgroundImage: `url(${x.image})`,
                                            }}>
                                            <div className="contentContainer">
                                                <div className="informationBox">
                                                    <div className="itemName">
                                                        {x.name}
                                                    </div>
                                                    <div className="itemPrice">
                                                        ${x.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <div className="scrollCapFill"></div>
                            </div>
                        </div>

                        <div className="fullMenu">
                            <div className="title">Meal Options</div>

                            {screenState.currentMenu.map((item, index) => (
                                <div
                                    key={index}
                                    className="menuItem"
                                    onClick={() => this.openItem(item)}>
                                    <div className="itemImage img-fill">
                                        <img
                                            className="foodImage"
                                            alt=""
                                            src={item.image}></img>
                                    </div>
                                    <div className="itemContent">
                                        <div className="name">{item.name}</div>
                                        <div className="price">
                                            ${item.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <HoursList restaurantData={this.restaurantData} />
                    </div>
                </div>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 10,
    },
});
