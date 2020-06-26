import React from "react";

export const registerAccount = async (
    phone,
    firstName,
    lastName,
    email,
    studentNumber,
    password,
    profileImage
) => {
    return await postData("https://lopeseat.com/REST/signup.php", {
        name: firstName + " " + lastName,
        id: studentNumber,
        email: email,
        phone: phone,
        password: password,
        profileImage: profileImage,
    });
};

export const resendCode = async (phone) => {
    return await postData("https://lopeseat.com/REST/resendCode.php", {
        phone: phone,
    });
};

export const loginAccount = async (phone, password) => {
    return await postData("https://lopeseat.com/REST/login.php", {
        phone: phone,
        password: password,
    });
};

export const verifyCode = async (phone, code) => {
    return (
        await postData(
            "https://lopeseat.com/REST/confirm.php?phone=" +
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

export const setScreenState = (...args) => getScreenState().setState(...args);

export const postData = async (url = "", data = {}) => {
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
    // console.log(response);
    return await response.json(); // parses JSON response into native JavaScript objects
};

export const phoneNumberTaken = async (phoneNumber) => {
    try {
        return await postData(
            "https://lopeseat.com/REST/checkNumber.php?phone=" + phoneNumber
        );
    } catch (e) {
        return true;
    }
};

export const addBackStep = () => {
    window.history.pushState(null, null, window.location.href);
};

export const setupBackEvent = (eventCallback) => {
    window.addEventListener("popstate", () => {
        // console.log("Hit back");
        eventCallback(false);
    });
};

export const getRestaurants = async () => {
    try {
        return await postData("https://lopeseat.com/REST/restaurants.php");
    } catch (e) {
        console.error(e);
    }
};

export const getMenu = async (restaurantID) => {
    try {
        return await postData(
            "https://lopeseat.com/REST/menu.php?rid=" + restaurantID
        );
    } catch (e) {
        console.error(e);
    }
};

export const addCartItem = async (apiToken, id, amount, comment, items) => {
    console.log(JSON.stringify(items));
    try {
        return await postData(
            `https://lopeseat.com/REST/addCartItem.php?id=${id}&amount=${amount}&comment=${comment}&options=${JSON.stringify(
                items
            )}`,
            {
                apiToken: apiToken,
            }
        );
    } catch (e) {
        console.error(e);
    }
};

export const removeCartItem = async (apiToken, id) => {
    try {
        return await postData(
            `https://lopeseat.com/REST/removeCartItem.php?id=${id}`,
            {
                apiToken: apiToken,
            }
        );
    } catch (e) {
        console.error(e);
    }
};

export const getCart = async (apiToken) => {
    try {
        return await postData("https://lopeseat.com/REST/cartItems.php", {
            apiToken: apiToken,
        });
    } catch (e) {
        console.error(e);
    }
};

export const getCartPrices = async (apiToken) => {
    try {
        return await postData("https://lopeseat.com/REST/cartPrice.php", {
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

// export const storeGlobalState = () => {
//   storeState(getScreenState(), "screenHandler")
// }

export const storeState = (state, id) => {
    localStorage.setItem("lastAppState" + id, JSON.stringify(state));
};

export const loadState = (id) => {
    return JSON.parse(localStorage.getItem("lastAppState" + id));
};

export const updateFBToken = async (token, apiToken) => {
    postData("https://lopeseat.com/REST/setFBToken.php", {
        token: token,
        apiToken: apiToken,
    });
};

export const sendPayment = async (nonce, address, apiToken) => {
    //try {
    return await postData("https://lopeseat.com/REST/sendOrder.php", {
        nonce: nonce,
        address: address,
        apiToken: apiToken,
    });
    // } catch (e) {
    //   console.error(e);
    // }
};

export const getOrder = async (apiToken, id = -1) => {
    return await postData(
        "https://lopeseat.com/REST/getOrder.php" +
            (id != -1 ? "?id=" + id : ""),
        {
            apiToken: apiToken,
        }
    );
};

export const getOrderItems = async (apiToken, id) => {
    return await postData("https://lopeseat.com/REST/orderItems.php?id=" + id, {
        apiToken: apiToken,
    });
};

export const getMessages = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/getMessages.php?orderId=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const sendMessage = async (apiToken, orderId, message) => {
    return await postData(
        "https://lopeseat.com/REST/sendMessage.php?orderId=" + orderId,
        {
            apiToken: apiToken,
            message: message,
        }
    );
};

export const getIncomingOrderList = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/orders.php?state=unclaimed",
        {
            apiToken: apiToken,
        }
    );
};

export const getActiveOrderList = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/orders.php?state=!unclaimed&deliverer",
        {
            apiToken: apiToken,
        }
    );
};

export const getCompletedOrderList = async (apiToken) => {
    return await postData(
        "https://lopeseat.com/REST/orders.php?state=completed&deliverer",
        {
            apiToken: apiToken,
        }
    );
};

export const getPayoutTotal = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/getPayoutTotal.php", {
        apiToken: apiToken,
    });
};

export const getPayoutStatus = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/getPayoutStatus.php?order=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const updateOrderState = async (apiToken, orderId, state) => {
    return await postData(
        "https://lopeseat.com/REST/updateOrderState.php?id=" +
            orderId +
            "&state=" +
            state,
        {
            apiToken: apiToken,
        }
    );
};

export const getOrderPaymentInfo = async (apiToken, orderId) => {
    return await postData(
        "https://lopeseat.com/REST/getOrderPaymentInfo.php?orderId=" + orderId,
        {
            apiToken: apiToken,
        }
    );
};

export const requestPayout = async (apiToken) => {
    return await postData("https://lopeseat.com/REST/requestPayout.php", {
        apiToken: apiToken,
    });
};

export const makePHXTime = (date) => {
    return new Date(
        date.toLocaleString("en-US", { timeZone: "America/Phoenix" })
    );
};

export const parseDate = (dateString) => {
    if (dateString == null) return null;
    var t = dateString.split(/[- :]/);
    var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    return formatTime(makePHXTime(d));
};

export const formatTime = (date) => {
    var hours = date.getHours();
    var suffix = hours > 12 ? "PM" : "AM";
    hours = hours == 0 ? 12 : hours > 12 ? hours - 12 : hours;
    var minutes = date.getMinutes();
    var minuteString =
        minutes == 0 ? "00" : minutes < 10 ? "0" + minutes.toString() : minutes;
    return hours + ":" + minuteString + suffix;
};

export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
