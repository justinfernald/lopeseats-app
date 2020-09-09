import React from 'react';
import GreyEye from '../assets/images/eye-grey.svg';
import PurpleEye from '../assets/images/eye-purple.svg';

export default class Input extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={"appInput" + ((this.props.className) ? " " + this.props.className : "")} style={{ display: this.props.hidden ? "none" : "flex" }}>
                {this.props.icon && <div className="iconHolder"><img src={this.props.icon} alt={this.props.placeholder} /></div>}
                {this.props.type === "tel" || this.props.type === "number" ?
                    <input maxLength="10" {...this.props.passedProps} onChange={this.props.onChange} ref={this.props.passedRef} type={this.props.type} placeholder={this.props.placeholder} onKeyPress={e => {
                        let key;
                        // Handle paste
                        if (e.type === 'paste') {
                            key = e.clipboardData.getData('text/plain');
                        } else {
                            key = e.keyCode || e.which;
                            key = String.fromCharCode(key);
                        }
                        var regex = /[0-9]|\./;
                        if (!regex.test(key)) {
                            e.returnValue = false;
                            if (e.preventDefault) e.preventDefault();
                        }
                    }}

                        onInput={
                            e => {
                                if (e.target.getAttribute("maxlength")) {
                                    let maxLength = e.target.getAttribute("maxlength") * 1;
                                    e.target.value = e.target.value.substring(0, maxLength);
                                }
                            }
                        }

                        defaultValue={this.props.defaultValue}
                    /> :
                    <input {...this.props.passedProps} onChange={this.props.onChange} ref={this.props.passedRef} type={this.props.type} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} />}
                {this.props.showHidden &&
                    <div className="iconHolder password" onClick={this.props.onShow}><img alt="Show Password" src={this.props.showHidden === "off" ? GreyEye : PurpleEye}></img></div>
                }
            </div>
        );
    }
}