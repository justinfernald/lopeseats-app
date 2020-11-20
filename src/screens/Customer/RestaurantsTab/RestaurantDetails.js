import React from "react";
import Screen from "../../../components/Screen";
import { css, StyleSheet } from "aphrodite/no-important";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { getRestaurant, getMenu, formatPrice, getCategories, filterSearchData } from "../../../assets/scripts/Util";
import FloatingCartButton from "../../../components/FloatingCartButton";
import SearchIcon from "../../../assets/images/search-grey.svg";
import Loading from "../../../screens/Other/Loading";
import ItemOptions from "./ItemOptions";
import AppBar from "../../../components/AppBar";
class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null,
            optionsChosen: [],
            instructions: null,
            restaurantData: {}
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

    openItem = (item) => {
        store.dispatch(actions.setItemDetails({ openItem: item, editingItem: false }));
        store.dispatch(actions.setItemModalOpen(true));
    };

    openCategory = (categoryId) => {
        this.props.history.push("/app/restaurants/category/" + categoryId);
    }

    render() {
        var { searchTerm } = this.props;
        if (!searchTerm) {
            searchTerm = "";
        }
        if (!this.state.restaurantData.food) return <Loading />;
        return (
            <Screen
                appBar={{
                    custom: <AppBar />,
                    backBtn: false
                }}
                ionPage>
                <ItemOptions/>
                <div className={css(styles.contentWrapper)}>
                    <div className="restaurantFood">
                        <div className={css(styles.categoriesWrapper)} style={searchTerm.length == 0 ? {} : {display: "none"}}>
                            <div className={css(styles.categoriesHeader)}>
                                Categories
                            </div>
                            <div className={css(styles.categoriesContainer)}>
                                {this.props.selectedRestaurantCategories && this.props.selectedRestaurantCategories.map((category, index) => (
                                    <Category {...category} key={index} onClick={() => this.openCategory(category.id)} />
                                ))}
                            </div>
                        </div>
                        <div className={css(styles.fullMenu)}>
                            <div className={css(styles.title)}>All Items</div>
                            {filterSearchData(this.props.selectedMenu, searchTerm).map((item, index) => (
                                <ListItem key={index} item={item} onClick={() => this.openItem(item)} />
                            ))}
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}

const Category = ({ name, image, onClick }) => <div className={css(styles.category)} onClick={onClick}>
    <div className={css(styles.categoryImageWrapper)}>
        <img className={css(styles.categoryImage)} src={image} alt="" />
    </div>
    <div className={css(styles.categoryInformation)}>
        <div className={css(styles.categoryName)}>{name}</div>
    </div>
</div>

const FeaturedItem = ({ image, price, name, onClick }) => {
    const compStyles = StyleSheet.create({
        wrapper: {
            width: "30%",
            margin: "9px",
            borderRadius: "15px",
            flex: "0 0 auto",
            scrollSnapAlign: "center",
            paddingTop: "30%",
            position: "relative",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13)",
            backgroundSize: "cover",
            overflow: "hidden",
        },
        contentContainer: {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0"
        },
        informationBox: {
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            paddingBottom: "1px",
            borderRadius: "6px",
            background: "#ffffffa4",
            fontWeight: 500
        },
        price: {
            textAlign: "center",
            fontSize: "1.2em"
        }
    });
    return <div
        className={css(compStyles.wrapper)}
        style={{
            backgroundImage: `url(${image})`,
        }}
        onClick={onClick}>
        <div className={css(compStyles.contentContainer)}>
            <div className={css(compStyles.informationBox)}>
                <div className={css(compStyles.price)}>
                    ${formatPrice(price)}
                </div>
            </div>
        </div>
    </div>;
}

const ListItem = ({ item, onClick }) => {
    const compStyles = StyleSheet.create({
        itemWrapper: {
            width: "100%",
            height: "70px",
            padding: "10px",
            // borderRadius: "5px",
            position: "relative",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            borderBottom: "solid #80808030 1px"
        },
        itemImageContainer: {
            borderRadius: 6,
            backgroundColor: "#444",
            width: 50,
            height: 50,
            flexShrink: 0,
            position: "relative"
        },
        outOfStockImage:{
            opacity: "50%"
        },
        itemImage: {
            borderRadius: 6,
            height: "100%",
            width: "100%",
            objectFit: "cover"
        },
        itemContent: {
            padding: "0 10px",
            width: "100%"
        },
        outOfStockName:{
            textDecoration: "line-through",
            textDecorationColor: "red"
        },
        name: {
            float: "left"
        },
        price: {
            float: "right"
        }
    })
    return <div
        className={css(compStyles.itemWrapper)}
        onClick={item.amount_available==0?null:onClick}>
        <div className={css(compStyles.itemImageContainer)}>
            <img
                className={css(compStyles.itemImage, item.amount_available==0?compStyles.outOfStockImage:null)}
                alt=""
                src={item.image} />
        </div>
        <div className={css(compStyles.itemContent)}>
            <div className={css(compStyles.name)}>
                <span className={item.amount_available==0?css(compStyles.outOfStockName):null}>{item.name}</span>
                <br/>{item.amount_available==0?<span style={{color: "var(--secondary)"}}>Out of stock</span>:""}
            </div>
            <div className={css(compStyles.price)}>
                ${formatPrice(item.price)}
            </div>
        </div>
    </div>
}

const styles = StyleSheet.create({
    featuredItems: {
        ":after": {
            backgroundImage:
                "linear-gradient(to right, white,transparent 10%, transparent 90%, white)",
            zIndex: 100,
            position: "absolute",
            content: '""',
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            margin: "9px"
        }
    },
    categoriesHeader: {
        fontWeight: 600,
        color: "#616161"
    },

    title: {
        fontWeight: 600,
        color: "#616161"
    },

    contentWrapper: {
        padding: 10,
    },
    sectionName: {
        fontWeight: 500,
        borderBottom: "1px solid var(--light-grey)"
    },
    categoriesWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // marginBottom: "50px",
        // boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13)",
        width: "100%",
        // padding: "10px",
        borderRadius: "5px",
        position: "relative",
        // marginTop: "10px",
    },
    categoriesContainer: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "33% 33% 33%",
        height: "300px"
    },
    category: {
        width: "97%",
        height: "93%",
        paddingTop: "20%",
        overflow: "hidden",
        position: "relative",
        margin: "4px", 
        borderRadius: "5px"
        //boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13)"
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
    categoryInformation: {
        position: "absolute",
        top: 0,
        padding: 4,
        height: 40,
        width: "100%",
        // background: "rgba(255,255,255,0.5)"
    },
    categoryName: {
        fontWeight: 500,
        color: "white",
        position: "absolute",
        textAlign: "left",
        // top: "50%",
        // transform: "translateY(-50%)"
    },

    searchBox: {
        width: "100%",
        display: "flex",
        height: "50px",
        padding: "10px 15px",
        borderBottom: "2px var(--light-grey) solid",
        position: "sticky",
        top: "-1px",
        background: "white",
        zIndex: 100
    },
    searchInput: {
        fontSize: "1.2em",
        color: "rgb(102, 102, 102)",
        flex: "1 1",
        marginRight: "10px",
        transform: "translateY(-2px)"
    },
    searchIcon: {
        width: "20px",
        height: "20px",
        marginRight: "13px",
        transform: "translateY(4px)"
    },
    fullMenu: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px",
        // boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13)",
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        position: "relative",
        marginTop: "10px"
    }
});

export default connect(({ selectedRestaurant, selectedMenu, selectedRestaurantCategories, searchTerm }) => ({
    selectedRestaurant,
    selectedMenu,
    selectedRestaurantCategories,
    searchTerm
}))(RestaurantDetails);
