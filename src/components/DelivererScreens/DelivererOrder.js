import React from "react";

export default class DeliveryOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };
    }

    render() {
        return (
            <div className="flexDisplay fillHeight">
                <div className="restaurantTop">
                    <div className="header">
                        <i
                            className="icon material-icons-round"
                            onClick={this.props.onBack}>
                            arrow_back_ios
                        </i>
                        <span className="screenTitle">Order Details</span>
                    </div>
                </div>
                <div className="cartList">
                    {this.state.items.map((value, index) => {
                        var options = JSON.parse(value.options);
                        var optionStrings = [];
                        var j = 0;
                        for (var i = 0; i < options.length; i++) {
                            for (var k in options[i]) {
                                optionStrings[j] = k + ":   " + options[i][k];
                                optionStrings[j + 1] = <br key={j * 1000} />;
                                j += 2;
                            }
                        }
                        return (
                            <div className="cartItem" key={index}>
                                <div className="imageHolder img-fill">
                                    <img alt="test" src={value.image} />
                                </div>
                                <div className="cartItemInfo">
                                    <div className="cartItemHeader">
                                        <span className="cartItemName">
                                            {value.name}
                                        </span>
                                        {/* <span className="cartItemPrice">
                                            $
                                            {formatPrice(
                                                value.price * value.amount
                                            )}
                                        </span> */}
                                    </div>
                                    <div className="cartItemDescription">
                                        x{value.amount}
                                        <br />
                                        {optionStrings}
                                        {value.comment}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
