import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../assets/scripts/Util";
import { actions } from "../Redux";

export const fetchBalances = createAsyncThunk(
    'users/fetchBalanceStatus',
    async (apiToken, thunkAPI) => {
        try {
            const response = await postData("https://lopeseat.com/REST/user/getBalances.php", {
                apiToken: apiToken,
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
            const response = await postData("https://lopeseat.com/REST/user/setProfileImage.php",
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
            const response = await postData("https://lopeseat.com/REST/user/changePhone.php",
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
            const response = await postData("https://lopeseat.com/REST/user/changePassword.php",
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