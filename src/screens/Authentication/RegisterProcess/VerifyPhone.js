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
import { store, actions } from "../../../Redux";

class VerifyPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: this.props.registerDetails.phone,
            email: this.props.registerDetails.email,
        };
        this.phoneNumberRef = React.createRef();
        this.emailRef = React.createRef();
    }

    componentDidMount() { }

    componentWillUnmount() { }

    onNextStep = async () => {
        let errors = [];
        let phoneNumber = this.phoneNumberRef.current.value;
        let email = this.emailRef.current.value;

        console.log(this.phoneNumberRef.current);
        console.log(this.phoneNumberRef.current.value);

        let checkEmail = (mail) => {
            // eslint-disable-next-line
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
        };

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

        if (!checkEmail(email)) {
            errors.push("Email invalid");
        }

        if (errors.length === 0) {
            store.dispatch(actions.setRegisterDetails({ phoneNumber, email }));
            let result = await registerAccount(
                phoneNumber,
                this.props.registerDetails.firstName,
                this.props.registerDetails.lastName,
                email,
                this.props.registerDetails.studentNumber,
                this.props.registerDetails.password,
                this.props.registerDetails.profileImage
            );
            if (result.success) {
                this.props.history.push("/register/confirm");
            } else {
                this.props.history.go(-2);
                showErrors([result.msg]);
            }
        } else {
            showErrors(errors);
        }
    };

    render() {
        return (
            <div className="flexDisplay fillHeight margin-fix-top padding-fix-bottom">
                <RegisterStep
                    step={{ part: 3, total: 4 }}
                    onNextStep={this.onNextStep}
                    onBackStep={this.props.history.goBack}
                />
                <div className="registerStepBanner">Confirm Information</div>
                <div className="registerFormContainer flex alignCenter">
                    <div className="labeledInput">
                        <div className="label">Confirm Phone Number</div>
                        <Input
                            passedRef={this.phoneNumberRef}
                            defaultValue={this.state.phone}
                            icon={Phone}
                            autoComplete="current-phone"
                            placeholder="Phone Number"
                            type="tel"
                        />
                    </div>

                    We will send you a verification message so please make sure everything is entered correctly.
                </div>
            </div>
        );
    }
}

export default connect(({ registerDetails }) => ({ registerDetails }))(VerifyPhone);