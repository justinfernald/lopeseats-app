import React from 'react';

type propsType = {children:any};

export default class Slide extends React.Component<propsType, any> {

    render() {
        return (
            <div style={{
                width: "100vw",
                height: "100%",
                minWidth: "100vw"
            }}>
                {this.props.children}
            </div>
        );
    }

}