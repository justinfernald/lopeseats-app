import React from "react";

export default class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

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
                        <span className="screenTitle">Profile</span>
                    </div>
                </div>
            </div>
        );
    }
}
