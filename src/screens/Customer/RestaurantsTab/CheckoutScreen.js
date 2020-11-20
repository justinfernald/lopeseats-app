import React, { Fragment } from "react";
import DropIn from "braintree-web-drop-in-react";
import {
    sendPayment,
    getCartPrices,
    formatPrice,
    showErrors,
    requestBraintreeToken
} from "../../../assets/scripts/Util";
import LopesEatLogo from "../../../assets/images/icon-384x384.png";
import Screen from "../../../components/Screen";
import { connect } from "react-redux";
import { store, actions } from "../../../Redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { fetchBalances } from "../../../Redux/Thunks";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Checkout from "../../../components/Checkout";

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

class CheckoutScreen extends React.Component {
    instance;

    constructor(props) {
        super(props);

        var roomNumber = false;

        for (var building in this.props.buildings) {
            if (building.name.toLowerCase() == this.props.address.toLowerCase()) {
                roomNumber = building.room_number==1;
            }
        }

        this.state = {
            fee: 0,
            useBalance: false,
            useEarnings: false,
            needFoodPayment: false,
            total: 0,
            tax: 0,
            subtotal: 0,
            roomNumber
        };

        this.balanceRef = React.createRef();
        this.earningsRef = React.createRef();
    }

    async componentDidMount() {
        store.dispatch(fetchBalances(this.props.apiToken));

        var prices = await getCartPrices(this.props.apiToken);
        this.setState({
            fee: prices.delivery_fee,
            needFoodPayment: prices.need_payment,
            total: prices.total,
            tax: prices.tax,
            subtotal: prices.subtotal,
        });
    }

    pay = async (payment, data) => {
        var result = null;

        console.log("Attempting Order..")
        console.log(JSON.stringify(payment));
        console.log(JSON.stringify(data));

        if (data.neededPayment) {
            var type = payment.type;
            result = await sendPayment(payment.nonce, this.props.address, this.props.apiToken, data.useBalance ? 1 : (data.useEarnings ? 2 : null), type, (type === "CreditCard") ? payment.card.network : null);
        } else {
            result = await sendPayment(null, this.props.address, this.props.apiToken, data.useBalance ? 1 : 2);
        }
        if (result && result.success) {
            this.props.history.push("/app/tracker");
            store.dispatch(actions.setHistorySize(0));
        } else {
            showErrors([result.msg]);
        }
    }

    checkboxChange = () => {
        this.setState({
            useBalance: this.balanceRef.current.checked,
            useEarnings: this.earningsRef.current.checked,
        });
    }

    render() {
        var { total, needFoodPayment, fee } = this.state;
        var cost = needFoodPayment ? total : fee;

        return <Checkout canUseBalances total={cost} submitPayment={this.pay}/>;
    }
}

export default connect(({ apiToken, building, balances, buildings }) => ({ apiToken, building, balances, buildings }))(
    CheckoutScreen
);

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "10px",
        flex: "1 1 auto"
    },
    dropinContainer: {
        minHeight: "50%",
        borderBottom: "1px solid grey"
    },
    useBalance: {
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 10px",
        margin: "10px 0"
    },
    vertAlign: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    rowFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    disabled: {
        opacity: 0.38
    },
    footer: {
        backgroundColor: "#fff",
        width: "100%",
        padding: "15px 20px",
        borderRadius: "20px 20px 0 0",
        flex: "0 1 auto",
        boxShadow: "0px -2px 13px 0px #bdbdbd9e"

    }
});