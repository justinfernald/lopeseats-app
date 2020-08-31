import React from 'react';
import Screen from '../../../components/Screen';
import { css, StyleSheet } from "aphrodite/no-important";
import Button from '../../../components/Button';
import { store, actions } from "../../../Redux";
import { connect } from 'react-redux';
import { fetchBalances } from "../../../Redux/Thunks";
import { formatPrice, sendTip, showErrors } from '../../../assets/scripts/Util';
import history from "../../../history";

class SendTip extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTip: 10,
            customVal: "5"
        };

        store.dispatch(fetchBalances(this.props.apiToken));
    }
    
    generateMoneyBtn(amount) {
        var { selectedTip } = this.state;
        return (
        <div 
            className={css(styles.moneyBtn, (amount === selectedTip ? styles.moneyBtnSelected : null))} 
            onClick={() => this.setState({selectedTip: amount})}>
            {amount !== -1 ? amount + "%" : "Custom"}
        </div>);
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

    onNextStep = async () => {
        var { selectedTip, customVal } = this.state;

        var tip = selectedTip === -1 ? parseInt(customVal) : (selectedTip / 100) * this.props.order.total;

        if (this.props.order.submitted === 1) {
            store.dispatch(actions.setTip(tip));
            history.push("/app/tracker/tipCheckout");
        } else {
            var result = await sendTip(tip, this.props.apiToken);
            if (!result.success) {
                showErrors([result.msg]);
            }
            store.dispatch(actions.setTipped(true));
            this.props.onNextStep();
        }
    }

    render() {
        var { selectedTip } = this.state;
        return (
            <Screen
                appBar={{
                    title: "Add a tip"
                }}
            >
                <div className={css(styles.content)}>
                    <div className={css(styles.balance)}>
                        Order total
                        <span style={{fontSize: "1.6em"}}>${formatPrice(this.props.order.total, false)}</span>
                    </div>

                    <div className={css(styles.topSection)}>
                        <div style={{color: "#7B7B7B", marginBottom: "5px"}}>Tip</div>
                        <div style={{color: "#3CA140", fontSize: "1.4em"}}>${selectedTip === -1 ? 
                        <input type="number" onChange={this.onInputChange} className={css(styles.input)} defaultValue={1}/>
                        :
                        formatPrice(((selectedTip / 100) * this.props.order.total), false)
                        }</div>
                    </div>
                    <div className={css(styles.inputSection)}>
                        <div className={css(styles.optionContainer)}>
                            {this.generateMoneyBtn(10)}
                            {this.generateMoneyBtn(15)}
                            {this.generateMoneyBtn(20)}
                        </div>

                        <div className="flexDisplayRow">
                            {this.generateMoneyBtn(-1)}
                        </div>
                    </div>

                    <div className={css(styles.btnContainer)}>
                        <Button onClick={this.onNextStep}>Add tip</Button>
                    </div>
                </div>
            </Screen>
        );
    }

}

export default connect(({ apiToken, balances }) => ({ apiToken, balances }))(SendTip);

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    btnContainer: {
        margin: "0px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "auto",
        width: "calc(100% - 20px)",
    },
    label: {
        textAlign: "center",
        marginBottom: "30px"
    },
    balance: {
        height: "auto",
        padding: "5px 0",
        fontSize: "1.2em",
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
        padding: "15px 0"
    },
    inputSection: {
        padding: "10px 10px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
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