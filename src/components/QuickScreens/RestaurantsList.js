import React from 'react';
import LopesEatIcon from '../../assets/images/icon-72x72.png';
import SearchIcon from '../../assets/images/search-grey.svg';
import { getRestaurants, getMenu } from '../../assets/scripts/Util';

export default class RestaurantsList extends React.Component {
    sortType = {
        ALPHA: "alpha",
        WAITTIME: "time",
        COST: "cost"
    }

    // restaurants = [
    //     {
    //         title: "Panda Express",
    //         icon: LopesEatIcon,
    //         waitTime: 3, //in minutes
    //         cost: 7, //average common mean price
    //         open: true,
    //     },
    //     {
    //         title: "Chick-fil-A",
    //         icon: LopesEatIcon,
    //         waitTime: 10, //in minutes
    //         cost: 5, //average common mean price
    //         open: false,
    //     },
    //     {
    //         title: "Pita Jungle",
    //         icon: LopesEatIcon,
    //         waitTime: 1, //in minutes
    //         cost: 9, //average common mean price
    //         open: true,
    //     },
    //     {
    //         title: "Subway",
    //         icon: LopesEatIcon,
    //         waitTime: 7, //in minutes
    //         cost: 8, //average common mean price
    //         open: false,
    //     },
    //     {
    //         title: "Auntie Anne's",
    //         icon: LopesEatIcon,
    //         waitTime: 1, //in minutes
    //         cost: 4, //average common mean price
    //         open: true,
    //     },
    //     {
    //         title: "Qdoba",
    //         icon: LopesEatIcon,
    //         waitTime: 9, //in minutes
    //         cost: 9, //average common mean price
    //         open: false,
    //     },
    //     {
    //         title: "Arena Cafe",
    //         icon: LopesEatIcon,
    //         waitTime: 15, //in minutes
    //         cost: 7, //average common mean price
    //         open: true,
    //     },
    //     {
    //         title: "Purple Greens",
    //         icon: LopesEatIcon,
    //         waitTime: 1, //in minutes
    //         cost: 8, //average common mean price
    //         open: false,
    //     },
    //     {
    //         title: "Fresh Fusion",
    //         icon: LopesEatIcon,
    //         waitTime: 2, //in minutes
    //         cost: 8, //average common mean price
    //         open: true,
    //     },
    //     {
    //         title: "The Grid",
    //         icon: LopesEatIcon,
    //         waitTime: 2, //in minutes
    //         cost: 5, //average common mean price
    //         open: false,
    //     },
    //     {
    //         title: "Canyon Crepes",
    //         icon: LopesEatIcon,
    //         waitTime: 1, //in minutes
    //         cost: 8, //average common mean price
    //         open: true,
    //     },
    //     {
    //         title: "Canyon 49",
    //         icon: LopesEatIcon,
    //         waitTime: 10, //in minutes
    //         cost: 11, //average common mean price
    //         open: false,
    //     },
    //     {
    //         title: "Harvest Kitchen",
    //         icon: LopesEatIcon,
    //         waitTime: 3, //in minutes
    //         cost: 10, //average common mean price
    //         open: true,
    //     },
    // ];
    restaurants = [];
    
    constructor(props) {
        super(props);

        
        this.state = {
            onlyOpen: true,
            flipOrder: false,
            sortBy: this.sortType.ALPHA,
            sortedRestaurants: this.restaurants,
            searchFilter: "",
        };

        this.fetchData();
        console.log(this.restaurants);
        
    }

    async fetchData() {
        this.restaurants = await getRestaurants();
        console.log(this.restaurants);

        this.forceUpdate();
    }

    sortRestaurants() {
        let output = this.restaurants.sort((a,b) => a.name.localeCompare(b.name));

        let removeSpecial = input => {
            let spaceChars = "-~.";
            let output = "";
            for (let c of input) {
                if (spaceChars.includes(c)) {
                    output += " ";
                } else {
                    output += c;
                }
            }
            return output.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g,'').trim();;
        }

        let startingFilter = output.filter(x => removeSpecial(x.name.toLowerCase()).startsWith(removeSpecial(this.state.searchFilter.toLowerCase())));
        let containingFilter = output.filter(x => x.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()));

        output = [...new Set([...startingFilter, ...containingFilter])];
        if (this.state.onlyOpen && false) // !change later should remove the false
            output = output.filter(x => x.open);
        
        if (this.state.sortBy === this.sortType.WAITTIME)
            output = output.sort((a,b) => a.wait - b.wait);
        
        if (this.state.sortBy === this.sortType.COST)
            output = output.sort((a,b) => a.cost - b.cost);

        if (this.state.flipOrder)
            output = output.reverse();

        return output;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        // hello.run();
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="restaurantHeader">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Restaurants</span>
                    </div>
                    <div className="sortControl">
                        <div className="searchBox">
                            <div className="searchIcon iconHolder"><img alt="Search" src={SearchIcon}/></div>
                            <input type="text" placeholder="Search" onInput={e => {this.setState({searchFilter: e.target.value})}}></input>
                        </div>
                        <div className="sortOptions">
                            {/* sort by (name, wait time, pricing), toggle open and closed, reverse search */}
                            <div onClick={()=>{this.setState({sortBy: this.sortType.ALPHA})}} className={"sortOption" + (this.state.sortBy === this.sortType.ALPHA ? " active" : "")}>
                                <i className="sortIcon material-icons-round">sort_by_alpha</i>
                            </div>
                            <div onClick={()=>{this.setState({sortBy: this.sortType.WAITTIME})}} className={"sortOption" + (this.state.sortBy === this.sortType.WAITTIME ? " active" : "")}>
                                <i className="sortIcon material-icons-round">timer</i>
                            </div>
                            <div onClick={()=>{this.setState({sortBy: this.sortType.COST})}} className={"sortOption" + (this.state.sortBy === this.sortType.COST ? " active" : "")}>
                                <i className="sortIcon material-icons">attach_money</i>
                            </div>
                            <div className="sortOption splitter"></div>
                            <div onClick={()=>{this.setState({onlyOpen: !this.state.onlyOpen})}} className={"sortOption" + (this.state.onlyOpen ? " active" : "")}>
                                {this.state.onlyOpen ? <i className="sortIcon fas fa-door-open"></i> : <i className="sortIcon fas fa-door-closed"></i>}
                            </div>
                            <div onClick={()=>{this.setState({flipOrder: !this.state.flipOrder})}} className="sortOption">
                                {!this.state.flipOrder ? <i className="sortIcon fas fa-sort-up"></i> : <i className="sortIcon fas fa-sort-down"></i>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="restaurantList">
                    {
                    this.sortRestaurants().map((value, index) => {return <div onClick={async () => this.props.openRestaurantScreen(value, await getMenu(value.id))} key={index} className="restaurantItem">
                        <div className="imageHolder img-fill"><img alt={value.name} src={value.logo}/></div>
                        <div className="restaurantName">{value.name}</div>
                    </div>})
                    }
                </div>
            </div>
        );
    }
}