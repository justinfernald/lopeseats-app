import React from 'react';
import '../App.css';

export default class MessageScreen extends React.Component {

    render() {
        return (
            <div className="flexDisplay fillHeight">             
                <div className="restaurantTop">
                    <div className="header">
                        <i className="icon material-icons-round" onClick={this.props.onBack}>arrow_back_ios</i>
                        <span className="screenTitle">Name here</span>
                    </div>
                </div>
                <span className="horizontalLine"></span>

                <div className="messageScroll">
                    <div className="messageChunk">
                        <div className="messageInfo">Yesterday 8:19 PM</div>
                        <div className="messageBubble">This is a really long test message to make sure that wrapping works. I hopeit does</div>
                    </div>
                    <div className="newDayLine">
                        <span className="horizontalLine"></span>
                        Today
                        <span className="horizontalLine"></span>
                    </div>
                    <div className="messageChunk right">
                        <div className="messageInfo">Yesterday 8:19 PM</div>
                        <div className="messageBubble">This is a really long test message to make sure that wrapping works. I hopeit does</div>
                    </div>
                </div>

                <span className="horizontalLine" style={{position: "absolute", bottom: "3.5em"}}></span>
                <div className="messageBox">
                    <div className="messageBoxContainer"><input className="messageInput" type="text" placeholder="Message Name Here"></input></div>
                    <div className="sendMessage"><i className="material-icons-round">send</i></div>
                </div>
            </div>
        );
    }

}