import { createAsyncThunk } from "@reduxjs/toolkit";
import { postToAPI, showErrors } from "../assets/scripts/Util";
import { actions } from "../Redux";
import { startDeliveryMode, stopDeliveryMode } from "../assets/scripts/Util";

export const fetchBalances = createAsyncThunk(
    'users/fetchBalanceStatus',
    async (_p, thunkAPI) => {
        thunkAPI.dispatch(actions.setBalances([]));
        try {
            const response = await postToAPI("/user/getBalances.php", {
                apiToken: (thunkAPI.getState() as any).apiToken,
            });
            return response;
        } catch (e) {
            console.error(e);
        }
        return null;
    }
);

export const setProfileImage = createAsyncThunk(
    'users/setProfileImageStatus',
    async (data:{apiToken: string, image: string}, thunkAPI) => {
        try {
            const response = await postToAPI("/user/setProfileImage.php",
            {
                apiToken: data.apiToken,
                profileImage: data.image
            });
            thunkAPI.dispatch(actions.setProfileImage(data.image));
            return response;
        } catch (e) {
            console.error(e);
        }
        return null;
    }
);

export const changePhoneNumber = createAsyncThunk(
    'users/changePhoneNumberStatus',
    async (phoneNumber: string, thunkAPI) => {
        try {
            var state:any = thunkAPI.getState();
            const response = await postToAPI("/user/changePhone.php",
            {
                apiToken: state.apiToken,
                phone: phoneNumber
            });
            if (response.success) {
                thunkAPI.dispatch(actions.setUserDetails({phoneNumber}))
            }
            return response.success;
        } catch (e) {
            console.error(e);
        }
        return false;
    }
);

export const changePassword = createAsyncThunk(
    'users/changePasswordStatus',
    async (payload: { currPassword: string, newPassword: string }, thunkAPI) => {
        try {
            var state:any = thunkAPI.getState();
            const response = await postToAPI("/user/changePassword.php",
            {
                apiToken: state.apiToken,
                ...payload
           });
            return response;
        } catch (e) {
            console.error(e);
        }
        return false;
    }
);

export const toggleDeliveryMode = createAsyncThunk(
    'delivery/toggleDeliveryMode',
    async (_p, thunkAPI) => {
        try {
            var state:any = thunkAPI.getState();
            if (state.deliveryModeActive) {
                await stopDeliveryMode(state.apiToken);
                thunkAPI.dispatch(actions.setDeliveryMode(false));
            } else {
                const data = await startDeliveryMode(state.apiToken);
                if (data.success) {
                    thunkAPI.dispatch(
                        actions.setDeliveryStartingTime(data.msg.startingTime)
                    );
                    thunkAPI.dispatch(actions.setDeliveryMode(true));
                } else {
                    showErrors([data.msg]);
                    return false;
                }
            }
            return true;
        } catch (e) {
            console.error(e);
        }
    }
);