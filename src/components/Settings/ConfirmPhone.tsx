import React from 'react';
import {
    verifyCode,
    showErrors,
} from "../../assets/scripts/Util";

type propType = {
    phoneNumber: string,
    onNextStep: any,
    verify: Function
};

type stateType = {
    code: string,
    phone: string
}

export default class ConfirmPhone extends React.Component<propType, stateType> {

    codeRef:any;
    verify:Function;

    constructor(props: propType) {
        super(props);
        this.state = {
            code: "",
            phone: this.props.phoneNumber,
        };

        this.codeRef = React.createRef();

        this.verify = this.props.verify || verifyCode;
    }

    onChange = async (e:any) => {
        e.target.value = e.target.value.replace(/(?![0-9])./gim, "");
        e.target.value = e.target.value.slice(0, 6);
        if (e.target.value !== this.state.code) {
            const code = e.target.value;
            this.setState({ code });
            if (code.length === 6) {        
                if (await this.verify(this.state.phone, code)) {
                    this.props.onNextStep(code);
                } else {
                    showErrors(["Invalid Code"]);
                }
            }
        }
    };

    render() {
        let elements = [
            ...Array.from(this.state.code),
            ...Array(6 - this.state.code.length),
        ];
        return (
            <div className="flexDisplay alignCenter">
                <div className="code-input">
                    {elements.map((value, index) => {
                        return (
                            <div
                                className={
                                    "code-input-element" +
                                    (value ? " filled" : "")
                                }
                                key={index}>
                                {value}
                            </div>
                        );
                    })}
                    <input
                        ref={this.codeRef}
                        className="hidden-input"
                        onInput={this.onChange}
                        type="number"
                        maxLength={6}
                        size={1}
                        pattern="[0-9]{6}"
                        autoComplete="one-time-code"
                        spellCheck="false"
                        autoCorrect="off"
                        autoCapitalize="off"
                    />
                </div>
            </div>
        );
    }

}