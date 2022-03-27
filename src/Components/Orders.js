import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { getMyOrders } from "../data";

function Orders() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders(token).then((data) => {
      setOrders(data.orders);
    });
  }, [token]);

  // orders.map((order) => {
  //   order.orderItems.map((ord) => {
  //     Items.push(ord);
  //   });
  // });

  return (
    <div>
      {orders && orders.length !== 0 ? (
        <div className="container my-5">
          {orders.map((ite, i) => (
            <ul className="list-group" key={i}>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{ite.name}</div>
                  <span className="ms-lg-5">Quantity-{ite.quantity}</span>
                  <img
                    src={ite.image}
                    width="100px"
                    alt={ite.description}
                    className="img-thumbnail ms-lg-4  mt-2 ms-3 "
                  />
                </div>
                <span
                  className={
                    ite.orderStatus === "Delivered"
                      ? "badge badge-success mt-4 border border-success"
                      : "badge badge-warning mt-4 border border-warning"
                  }
                >
                  {ite.orderStatus}
                </span>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <div className="container ">
          <h1
            className="text-center text-uppercase text-warning"
            style={{ marginTop: "15rem" }}
          >
            No Orders Yet!
          </h1>
        </div>
      )}
    </div>
  );
}

export default Orders;
