import React from "react";
// import LopesEatIcon from '../../assets/images/icon-72x72.png';
import SearchIcon from "../../../assets/images/search-grey.svg";
import { getRestaurants, getMenu } from "../../../assets/scripts/Util";
import FloatingCartButton from "../../../components/FloatingCartButton";
import { isOpen } from "../../../components/HoursList";

import Screen from "../../../components/Screen";

import { store, actions } from "../../../Redux";

export default class RestaurantsList extends React.Component {
    sortType = {
        ALPHA: "alpha",
        WAITTIME: "time",
        COST: "cost",
    };

    sortTypeLongName = {
        alpha: "Alphabetical Order",
        time: "Estimated Wait Time",
        cost: "Median Cost of Meals",
    };

    constructor(props) {
        super(props);

        this.filterDetailRef = React.createRef();

        this.state = {
            onlyOpen: true,
            flipOrder: false,
            sortBy: this.sortType.ALPHA,
            restaurants: [],
            sortedRestaurants: [],
            searchFilter: "",
        };

        this.fetchData();
        console.log(this.state.restaurants);
    }

    updateFilterDetail() {
        this.filterDetailRef.current.classList.remove("run-show");
        void this.filterDetailRef.current.offsetWidth;
        this.filterDetailRef.current.classList.add("run-show");
    }

    async fetchData() {
        this.setState({ restaurants: await getRestaurants() });
    }

    sortRestaurants() {
        let output = this.state.restaurants.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        let removeSpecial = (input) => {
            let spaceChars = "-~.";
            let output = "";
            for (let c of input) {
                if (spaceChars.includes(c)) {
                    output += " ";
                } else {
                    output += c;
                }
            }
            return output
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "")
                .trim();
        };

        let startingFilter = output.filter((x) =>
            removeSpecial(x.name.toLowerCase()).startsWith(
                removeSpecial(this.state.searchFilter.toLowerCase())
            )
        );
        let containingFilter = output.filter((x) =>
            x.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())
        );

        output = [...new Set([...startingFilter, ...containingFilter])];
        if (this.state.onlyOpen) output = output.filter((x) => isOpen(x));

        if (this.state.sortBy === this.sortType.WAITTIME)
            output = output.sort((a, b) => a.wait - b.wait);

        if (this.state.sortBy === this.sortType.COST)
            output = output.sort((a, b) => a.cost - b.cost);

        if (this.state.flipOrder) output = output.reverse();

        return output;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    openRestaurantScreen = (restaurant, menu) => {
        store.dispatch(actions.setSelectedRestaurant(restaurant));
        store.dispatch(actions.setSelectedMenu(menu));
        this.props.history.push("/app/restaurants/details");
    };

    onCartClick = () => {
        this.props.history.push("/app/cart");
    };

    render() {
        // hello.run();
        return (
            <Screen
                appBar={{
                    title: "Restaurants",
                }}>
                <div className="restaurantTop">
                    <div className="sortControl">
                        <div className="searchBox">
                            <div className="searchIcon iconHolder">
                                <img alt="Search" src={SearchIcon} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                onInput={(e) => {
                                    this.setState({
                                        searchFilter: e.target.value,
                                    });
                                }}></input>
                        </div>
                        <div className="sortOptions">
                            {/* sort by (name, wait time, pricing), toggle open and closed, reverse search */}
                            <div
                                onClick={() => {
                                    this.updateFilterDetail();
                                    this.setState({
                                        sortBy: this.sortType.ALPHA,
                                    });
                                }}
                                className={
                                    "sortOption" +
                                    (this.state.sortBy === this.sortType.ALPHA
                                        ? " active"
                                        : "")
                                }>
                                <i className="sortIcon material-icons-round">
                                    sort_by_alpha
                                </i>
                            </div>
                            <div
                                onClick={() => {
                                    this.updateFilterDetail();
                                    this.setState({
                                        sortBy: this.sortType.WAITTIME,
                                    });
                                }}
                                className={
                                    "sortOption" +
                                    (this.state.sortBy ===
                                    this.sortType.WAITTIME
                                        ? " active"
                                        : "")
                                }>
                                <i className="sortIcon material-icons-round">
                                    timer
                                </i>
                            </div>
                            <div
                                onClick={() => {
                                    this.updateFilterDetail();
                                    this.setState({
                                        sortBy: this.sortType.COST,
                                    });
                                }}
                                className={
                                    "sortOption" +
                                    (this.state.sortBy === this.sortType.COST
                                        ? " active"
                                        : "")
                                }>
                                <i className="sortIcon material-icons">
                                    attach_money
                                </i>
                            </div>
                            <div className="sortOption splitter"></div>
                            <div
                                onClick={() => {
                                    this.setState({
                                        onlyOpen: !this.state.onlyOpen,
                                    });
                                }}
                                className={
                                    "sortOption" +
                                    (this.state.onlyOpen ? " active" : "")
                                }>
                                {this.state.onlyOpen ? (
                                    <i className="sortIcon fas fa-door-open"></i>
                                ) : (
                                    <i className="sortIcon fas fa-door-closed"></i>
                                )}
                            </div>
                            <div
                                onClick={() => {
                                    this.setState({
                                        flipOrder: !this.state.flipOrder,
                                    });
                                }}
                                className="sortOption">
                                {!this.state.flipOrder ? (
                                    <i className="sortIcon fas fa-sort-up"></i>
                                ) : (
                                    <i className="sortIcon fas fa-sort-down"></i>
                                )}
                            </div>
                        </div>
                        <div
                            className="filterDetail"
                            ref={this.filterDetailRef}>
                            {this.sortTypeLongName[this.state.sortBy]}
                        </div>
                    </div>
                </div>
                <div className="restaurantList">
                    {this.sortRestaurants().map((value, index) => {
                        return (
                            <div
                                onClick={async (e) => {
                                    e.preventDefault();
                                    this.openRestaurantScreen(
                                        value,
                                        await getMenu(value.id)
                                    );
                                }}
                                key={index}
                                className="restaurantItem">
                                <div className="imageHolder img-fill">
                                    <img alt={value.name} src={value.logo} />
                                </div>
                                <div className="restaurantName">
                                    {value.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <FloatingCartButton/>
            </Screen>
        );
    }
}
