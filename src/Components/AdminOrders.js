import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { adminGetOrders, adminUpdateOrder, isAuthenticated } from "../data";
import AdminDropDown from "./AdminDropDown";

function AdminOrders() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState("");
  const [reload, setReload] = useState(false);
  const auth = isAuthenticated();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user && user.role === "admin") {
      adminGetOrders(token).then((data) => {
        setOrders(data.orders);
        setTotal(data.total);
      });
    } else {
      history.push("/");
    }
  }, [reload, token]);

  const updateStatus = (id) => {
    adminUpdateOrder(id, token).then((data) => {
      if (data.message) {
        setReload(true);
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 1000,
          theme: "colored",
        });
      }

      return () => {
        setReload(false);
      };
    });
  };

  return (
    <>
      {auth ? (
        <div className="container col-md-8 my-3">
          <div className="mt-5 text-success fs-5 fw-bold">
            TotalOrdersAmount={total}
          </div>
          <AdminDropDown />
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Total *charges</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={ord.image}
                        alt="example"
                        style={{ width: "100px", height: "100px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{ord.user.name}</p>
                        <p className="text-muted mb-0">{ord.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ord.name}</p>
                    <p className="text-muted mb-0">{ord.price}</p>
                  </td>
                  <td>{ord.quantity}</td>
                  <td>
                    <span
                      className={
                        ord.orderStatus === "processing"
                          ? "badge badge-warning rounded-pill d-inline border border-warning"
                          : "badge badge-success rounded-pill d-inline border border-success"
                      }
                    >
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td>{ord.quantity * ord.price + 330}</td>
                  <td>
                    {ord.orderStatus === "Delivered" ? (
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded text-wrap"
                        disabled
                      >
                        updatestatus
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded fw-fw-bolder"
                        onClick={() => {
                          updateStatus(ord._id);
                        }}
                      >
                        updatestatus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        history.push("/signin")
      )}
    </>
  );
}

export default AdminOrders;
