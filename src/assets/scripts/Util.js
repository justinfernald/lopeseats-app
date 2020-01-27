export const registerAccount = async (phone, firstName, lastName, email, studentNumber, password, profileImage) => {
  return await postData("https://lopeseat.com/REST/signup.php", {
    name: firstName + " " + lastName,
    id: studentNumber,
    email: email,
    phone: phone,
    password: password,
    profileImage: profileImage
  })
}

export const resendCode = async phone => {
  return await postData("https://lopeseat.com/REST/resendCode.php", {
    phone: phone
  });
}

export const loginAccount = async (phone, password) => {
  return await postData("https://lopeseat.com/REST/login.php", {
    phone: phone,
    password: password
  })
}

export const verifyCode = async (phone, code) => {
  return (await postData("https://lopeseat.com/REST/confirm.php?phone=" + phone + "&token=" + code)).success
}

export const showErrors = errors => {
  let divElement = document.createElement("div");
  let errorListElement = document.createElement("div");

  for (let error of errors) {
    let childElement = document.createElement("div");
    childElement.classList.add("errorItem");
    childElement.innerText = error;
    errorListElement.append(childElement);
  }

  divElement.classList.add("errorWrapper");
  errorListElement.classList.add("errorList")

  divElement.append(errorListElement);
  document.body.append(divElement);

  setTimeout(() => {
    document.body.removeChild(divElement);
  }, 2000 + 1000 * errors.length);
}

export const postData = async (url = '', data = {}) => {
  let formData = new FormData();

  for (let i in data) {
    formData.append(i, data[i]);
  }

  // Default options are marked with *
  const response = await fetch(url, {
    method: 'post', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    //   redirect: 'follow', // manual, *follow, error
    //   referrer: 'client', // no-referrer , *client
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
    body: formData
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

export const phoneNumberTaken = async phoneNumber => {
  try {
    return await postData('https://lopeseat.com/REST/checkNumber.php?phone=' + phoneNumber);
  } catch (e) {
    return true;
  }
}

export const addBackStep = () => {
  window.history.pushState(null, null, window.location.href);
}

export const setupBackEvent = eventCallback => {
  window.addEventListener('popstate', () => {
    console.log("Hit back");
    eventCallback(false);
  });
}

export const getRestaurants = async () => {
  try {
    return await postData("https://lopeseat.com/REST/restaurants.php");
  } catch (e) {
    console.error(e);
  }
}

export const getMenu = async restaurantID => {
  try {
    return await postData("https://lopeseat.com/REST/menu.php?rid=" + restaurantID);
  } catch (e) {
    console.error(e);
  }
}

export const getCart = async apiToken => {
  try {
    return await postData("https://lopeseat.com/REST/cartItems.php", {
      apiToken: apiToken
    });
  } catch (e) {
    console.error(e);
  }
}

export const getCartPrices = async apiToken => {
  try {
    return await postData("https://lopeseat.com/REST/cartPrice.php", {
      apiToken: apiToken
    });
  } catch (e) {
    console.error(e);
  }
}

export const formatPrice = price => {
    var priceS = price.toString();
    if (!priceS.includes(".")) {
        return priceS + ".00";
    }
    if (priceS.length - priceS.indexOf(".") <= 2) {
        return priceS + ("0").repeat(priceS.length - priceS.indexOf(".") - 1);
    }
    return priceS.substring(0,priceS.indexOf(".") + 3);
}

export const storeState = state => {
  localStorage.setItem("lastAppState", JSON.stringify(state));
}

export const loadState = () => {
  return JSON.parse(localStorage.getItem("lastAppState"));
}

export const updateFBToken = async (token, apiToken) => {
  postData("https://lopeseat.com/REST/setFBToken.php", {
    token: token,
    apiToken: apiToken
  });
}