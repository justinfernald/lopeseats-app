import React from 'react';
import { connect } from 'react-redux';
import RegisterStep from '../RegisterProcess/RegisterStep';
import ConfirmPhone from '../../../components/Settings/ConfirmPhone';
import { checkRecoveryCode, showErrors } from '../../../assets/scripts/Util';
import { store, actions } from '../../../Redux';

class RecoveryCode extends React.Component {

    onNextStep = async (value) => {
        var { recovPhone } = this.props;
        var result = await checkRecoveryCode(recovPhone, value);
        if (result.success) {
            store.dispatch(actions.setRecovCode(value));
            this.props.history.push("/recovPwd");
        } else {
            showErrors([result.msg]);
        }
    }

    render() {
        var { recovPhone } = this.props;

        return (
            <div className="flexDisplay fillHeight margin-fix-top padding-fix-bottom">
                <RegisterStep
                    step={{ part: 2, total: 3 }}
                    noDone
                    onBackStep={this.props.history.goBack}
                />
                <div className="registerStepBanner">Enter Code</div>
                <div className="registerFormContainer flex">
                    <p>
                        We've sent a code to your phone number{" "}
                        {recovPhone}. Please enter it below.
                    </p>
                    <ConfirmPhone phoneNumber={recovPhone} onNextStep={this.onNextStep} verify={checkRecoveryCode} />
                </div>
            </div>
        )
    }

}

export default connect(({recovPhone}) => ({recovPhone}))(RecoveryCode);