import React from "react";
import HoursList from "../../../components/HoursList";

import Screen from "../../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { getCategoryItems, formatPrice } from "../../../assets/scripts/Util";
import FloatingCartButton from "../../../components/FloatingCartButton";

class Category extends React.Component {
    constructor(props) {
        super(props);

        // let options = [
        //     {
        //         id: 4,
        //         choices: [[]],
        //     },
        // ];

        this.state = {
            category: {
                items: []
            }
        };

        if (props.match.params.id) {
            this.fetchData(props.match.params.id);
        } else {
            // do something here since something is wrong
        }
    }

    async fetchData(id) {
        const items = await getCategoryItems(id);
        this.setState({
            category: {
                items: items,
            },
        });
    }

    componentDidMount() { }

    componentWillUnmount() { }

    openItem = (item) => {
        console.log(item);
        store.dispatch(
            actions.setItemDetails({ openItem: item, editingItem: false })
        );
        this.props.history.push("/app/restaurants/item");
    };

    render() {
        return (
            <Screen
                appBar={{
                    title: this.props.selectedRestaurant.name,
                    // splash: this.props.selectedRestaurant.banner,
                    backBtn: false
                }}
                ionPage>
                <div className={css(styles.contentWrapper)}>
                    <div className="restaurantFood">
                        <div className="fullMenu">
                            <div className="title">{this.props.categoryName || "Category"} Items</div>

                            {this.state.category.items.map((item, index) => (
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

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 10,
    },
    sectionName: {
        fontWeight: 500,
        borderBottom: "1px solid var(--light-grey)"
    }
});

export default connect(({ selectedRestaurant, selectedMenu, selectedRestaurantCategories }) => ({
    selectedRestaurant,
    selectedMenu,
    selectedRestaurantCategories
}))(Category);
