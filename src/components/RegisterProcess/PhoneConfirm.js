import React from 'react';
import RegisterStep from './RegisterStep';
import {verifyCode, showErrors} from '../../assets/scripts/Util';

export default class PhoneConfirm extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            code: "",
        };

        this.codeRef = React.createRef();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onNextStep = async (bypass = false) => {
        if (bypass || await verifyCode(this.props.phone, this.codeRef.value)) {
            this.props.onNextStep();
        } else {
            showErrors(["Invalid Code"]);
        }
    }

    onChange = async e => {
        e.target.value=e.target.value.replace(/(?![0-9])./gmi,'');
        e.target.value = e.target.value.slice(0,6);
        if (e.target.value !== this.state.code) {
            this.setState({code: e.target.value});
            if (e.target.value.length === 6 && await verifyCode(this.props.phone, e.target.value)) {
                this.onNextStep(true);
            }
        }
    }

    render() {
        let elements = [...[...this.state.code], ...Array(6-this.state.code.length)];
        return (
            <div className="flexDisplay fillHeight">
                <RegisterStep step={{part: 3, total: 3}} noBack onNextStep={this.onNextStep}/>
                <div className="registerStepBanner">Verify Phone</div>
                <div className="registerFormContainer flex">
                    <p>We've send a code to your phone number {this.props.phone}</p>
                    <p>Enter in the code and we can get started!</p>
                    <div className="flexDisplay alignCenter">
                        <div className="code-input">
                            {elements.map((value, index) => {
                                return <div className={"code-input-element" + (value ? " filled" : "")} key={index}>{value}</div>
                            })}
                            <input ref={this.codeRef} className="hidden-input" onInput={this.onChange} type="number" maxLength="6" size="1" pattern="[0-9]{6}" autoComplete="one-time-code" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}