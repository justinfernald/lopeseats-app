import React from 'react';

export default class FloatingCartButton extends React.Component {

    render() {
        return (
            <button className="floatingCartButton" onClick={()=>{this.props.history.push("/app/restaurants/cart")}}><i className="material-icons-round">shopping_cart</i></button>
        );
    }

}