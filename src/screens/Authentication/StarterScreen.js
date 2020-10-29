import React from "react";
import { IonPage } from "@ionic/react";
import { css, StyleSheet } from "aphrodite/no-important";
import SlideShow from "../../components/SlideShow";
import Slide from "../../components/Slide";
import Icontwo from "../../assets/images/icon-two.png";
import Iconone from "../../assets/images/icon-one.png";
import Iconthree from "../../assets/images/icon-three.png";

export default class StartScreen extends React.Component {

  render() {
    return (
      <IonPage style={{ height: "100%" }}>
        <div className={css(styles.container)}>
          <SlideShow delay={5} style={{maxHeight: "70%"}}>
            <Slide>
              <div className={css(styles.slideContainer)}>
                <div className="starterCard">
                  <div className="loginImageStart">
                    <img
                      alt="LopesEat Logo"
                      src={Icontwo}
                      className={css(styles.image) + " imageFill"}
                    />
                  </div>
                  <div className="starterTitle">Fast Delivery</div>
                  <div className="starterText">
                    Snacks delivered under 10 minutes or less, right to the
                    comfort of your dorm.
                  </div>
                </div>
              </div>
            </Slide>
            <Slide>
              <div className={css(styles.slideContainer)}>
                <div className="starterCard">
                  <div className="loginImageStart">
                    <img
                      alt="LopesEat Logo"
                      src={Iconone}
                      className={css(styles.image) + " imageFill"}
                    />
                  </div>
                  <div className="starterTitle">Affordable</div>
                  <div className="starterText">
                    Most convenient and affordable prices for your everyday
                    needs!
                  </div>
                </div>
              </div>
            </Slide>
            <Slide>
              <div className={css(styles.slideContainer)}>
                <div className="starterCard">
                  <div className="loginImageStart">
                    <img
                      alt="LopesEat Logo"
                      src={Iconthree}
                      className={css(styles.image) + " imageFill"}
                    />
                  </div>
                  <div className="starterTitle">Late Delivering</div>
                  <div className="starterText">
                    Delivering 1PM all the way till 2AM at night!
                  </div>
                </div>
              </div>
            </Slide>
          </SlideShow>
          <div style={{ height: "5%" }}></div>
          <div
            className="signUpButton"
            onClick={() => this.props.history.push("/register")}
          >
            New to The Herd
          </div>
          <dir
            className="signInButton"
            onClick={() => this.props.history.push("/login")}
          >
            I Have an Account
          </dir>
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
    textAlign: "center",
  },
  slideContainer: {
    padding: "10px 0",
    height: "100%",
  },
  firstTimeButton: {
    margin: "10px 20px",
    padding: "10px",
    borderRadius: "5px",
    border: "2px solid black",
  },
  returningButton: {
    margin: "10px 20px",
    padding: "10px",
    borderRadius: "5px",
    border: "2px solid black",
  },
  image: {
    width: "auto !important"
  }
});
