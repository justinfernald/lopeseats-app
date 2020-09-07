import { store, actions } from "./index";
import { startDeliveryMode, stopDeliveryMode } from "../assets/scripts/Util";

const handleStateChange = async (
    previousState: any,
    newState: any,
    actionType: any
) => {
    // switch (actionType) {
    //     case actions.setDeliveryMode.type:
    //         if (newState.deliveryModeActive) {
    //             const data = await startDeliveryMode(newState.apiToken);
    //             if (data.success) {
    //                 store.dispatch(
    //                     actions.setDeliveryStartingTime(data.msg.startingTime)
    //                 );
    //             }
    //         } else stopDeliveryMode(newState.apiToken);
    //         break;
    // }
};

export default handleStateChange;
