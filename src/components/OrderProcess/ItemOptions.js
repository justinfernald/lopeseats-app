import React from 'react'
import Selector from '../Selector';
import {addCartItem, getScreenState, formatPrice, removeCartItem} from '../../assets/scripts/Util';

export default class ItemOptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            selectedItem: props.selectedItem,
            optionsChosen: props.editingItem ? props.optionsChosen : [],
            instructions: props.editingItem ? props.instructions : null,
        };
    }

    componentDidMount() {

    }

    onContentScroll = e => {
        const target = e.currentTarget; //using currentTarget instead of target because of event bubbling
        let scrollLevel = target.scrollTop;
        let bannerHeight = Math.round(175 - scrollLevel);
        bannerHeight = bannerHeight > 54 ? bannerHeight : 54;
        document.getElementById("restaurantSplash").style.height = bannerHeight + "px";
        scrollLevel = scrollLevel > 121 ? 121 : scrollLevel;
        target.style.paddingTop = scrollLevel + "px";
    }

    closeItem = () => {
        this.props.closeItem();
    }

    addToCart = () => {
        // var chosenOptionMap = {};
        // for (var i = 0; i < this.state.optionsChosen.length; i++) {
        //     chosenOptionMap[this.state.optionKeys[i]] = this.state.optionsChosen[i];
        // }
        var itemId = this.state.selectedItem.id;
        if (this.props.editingItem) {
            removeCartItem(getScreenState().apiToken, this.state.selectedItem.id);
            itemId = this.state.selectedItem.item_id;
        }
        addCartItem(getScreenState().apiToken, itemId, 1, this.state.instructions ? this.state.instructions : "", this.state.optionsChosen).then(() => this.closeItem());
    }

    calculatePrice = () => {
        let c = this.state.optionsChosen;
        if (!c) return 0;
        let output = 0;
        console.log(c);
        JSON.parse(this.state.selectedItem.items).forEach((item, i) => {
            item.options.forEach((option, j) => {
                console.log(option, i + " : " + j);
                if (c[i] && c[i][option.name] && option.choices[c[i][option.name]])
                    output += option.choices[c[i][option.name]].cost;
            })
        })
        return output;
    }

    render() {
        return (
        <div className="flexDisplay fillHeight">
            <div className="backIcon"><i className="material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i></div>        
            <div id="restaurantSplash" className="restaurantSplash img-fill">
                <img alt="" src={this.props.restaurantData.banner}></img>
            </div>
            <div className="itemOptionMenu" onScroll={this.onContentScroll}>
                <div className="itemDescription">
                    <div className="itemHeader">{this.state.selectedItem.name}</div>
                    <div className="itemDetails">Enjoy these grilled beef steaks sprinkled with salt and pepper that...</div>
                </div>

                {JSON.parse(this.state.selectedItem.items).map((x, i) =>
                    <div key={i}>
                            {x.options.map((option, j) => {
                                if (this.props.editingItem) {
                                    option.default = this.props.optionsChosen[i][option.name];
                                }
                                return <Selector populate={choiceIndex=>{
                                    let choices = this.state.optionsChosen;
                                    if (!choices[i]) choices[i] = {};
                                    choices[i][option.name] = choiceIndex;
                                    this.setState({optionsChosen: choices})
                                }} onSelection={choiceIndex => {
                                    let choices = this.state.optionsChosen;
                                    if (!choices[i]) choices[i] = {};
                                    choices[i][option.name] = choiceIndex;
                                    this.setState({optionsChosen: choices})
                                }} key={j} option={option} />
                            })
                            }
                    </div>)
                }
            
                {this.state.selectedItem.specialInstructions === 1 && <div className="specialInstructionsWrapper">
                    <div className="itemOptionTitle">Special Instructions</div>
                    <div className="SIInput">
                        <textarea onChange={e=>{this.setState({instructions: e.currentTarget.value})}}>{this.state.instructions}</textarea>
                    </div>
                </div>}

                <div className="itemOptionFooter">
                    <div className="itemCost">
                        Total
                        <span>${formatPrice(this.state.selectedItem.price + this.calculatePrice())}</span>
                    </div>
                    <div className="addToCartButton" onClick={this.addToCart}>
                        {this.props.editingItem ? "Update " : "Add to "} Cart
                    </div>
                </div>
            </div>
        </div>
        );
    }

}