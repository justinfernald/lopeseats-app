import React from "react";
import RegisterStep from "../RegisterProcess/RegisterStep";
import Input from "../../../components/Input";
import Lock from "../../../assets/images/lock.svg";
import { connect } from "react-redux";
import { showErrors, changeRecoveryPassword } from "../../../assets/scripts/Util";

class NewPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
        
        this.pwdRef = React.createRef();
    }

    componentDidMount() {}

    componentWillUnmount() {}

    toggleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    onNextStep = async () => {
        var result = await changeRecoveryPassword(this.props.recovPhone, this.props.recovCode, this.pwdRef.current.value);
        if (result.success) {
            this.props.history.push("/login");
        } else {
            showErrors([result.msg]);
        }
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep 
                    customHeader="Update Password" 
                    step={{ part: 3, total: 3 }}
                    noBack
                    noDone
                    />
                <div className="registerFormContainer flex alignCenter">
                    <Input
                        icon={Lock}
                        showHidden={!this.state.showPassword ? "off" : "on"}
                        onShow={this.toggleShowPassword}
                        autoComplete="current-password"
                        type={!this.state.showPassword ? "password" : "text"}
                        placeholder="New Password"
                        passedRef={this.pwdRef}
                    />
                    <div style={{textAlign: "center", marginBottom: "20px"}}>
                        Your password must be at least 8 characters long and contain at least one number.
                    </div>

                    <button className="signInButton" onClick={this.onNextStep}>CHANGE PASSWORD</button>
                </div>
            </div>
        );
    }
}

export default connect(({recovPhone, recovCode}) => ({recovPhone, recovCode}))(NewPassword);