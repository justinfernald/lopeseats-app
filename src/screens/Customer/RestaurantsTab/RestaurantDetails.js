import React from "react";
import HoursList from "../../../components/HoursList";

import Screen from "../../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { getRestaurant, getMenu } from "../../../assets/scripts/Util";
import FloatingCartButton from "../../../components/FloatingCartButton";

class RestaurantDetails extends React.Component {
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
            restaurantData: {},
        };

        if (props.match.params.id) {
            this.fetchData(props.match.params.id);
        } else {
            this.state.restaurantData.hours = props.selectedRestaurant.hours;
            this.state.restaurantData.food = props.selectedMenu;
        }
    }

    async fetchData(id) {
        const restaurant = await getRestaurant(id);
        if (restaurant.success === false) {
            this.setState({ redirect: "/app/restaurants" });
            return;
        }
        const menu = await getMenu(id);
        this.setState({
            restaurantData: {
                hours: restaurant.hours,
                food: menu,
            },
        });
        store.dispatch(actions.setSelectedRestaurant(restaurant));
        store.dispatch(actions.setSelectedMenu(menu));
    }

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
        store.dispatch(
            actions.setItemDetails({ openItem: item, editingItem: false })
        );
        this.props.history.push("/app/restaurants/item");
    };

    render() {
        if (!this.state.restaurantData.food) return null;
        return (
            <Screen
                appBar={{
                    title: this.props.selectedRestaurant.name,
                    splash: this.props.selectedRestaurant.banner, 
                    backBtn: true
                }}
                ionPage>
                <div className={css(styles.contentWrapper)}>
                    <div className="restaurantInfo">
                        <div className="restaurantDescription">
                            {this.props.selectedRestaurant.description}
                        </div>
                    </div>
                    <div className="restaurantFood">
                        <div className="featuredMenu">
                            <div className="title">Popular Options</div>
                            <div className="scrollArea">
                                <div className="scrollCapFill"></div>
                                {this.state.restaurantData.food
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

                            {this.props.selectedMenu.map((item, index) => (
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

                        <HoursList restaurantData={this.state.restaurantData} />
                    </div>
                </div>
                <FloatingCartButton/>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 10,
    },
});

export default connect(({ selectedRestaurant, selectedMenu }) => ({
    selectedRestaurant,
    selectedMenu,
}))(RestaurantDetails);
