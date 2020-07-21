import React from "react";

export default class DeliveryOrder extends React.Component {
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
                        <span className="screenTitle">Order Details</span>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}
