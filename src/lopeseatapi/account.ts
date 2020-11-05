import { store, actions } from "../Redux";
import { cacheProfileImage, updateFBToken, postToAPI, loginAccount, resendCode, showErrors, getMenu, getRestaurant, isDeliveryMode, getCategories } from "../assets/scripts/Util";
import history from "../history";

export default class AccountManager {

  static hasStoredAPIToken = () => {
    var { apiToken } = store.getState() as any;
    console.log(apiToken);
    return apiToken !== null && apiToken.length > 0;
  }

  static checkAPIToken = async () => {
    var { apiToken } = store.getState() as any;
    // Check if currently stored token is valid and login
    var tokenValid = postToAPI("/user/validToken.php", {apiToken});
    if (tokenValid) {
      AccountManager._onLogin(apiToken);
      return true;
    }

    store.dispatch(actions.unsetApiToken());
    return false;
  }

  static attemptLogin = async (phoneNumber: string, password: string, onNotConfirmed: (phoneNumber: string) => void = () => {}) => {
    let errors = [];
  
    let isPhoneNumber = (input: string) => {
      let phoneRegex = /^\d{10}$/;
      return input.match(phoneRegex);
    };
  
    if (!isPhoneNumber(phoneNumber)) {
      errors.push("Invalid Phone Number");
    }
  
    // Attempt to log in
    let loginData = await loginAccount(phoneNumber, password);
  
    // Check for errors and print them
    if (errors.length === 0 && !loginData.success) {
      errors.push(loginData.msg);
  
      // Resend code if account is not confirmed
      if (loginData.msg === "Account not confirmed") {
        onNotConfirmed(phoneNumber);
        resendCode(phoneNumber);
        return;
      }
    }
  
    console.log(errors);
  
    if (errors.length === 0) {
      // updateFBToken(this.props.fbToken, loginData.msg);
      AccountManager._onLogin(loginData.msg);
    } else {
      showErrors(errors);
    }
  }

  private static _onLogin = async (apiToken: string) => {
    var { fbToken, fbPlatform, deliveryStartingTime } = store.getState() as any;
    var profileData = await postToAPI("/user/getProfileData.php",
      {
        apiToken,
      }
    );

    // Update stored apiToken to stay logged in next time
    store.dispatch(actions.setApiToken(apiToken));

    // Store user data in redux state
    cacheProfileImage(apiToken);
    store.dispatch(actions.setUserDetails(profileData));

    // update FireBase Messaging token in database for notifications
    updateFBToken(fbToken, fbPlatform, apiToken);

    // Load LopesEat Convience store
    var restaurant = await getRestaurant(62);
    var menu = await getMenu(62);
    var restaurantCategories = await getCategories(62);
    store.dispatch(actions.setSelectedRestaurant(restaurant));
    store.dispatch(actions.setSelectedMenu(menu));
    store.dispatch(actions.setSelectedRestaurantCategories(restaurantCategories));

    history.replace("/app/home");

    if (profileData.isDeliverer) {
        const activeOrderCountResponse = await postToAPI("/order/getActiveOrderCount.php",
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
            if (inDeliveryModeResponse.msg && !deliveryStartingTime) {
                store.dispatch(actions.setDeliveryStartingTime(Date.now()));
            }
            if (!inDeliveryModeResponse.msg) {
                store.dispatch(actions.setDeliveryStartingTime(null));
            }
        }

    }

    // const fromURL = this.getFromURL(this.props.location);
    // await this.loadStore();
    // this.props.history.replace(fromURL === "/login" ? "/app/home" : fromURL);
  };

}