import React from 'react';

import RegisterStep from "./RegisterStep";
import Input from "../../../components/Input";
import { css, StyleSheet } from "aphrodite/no-important";
import PDFViewer from '../../../components/PDFViewer';

import pdf from "../../../assets/terms.pdf";
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
                <div className="flexDisplay fillHeight">
                    <RegisterStep
                        step={{ part: 2, total: 4 }}
                        onNextStep={this.onNextStep}
                        onBackStep={this.props.history.goBack}
                    />
                    <div className="registerStepBanner">Agree to Terms</div>
                    <div className="registerFormContainer flex alignCenter">
                        Please read the terms below.
                        <div className={css(styles.terms)}>
                            <PDFViewer pdf={pdf} className={css(styles.pdf)}/>
                        </div>
                        <span>
                            <Checkbox color="secondary" inputRef={this.checkRef}/>
                            I agree to the terms listed above.
                        </span>
                    </div>
                </div>
            </ThemeProvider>
        );
    }

}

const styles = StyleSheet.create({
    terms: {
        overflow: "scroll",
        width: "90%",
        height: "70%",
        border: "1px solid #7d7d7d",
        margin: "20px 0"
    },
    pdf: {
        width: "100%"
    }
});