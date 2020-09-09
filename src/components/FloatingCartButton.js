import React from "react";
import history from "../history";
import { connect } from "react-redux";
import { css, StyleSheet } from "aphrodite/no-important";

class FloatingCartButton extends React.Component {
    render() {
        var size = 0;
        var {cartItems} = this.props;

        for (var i = 0; i < cartItems.length; i++) {
            size += cartItems[i].amount;
        }

        return (
            <button
                className="floatingCartButton"
                onClick={() => {
                    history.push("/app/restaurants/cart");
                }}>
                <span className={css(styles.row)}>
                    <i className="material-icons-round">shopping_cart</i>
                    <span className={css(styles.col)}>{size === 0 ? "" : size}</span>
                </span>
            </button>
        );
    }
}

const styles = StyleSheet.create({
    col: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "3px"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default connect(({cartItems}) => ({cartItems}))(FloatingCartButton);