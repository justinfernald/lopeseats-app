import React from 'react';

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return <div>
            {JSON.stringify(this.props.options)}
        </div>
    }
}