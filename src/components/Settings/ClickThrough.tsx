import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonRippleEffect } from "@ionic/react";

export default class ClickThrough extends React.Component<{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    title: string;
    disabled?: boolean;
    noRipple?: boolean;
}> {
    render() {
        return (
            <div className={css(styles.textContent)}>
                <span style={{lineHeight: "1em"}}>{this.props.title}</span>
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
        fontSize: "1.5em",
        fontWeight: 400,
        margin: "10px"
    }
});
