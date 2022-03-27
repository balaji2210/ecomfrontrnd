export const signup = (user) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

export const signin = (user) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const getAllproduct = (page) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/products/?page=${page}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAProduct = (id) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/product/${id}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addReview = (review, id, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/review/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getReviews = (id) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/reviews?id=${id}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
export const deleteReviews = (id, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/review?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const search = (search) => {
  return fetch(
    `https://ecom2210.herokuapp.com/api/v1/products?search=${search}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const addItemToCart = (item, quantity) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const found = cart.find((it) => it._id === item._id);

    if (!found) {
      cart.push({
        ...item,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItemCart = (itemId, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart = cart.filter((it) => it._id !== itemId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};

export const createOrder = (token, data) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/order/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getMyOrders = (token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const updatePassword = (pass, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/update/password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pass),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const adminGetOrders = (token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/admin/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const adminUpdateOrder = (id, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/admin/order/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getDeliveredOrders = (token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/admin/orders/delivered`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getProcessing = (token) => {
  return fetch(
    `https://ecom2210.herokuapp.com/api/v1/admin/orders/processing`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const addProduct = (formdata, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/create/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (id, formdata, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/product/update/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const deleteAProduct = (id, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/product/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const adminGetUsers = (token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/admin/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const adminUpdateUser = (id, token) => {
  return fetch(`https://ecom2210.herokuapp.com/api/v1/admin/user/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
