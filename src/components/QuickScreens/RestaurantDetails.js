import React, { Fragment } from "react";
import HoursList from "../HoursList";
// import Selector from "../Selector";
import FloatingCartButton from "../FloatingCartButton";
import {
    getScreenHandler,
    // addCartItem,
    // getScreenState,
    // formatPrice,
} from "../../assets/scripts/Util";

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

        this.restaurantData.hours = this.props.restaurantData.hours;
        this.restaurantData.food = this.props.menuData;
    }

    restaurantData = {};

    componentDidMount() {}

    componentWillUnmount() {}

    onContentScroll = (e) => {
        const target = e.currentTarget; //using currentTarget instead of target because of event bubbling
        let scrollLevel = target.scrollTop; //Math.floor(target.scrollTop);
        let bannerHeight = 175 - scrollLevel;
        bannerHeight = bannerHeight > 54 ? bannerHeight : 54;
        document.getElementById("restaurantSplash").style.height =
            bannerHeight + "px";
        scrollLevel = scrollLevel > 121 ? 121 : scrollLevel;
        target.style.paddingTop = scrollLevel + "px";
    };

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
        this.props.openItem(item);
    };

    render() {
        return (
            <Fragment>
                <div className="flexDisplay fillHeight">
                    <div className="backIcon">
                        <i
                            className="material-icons-round"
                            onClick={this.props.onBack}>
                            arrow_back_ios
                        </i>
                    </div>
                    <div
                        id="restaurantSplash"
                        className="restaurantSplash img-fill">
                        <img
                            alt=""
                            src={this.props.restaurantData.banner}></img>
                        <div className="restaurantTitle">
                            {this.props.restaurantData.name}
                        </div>
                    </div>
                    <div
                        className="restaurantDetails"
                        onScroll={this.onContentScroll}>
                        <div className="restaurantInfo">
                            <div className="restaurantDescription">
                                {this.props.restaurantData.description}
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

                                {this.props.menuData.map((item, index) => (
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
                                            <div className="name">
                                                {item.name}
                                            </div>
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
                </div>
                <FloatingCartButton
                    onClick={() => {
                        getScreenHandler().setScreen("Cart");
                    }}></FloatingCartButton>
            </Fragment>
        );
    }
}
