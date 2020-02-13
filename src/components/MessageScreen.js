import React from 'react';
import '../App.css';

export default class MessageScreen extends React.Component {

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Messages</span>
                    </div>
                </div>

                <div className="messageBox">
                    <input className="messageInput" type="text" placeholder="Message Will"></input>
                    <div className="sendMessage"><i className="material-icons-round">send</i></div>
                </div>
            </div>
        );
    }

}