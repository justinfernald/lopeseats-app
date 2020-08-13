import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import { IonRippleEffect } from "@ionic/react";

export default class FloatingCartButton extends React.Component<{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: string;
    style: { [key: string]: any };
}> {
    render() {
        return (
            <div
                className={
                    "ion-activatable " +
                    css(styles.buttonWrapper, this.props.style)
                }
                onClick={this.props.onClick}>
                {this.props.children}
                <IonRippleEffect></IonRippleEffect>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        position: "relative",
    },
});
