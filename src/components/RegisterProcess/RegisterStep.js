import React from 'react';
// import onIOS from '../../assets/scripts/iosCheck';

export default class RegisterStep extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div className="registerHeader">
                <div className = "registerStepTop">
                    {!this.props.noBack && <i className="material-icons-round" onClick={this.props.onBackStep}>arrow_back_ios</i>}
                    <div className="nextStepButton" onClick={this.props.onNextStep}>DONE</div>
                </div>
                <div className="registerStepWrapper">
                    <div className="registerStepText">
                        {this.props.customHeader || "Register"}
                    </div>
                    {this.props.step && 
                    <div className="registerStepProgress">
                        Step {this.props.step.part}/{this.props.step.total}
                    </div>
                    }
                    
                </div>
                
            </div>
        );
    }
}