import React from 'react';
import Screen from '../../../components/Screen';

export default class DepositMoney extends React.Component {

    render() {
        return (
            <Screen
                appBar={{
                    title: "Deposit",
                    onBack: this.props.history.goBack
                }}
            >
                
            </Screen>
        );
    }

}