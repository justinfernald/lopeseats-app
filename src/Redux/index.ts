import {
    createSlice,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import logger from "redux-logger";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import handleStateChange from "./updateHandler";
import { fetchBalances } from "./Thunks";

const initialState = {
    apiToken: null,
    cartItems: [],
    userDetails: {
        name: null,
        studentNumber: null,
        phoneNumber: null,
        email: null,
        isDeliverer: false,
        profileImage: "",
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
    profileImage: "",
    // Item Details
    itemDetails: {
        openItem: null,
        editingItem: false,
        optionsChosen: [],
        instructions: null,
    },
    // Restaurant Details
    selectedRestaurant: null,
    selectedMenu: null,
    currentOrder: -1,
    // Messaging
    messageOrderId: -1,
    // Notifications
    fbToken: null,
    fbPlatform: null,
    // Delivery Details
    address: null,
    // Delivery Mode
    deliveryStartingTime: null,
    deliveryModeActive: false,
    activeOrderCount: 0,
    // Balances
    balances: [],
    // Overlay
    overlayEnabled: null,
    overlay: null,
    // Dropdown Menus
    openMenus: [],
    // Depositing
    depositData: {
        amount: 5,
        toFriend: false,
        friendsPhone: "",
    },
    // History
    historySize: 0,

    tip: 0,
    tipped: false,
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
    addCartItem: (state: any, { payload: cartItem }: { payload: {} }) => {
        state.cartItems = [...state.cartItems, cartItem];
    },
    removeCartItem: (
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
        state.userDetails = {
            ...state.userDetails,
            ...newUserDetails,
        };
    },
    unsetUserDetails: (state: any) => {
        state.userDetails = initialState.userDetails;
    },
    setProfileImage: (
        state: any,
        { payload: profileImage }: { payload: string }
    ) => {
        state.profileImage = profileImage;
    },
    unsetProfileImage: (state: any) => {
        state.profileImage = null;
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
    //Item Details
    setItemDetails: (
        state: any,
        { payload: itemDetails }: { payload: object }
    ) => {
        state.itemDetails = { ...state.itemDetails, ...itemDetails };
    },
    unsetItemDetails: (state: any) => {
        state.itemDetails = null;
    },
    //Messaging
    setMessageOrderId: (
        state: any,
        { payload: messageOrderId }: { payload: object }
    ) => {
        state.messageOrderId = messageOrderId;
    },
    unsetMessageOrderId: (state: any) => {
        state.messageOrderId = null;
    },
    // Notifications
    setFBToken: (state: any, { payload: fbToken }: { payload: string }) => {
        state.fbToken = fbToken;
    },
    unsetFBToken: (state: any) => {
        state.fbToken = null;
    },
    setFBPlatform: (
        state: any,
        { payload: fbPlatform }: { payload: string }
    ) => {
        state.fbPlatform = fbPlatform;
    },
    unsetFBPlatform: (state: any) => {
        state.fbPlatform = null;
    },
    setAddress: (state: any, { payload: address }: { payload: string }) => {
        state.address = address;
    },
    unsetAddress: (state: any) => {
        state.address = null;
    },
    // Deliverer Mode
    setDeliveryMode: (
        state: any,
        { payload: deliveryModeActive }: { payload: boolean }
    ) => {
        state.deliveryModeActive = deliveryModeActive;
    },
    setDeliveryStartingTime: (
        state: any,
        { payload: deliveryStartingTime }: { payload: number }
    ) => {
        state.deliveryStartingTime = deliveryStartingTime;
    },
    openOverlay: (state: any) => {
        state.overlayEnabled = true;
    },
    closeOverlay: (state: any) => {
        state.overlayEnabled = false;
    },
    setActiveOrderCount: (
        state: any,
        { payload: activeOrderCount }: { payload: number }
    ) => {
        state.activeOrderCount = activeOrderCount;
    },
    openMenu: (state: any, { payload: menuId }: { payload: string }) => {
        if (!state.openMenus.includes(menuId)) state.openMenus.push(menuId);
    },
    closeMenu: (state: any, { payload: menuId }: { payload: string }) => {
        if (state.openMenus.includes(menuId)) {
            var index = state.openMenus.indexOf(menuId);
            state.openMenus.splice(index, 1);
        }
    },
    closeAllMenus: (state: any) => {
        state.openMenus = [];
    },
    setDepositData: (
        state: any,
        {
            payload: data,
        }: {
            payload: {
                amount: number;
                toFriend: boolean;
                friendsPhone: string;
            };
        }
    ) => {
        state.depositData = {
            ...state.depositData,
            ...data,
        };
    },
    reset: (state: any) => initialState,
    setHistorySize: (state: any, { payload: size }: { payload: number }) => {
        state.historySize = size;
    },
    addHistorySize: (state: any, { payload: size }: { payload: number }) => {
        if (state.historySize === undefined || state.historySize === null) {
            state.historySize = size;
        } else {
            state.historySize = state.historySize + size;
        }
    },
    setBalances: (
        state: any,
        { payload: balances }: { payload: Array<number> }
    ) => {
        state.balances = balances;
    },
    setTip: (state: any, { payload: tip }: { payload: number }) => {
        state.tip = tip;
    },
    setTipped: (state: any, { payload: tipped }: { payload: boolean }) => {
        state.tipped = tipped;
    },
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(fetchBalances.fulfilled, (state, action) => {
            state.balances = action.payload;
        });
    },
});

const persistConfig = {
    key: "state",
    storage,
    stateReconciler: hardSet,
    blacklist: ["tipped"],
};

export const { actions } = stateSlice;

const reducer = (state: any, action: any) => stateSlice.reducer(state, action);

const persistedReducer = persistReducer(persistConfig, reducer);

const updateHandler = (store: any) => (next: any) => (action: any) => {
    const previousState = store.getState();
    const result = next(action);
    const newState = store.getState();
    handleStateChange(previousState, newState, action.type);
    return result;
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
        updateHandler,
    ] /* devTools: false*/,
});
export const persistor = persistStore(store);
