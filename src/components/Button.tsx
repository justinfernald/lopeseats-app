import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonRippleEffect } from "@ionic/react";

export default class Button extends React.Component<{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: string;
    secondary?: boolean;
    disabled?: boolean;
    style?: { [key: string]: any };
    margin?: number;
    noRipple?: boolean;
    leftText?: string;
    rightText?: string;
}> {
    render() {
        return (
            <div
                style={{ margin: this.props.margin }}
                className={
                    "ion-activatable " +
                    css(
                        styles.buttonWrapper,
                        this.props.secondary
                            ? styles.secondary
                            : styles.primary,
                        this.props.disabled ? styles.disabled : null,
                        this.props.style
                    )
                }
                onClick={this.props.disabled ? () => {} : this.props.onClick}>

                <span>{this.props.leftText||""}</span>
                <span>{this.props.children}</span>
                <span>{this.props.rightText}</span>

                {this.props.noRipple ? null : (
                    <IonRippleEffect></IonRippleEffect>
                )}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        position: "relative",
        textAlign: "center",
        borderRadius: 10,
        fontSize: "1.2em",
        padding: "0.735em 0",
        margin: "0.521em 0",
        width: "auto",
        fontWeight: 700,
        letterSpacing: "0.11em",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "30% 40% 30%"
    },
    primary: {
        backgroundColor: "#eb1c34",
        color: "#fff",
    },
    secondary: {
        backgroundColor: "white",
        color: "#f66",
    },
    disabled: {
        opacity: 0.5,
    },
});
