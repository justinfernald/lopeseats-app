import React, { Fragment } from "react";
import { IonPage } from "@ionic/react";
import { StyleSheet, css } from "aphrodite/no-important";
import "../App.css";

interface PropType {
    appBar?: {
        splash: string;
        title: string | JSX.Element;
        onBack?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
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

    onContentScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.currentTarget; //using currentTarget instead of target because of event bubbling
        let scrollLevel = target.scrollTop; //Math.floor(target.scrollTop);
        let bannerHeight = 175 - scrollLevel;
        bannerHeight = bannerHeight > 54 ? bannerHeight : 54;
        this.splashRef.current.style.height = bannerHeight + "px";
        scrollLevel = scrollLevel > 121 ? 121 : scrollLevel;
        target.style.paddingTop = scrollLevel + "px";
    };

    render() {
        var header: any;
        var content: any = this.props.children;

        if (this.props.appBar) {
            if (this.props.appBar.splash != null) {
                header = (
                    <Fragment>
                        <div
                            ref={this.splashRef}
                            className={css(styles.splash)}
                            style={{ height: "175px" }}>
                            <img
                                alt=""
                                className={css(styles.splashImg)}
                                src={this.props.appBar.splash}></img>
                            <div className={css(styles.splashTitle)}>
                                {this.props.appBar.title}
                            </div>
                        </div>
                        {this.props.appBar.onBack ? (
                            <div className="backIcon">
                                <i
                                    className="material-icons-round"
                                    onClick={this.props.appBar.onBack}>
                                    arrow_back_ios
                                </i>
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
                    <div className={css(styles.header)}>
                        {this.props.appBar.onBack ? (
                            <span className={css(styles.backButton)}>
                                <i
                                    className="icon material-icons-round"
                                    onClick={this.props.appBar.onBack}>
                                    arrow_back_ios
                                </i>
                            </span>
                        ) : null}
                        <span className={css(styles.screenTitle)}>
                            {this.props.appBar.title}
                        </span>
                    </div>
                );
            }
        }

        return (
            <IonPage id={this.props.id}>
                <div
                    className={css(
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
        padding: "10px",
        fontSize: "1.8em",
        fontWeight: 400,
        fontFamily: '"Rubik", sans-serif',
        textAlign: "center",
        boxShadow: "#ccc 0px 0px 6px 0px"
    },
    backButton: {
        float: "left"
    },
    screenTitle: {
        paddingRight: 5,
    },
    splash: {
        flex: "0 0 auto",
        position: "relative",
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
