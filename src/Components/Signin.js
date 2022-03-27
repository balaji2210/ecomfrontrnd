import React, { useState } from "react";
import { useHistory } from "react-router";
import { signin } from "../data";
import { toast } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();
    signin({ email, password }).then((data) => {
      if (data.message) {
        toast.error(data.message, {
          theme: "dark",
          position: "bottom-center",
          autoClose: 500,
        });
        history.push("/signin");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        history.push("/");
      }
    });
  };

  return (
    <div className="container col-md-5 ">
      <div className="container">
        <div className="card mt-5 pb-5 shadow bg-light text-white border border-primary">
          <h2 className="text-center mt-2 text-dark">Signin</h2>
          <div className="container p-3">
            <form onSubmit={handelSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark">Email address</label>
                <input
                  type="email"
                  className="form-control "
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-dark ">
                  signin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
