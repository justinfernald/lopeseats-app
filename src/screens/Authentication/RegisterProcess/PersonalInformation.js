import React from "react";
import RegisterStep from "./RegisterStep";
import ImageUploader from "./ImageUploader";
import Input from "../../../components/Input";
import {
    showErrors,
} from "../../../assets/scripts/Util";

import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { css, StyleSheet } from "aphrodite/no-important"

class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: props.registerDetails.profileImage
        };
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
    }

    componentDidMount() { }

    componentWillUnmount() { }

    onNextStep = () => {
        let errors = [];
        let profileImage = this.state.profileImage;
        let firstName = this.firstNameRef.current.value;
        let lastName = this.lastNameRef.current.value;
        let email = this.emailRef.current.value;
        let checkEmail = (mail) => {
            // eslint-disable-next-line
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
        };

        if (firstName.length === 0) {
            errors.push("No first name added");
        }
        if (lastName.length === 0) {
            errors.push("No last name added");
        }
        if (!checkEmail(email)) {
            errors.push("Email invalid");
        }

        if (errors.length === 0) {
            store.dispatch(actions.setRegisterDetails({
                firstName,
                lastName,
                email,
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
        var { firstName, lastName, email } = this.props.registerDetails;
        return (
            <div className="flexDisplay fillHeight margin-fix-top padding-fix-bottom">
                <RegisterStep
                    step={{ part: 1, total: 4 }}
                    onNextStep={this.onNextStep}
                    onBackStep={this.props.history.goBack}
                />
                <div className="registerStepBanner">Personal Information</div>
                <div className="registerFormContainer flex alignCenter" style={{ justifyContent: "space-evenly" }}>
                    <div className="labeledInput">
                        <div className="label">Profile Picture (Optional)</div>
                        <div className="uploaderContainer" style={{marginLeft: "calc(50% - 70px)"}}>
                            <ImageUploader
                                image={this.state.profileImage}
                                onUpload={this.onUpload}
                            />
                        </div>
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
                            placeholder="JThornburg@my.gcu.edu"
                        />
                    </div>
                    {/* <div className="labeledInput">
                        <div className="label" style={{ float: "left" }}>Student Number</div><div className={css(styles.barcodeDisable)} onClick={() => this.setState((state) => ({ showStudentNumberInput: !state.showStudentNumberInput }))}>{this.state.showStudentNumberInput ? "Scanner" : "Self Input"}</div>
                        <Input
                            passedRef={this.studentNumberRef}
                            placeholder="2055****"
                            type="number"
                            passedProps={{ maxLength: 8 }}
                            defaultValue={studentNumber}
                            hidden={!this.state.showStudentNumberInput}
                        />
                        {!this.state.showStudentNumberInput ?
                            <>
                                <div style={{ float: "left" }}>Scan your Student ID Card</div>
                                <div className="scannerWrapper">
                                    <BarcodeScannerComponent
                                        width={400}
                                        height={400}
                                        onUpdate={(err, result) => {
                                            // if (err) {
                                            //     console.error(err);
                                            //     return;
                                            // }
                                            if (result) {
                                                console.log(result.text)
                                                this.studentNumberRef.current.value = result.text;
                                                this.setState({ showStudentNumberInput: true });
                                            }
                                            // else console.log("nothing");
                                        }}
                                    />
                                </div>
                            </>
                            : null}
                    </div> */}

                </div>
            </div >
        );
    }
}

// const styles = StyleSheet.create({
//     barcodeDisable: {
//         float: "right",
//         color: `var(--secondary)`,
//         textDecoration: "underline",
//         fontWeight: 500
//     }
// });

export default connect(({ registerDetails }) => ({ registerDetails }))(PersonalInformation);