import React from 'react';
import RegisterStep from './RegisterStep';
import Input from '../Input';
import Phone from '../../assets/images/phone-icon.png';
import { phoneNumberTaken, showErrors } from '../../assets/scripts/Util';

export default class VerifyPhone extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {};
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
            this.props.onNextStep(phoneNumber);
        } else {
            showErrors(errors);
        }
    }

    onBackStep = () => {
        this.props.onBackStep();
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep step={{part: 2, total: 3}} onNextStep={this.onNextStep} onBackStep={this.onBackStep}/>
                <div className="registerStepBanner">Verify Phone</div>
                <div className="registerFormContainer flex alignCenter">
                    <div className="labeledInput">
                        <div className="label">Confirm Phone Number</div>
                        <Input passedRef={this.phoneNumberRef} passedProps={{defaultValue: this.props.phone}} icon={Phone} autoComplete="current-phone" placeholder="Phone Number" type="tel"/>
                    </div>
                </div>
            </div>
        );
    }
}