import React from "react";
import history from "../history";
import { connect } from "react-redux";
import { getCart } from "../assets/scripts/Util";
import { css, StyleSheet } from "aphrodite/no-important";

class FloatingCartButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            itemCount: null,
        };

        this.fetchData();
    }

    async fetchData() {
        var items = await getCart(this.props.apiToken);
        if (items == null) items = [];

        this.setState({
            itemCount: items.length,
        });
    }

    render() {
        if (!this.state.itemCount) return null;
        return (
            <button
                className="floatingCartButton"
                onClick={() => {
                    history.push("/app/restaurants/cart");
                }}>
                <span className={css(styles.cartCount)}>
                    {this.state.itemCount}
                </span>
                <i className={"material-icons-round " + css(styles.icon)}>
                    shopping_cart
                </i>
            </button>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        transform: "translateY(8px)",
    },
    cartCount: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, calc(-50% - 10px))",
        fontWeight: 500,
    },
});

export default connect(({ apiToken }: any) => ({ apiToken }))(
    FloatingCartButton
);
