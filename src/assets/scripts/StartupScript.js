import { getLatestVersionInfo, getRestaurant, getMenu, getCategories } from "./Util";
import { store, actions } from "../../Redux";
import packageJson from "../../../package.json";

const StartUp = () => {
    checkUpdate();

    loadStore();
};

const loadStore = async () => {
    var restaurant = await getRestaurant(62);
    var menu = await getMenu(62);
    var restaurantCategories = await getCategories(62);
    store.dispatch(actions.setSelectedRestaurant(restaurant));
    store.dispatch(actions.setSelectedMenu(menu));
    store.dispatch(actions.setSelectedRestaurantCategories(restaurantCategories));
}

const checkUpdate = async () => {
    var versionInfo = await getLatestVersionInfo();

    store.dispatch(actions.setUpdateRequired(versionInfo.version !== packageJson.version && versionInfo.requireUpdate));
}

export default StartUp;
