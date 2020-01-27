import React from 'react';
import {formatPrice} from '../assets/scripts/Util';

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.option.name,
            choice: this.props.option.default,
            choices: this.props.option.choices
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onSelection() {

    }

    render() {
        // console.log(this.state.choices)
        return <div className="selector">
            <div className="selectorChoice">
                <div className="name">{this.state.choice}</div>
            </div>
            <div className="selectorOptions">
                {makeMap(this.state.choices).map((x, i) => {
                    console.log(x);
                    return <div key={i} className="selectorOption">
                        <div className="name">{i}</div>
                        <div className="cost">${formatPrice(x.cost)}</div>
                    </div>
                })}
            </div>
        </div>
    }
}

function makeMap(x) {
    return new MapObject(x);
}

class MapObject {
    constructor(x) {
        for (let i in x) {
            this[i] = x[i]
        }
    }

    map(fn) {
        let output = [];
        for (let i in this) {
            if (i === "map") continue;
            output.push(fn(this[i], i));
        }
        return output;
    }
}