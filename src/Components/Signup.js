import React from "react";
import { useState } from "react";
import { signup } from "../data/index";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.message) {
        toast.error(data.message, {
          position: "bottom-center",
          theme: "colored",
          autoClose: 500,
        });
        history.push("/signup");
      } else {
        history.push("/signin");
      }
    });
  };

  return (
    <>
      <div className="container col-md-5 ">
        <div className="container">
          <div className="card mt-5 pb-5 shadow bg-light text-white border border-primary">
            <h2 className="text-center mt-2 text-dark">Signup</h2>
            <div className="container p-3">
              <form onSubmit={handelSubmit}>
                <div className="mb-3">
                  <label className="form-label text-dark">Name</label>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
