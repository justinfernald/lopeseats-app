import React from 'react';
import {formatPrice} from '../assets/scripts/Util';
import '../assets/styles/Selector.css';

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.option.name,
            choice: this.props.option.default,
            choices: this.props.option.choices
        };

        this.optionsRef = React.createRef();

        this.props.populate(this.props.option.default);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onSelection = i => {
        this.setState({
            choice: i
        })
        if (this.props.onSelection)
            this.props.onSelection(i);
    }

    render() {
        // console.log(this.state.choices)
        // return <div className="selector" ref={this.optionsRef}>
        //     <div className="choiceName">
        //         {this.state.name}
        //     </div>
        //     <div className="selectorChoice" onClick={this.toggleDropdown}>
        //         <div className="information">
        //             <div className="name">{this.state.choice}</div>
        //             {this.state.choices[this.state.choice].cost !== 0 && <div className="cost">${formatPrice(this.state.choices[this.state.choice].cost)}</div>}
        //         </div>
        //         <span className="expandButton"><i className="material-icons">
        //         keyboard_arrow_down
        //         </i></span>
        //     </div>
        //     <div className="selectorOptions">
        //         {makeMap(this.state.choices).filter((_x, i) => i !== this.state.choice).map((x, i) => {
        //             // console.log(x);
        //             return <div key={i} className="selectorOption" onClick={() => this.onSelection(i)}>
        //                 <div className="name">{i}</div>
        //                 {x.cost !== 0 && <div className="cost">${formatPrice(x.cost)}</div>}
        //             </div>
        //         })}
        //     </div>
        // </div>

        return <div> 
            <div className="itemOptionTitle">{this.state.name}</div>
            <ul className="itemOptionList">
                {makeMap(this.state.choices).map((x, i) => {
                    return <li className={this.state.choice == i ? "selected" : ""} key={i} onClick={() => this.onSelection(i)}>
                        {i}
                        {/*This needs fixing*/}
                        {x.cost !== 0 && " (+$" + formatPrice(x.cost) + ")"}
                        {this.state.choice == i &&
                        (<span className="check material-icons-round">
                            check
                        </span>)}
                    </li>
                })}
            </ul>
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

    filter(fn) {
        let output = {};
        for (let i in this) {
            if (fn(this[i], i)) output[i] = this[i];
        }
        return new MapObject(output);
    }
}