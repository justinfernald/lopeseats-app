import {
    createSlice,
    configureStore,
    // getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import logger from "redux-logger";

const initialState = {
    apiToken: null,
    cartItems: [],
    userDetails: {
        name: null,
        studentNumber: null,
        phoneNumber: null,
        email: null,
        isDeliverer: false,
    },
    registerDetails: {
        firstName: null,
        lastName: null,
        studentNumber: null,
        phoneNumber: null,
        email: null,
        password: null,
        profileImage: "",
    },
    selectedRestaurant: null,
    selectedMenu: null,
    currentOrder: -1,
};

const reducers = {
    // apiToken
    setApiToken: (
        state: any,
        { payload: newApiToken }: { payload: string }
    ) => {
        state.apiToken = newApiToken;
    },
    unsetApiToken: (state: any) => {
        state.apiToken = null;
    },
    // cartItems
    setCartItem: (state: any, { payload: newCartItems }: { payload: [{}] }) => {
        state.cartItems = newCartItems;
    },
    addCartItemCartItemCartItem: (
        state: any,
        { payload: cartItem }: { payload: {} }
    ) => {
        state.cartItems = [...state.cartItems, cartItem];
    },
    removeCartItemCartItem: (
        state: any,
        { payload: cartItemId }: { payload: number }
    ) => {
        state.cartItems = state.cartItems.filter(
            (item: { id: number; [key: string]: any }) => item.id !== cartItemId
        );
    },
    clearCartItem: (state: any) => {
        state.cartItems = [];
    },
    //userDetails
    setUserDetails: (
        state: any,
        { payload: newUserDetails }: { payload: object }
    ) => {
        state.userDetails = newUserDetails;
    },
    unsetUserDetails: (state: any) => {
        state.userDetails = initialState.userDetails;
    },
    //registerDetails
    setRegisterDetails: (
        state: any,
        { payload: newRegisterDetails }: { payload: object }
    ) => {
        state.registerDetails = {
            ...state.registerDetails,
            ...newRegisterDetails,
        };
    },
    unsetRegisterDetails: (state: any) => {
        state.registerDetails = initialState.registerDetails;
    },
    //selectedRestaurant
    setSelectedRestaurant: (
        state: any,
        { payload: newSelectedRestaurantId }: { payload: number }
    ) => {
        state.selectedRestaurant = newSelectedRestaurantId;
    },
    unsetSelectedRestaurant: (state: any) => {
        state.selectedRestaurant = null;
    },
    //selectedMenu
    setSelectedMenu: (
        state: any,
        { payload: newSelectedMenuId }: { payload: number }
    ) => {
        state.selectedMenu = newSelectedMenuId;
    },
    unsetSelectedMenu: (state: any) => {
        state.selectedMenu = null;
    },
    //currentOrder
    setCurrentOrder: (
        state: any,
        { payload: newCurrentOrderId }: { payload: number }
    ) => {
        state.currentOrder = newCurrentOrderId;
    },
    unsetCurrentOrder: (state: any) => {
        state.currentOrder = null;
    },
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers,
});

export const { actions } = stateSlice;

export default configureStore({
    reducer: stateSlice.reducer,

    // middleware: [...getDefaultMiddleware(), logger],
    // devTools: false
});
