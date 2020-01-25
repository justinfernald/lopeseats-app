import React from 'react';

export default class FloatingCartButton extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <button className="floatingCartButton" onClick={()=>{this.props.onClick()}}><i className="material-icons-round">shopping_cart</i></button>
        );
    }

}