import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

type MenuDropProps = {
    title: string;
    children: JSX.Element;
    height: string;
    disabled?: boolean;
    noRipple?: boolean;
}

type MenuDropState = {
    open: boolean;
}

export default class MenuDropdown extends React.Component<MenuDropProps, MenuDropState> {

    dropdownRef:any;
    arrowRef:any;

    constructor(props:Readonly<MenuDropProps>) {
        super(props);

        this.state = {
            open: false
        };

        this.dropdownRef = React.createRef();
        this.arrowRef = React.createRef();
    }

    toggleDropdown() {
        let open = !this.state.open;
        if (open) {
            this.dropdownRef.current.style.height = this.props.height;
            this.arrowRef.current.style.transform = "rotate(180deg)";
        } else {
            this.dropdownRef.current.style.height = "0px";
            this.arrowRef.current.style.transform = null;
        }
        this.setState({open});
    }

    render() {
        return (
            <div className={css(styles.menuWrapper)}>
                <div className={css(styles.textContent)} onClick={() => {this.toggleDropdown()}}>
                    <span style={{lineHeight: "1em"}}>{this.props.title}</span>
                    <span style={{color: "#888", fontSize: "1.2em", transition: "transform 0.25s"}} className="material-icons" ref={this.arrowRef}>
                        keyboard_arrow_down
                    </span>
                </div>
                <div className={css(styles.dropdown)} ref={this.dropdownRef} style={{height: "0"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    spacer: {
        width: "calc(100% - 20px)",
        height: "1px",
        marginLeft: "10px",
        backgroundColor: "#ccc"
    },
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
        overflow: "hidden",
        transition: "height 0.25s",
        boxShadow: "rgb(210 210 210) 0px 0px 4px 2px inset"
    }
});
