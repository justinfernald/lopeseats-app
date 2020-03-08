import React from 'react';
import Input from './Input';
import Phone from '../assets/images/phone-icon.png';
import Lock from '../assets/images/lock.svg';
import {loginAccount, showErrors, resendCode, updateFBToken,postData} from '../assets/scripts/Util'

export default class LoginScreen extends React.Component {

    
    constructor(props) {
        super(props);

        if (this.props.apiToken) {
            this.checkToken(this.props.apiToken);
        }
        
        this.state = {
            showPassword: false,
        };
        this.phoneNumberRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    async checkToken(token) {
        console.log("checking" + token);

        if (await postData("https://lopeseat.com/REST/validToken.php", {
            apiToken: token
        })) {
            updateFBToken(this.props.fbToken, this.props.apiToken);
            this.props.onLogin(this.props.apiToken);
        }
    }
    
    toggleShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        
    }

    onSignIn = async () => {
        let phoneNumber = this.phoneNumberRef.current.value;
        let password = this.passwordRef.current.value;

        let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let numbers = "0123456789";

        let errors = [];

        let doesContain = (text, chars) => {
            for (let c of text) {
                if (chars.includes(c)) return true;
            }
            return false;
        };

        let isPhoneNumber = input => {
            let phoneRegex = /^\d{10}$/;
            return input.match(phoneRegex);
        };
        

        if (!isPhoneNumber(phoneNumber)) {
            errors.push("Invalid Phone Number");
        }

        if (password.length < 8) {
            errors.push("Password needs to be at least 8 characters long");
        }

        if (!(doesContain(password, alphabet) && doesContain(password, numbers))) {
            errors.push("Must contain one letter and one number");
        }
        let loginData = await loginAccount(phoneNumber, password);
        if (errors.length === 0 && !loginData.success) {
            if (loginData.msg === "Account not confirmed") {
                this.props.onNotConfirmed(phoneNumber);
                resendCode(phoneNumber);
                return;
            }
            errors.push("Invalid login");
        }

        console.log(errors);

        if (errors.length === 0) {
            updateFBToken(this.props.fbToken, loginData.msg);
            this.props.onLogin(loginData.msg);
        } else {
            showErrors(["Invalid login"]);
        }
    }

    render() {


        return (
            <div className="loginWrapper">
                <div className="formSwitchButton" onClick={this.props.formSwitch}>
                    REGISTER
                </div> 
                <div className="loginImage">
                    <img alt="LopesEat Logo" src={require("../assets/images/lopeseaticon.png")} className="imageFill"/>
                </div>
                <div className="loginForm">
                    <div className="signInText">
                        <span>SIGN IN</span>
                    </div>
                    <div className="inputWrap">
                        <Input icon={Phone} passedRef={this.phoneNumberRef} autoComplete="current-phone" placeholder="Phone Number" type="tel"/>
                        <Input className="forgot" passedRef={this.passwordRef} icon={Lock} showHidden={!this.state.showPassword ? "off" : "on"} onShow={this.toggleShowPassword} autoComplete="current-password" type={!this.state.showPassword ? "password" : "text"} placeholder="Password"/>

                        <div onClick={this.props.onForgotPassword} className="forgotPassword">
                            Forgot password?
                        </div>
                        <div style={{height: '70px'}}></div>
                        <button className="signInButton" onClick={this.onSignIn}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}