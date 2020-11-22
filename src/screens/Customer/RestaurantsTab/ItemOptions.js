import React from "react";
import Selector from "../../../components/Selector";
import {
    addCartItem,
    formatPrice,
    removeCartItem,
    showErrors,
} from "../../../assets/scripts/Util";
import { connect } from "react-redux";
import { actions, store } from "../../../Redux";
import { IonModal } from '@ionic/react';

class ItemOptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            instructions: "",
            amount: 1
        };
    }

    getItemInfo() {
        function arrayToObject(array) {
            let output = {};
            for (let obj of array) {
                output = { ...output, ...obj }
            }
            return output;
        }

        var selectedItem = JSON.parse(JSON.stringify(this.props.itemDetails.openItem));
        var fixedItems = JSON.parse(selectedItem.items).map((item) => {
            let fixedItem = ({ ...item, options: item.options ? (Array.isArray(item.options) ? item.options : [item.options]) : undefined })
            if (fixedItem.options)
                fixedItem.options = fixedItem.options.map((option) => {
                    if (!option.choices) return null;
                    console.log(option);
                    option.choices = Array.isArray(option.choices) ? arrayToObject(option.choices) : option.choices;
                    return option;
                })

            return fixedItem;
        });
        selectedItem.items = JSON.stringify(fixedItems);

        var defaultOptions = this.props.itemDetails.editingItem ? this.props.itemDetails.optionsChosen : [];

        if (!this.props.itemDetails.editingItem && Array.isArray(fixedItems)) {
            for (var i = 0; i < fixedItems.length; i++) {
                var selectedObj = {};
                var optionsArr = fixedItems[i].options;
                if (Array.isArray(optionsArr))
                    for (var j = 0; j < optionsArr.length; j++) {
                        var optionObj = optionsArr[j];
                        selectedObj[optionObj.name] = optionObj.default;
                    }
                defaultOptions.push(selectedObj);
            }
        }

        return { selectedItem: selectedItem, optionsChosen: defaultOptions };
    }

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
        store.dispatch(actions.setItemModalOpen(false));
        if (this.props.onClose)
            this.props.onClose();
    };

    addToCart = async () => {
        var { selectedItem, optionsChosen } = this.getItemInfo();
        // var chosenOptionMap = {};
        // for (var i = 0; i < this.state.optionsChosen.length; i++) {
        //     chosenOptionMap[this.state.optionKeys[i]] = this.state.optionsChosen[i];
        // }

        var itemId = selectedItem.id;
        if (this.props.itemDetails.editingItem) {
            removeCartItem(this.props.apiToken, selectedItem.id);
            itemId = selectedItem.item_id;
        }
        var result = await addCartItem(
            this.props.apiToken,
            itemId,
            this.state.amount,
            this.state.instructions ? this.state.instructions : "",
            optionsChosen
        );
        if (result.success) {
            this.closeItem();
        } else {
            showErrors([result.msg]);
        }
    };

    calculatePrice = () => {
        var { selectedItem, optionsChosen } = this.getItemInfo();
        let c = optionsChosen;
        if (!c) return 0;
        let output = 0;
        JSON.parse(selectedItem.items).forEach((item, i) => {
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

    incrementAmount = n => {
        var { selectedItem } = this.getItemInfo();
        var amountAvailable = selectedItem.amount_available;
        var newVal = this.state.amount + n;

        if (newVal < 1) {
            newVal = 1;
        } else if (newVal > parseInt(amountAvailable)) {
            newVal = parseInt(amountAvailable);
        }

        this.setState({
            amount: newVal
        });
    }

    render() {
        if (!this.props.itemDetails.openItem)
            return "";
        var { selectedItem, optionsChosen } = this.getItemInfo();

        return (
            <IonModal cssClass="itemModal" isOpen={this.props.itemModalOpen} animated>
                <div style={{ height: "100%", width: "100%", overflowY: "scroll" }}>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        <span onClick={this.closeItem} className="material-icons" style={{ margin: "60px 20px", fontSize: "2em" }}>
                            clear
                        </span>
                    </div>
                    <div className="itemOptionMenu" onScroll={this.onContentScroll}>
                        <div style={{
                            display: "flex",
                            // flexDirection: "row",
                            justifyContent: "center",
                            // marginTop: "15px"
                            height: "100%",

                        }}>
                            <img style={{ height: "auto", maxHeight: "200px", maxWidth: "100%" }} src={selectedItem.image} alt="Item" />
                        </div>

                        <div className="itemDescription">
                            <div className="itemCost">
                                <span>
                                    $
                                    {formatPrice(
                                    selectedItem.price +
                                    this.calculatePrice()
                                )}
                                </span>
                            </div>
                            {/* <div className="itemHeader">
                                {this.state.selectedItem.name}
                            </div>
                            <div className="itemDetails">
                                {this.state.selectedItem.description}
                            </div> */}
                        </div>

                        {console.log(selectedItem.items)}

                        {JSON.parse(selectedItem.items).map((x, i) => (
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
                                            let choices = Array.from(optionsChosen);
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

                        {selectedItem.specialInstructions === 1 && (
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
                            <div className="itemHeader">
                                {selectedItem.name}
                            </div>
                            <div className="itemDetails">
                                {selectedItem.description}
                            </div>

                            <div className="itemAmountContainer">
                                <div className="itemChange flexDisplayRow" onClick={() => this.incrementAmount(-1)}>-</div>
                                <div className="flexDisplay justifyCenter">{this.state.amount}</div>
                                <div className="itemChange flexDisplayRow" onClick={() => this.incrementAmount(1)}>+</div>
                            </div>

                            {/* <div className="itemCost">
                                <span>
                                    $
                                    {formatPrice(
                                this.state.selectedItem.price +
                                this.calculatePrice()
                            )}
                                </span>
                            </div> */}
                            <div
                                className="addToCartButton"
                                onClick={this.addToCart}>
                                {this.props.itemDetails.editingItem ? "Update " : "Add to "}{" "}
                                Cart
                            </div>
                        </div>
                    </div>
                </div>
            </IonModal>
        );
    }
}

export default connect(({ itemDetails, apiToken, selectedRestaurant, itemModalOpen }) => ({ itemDetails, apiToken, selectedRestaurant, itemModalOpen }))(ItemOptions);