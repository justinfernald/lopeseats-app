import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../assets/scripts/Util";

export const fetchBalances = createAsyncThunk(
    'users/fetchBalanceStatus',
    async (apiToken, thunkAPI) => {
        try {
            const response = await postData("https://lopeseat.com/REST/getBalances.php", {
                apiToken: apiToken,
            });
            return response;
        } catch (e) {
            console.error(e);
        }
        return null;
    }
);