import { store, actions } from "./index";
import { startDeliveryMode, stopDeliveryMode } from "../assets/scripts/Util";

const handleStateChange = async (
    previousState: any,
    newState: any,
    actionType: any
) => {
    switch (actionType) {
        case actions.setDeliveryMode.type:
            if (newState.deliveryModeActive) {
                const data = await startDeliveryMode();
                if (!data.success) {
                    store.dispatch(
                        actions.setDeliveryStartingTime(new Date(data.msg))
                    );
                }
            } else stopDeliveryMode();
            break;
    }
};

export default handleStateChange;
