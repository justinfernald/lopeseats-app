import React from 'react';

import RegisterStep from "./RegisterStep";

import { Checkbox } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { showErrors } from '../../../assets/scripts/Util';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#eb1c34",
        },
    },
});

export default class AgreeToTerms extends React.Component {

    constructor(props) {
        super(props);

        this.checkRef = React.createRef();
    }

    onNextStep = () => {
        if (this.checkRef.current.checked) {
            this.props.history.push("/register/verify");
        } else {
            showErrors(["Please agree to the terms"]);
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="flexDisplay fillHeight margin-fix-top padding-fix-bottom">
                    <RegisterStep
                        step={{ part: 2, total: 4 }}
                        onNextStep={this.onNextStep}
                        onBackStep={this.props.history.goBack}
                    />
                    <div className="registerStepBanner">Agree to Terms</div>
                    <div className="registerFormContainer flex alignCenter">
                        <span style={{ textAlign: "center", marginBottom: "40px" }}>
                            Please read and agree to our terms and conditions: <a style={{ color: "blue" }} href="http://lopeseat.com/files/terms.pdf">Terms and Conditions</a>
                        </span>
                        <span>
                            <Checkbox color="secondary" inputRef={this.checkRef} />
                            I agree to the terms listed above.
                        </span>
                    </div>
                </div>
            </ThemeProvider>
        );
    }

}