import React from "react";

export default class DeliveryPayment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <div className="restaurantTop">
                    <div className="header">
                        <i
                            className="icon material-icons-round"
                            onClick={this.props.onBack}>
                            arrow_back_ios
                        </i>
                        <span className="screenTitle">Check Out</span>
                    </div>
                </div>
                <div>
                    <div>Align Barcode to Reader</div>
                    <div>
                        Deliverer
                        <span className="delivererName">Justin Fernald</span>
                    </div>
                    <div>
                        Customer
                        <span className="customerName">Will Garrett</span>
                    </div>
                    <div className="barcodeContainer">
                        <div className="barcode"></div>
                    </div>
                </div>
            </div>
        );
    }
}
