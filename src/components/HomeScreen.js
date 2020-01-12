import React from 'react';
import LopesWayImage from '../assets/images/gcu-lopesway.jpg';


export default class HomeScreen extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        };

        this.tiles = [
            {
                title: "Restaurants",
                icon: "restaurant"
            },
            {
                title: "Quick Meals",
                icon: "fastfood"
            }, 
            {
                title: "Recent Orders",
                icon: "timer",
            }, 
            {
                title: "Current Orders",
                icon: "track_changes",
            }, 
            {
                title: "Dining Updates",
                icon: "update",
            }, 
            {
                title: "Profile",
                icon: "person",
            }]
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    changeScreen(screen) {
        this.props.onMenuItemClick(screen);
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="flex img-fill">
                    <img  alt="Lopes Way" src={LopesWayImage}/>
                    <div className="imageGradient"></div>
                    <div className="mainDisplayText">
                        <div className="subHeading">Welcome to</div>
                        <div className="heading">LopesEat</div>
                    </div>
                </div>
                <div className="screenTiles">
                    {
                        this.tiles.map((value, index) => {
                            return <div className={"screenTile"} key={index} onClick={() => {this.changeScreen(this.props.tileNavigation[index])}}>
                                <div className="iconTile">
                                    <i className="material-icons-round">{value.icon}</i>
                                </div>
                                <div>
                                    {value.title}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}