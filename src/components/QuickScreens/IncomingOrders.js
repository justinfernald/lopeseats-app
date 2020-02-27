import React from 'react';

export default class IncomingOrders extends React.Component {

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Incoming Orders</span>
                    </div>
                </div>

                <div class="incomingOrderList">
                    <div class="incomingOrder">
                        <div class="orderTitle">Chick Fil A</div>
                        <div class="orderInfo">Jerome Hall</div>
                    </div>
                    <div class="incomingOrder">
                        <div class="orderTitle">Chick Fil A</div>
                        <div class="orderInfo">Jerome Hall</div>
                    </div>
                    <div class="incomingOrder">
                        <div class="orderTitle">Chick Fil A</div>
                        <div class="orderInfo">Jerome Hall</div>
                    </div>
                    <div class="incomingOrder">
                        <div class="orderTitle">Chick Fil A</div>
                        <div class="orderInfo">Jerome Hall</div>
                    </div>
                    <div class="incomingOrder">
                        <div class="orderTitle">Chick Fil A</div>
                        <div class="orderInfo">Jerome Hall</div>
                    </div>
                    <div class="incomingOrder">
                        <div class="orderTitle">Chick Fil A</div>
                        <div class="orderInfo">Jerome Hall</div>
                    </div>
                </div>
            </div>
        );
    }

}