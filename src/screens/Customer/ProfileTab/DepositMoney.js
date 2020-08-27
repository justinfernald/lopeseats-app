import React from 'react';
import Screen from '../../../components/Screen';
import { css, StyleSheet } from "aphrodite/no-important";
import Button from '../../../components/Button';
import { store, actions } from "../../../Redux";

export default class DepositMoney extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMoney: 5,
            selectedOption: 0,
            customVal: "1"
        };
    }
    
    generateMoneyBtn(amount) {
        var { selectedMoney } = this.state;
        return <div className={css(styles.moneyBtn, (amount === selectedMoney ? styles.moneyBtnSelected : null))} onClick={() => this.setState({selectedMoney: amount})}>{amount !== -1 ? "$" + amount : "Custom"}</div>;
    }

    generateBtn(title, id) {
        var { selectedOption } = this.state;
        return <div className={css(styles.optionBtn, (id === selectedOption ? styles.optionBtnSelected : null))} onClick={() => this.setState({selectedOption: id})}>{title}</div>;
    }

    onInputChange = (e) => {
        if (/^\+?(0?|[1-9]\d{0,2})$/.test(e.target.value)) {
            this.setState({customVal: e.target.value});
            console.log(e.target.value);
        } else {
            e.target.value = this.state.customVal;
        }
    }

    onNextStep = () => {
        var { selectedOption, selectedMoney, customVal } = this.state;
        store.dispatch(actions.setDepositData({
            amount: selectedMoney === -1 ? parseInt(customVal) : selectedMoney,
            toFriend: selectedOption === 1
        }));

        if (selectedOption === 1) {
            this.props.history.push("/app/profile/friendsInfo");
        } else {
            this.props.history.push("/app/profile/depositCheckout");
        }
    }

    render() {
        var { selectedMoney } = this.state;
        return (
            <Screen
                appBar={{
                    title: "Deposit",
                    onBack: this.props.history.goBack
                }}
            >
                <div className={css(styles.balance)}>
                    Balance: $15.23
                </div>

                <div className={css(styles.topSection)}>
                    <div style={{color: "#7B7B7B", marginBottom: "5px"}}>Add</div>
                    <div style={{color: "#3CA140", fontSize: "1.4em"}}>${selectedMoney === -1 ? 
                    <input type="number" onChange={this.onInputChange} className={css(styles.input)} defaultValue={1}/>
                    :
                    selectedMoney
                    }</div>
                </div>
                <div className={css(styles.inputSection)}>
                    <div className={css(styles.optionContainer)}>
                        {this.generateMoneyBtn(5)}
                        {this.generateMoneyBtn(10)}
                        {this.generateMoneyBtn(25)}
                    </div>

                    <div className="flexDisplayRow">
                        {this.generateMoneyBtn(-1)}
                    </div>
                </div>

                <div className={css(styles.inputSection)}>
                    <span className={css(styles.label)}>Send money to</span>

                    <div className={css(styles.optionContainer)}>
                        {this.generateBtn("My account", 0)}
                        {this.generateBtn("A friend", 1)}
                    </div>
                </div>

                <div className={css(styles.btnContainer)}>
                    <Button onClick={this.onNextStep}>Continue</Button>
                </div>
            </Screen>
        );
    }

}

const styles = StyleSheet.create({
    btnContainer: {
        margin: "0px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "auto",
        position: "absolute",
        width: "calc(100% - 20px)",
        bottom: 0
    },
    label: {
        textAlign: "center",
        marginBottom: "30px"
    },
    balance: {
        height: "50px",
        fontSize: "1.1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        borderBottom: "solid 1px #707070"
    },
    topSection: {    
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontSize: "3em",
        borderBottom: "solid 1px #707070",
        padding: "15px 0"
    },
    inputSection: {
        padding: "30px 10px 0 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        borderBottom: "solid 1px #707070",
    },
    moneyBtn: {
        border: "solid 1px #3CA140",
        minWidth: "18%",
        padding: "3px 10px",
        fontSize: "1.3em",
        textAlign: "center",
        borderRadius: "7px",
        color: "#3CA140",
        backgroundColor: "#fff",
        marginBottom: "30px"
    },
    moneyBtnSelected: {
        backgroundColor: "#3CA140",
        color: "white"
    },
    optionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    input: {
        width: "2em",
        backgroundColor: "#eaeaea",
        height: "1.2em",
        textAlign: "center",
        borderRadius: "7px"
    },
    optionBtn: {
        border: "solid 1px #3CA140",
        minWidth: "18%",
        padding: "3px 10px",
        fontSize: "1.3em",
        textAlign: "center",
        borderRadius: "7px",
        color: "#3CA140",
        backgroundColor: "#fff",
        marginBottom: "30px"
    },
    optionBtnSelected: {
        backgroundColor: "#3CA140",
        color: "white"
    },
});