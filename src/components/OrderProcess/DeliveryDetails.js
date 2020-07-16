import React from 'react';
import '../../App.css';
import Input from '../Input';
import {getBuildings} from '../../assets/scripts/Util';

export default class DeliveryDetails extends React.Component {

    buildings = null;

    constructor(props) {
        super(props);
        this.addressRef = React.createRef(this.props.address);
        this.state = {
            search: "",
            searchResults: []
        };
    }

    async updateValue(e) {
        var search = e.target.value;
        var searchResults = [];

        if (this.buildings == null) {
            this.buildings = await getBuildings();
        }

        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].name.toLowerCase().includes(search.toLowerCase())) {
                searchResults.push(this.buildings[i]);
            }
        }

        this.setState({search,searchResults});
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Delivery Details</span>
                    </div>
                </div>

                <div className="deliveryFormContainer flex alignCenter">
                    <div className="addressInput">
                        <Input passedRef={this.addressRef} placeholder="Address" onChange={e => this.updateValue(e)} defaultValue={this.props.address}/>
                    </div>

                    <div className="addrResults">
                        {
                            this.state.searchResults.map((value,index) => {
                                return (
                                <div className={"addrItem" + (value.name.toLowerCase() == this.state.search.toLowerCase() ? " selected" : "")}>
                                    <span className="addrTitle">{value.name}</span>
                                    <span className="material-icons check">done</span>
                                </div>);
                            })
                        }
                    </div>
                    <button className="doneButton" onClick={() => this.props.onNextStep(this.addressRef.current.value)}>DONE</button>
                </div>
            </div>
        );
    }

}