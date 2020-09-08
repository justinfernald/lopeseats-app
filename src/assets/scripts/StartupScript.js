import { postData, updateFBToken, isDeliveryMode } from "./Util";
import { store, actions } from "../../Redux";

const StartUp = ({ apiToken, fbToken, fbPlatform }) => {
    checkToken(apiToken, fbToken, fbPlatform);
};

const checkToken = async (apiToken, fbToken, fbPlatform) => {
    if (
        (
            await postData("https://lopeseat.com/REST/user/validToken.php", {
                apiToken,
            })
        ).success
    ) {
        const profileData = await postData(
            "https://lopeseat.com/REST/user/getProfileData.php",
            {
                apiToken,
            }
        );

        if (fbToken && fbPlatform)
            updateFBToken(fbToken, fbPlatform, apiToken);

        store.dispatch(actions.setApiToken(apiToken));
        store.dispatch(actions.setUserDetails(profileData));

        if (profileData.isDeliverer) {
            const activeOrderCountResponse = await postData(
                "https://lopeseat.com/REST/order/getActiveOrderCount.php",
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

            const inDeliveryModeResponse = await isDeliveryMode(apiToken);
            if (inDeliveryModeResponse && inDeliveryModeResponse.success) {
                store.dispatch(actions.setDeliveryMode(inDeliveryModeResponse.msg));
                if (inDeliveryModeResponse.msg && !store.getState().deliveryStartingTime) {
                    store.dispatch(actions.setDeliveryStartingTime(Date.now()));
                }
                if (!inDeliveryModeResponse.msg) {
                    store.dispatch(actions.setDeliveryStartingTime(null));
                }
            }

        }
    } else {
        store.dispatch(actions.unsetApiToken());
    }
};

export default StartUp;
