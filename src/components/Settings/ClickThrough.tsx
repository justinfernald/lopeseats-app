import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
// import { IonRippleEffect } from "@ionic/react";

export default class ClickThrough extends React.Component<{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children?: JSX.Element;
    disabled?: boolean;
    noRipple?: boolean;
}> {
    render() {
        return (
            <div className={css(styles.textContent)}>
                <span style={{lineHeight: "1em"}}>{this.props.children}</span>
                <span style={{color: "#888", fontSize: "1.2em"}} className="material-icons">
                    keyboard_arrow_right
                </span>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    textContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: "1.4em",
        margin: "10px"
    }
});
