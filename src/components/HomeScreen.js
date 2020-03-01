import React from 'react';
import LopesWayImage from '../assets/images/gcu-lopesway.jpg';


export default class HomeScreen extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            deliveryMode: false
        };

        this.tiles = [
            // Delivery Mode
            [{
                title: "Incoming Orders",
                icon: "restaurant"
            },
            {
                title: "Active Orders",
                icon: "timer",
            },
            {
                title: "Ordering Mode",
                // icon: "fastfood"
                icon: "local_shipping"
            },
            {
                title: "Leader Board??",
                icon: "track_changes",
            },
            {
                title: "Completed Orders",
                icon: "update",
            },
            {
                title: "Profile",
                icon: "person",
            }],
            //Customer Mode
            [{
                title: "Restaurants",
                icon: "restaurant"
            },
            {
                title: "Recent Orders",
                icon: "timer",
            },
            {
                title: "Delivery Mode",
                // icon: "fastfood"
                icon: "local_shipping"
            },
            {
                title: "Order Tracker",
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
        ]
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    changeScreen(screen) {
        if (screen === "SwitchMode") {
            console.log("old: " + this.state.deliveryMode);
            var deliveryMode = !this.state.deliveryMode;
            this.setState({
                deliveryMode
            });
        } else
            this.props.onMenuItemClick(screen);
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="flex img-fill">
                    <img  alt="Lopes Way" src={LopesWayImage}/>
                    <div className="imageGradient"></div>
                    <div className="mainDisplayText">
                        <div className="subHeading">{this.state.deliveryMode ? "Deliver for" : "Welcome to"}</div>
                        <div className="heading">LopesEat</div>
                    </div>
                </div>
                <div className="screenTiles">
                    {
                        this.tiles[this.state.deliveryMode ? 0 : 1].map((value, index) => {
                            return <div className={"screenTile"} key={index} onClick={() => {this.changeScreen(this.props.tileNavigation[this.state.deliveryMode ? 0:1][index])}}>
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