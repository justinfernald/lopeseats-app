import React from "react";
import RegisterStep from "../RegisterProcess/RegisterStep";
import Input from "../../../components/Input";
import Phone from "../../../assets/images/phone-icon.png";
import { requestRecoveryCode } from "../../../assets/scripts/Util";
import { store, actions } from "../../../Redux";

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
        this.phoneRef = React.createRef();
    }

    componentDidMount() {}

    componentWillUnmount() {}

    toggleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    requestCode = async () => {
        var result = await requestRecoveryCode(this.phoneRef.current.value);
        if (result.success) {
            store.dispatch(actions.setRecovPhone(this.phoneRef.current.value));
            this.props.history.push("/recovCode");
        }
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep step={{ part: 1, total: 3 }} customHeader="Forgot Password" onBackStep={this.props.history.goBack} noDone/>
                <div className="registerStepBanner">Reset Password</div>
                <div className="registerFormContainer flex alignCenter">
                    <Input
                        icon={Phone}
                        autoComplete="current-phone"
                        type="number"
                        placeholder="Phone Number"
                        passedRef={this.phoneRef}
                    />

                    <button className="signInButton" onClick={this.requestCode}>Request Recovery Code</button>
                </div>
            </div>
        );
    }
}
