import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import SearchIcon from "../assets/images/search-grey.svg";
import Theme from "../assets/styles/Theme";
import LopesEatLogo from "../assets/images/lopeseat-white.svg";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { store, actions } from "../Redux";

function BackButtonUnconnected(props) {

    let history = useHistory();

    function goBack() {
        if (props.historySize > 0) {
            history.goBack();
        }
    }

    return (
        <i
            className={"material-icons-round" + (props.icon ? " icon" : "")}
            style={{color: "white"}}
            onClick={goBack}>
            arrow_back_ios
        </i>);
}

const mapStateToProps = (state) => ({
    historySize: state.historySize
});

let BackButton = connect(mapStateToProps)(BackButtonUnconnected);

const AppBar = props => {
    const compStyles = StyleSheet.create({
        wrapper: {
            height: 200,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            zIndex: 101,
        },
        mainContainer: {
            background: Theme.color.primary,
            width: "100%",
            flex: 1
        },
        contentContainer: {
            padding: "10px 30px 10px 30px",
            ...Theme.addOn.fullSize,
            ...Theme.addOn.centerContainer,
            justifyContent: "space-around",
        },
        topContainer: {
            display: "grid",
            gridTemplateColumns: "25% 50% 25%",
            width: "100%"
        },
        logoContainer: {
            width: "100%",
            height: 75,
        },
        logo: {
            ...Theme.addOn.fullSize,
        },
        searchBox: {
            height: 40,
            width: "100%",
            background: Theme.color.secondary,
            borderRadius: 20,
            display: "flex",
            paddingLeft: 20,
            paddingRight: 20,
            border: "3px solid " + Theme.color.primaryTint
        },
        searchInput: {
            height: "100%",
            flex: 1,
            minWidth: 0
        },
        searchIcon: {
        },
        secondaryContainer: {
            height: 35,
            ...Theme.addOn.boxShadow.medium,
            ...Theme.addOn.centerContainer
        },
        infoText: {
            color: "#D40505",
            fontWeight: 500
        }
    });

    return <div className={css(compStyles.wrapper)}>
        <div className={css(compStyles.mainContainer)}>
            <div className={css(compStyles.contentContainer)}>
                <div className={css(compStyles.topContainer)}>
                    <div className="flexDisplay justifyCenter">{props.backBtn?<BackButton/>:""}</div>
                    <div className={css(compStyles.logoContainer)}>
                        <img className={css(compStyles.logo)} alt="" src={LopesEatLogo} />
                    </div>
                    <div></div>
                </div>
                <div className={css(compStyles.searchBox)}>
                    <input className={css(compStyles.searchInput)} placeholder="Search"
                        onInput={(e) => {
                            store.dispatch(actions.setSearchTerm(e.target.value));
                        }}/>
                    <img className={css(compStyles.searchIcon)} alt="Search" src={SearchIcon} />
                </div>
            </div>
        </div>
        {/* <div className={css(compStyles.secondaryContainer)}>
            <div className={css(compStyles.infoText)}>Refer 2 friends earn $5 <span style={{color: "#23BB54"}}>cash</span></div>
        </div> */}
    </div>
};

export default AppBar;