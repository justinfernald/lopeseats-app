import React from "react";
import Input from "../../components/Input";
// import Phone from "../../assets/images/phone-icon.png";
// import Lock from "../../assets/images/lock.svg";
import { connect } from "react-redux";
import { store, actions } from "../../Redux";
import { IonPage } from "@ionic/react";
import { withCookies } from "react-cookie";
import AccountManager from "../../lopeseatapi/account";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false
    };

    this.phoneNumberRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  componentDidMount() { }

  onSignIn = async () => {
    let phoneNumber = this.phoneNumberRef.current.value;
    let password = this.passwordRef.current.value;

    AccountManager.attemptLogin(phoneNumber, password, this.onNotConfirmed);
  };

  formSwitch = () => this.props.history.replace("/register");

  onNotConfirmed = (phone) => {
    store.dispatch(actions.setRegisterDetails({ phone }));
    this.props.history.replace("/register/confirm");
  };

  onForgotPassword = () => {
    this.props.history.push("/forgotPwd");
  };

  render() {
    return (
      <IonPage>
        <div className="loginWrapper">
          {/* <div className="loginImage">
            <img alt="LopesEat Logo" src={LopesEatLogo} className="imageFill" />
          </div> */}
          <div className="loginHeader">
            <div className="formSwitchButton" onClick={this.formSwitch}>
              REGISTER
            </div>
          </div>
          <div className="signUpText">
            <span>Sign In</span>
          </div>
          <div className="inputWrap">
            <Input
              passedRef={this.phoneNumberRef}
              autoComplete="current-phone"
              placeholder="Phone Number"
              type="tel"
            />
            <Input
              className="forgot"
              passedRef={this.passwordRef}
              showHidden={!this.state.showPassword ? "off" : "on"}
              onShow={this.toggleShowPassword}
              autoComplete="current-password"
              type={!this.state.showPassword ? "password" : "text"}
              placeholder="Password"
            />

            <div onClick={this.onForgotPassword} className="forgotPassword">
              Forgot password?
              </div>
            <div style={{ height: "70px" }}></div>
            <button className="signInButton" onClick={this.onSignIn}>
              Sign In
              </button>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default connect(({ apiToken, fbToken, fbPlatform }) => ({
  apiToken,
  fbToken,
  fbPlatform,
}))(withCookies(LoginScreen));
