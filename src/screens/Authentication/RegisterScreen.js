import React from "react";
import Input from "../../components/Input";
import Phone from "../../assets/images/phone-icon.png";
import Lock from "../../assets/images/lock.svg";
import {
    phoneNumberTaken,
    showErrors,
} from "../../assets/scripts/Util";

import store, {actions} from "../../Redux";

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
        this.phoneNumberRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfirmRef = React.createRef();
    }

    componentDidMount() {}

    componentWillUnmount() {}

    toggleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    registerAccount = async () => {
        // eslint-disable-next-line
        let phoneNumber = this.phoneNumberRef.current.value;
        let password = this.passwordRef.current.value;
        let confirmPassword = this.passwordConfirmRef.current.value;

        let errors = [];

        let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let numbers = "0123456789";

        let doesContain = (text, chars) => {
            for (let c of text) {
                if (chars.includes(c)) return true;
            }
            return false;
        };

        let isPhoneNumber = (input) => {
            let phoneRegex = /^\d{10}$/;
            return input.match(phoneRegex);
        };

        if (!isPhoneNumber(phoneNumber)) {
            errors.push("Invalid Phone Number");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match");
        }

        if (password.length < 8) {
            errors.push("Password needs to be at least 8 characters long");
        }

        if (
            !(doesContain(password, alphabet) && doesContain(password, numbers))
        ) {
            errors.push("Must contain one letter and one number");
        }

        if (errors.length === 0 && (await phoneNumberTaken(phoneNumber))) {
            errors.push("Phone number is taken. Try logging in.");
        }

        console.log(errors);

        if (errors.length === 0) {
            this.proceedRegistration(phoneNumber, password);
        } else {
            showErrors(errors);
        }
    };

    proceedRegistration = (phone, password) => {
        store.dispatch(actions.setRegisterDetails({
            phone,
            password,
        }));
        this.props.history.push("/register/info");
    };

    formSwitch = () => this.props.history.replace("/login");

    render() {
        return (
            <div className="loginWrapper">
                <div className="formSwitchButton" onClick={this.formSwitch}>
                    SIGN IN
                </div>
                <div className="loginImage">
                    <img
                        alt="LopesEat Logo"
                        src={require("../../assets/images/lopeseaticon.png")}
                        className="imageFill"
                    />
                </div>
                <div className="loginForm">
                    <div className="signInText">
                        <span>REGISTER</span>
                    </div>
                    <div className="inputWrap">
                        <Input
                            passedRef={this.phoneNumberRef}
                            icon={Phone}
                            autoComplete="current-phone"
                            placeholder="Phone Number"
                            type="tel"
                        />
                        <Input
                            passedRef={this.passwordRef}
                            icon={Lock}
                            showHidden={!this.state.showPassword ? "off" : "on"}
                            onShow={this.toggleShowPassword}
                            autoComplete="current-password"
                            type={
                                !this.state.showPassword ? "password" : "text"
                            }
                            placeholder="Password"
                        />
                        <Input
                            passedRef={this.passwordConfirmRef}
                            icon={Lock}
                            showHidden={!this.state.showPassword ? "off" : "on"}
                            onShow={this.toggleShowPassword}
                            autoComplete="current-password"
                            type={
                                !this.state.showPassword ? "password" : "text"
                            }
                            placeholder="Confirm password"
                        />
                        <button
                            className="signInButton"
                            onClick={this.registerAccount}>
                            REGISTER
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
