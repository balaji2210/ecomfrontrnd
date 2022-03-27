import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { getProcessing, isAuthenticated } from "../data";

const AdminProcessing = () => {
  const [process, setProcessing] = useState([]);
  const history = useHistory();
  const auth = isAuthenticated();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (user && user.role === "admin") {
      getProcessing(token).then((data) => {
        setProcessing(data.orders);
      });
    } else {
      history.push("/");
    }
  }, [token]);

  return (
    <>
      {auth && process.length !== 0 ? (
        <div className="container my-5">
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
              {process.map((pro, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={pro.image}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pro.user.name}</p>
                        <p className="text-muted mb-0">{pro.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{pro.name}</p>
                    <p className="text-muted mb-0">{pro.quantity}</p>
                  </td>
                  <td>
                    <span className="badge badge-warning border  rounded-pill d-inline border border-warning">
                      processing
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="conatiner">
          <h1 className="text-center" style={{ marginTop: "100px" }}>
            No Processing Orders
          </h1>
        </div>
      )}
    </>
  );
};

export default AdminProcessing;
