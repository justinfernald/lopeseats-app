import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonRippleEffect } from "@ionic/react";

export default class FloatingCartButton extends React.Component<{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: string;
    secondary?: boolean;
    disabled?: boolean;
    style?: { [key: string]: any };
    margin?: number;
    noRipple?: boolean;
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
                onClick={this.props.onClick}>
                {this.props.children}
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
        borderRadius: 50,
        fontSize: "1.2em",
        padding: "0.735em 0",
        margin: "0.521em 0",
        width: "auto",
        fontWeight: 700,
        letterSpacing: "0.11em",
        overflow: "hidden",
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
