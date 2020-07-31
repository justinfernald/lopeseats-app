import React from 'react';
import RegisterStep from './RegisterStep';
import Input from '../../components/Input';
import Phone from '../../assets/images/phone-icon.png';
import { phoneNumberTaken, showErrors, getScreenState, setScreenState, registerAccount } from '../../assets/scripts/Util';

export default class VerifyPhone extends React.Component {

    
    constructor(props) {
        super(props);
        var screenState = getScreenState();
        this.state = {
            phone: screenState.registerData.phone
        };
        this.phoneNumberRef = React.createRef();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onNextStep = async () => {
        let errors = [];
        let phoneNumber = this.phoneNumberRef.current.value;

        console.log(this.phoneNumberRef.current);
        console.log(this.phoneNumberRef.current.value);


        let isPhoneNumber = input => {
            let phoneRegex = /^\d{10}$/;
            return input.match(phoneRegex);
        };
        

        if (!isPhoneNumber(phoneNumber)) {
            errors.push("Invalid Phone Number");
        }

        if (errors.length === 0 && await phoneNumberTaken(phoneNumber)) {
            errors.push("Phone number is taken. Try logging in.");
        }

        if (errors.length === 0) {
            let screenState = getScreenState();
            setScreenState({
                registerData: {
                    phone: phoneNumber,
                    firstName: screenState.registerData.firstName,
                    lastName: screenState.registerData.lastName,
                    email: screenState.registerData.email,
                    studentNumber: screenState.registerData
                        .studentNumber,
                    profileImage: screenState.registerData
                        .profileImage,
                    password: screenState.registerData.password,
                },
            });
            this.props.history.push("/register/confirm");
            registerAccount(
                phoneNumber,
                screenState.registerData.firstName,
                screenState.registerData.lastName,
                screenState.registerData.email,
                screenState.registerData.studentNumber,
                screenState.registerData.password,
                screenState.registerData.profileImage
            );
        } else {
            showErrors(errors);
        }
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep step={{part: 2, total: 3}} onNextStep={this.onNextStep} onBackStep={this.props.history.goBack}/>
                <div className="registerStepBanner">Verify Phone</div>
                <div className="registerFormContainer flex alignCenter">
                    <div className="labeledInput">
                        <div className="label">Confirm Phone Number</div>
                        <Input passedRef={this.phoneNumberRef} passedProps={{defaultValue: this.state.phone}} icon={Phone} autoComplete="current-phone" placeholder="Phone Number" type="tel"/>
                    </div>
                </div>
            </div>
        );
    }
}