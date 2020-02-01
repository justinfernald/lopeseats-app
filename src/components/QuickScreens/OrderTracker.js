import React from 'react';
import '../../App.css';

export default class OrderTracker extends React.Component {

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Order Tracker</span>
                    </div>
                </div>

                <div className="flexDisplayRow">
                    <div className="flexDisplay trackerItems">
                        <div className="trackerText">Sent Request<div className="trackerSubText">8:24 am</div></div>
                        <div className="trackerImage trackerConfirmed"></div>
                        <div className="trackerText">En Route<div className="trackerSubText">8:30 am</div></div>
                        <div className="trackerImage trackerArrived"></div>
                    </div>
                    <div className="trackerBarVert">
                        <div class="progressDot"></div> {/* Sent request */}
                        <div class="progressLine"></div> {/* Claimed */}
                        <div class="progressDot"></div>
                        <div class="progressLine"></div> {/* En Route */}
                        <div class="progressDot"></div>
                        <div class="progressLine"></div> {/* Arrived */}
                        <div class="progressDot"></div>
                    </div>
                    <div className="flexDisplay trackerItems">
                        <div className="trackerImage trackerSentRequest"></div>
                        <div className="trackerText">Order Claimed<div className="trackerSubText">8:26 am</div></div>
                        <div className="trackerImage trackerEnroute"></div>
                        <div className="trackerText">Arrived<div className="trackerSubText" style={{display: "none"}}>8:26 am</div></div>
                    </div>
                </div>
            </div>
        );
    }

}