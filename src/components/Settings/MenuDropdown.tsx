import React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { css, StyleSheet } from "aphrodite/no-important";
import { store, actions } from "../../Redux";

const mapState = (state: any) => ({
    openMenus: state.openMenus
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MenuDropProps = PropsFromRedux &{
    title: string;
    id: string;
    children: JSX.Element;
    height: string;
    disabled?: boolean;
    noRipple?: boolean;
}

class MenuDropdown extends React.Component<MenuDropProps> {

    dropdownRef:any;
    arrowRef:any;

    constructor(props:Readonly<MenuDropProps>) {
        super(props);

        this.dropdownRef = React.createRef();
        this.arrowRef = React.createRef();
    }

    isOpen() {
        return this.props.openMenus.includes(this.props.id);
    }

    componentDidUpdate() {
        if (this.isOpen()) {
            this.dropdownRef.current.style.height = this.props.height;
            this.arrowRef.current.style.transform = "rotate(180deg)";
        } else {
            this.dropdownRef.current.style.height = "0px";
            this.arrowRef.current.style.transform = null;
        }
    }

    toggleDropdown() {
        let open = !this.isOpen();
        if (open) {
            store.dispatch(actions.openMenu(this.props.id));
        } else {
            store.dispatch(actions.closeMenu(this.props.id));
        }
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

export default connector(MenuDropdown);

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
