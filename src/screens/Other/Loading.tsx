import React from "react";
import LopesEatLogo from "../../assets/images/icon-384x384.png";

interface PropType {
    message?: string;
}

export default class Screen extends React.Component<PropType> {
    constructor(props: PropType) {
        super(props);
    }

    render() {
        return (
            <div className="loadingWrapper">
                <img className="lopeImage" src={LopesEatLogo} alt="Logo" />
                <div className="loadingText">
                    {this.props.message
                        ? this.props.message
                        : "One moment please. Loading."}
                </div>
            </div>
        );
    }
}
