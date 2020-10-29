import React from 'react';

type propsType = {children:any};

export default class Slide extends React.Component<propsType, any> {

    render() {
        return (
            <div style={{
                width: "100%",
                height: "100%"
            }}>
                {this.props.children}
            </div>
        );
    }

}