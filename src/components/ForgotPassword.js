import React from 'react';
import RegisterStep from './RegisterProcess/RegisterStep';
import Input from './Input';
import Lock from '../assets/images/lock.svg'


export default class ForgotPassword extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    toggleShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep customHeader="Profile"/>
                <div className="registerStepBanner">Reset Password</div>
                <div className="registerFormContainer flex alignCenter">
                    <Input icon={Lock} showHidden={!this.state.showPassword ? "off" : "on"} onShow={this.toggleShowPassword} autoComplete="current-password" type={!this.state.showPassword ? "password" : "text"} placeholder="New Password"/>
                    <Input icon={Lock} showHidden={!this.state.showPassword ? "off" : "on"} onShow={this.toggleShowPassword} autoComplete="current-password" type={!this.state.showPassword ? "password" : "text"} placeholder="Confirm password"/>

                    <button className="signInButton">
                        CHANGE PASSWORD
                    </button>
                </div>
            </div>
        );
    }
}