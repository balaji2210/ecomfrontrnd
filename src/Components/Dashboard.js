import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { isAuthenticated, updatePassword } from "../data";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const auth = isAuthenticated();
  const history = useHistory();
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConf] = useState("");

  const data = {
    password: current,
    newPassword,
    confirmPassword: confirmPass,
  };

  const handelSubmit = () => {
    updatePassword(data, token).then((data) => {
      console.log(data);
      if (data.message) {
        toast.error(data.message, {
          position: "bottom-center",
          autoClose: 1000,
          theme: "colored",
          delay: 2000,
        });
      } else {
        if (data.message1) {
          toast.success(data.message1, {
            position: "bottom-center",
            autoClose: 1000,
            theme: "colored",
          });
          setConf("");
          setCurrent("");
          setNewPassword("");
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      {auth ? (
        <div className="row" style={{ marginTop: "100px" }}>
          <div className="col-lg-6 mt-5 offset-lg-3">
            <div className="card text-center shadow-5">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <button
                  className="btn btn-primary btn-sm"
                  data-mdb-toggle="modal"
                  data-mdb-target="#exampleModal22"
                >
                  change password
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        history.push("/signin")
      )}

      <div
        className="modal fade"
        id="exampleModal22"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>CurrentPassword</label>
              <div className="form-outline border">
                <input
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  type="password"
                  className="form-control ms-2"
                />
              </div>
              <label>New Password</label>
              <div className="form-outline border ">
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>
              <label>Confirm Password</label>
              <div className="form-outline border">
                <input
                  value={confirmPass}
                  type="password"
                  className="form-control ms-2"
                  onChange={(e) => setConf(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-mdb-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelSubmit}
                data-mdb-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
