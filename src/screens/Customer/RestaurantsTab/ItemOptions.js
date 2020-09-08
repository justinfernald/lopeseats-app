import React from "react";
import Selector from "../../../components/Selector";
import {
    addCartItem,
    formatPrice,
    removeCartItem,
    showErrors,
} from "../../../assets/scripts/Util";
import { connect } from "react-redux";
import Screen from "../../../components/Screen";

class ItemOptions extends React.Component {
    constructor(props) {
        super(props);

        function arrayToObject(array) {
            let output = {};
            for (let obj of array) {
                output = { ...output, ...obj }
            }
            return output;
        }

        var selectedItem = JSON.parse(JSON.stringify(props.itemDetails.openItem));
        var fixedItems = JSON.parse(selectedItem.items).map((item) => {
            let fixedItem = ({ ...item, options: item.options ? (Array.isArray(item.options) ? item.options : [item.options]) : undefined })
            if (fixedItem.options)
                fixedItem.options = fixedItem.options.map((option) => {
                    if (!option.choices) return null;
                    console.log(option);
                    option.choices = Array.isArray(option.choices) ? arrayToObject(option.choices) : option.choices;
                    return option;
                })

            console.log(fixedItem)
            return fixedItem;
        });
        selectedItem.items = JSON.stringify(fixedItems);

        console.log(selectedItem)

        this.state = {
            selectedItem,
            optionsChosen: props.itemDetails.editingItem
                ? props.itemDetails.optionsChosen
                : [],
            instructions: props.itemDetails.editingItem
                ? props.itemDetails.instructions
                : null,
        };

    }

    componentDidMount() { }

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
        this.props.history.goBack();
    };

    addToCart = async () => {
        // var chosenOptionMap = {};
        // for (var i = 0; i < this.state.optionsChosen.length; i++) {
        //     chosenOptionMap[this.state.optionKeys[i]] = this.state.optionsChosen[i];
        // }

        var itemId = this.state.selectedItem.id;
        if (this.props.itemDetails.editingItem) {
            removeCartItem(this.props.apiToken, this.state.selectedItem.id);
            itemId = this.state.selectedItem.item_id;
        }
        var result = await addCartItem(
            this.props.apiToken,
            itemId,
            1,
            this.state.instructions ? this.state.instructions : "",
            this.state.optionsChosen
        );
        if (result.success) {
            this.closeItem();
        } else {
            showErrors([result.msg]);
        }
    };

    calculatePrice = () => {
        let c = this.state.optionsChosen;
        if (!c) return 0;
        let output = 0;
        JSON.parse(this.state.selectedItem.items).forEach((item, i) => {
            if (item.options)
                item.options.forEach((option, j) => {
                    // console.log(option, i + " : " + j);
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
                    backBtn: true,
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

                    {console.log(this.state.selectedItem.items)}

                    {JSON.parse(this.state.selectedItem.items).map((x, i) => (
                        <div key={i}>
                            {x.options ?
                                x.options.map((option, j) => {
                                    if (!option) return null;
                                    console.log("options: ", option);
                                    if (this.props.itemDetails.editingItem) {
                                        option.default =
                                            this.props.itemDetails.optionsChosen[i][
                                            option.name
                                            ];
                                    }

                                    let populate = (choiceIndex) => {
                                        let choices = Array.from(this.state.optionsChosen);
                                        if (!choices[i]) choices[i] = {};
                                        var choice = Object.assign({}, choices[i]);
                                        choice[
                                            option.name
                                        ] = choiceIndex;
                                        choices[i] = choice;
                                        this.setState({
                                            optionsChosen: choices,
                                        });
                                    };

                                    return (
                                        <Selector
                                            populate={populate}
                                            onSelection={populate}
                                            key={j}
                                            option={option}
                                        />
                                    );
                                }) : null}
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

export default connect(({ itemDetails, apiToken, selectedRestaurant }) => ({ itemDetails, apiToken, selectedRestaurant }))(ItemOptions);