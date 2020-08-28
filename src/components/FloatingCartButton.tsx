import React from "react";
import history from "../history";

export default class FloatingCartButton extends React.Component {
    render() {
        return (
            <button
                className="floatingCartButton"
                onClick={() => {
                    history.push("/app/restaurants/cart");
                }}>
                <i className="material-icons-round">shopping_cart</i>
            </button>
        );
    }
}
