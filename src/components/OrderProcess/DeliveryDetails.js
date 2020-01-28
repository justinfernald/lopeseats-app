import React from 'react';
import '../../App.css';
import Input from '../Input';

export default class DeliveryDetails extends React.Component {

    constructor(props) {
        super(props);
        this.addressRef = React.createRef(this.props.address);
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
                        <Input passedRef={this.addressRef} placeholder="Address" defaultValue={this.props.address}/>
                    </div>
                </div>
                
                <button className="doneButton" onClick={() => this.props.onNextStep(this.addressRef.current.value)}>DONE</button>
            </div>
        );
    }

}