import React, { Fragment } from 'react'
import HoursList from '../HoursList';
import Selector from '../Selector';
import FloatingCartButton from '../FloatingCartButton';
import {getScreenHandler, addCartItem, getScreenState, formatPrice} from '../../assets/scripts/Util';

export default class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.restaurantData);
        console.log(this.props.menuData);
        
        let options = [
            {
                id: 4,
                choices: [[]]
            }
        ]


        this.state = {
            selectedItem: null,
            optionsChosen: [],
            instructions: null,
        };

        this.restaurantData.hours = this.props.restaurantData.hours;
        this.restaurantData.food = this.props.menuData;
    }

    restaurantData = {};

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onContentScroll = e => {
        const target = e.currentTarget; //using currentTarget instead of target because of event bubbling
        let scrollLevel = target.scrollTop;
        let bannerHeight = Math.round(175 - scrollLevel);
        bannerHeight = bannerHeight > 54 ? bannerHeight : 54;
        document.getElementById("restaurantSplash").style.height = bannerHeight + "px";
        scrollLevel = scrollLevel > 54 ? 54 : scrollLevel;
        target.style.paddingTop = scrollLevel + "px";
    }

    formatTime(time) {
        let splitTime = time.split(":");
        let hourTime = parseInt(splitTime[0]);
        if (hourTime > 12) {
            return hourTime - 12 + ":" + splitTime[1] + " PM"
        }
        return hourTime + ":" + splitTime[1] + " AM"
    }

    makePHXTime(date) {
        return new Date(date.toLocaleString("en-US", {timeZone: "America/Phoenix"}));
    }

    openItem = item => {
        console.log(item);
        this.setState({
            selectedItem: item
        });
    }

    closeItem = () => {
        this.setState({
            selectedItem: null
        });
    }

    addToCart = () => {
        addCartItem(getScreenState().apiToken, this.state.selectedItem.id, 1, this.state.instructions ? this.state.instructions : "", this.state.optionsChosen);

        this.closeItem();
    }

    calculatePrice = () => {
        let c = this.state.optionsChosen;
        if (!c) return 0;
        let output = 0;
        console.log(c);
        JSON.parse(this.state.selectedItem.items).forEach((item, i) => {
            item.options.forEach((option, j) => {
                console.log(option, i + " : " + j);
                if (c[i] && c[i][j] && option.choices[c[i][j]])
                    output += option.choices[c[i][j]].cost;
            })
        })
        return output;
    }

    render() {
        return (
            <Fragment>
                <div className="itemShow" style={
                    {
                        opacity: this.state.selectedItem ? 1 : 0,
                        pointerEvents: this.state.selectedItem ? "auto" : "none"
                    }
                }>
                    <div className="itemContainer">
                        <div className="closeIcon" onClick={this.closeItem}><i className="material-icons-round">close</i></div>
                        { this.state.selectedItem && <div className="itemContent">
                            <div className="itemImage img-fill">
                                <img className="foodImage" alt={"Food"} src={this.state.selectedItem.image}/>
                            </div>
                            <div className="itemName">
                                {this.state.selectedItem.name}
                            </div>
                            <div className="subItems">
                                {
                                    JSON.parse(this.state.selectedItem.items).map((x, i) => <div key={i}>
                                        <div className="subItemInfo">
                                            {x.tags.length > 0 && <span>Info</span>}
                                            {/*JSON.stringify(x.tags.map(y => y))*/}
                                        </div>
                                        <div className="subItemOptions">
                                            {x.options.length > 0 && <Fragment><span className="optionText">{x.name}</span><div className="separator"></div></Fragment>}
                                            {x.options.map((option, j) => <Selector populate={choiceIndex=>{
                                                let choices = this.state.optionsChosen;
                                                if (!choices[i]) choices[i] = [];
                                                choices[i][j] = choiceIndex;
                                                this.setState({optionsChosen: choices})
                                            }} onSelection={choiceIndex => {
                                                let choices = this.state.optionsChosen;
                                                if (!choices[i]) choices[i] = [];
                                                choices[i][j] = choiceIndex;
                                                this.setState({optionsChosen: choices})
                                            }} key={j} option={option} />)}
                                        </div>
                                    </div>)
                                }
                            </div>
                            {this.state.selectedItem.specialInstructions === 1 && <div className="specialInstructionsWrapper">
                                <div className="SIText">Special Instructions</div>
                                <div className="SIInput">
                                    <textarea onChange={e=>{this.setState({instructions: e.currentTarget.value})}}></textarea>
                                </div>
                            </div>}
                            <div className="addToCartFAB" onClick={this.addToCart}>
                                <span>Add to Cart</span> <i className="material-icons-round">shopping_cart</i>
                            </div>
                            <div className="itemsCost">
                                ${formatPrice(this.state.selectedItem.price)} + {formatPrice(this.calculatePrice())} = ${formatPrice(this.state.selectedItem.price + this.calculatePrice())}
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="flexDisplay fillHeight">
                    <div className="backIcon"><i className="material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i></div>        
                    <div id="restaurantSplash" className="restaurantSplash img-fill">
                        <img alt="" src={this.props.restaurantData.banner}></img>
                        <div className="restaurantTitle">{this.props.restaurantData.name}</div>
                    </div>
                    <div className="restaurantDetails" onScroll={this.onContentScroll}>
                        <div className="restaurantInfo">
                            <div className="restaurantDescription">
                                {this.props.restaurantData.description}
                            </div>
                            <HoursList restaurantData={this.restaurantData}/>
                            
                        </div>
                        <div className="restaurantFood">
                            <div className="featuredMenu">
                                <div className="title">Popular Options</div>
                                <div className="scrollArea">
                                    <div className="scrollCapFill"></div>
                                    {this.restaurantData.food.filter(x => x.featured).map((x, index) => <div key={index} className="featuredFoodItem"><div className="contentContainer">
                                        {/*x.name*/}
                                    </div></div>)}
                                    <div className="scrollCapFill"></div>
                                </div>
                            </div>

                            <div className="fullMenu">
                                <div className="title">Meal Options</div>

                                {this.props.menuData.map((item, index) => <div key={index} className="menuItem" onClick={() => this.openItem(item)}>
                                        <div className="itemImage img-fill"><img className="foodImage" alt="" src={item.image}></img></div>
                                        <div className="itemContent">
                                            <div className="name">{item.name}</div>
                                            <div className="price">${item.price}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <FloatingCartButton  onClick={()=>{getScreenHandler().setScreen("Cart");}}></FloatingCartButton>
            </Fragment>
        );
    }
}