import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

export default class ClickThrough extends React.Component<{
    title: string;
    children: JSX.Element;
    disabled?: boolean;
    noRipple?: boolean;
}> {
    render() {
        return (
            <div className={css(styles.menuWrapper)}>
                <div className={css(styles.textContent)}>
                    <span style={{lineHeight: "1em"}}>{this.props.title}</span>
                    <span style={{color: "#888", fontSize: "1.2em"}} className="material-icons">
                        keyboard_arrow_down
                    </span>
                </div>
                <div className={css(styles.dropdown)}>
                    {this.props.children}
                </div>
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
    },
    menuWrapper: {

    },
    dropdown: {

    }
});
