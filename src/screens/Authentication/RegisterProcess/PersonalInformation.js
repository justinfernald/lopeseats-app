import React from "react";
import RegisterStep from "./RegisterStep";
import ImageUploader from "./ImageUploader";
import Input from "../../../components/Input";
import {
    showErrors,
} from "../../../assets/scripts/Util";

import { connect } from "react-redux";
import { store, actions } from "../../../Redux";

class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: props.registerDetails.profileImage,
        };
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.studentNumberRef = React.createRef();
    }

    componentDidMount() { }

    componentWillUnmount() { }

    onNextStep = () => {
        let errors = [];
        let profileImage = this.state.profileImage;
        let firstName = this.firstNameRef.current.value;
        let lastName = this.lastNameRef.current.value;
        let email = this.emailRef.current.value;
        let studentNumber = this.studentNumberRef.current.value;
        let checkEmail = (mail) => {
            // eslint-disable-next-line
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
        };

        if (!profileImage) {
            errors.push("No profile picture added");
        }
        if (firstName.length === 0) {
            errors.push("No first name added");
        }
        if (lastName.length === 0) {
            errors.push("No last name added");
        }
        if (!checkEmail(email)) {
            errors.push("Email invalid");
        }
        if (studentNumber.length !== 8) {
            errors.push("Student number invalid");
        }

        if (errors.length === 0) {
            store.dispatch(actions.setRegisterDetails({
                firstName,
                lastName,
                email,
                studentNumber,
                profileImage,
                phone: this.props.registerDetails.phone,
                password: this.props.registerDetails.password,
            }));
            this.props.history.push("/register/agree");
        } else {
            showErrors(errors);
        }
    };

    onUpload = (data) => {
        this.setState({ profileImage: data });
    };

    render() {
        var { firstName, lastName, studentNumber, email } = this.props.registerDetails;
        return (
            <div className="flexDisplay fillHeight margin-fix-top padding-fix-bottom">
                <RegisterStep
                    step={{ part: 1, total: 4 }}
                    onNextStep={this.onNextStep}
                    onBackStep={this.props.history.goBack}
                />
                <div className="registerStepBanner">Personal Information</div>
                <div className="registerFormContainer flex alignCenter" style={{ justifyContent: "space-evenly" }}>
                    <div className="uploaderContainer">
                        <ImageUploader
                            image={this.state.profileImage}
                            onUpload={this.onUpload}
                        />
                    </div>
                    <div className="labeledInput">
                        <div className="label">First Name</div>
                        <Input
                            passedRef={this.firstNameRef}
                            defaultValue={firstName}
                            placeholder="Joshua"
                        />
                    </div>
                    <div className="labeledInput">
                        <div className="label">Last Name</div>
                        <Input
                            passedRef={this.lastNameRef}
                            defaultValue={lastName}
                            placeholder="Thornburg"
                        />
                    </div>
                    <div className="labeledInput">
                        <div className="label">Email</div>
                        <Input
                            passedRef={this.emailRef}
                            defaultValue={email}
                            placeholder="JThornburg1@my.gcu.edu"
                        />
                    </div>
                    <div className="labeledInput">
                        <div className="label">Student Number</div>
                        <Input
                            passedRef={this.studentNumberRef}
                            placeholder="123456789"
                            type="number"
                            passedProps={{ maxLength: 8 }}
                            defaultValue={studentNumber}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ registerDetails }) => ({ registerDetails }))(PersonalInformation);