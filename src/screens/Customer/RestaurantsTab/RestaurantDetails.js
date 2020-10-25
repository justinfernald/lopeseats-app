import React from "react";
import HoursList from "../../../components/HoursList";

import Screen from "../../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { getRestaurant, getMenu, formatPrice, getCategories } from "../../../assets/scripts/Util";
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
            this.state.restaurantData.categories = props.selectedRestaurantCategories;
        }
    }

    async fetchData(id) {
        const restaurant = await getRestaurant(id);
        if (restaurant.success === false) {
            this.setState({ redirect: "/app/restaurants" });
            return;
        }
        const menu = await getMenu(id);
        var restaurantCategories = await getCategories(62);
        this.setState({
            restaurantData: {
                hours: restaurant.hours,
                food: menu,
                categories: restaurantCategories,
            },
        });
        store.dispatch(actions.setSelectedRestaurant(restaurant));
        store.dispatch(actions.setSelectedMenu(menu));
        store.dispatch(actions.setSelectedRestaurantCategories(restaurantCategories));
    }

    componentDidMount() { }

    componentWillUnmount() { }

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
                    // splash: this.props.selectedRestaurant.banner,
                    backBtn: false
                }}
                ionPage>
                <div className={css(styles.contentWrapper)}>
                    <div className="restaurantInfo">
                        <div className="restaurantDescription">
                            {this.props.selectedRestaurant.description}
                        </div>

                        {/* <HoursList restaurantData={this.state.restaurantData} /> */}
                    </div>
                    <div className="restaurantFood">

                        <HoursList restaurantData={this.state.restaurantData} />
                        <div className="featuredMenu">
                            <div className="title">Popular Options</div>
                            <div className="scrollArea">
                                <div className="scrollCapFill"></div>
                                {this.state.restaurantData.food
                                    .filter((x) => x.featured === "1")
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
                                                        ${formatPrice(x.price)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <div className="scrollCapFill"></div>
                            </div>
                        </div>
                        <div className={css(styles.categoriesWrapper)}>
                            <div>
                                Categories
                            </div>
                            <div className={css(styles.categories)}>
                                {this.props.selectedRestaurantCategories.map((category, index) => (
                                    <Category {...category} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="fullMenu">
                            <div className="title">All Items</div>

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
                                            ${formatPrice(item.price)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
                <FloatingCartButton />
            </Screen>
        );
    }
}

const Category = ({ name, image, id }) => {
    return <div className={css(styles.category)}>
        <div className={css(styles.categoryImageWrapper)}><img className={css(styles.categoryImage)} src={image}></img></div>
        <div className={css(styles.categoryName)}>{name}</div>
    </div>
}

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 10,
    },
    categoriesWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13)",
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        position: "relative",
        marginTop: "10px"
    },
    categories: {
        borderTop: "2px solid #ddd",
        display: "flex",
        flexDirection: "horizontal",
        alignItems: "center",
        width: "100%"
    },
    category: {
        width: "50%",
        paddingTop: "50%",
        overflow: "hidden",
        position: "relative"
    },
    categoryImageWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    categoryImage: {
        objectFit: "cover",
        height: "100%",
        width: "100%"
    },
    categoryName: {
        position: "absolute"
    }
});

export default connect(({ selectedRestaurant, selectedMenu, selectedRestaurantCategories }) => ({
    selectedRestaurant,
    selectedMenu,
    selectedRestaurantCategories
}))(RestaurantDetails);
