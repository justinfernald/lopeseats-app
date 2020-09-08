import { postData, updateFBToken } from "./Util";
import { store, actions } from "../../Redux";

const RerunScript = () => {
    const { apiToken, fbToken, fbPlatform } = store.getState();
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
        }
    } else {
        store.dispatch(actions.unsetApiToken());
    }
};

export default RerunScript;
