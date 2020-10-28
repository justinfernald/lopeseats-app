import React from 'react';
import { IonPage } from "@ionic/react";
import { css, StyleSheet } from "aphrodite/no-important";
import SlideShow from "../../components/SlideShow";
import Slide from '../../components/Slide';

export default class StartScreen extends React.Component {

    render() {
        return (
            <IonPage style={{height: "100%"}}>
                <div className={css(styles.container)}>
                    <SlideShow delay={5}>
                        <Slide>
                            <div className={css(styles.slideContainer)}>
                                This is a test. Page 1
                            </div>
                        </Slide>
                        <Slide>
                            <div className={css(styles.slideContainer)}>
                                Hello world. Page 2
                            </div>
                        </Slide>
                        <Slide>
                            <div className={css(styles.slideContainer)}>
                                This is page 3......
                            </div>
                        </Slide>
                    </SlideShow>

                    <div className={css(styles.firstTimeButton)} onClick={() => this.props.history.push("/register")}>New to The Heard</div>
                    <dir className={css(styles.returningButton)} onClick={() => this.props.history.push("/login")}>I Have an Account</dir>
                </div>
            </IonPage>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    },
    slideContainer: {
        padding: "30px 0"
    },
    firstTimeButton: {
        margin: "10px 20px",
        padding: "10px",
        borderRadius: "5px",
        border: "2px solid black"
    },
    returningButton: {
        margin: "10px 20px",
        padding: "10px",
        borderRadius: "5px",
        border: "2px solid black"
    }
});