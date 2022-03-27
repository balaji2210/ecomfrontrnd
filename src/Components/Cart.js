import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createOrder, isAuthenticated, removeItemCart } from "../data";

import { toast } from "react-toastify";
import { useHistory } from "react-router";

function Cart() {
  const [cart, setCart] = useState([]);
  const [reload, setReoad] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setpinCode] = useState("");
  const auth = isAuthenticated();
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  let orderItems = [];

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [reload]);

  const removeItem = (itemId) => {
    removeItemCart(itemId, () => {
      setReoad(true);
      toast.warn("Item Removed", {
        position: "bottom-center",
        theme: "colored",
        autoClose: 1000,
      });
    });
    setTimeout(() => {
      setReoad(false);
    }, 1000);
  };

  const totalPrice = () => {
    let total = 0;
    if (cart !== undefined) {
      if (cart) {
        cart.map((item) => {
          return (total = total + item.price * item.quantity);
        });
      }
    }
    return total;
  };
  const shippingInfo = {
    address,
    city,
    phoneNo: Number(phoneNo),
    state,
    pinCode: Number(pinCode),
    country,
  };
  if (cart !== undefined) {
    if (cart) {
      cart.map((item) =>
        orderItems.push({
          product: item._id,
          name: item.name,
          price: item.price,
          image: item.photos[0].secure_url,
          quantity: item.quantity,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        })
      );
    }
  }
  let taxAmount = 30;
  let shippingAmount = 300;
  let totalAmount = totalPrice() + taxAmount + shippingAmount;

  const addOrder = (e) => {
    e.preventDefault();
    createOrder(token, {
      shippingInfo,
      orderItems,
      taxAmount: Number(taxAmount),
      shippingAmount: Number(shippingAmount),
      totalAmount: Number(totalAmount),
    }).then((data) => {
      if (data.success) {
        toast.success("Order Placed", {
          position: "bottom-center",
          theme: "colored",
          autoClose: 1000,
        });
        localStorage.removeItem("cart");
        history.push("/");
      }
    });
  };

  return (
    <>
      {cart === undefined || cart.length === 0 ? (
        <div className="container" style={{ marginTop: "250px" }}>
          <h1 className="text-center text-danger">
            Cart is Empty Add Items To Checkout
          </h1>
        </div>
      ) : (
        <>
          <div className="container mt-5">
            <div className="row ">
              <div className="col-lg-6">
                <div className="container ">
                  {cart !== undefined &&
                    cart.map((item) => (
                      <div className="card text-center mb-3" key={item._id}>
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={item.photos[0].secure_url}
                              alt="Trendy Pants and Shoes"
                              className="img-fluid p-3 ms-1 w-75 mt-4  img-thumbnail rounded-start"
                            />
                          </div>

                          <div className="col-md-8 mt-5">
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <i
                                className="fas fa-trash float-end fa-lg"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  removeItem(item._id);
                                }}
                              ></i>
                              <p className="card-text">{item.description}</p>
                              <h5 className="card-text">
                                {item.quantity}X{item.price}
                              </h5>
                            </div>
                          </div>
                          <div className="row m-3">
                            <div className="col-lg-3 "></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {cart !== undefined ? (
                <>
                  <div className="col-lg-6 ">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 offset-lg-4">
                          <h1>Checkout</h1>
                        </div>
                      </div>
                    </div>
                    <div className="container my-5">
                      {auth ? (
                        <button
                          className="btn btn-success w-100 btn-lg mt-5 "
                          data-mdb-toggle="modal"
                          data-mdb-target="#staticBackdrop"
                        >
                          Checkout Rs-{totalPrice()}
                        </button>
                      ) : (
                        <button
                          className="btn btn-success w-100 btn-lg mt-5 "
                          data-mdb-toggle="modal"
                          data-mdb-target="#staticBackdrop"
                          disabled
                        >
                          SignIn To checkout Rs-{totalPrice()}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              className="modal fade "
              id="staticBackdrop"
              data-mdb-backdrop="static"
              data-mdb-keyboard="false"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Checkout Page
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-mdb-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row mb-4">
                        <div className="col">
                          <label>City</label>
                          <div className="form-outline border">
                            <input
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="form-control"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <label>State</label>
                          <div className="form-outline border">
                            <input
                              type="text"
                              className="form-control"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <label>Country</label>
                      <div className="form-outline border mb-4">
                        <input
                          type="text"
                          className="form-control"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>

                      <label>PinCode</label>
                      <div className="form-outline border mb-4">
                        <input
                          type="number"
                          className="form-control"
                          value={pinCode}
                          onChange={(e) => setpinCode(e.target.value)}
                        />
                      </div>
                      <label>PhoneNo</label>
                      <div className="form-outline border mb-4">
                        <input
                          type="number"
                          className="form-control"
                          value={phoneNo}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <label>Address</label>
                      <div className="form-outline border mb-4">
                        <textarea
                          className="form-control"
                          value={address}
                          onChange={(e) => setAdress(e.target.value)}
                          rows="4"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        data-mdb-dismiss="modal"
                        onClick={addOrder}
                      >
                        Place order
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-mdb-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
