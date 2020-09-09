import React from "react";
import { store, actions } from "../../Redux";

export const registerAccount = async (
    phone,
    firstName,
    lastName,
    email,
    studentNumber,
    password,
    profileImage
) => {
    return await postData("https://lopeseat.com/REST/user/signup.php", {
        name: firstName + " " + lastName,
        id: studentNumber,
        email: email,
        phone: phone,
        password: password,
        profileImage: profileImage,
    });
};

export const resendCode = async (phone) => {
    return await postData("https://lopeseat.com/REST/user/resendCode.php", {
        phone: phone,
    });
};

export const loginAccount = async (phone, password) => {
    return await postData("https://lopeseat.com/REST/user/login.php", {
        phone: phone,
        password: password,
    });
};

export const verifyCode = async (phone, code) => {
    return (
        await postData(
            "https://lopeseat.com/REST/user/confirmPhone.php?phone=" +
            phone +
            "&token=" +
            code
        )
    ).success;
};

export const showErrors = (errors) => {
    let divElement = document.createElement("div");
    let errorListElement = document.createElement("div");

    for (let error of errors) {
        let childElement = document.createElement("div");
        childElement.classList.add("errorItem");
        childElement.innerText = error;
        errorListElement.append(childElement);
    }

    divElement.classList.add("errorWrapper");
    errorListElement.classList.add("errorList");

    divElement.append(errorListElement);
    document.body.append(divElement);

    setTimeout(() => {
        document.body.removeChild(divElement);
    }, 2000 + 1000 * errors.length);
};

export const getScreenHandler = () => window.getScreenHandler();

export const getScreenState = () => getScreenHandler().state;

export const setScreenState = (...args) => getScreenHandler().setState(...args);

export const getMessageListener = () =>
    window.getScreenHandler().getMessageListener();

export const postData = async (
    url = "",
    data = {},
    raw = false,
    promise = false
) => {
    let formData = new FormData();

    for (let i in data) {
        formData.append(i, data[i]);
    }

    // Default options are marked with *
    const response = await fetch(encodeURI(url), {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "force-cache",
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached // when done will start doing default or force-cache
        //   credentials: 'same-origin', // include, *same-origin, omit
        // headers: {
        //   'Content-Type': 'application/json'
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // },
        //   redirect: 'follow', // manual, *follow, error
        //   referrer: 'client', // no-referrer , *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
        body: formData,
    });

    try {
        if (promise) {
            return raw ? response.text() : response.json();
        }
        return raw ? await response.text() : await response.json(); // parses JSON response into native JavaScript objects
    } catch (e) {
        console.error(e);
    }
};

export const phoneNumberTaken = async (phoneNumber) => {
    return await postData(
        "https://lopeseat.com/REST/user/checkNumber.php?phone=" + phoneNumber
    );
};

export const addBackStep = () => {
    // window.history.pushState(null, null, window.location.href);
};

export const setupBackEvent = (eventCallback) => {
    // window.addEventListener("popstate", () => {
    //     eventCallback(false);
    // });
};

export const getRestaurants = async () => {
    try {
        return await postData("https://lopeseat.com/REST/menu/getRestaurantList.php");
    } catch (e) {
        console.error(e);
    }
};

export const getRestaurant = async (id) => {
    try {
        return await postData(
            "https://lopeseat.com/REST/menu/getRestaurant.php?id=" + id
        );
    } catch (e) {
        console.error(e);
    }
};

export const getMenu = async (restaurantID) => {
    try {
        return await postData(
            "https://lopeseat.com/REST/menu/getMenu.php?rid=" + restaurantID
        );
    } catch (e) {
        console.error(e);
    }
};

export const addCartItem = async (apiToken, id, amount, comment, items) => {
    for (let i = 0; i < amount; i++)
        console.log(JSON.stringify(items));
    try {
        var result = await postData(
            `https://lopeseat.com/REST/cart/addItem.php?id=${id}&amount=${amount}&comment=${comment}&options=${JSON.stringify(
                items
            )}`,
            {
                apiToken: apiToken,
            }
        );
        if (result.success) {
            store.dispatch(actions.addCartItem({
                id: result.msg.id,
                item_id: id,
                amount
            }));
        }
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const removeCartItem = async (apiToken, id) => {
    try {
        var result = await postData(
            `https://lopeseat.com/REST/cart/removeItem.php?id=${id}`,
            {
                apiToken: apiToken,
            }
        );
        if (result.success)
            store.dispatch(actions.removeCartItem(id));
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const getCart = async (apiToken) => {
    try {
        return await postData("https://lopeseat.com/REST/cart/getItems.php", {
            apiToken: apiToken,
        });
    } catch (e) {
        console.error(e);
    }
};

export const getCartPrices = async (apiToken) => {
    try {
        return await postData("https://lopeseat.com/REST/cart/getPrice.php", {
            apiToken: apiToken,
        });
    } catch (e) {
        console.error(e);
    }
};

export const formatPrice = (price, asSpan = true) => {
    var priceS = price.toString();
    if (!priceS.includes(".")) {
        priceS = priceS + ".00";
    }
    if (priceS.length - priceS.indexOf(".") <= 2) {
        priceS = priceS + "0".repeat(priceS.length - priceS.indexOf(".") - 1);
    }
    priceS = priceS.substring(0, priceS.indexOf(".") + 3);
    if (!asSpan) return priceS;
    return (
        <span className="priceFormat">
            <span>{priceS.substring(0, priceS.indexOf("."))}</span>{" "}
            <span className="moneyCents">
                {priceS.substring(priceS.indexOf("."), priceS.indexOf(".") + 3)}
            </span>
        </span>
    );
};

export const storeState = (state, id) => {
    localStorage.setItem("lastAppState" + id, JSON.stringify(state));
};

export const loadState = (id) => {
    return JSON.parse(localStorage.getItem("lastAppState" + id));
};

export const updateFBToken = async (token, platform, apiToken) => {
    postData("https://lopeseat.com/REST/user/setFBToken.php", {
        token,
        platform,
        apiToken,
    });
};

export const sendPayment = async (nonce, address, apiToken, useBal = null, type, cardType) => {
    var data = {
        nonce,
        address,
        apiToken,
        type,
        cardType
    };
    if (useBal != null) {
        data.useBal = useBal;
    }
    return await postData("https://lopeseat.com/REST/order/sendOrder.php", data);
};

export const sendTip = async (amount, apiToken, nonce, useBal = null) => {
    var data = {
        apiToken,
        nonce
    };
    if (useBal != null) {
        data.useBal = useBal;
    }
    return await postData("https://lopeseat.com/REST/order/sendTip.php?amount=" + amount, data);
}

export const getOrder = async (apiToken, id = -1) => {
    return await postData(
        "https://lopeseat.com/REST/order/getOrder.php" +
        (id !== -1 ? "?id=" + id : ""),
        {
            apiToken: apiToken,
        }
    );
};

export const getTippableOrder = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/order/getTippableOrder.php",
        {
            apiToken
        }
    )
}

export const getOrderItems = async (apiToken, id) => {
    return await postData("https://lopeseat.com/REST/order/orderItems.php?id=" + id, {
        apiToken: apiToken,
    });
};

export const getMessages = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/messaging/getMessages.php?orderId=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const sendMessage = async (apiToken, orderId, message) => {
    return await postData(
        "https://lopeseat.com/REST/messaging/sendMessage.php?orderId=" + orderId,
        {
            apiToken: apiToken,
            message: message,
        }
    );
};

export const getActiveOrderList = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/order/getActiveOrders.php", {
        apiToken: apiToken,
    });
};

export const getAcceptableOrderWaiting = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/order/getAcceptableOrderWaiting.php", {
        apiToken: apiToken,
    });
};

export const getActiveOrder = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/order/getActiveOrder.php?id=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const getActiveOrderBarcode = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/order/getActiveOrderBarcode.php?id=" + orderId,
        {
            apiToken: apiToken,
        },
        true
    );
};

export const isDeliveryMode = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/delivery/isDeliveryMode.php",
        {
            apiToken
        }
    )
}

export const hasDelivered = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/delivery/hasDelivered.php",
        {
            apiToken
        }
    )
}

export const getAcceptableOrder = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/order/getAcceptableOrder.php?id=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const acceptDelivery = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/delivery/acceptOrder.php?order=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const declineDelivery = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/delivery/declineOrder.php?order=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const getPayoutTotal = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/getPayoutTotal.php", {
        apiToken: apiToken,
    });
};

export const getPayoutStatus = async (apiToken, payoutId) => {
    return await postData(
        "https://lopeseat.com/REST/delivery/getPayoutStatus.php?payoutId=" + payoutId,
        {
            apiToken: apiToken,
        }
    );
};

export const updateOrderState = async (apiToken, orderId, state) => {
    return await postData(
        "https://lopeseat.com/REST/order/updateOrderState.php?id=" +
        orderId +
        "&state=" +
        state,
        {
            apiToken: apiToken,
        }
    );
};

export const getProfileImage = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/user/getProfileImage.php",
        {
            apiToken,
        },
        true
    );
};

export const cacheProfileImage = async (apiToken) => {
    let profileImage = await getProfileImage(apiToken);
    store.dispatch(actions.setProfileImage(profileImage));
};

export const setProfileImage = async (apiToken, profileImage) => {
    return await postData("https://lopeseat.com/REST/user/getProfileImage.php", {
        apiToken,
        profileImage,
    });
};

export const getProfileData = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/user/getProfileData.php", {
        apiToken,
    });
};

export const getOrderPaymentInfo = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/order/getOrderPaymentInfo.php?orderId=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const getDelivererStats = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/getDelivererStats.php", {
        apiToken: apiToken,
    });
};

export const getPublicStats = async () => {
    return await postData("https://lopeseat.com/REST/delivery/getPublicStats.php");
};

export const requestPayout = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/requestPayout.php", {
        apiToken: apiToken,
    });
};

export const getBuildings = async () => {
    return await postData("https://lopeseat.com/REST/order/getBuildings.php");
};

export const startDeliveryMode = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/startDeliveryMode.php", {
        apiToken,
    });
};

export const stopDeliveryMode = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/stopDeliveryMode.php", {
        apiToken,
    });
};

export const getCarouselCards = async () => {
    return await postData(
        "https://lopeseat.com/REST/menu/getCardList.php?cardLocation=carousel"
    );
};

export const getScrollCards = async () => {
    return await postData(
        "https://lopeseat.com/REST/menu/getCardList.php?cardLocation=cardlist"
    );
};

export const sendDepositPayment = async (nonce, amount, to, apiToken) => {
    return await postData("https://lopeseat.com/REST/ledger/deposit.php", {
        apiToken,
        nonce,
        amount,
        to
    });
}

export const applyToDeliver = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/applyToDeliver.php", {
        apiToken
    })
}

export const getPreviousPayouts = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/delivery/getPreviousPayouts.php", {
        apiToken
    });
}

export const makePHXTime = (date) => {
    return new Date(
        date.toLocaleString("en-US", { timeZone: "America/Phoenix" })
    );
};

export const parseDate = (dateString, format = true) => {
    if (dateString == null) return null;
    var t = dateString.split(/[- :]/);
    var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    if (format) {
        return formatTime(makePHXTime(d));
    }
    return makePHXTime(d);
};

export const formatTime = (date) => {
    var hours = date.getHours();
    var suffix = hours > 12 ? "PM" : "AM";
    hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    var minutes = date.getMinutes();
    var minuteString =
        minutes === 0
            ? "00"
            : minutes < 10
                ? "0" + minutes.toString()
                : minutes;
    return hours + ":" + minuteString + suffix;
};

export const milliSecondsToTimeString = (milliseconds) => {
    let fullSeconds = milliseconds / 1000;
    const hours = Math.floor(fullSeconds / 3600);
    fullSeconds %= 3600;
    const minutes = Math.floor(fullSeconds / 60);
    fullSeconds %= 60;
    const seconds = Math.floor(fullSeconds);

    const doubleDigit = (x) => (x < 10 ? "0" + x : x);

    return `${hours}:${doubleDigit(minutes)}:${doubleDigit(seconds)}`;
};

export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const timeSince = (date) => {
    if (typeof date === "string" || typeof date === "number") {
        date = new Date(date);
    }

    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + " years";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes";
    return Math.floor(seconds) + " seconds";
};