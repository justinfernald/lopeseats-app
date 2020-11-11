import React, { Fragment } from "react";
import { IonPage } from "@ionic/react";
import { StyleSheet, css } from "aphrodite/no-important";
import "../App.css";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
// import { colors } from "@material-ui/core";

function BackButtonUnconnected(props: { icon?: boolean, historySize: number }) {

    let history = useHistory();

    function goBack() {
        if (props.historySize > 0) {
            history.goBack();
        }
    }

    return (
        <i
            className={"material-icons-round" + (props.icon ? " icon" : "")}
            onClick={goBack}>
            arrow_back_ios
        </i>);
}

const mapStateToProps = (state: any) => ({
    historySize: state.historySize
});

let BackButton = connect(mapStateToProps)(BackButtonUnconnected);

interface PropType {
    appBar?: {
        custom?: JSX.Element;
        splash?: string;
        title: string | JSX.Element;
        backBtn?: boolean;
        icon?: JSX.Element;
        onIconClick?: (
            event?: React.MouseEvent<HTMLElement, MouseEvent>
        ) => void;
    };
    children?: JSX.Element;
    id?: string;
    dark?: boolean;
}

export default class Screen extends React.Component<PropType> {
    splashRef: React.RefObject<any>;
    constructor(props: PropType) {
        super(props);
        this.splashRef = React.createRef();
    }

    goBack = () => {
        console.log("Custom back is working");
    }

    onContentScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        // const sat: number = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sat"));
        // const target = e.currentTarget; //using currentTarget instead of target because of event bubbling
        // let scrollLevel = target.scrollTop; //Math.floor(target.scrollTop);
        // let bannerHeight = (175 + sat) - scrollLevel;
        // bannerHeight = bannerHeight > (54 + sat) ? bannerHeight : (54 + sat);
        // this.splashRef.current.style.height = bannerHeight + "px";
        // scrollLevel = scrollLevel > 121 ? 121 : scrollLevel;
        // target.style.paddingTop = scrollLevel + "px";
    };

    render() {
        var header: any;
        var content: any = this.props.children;

        if (this.props.appBar) {
            if (this.props.appBar.custom) {
                header = this.props.appBar.custom;
            } else if (this.props.appBar.splash != null) {
                header = (
                    <Fragment>
                        <div
                            ref={this.splashRef}
                            className={"screen-splash " + css(styles.splash)}
                            style={{ height: "175px" }}>
                            <img
                                alt=""
                                className={css(styles.splashImg)}
                                src={this.props.appBar.splash}></img>
                            <div className={css(styles.splashTitle)}>
                                {this.props.appBar.title}
                            </div>
                        </div>
                        {this.props.appBar.backBtn ? (
                            <div className="backIcon screen-splash-back">
                                <BackButton />
                            </div>
                        ) : null}
                    </Fragment>
                );
                content = (
                    <div
                        style={{ overflowY: "scroll" }}
                        onScroll={this.onContentScroll}>
                        {this.props.children}
                    </div>
                );
            } else {
                header = (
                    <div
                        className={"screen-header " + css(
                            styles.header,
                            this.props.dark ? styles.dark : styles.light
                        )}>
                        <div className={css(styles.headerContent)}>
                            {this.props.appBar.backBtn ? (
                                <span className={css(styles.backButton)}>
                                    <BackButton icon />
                                    
                                </span>
                            ) : null}
                            <span className={css(styles.screenTitle)}>
                                {this.props.appBar.title}
                            </span>
                            {this.props.appBar.icon ? (
                                <div
                                    className={css(styles.iconButton)}
                                    onClick={this.props.appBar.onIconClick}>
                                    {this.props.appBar.icon}
                                </div>
                            ) : null}
                        </div>
                    </div>
                );
            }
        }

        return (
            <IonPage id={this.props.id}>
                <div
                    className={"screen-component " + css(
                        styles.screen,
                        this.props.dark ? styles.dark : styles.light
                    )}>
                    {header}
                    <div className={css(styles.screenContent)}>{content}</div>
                </div>
            </IonPage>
        );
    }
}

const styles = StyleSheet.create({
    light: {
        backgroundColor: "white",
        color: "black",
    },
    dark: {
        backgroundColor: "#121212",
        color: "white",
    },
    screen: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        width: "100%",
        height: "calc(100vh - 56px)",
        top: 0,
        // bottom: 0,
    },
    header: {
        padding: 10,
        boxShadow: "#ccc 0px 0px 6px 0px",
        position: "relative",
        height: 54.4,
        zIndex: 200,
    },
    headerContent: {
        fontSize: "1.8em",
        fontWeight: 400,
        fontFamily: '"Rubik", sans-serif',
        position: "relative",
        width: "100%",
        height: "100%"
    },
    backButton: {
        float: "left",
    },
    iconButton: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 54.4,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    screenTitle: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: "fit-content",
    },
    splash: {
        flex: "0 0 auto",
        position: "relative",
        height: "calc(54px + var(--sat)) !important"
    
    },
    splashImg: {
        objectPosition: "50% 30%",
        filter: "brightness(0.5)",
        objectFit: "cover",
        height: "100%",
        width: "100%",
    },
    splashTitle: {
        fontFamily: "Rubik",
        position: "absolute",
        bottom: "10.75px",
        color: "white",
        fontSize: "1.7em",
        fontWeight: 300,
        right: "10px",
    },
    screenContent: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
    },
});
