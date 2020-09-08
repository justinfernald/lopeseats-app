import React from 'react';
import Screen from '../../../components/Screen';
import { css, StyleSheet } from "aphrodite/no-important";

class ContactUs extends React.Component {

    render() {
        return (
            <Screen
                appBar={{
                    title: "Contact Us",
                    backBtn: true
                }}
            >
                <div className={css(styles.content)}>
                    <div className={css(styles.container)}>
                        Contact us at <i className={css(styles.highlight)}>lopeseat@lopeseat.com</i> or message us on Instagram <i className={css(styles.highlight)}>@lopeseat</i>. Have questions or issues we will help you with both. Want extra information about LopesEat, go to <i className={css(styles.highlight)}>GetLopesEat.com</i>
                    </div>
                </div>
            </Screen>
        );
    }

}

export default (ContactUs);

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: 10,
        background: "#f3f3f3",
    },
    container: {
        padding: 10,
        background: "#fff",
        borderRadius: 7,
    },

    highlight: {
        fontWeight: 500
    }
});