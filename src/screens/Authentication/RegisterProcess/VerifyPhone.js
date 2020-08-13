import React from "react";
import RegisterStep from "./RegisterStep";
import Input from "../../../components/Input";
import Phone from "../../../assets/images/phone-icon.png";
import {
    phoneNumberTaken,
    showErrors,
    registerAccount,
} from "../../../assets/scripts/Util";
import { connect } from "react-redux";
import store, { actions } from "../../../Redux";

class VerifyPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: this.props.registerDetails.phone,
        };
        this.phoneNumberRef = React.createRef();
    }

    componentDidMount() {}

    componentWillUnmount() {}

    onNextStep = async () => {
        let errors = [];
        let phoneNumber = this.phoneNumberRef.current.value;

        console.log(this.phoneNumberRef.current);
        console.log(this.phoneNumberRef.current.value);

        let isPhoneNumber = (input) => {
            let phoneRegex = /^\d{10}$/;
            return input.match(phoneRegex);
        };

        if (!isPhoneNumber(phoneNumber)) {
            errors.push("Invalid Phone Number");
        }

        if (errors.length === 0 && (await phoneNumberTaken(phoneNumber))) {
            errors.push("Phone number is taken. Try logging in.");
        }

        if (errors.length === 0) {
            store.dispatch(actions.setRegisterDetails({phoneNumber}));
            let result = await registerAccount(
                phoneNumber,
                this.props.registerDetails.firstName,
                this.props.registerDetails.lastName,
                this.props.registerDetails.email,
                this.props.registerDetails.studentNumber,
                this.props.registerDetails.password,
                this.props.registerDetails.profileImage
            );
            if (result.success) {
                this.props.history.push("/register/confirm");
            } else {
                this.props.history.goBack();
                showErrors([result.msg]);
            }
        } else {
            showErrors(errors);
        }
    };

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep
                    step={{ part: 2, total: 3 }}
                    onNextStep={this.onNextStep}
                    onBackStep={this.props.history.goBack}
                />
                <div className="registerStepBanner">Verify Phone</div>
                <div className="registerFormContainer flex alignCenter">
                    <div className="labeledInput">
                        <div className="label">Confirm Phone Number</div>
                        <Input
                            passedRef={this.phoneNumberRef}
                            passedProps={{ defaultValue: this.state.phone }}
                            icon={Phone}
                            autoComplete="current-phone"
                            placeholder="Phone Number"
                            type="tel"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({registerDetails}) => ({registerDetails}))(VerifyPhone);