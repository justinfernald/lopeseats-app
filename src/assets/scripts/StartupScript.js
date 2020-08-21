import { postData } from "./Util";
import { store, actions } from "../../Redux";

const StartUp = ({ apiToken }) => {
    checkToken(apiToken);
};

const checkToken = async (apiToken) => {
    if (
        (
            await postData("https://lopeseat.com/REST/validToken.php", {
                apiToken,
            })
        ).success
    ) {
        const profileData = await postData(
            "https://lopeseat.com/REST/getProfileData.php",
            {
                apiToken,
            }
        );

        store.dispatch(actions.setApiToken(apiToken));
        store.dispatch(actions.setUserDetails(profileData));

        if (profileData.isDeliverer) {
            const activeOrderCountResponse = await postData(
                "https://lopeseat.com/REST/getActiveOrderCount.php",
                {
                    apiToken,
                }
            );

            if (activeOrderCountResponse.success) {
                store.dispatch(
                    actions.setActiveOrderCount(activeOrderCountResponse.msg)
                );
            } else {
                store.dispatch(actions.setActiveOrderCount(0));
            }
        }
    } else {
        store.dispatch(actions.unsetApiToken());
    }
};

export default StartUp;
