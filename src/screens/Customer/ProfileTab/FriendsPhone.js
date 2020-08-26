import React from 'react';
import { css, StyleSheet } from "aphrodite/no-important";
import Screen from '../../../components/Screen';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { showErrors, phoneNumberTaken } from '../../../assets/scripts/Util';
import { store, actions } from "../../../Redux";

export default class FriendsPhone extends React.Component {

    constructor(props) {
        super(props);

        this.phoneRef = React.createRef();
    }

    onNextStep = () => {
        var phone = this.phoneRef.current.value;
        console.log(phone);
        if (phone.length != 10) {
            showErrors(["Phone number not valid. Make sure you include the area code"]);
            return;
        }

        var isValid = phoneNumberTaken(phone);

        if (!isValid) {
            showErrors(["No user found with that phone number"]);
            return;
        }

        store.dispatch(actions.setDepositData({friendsPhone: phone}));
        this.props.history.push("/app/profile/depositCheckout");
    }

    render() {
        return (
            <Screen appBar={{
                title: "Friends Info",
                onBack: this.props.history.goBack
            }}>
                <div className={css(styles.container)}>
                    <div style={{marginBottom: "40px"}}>
                        Enter the phone number of the person you want to send to
                    </div>


                    <Input type="tel" placeholder="Phone Number" passedRef={this.phoneRef}></Input>

                    <div className={css(styles.btnContainer)}>
                        <Button onClick={this.onNextStep}>Continue</Button>
                    </div>
                </div>
            </Screen>
        );
    }

}

const styles = StyleSheet.create({
   container: {
       padding: "30px 10px 0 10px",
       textAlign: "center"
   },
   btnContainer: {
       position: "absolute",
       bottom: 0,
       height: "auto",
       width: "calc(100% - 20px)"
   }
});