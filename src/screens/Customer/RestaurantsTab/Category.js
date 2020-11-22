import React from "react";

import Screen from "../../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { getCategory, getCategoryItems, formatPrice, filterSearchData } from "../../../assets/scripts/Util";
import Loading from "../../../screens/Other/Loading";
import ItemOptions from "./ItemOptions";
import AppBar from "../../../components/AppBar";

class Category extends React.Component {
    constructor(props) {
        super(props);

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
        const [categoryData, items] = await Promise.all([getCategory(id), getCategoryItems(id)]);

        if (!categoryData || !items) return;

        this.setState({
            category: {
                items: items,
                ...categoryData
            },
        });
    }

    openItem = (item) => {
        console.log(item);
        store.dispatch(actions.setItemDetails({ openItem: item, editingItem: false }));
        store.dispatch(actions.setItemModalOpen(true));
    };

    render() {
        return (
            <Screen
                appBar={{
                    custom: <AppBar backBtn />,
                    // title: this.props.selectedRestaurant.name,
                    // splash: this.props.selectedRestaurant.banner,
                    backBtn: false
                }}
                ionPage>
                <ItemOptions />
                <div className={css(styles.contentWrapper)}>
                    <div className="restaurantFood">
                        {this.state?.category?.name ?
                            <div className="fullMenu">
                                <div className="title">{this.state.category.name || "Category Items"}</div>

                                {filterSearchData(this.state.category.items, this.props.searchTerm ? this.props.searchTerm : "").map((item, index) => (
                                    <ListItem key={index} item={item} onClick={() => this.openItem(item)} />
                                ))}
                            </div>
                            : <Loading />}
                    </div>
                </div>
            </Screen>
        );
    }
}

const ListItem = ({ item, onClick }) => <div
    className="menuItem"
    onClick={onClick}>
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

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 10,
    },
    sectionName: {
        fontWeight: 500,
        borderBottom: "1px solid var(--light-grey)"
    }
});

export default connect(({ selectedRestaurant, selectedMenu, selectedRestaurantCategories, searchTerm }) => ({
    selectedRestaurant,
    selectedMenu,
    selectedRestaurantCategories,
    searchTerm
}))(Category);
