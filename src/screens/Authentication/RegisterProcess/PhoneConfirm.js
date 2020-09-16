import React from "react";
import RegisterStep from "./RegisterStep";
import {
    loginAccount,
} from "../../../assets/scripts/Util";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import ConfirmPhone from "../../../components/Settings/ConfirmPhone";

class PhoneConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: this.props.registerDetails.phone,
        };

        this.codeRef = React.createRef();
    }

    onNextStep = async (value) => {
        console.log(value);
        var loginData = await loginAccount(
            this.props.registerDetails.phone,
            this.props.registerDetails.password
        );
        store.dispatch(actions.setApiToken(loginData.msg));
        store.dispatch(actions.unsetRegisterDetails());
        this.props.history.push("/app");
    };

    render() {
        return (
            <div className="flexDisplay fillHeight margin-fix-top padding-fix-bottom">
                <RegisterStep
                    step={{ part: 3, total: 3 }}
                    noBack
                    onNextStep={null}
                />
                <div className="registerStepBanner">Verify Phone</div>
                <div className="registerFormContainer flex">
                    <p>
                        We've sent a code to your phone number{" "}
                        {this.state.phone}
                    </p>
                    <p>Enter in the code and we can get started!</p>
                    <ConfirmPhone phoneNumber={this.props.registerDetails.phoneNumber} onNextStep={this.onNextStep} />
                </div>
            </div>
        );
    }
}

export default connect(({ registerDetails }) => ({ registerDetails }))(PhoneConfirm);