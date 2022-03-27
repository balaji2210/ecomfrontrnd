import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { getDeliveredOrders, isAuthenticated } from "../data";

const Delivered = () => {
  const [ord, setOrd] = useState([]);
  const history = useHistory();
  const auth = isAuthenticated();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (user && user.role === "admin") {
      getDeliveredOrders(token).then((data) => {
        setOrd(data.orders);
      });
    } else {
      history.push("/");
    }
  }, [token]);

  return (
    <>
      {auth && user.role === "admin" ? (
        <div className="container col-md-8 my-5">
          <button
            className="btn btn-sm btn-primary float-end"
            onClick={() => {
              history.push("/admin");
            }}
          >
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ord.map((ord, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={ord.image}
                        alt={ord.description}
                        style={{ width: "45px", height: "45px" }}
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
                    <p className="text-muted mb-0">{ord.quantity}</p>
                  </td>
                  <td>
                    <span className="badge badge-success rounded-pill d-inline border border-success">
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
};

export default Delivered;
