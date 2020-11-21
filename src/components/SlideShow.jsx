import React from "react";
// import history from "../history";
// import { connect } from "react-redux";
// import { getCart } from "../assets/scripts/Util";
import { css, StyleSheet } from "aphrodite/no-important";
// import Slide from "./Slide";
import ScrollSnap from "scroll-snap";

export default class SlideShow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0
        }

        this.containerRef = React.createRef();
        this.scrollerRef = React.createRef();
    }

    callback = () => {
        if (!this.containerRef.current) return;
        this.setState({ page: Math.round(this.containerRef.current.scrollLeft / this.containerRef.current.clientWidth) });
    }

    componentDidMount() {
        this.intId = setInterval(() => {
            var nextPage = this.state.page + 1;
            var { length } = this.props.children;
            if (nextPage === length)
                nextPage = 0;
            this.setPage(nextPage);
        }, this.props.delay * 1000);

        const element = this.containerRef.current;
        const snapElement = new ScrollSnap(element, {
            snapDestinationX: "100%"
        });

        snapElement.bind(this.callback);
    }

    componentWillUnmount() {
        clearInterval(this.intId);
    }

    setPage(page) {
        this.containerRef.current.scrollLeft = page * this.containerRef.current.clientWidth;
        this.setState({ page });
    }

    generateDots() {
        var dots = [];
        for (var i = 0; i < this.props.children.length; i++) {
            dots.push(<div key={i} className={css(styles.dot, i === this.state.page ? styles.selected : null)}></div>);
        }
        return dots;
    }

    render() {
        return (
            <div style={this.props.style}>
                <div className={css(styles.container) + " noScrollBar"} ref={this.containerRef}>
                    <div className={css(styles.scroller)} ref={this.scrollerRef} style={{ width: this.props.children.length + "00%" }}>
                        {this.props.children}
                    </div>
                </div>
                <div className={css(styles.dotContainer)}>
                    {this.generateDots()}
                </div>
            </div>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowX: "scroll",
        scrollBehavior: "smooth"
    },
    scroller: {
        height: "100%",
        display: "flex",
        flexDirection: "row"
    },
    dotContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "0 30%",
        height: "5%",
        minHeight: "12px",
        position: "absolute",
        bottom: "-20px",
        left: 0,
        right: 0
    },
    dot: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        backgroundColor: "white",
        border: "2px solid #707070"
    },
    selected: {
        backgroundColor: "#707070",
    }
});