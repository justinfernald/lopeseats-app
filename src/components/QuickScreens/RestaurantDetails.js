import React, { Fragment } from 'react';
import LopesEatIcon from '../../assets/images/lopeseaticon.png';
import PandaExpressBanner from '../../assets/images/pandabanner.png';
import HoursList from '../HoursList';

export default class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.restaurantData);
        console.log(this.props.menuData);

        this.state = {
            selectedItem: null
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
                                    JSON.parse(this.state.selectedItem.items).map(x => <div>
                                        <div className="subItemName">{x.name}</div>
                                        <div className="subItemInfo">
                                            {JSON.stringify(x.tags.map(y => y))}
                                        </div>
                                        <div className="subItemOptions">
                                            {x.options.map(option => {
                                                return <div>{JSON.stringify(option)}</div>
                                            })}
                                        </div>
                                        <div className="subItemCost">
                                        </div>
                                    </div>)
                                }
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
                    {/* 
                    times it is open
                    is it open now - how much longer till it closes and wait time
                    menu items < shows sliding view of popular ones
                    all menu items < have attributes like healthy, gluten free, high protein
                    */}
                    <div className="restaurantDetails" onScroll={this.onContentScroll}>
                        <div className="restaurantInfo">
                            {/* <div className="openStatus">
                                {true ?
                                <span style={{color: "#25bb00"}}>Open until 11:00pm</span> :
                                <span style={{color: "#ff4444"}}>Closed until 8:00am 11/31/2019</span>}
                            </div> */}
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
                                        {x.name}
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

                                {/* {this.restaurantData.food.filter(x => x.featured).map((x, index) =>
                                    <div key={index} className="menuItem">
                                        <div className="itemImage img-fill"><img alt="" src={LopesEatIcon}></img></div>
                                        <div className="itemContent">
                                            {x.name}
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}