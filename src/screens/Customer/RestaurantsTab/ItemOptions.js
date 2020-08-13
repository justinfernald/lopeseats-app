import React from "react";
import Selector from "../../../components/Selector";
import {
    addCartItem,
    formatPrice,
    removeCartItem,
} from "../../../assets/scripts/Util";
import { connect } from "react-redux";

import Screen from "../../../components/Screen";

class ItemOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: props.itemDetails.openItem,
            optionsChosen: props.itemDetails.editingItem
                ? props.itemDetails.optionsChosen
                : [],
            instructions: props.itemDetails.editingItem
                ? props.itemDetails.instructions
                : null,
        };
    }

    componentDidMount() {}

    onContentScroll = (e) => {
        const target = e.currentTarget; //using currentTarget instead of target because of event bubbling
        let scrollLevel = target.scrollTop;
        let bannerHeight = Math.round(175 - scrollLevel);
        bannerHeight = bannerHeight > 54 ? bannerHeight : 54;
        document.getElementById("restaurantSplash").style.height =
            bannerHeight + "px";
        scrollLevel = scrollLevel > 121 ? 121 : scrollLevel;
        target.style.paddingTop = scrollLevel + "px";
    };

    closeItem = () => {
        if (this.state.editingItem) this.props.history.goBack();
        else this.props.history.push("/app/restaurants/cart");
    };

    addToCart = () => {
        // var chosenOptionMap = {};
        // for (var i = 0; i < this.state.optionsChosen.length; i++) {
        //     chosenOptionMap[this.state.optionKeys[i]] = this.state.optionsChosen[i];
        // }
        var itemId = this.state.selectedItem.id;
        if (this.props.itemDetails.editingItem) {
            removeCartItem(this.props.apiToken, this.state.selectedItem.id);
            itemId = this.state.selectedItem.item_id;
        }
        addCartItem(
            this.props.apiToken,
            itemId,
            1,
            this.state.instructions ? this.state.instructions : "",
            this.state.optionsChosen
        ).then(() => this.closeItem());
    };

    calculatePrice = () => {
        let c = this.state.optionsChosen;
        if (!c) return 0;
        let output = 0;
        console.log(c);
        JSON.parse(this.state.selectedItem.items).forEach((item, i) => {
            item.options.forEach((option, j) => {
                console.log(option, i + " : " + j);
                if (
                    c[i] &&
                    c[i][option.name] &&
                    option.choices[c[i][option.name]]
                )
                    output += option.choices[c[i][option.name]].cost;
            });
        });
        return output;
    };

    render() {
        return (
            <Screen
                appBar={{
                    onBack: this.props.history.goBack,
                    splash: this.props.selectedRestaurant.banner,
                }}>
                <div className="itemOptionMenu" onScroll={this.onContentScroll}>
                    <div className="itemDescription">
                        <div className="itemHeader">
                            {this.state.selectedItem.name}
                        </div>
                        <div className="itemDetails">
                            {this.state.selectedItem.description}
                        </div>
                    </div>

                    {JSON.parse(this.state.selectedItem.items).map((x, i) => (
                        <div key={i}>
                            {x.options.map((option, j) => {
                                if (this.props.itemDetails.editingItem) {
                                    option.default =
                                        this.props.itemDetails.optionsChosen[i][
                                            option.name
                                        ];
                                }
                                return (
                                    <Selector
                                        populate={(choiceIndex) => {
                                            let choices = this.state
                                                .optionsChosen;
                                            if (!choices[i]) choices[i] = {};
                                            choices[i][
                                                option.name
                                            ] = choiceIndex;
                                            this.setState({
                                                optionsChosen: choices,
                                            });
                                        }}
                                        onSelection={(choiceIndex) => {
                                            let choices = this.state
                                                .optionsChosen;
                                            if (!choices[i]) choices[i] = {};
                                            choices[i][
                                                option.name
                                            ] = choiceIndex;
                                            this.setState({
                                                optionsChosen: choices,
                                            });
                                        }}
                                        key={j}
                                        option={option}
                                    />
                                );
                            })}
                        </div>
                    ))}

                    {this.state.selectedItem.specialInstructions === 1 && (
                        <div className="specialInstructionsWrapper">
                            <div className="itemOptionTitle">
                                Special Instructions
                            </div>
                            <div className="SIInput">
                                <textarea
                                    onChange={(e) => {
                                        this.setState({
                                            instructions: e.currentTarget.value,
                                        });
                                    }}>
                                    {this.state.instructions}
                                </textarea>
                            </div>
                        </div>
                    )}

                    <div className="itemOptionFooter">
                        <div className="itemCost">
                            Total
                            <span>
                                $
                                {formatPrice(
                                    this.state.selectedItem.price +
                                        this.calculatePrice()
                                )}
                            </span>
                        </div>
                        <div
                            className="addToCartButton"
                            onClick={this.addToCart}>
                            {this.props.itemDetails.editingItem ? "Update " : "Add to "}{" "}
                            Cart
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}

export default connect(({itemDetails, apiToken, selectedRestaurant}) => ({itemDetails, apiToken, selectedRestaurant}))(ItemOptions);